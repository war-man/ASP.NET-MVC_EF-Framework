namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DIADIEMSANBONG")]
    public partial class DIADIEMSANBONG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DIADIEMSANBONG()
        {
            NHANVIEN = new HashSet<NHANVIEN>();
            SANBONG = new HashSet<SANBONG>();
        }

        [Key]
        public int MaDiaDiem { get; set; }

        [StringLength(100)]
        public string TenDiaDiem { get; set; }

        [StringLength(200)]
        public string MoTaDiaDiem { get; set; }

        [StringLength(15)]
        public string Sdt1 { get; set; }

        [StringLength(15)]
        public string Sdt2 { get; set; }

        [StringLength(100)]
        public string DiaChi { get; set; }

        public int? GioMoCua { get; set; }

        public int? GioDongCua { get; set; }

        public bool CanDatCocKhiDatSan { get; set; }

        public bool CoPhiMuonBong { get; set; }

        public bool CoPhiNuocUongTrenSan { get; set; }

        public int? MaHinhAnh { get; set; }

        public int? MaChuSan { get; set; }

        [StringLength(20)]
        public string Quan { get; set; }

        public bool? IsActive { get; set; }

        public virtual CHUSANQUANLY CHUSANQUANLY { get; set; }

        public virtual HINHANHDIADIEM HINHANHDIADIEM { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NHANVIEN> NHANVIEN { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SANBONG> SANBONG { get; set; }
    }
}
