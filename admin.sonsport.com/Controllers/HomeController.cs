using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace admin.sonsport.com.Controllers
{
    [Authorize(Roles = "ADMIN")]
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}