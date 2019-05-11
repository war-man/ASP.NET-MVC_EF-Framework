using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Business.BusinessExtension
{
    public class PlaceYardFootballBusiness : GenericBusiness, IPlaceYardFootballBusiness
    {
        private SonSportDbContext dbContext;
        public PlaceYardFootballBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public List<DIADIEMSANBONG> GetAllPlaceYardFootball()
        {
            return dbContext.DIADIEMSANBONG.ToList();
        }
    }
}