using Business.BusinessViewModels;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessInterface
{
    public interface IPriceOfYardFootBallBusiness
    {
        List<BANGGIALOAISAN> GetPriceTableByYardId(int YardId);

        BANGGIALOAISAN SearchDetails(int PriceId);

        void CreatePrice(PriceOfYardViewModels price);

        void DeletePrice(int PriceId);

        void UpdatePrice(PriceOfYardViewModels price);
    }
}
