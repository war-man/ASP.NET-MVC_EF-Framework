using Business.BusinessInterface;
using Business.BusinessViewModels;
using Model.Context;
using quanly.sonsport.com.Common;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
namespace quanly.sonsport.com.Controllers
{
    //TypeAndPriceYard
    [Authorize(Roles = ("CHUSAN,CHUSAN_NHANVIEN"))]
    [RoutePrefix("chu-san")]
    public class TypeAndPriceYardController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly ITypeOfYardBusiness TypeOfYardBusiness;
        private readonly IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;
        public TypeAndPriceYardController(IPriceOfYardFootBallBusiness priceOfYardFootBallBusiness,
            ITypeOfYardBusiness typeOfYardBusiness,
            IYardFootballOfPlaceBusiness yardFootballOfPlaceBusiness,
            IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.PriceOfYardFootBallBusiness = priceOfYardFootBallBusiness;
            this.TypeOfYardBusiness = typeOfYardBusiness;
            this.YardFootballOfPlaceBusiness = yardFootballOfPlaceBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }

        [Route("thong-tin-san-bong")]
        public ActionResult Index()
        {
            var lstPlaceYard = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlaceYard;
            return View();
        }

        public ActionResult LoadDetailsInfoPlaceYard(int? PlaceId)
        {
            if (PlaceId == null || PlaceId <= 0)
            {
                TempData[GlobalConstans.MessageFail] = "Bạn chưa chọn địa điểm!";
                return Json(new { error = true }, JsonRequestBehavior.AllowGet);
            }
            var PlaceYard = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
            return PartialView("_DetailsInfoPlaceYard", PlaceYard);
        }

        public ActionResult LoadListYardsOfPlace(int? PlaceId)
        {
            if (PlaceId == null || PlaceId <= 0)
            {
                TempData[GlobalConstans.MessageFail] = "Bạn chưa chọn địa điểm!";
                return Json(new { error = true }, JsonRequestBehavior.AllowGet);
            }
            ViewData[GlobalConstans.ViewDataLstTypeOfYard] = TypeOfYardBusiness.GetAllTypeOfYard();
            ViewData[GlobalConstans.MaDiaDiem] = PlaceId;
            var lstYard = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            return PartialView("_ListYards", lstYard);
        }

