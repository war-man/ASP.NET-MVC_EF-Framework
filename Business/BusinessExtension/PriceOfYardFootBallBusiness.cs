using Business.BusinessInterface;
using Business.BusinessViewModels;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessExtension
{
    public class PriceOfYardFootBallBusiness : GenericBusiness,IPriceOfYardFootBallBusiness
    {
        private SonSportDbContext dbContext;
        public PriceOfYardFootBallBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreatePrice(PriceOfYardViewModels model)
        {
            var price = new BANGGIALOAISAN
            {
                MaSanBong = model.MaSanBong,
                GiaTien = model.GiaTien,
                GioBatDau = model.GioBatDau,
                GioKetThuc = model.GioKetThuc,
                NgayTrongTuan = "T2,T3,T4,T5,T6,T7,CN"
            };
            using (dbContext = new SonSportDbContext())
            {
                dbContext.BANGGIALOAISAN.Add(price);
                dbContext.SaveChanges();
            }
        }

        public void DeletePrice(int PriceId)
        {
            var price = this.SearchDetails(PriceId);
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(price).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }

        public List<BANGGIALOAISAN> GetPriceTableByYardId(int YardId)
        {
            var lstPrice = dbContext.BANGGIALOAISAN.Where(n => n.MaSanBong == YardId).ToList();
            return lstPrice;
        }

        public BANGGIALOAISAN SearchDetails(int PriceId)
        {
            return dbContext.BANGGIALOAISAN.Find(PriceId);
        }

        public void UpdatePrice(PriceOfYardViewModels model)
        {
            var price = new BANGGIALOAISAN
            {
               MaBangGiaLoaiSan=(int)model.MaBangGiaLoaiSan,
                GiaTien = model.GiaTien,
                GioBatDau = model.GioBatDau,
                GioKetThuc = model.GioKetThuc,
                NgayTrongTuan = "T2,T3,T4,T5,T6,T7,CN",
                MaSanBong=model.MaSanBong
            };
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(price).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
    }
}
