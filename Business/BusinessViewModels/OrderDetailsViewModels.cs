using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessViewModels
{
    public class OrderDetailsViewModels
    {
        public int MasterId { get; set; }

        [Required]
        [Display(Name = "Đá tại sân:")]
        public int YardId { get; set; }
        public string YardName { get; set; }
        public int CustomerId { get; set; }

        [Required]
        [Display(Name = "Tên người đặt:")]
        public string CustomerName { get; set; }

        [Required]
        [Display(Name = "Số điện thoại:")]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [Display(Name = "Đá vào ngày:")]
        [DataType(DataType.Date)]
        public DateTime KickAtDate { get; set; }

        [Display(Name = "Giờ bắt đầu")]
        [Range(0,24,ErrorMessage = "{0} phải nằm trong khoảng {1} giờ đến {2} giờ.")]
        public int StartTime { get; set; }

        [Display(Name = "Giờ kết thúc:")]
        [Range(0,24, ErrorMessage = "{0} phải nằm trong khoảng {1} giờ đến {2} giờ.")]
        public int EndTime { get; set; } 
        public int? OrderId { get; set; }

        [Required]
        [Display(Name = "Gía tiền:")]
        public int? Price { get; set; }

        public bool IsEditPrice { get; set; }
        public bool StatusPayment { get; set; }
        public int PaymentMethod { get; set; }

        public int PlaceId { get; set; }
    }
}
