using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace quanly.sonsport.com.Models
{
    public class PlaceYardViewModel
    {
        public int? MaDiaDiem { get; set; }

        [StringLength(100)]
        [Required]
        public string TenDiaDiem { get; set; }

        [Required]
        [StringLength(200)]
        public string MoTaDiaDiem { get; set; }

        [Required]
        [StringLength(15)]
        public string Sdt1 { get; set; }

        [StringLength(15)]
        public string Sdt2 { get; set; }

        [Required]
        [StringLength(100)]
        public string DiaChi { get; set; }

        [Required]
        public int? GioMoCua { get; set; }

        [Required]
        public int? GioDongCua { get; set; }

        public bool CanDatCocKhiDatSan { get; set; }

        public bool CoPhiMuonBong { get; set; }

        public bool CoPhiNuocUongTrenSan { get; set; }

        public int? MaChuSan { get; set; }

        [StringLength(20)]
        public string Quan { get; set; }

    }
}