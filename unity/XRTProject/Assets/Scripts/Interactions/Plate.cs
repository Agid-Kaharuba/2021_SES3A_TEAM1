using System;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

namespace Interactions
{
    public class Plate : MonoBehaviour
    {
        [Range(0, 1)]
        public float dirtiness;

        private MeshRenderer[] meshes;
        private List<Material> materials = new List<Material>();
        private static readonly int DirtinessKey = Shader.PropertyToID("_Dirtiness");
        private static readonly int DirtySeedKey = Shader.PropertyToID("_DirtySeed");

        private void Awake()
        {
            meshes = GetComponentsInChildren<MeshRenderer>();

            foreach (MeshRenderer meshRenderer in meshes)
            {
                Material material = Instantiate(meshRenderer.material);
                material.SetFloat(DirtySeedKey, Random.Range(-10000f, 10000f));
                meshRenderer.material = material;
                materials.Add(meshRenderer.material);
            }
        }

        private void Update()
        {
            SetDirtinessLevel(Mathf.Clamp01(dirtiness) * 2);
        }

        private void SetDirtinessLevel(float dirtiness)
        {
            materials.ForEach(m => m.SetFloat(DirtinessKey, dirtiness));
        }
    }
}