using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

[Serializable]
public class OnRecipeSelectedEvent : UnityEvent<Recipe> {}

public class UIRecipeSelector : MonoBehaviour
{
    [SerializeField] private Transform itemsParent;
    [SerializeField] private UIReorderableElement itemPrefab;
    [SerializeField] private UIReorderableElement sampleItem;
    [SerializeField] private bool shouldCloseOnSelect;
    public OnRecipeSelectedEvent OnRecipeSelected;

    private float itemFontSize;
    private Vector2 itemSizeDelta;

    private void Awake()
    {
        itemFontSize = sampleItem.Text.fontSize;
        RectTransform sampleRectTransform = sampleItem.GetComponent<RectTransform>();
        itemSizeDelta = sampleRectTransform.sizeDelta;
    }

    private void OnEnable()
    {
        UpdateRecipeList();
    }

    private void UpdateRecipeList()
    {
        ClearList();
        IEnumerable<Recipe> recipes = TrainingManager.Instance.GetAllRecipes();

        foreach (Recipe recipe in recipes)
        {
            UIReorderableElement item = Instantiate(itemPrefab, itemsParent);
            RectTransform rectTransform = item.GetComponent<RectTransform>();
            item.Text.text = recipe.Name;
            item.Text.fontSize = sampleItem.Text.fontSize;
            rectTransform.sizeDelta = itemSizeDelta;
            item.GetComponent<UIBoxColliderAutoScaler>()?.AutoScale();
            
            item.OnClick.AddListener(() =>
            {
                OnRecipeClicked(recipe);
            });
        }
    }

    private void OnRecipeClicked(Recipe recipe)
    {
        OnRecipeSelected?.Invoke(recipe);
        
        if (shouldCloseOnSelect)
            gameObject.SetActive(false);
    }
    
    private void ClearList()
    {
        for (int i = 0; i < itemsParent.transform.childCount; i++)
        {
            Destroy(itemsParent.GetChild(i).gameObject);
        }
    }
}