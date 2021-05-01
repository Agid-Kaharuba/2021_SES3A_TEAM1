using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TMPro;
using UnityEngine;

public class BurgerBoard : MonoBehaviour
{
    [SerializeField] private BurgerStackDetector stackDetector;
    [SerializeField] private TMP_Text contentsText;

    private BurgerItem burgerItem;

    private void Awake()
    {
        burgerItem = GetComponent<BurgerItem>();
        burgerItem.OnAboveStackChanged.AddListener(OnAboveStackChanged);
    }

    private void Start()
    {
        UpdateContentsText();
    }

    private void OnAboveStackChanged()
    {
        UpdateContentsText();
    }

    private void UpdateContentsText()
    {
        List<BurgerItem> burgerItems = GetCurrentBurgerItems();

        if (burgerItems.Count == 0)
        {
            contentsText.text = "None";
        }
        else
        {
            StringBuilder stringBuilder = new StringBuilder();

            foreach (BurgerItem item in burgerItems.AsEnumerable().Reverse())
            {
                stringBuilder.Append($"- {item.name}\n");
            }

            contentsText.text = stringBuilder.ToString();
        }
    }

    public List<BurgerItem> GetCurrentBurgerItems()
    {
        var burgerItems = new List<BurgerItem>();
        BurgerItem aboveItem = burgerItem.GluedAboveItem;

        while (aboveItem != null)
        {
            burgerItems.Add(aboveItem);
            aboveItem = aboveItem.GluedAboveItem;
        }

        return burgerItems;
    }

    public Recipe GetCurrentBurger()
    {
        IEnumerable<PropData> props = GetCurrentBurgerItems()
            .Select(i => i.GetComponent<PropBehaviour>().PropData);

        return new Recipe("burger", props);
    }

    public void SetCurrentBurgerForTask(Task task)
    {
        Debug.Log($"Set current burger for task {task.Name}");
        //TODO
    }
}
