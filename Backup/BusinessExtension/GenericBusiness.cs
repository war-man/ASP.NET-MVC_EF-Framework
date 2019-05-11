using Model.Context;

namespace Business.BusinessExtension
{
    public class GenericBusiness
    {
        public GenericBusiness(SonSportDbContext database)
        {
            database = new SonSportDbContext();
        }
        
    }
}