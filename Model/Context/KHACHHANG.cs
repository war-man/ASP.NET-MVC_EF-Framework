namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KHACHHANG")]
    public partial class KHACHHANG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public KHACHHANG()
        {
            CHUSAN_KHACHHANG = new HashSet<CHUSAN_KHACHHANG>();
            DATSAN = new HashSet<DATSAN>();
        }

        [Key]
        public int MaKhachHang { get; set; }

        public string TenKhachHang { get; set; }

        [StringLength(15)]
        public string Sdt { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        public int? DistrictId { get; set; }
        public string Address { get; set; }

        public virtual DISTRICT DISTRICT { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CHUSAN_KHACHHANG> CHUSAN_KHACHHANG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DATSAN> DATSAN { get; set; }
    }
}
