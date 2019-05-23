using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    [RoutePrefix("pages")]
    public class HelperPagesController : Controller
    {
        // GET: HelperPages
        [Route("chinh-sach-bao-mat")]
        public ActionResult PrivacyPolicy()
        {
            return View();
        }

        [Route("dieu-khoan-su-dung")]
        public ActionResult TermsOfUse()
        {
            return View();
        }
    }
}