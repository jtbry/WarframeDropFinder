namespace Wfdf.Core;

public class ItemCategoryAttribute : System.Attribute
{
    public string Category { get; init; }
    public ItemCategoryAttribute(string category)
    {
        Category = category;
    }
}