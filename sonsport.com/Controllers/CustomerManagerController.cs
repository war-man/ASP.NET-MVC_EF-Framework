using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    public class CustomerManagerController : Controller
    {
        // GET: CustomerManager
        public ActionResult LayoutCustomerManager()
        {
            return View();
        }

        public ActionResult UserProfile()
        {
            return View();
        }

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
            return View();
        }
    }
}