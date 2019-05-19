namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CHITIETDATSAN")]
    public partial class CHITIETDATSAN
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaSanBong { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaDatSan { get; set; }

        [Column(TypeName = "date")]
        public DateTime DaVaoNgay { get; set; }

        public int ThoiGianBatDau { get; set; }

        public int ThoiGianKetThuc { get; set; }

        public double? GiaTien { get; set; }

        public string PaymentMethod { get; set; }

        public bool? TrangThaiThanhToan { get; set; }

        public int? MaChuSan { get; set; }

        public virtual DATSAN DATSAN { get; set; }

        public virtual CHUSANQUANLY CHUSANQUANLY { get; set; }
    }
}
