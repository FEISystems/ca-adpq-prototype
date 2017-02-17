using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Models
{
    public class SelectItem
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public static IEnumerable<SelectItem> FromEnum<EnumType>()
        {
            foreach (var item in Enum.GetValues(typeof(EnumType)))
            {
                yield return new SelectItem { Id = Convert.ToInt32(item), Text = item.ToString() };
            }
        }
    }
}
