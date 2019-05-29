using Business.BusinessInterface;
using Model.Context;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using Business.BusinessViewModels;

namespace Business.BusinessExtension
{
    public class YardFootballOfPlaceBusiness : GenericBusiness,IYardFootballOfPlaceBusiness
    {
        private SonSportDbContext dbContext;
        public YardFootballOfPlaceBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreateYard(YardViewModels model)
        {
            var yard = new SANBONG
            {
                MaLoai = model.MaLoai, 
                TenSanBong= model.TenSanBong,
                MaDiaDiem= model.MaDiaDiem,
                IsActive=false
            };
            using (dbContext = new SonSportDbContext())
            {
                dbContext.SANBONG.Add(yard);
                dbContext.SaveChanges();
            }
        }

        public void DeleteYard(int YardId)
        {
            var Yard = this.SearchDetails(YardId);
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(Yard).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }

        public List<SANBONG> GetAllYardFooballByPlace(int? PlaceId)
        {
            var lstYard = dbContext.SANBONG.Include(s => s.DIADIEMSANBONG)
                .Include(s => s.LOAISANBONG)
                .Include(n=>n.BANGGIALOAISAN)
                .Where(n => n.MaDiaDiem == PlaceId).ToList();
            return lstYard;
        }

        public SANBONG SearchDetails(int? YardId,int? PlaceId)
        {
            var Yard = dbContext.SANBONG.FirstOrDefault(n => n.MaSanBong == YardId && n.MaDiaDiem==PlaceId);
            return Yard;
        }

        public SANBONG SearchDetails(int? YardId)
        {
            var Yard = dbContext.SANBONG.Include(n=>n.BANGGIALOAISAN).FirstOrDefault(n => n.MaSanBong == YardId);
            return Yard;
        }


        public void UpdateYard(YardViewModels model)
        {
            var yard = new SANBONG
            {
                MaSanBong = (int)model.MaSanBong,
                MaLoai = model.MaLoai,
                TenSanBong = model.TenSanBong,
                MaDiaDiem = model.MaDiaDiem,
                IsActive=model.IsActive
            };
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(yard).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }

        public void UpdateYardNew(SANBONG yard)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(yard).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
    }
}
