using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity.Owin;
using System.Web.Mvc;
using Business.BusinessViewModels;
using Microsoft.AspNet.Identity;
using sonsport.com.Common;
using System.Web;
using System.IO;

namespace sonsport.com.Controllers
{
    public class CustomerManagerController : BaseController
    {
        private readonly ICustomerBusiness CustomerBusiness;
        public CustomerManagerController(ICustomerBusiness CustomerBusiness)
        {
            this.CustomerBusiness = CustomerBusiness;
        }
        // GET: CustomerManager
        public ActionResult LayoutCustomerManager()
        {
            return View();
        }

        #region Profile Customer
        public ActionResult UserProfile()
        {
            return View();
        }

        public ActionResult LoadFormProfile()
        {
            ViewData[GlobalConstans.LstDistrict] = ListDistrict;
            var customer = CurrentCustomer;
            var model = new CustomerViewModels
            {
                Email = customer.Email,
                MaKhachHang = customer.MaKhachHang,
                Sdt = customer.Sdt,
                TenKhachHang = customer.TenKhachHang,
                Address = customer.Address,
                DistrictId=customer.DistrictId
            };
            return PartialView("_FormCustomerProfile", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult UpdateProfile(CustomerViewModels model)
        {
            ViewData[GlobalConstans.LstDistrict] = ListDistrict;
            if (ModelState.IsValid)
            {
                var customer = new KHACHHANG
                {
                    Email = model.Email,
                    MaKhachHang = (int)model.MaKhachHang,
                    TenKhachHang = model.TenKhachHang,
                    Sdt = model.Sdt,
                    Address = model.Address,
                    DistrictId = model.DistrictId
                };
                CustomerBusiness.UpdateCustomerProfile(customer);
                var user = CurrentUserAccount;
                user.PhoneNumber = model.Sdt;
                user.Email = model.Email;
                user.UserName = model.Email;
                UserManager.Update(user);
                return RedirectToAction("UserProfile");
            }
            return PartialView("_FormCustomerProfile", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SaveAvatar(ImageViewModels ImageUpload)
        {
            if (ImageUpload != null)
            {
                var customer = CurrentCustomer;
                HttpPostedFileBase imageFile = ImageUpload.imageFile;
                MemoryStream target = new MemoryStream();
                imageFile.InputStream.CopyTo(target);
                byte[] imageData = target.ToArray();
                customer.Avatar = imageData;
                CustomerBusiness.UpdateCustomerProfile(customer);
                return RedirectToAction("UserProfile");
            }
            return RedirectToAction("UserProfile");
        }

        public ActionResult ShowAvatar()
        {
            var default_image_path = "~/Assets/Images/image/default_user_image.png";
            var customer = CurrentCustomer;
            byte[] imageData;
            if (customer != null)
            {
                if (customer.Avatar != null)
                {
                    imageData = customer.Avatar;
                    return File(imageData, "image/jpg");
                }
                else
                {
                    imageData = GlobalMethod.FileToByteArray(default_image_path);
                    return File(imageData, "image/jpg");

                }
            }
            imageData = GlobalMethod.FileToByteArray(default_image_path);
            return File(imageData, "image/jpg");
        }
        #endregion

        public ActionResult BookingOfCustomer()
        {
            return View();
        }

        public ActionResult Notification()
        {
            return View();
        }

        public ActionResult ChangePassword()
        {
            return View(new ChangePasswordViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var result = UserManager.ChangePassword(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                var user = UserManager.FindById(User.Identity.GetUserId());
                if (user != null)
                {
                    SignInManager.SignIn(user, isPersistent: false, rememberBrowser: false);
                }
                TempData[GlobalConstans.MessageSuccess] = "Đổi mật khẩu thành công!";
                return View(new ChangePasswordViewModel());
            }
            ModelState.AddModelError("", "Mật khẩu cũ nhập vào không đúng!");
            return View(model);
        }
    }
}