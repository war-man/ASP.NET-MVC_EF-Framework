namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FILE")]
    public partial class FILE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FILE()
        {
            IMAGE_OF_PLACE = new HashSet<IMAGE_OF_PLACE>();
        }

        public int FileId { get; set; }

        public string FileName { get; set; }

        public string ContentType { get; set; }

        [Column(TypeName = "image")]
        public byte[] Code { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<IMAGE_OF_PLACE> IMAGE_OF_PLACE { get; set; }
    }
}
