namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DATSAN")]
    public partial class DATSAN
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DATSAN()
        {
            CHITIETDATSAN = new HashSet<CHITIETDATSAN>();
        }

        [Key]
        public int MaDatSan { get; set; }

        public DateTime? NgayDat { get; set; }

        public int? MaKhachHang { get; set; }

        public DateTime? NgayHuySan { get; set; }

        public string TenNguoiDat { get; set; }

        public bool? Status { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CHITIETDATSAN> CHITIETDATSAN { get; set; }

        public virtual KHACHHANG KHACHHANG { get; set; }
    }
}
