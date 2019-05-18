using Business.BusinessInterface;
using Business.BusinessViewModels;
using Model.Application;
using Model.Context;
using quanly.sonsport.com.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
namespace quanly.sonsport.com.Controllers
{

    [Authorize]
    [RoutePrefix("chu-san")]
    public class EmployeeController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly ITypeOfYardBusiness TypeOfYardBusiness;
        private readonly IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;
        private readonly IEmployeeOfPlaceBusiness EmployeeOfPlaceBusiness;
        public EmployeeController(IEmployeeOfPlaceBusiness employeeOfPlaceBusiness,
        IPriceOfYardFootBallBusiness priceOfYardFootBallBusiness,
            ITypeOfYardBusiness typeOfYardBusiness,
            IYardFootballOfPlaceBusiness yardFootballOfPlaceBusiness,
            IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.EmployeeOfPlaceBusiness = employeeOfPlaceBusiness;
            this.PriceOfYardFootBallBusiness = priceOfYardFootBallBusiness;
            this.TypeOfYardBusiness = typeOfYardBusiness;
            this.YardFootballOfPlaceBusiness = yardFootballOfPlaceBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }
        [Route("quan-ly-nhan-vien")]
        // GET: Employee
        public ActionResult Index()
        {
            var lstPlaceYard = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlaceYard;
            return View();
        }

        public ActionResult LoadListEmployeeOfPlace(int? PlaceId)
        {
            if (PlaceId == null)
            {
                TempData[GlobalConstans.MessageFail] = "Có lỗi xảy ra!";
                return Json(new { error = true }, JsonRequestBehavior.AllowGet);
            }

            if (PlaceId == 0)
            {
                int MasterId = MasterOfPlace.MaChuSan;
                ViewData[GlobalConstans.ViewDataLstPlaceYard] = PlaceYardFootballBusiness.SearchByMaster(MasterId);
                ViewData[GlobalConstans.MasterId] = MasterId;
                var listAllEmployee = EmployeeOfPlaceBusiness.SearchEmployeeByMasterId(MasterId);
                return PartialView("_ListAllEmployee", listAllEmployee);
            }
            else
            {
                ViewData[GlobalConstans.ViewDataPlace] = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
                var listEmployee = EmployeeOfPlaceBusiness.SearchEmployeeByPlaceId(PlaceId);
                return PartialView("_ListEmployee", listEmployee);
            }

        }

        public ActionResult LoadRowEmployeeByMaster(int MasterId)
        {
            var listAllEmployee = EmployeeOfPlaceBusiness.SearchEmployeeByMasterId(MasterId);
            return PartialView("_RowEmployeeByMaster", listAllEmployee);
        }

        public ActionResult LoadRowEmployeeByPlace(int PlaceId)
        {
            var listEmployee = EmployeeOfPlaceBusiness.SearchEmployeeByPlaceId(PlaceId);
            return PartialView("_RowEmployeeByPlace", listEmployee);
        }

        public ActionResult Delete(int EmployeeId)
        {
            EmployeeOfPlaceBusiness.DeleteEmployee(EmployeeId);
            TempData[GlobalConstans.MessageSuccess] = "Xóa thành công!";
            return Json(new { success = true },JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddOrEdit(int EmployeeId)
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            if (EmployeeId == 0)
            {
                ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlace;
                return PartialView("_EmployeeForm", new NHANVIEN());
            }
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlace;
            var nv = EmployeeOfPlaceBusiness.SearchEmployeeById(EmployeeId);
            return PartialView("_EmployeeForm",nv);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddOrEdit(NHANVIEN model)
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlace;
            if (ModelState.IsValid)
            {
                if(model.MaNhanVien.Equals(0))
                {
                    model.MaChuSan = MasterOfPlace.MaChuSan;
                    EmployeeOfPlaceBusiness.CreateEmployee(model);
                    TempData[GlobalConstans.MessageSuccess] = "Thêm nhân viên thành công!";
                    return Json(new { success=true},JsonRequestBehavior.AllowGet);
                }
                model.MaChuSan = MasterOfPlace.MaChuSan;
                EmployeeOfPlaceBusiness.UpdateEmployee(model);
                TempData[GlobalConstans.MessageSuccess] = "Sửa nhân viên thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_EmployeeForm",model);
        }

        public ActionResult CreateAccountEmployee(int EmployeeId)
        {
            var emp = EmployeeOfPlaceBusiness.SearchEmployeeById(EmployeeId);
            var acc = new RegisterEmployeeViewModel
            {
                Email = emp.Email,
                MasterId = MasterOfPlace.MaChuSan,
                EmployeeId = EmployeeId
            };
            return PartialView("_CreateEmployeeForm", acc);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateAccountEmployee(RegisterEmployeeViewModel model)
        {
            if (ModelState.IsValid)
            {
                var EmailOfAccount = await UserManager.FindByEmailAsync(model.Email);
                if(EmailOfAccount!=null)
                {
                    if (EmailOfAccount.UserName.Equals(model.UserName))
                    {
                        ModelState.AddModelError("UserName", "Tên đăng nhập đã tồn tại trong hệ thống!");
                        return PartialView("_CreateEmployeeForm", model);
                    }
                    ModelState.AddModelError("Email", "Email đã tồn tại trong hệ thống!");
                    return PartialView("_CreateEmployeeForm", model);
                }
                var nv = EmployeeOfPlaceBusiness.SearchEmployeeById(model.EmployeeId);
                nv.IsHaveAccount = true;
                var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email,MaChuSan=model.MasterId };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    EmployeeOfPlaceBusiness.UpdateEmployee(nv);
                    await UserManager.AddToRoleAsync(user.Id, "CHUSAN_NHANVIEN");
                    TempData[GlobalConstans.MessageSuccess] = "Tạo tài khoản thành công!";
                    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
                }
                TempData[GlobalConstans.MessageFail] = "Tạo tài khoản thất bại!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_CreateEmployeeForm", model);
        }
    }
}