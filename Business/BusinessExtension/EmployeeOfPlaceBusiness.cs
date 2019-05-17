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
    public class EmployeeOfPlaceBusiness : GenericBusiness, IEmployeeOfPlaceBusiness
    {
        private SonSportDbContext dbContext;
        public EmployeeOfPlaceBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreateEmployee(NHANVIEN nv)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.NHANVIEN.Add(nv);
                dbContext.SaveChanges();
            }
        }

        public void DeleteEmployee(int EmployeeId)
        {
            var nv = this.SearchEmployeeById(EmployeeId);
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(nv).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }

        public NHANVIEN SearchEmployeeById(int EmployeeId)
        {
            return dbContext.NHANVIEN.Find(EmployeeId);
        }

        public List<NHANVIEN> SearchEmployeeByMasterId(int masterId)
        {
            return dbContext.NHANVIEN.Include(n=>n.CHUSANQUANLY).Include(n => n.DIADIEMSANBONG).Where(n => n.MaChuSan == masterId).ToList();
        }

        public List<NHANVIEN> SearchEmployeeByPlaceId(int? placeId)
        {
            return dbContext.NHANVIEN.Include(n => n.CHUSANQUANLY).Include(n=>n.DIADIEMSANBONG).Where(n => n.MaDiaDiem == placeId).ToList();
        }

        public void UpdateEmployee(NHANVIEN nv)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(nv).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
    }
}
