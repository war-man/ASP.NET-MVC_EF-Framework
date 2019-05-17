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

        [Required]
        [StringLength(50)]
        [Display(Name ="Tên nhân viên:")]
        public string TenNhanVien { get; set; }

        [Display(Name = "Nơi làm việc:")]
        public int? MaDiaDiem { get; set; }

        [StringLength(20)]
        [Display(Name = "Chức vụ:")]
        public string ChucVu { get; set; }

        public int? MaChuSan { get; set; }

        [Required]
        [Display(Name = "Email:")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Số điện thoại:")]
        [Phone]
        public string SoDienThoai { get; set; }

        public bool? IsHaveAccount { get; set; }

        public virtual CHUSANQUANLY CHUSANQUANLY { get; set; }

        public virtual DIADIEMSANBONG DIADIEMSANBONG { get; set; }
    }
}
