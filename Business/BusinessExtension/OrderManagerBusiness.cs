using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Business.BusinessExtension
{
    public class OrderManagerBusiness : GenericBusiness, IOrderManagerBusiness
    {
        private SonSportDbContext dbContext;
        public OrderManagerBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreateOrder(DATSAN ds)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.DATSAN.Add(ds);
                dbContext.SaveChanges();
            }
        }

        public void CreateOrderDetails(CHITIETDATSAN ctds)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.CHITIETDATSAN.Add(ctds);
                dbContext.SaveChanges();
            }
        }

        public List<CHITIETDATSAN> GetOrderDetails(int? MasterId, int? PlaceId)
        {
            var lstOrderDetails = dbContext.CHITIETDATSAN.Include(n=>n.DATSAN).Include(n=>n.CHUSANQUANLY).Include(n=>n.SANBONG).ToList();
            if(MasterId!=null)
            {
                lstOrderDetails = lstOrderDetails.Where(n => n.MaChuSan == MasterId).ToList();
            }
            if(PlaceId != null)
            {
                lstOrderDetails = lstOrderDetails.Where(n => n.SANBONG.MaDiaDiem == PlaceId).ToList();
            }
            return lstOrderDetails;
        }

        public List<CHITIETDATSAN> GetOrderDetailsByMasterId(int MasterId)
        {
            return dbContext.CHITIETDATSAN.Include(n=>n.DATSAN).Where(n => n.MaChuSan == MasterId).ToList();
        }
    }
}
