using Business.BusinessInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Controllers
{
    public class PlaceYardFootballController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;

        public PlaceYardFootballController(IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }

        // GET: PlaceYardFootball
        public ActionResult Index()
        {
            return View(PlaceYardFootballBusiness.GetAllPlaceYardFootball());
        }
    }
}