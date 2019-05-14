using Model.Application;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class RoleViewModels
    {
        public RoleViewModels() { }

        public RoleViewModels(ApplicationRole role)
        {
            Id = role.Id;
            Name = role.Name;
        }

        public string Id { get; set; }

        [Display(Name = "Tên quyền: ")]
        [Required]
        public string Name { get; set; }
    }
}
