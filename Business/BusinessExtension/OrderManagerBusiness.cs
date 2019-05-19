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

        public List<CHITIETDATSAN> GetOrderDetailsByMasterId(int MasterId)
        {
            return dbContext.CHITIETDATSAN.Include(n=>n.DATSAN).Where(n => n.MaChuSan == MasterId).ToList();
        }
    }
}
