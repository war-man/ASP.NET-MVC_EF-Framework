using Business.BusinessExtension;
using Business.BusinessInterface;
using sonsport.com.Common;
using System.Web.Mvc;
using Unity;
using Unity.Mvc5;

namespace sonsport.com
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IPlaceYardFootballBusiness, PlaceYardFootballBusiness>();
            container.RegisterType<IMasterYardBusiness, MasterYardBusiness>();
            container.RegisterType<IYardFootballOfPlaceBusiness, YardFootballOfPlaceBusiness>();
            container.RegisterType<IOrderManagerBusiness, OrderManagerBusiness>();
            container.RegisterType<IPriceOfYardFootBallBusiness,PriceOfYardFootBallBusiness>();
            container.RegisterType<ICustomerBusiness, CustomerBusiness>();
            container.RegisterType<IFileUploadBusiness, FileUploadBusiness>();
            container.RegisterType<IReportBusiness,ReportBusiness>();
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}