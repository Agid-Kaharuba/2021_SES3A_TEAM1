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
    [SerializeField] private TMP_Text MarkText;
    private int bugerscore;
    private Coroutine coroutine;
    private GameObject plateObject;

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
        if (collider.gameObject.CompareTag("Plates") && plateObject == null)
        {
            Debug.Log("Collision Detected");
            plateObject = collider.gameObject;
            coroutine = StartCoroutine(FinalText(plateObject));
        }
    }

    private void OnTriggerExit(Collider other)
    {
        // If the plate is removed before 3 seconds, cancel the final text training completion thing
        if (plateObject != null)
        {
            StopCoroutine(coroutine);
            coroutine = null;
            plateObject = null;
        }
    }

    private IEnumerator FinalText(GameObject colliderobject)
    {
        yield return new WaitForSeconds(3);
        //send the burger recipe to training manager
        Recipe burger = colliderobject.GetComponent<BurgerBoard>().GetCurrentBurger();
        //Debug.Log(buger.Ingredients.Count);
        //Debug.Log(JsonConvert.SerializeObject(buger.Ingredients));
        //Debug.Log(buger.CalculateScore(buger, 100));

        if (TrainingManager.Instance.HasCurrentTask)
        {
            Recipe currentRecipe = TrainingManager.Instance.CurrentTask.Recipe;
            bugerscore = currentRecipe.CalculateScore(burger, 100);
            MarkText.text = "Your Mark is: " + bugerscore + "/100";
            TrainingManager.Instance.SubmitTask(burger);
            Destroy(colliderobject);
            canvas.gameObject.SetActive(true);
        }
    }
}
