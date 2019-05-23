using Business.BusinessViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    public class ForMasterYardController : BaseController
    {
        [Route("danh-cho-chu-san")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoadFormRegister() {
            var master = new RegisterMasterViewModels();
            return PartialView("_FormRegisterForMaster",master);
        }
    }
}