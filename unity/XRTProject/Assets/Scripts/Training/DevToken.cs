using UnityEngine;

namespace Training
{
    [CreateAssetMenu(fileName = "DevToken", menuName = "Dev Token", order = 0)]
    public class DevToken : ScriptableObject
    {
        [field: SerializeField] public string Token { get; private set; }
        [field: SerializeField] public string ModuleId { get; private set; }
    }
}