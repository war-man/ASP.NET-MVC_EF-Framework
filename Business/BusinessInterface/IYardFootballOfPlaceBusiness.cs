using Business.BusinessViewModels;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessInterface
{
    public interface IYardFootballOfPlaceBusiness
    {
        List<SANBONG> GetAllYardFooballByPlace(int? PlaceId);

        SANBONG SearchDetails(int? YardId,int? PlaceId);

        SANBONG SearchDetails(int? YardId);

        void CreateYard(YardViewModels yard);

        void DeleteYard(int YardId);

        void UpdateYard(YardViewModels yard);
    }
}
