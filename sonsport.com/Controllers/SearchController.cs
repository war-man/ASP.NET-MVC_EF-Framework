using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.BusinessInterface;
using sonsport.com.Common;
namespace sonsport.com.Controllers
{
    public class SearchController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        public SearchController(IPlaceYardFootballBusiness PlaceYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = PlaceYardFootballBusiness;
        }
        // GET: Search
        public ActionResult Index(string keyword)
        {
            keyword = GlobalMethod.ConverVNSign(keyword).ToLower();
            var place = PlaceYardFootballBusiness.GetAllPlaceYardFootball().Where(n => n.IsActive == true);
            this.SearchByKeyword(keyword);
            if (String.IsNullOrEmpty(keyword))
            {
                return View(place.ToList());
            }
            place = place.Where(n => n.KeywordPlace.Contains(keyword) || n.KeywordAddress.Contains(keyword)).ToList();
            return View(place);
        }

        public ActionResult SearchByKeyword(string keyword)
        {
            keyword = GlobalMethod.ConverVNSign(keyword).ToLower();
            var place = PlaceYardFootballBusiness.GetAllPlaceYardFootball().Where(n => n.IsActive == true);
            if(String.IsNullOrEmpty(keyword))
            {
                return PartialView("_ListPlace", place.ToList());
            }
            place = place.Where(n => n.KeywordPlace.Contains(keyword) || n.KeywordAddress.Contains(keyword)).ToList();
            return PartialView("_ListPlace", place);
        }

        public ActionResult SearchYardEmpty()
        {
            return View();
        }
    }
}