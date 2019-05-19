using Business.BusinessInterface;
using Business.BusinessViewModels;
using quanly.sonsport.com.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace quanly.sonsport.com.Controllers
{
    public class OrderManagerController : BaseController
    {
        private IOrderManagerBusiness OrderManagerBusiness;
        private IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private ICustomerOfMasterBusiness CustomerOfMasterBusiness;
        public OrderManagerController(ICustomerOfMasterBusiness customerOfMasterBusiness,
        IYardFootballOfPlaceBusiness yardFootballOfPlaceBusiness,
            IOrderManagerBusiness orderManagerBusiness)
        {
            this.CustomerOfMasterBusiness = customerOfMasterBusiness;
            this.YardFootballOfPlaceBusiness = yardFootballOfPlaceBusiness;
            this.OrderManagerBusiness = orderManagerBusiness;
        }
        // GET: OrderManager
        public ActionResult Index()
        {
            return View();
        }
        
       public JsonResult LoadOrderYard()
        {
            var lstOrderDetails = OrderManagerBusiness.GetOrderDetailsByMasterId(MasterOfPlace.MaChuSan);
            List<OrderViewModels> lstOrder = new List<OrderViewModels>();
            foreach(var od in lstOrderDetails)
            {
                lstOrder.Add(new OrderViewModels
                {
                    id = od.MaDatSan.ToString(),
                    start = $"{od.DaVaoNgay.ToString("yyyy-MM-dd")}T{GlobalMethod.ConvertIntToHour(od.ThoiGianBatDau)}",
                    end= $"{od.DaVaoNgay.ToString("yyyy-MM-dd")}T{GlobalMethod.ConvertIntToHour(od.ThoiGianKetThuc)}",
                    title=$"{YardFootballOfPlaceBusiness.SearchDetails(od.MaSanBong).TenSanBong} - {CustomerOfMasterBusiness.GetInfoCustomer((int)od.DATSAN.MaKhachHang).TenKhachHang}",
                    editable=true
                });
            }
            return Json(lstOrder,JsonRequestBehavior.AllowGet);
        }
    }

}