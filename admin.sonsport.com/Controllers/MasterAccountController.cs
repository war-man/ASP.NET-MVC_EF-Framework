using admin.sonsport.com.Common;
using Business.BusinessViewModels;
using Model.Application;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace admin.sonsport.com.Controllers
{
    [Authorize(Roles = "ADMIN")]
    [RoutePrefix("admin")]
    public class MasterAccountController : BaseController
    {
        [Route("tai-khoan-chu-san")]
        public ActionResult Index()
        {
            var lstMasterAccount = new List<AccountViewModel>();
            foreach (var user in UserManager.Users.Where(n => n.MaChuSan.HasValue && n.MaKhachHang.Equals(null)).ToList())
            {
                lstMasterAccount.Add(new AccountViewModel { Id = user.Id, UserName = user.UserName, Email = user.Email, PhoneNumber = user.PhoneNumber });
            }
            return View(lstMasterAccount);
        }

        public ActionResult Create()
        {
            return PartialView("_CreateMasterAccount", new RegisterViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await UserManager.AddToRoleAsync(user.Id, "CHUSAN");
                    TempData[GlobalConstans.MessageSuccess] = "Tạo tài khoản thành công!";
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                TempData[GlobalConstans.MessageFail] = "Tạo tài khoản thất bại!";
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_CreateMasterAccount", model);
        }

        public async Task<ActionResult> Edit(string MasterId)
        {
            var user = await UserManager.FindByIdAsync(MasterId);
            var model = new AccountViewModel
            {
                Id = MasterId,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                UserName = user.UserName,
            };
            return PartialView("_EditMasterAccount", model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditAsync(AccountViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByIdAsync(model.Id);
                user.Email = model.Email;
                user.UserName = model.UserName;
                user.PhoneNumber = model.PhoneNumber;
                var result = await UserManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    TempData[GlobalConstans.MessageSuccess] = "Sửa tài khoản thành công!";
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                TempData[GlobalConstans.MessageFail] = "Sửa tài khoản thất bại!";
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_EditMasterAccount", model);
        }

        public async Task<JsonResult> Delete(string MasterId)
        {
            var userMaster = await UserManager.FindByIdAsync(MasterId);
            var result = await UserManager.DeleteAsync(userMaster);
            if (result.Succeeded)
            {
                TempData[GlobalConstans.MessageSuccess] = "Xóa thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            TempData[GlobalConstans.MessageFail] = "Xóa thất bại!";
            return Json(new { success = false }, JsonRequestBehavior.AllowGet);
        }
    }
}