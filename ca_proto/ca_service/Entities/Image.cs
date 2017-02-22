using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.images")]
    public class Image:Entity
    {
        public Image(int id) :base(id)
        {

        }

        [DbColumn(System.Data.DbType.String)]
        public string ImageFileName { get; set; }

        [DbColumn(System.Data.DbType.Object)]
        public byte[] Buffer { get; set; }
    }
}
