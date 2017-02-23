using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    /// <summary>
    /// Exposes methods that are only available to expedite testing and demoing of the prototype
    /// </summary>
    public interface IPrototypeService
    {
        string DeleteAllEntities();
    }
}
