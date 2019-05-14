using Model.Application;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using admin.sonsport.com.Common;
using Business.BusinessViewModels;

namespace admin.sonsport.com.Controllers
{
    [Authorize]
    [RoutePrefix("admin")]
    public class RoleController : BaseController
    {
        [Route("cau-hinh-phan-quyen")]
        public ActionResult Index()
        {
            List<RoleViewModels> list = new List<RoleViewModels>();
            foreach (var role in RoleManager.Roles)
            {
                list.Add(new RoleViewModels(role));
            }
            return View(list);
        }

        public async Task<ActionResult> AddOrEdit(string RoleId)
        {
            if (RoleId.Equals("add"))
            {
                return PartialView("_RoleForm", new RoleViewModels());
            }
            var role = await RoleManager.FindByIdAsync(RoleId);
            return PartialView("_RoleForm",new RoleViewModels(role));
        }

        //POST/Edit
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddOrEdit(RoleViewModels model)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(model.Id))
                {
                    var roleAdd = new ApplicationRole { Name = model.Name };
                    await RoleManager.CreateAsync(roleAdd);
                    TempData[GlobalConstans.MessageSuccess] = "Thêm quyền thành công!";
                    return Json(new { success = true },JsonRequestBehavior.AllowGet);
                }
                var role = new ApplicationRole() { Id = model.Id, Name = model.Name };
                await RoleManager.UpdateAsync(role);
                TempData[GlobalConstans.MessageSuccess] = "Sửa quyền thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_RoleForm",model);
        }

        public async Task<JsonResult> Delete(string RoleId)
        {
            var role = await RoleManager.FindByIdAsync(RoleId);
            var result = await RoleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                TempData[GlobalConstans.MessageSuccess] = "Xóa thành công!";
                return Json(new { success = true},JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false }, JsonRequestBehavior.AllowGet);
        }
    }
}