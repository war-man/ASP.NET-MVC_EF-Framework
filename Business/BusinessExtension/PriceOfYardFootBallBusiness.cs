using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
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

    }
}
