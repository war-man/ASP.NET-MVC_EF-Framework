using Business.BusinessViewModels;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Business.BusinessInterface
{
    public interface IPlaceYardFootballBusiness
    {
        void CreatePlace(PlaceYardViewModel placeYardViewModel);

        void DeletePlace(int MaDiaDiem);

        void UpdatePlace(PlaceYardViewModel placeYardViewModel);

        List<DIADIEMSANBONG> GetAllPlaceYardFootball();

        DIADIEMSANBONG SearchInfoPlace(int? MaDiaDiem);

        DIADIEMSANBONG SearchInfoPlaceByYardId(int YardId);

        List<DIADIEMSANBONG> SearchByMaster(int? MaChuSan);

        void ActivePlace(int PlaceId);

        void UnActivePlace(int PlaceId);

    }
}