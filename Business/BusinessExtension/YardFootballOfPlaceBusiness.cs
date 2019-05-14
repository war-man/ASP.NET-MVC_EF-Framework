using Business.BusinessInterface;
using Model.Context;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
namespace Business.BusinessExtension
{
    public class YardFootballOfPlaceBusiness : GenericBusiness,IYardFootballOfPlaceBusiness
    {
        private SonSportDbContext dbContext;
        public YardFootballOfPlaceBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public List<SANBONG> GetAllYardFooballByPlace(int? PlaceId)
        {
            var lstYard = dbContext.SANBONG.Include(s => s.DIADIEMSANBONG).Include(s => s.LOAISANBONG).Where(n => n.MaDiaDiem == PlaceId).ToList();
            return lstYard;
        }

        public SANBONG SearchDetails(int? YardId,int? PlaceId)
        {
            var Yard = dbContext.SANBONG.FirstOrDefault(n => n.MaSanBong == YardId && n.MaDiaDiem==PlaceId);
            return Yard;
        }
    }
}
