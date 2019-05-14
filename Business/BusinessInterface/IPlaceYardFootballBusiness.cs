using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Business.BusinessInterface
{
    public interface IPlaceYardFootballBusiness
    {
        void Create(DIADIEMSANBONG placeYard);

        List<DIADIEMSANBONG> GetAllPlaceYardFootball();

        DIADIEMSANBONG SearchInfoPlace(int? MaDiaDiem);

        List<DIADIEMSANBONG> SearchByMaster(int? MaChuSan);
    }
}