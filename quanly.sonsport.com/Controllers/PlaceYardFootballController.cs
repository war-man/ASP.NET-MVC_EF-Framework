using Business.BusinessInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Model.Context;
using quanly.sonsport.com.Models;
using quanly.sonsport.com.Common;

namespace quanly.sonsport.com.Controllers
{
    public class PlaceYardFootballController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;

        public PlaceYardFootballController(IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }
        // GET: PlaceYardFootball
        public ActionResult Index()
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(GetMaster().MaChuSan);
            return View(lstPlace);
        }

        public ActionResult AddOrEdit(string Action)
        {
            if(Action.Equals("add"))
            {
                return PartialView("_YardPlaceForm", new PlaceYardViewModel());
            }
            int MaDiaDiem = int.Parse(Action);
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
                MaChuSan= placeYard.MaChuSan
            };
            return PartialView("_YardPlaceForm",place);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddOrEdit(PlaceYardViewModel placeYard)
        {
            if (ModelState.IsValid)
            {
                if (placeYard.MaDiaDiem==null)
                {
                    var placeAdd = new DIADIEMSANBONG
                    {
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
                        MaChuSan= placeYard.MaChuSan
                    };
                    
                    TempData[GlobalConstans.MessageSuccess] = "Thêm quyền thành công!";
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                var role = new ApplicationRole() { Id = model.Id, Name = model.Name };
                await RoleManager.UpdateAsync(role);
                TempData[GlobalConstans.MessageSuccess] = "Sửa quyền thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_RoleForm", model);
        }
    }
}