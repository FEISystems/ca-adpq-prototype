using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using System.ComponentModel;

namespace ca_proto.Helpers
{
    public static class EnumExtensions
    {
        private static readonly Dictionary<Enum, string> descriptions = new Dictionary<Enum, string>();
        public static string Description(this Enum value)
        {
            string result;
            if (!descriptions.TryGetValue(value, out result))
            {
                lock (descriptions)
                {
                    if (!descriptions.TryGetValue(value, out result))
                    {
                        FieldInfo fi = value.GetType().GetField(value.ToString());
                        if (null == fi)
                        {
                            result = value.ToString();
                            descriptions.Add(value, result);
                        }
                        else
                        {
                            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);
                            if (attributes != null && attributes.Length > 0)
                            {
                                result = attributes[0].Description;
                                descriptions.Add(value, result);
                            }
                            else
                            {
                                result = value.ToString();
                                descriptions.Add(value, result);
                            }
                        }
                    }
                }
            }
            return result;
        }
    }
}
