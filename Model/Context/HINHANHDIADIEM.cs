namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("HINHANHDIADIEM")]
    public partial class HINHANHDIADIEM
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public HINHANHDIADIEM()
        {
            DIADIEMSANBONG = new HashSet<DIADIEMSANBONG>();
        }

        [Key]
        public int MaHinhAnh { get; set; }

        [StringLength(200)]
        public string Code { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DIADIEMSANBONG> DIADIEMSANBONG { get; set; }
    }
}
