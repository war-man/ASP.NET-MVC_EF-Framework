using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class MasterViewModels
    {
        public int MasterId { get; set; }

        public string MasterName { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [StringLength(25)]
        public string Email { get; set; }

        public string Password { get; set; }

    }
}
