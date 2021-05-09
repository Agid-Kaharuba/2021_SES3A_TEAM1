using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using Valve.Newtonsoft.Json;


[JsonObject(MemberSerialization.OptIn)]
public class Recipe
{
    [JsonProperty("ingredients")]
    private List<PropData> ingredients = new List<PropData>();

    public IReadOnlyList<PropData> Ingredients => ingredients.AsReadOnly();
    
    [JsonProperty("_id")]
    public string Id { get; private set; }
    
    [JsonProperty("name")]
    public string Name { get; private set; }

    [JsonConstructor]
    public Recipe(string name, IEnumerable<PropData> ingredients)
    {
        Name = name;
        this.ingredients = ingredients.ToList();
    }
    
    public Recipe(string name, params PropData[] ingredients)
    {
        Name = name;
        this.ingredients = ingredients.ToList();
    }

    public Recipe(string name, params string[] propIds)
    {
        Name = name;
        
        foreach (string propId in propIds)
        {
            PropData propData = PropManager.Instance.GetProp(propId);

            if (propData == null)
            {
                Debug.LogError($"Could not find a prop with prop id '{propId}'");
            }
            else
            {
                ingredients.Add(propData);
            }
        }
    }

    public bool IsSameRecipe(Recipe other)
    {
        return this.Name == other.Name && HasSameIngredients(other);
    }

    public bool HasSameIngredients(Recipe other)
    {
        return !Ingredients.Except(other.Ingredients).Any();
    }

    public void SetIngredients(IEnumerable<PropData> ingredients)
    {
        this.ingredients = new List<PropData>(ingredients);
    }

    public int CalculateScore(Recipe sampleRecipe, int maxScore)
    {
        float totalScore = 0f;
        float singleItemScore = maxScore / (float) Ingredients.Count;

        for (int i = 0; i < Ingredients.Count; i++)
        {
            int targetIndex = i;
            PropData expectedIngredient = Ingredients[i];

            while (targetIndex < sampleRecipe.Ingredients.Count)
            {
                PropData foundIngredient = sampleRecipe.Ingredients[targetIndex++];

                // If we found the correct ingredients
                if (expectedIngredient == foundIngredient)
                {
                    // If found in the same place as expected, it will just return the singleItemScore
                    totalScore += singleItemScore / 1f + (targetIndex - i);
                }
            }
        }

        totalScore /= Mathf.Max(1f, 1f + (sampleRecipe.Ingredients.Count - Ingredients.Count));
        
        return Mathf.RoundToInt(Mathf.Max(0, totalScore));
    }
}