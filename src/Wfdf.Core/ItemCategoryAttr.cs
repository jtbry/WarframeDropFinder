namespace Wfdf.Core;

public class ItemCategoryAttr : System.Attribute
{
    public string Category { get; init; } 
    public ItemCategoryAttr(string category)
    {
        Category = category;
    }
}