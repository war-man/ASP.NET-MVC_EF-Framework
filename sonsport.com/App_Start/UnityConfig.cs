using Business.BusinessExtension;
using Business.BusinessInterface;
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

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}