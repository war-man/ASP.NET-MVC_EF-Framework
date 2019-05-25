using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class OrderViewModels
    {
        public string id { get; set; }
        public string title { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public bool? editable { get; set; }
        public string description { get; set; }

        public string kickatdate { get; set; }

        public string backgroundColor { get; set; }
        public string borderColor { get; set; }
    }

    public class OrderYardViewModels
    {
        public int PlaceId { get; set; }

        public string PlaceName { get; set; }

        public string PlaceAddress { get; set; }

        public int YardId { get; set; }

        public string YardName { get; set; }

        public string KickAtDate { get; set; }

        public string CreatedDate { get; set; }

        public string StartTime { get; set; }

        public string Duration { get; set; }

        public string EndTime { get; set; }
    }
}
