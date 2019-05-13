using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    public class ForMasterYardController : Controller
    {
        [Route("danh-cho-chu-san")]
        public ActionResult Index()
        {
            return View();
        }
    }
}