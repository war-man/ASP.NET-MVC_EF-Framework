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

        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(50)]
        [Display(Name ="Tên nhân viên")]
        public string TenNhanVien { get; set; }

        [Display(Name = "Nơi làm việc")]
        public int? MaDiaDiem { get; set; }

        [StringLength(20)]
        [Display(Name = "Chức vụ")]
        public string ChucVu { get; set; }

        public int? MaChuSan { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "{0} không đúng định dạng")]
        public string Email { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Số điện thoại")]
        [RegularExpression(@"[0]{1}[0-9]{8,}",ErrorMessage ="Số điện thoại tương tự như: 0972612950. Tối thiểu 8 số")]
        public string SoDienThoai { get; set; }

        public bool? IsHaveAccount { get; set; }

        public virtual CHUSANQUANLY CHUSANQUANLY { get; set; }

        public virtual DIADIEMSANBONG DIADIEMSANBONG { get; set; }
    }
}
