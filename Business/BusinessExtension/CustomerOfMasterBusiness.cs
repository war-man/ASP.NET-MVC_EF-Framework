using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessExtension
{
    public class CustomerOfMasterBusiness : GenericBusiness,ICustomerOfMasterBusiness
    {
        private SonSportDbContext dbContext;
        public CustomerOfMasterBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public KHACHHANG GetInfoCustomer(int CustomerId)
        {
            return dbContext.KHACHHANG.Find(CustomerId);
        }
    }
}
