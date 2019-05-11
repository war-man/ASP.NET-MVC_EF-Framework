using Business.BusinessInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        public HomeController(IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }

        public ActionResult Index()
        {
            ViewData["lstDiaDiem"] = PlaceYardFootballBusiness.GetAllPlaceYardFootball();
            return View();
        }
    }
}