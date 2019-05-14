using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class PlaceYardViewModel
    {
        public int? MaDiaDiem { get; set; }

        [Display(Name ="Tên địa điểm")]
        [StringLength(100)]
        [Required]
        public string TenDiaDiem { get; set; }

        [Display(Name = "Mô tả địa điểm")]
        [Required]
        [StringLength(200)]
        public string MoTaDiaDiem { get; set; }

        [Display(Name = "Số điện thoại 1")]
        [Required]
        [StringLength(15)]
        public string Sdt1 { get; set; }

        [Display(Name = "Số điện thoại 2")]
        [StringLength(15)]
        public string Sdt2 { get; set; }

        [Display(Name = "Địa chỉ")]
        [Required]
        [StringLength(100)]
        public string DiaChi { get; set; }

        [Display(Name = "Giờ mở cửa")]
        [Required]
        public int? GioMoCua { get; set; }

        [Display(Name = "Giờ đóng cửa")]
        [Required]
        public int? GioDongCua { get; set; }

        [Display(Name = "Cần đặt cọc")]
        public bool CanDatCocKhiDatSan { get; set; }

        [Display(Name = "Có phí mượn bóng")]
        public bool CoPhiMuonBong { get; set; }

        [Display(Name = "Có phí nước uống")]
        public bool CoPhiNuocUongTrenSan { get; set; }

        public int? MaChuSan { get; set; }

        [Display(Name = "Quận")]
        [StringLength(20)]
        public string Quan { get; set; }

    }
}
