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
    //TypeAndPriceYard
    public class TypeAndPriceYardController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        public TypeAndPriceYardController(IYardFootballOfPlaceBusiness yardFootballOfPlaceBusiness,
            IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.YardFootballOfPlaceBusiness = yardFootballOfPlaceBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }
        public ActionResult Index()
        {
            var lstPlaceYard = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlaceYard;
            return View();
        }

        public ActionResult LoadDetailsInfoPlaceYard(int? PlaceId)
        {
            if(PlaceId==null || PlaceId<=0)
            {
                TempData[GlobalConstans.MessageFail] = "Bạn chưa chọn địa điểm!";
                return Json(new { error = true },JsonRequestBehavior.AllowGet);
            }
            var PlaceYard = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
            return PartialView("_DetailsInfoPlaceYard",PlaceYard);
        }

        public ActionResult LoadListYardsOfPlace(int? PlaceId)
        {
            if (PlaceId==null || PlaceId <= 0)
            {
                TempData[GlobalConstans.MessageFail] = "Bạn chưa chọn địa điểm!";
                return Json(new { error = true }, JsonRequestBehavior.AllowGet);
            }
            ViewData[GlobalConstans.MaDiaDiem] = PlaceId;
            var lstYard = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            return PartialView("_ListYards",lstYard);
        }

        public ActionResult AddOrEdit(int? PlaceId,int? YardId)
        {
            if (YardId.Equals(null))
            {
                var model = new YardViewModels() {MaDiaDiem= PlaceId};
                return PartialView("_YardForm", model);
            }
            SANBONG yardDetails = YardFootballOfPlaceBusiness.SearchDetails(YardId,PlaceId);
            var yard = new YardViewModels
            {
                MaDiaDiem= yardDetails.MaDiaDiem,
                MaLoai= yardDetails.MaLoai,
                MaSanBong=yardDetails.MaSanBong,
                TenSanBong=yardDetails.TenSanBong,
            };
            return PartialView("_YardForm",yard);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddOrEdit(PlaceYardViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.MaDiaDiem == null)
                {
                    PlaceYardFootballBusiness.CreatePlace(model);
                    TempData[GlobalConstans.MessageSuccess] = "Thêm địa điểm thành công!";
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                PlaceYardFootballBusiness.UpdatePlace(model);
                TempData[GlobalConstans.MessageSuccess] = "Sửa địa điểm thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_YardPlaceForm", model);
        }

        public JsonResult Delete(int PlaceId)
        {
            PlaceYardFootballBusiness.DeletePlace(PlaceId);
            TempData[GlobalConstans.MessageSuccess] = "Xóa thành công!";
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}