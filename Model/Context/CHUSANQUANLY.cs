namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CHUSANQUANLY")]
    public partial class CHUSANQUANLY
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CHUSANQUANLY()
        {
            CHUSAN_KHACHHANG = new HashSet<CHUSAN_KHACHHANG>();
            DIADIEMSANBONG = new HashSet<DIADIEMSANBONG>();
            NHANVIEN = new HashSet<NHANVIEN>();
        }

        [Key]
        public int MaChuSan { get; set; }

        [StringLength(50)]
        public string TenChuSan { get; set; }

        [StringLength(15)]
        public string Sdt { get; set; }

        public bool IsActive { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CHUSAN_KHACHHANG> CHUSAN_KHACHHANG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DIADIEMSANBONG> DIADIEMSANBONG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NHANVIEN> NHANVIEN { get; set; }
    }
}
