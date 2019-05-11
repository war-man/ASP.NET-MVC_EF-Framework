namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BANGGIALOAISAN")]
    public partial class BANGGIALOAISAN
    {
        [Key]
        public int MaBangGiaLoaiSan { get; set; }

        public int? GioBatDau { get; set; }

        public int? GioKetThuc { get; set; }

        public string NgayTrongTuan { get; set; }

        public int? MaSanBong { get; set; }

        public int? GiaTien { get; set; }

        public virtual SANBONG SANBONG { get; set; }
    }
}
