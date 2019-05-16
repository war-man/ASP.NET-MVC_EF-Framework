using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessExtension
{
    public class EmployeeOfPlaceBusiness : GenericBusiness, IEmployeeOfPlaceBusiness
    {
        private SonSportDbContext dbContext;
        public EmployeeOfPlaceBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }
    }
}
