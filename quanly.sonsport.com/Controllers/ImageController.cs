using Business.BusinessInterface;
using quanly.sonsport.com.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace quanly.sonsport.com.Controllers
{
    public class ImageController : Controller
    {
        private readonly IFileUploadBusiness FileUploadBusiness;
        public ImageController(IFileUploadBusiness FileUploadBusiness)
        {
            this.FileUploadBusiness = FileUploadBusiness;
        }
        public ActionResult ShowImage(int FileId)
        {
            var file = FileUploadBusiness.GetFileInfo(FileId);
            var default_image_path = "~/Assets/Images/image/default_image.png";
            byte[] imageData;
            if (file != null)
            {
                imageData = file.Code;
                return File(imageData, "image/jpg");
            }
            imageData = GlobalMethod.FileToByteArray(default_image_path);
            return File(imageData, "image/jpg");
        }
    }
}