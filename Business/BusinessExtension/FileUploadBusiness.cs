using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessExtension
{
    public class FileUploadBusiness : GenericBusiness, IFileUploadBusiness
    {
        private SonSportDbContext dbContext;
        public FileUploadBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public List<FILE> GetAllImageOfPlace(int PlaceId)
        {
            List<FILE> lstFile = (from f in dbContext.FILE.ToList()
                                  join i in dbContext.IMAGE_OF_PLACE.ToList() on f.FileId equals i.FileId
                                  where i.MaDiaDiem == PlaceId
                                  select f).ToList();
            return lstFile;
        }

        public FILE GetFileInfo(int FileId)
        {
            return dbContext.FILE.FirstOrDefault(n => n.FileId == FileId);
        }
    }
}
