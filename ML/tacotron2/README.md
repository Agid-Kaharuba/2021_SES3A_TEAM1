Please check out the tacotron2 github here: https://github.com/NVIDIA/tacotron2

# For use with SES3 Team
# If training with google colab
1) Use tacotron2_training.ipynb if training on google colab
    - Would recommend using google drive to store files for colab training

# If training locally, please follow these instructions to get the model running.
# Setup
1) It is recommended that the computer you are training this on is an Nvidia GPU
2) If running windows, install WSL2, if running a linux distro, ignore this step 
  - If running Windows 10, it is recommended to install Windows 11, which has native WSL2 GPU support
  - Install distro compatible with nvidia container toolkit (https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#linux-distributions)

3) If running Linux, ensure distro is compatible with nvidia container toolkit (https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#linux-distributions)
4) Install GPU drivers (Note if you are running in WSL2 you only need the drivers installed with your windows installation)
5) Install Docker
6) Install Nvidia Container Toolkit (https://docs.nvidia.com/cuda/wsl-user-guide/index.html#ch04-sub02-install-nvidia-docker) 

# Training

1) Clone this repository
2) cd '2021_SES3A_TEAM1/ML/tacotron2'
3) Edit fileslist files to your folder with wavs for the model to train on
4) Edit haparams.py 'training_files' and 'training_files' fields to point to fileslist files
5) Use `python train.py --output_directory=outdir --log_directory=logdir` to start training
