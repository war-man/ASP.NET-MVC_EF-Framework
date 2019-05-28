using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessInterface
{
    public interface IFileUploadBusiness
    {
        List<FILE> GetAllImageOfPlace(int PlaceId);

        FILE GetFileInfo(int FileId);
    }
}
