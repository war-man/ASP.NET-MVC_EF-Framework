using Business.BusinessInterface;
using quanly.sonsport.com.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace quanly.sonsport.com.Controllers
{

    [Authorize]
    [RoutePrefix("chu-san")]
    public class EmployeeController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly ITypeOfYardBusiness TypeOfYardBusiness;
        private readonly IPriceOfYardFootBallBusiness PriceOfYardFootBallBusiness;
        private readonly IEmployeeOfPlaceBusiness EmployeeOfPlaceBusiness;
        public EmployeeController(IEmployeeOfPlaceBusiness employeeOfPlaceBusiness,
        IPriceOfYardFootBallBusiness priceOfYardFootBallBusiness,
            ITypeOfYardBusiness typeOfYardBusiness,
            IYardFootballOfPlaceBusiness yardFootballOfPlaceBusiness,
            IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.PriceOfYardFootBallBusiness = priceOfYardFootBallBusiness;
            this.TypeOfYardBusiness = typeOfYardBusiness;
            this.YardFootballOfPlaceBusiness = yardFootballOfPlaceBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }
        [Route("quan-ly-nhan-vien")]
        // GET: Employee
        public ActionResult Index()
        {
            var lstPlaceYard = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            ViewData[GlobalConstans.ViewDataLstPlaceYard] = lstPlaceYard;
            return View();
        }
    }
}