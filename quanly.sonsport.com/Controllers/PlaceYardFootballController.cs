using System.Web.Mvc;
using Model.Context;
using quanly.sonsport.com.Common;
using Business.BusinessInterface;
using Business.BusinessViewModels;
using System.Linq;

namespace quanly.sonsport.com.Controllers
{
    [Authorize(Roles = ("CHUSAN,CHUSAN_NHANVIEN"))]
    [RoutePrefix("chu-san")]
    public class PlaceYardFootballController : BaseController
    {
        private IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;

        public PlaceYardFootballController(IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness,
        IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.YardFootballOfPlaceBusiness = YardFootballOfPlaceBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }

        [Route("dia-diem-san-bong")]
        // GET: PlaceYardFootball
        public ActionResult Index()
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            return View(lstPlace);
        }

        public ActionResult AddOrEdit(string PlaceId)
        {
            if (PlaceId.Equals("add"))
            {
                int MasterId = MasterOfPlace.MaChuSan;
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
                GioDongCua = GlobalMethod.ConvertIntToHourNoMilisecond((int)placeYard.GioDongCua),
                GioMoCua = GlobalMethod.ConvertIntToHourNoMilisecond((int)placeYard.GioDongCua),
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

        public ActionResult ActivePlace(int PlaceId)
        {
            var lstYOP = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            lstYOP = lstYOP.Where(n => n.IsActive == true).ToList();
            if(lstYOP.Count>0)
            {
                PlaceYardFootballBusiness.ActivePlace(PlaceId);
                TempData[GlobalConstans.MessageSuccess] = "Kích hoạt địa điểm thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                TempData[GlobalConstans.MessageFailBootBox] = "Kích hoạt địa điểm thất bại! </br> Chưa có sân bóng nào được đưa vào sử dụng!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UnActivePlace(int PlaceId)
        {
            PlaceYardFootballBusiness.UnActivePlace(PlaceId);
            TempData[GlobalConstans.MessageSuccess] = "Hủy kích hoạt sân bóng thành công!";
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}