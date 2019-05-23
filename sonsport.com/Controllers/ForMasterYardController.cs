using admin.sonsport.com.Common;
using Business.BusinessInterface;
using Business.BusinessViewModels;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    public class ForMasterYardController : BaseController
    {
        private readonly IMasterYardBusiness MasterYardBusiness;
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        public ForMasterYardController(IPlaceYardFootballBusiness placeYardFootballBusiness,
            IMasterYardBusiness masterYardBusiness)
        {
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
            this.MasterYardBusiness = masterYardBusiness;
        }

        [Route("danh-cho-chu-san")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoadFormRegister() {
            var master = new RegisterMasterViewModels();
            return PartialView("_FormRegisterForMaster", master);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegisterMaster(RegisterMasterViewModels model,FormCollection f)
        {
            if(!MasterYardBusiness.CheckEmailMaster(model.Email))
            {
                ModelState.AddModelError("", "Email của bạn đã có trong hệ thống!");
                return PartialView("_FormRegisterForMaster", model);
            }
            if (ModelState.IsValid)
            {
                CHUSANQUANLY master = new CHUSANQUANLY
                {
                    Email = model.Email,
                    IsActive = false,
                    Password = model.Password,
                    TenChuSan = model.MasterName,
                    Sdt = model.PhoneNumber1,
                    DIADIEMSANBONG = new List<DIADIEMSANBONG>
                {
                    new DIADIEMSANBONG
                    {
                        Sdt1=model.PhoneNumber1,
                        Sdt2=model.PhoneNumber2,
                        CanDatCocKhiDatSan=false,
                        CoPhiMuonBong=false,
                        CoPhiNuocUongTrenSan=false,
                        DiaChi=model.Address,
                        GioMoCua=int.Parse(model.OpenTime.Substring(0,2)),
                        GioDongCua=int.Parse(model.CloseTime.Substring(0,2)),
                        Quan=f["DistrictName"].ToString(),
                        TenDiaDiem=model.PlaceName
                    }
                }
                };
                MasterYardBusiness.CreateMaster(master);
                return PartialView("_FormRegisterSuccess");
            }
            return PartialView("_FormRegisterForMaster", model);
        }
        
    }
}