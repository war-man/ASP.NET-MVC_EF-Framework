using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.BusinessInterface;
using admin.sonsport.com.Common;
using Model.Context;
using System.Threading.Tasks;
using Model.Application;

namespace admin.sonsport.com.Controllers
{
    [RoutePrefix("admin")]
    [Authorize(Roles = "ADMIN")]
    public class MasterManagerController : BaseController
    {
        private readonly IMasterYardBusiness MasterYardBusiness;

        public MasterManagerController(IMasterYardBusiness MasterYardBusiness)
        {
            this.MasterYardBusiness = MasterYardBusiness;
        }

        // GET: MasterManager
        [Route("danh-sach-chu-san-dang-cho-kich-hoat")]
        public ActionResult MasterWaiting()
        {
            var lstMasterIsNotActive = MasterYardBusiness.GetMasterByActive(false);
            ViewData[GlobalConstans.LstMasterIsNotActive] = lstMasterIsNotActive;
            return View();
        }

        [Route("danh-sach-chu-san-dang-hoat-dong")]
        public ActionResult MasterActivating()
        {
            var lstMasterActive = MasterYardBusiness.GetMasterByActive(true);
            ViewData[GlobalConstans.LstMasterIsActive] = lstMasterActive;
            return View();
        }

        public async Task<ActionResult> ActiveMaster(int MasterId)
        {
            var master = MasterYardBusiness.GetMasterByActive(false).FirstOrDefault(n => n.MaChuSan == MasterId);
            var masterAcc = new ApplicationUser
            {
                Email=master.Email,
                UserName=master.Email,
                MaChuSan=MasterId,
                PhoneNumber=master.Sdt,
            };
            var result = await UserManager.CreateAsync(masterAcc,master.Password);
            if(result.Succeeded)
            {
                await UserManager.AddToRoleAsync(masterAcc.Id, "CHUSAN");
                MasterYardBusiness.ActiveMaster(MasterId);
                TempData[GlobalConstans.MessageSuccess] = "Kích hoạt tài khoản thành công!";
                return Json(new JsonMessage { Type = JsonMessage.SUCCESS, Message = "Đã kích hoạt!" }, JsonRequestBehavior.AllowGet);
            }
            TempData[GlobalConstans.MessageFail] = "Có lỗi xảy ra!";
            return Json(new JsonMessage { Type = JsonMessage.ERROR, Message = "Có lỗi xảy ra!" }, JsonRequestBehavior.AllowGet);
        }
    }
}