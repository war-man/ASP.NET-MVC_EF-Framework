using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sonsport.com.Common;
using Business.BusinessExtension;
using Business.BusinessInterface;

namespace sonsport.com.Controllers
{
    public class PlaceYardController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly IOrderManagerBusiness OrderManagerBusiness;
        private readonly IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;

        public PlaceYardController(IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness,
        IOrderManagerBusiness OrderManagerBusiness,
        IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness,
        IPlaceYardFootballBusiness PlaceYardFootballBusiness)
        {
            this.PlaceYardFootballBusiness = PlaceYardFootballBusiness;
            this.YardFootballOfPlaceBusiness = YardFootballOfPlaceBusiness;
            this.OrderManagerBusiness = OrderManagerBusiness;
            this.PriceOfYardFootBallBusiness = PriceOfYardFootBallBusiness;
        }
        // GET: PlaceYard
        public ActionResult Index(int PlaceId, string strDate=null)
        {
            ViewData[GlobalConstans.Place] = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
            ViewData[GlobalConstans.DateView] = GlobalMethod.ParseStringToDateTime(strDate);
            ViewData[GlobalConstans.LstYardOfPlace] = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            ViewData[GlobalConstans.LstOrderDetailsOfYard] = OrderManagerBusiness.GetOrderDetails(null, PlaceId, null);
            ViewData[GlobalConstans.LstPriceOfYard] = PriceOfYardFootBallBusiness.Search(null);
            return View();
        }
    }
}