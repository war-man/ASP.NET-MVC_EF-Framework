using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class YardViewModels
    {
        public int? MaSanBong { get; set; }

        [StringLength(100)]
        [Display(Name = "Tên sân bóng")]
        [Required(ErrorMessage ="{0} tên sân bóng không được để trống!")]
        public string TenSanBong { get; set; }

        [Display(Name = "Loại sân")]
        public int? MaLoai { get; set; }

        [Required]
        public int? MaDiaDiem { get; set; }
    }
}
