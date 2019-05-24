using Business.BusinessViewModels;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessInterface
{
    public interface IOrderManagerBusiness
    {
        List<CHITIETDATSAN> GetOrderDetailsByMasterId(int MasterId);

        void CreateOrder(DATSAN ds);

        void CreateOrderDetails(CHITIETDATSAN ctds);

        List<CHITIETDATSAN> GetOrderDetails(int? MasterId,int? PlaceId,int? YardId);

        OrderDetailsViewModels GetOrderDetailsByOrderId(int OrderId);

        void DeleteOrderDetails(int OrderId);

    }
}
