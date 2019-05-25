using Business.BusinessInterface;
using Business.BusinessViewModels;
using Model.Context;
using quanly.sonsport.com.Common;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace quanly.sonsport.com.Controllers
{
    [Authorize(Roles = ("CHUSAN,CHUSAN_NHANVIEN"))]
    public class OrderManagerController : BaseController
    {
        private readonly IOrderManagerBusiness OrderManagerBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly ICustomerOfMasterBusiness CustomerOfMasterBusiness;
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;
        public OrderManagerController(IPriceOfYardFootBallBusiness priceOfYardFootBallBusiness,
        IPlaceYardFootballBusiness placeYardFootballBusiness,
        ICustomerOfMasterBusiness customerOfMasterBusiness,
        IYardFootballOfPlaceBusiness yardFootballOfPlaceBusiness,
            IOrderManagerBusiness orderManagerBusiness)
        {
            this.PriceOfYardFootBallBusiness = priceOfYardFootBallBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
            this.CustomerOfMasterBusiness = customerOfMasterBusiness;
            this.YardFootballOfPlaceBusiness = yardFootballOfPlaceBusiness;
            this.OrderManagerBusiness = orderManagerBusiness;
        }
        // GET: OrderManager
        public ActionResult Index()
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan).OrderBy(n => n.MaDiaDiem).ToList();
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlace;
            return View();
        }

        public ActionResult CheckYardOfPlace(int PlaceId)
        {
            var lstYardOfPlace = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            if(lstYardOfPlace.Count>0)
            {
                return Json(new { IsHaveLstYard = true }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { IsHaveLstYard = false }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadOrderYard(int PlaceId)
        {
            var lstOrderDetails = OrderManagerBusiness.GetOrderDetails(MasterOfPlace.MaChuSan,PlaceId,null);
            List<OrderViewModels> lstOrder = new List<OrderViewModels>();
            if(lstOrderDetails.Count==0)
            {
                return Json(lstOrder, JsonRequestBehavior.AllowGet);
            }

            foreach (var od in lstOrderDetails)
            {
                var date = od.DaVaoNgay;
                var checkDatetime = new DateTime(date.Year, date.Month, date.Day, od.ThoiGianBatDau,0,0);
                if(checkDatetime > DateTime.Now)
                {
                    lstOrder.Add(new OrderViewModels
                    {
                        id = od.MaDatSan.ToString(),
                        start = $"{od.DaVaoNgay.ToString("yyyy-MM-dd")}T{GlobalMethod.ConvertIntToHour(od.ThoiGianBatDau)}",
                        end = $"{od.DaVaoNgay.ToString("yyyy-MM-dd")}T{GlobalMethod.ConvertIntToHour(od.ThoiGianKetThuc)}",
                        title = $"{YardFootballOfPlaceBusiness.SearchDetails(od.MaSanBong).TenSanBong}",
                        editable = false,
                        description = "aaaaaaaaaaa"
                    });
                }
                else
                {
                    lstOrder.Add(new OrderViewModels
                    {
                        id = od.MaDatSan.ToString(),
                        start = $"{od.DaVaoNgay.ToString("yyyy-MM-dd")}T{GlobalMethod.ConvertIntToHour(od.ThoiGianBatDau)}",
                        end = $"{od.DaVaoNgay.ToString("yyyy-MM-dd")}T{GlobalMethod.ConvertIntToHour(od.ThoiGianKetThuc)}",
                        title = $"{YardFootballOfPlaceBusiness.SearchDetails(od.MaSanBong).TenSanBong}",
                        editable = false,
                        description = "aaaaaaaaaaa",
                        backgroundColor= "#808080",
                        borderColor= "#808080",
                    });
                }
                
            }
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LoadFormAdd(string strDate,int PlaceId)
        {
            ViewData[GlobalConstans.ViewDataLstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            OrderDetailsViewModels od = new OrderDetailsViewModels
            {
                MasterId = MasterOfPlace.MaChuSan,
                KickAtDate = Convert.ToDateTime(strDate.Substring(0,10)),
                PlaceId = PlaceId,
            };
            return PartialView("_FormAddOrderDetails", od);
        }

        [HttpPost]
        public ActionResult CreateOrderDetails(OrderDetailsViewModels model)
        {
            int machusan = MasterOfPlace.MaChuSan;
            var lstPrice = OrderManagerBusiness.GetOrderDetails(machusan, model.PlaceId,model.YardId);
            int start = model.StartTime;
            int end = model.EndTime;
            int price = (int)model.Price;
            string Message = GlobalMethod.CustomValidateInputTimeAndPrice(start, end, price, lstPrice,model.KickAtDate);
            if(!Message.Equals("success"))
            {
                TempData[GlobalConstans.MessageFailBootBox] = Message;
                return Json(new { success = false,message=Message });
            }
            ViewData[GlobalConstans.ViewDataLstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(model.PlaceId);
            if (ModelState.IsValid)
            {
                DATSAN ds = new DATSAN
                {
                    NgayDat = DateTime.Now,
                    TenNguoiDat=model.CustomerName,
                    PhoneNumber=model.PhoneNumber
                };
                OrderManagerBusiness.CreateOrder(ds);
                CHITIETDATSAN ctds = new CHITIETDATSAN
                {
                    GiaTien=price,
                    DaVaoNgay = model.KickAtDate,
                    MaDatSan = ds.MaDatSan,
                    ThoiGianBatDau = model.StartTime,
                    ThoiGianKetThuc = model.EndTime,
                    MaChuSan = model.MasterId,
                    MaSanBong=model.YardId,
                    MaDiaDiem=model.PlaceId
                };
                OrderManagerBusiness.CreateOrderDetails(ctds);
                TempData[GlobalConstans.MessageSuccessBootBox] = "Đã thêm lịch đặt";
                return Json(new { success = true });
            }
            TempData[GlobalConstans.MessageFailBootBox] = "Có lỗi xảy ra!";
            return Json(new { success = false,message="Có lỗi xảy ra!" });
        }

        public JsonResult CaculatorPrice(int start,int end,int YardId)
        {
            var lstPrice = PriceOfYardFootBallBusiness.GetPriceTableByYardId(YardId);
            int totalTime = end - start;
            int price = 0;
            foreach(var item in lstPrice)
            {
                if(start>=item.GioBatDau && end<=item.GioKetThuc)
                {
                    price = totalTime * (int)item.GiaTien;
                }
            }
            if(price!=0)
            {
                return Json(new { success = true, totalprice = price }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, totalprice = "Giá sân ko xác định được. Hãy nhập vào!" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LoadFormShow(int OrderId)
        {
            var od = OrderManagerBusiness.GetOrderDetailsByOrderId(OrderId);
            ViewData[GlobalConstans.ViewDataLstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(od.PlaceId);
            return PartialView("_FormShowEvent", od);
        }

        public ActionResult DeleteOrderDetails(int OrderId)
        {
            OrderManagerBusiness.DeleteOrderDetails(OrderId);
            TempData[GlobalConstans.MessageSuccessBootBox] = "Đã xóa lịch đặt sân!";
            return Json(new JsonMessage { Type = JsonMessage.SUCCESS, Message = "Hủy sân thành công!" },JsonRequestBehavior.AllowGet);
        }
    }
}