namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NHANVIEN")]
    public partial class NHANVIEN
    {
        [Key]
        public int MaNhanVien { get; set; }

        [StringLength(50)]
        public string TenNhanVien { get; set; }

        public int? MaDiaDiem { get; set; }

        [StringLength(20)]
        public string ChucVu { get; set; }

        public int? MaChuSan { get; set; }

        public string Email { get; set; }

        public string SoDienThoai { get; set; }

        public virtual CHUSANQUANLY CHUSANQUANLY { get; set; }

        public virtual DIADIEMSANBONG DIADIEMSANBONG { get; set; }
    }
}
