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
    public class MasterYardBusiness : GenericBusiness, IMasterYardBusiness
    {
        private SonSportDbContext dbContext;
        public MasterYardBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public bool CheckEmailMaster(string Email)
        {
            var master = dbContext.CHUSANQUANLY.FirstOrDefault(n => n.Email.Equals(Email));
            if(master!=null)
            {
                return false;
            }
            return true;
        }

        public void CreateMaster(CHUSANQUANLY master)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.CHUSANQUANLY.Add(master);
                dbContext.SaveChanges();
            }
        }

        public List<CHUSANQUANLY> GetMasterByActive(bool IsActive)
        {
            var lstMaster = dbContext.CHUSANQUANLY.Where(n => n.IsActive == IsActive).ToList();
            return lstMaster;
        }

        public void ActiveMaster(int MasterId)
        {
            var master = dbContext.CHUSANQUANLY.Find(MasterId);
            master.IsActive = true;
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(master).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
    }
}
