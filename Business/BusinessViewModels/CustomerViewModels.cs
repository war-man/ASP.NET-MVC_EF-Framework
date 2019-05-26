using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class CustomerViewModels
    {
        public int? MaKhachHang { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Tên khách hàng")]
        public string TenKhachHang { get; set; }

        [StringLength(15)]
        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Số điện thoại")]
        [RegularExpression(@"[0]{1}[0-9, ,.]{8,}", ErrorMessage = "Nhập số điện thoại bàn hoặc di động như 15DTH13 hay 0972612950")]
        public string Sdt { get; set; }

        [StringLength(20)]
        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "{0} phải đúng định dạng vd: anson.hs38@gmail.com")]
        public string Email { get; set; }

        [Display(Name = "Địa chỉ")]
        public string Address { get; set; }
    }
}
