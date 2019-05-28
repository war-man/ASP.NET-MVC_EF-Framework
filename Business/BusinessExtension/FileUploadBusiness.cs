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

        public void CreateImageByPlaceId(int PlaceId, List<FILE> lstImageOfPlace)
        {
            using (dbContext = new SonSportDbContext())
            {
                if (lstImageOfPlace.Count > 0 || lstImageOfPlace != null)
                {
                    foreach (var image in lstImageOfPlace)
                    {
                        dbContext.FILE.Add(image);
                        dbContext.SaveChanges();
                        dbContext.IMAGE_OF_PLACE.Add(new IMAGE_OF_PLACE { MaDiaDiem = PlaceId, FileId = image.FileId });
                        dbContext.SaveChanges();
                    }
                }
            }
        }

        public void DeleteAllImageByPlaceId(int PlaceId)
        {
            var lstImageByPlace = dbContext.IMAGE_OF_PLACE.Where(n => n.MaDiaDiem == PlaceId).ToList();
            var lstFileByPlace = this.GetAllImageOfPlace(PlaceId);
            using (dbContext= new SonSportDbContext())
            {
                foreach(var image in lstImageByPlace)
                {                    
                    dbContext.Entry(image).State = System.Data.Entity.EntityState.Deleted;
                }
                foreach(var image in lstFileByPlace)
                {
                    dbContext.Entry(image).State = System.Data.Entity.EntityState.Deleted;
                }
                dbContext.SaveChanges();
            }
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

        public FILE GetFileInfoByPlace(int PlaceId)
        {
            var lstFile = this.GetAllImageOfPlace(PlaceId);
            return lstFile.FirstOrDefault();
        }
    }
}
