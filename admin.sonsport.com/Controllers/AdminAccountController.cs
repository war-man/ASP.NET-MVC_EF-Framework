using admin.sonsport.com.Common;
using admin.sonsport.com.Models;
using Model.Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace admin.sonsport.com.Controllers
{
    [Authorize]
    [RoutePrefix("admin")]
    public class AdminAccountController : BaseController
    {
        [Route("tai-khoan-admin")]
        public ActionResult Index()
        {
            var lstAdminAccount = new List<AccountViewModel>();
            foreach (var user in UserManager.Users.Where(n => n.MaChuSan.Equals(null) && n.MaChuSan.Equals(null)).ToList())
            {
                lstAdminAccount.Add(new AccountViewModel { Id=user.Id,UserName=user.UserName,Email=user.Email,PhoneNumber=user.PhoneNumber});
            }
            return View(lstAdminAccount);
        }

        public ActionResult Create()
        {
            return PartialView("_CreateAdminAccount", new RegisterViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(RegisterViewModel model)
        {
            if(ModelState.IsValid)
            {
                var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await UserManager.AddToRoleAsync(user.Id, "ADMIN");
                    TempData[GlobalConstans.MessageSuccess] = "Tạo tài khoản thành công!";
                    return Json(new { success = true },JsonRequestBehavior.AllowGet);
                }
                TempData[GlobalConstans.MessageFail] = "Tạo tài khoản thất bại!";
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_CreateAdminAccount",model);
        }

        public async Task<ActionResult> Edit(string AdminId)
        {
            var user = await UserManager.FindByIdAsync(AdminId);
            var model = new AccountViewModel {
                Id=AdminId,
                Email=user.Email,
                PhoneNumber=user.PhoneNumber,
                UserName=user.UserName,
            };
            return PartialView("_EditAdminAccount",model);
        }

        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditAsync(AccountViewModel model)
        {
            if(ModelState.IsValid)
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
            return PartialView("_EditAdminAccount",model);
        }

        public async Task<JsonResult> Delete(string AdminId)
        {
            var userAdmin = await UserManager.FindByIdAsync(AdminId);
            var result = await UserManager.DeleteAsync(userAdmin);
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