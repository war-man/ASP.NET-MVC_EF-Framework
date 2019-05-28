using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Web;
using Model.Context;

namespace Business.BusinessViewModels
{
    public class PlaceYardViewModel
    {
        public bool? IsActive { get; set; }
        public int? MaDiaDiem { get; set; }

        [Display(Name ="Tên địa điểm")]
        [StringLength(100)]
        [Required(ErrorMessage ="{0} không được để trống")]
        public string TenDiaDiem { get; set; }

        [Display(Name = "Mô tả địa điểm")]
        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(200)]
        public string MoTaDiaDiem { get; set; }

        [Display(Name = "Số điện thoại 1")]
        [Required(ErrorMessage = "{0} không được để trống")]
        [RegularExpression(@"[0]{1}[0-9, ,.]{8,}",ErrorMessage = "Số điện thoại tương tự như 0972612950. Tối thiểu 8 số.")]
        [StringLength(15)]
        public string Sdt1 { get; set; }

        [Display(Name = "Số điện thoại 2")]
        [RegularExpression(@"[0]{1}[0-9, ,.]{8,}", ErrorMessage = "Số điện thoại tương tự như 0972612950. Tối thiểu 8 số.")]
        [StringLength(15)]
        public string Sdt2 { get; set; }

        [Display(Name = "Địa chỉ")]
        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(100)]
        public string DiaChi { get; set; }

        [Display(Name = "Giờ mở cửa")]
        [RegularExpression(@"^([01]\d|2[0-4]):([0-5]\d)$", ErrorMessage = "Nhập theo định dạng 06:00 hoặc 14:00")]
        [Required(ErrorMessage = "{0} không được để trống")]
        public string GioMoCua { get; set; }

        [Display(Name = "Giờ đóng cửa")]
        [RegularExpression(@"^([01]\d|2[0-4]):([0-5]\d)$", ErrorMessage = "Nhập theo định dạng 06:00 hoặc 14:00")]
        public string GioDongCua { get; set; }

        [Display(Name = "Cần đặt cọc")]
        public bool CanDatCocKhiDatSan { get; set; }

        [Display(Name = "Có phí mượn bóng")]
        public bool CoPhiMuonBong { get; set; }

        [Display(Name = "Có phí nước uống")]
        public bool CoPhiNuocUongTrenSan { get; set; }

        public int? MaChuSan { get; set; }

        [Display(Name = "Quận")]
        public int DistrictId { get; set; }

        public string KeywordPlace { get; set; }

        public string KeywordAddress { get; set; }
    }
}
