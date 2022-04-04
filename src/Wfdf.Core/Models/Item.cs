namespace Wfdf.Core.Models;
using MongoDB.Bson;

public class Item
{
    public string uniqueName { get; set; } = string.Empty;
    public string category { get; set; } = string.Empty;
}