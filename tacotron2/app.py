import os
import pathlib
from os.path import exists, join, basename, splitext
import sys
import argparse
import numpy as np
import torch
import json
import soundfile as sf

def do_inference(project_name, file_name, string_to_infer):
  from hparams import create_hparams
  from model import Tacotron2
  from layers import TacotronSTFT
  from audio_processing import griffin_lim
  from text import text_to_sequence
  #from waveglow.denoiser import Denoiser
  from waveglow.denoiser_copy import Denoiser
  #from waveglow.glow import WaveGlow
  from waveglow.glow_copy import WaveGlow

  tacotron2_pretrained_model = f"{project_name}/tacotron2_statedict.pt"
  waveglow_pretrained_model = f"{project_name}/waveglow_old.pt"
  device = torch.device('cpu')

  torch.set_grad_enabled(False)

  # initialize Tacotron2 with the pretrained model
  hparams = create_hparams()
  hparams.sampling_rate = 22050
  model = Tacotron2(hparams)
  model.load_state_dict(torch.load(tacotron2_pretrained_model, map_location=device)['state_dict'])
  _ = model.eval()#.half()

  # initialize Waveglow with the pretrained model
  # waveglow = torch.load(waveglow_pretrained_model)['model']
  # WORKAROUND for: https://github.com/NVIDIA/tacotron2/issues/182
  print('%s/waveglow/config.json' % project_name)
  waveglow_config = json.load(open('%s/waveglow/config.json' % project_name))['waveglow_config']
  waveglow = WaveGlow(**waveglow_config)
  waveglow.load_state_dict(torch.load(waveglow_pretrained_model, map_location=device)['model'].state_dict())
  _ = waveglow.eval()#.half()
  for k in waveglow.convinv:
      k.float()
  #denoiser = Denoiser(waveglow)

  sequence = np.array(text_to_sequence(string_to_infer, ['english_cleaners']))[None, :]
  sequence = torch.autograd.Variable(torch.from_numpy(sequence)).long()
  sequence = sequence
  mel_outputs, mel_outputs_postnet, _, alignments = model.inference(sequence)

  audio = waveglow.infer(mel_outputs_postnet, sigma=0.666)
  #audio_denoised = denoiser(audio, strength=0.01)[:, 0]
  print(f'{project_name}/{file_name}.wav')
  sf.write(f'{project_name}/bin/{file_name}.wav', audio[0].data.cpu().numpy(), hparams.sampling_rate, 'PCM_24')
  #sf.write(f'{project_name}/test.wav', audio_denoised[0].data.cpu().numpy(), hparams.sampling_rate, 'PCM_24')
  return f'{project_name}/bin/{file_name}.wav'



# if __name__ == '__main__':
#     parser = argparse.ArgumentParser()
#     parser.add_argument('-s', '--string_to_infer', type=str)
#     args = parser.parse_args()
#     #print(pathlib.Path(__file__).parent.resolve())

    # project_name = str(pathlib.Path(__file__).parent.resolve())
    # print(args.string_to_infer)
    # sys.path.append(join(project_name, 'waveglow/'))
    # sys.path.append(project_name)
    # do_inference(project_name, "Har ree is a stupid nigger.")

from flask import Flask, render_template, request, url_for, jsonify, send_file
app = Flask(__name__)
import random


@app.route('/', methods = ['GET'])
def api_live():
    return "tacotron2 is live. Use POST with form data field message to convert to speech."
    
@app.route('/', methods = ['POST'])
def api_endpoint():
    message = request.form['message']

    project_name = str(pathlib.Path(__file__).parent.resolve())
    print(message)
    sys.path.append(join(project_name, 'waveglow/'))
    sys.path.append(project_name)
    file_name = random.randint(0, 99999)
    try: 
        result = do_inference(project_name, file_name, message)
        return send_file(result, attachment_filename='speech.wav')
    except:
        return send_file(f'{project_name}/bin/error.wav', attachment_filename='speech.wav')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)