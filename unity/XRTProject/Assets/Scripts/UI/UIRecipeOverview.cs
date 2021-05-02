using System;
using System.Text;
using TMPro;
using UnityEngine;


public class UIRecipeOverview : MonoBehaviour
{
    [SerializeField] private TMP_Text titleText;
    [SerializeField] private GameObject content;
    [SerializeField] private TMP_Text ingredientList;

    private void Start()
    {
        UpdateRecipe();
        TrainingManager.Instance.OnCurrentTaskChanged.AddListener(UpdateRecipe);
    }

    private void OnDestroy()
    {
        TrainingManager.Instance.OnCurrentTaskChanged.RemoveListener(UpdateRecipe);
    }

    private void UpdateRecipe()
    {
        TrainingManager trainingManager = TrainingManager.Instance;

        if (trainingManager.HasCurrentTask && trainingManager.CurrentTask.ShouldShowRecipe)
        {
            content.SetActive(true);
            Recipe recipe = trainingManager.CurrentTask.Recipe;
            titleText.text = $"{recipe.Name} Recipe";
            WriteIngredientList(recipe);
        }
        else
        {
            content.SetActive(false);
        }
    }
    
    private void WriteIngredientList(Recipe recipe)
    {
        StringBuilder stringBuilder = new StringBuilder();
        
        foreach (PropData propData in recipe.Ingredients)
        {
            stringBuilder.Append($"- {propData.DisplayName}\n");
        }

        ingredientList.text = stringBuilder.ToString();
    }
}