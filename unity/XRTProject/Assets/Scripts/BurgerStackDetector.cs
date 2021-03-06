using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class BurgerStackDetector : MonoBehaviour
{
    [SerializeField] public UnityEvent OnAboveItemChanged;
    [SerializeField] public UnityEvent OnBelowItemChanged;
    
    private List<BurgerItem> surroundingItems = new List<BurgerItem>();
    private BurgerItem currentItem;
    private BurgerItem lastAboveItem;
    private BurgerItem lastBelowItem;
    
    public BurgerItem AboveItem { get; private set; }
    public BurgerItem BelowItem { get; private set; }

    public void SetCurrentItem(BurgerItem burgerItem)
    {
        currentItem = burgerItem;
    }
    
    private void OnTriggerEnter(Collider other)
    {
        BurgerItem item = other.GetComponent<BurgerItem>();

        if (item != null && item != currentItem)
        {
            surroundingItems.Add(item);
            SetupSurroundingItems();
        }
    }

    private void OnTriggerExit(Collider other)
    {
        BurgerItem item = other.GetComponent<BurgerItem>();

        if (item != null && item != currentItem)
        {
            surroundingItems.Remove(item);
            SetupSurroundingItems();
        }
    }

    private void SetupSurroundingItems()
    {
        BurgerItem bestAboveItem = null;
        Vector3 bestAbovePosition = Vector3.positiveInfinity;
        BurgerItem bestBelowItem = null;
        Vector3 bestBelowPosition = Vector3.negativeInfinity;

        foreach (BurgerItem item in surroundingItems) 
        {
            if (item.transform.position.y > transform.position.y && item.transform.position.y < bestAbovePosition.y)
            {
                bestAboveItem = item;
                bestAbovePosition = item.transform.position;
            }

            if (item.transform.position.y < transform.position.y && item.transform.position.y > bestBelowPosition.y)
            {
                bestBelowItem = item;
                bestBelowPosition = item.transform.position;
            }
        }

        AboveItem = bestAboveItem;
        BelowItem = bestBelowItem;

        if (lastAboveItem != AboveItem)
        {
            lastAboveItem = AboveItem;
            OnAboveItemChanged?.Invoke();
        }

        if (lastBelowItem != BelowItem)
        {
            lastBelowItem = BelowItem;
            OnBelowItemChanged?.Invoke();
        }
    }
}