        public ActionResult AddOrEdit(int? PlaceId, int? YardId)
        {
            ViewData[GlobalConstans.ViewDataLstTypeOfYard] = TypeOfYardBusiness.GetAllTypeOfYard();
            if (YardId.Equals(null))
            {
                var model = new YardViewModels() { MaDiaDiem = PlaceId };
                return PartialView("_YardForm", model);
            }
            SANBONG yardDetails = YardFootballOfPlaceBusiness.SearchDetails(YardId, PlaceId);
            var yard = new YardViewModels
            {
                MaDiaDiem = yardDetails.MaDiaDiem,
                MaLoai = yardDetails.MaLoai,
                MaSanBong = yardDetails.MaSanBong,
                TenSanBong = yardDetails.TenSanBong,
            };
            return PartialView("_YardForm", yard);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddOrEdit(YardViewModels model)
        {
            if (ModelState.IsValid)
            {
                if (model.MaSanBong == null)
                {
                    YardFootballOfPlaceBusiness.CreateYard(model);
                    TempData[GlobalConstans.MessageSuccessBootBox] = "Thêm sân bóng thành công!";
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                YardFootballOfPlaceBusiness.UpdateYard(model);
                TempData[GlobalConstans.MessageSuccessBootBox] = "Sửa địa điểm thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_YardForm", model);
        }

        public JsonResult Delete(int YardId)
        {
            YardFootballOfPlaceBusiness.DeleteYard(YardId);
            TempData[GlobalConstans.MessageSuccessBootBox] = "Xóa thành công!";
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LoadPriceOfYard(int YardId)
        {
            var yard = YardFootballOfPlaceBusiness.SearchDetails(YardId);
            ViewData[GlobalConstans.ViewDataYard] = yard;
            var lstPriceByYardId = PriceOfYardFootBallBusiness.GetPriceTableByYardId(YardId);
            if(lstPriceByYardId.Count==0)
            {
                lstPriceByYardId = new List<BANGGIALOAISAN>();
            }
            ViewData[GlobalConstans.ViewDataLstPriceOfYard] = lstPriceByYardId;
            return PartialView("_PriceTable",lstPriceByYardId);
        }

        public ActionResult LoadRowPrice(int YardId)
        {
            var lstRowPrice= PriceOfYardFootBallBusiness.GetPriceTableByYardId(YardId);
            if (lstRowPrice.Count == 0)
            {
                lstRowPrice = new List<BANGGIALOAISAN>();
            }
            ViewData[GlobalConstans.ViewDataYard] = YardId;
            return PartialView("_RowPrice", lstRowPrice);
        }

        public ActionResult LoadRowPriceAdd(int YardId)
        {
            var RowAddYard = new PriceOfYardViewModels();
            RowAddYard.MaSanBong = YardId;
            return PartialView("_RowPriceAdd", RowAddYard);
        }

        private string CustomValidateInput(int? YardId,int? bd,int? kt,int? price)
        {
            if(bd==null)
            {
                return "Giờ bắt đầu không được bỏ trống!";
            }
            if (kt == null)
            {
                return "Giờ kết thúc không được bỏ trống!";
            }
            if (price == null)
            {
                return "Giá tiền không được bỏ trống!";
            }
            if (YardId ==null)
            {
                return "Có lỗi xảy ra!";
            }
            if(price > 10000000)
            {
                return "Giá tiền không được vượt quá 10 triệu";
            }
            var Place = PlaceYardFootballBusiness.SearchInfoPlaceByYardId((int)YardId);
            var lstPrice = PriceOfYardFootBallBusiness.GetPriceTableByYardId((int)YardId);
            if(bd==kt)
            {
                return "Thời gian bắt đầu không được bằng kết thúc";
            }
            if (bd > kt)
            {
                return "Thời gian bắt đầu không được lớn hơn kết thúc";
            }
            else if (bd < Place.GioMoCua || kt > Place.GioDongCua)
            {
                return $"Sân bóng chỉ mở cửa từ {Place.GioMoCua} giờ đến {Place.GioDongCua} giờ";
            }
            foreach (var item in lstPrice)
            {
                if (bd >= item.GioBatDau && bd < item.GioKetThuc)
                {
                    return "Khung giờ này đã có trong hệ thống!";
                }
                if (kt > item.GioBatDau && kt <= item.GioKetThuc)
                {
                    return "Khung giờ này đã có trong hệ thống!";
                }
            }
            return "success";
        }

        [HttpPost]
        public ActionResult CreatePrice(PriceOfYardViewModels model)
        {
            string message = CustomValidateInput(model.MaSanBong, model.GioBatDau, model.GioKetThuc, model.GiaTien);
            if (ModelState.IsValid)
            {
                if(message.Equals("success"))
                {
                    PriceOfYardFootBallBusiness.CreatePrice(model);
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { success = false, messageError = message }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, messageError= message }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeletePrice(int PriceId)
        {
            PriceOfYardFootBallBusiness.DeletePrice(PriceId);
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditPrice(PriceOfYardViewModels model)
        {
            string message = CustomValidateInput(model.MaSanBong, model.GioBatDau, model.GioKetThuc, model.GiaTien);
            if (ModelState.IsValid)
            {
                if (message.Equals("success"))
                {
                    PriceOfYardFootBallBusiness.UpdatePrice(model);
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { success = false, messageError = message }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false, messageError = message }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ActiveYard(int YardId)
        {
            var Place = PlaceYardFootballBusiness.SearchInfoPlaceByYardId(YardId);
            var lstPOY = PriceOfYardFootBallBusiness.Search(YardId);
            int DurationOpenClose = (int)(Place.GioDongCua - Place.GioMoCua);
            int DurationPrice = (int)(lstPOY.Max(n => n.GioKetThuc) - lstPOY.Min(n => n.GioBatDau));
            if(DurationOpenClose> DurationPrice)
            {
                return Json(new { success = true ,message= "Bảng giá chưa đủ tất cả các khung giờ (Tính từ giờ mở của tới giờ đóng cửa của địa điểm)!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true,message= "Kích hoạt thành công!" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UnActivePlace(int YardId)
        {
            return Json(new { success = true ,message= "Đã hủy kích hoạt!" }, JsonRequestBehavior.AllowGet);
        }
    }
}