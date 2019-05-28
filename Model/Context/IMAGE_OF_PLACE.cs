
namespace Model.Context
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class IMAGE_OF_PLACE
    {
        [Key]
        public int ImageOfPlaceId { get; set; }

        public int? MaDiaDiem { get; set; }

        public int? FileId { get; set; }

        public virtual DIADIEMSANBONG DIADIEMSANBONG { get; set; }

        public virtual FILE FILE { get; set; }
    }
}
