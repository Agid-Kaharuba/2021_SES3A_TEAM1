using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using System.Text;
using TMPro;
using Valve.Newtonsoft.Json;
public class DetectBurger : MonoBehaviour
{
    [SerializeField] private Canvas canvas;

    // Start is called before the first frame update
    void Start()
    {
        canvas.gameObject.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider collider)
    {
        if (collider.gameObject.CompareTag("Plates"))
        {
            Debug.Log("Collision Detected");
            StartCoroutine(FinalText(collider.gameObject));
        }
    }

    private IEnumerator FinalText(GameObject colliderobject)
    {
        yield return new WaitForSeconds(3);
        //send the burger recipe to training manager
        Recipe buger = colliderobject.GetComponent<BurgerBoard>().GetCurrentBurger();
        Debug.Log(buger.Ingredients.Count);
        Debug.Log(JsonConvert.SerializeObject(buger.Ingredients));
        Destroy(colliderobject);
        canvas.gameObject.SetActive(true);
    }
}
