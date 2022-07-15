using System.Text;
using System.Text.Json;

namespace Wfdf.Core.Config;

public class WfmJsonNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name)
    {
        StringBuilder newNameBuilder = new StringBuilder(name.Length * 2);
        newNameBuilder.Append(name[0]);
        for (int i = 1; i < name.Length; i++)
        {
            if (char.IsUpper(name[i]))
                if ((name[i - 1] != ' ' && !char.IsUpper(name[i - 1])) ||
                    (char.IsUpper(name[i - 1]) &&
                     i < name.Length - 1 && !char.IsUpper(name[i + 1])))
                    newNameBuilder.Append('_');
            newNameBuilder.Append(name[i]);
        }
        return newNameBuilder.ToString().ToLower();
    }
}