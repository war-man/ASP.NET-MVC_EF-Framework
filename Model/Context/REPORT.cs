namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("REPORT")]
    public partial class REPORT
    {
        [Key]
        public int ReportId { get; set; }

        [Required(ErrorMessage ="Nội dung báo lỗi không được để trống!")]
        public string Description { get; set; }

        public int? MaKhachHang { get; set; }

        public int? MaDiaDiem { get; set; }

        public virtual DIADIEMSANBONG DIADIEMSANBONG { get; set; }
        public virtual KHACHHANG KHACHHANG { get; set; }
    }
}