using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Common;
namespace Business.BusinessExtension
{
    public class CustomerBusiness : GenericBusiness,ICustomerBusiness
    {
        private SonSportDbContext dbContext;
        public CustomerBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreateCustomer(KHACHHANG customer)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.KHACHHANG.Add(customer);
                dbContext.SaveChanges();
            }
        }

        public void UpdateCustomerProfile(KHACHHANG customer)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(customer).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
    }
}
