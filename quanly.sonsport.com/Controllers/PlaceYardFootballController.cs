using System.Web.Mvc;
using Model.Context;
using quanly.sonsport.com.Common;
using Business.BusinessInterface;
using Business.BusinessViewModels;

namespace quanly.sonsport.com.Controllers
{
    [Authorize]
    [RoutePrefix("chu-san")]
    public class PlaceYardFootballController : BaseController
    {
        private IPlaceYardFootballBusiness PlaceYardFootballBusiness;

        public PlaceYardFootballController(IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }

        [Route("dia-diem-san-bong")]
        // GET: PlaceYardFootball
        public ActionResult Index()
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(GetMaster().MaChuSan);
            return View(lstPlace);
        }

        public ActionResult AddOrEdit(string PlaceId)
        {
            if (PlaceId.Equals("add"))
            {
                var user = GetMaster();
                int MasterId = user.MaChuSan;
                var model = new PlaceYardViewModel() { MaChuSan = MasterId };
                return PartialView("_YardPlaceForm",model);
            }
            int MaDiaDiem = int.Parse(PlaceId);
            DIADIEMSANBONG placeYard = PlaceYardFootballBusiness.SearchInfoPlace(MaDiaDiem);
            var place = new PlaceYardViewModel
            {
                MaDiaDiem = placeYard.MaDiaDiem,
                CanDatCocKhiDatSan = placeYard.CanDatCocKhiDatSan,
                CoPhiMuonBong = placeYard.CoPhiMuonBong,
                CoPhiNuocUongTrenSan = placeYard.CoPhiNuocUongTrenSan,
                DiaChi = placeYard.DiaChi,
                GioDongCua = placeYard.GioDongCua,
                GioMoCua = placeYard.GioMoCua,
                MoTaDiaDiem = placeYard.MoTaDiaDiem,
                Quan = placeYard.Quan,
                Sdt1 = placeYard.Sdt1,
                Sdt2 = placeYard.Sdt2,
                TenDiaDiem = placeYard.TenDiaDiem,
                MaChuSan = placeYard.MaChuSan
            };
            return PartialView("_YardPlaceForm", place);
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