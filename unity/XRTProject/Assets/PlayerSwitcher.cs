using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR;

public class PlayerSwitcher : MonoBehaviour
{
    [SerializeField] public bool forceVRPlayer;
    [SerializeField] private bool forceStandardPlayer;

    [SerializeField] private GameObject standardPlayer;
    [SerializeField] private GameObject VRPlayer;

    private void Awake()
    {
        if (standardPlayer == null)
            standardPlayer = gameObject.transform.Find("2D-Player").gameObject;
        
        if (standardPlayer == null)
            VRPlayer = gameObject.transform.Find("VR-Player").gameObject;

        SetupPlayerMode();
    }

    private void SetupPlayerMode()
    {
        bool shouldBeVR = (forceVRPlayer || SteamVR.instance != null) && !forceStandardPlayer;
        SetPlayerMode(shouldBeVR);
    }

    private void SetPlayerMode(bool isVRMode)
    {
        standardPlayer.SetActive(!isVRMode);
        VRPlayer.SetActive(isVRMode);
    }
}