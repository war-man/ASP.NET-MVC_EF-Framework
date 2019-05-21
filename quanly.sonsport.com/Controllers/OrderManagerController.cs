using Business.BusinessInterface;
using Business.BusinessViewModels;
using Model.Context;
using quanly.sonsport.com.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace quanly.sonsport.com.Controllers
{
    public class OrderManagerController : BaseController
    {
        private IOrderManagerBusiness OrderManagerBusiness;
        private IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private ICustomerOfMasterBusiness CustomerOfMasterBusiness;
        private IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;
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

        public JsonResult LoadOrderYard(int PlaceId)
        {
            var lstOrderDetails = OrderManagerBusiness.GetOrderDetails(MasterOfPlace.MaChuSan,PlaceId);
            List<OrderViewModels> lstOrder = new List<OrderViewModels>();
            if(lstOrderDetails.Count==0)
            {
                return Json(lstOrder, JsonRequestBehavior.AllowGet);
            }

            foreach (var od in lstOrderDetails)
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
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LoadFormAdd(string strDate,int PlaceId)
        {
            ViewData[GlobalConstans.ViewDataLstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            OrderDetailsViewModels od = new OrderDetailsViewModels
            {
                MasterId = MasterOfPlace.MaChuSan,
                KickAtDate = Convert.ToDateTime(strDate),
                PlaceId = PlaceId,
            };
            return PartialView("_FormAddOrderDetails", od);
        }

        [HttpPost]
        public ActionResult CreateOrderDetails(OrderDetailsViewModels model)
        {
            var lstPrice = OrderManagerBusiness.GetOrderDetails(MasterOfPlace.MaChuSan, model.PlaceId);
            int start = model.StartTime;
            int end = model.EndTime;
            int price = (int)model.Price;
            string Message = GlobalMethod.CustomValidateInputTimeAndPrice(start, end, price, lstPrice);
            if(!Message.Equals("success"))
            {
                return Json(new { success = false,message=Message });
            }
            ViewData[GlobalConstans.ViewDataLstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(model.PlaceId);
            if (ModelState.IsValid)
            {
                DATSAN ds = new DATSAN
                {
                    NgayDat = DateTime.Now,
                    TenNguoiDat=model.CustomerName,
                };
                OrderManagerBusiness.CreateOrder(ds);
                CHITIETDATSAN ctds = new CHITIETDATSAN
                {
                    DaVaoNgay = model.KickAtDate,
                    MaDatSan = ds.MaDatSan,
                    ThoiGianBatDau = model.StartTime,
                    ThoiGianKetThuc = model.EndTime,
                    MaChuSan = model.MasterId,
                    MaSanBong=model.YardId,
                };
                OrderManagerBusiness.CreateOrderDetails(ctds);
                return Json(new { success = true });
            }
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
            return Json(new {success=true , totalprice = price },JsonRequestBehavior.AllowGet);
        }
    }
}