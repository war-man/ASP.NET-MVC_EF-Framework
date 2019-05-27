using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class RegisterMasterViewModels
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name ="Tên chủ sân")]
        public string MasterName { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name ="Địa chỉ Email")]
        [EmailAddress(ErrorMessage ="{0} phải đúng định dạng vd: anson.hs38@gmail.com")]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(100, ErrorMessage = "{0} phải lớn hơn {2} kí tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Nhập lại mật khẩu")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "Mật khẩu nhập lại không đúng")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name="Tên địa điểm sân bóng")]
        public string PlaceName { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Số điện thoại 1")]
        [RegularExpression(@"[0]{1}[0-9, ,.]{8,}", ErrorMessage = "Nhập số điện thoại bàn hoặc di động như 15DTH13 hay 0972612950")]
        public string PhoneNumber1 { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Số điện thoại 2")]
        [RegularExpression(@"[0]{1}[0-9, ,.]{8,}", ErrorMessage = "Nhập số điện thoại bàn hoặc di động như 15DTH13 hay 0972612950")]
        public string PhoneNumber2 { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Giờ mở cửa")]
        [RegularExpression(@"^([01]\d|2[0-4]):([0-5]\d)$", ErrorMessage = "Nhập theo định dạng 06:00 hoặc 14:00")]
        public string OpenTime { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Giờ đóng cửa")]
        [RegularExpression(@"^([01]\d|2[0-4]):([0-5]\d)$", ErrorMessage = "Nhập theo định dạng 06:00 hoặc 14:00")]
        public string CloseTime { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Địa chỉ")]
        public string Address { get; set; }

        [Display(Name = "Quận/Huyện")]
        public int DistrictId { get; set; }
    }
}
