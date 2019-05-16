using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessExtension
{
    public class TypeOfYardBusiness : GenericBusiness,ITypeOfYardBusiness
    {
        private SonSportDbContext dbContext;
        public TypeOfYardBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public List<LOAISANBONG> GetAllTypeOfYard()
        {
            var type = dbContext.LOAISANBONG.ToList();
            return type;
        }
    }
}
