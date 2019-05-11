namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CHUSAN_KHACHHANG
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaKhachHang { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaChuSan { get; set; }

        public int? SoLanDatSan { get; set; }

        public int? SoLanHuy { get; set; }

        public virtual KHACHHANG KHACHHANG { get; set; }

        public virtual CHUSANQUANLY CHUSANQUANLY { get; set; }
    }
}
