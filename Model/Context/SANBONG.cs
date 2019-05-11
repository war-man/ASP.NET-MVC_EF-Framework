namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SANBONG")]
    public partial class SANBONG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SANBONG()
        {
            BANGGIALOAISAN = new HashSet<BANGGIALOAISAN>();
        }

        [Key]
        public int MaSanBong { get; set; }

        [StringLength(100)]
        public string TenSanBong { get; set; }

        public int? MaLoai { get; set; }

        public int? MaDiaDiem { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BANGGIALOAISAN> BANGGIALOAISAN { get; set; }

        public virtual DIADIEMSANBONG DIADIEMSANBONG { get; set; }

        public virtual LOAISANBONG LOAISANBONG { get; set; }
    }
}
