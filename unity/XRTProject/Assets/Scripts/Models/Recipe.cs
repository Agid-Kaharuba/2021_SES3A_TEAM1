using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using Valve.Newtonsoft.Json;


[JsonObject(MemberSerialization.OptIn)]
public class Recipe
{
    [JsonProperty("name")]
    private string name;
    [JsonProperty("ingredients")]
    private List<PropData> ingredients = new List<PropData>();

    public IReadOnlyList<PropData> Ingredients => ingredients.AsReadOnly();
    
    public string Name => name;

    public Recipe(string name, IEnumerable<PropData> ingredients)
    {
        this.name = name;
        this.ingredients = ingredients.ToList();
    }
    
    public Recipe(string name, params PropData[] ingredients)
    {
        this.name = name;
        this.ingredients = ingredients.ToList();
    }

    public Recipe(string name, params string[] propIds)
    {
        this.name = name;
        
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
        return this.name == other.name && HasSameIngredients(other);
    }

    public bool HasSameIngredients(Recipe other)
    {
        return !Ingredients.Except(other.Ingredients).Any();
    }
}