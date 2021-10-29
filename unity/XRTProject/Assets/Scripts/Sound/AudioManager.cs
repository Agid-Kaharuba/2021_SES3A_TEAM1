using UnityEngine.Audio;
using System;
using Random = UnityEngine.Random;
using UnityEngine;
using System.Collections.Generic;

public class AudioManager : MonoBehaviour
{
    public List<Sound> sounds;

    public static AudioManager instance;
    void Awake()
    {
        if (instance == null)
            instance = this;
        else
        { Destroy(gameObject); };

        DontDestroyOnLoad(gameObject);

        foreach (Sound s in sounds)
        {
            s.source = gameObject.AddComponent<AudioSource>();
            s.source.clip = s.clip;

            s.source.volume = s.volume;
            s.source.pitch = s.pitch;
            s.source.loop = s.loop;
        }
    }


    public void Play(string name)
    {
        for (int i = 0; i < sounds.Count; i++)
        {
            if (sounds[i].name == name)
            {
                Sound s = sounds[i];
                s.source.Play();
            }
        }
    }
    public void Stop(string name)
    {
        for (int i = 0; i < sounds.Count; i++)
        {
            if (sounds[i].name == name)
            {
                Sound s = sounds[i];
                s.source.Stop();
            }
        }
    }
    public void ChangePitch(string name, float speed)
    {
        for (int i = 0; i < sounds.Count; i++)
        {
            if (sounds[i].name == name)
            {
                Sound s = sounds[i];
                s.source.pitch = speed / 10;
            }
        }

    }
    public void ChangeVolume(string name, float volume)
    {
        for (int i = 0; i < sounds.Count; i++)
        {
            if (sounds[i].name == name)
            {
                Sound s = sounds[i];
                s.source.volume = volume;
            }
        }
    }
    //If you pass sounds script
    public void AddSound(Sound newSound)
    {
        sounds.Add(newSound);
        newSound.source = gameObject.AddComponent<AudioSource>();
        newSound.source.clip = newSound.clip;

        newSound.source.volume = newSound.volume;
        newSound.source.pitch = newSound.pitch;
        newSound.source.loop = newSound.loop;
    }
    //If you ONLY pass audio file
    public void AddClip(AudioClip newClip,string ClipName)
    {
        Sound LOL = new Sound();
        LOL.name = ClipName;
        LOL.source = gameObject.AddComponent<AudioSource>();
        LOL.source.clip = newClip;
        LOL.source.volume = 1;
        LOL.source.pitch = 1;
        LOL.source.loop = false;
        sounds.Add(LOL);
    }

}
