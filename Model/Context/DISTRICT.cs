using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Context
{
    [Table("DISTRICT")]
    public partial class DISTRICT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DISTRICT()
        {
            DIADIEMSANBONG = new HashSet<DIADIEMSANBONG>();
            KHACHHANG = new HashSet<KHACHHANG>();
        }
        [Key]
        public int DistrictId { get; set; }

        [StringLength(100)]
        public string DistrictName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DIADIEMSANBONG> DIADIEMSANBONG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<KHACHHANG> KHACHHANG { get; set; }
    }
}
