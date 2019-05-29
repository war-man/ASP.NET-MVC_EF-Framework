using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sonsport.com.Common;
using Business.BusinessExtension;
using Business.BusinessInterface;
using Model.Context;
using Business.BusinessViewModels;

namespace sonsport.com.Controllers
{
    public class PlaceYardController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly IOrderManagerBusiness OrderManagerBusiness;
        private readonly IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;

        public PlaceYardController(IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness,
        IOrderManagerBusiness OrderManagerBusiness,
        IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness,
        IPlaceYardFootballBusiness PlaceYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = PlaceYardFootballBusiness;
            this.YardFootballOfPlaceBusiness = YardFootballOfPlaceBusiness;
            this.OrderManagerBusiness = OrderManagerBusiness;
            this.PriceOfYardFootBallBusiness = PriceOfYardFootBallBusiness;
        }
        // GET: PlaceYard
        public ActionResult Index(int PlaceId, string strDate=null)
        {
            ViewData[GlobalConstans.Place] = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
            ViewData[GlobalConstans.DateView] = GlobalMethod.ParseStringToDateTime(strDate);
            ViewData[GlobalConstans.LstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId).Where(n=>n.IsActive==true).ToList();
            ViewData[GlobalConstans.LstOrderDetailsOfYard] = OrderManagerBusiness.GetOrderDetails(null, PlaceId, null);
            ViewData[GlobalConstans.LstPriceOfYard] = PriceOfYardFootBallBusiness.Search(null);
            return View();
        }

        public ActionResult LoadFormReport()
        {
            return PartialView("_FormReport");
        }

        public ActionResult LoadFormOrderYard(int PlaceId)
        {
            var Place = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);

            ViewData[GlobalConstans.LstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(Place.MaDiaDiem);
            ViewData[GlobalConstans.DateView]= GlobalMethod.ParseToListStringDateView();
            var OrderYard = new OrderYardViewModels
            {
                CreatedDate = DateTime.Now.ToString(),
                PlaceId = Place.MaDiaDiem,
                PlaceAddress = Place.DiaChi,
                PlaceName = Place.TenDiaDiem,
            };
            return PartialView("_FormOrderYard", OrderYard);
        }

        public ActionResult LoadStartTime(int YardId,string strDate)
        {
            var arrStrDate = strDate.Split(',');
            strDate = arrStrDate[1].Trim();
            var lstOrderInYard = OrderManagerBusiness.GetOrderDetailsByNgayDat(DateTime.Parse(strDate).Date);
            lstOrderInYard = lstOrderInYard.Where(n => n.MaSanBong == YardId).ToList();
            var Place = PlaceYardFootballBusiness.SearchInfoPlaceByYardId(YardId);
            int OpenTime = (int)Place.GioMoCua;
            int CloseTime = (int)Place.GioDongCua;
            var listStartTime = GlobalMethod.ListStartTimeByYardId(YardId, OpenTime, CloseTime, lstOrderInYard);
            return Json(new { data = listStartTime }, JsonRequestBehavior.AllowGet);
        }

        #region Helper
        private int CaculatorPrice(int start,int end,List<BANGGIALOAISAN> lstPriceByYardId)
        {
            int totalTime = end - start;
            int price = 0;
            foreach (var item in lstPriceByYardId)
            {
                if (start >= item.GioBatDau && end <= item.GioKetThuc)
                {
                    price = totalTime * (int)item.GiaTien;
                }
            }
            return price;
        }
        #endregion

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult OrderYard(FormCollection form)
        {
            var Place = PlaceYardFootballBusiness.SearchInfoPlace(int.Parse(form["PlaceId"]));
            ViewData[GlobalConstans.LstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(Place.MaDiaDiem);
            ViewData[GlobalConstans.DateView] = GlobalMethod.ParseToListStringDateView();
            var OrderYard = new OrderYardViewModels
            {
                CreatedDate = DateTime.Now.ToString(),
                PlaceId = Place.MaDiaDiem,
                PlaceAddress = Place.DiaChi,
                PlaceName = Place.TenDiaDiem,
            };
            var Yard = YardFootballOfPlaceBusiness.SearchDetails(int.Parse(form["YardId"]));
            var lstPriceByYardId = PriceOfYardFootBallBusiness.GetPriceTableByYardId(Yard.MaSanBong);
            int start = int.Parse(form["begin_time"].Substring(0, 2));
            var checkStartHour = DateTime.Now;
            if (start < checkStartHour.AddHours(+5).Hour)
            {
                ModelState.AddModelError("Basic", "Không hỗ trợ đặt sân trước giờ thi đấu 5 tiếng. Vui lòng gọi điện cho chủ sân hoặc chọn giờ khác!");
                return PartialView("_FormOrderYard", OrderYard);
            }
            int end = start + int.Parse(form["how_long"]);
            CHITIETDATSAN orderDetails = new CHITIETDATSAN
            {
                MaDiaDiem = Place.MaDiaDiem,
                MaSanBong = int.Parse(form["YardId"]),
                DaVaoNgay = DateTime.Parse(form["dateview"].Split(',')[1].Trim()),
                MaChuSan = Place.MaChuSan,
                ThoiGianBatDau = start,
                ThoiGianKetThuc = end,
                GiaTien = CaculatorPrice(start, end, lstPriceByYardId),
            };
            var Customer = CurrentCustomer;
            ViewData[GlobalConstans.InfoCustomer] = Customer;
            ViewData[GlobalConstans.Yard] = Yard;
            ViewData[GlobalConstans.DateView] = form["dateview"];
            ViewData[GlobalConstans.Place] = Place;
            return PartialView("_FormConfirmOrder", orderDetails);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ConfirmOrder(CHITIETDATSAN model)
        {
            var Customer = CurrentCustomer;
            CHITIETDATSAN orderDetails = new CHITIETDATSAN()
            {
                MaDiaDiem = model.MaDiaDiem,
                MaSanBong = model.MaSanBong,
                DaVaoNgay = model.DaVaoNgay,
                MaChuSan = model.MaChuSan,
                ThoiGianBatDau = model.ThoiGianBatDau,
                ThoiGianKetThuc = model.ThoiGianKetThuc,
                GiaTien = model.GiaTien,
                DATSAN = new DATSAN
                {
                    NgayDat=DateTime.Now,
                    MaKhachHang= Customer.MaKhachHang,
                    PhoneNumber=int.Parse(Customer.Sdt),
                    TenNguoiDat=Customer.TenKhachHang
                },
            };
            OrderManagerBusiness.CreateOrderDetails(orderDetails);
            return PartialView("_OrderSuccess");
        }
    }
}