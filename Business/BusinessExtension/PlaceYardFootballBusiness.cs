using Business.BusinessInterface;
using Model.Context;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

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

        public DIADIEMSANBONG SearchInfoPlace(int? MaDiaDiem)
        {
            DIADIEMSANBONG Place = new DIADIEMSANBONG();
            if(MaDiaDiem!=null)
            {
                Place = dbContext.DIADIEMSANBONG.Include(d => d.CHUSANQUANLY)
                                                .Include(d => d.HINHANHDIADIEM)
                                                .ToList()
                                                .FirstOrDefault(n=>n.MaDiaDiem==MaDiaDiem);
            }
            return Place;
        }

        public List<DIADIEMSANBONG> SearchByMaster(int? MaChuSan)
        {
            var lstPlace = dbContext.DIADIEMSANBONG.Include(d => d.CHUSANQUANLY).Include(d => d.HINHANHDIADIEM).ToList();
            if (MaChuSan!=null)
            {
                lstPlace = lstPlace.Where(n => n.MaChuSan == MaChuSan).ToList();
            }
            return lstPlace;
        }

        public void Create(DIADIEMSANBONG placeYard)
        {
            
        }
    }
}