using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class PriceOfYardViewModels
    {
        public int? MaBangGiaLoaiSan { get; set; }

        [Required]
        [Range(0, 24, ErrorMessage = "Bạn nhập sai định dạng của giờ")]
        public int? GioBatDau { get; set; }

        [Range(0, 24, ErrorMessage = "Bạn nhập sai định dạng của giờ")]
        [Required]
        public int? GioKetThuc { get; set; }

        public string NgayTrongTuan { get; set; }

        [Required]
        public int? MaSanBong { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Số tiền nhập quá lớn")]
        [Required]
        public int? GiaTien { get; set; }
    }
}
