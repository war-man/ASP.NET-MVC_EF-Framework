using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessExtension
{
    public class ReportBusiness : GenericBusiness, IReportBusiness
    {
        private SonSportDbContext dbContext;
        public ReportBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreateReport(REPORT rp)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.REPORT.Add(rp);
                dbContext.SaveChanges();
            }
        }
    }
}
