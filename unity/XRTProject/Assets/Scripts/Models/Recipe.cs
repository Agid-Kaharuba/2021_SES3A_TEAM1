using System.Collections.Generic;
using System.Linq;
using UnityEngine;


public class Recipe
{
    private readonly List<PropData> ingredients = new List<PropData>();

    public IReadOnlyList<PropData> Ingredients => ingredients.AsReadOnly();

    public Recipe(params PropData[] ingredients)
    {
        this.ingredients = ingredients.ToList();
    }

    public Recipe(params string[] propIds)
    {
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
}