using System.Web.Mvc;
using Model.Context;
using quanly.sonsport.com.Common;
using Business.BusinessInterface;
using Business.BusinessViewModels;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System;
using System.IO;

namespace quanly.sonsport.com.Controllers
{
    [Authorize(Roles = ("CHUSAN,CHUSAN_NHANVIEN"))]
    [RoutePrefix("chu-san")]
    public class PlaceYardFootballController : BaseController
    {
        private readonly IPlaceYardFootballBusiness PlaceYardFootballBusiness;
        private readonly IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness;
        private readonly IFileUploadBusiness FileUploadBusiness;
        private readonly IEmployeeOfPlaceBusiness EmployeeOfPlaceBusiness;
        public PlaceYardFootballController(IEmployeeOfPlaceBusiness EmployeeOfPlaceBusiness,
        IFileUploadBusiness FileUploadBusiness,
        IYardFootballOfPlaceBusiness YardFootballOfPlaceBusiness,
        IPlaceYardFootballBusiness placeYardFootballBusiness)
        {
            this.EmployeeOfPlaceBusiness = EmployeeOfPlaceBusiness;
            this.FileUploadBusiness = FileUploadBusiness;
            this.YardFootballOfPlaceBusiness = YardFootballOfPlaceBusiness;
            this.PlaceYardFootballBusiness = placeYardFootballBusiness;
        }

        [Route("dia-diem-san-bong")]
        // GET: PlaceYardFootball
        public ActionResult Index()
        {
            var lstPlace = PlaceYardFootballBusiness.SearchByMaster(MasterOfPlace.MaChuSan);
            return View(lstPlace);
        }

        public ActionResult LoadFormCreate()
        {
            ViewData[GlobalConstans.LstDistrict] = ListDistrict;
            int MasterId = MasterOfPlace.MaChuSan;
            var model = new PlaceYardViewModel() { MaChuSan = MasterId };
            return PartialView("_FormCreatePlace", model);
        }

        public ActionResult LoadFormEdit(int PlaceId)
        {
            ViewData[GlobalConstans.LstFileImage] = FileUploadBusiness.GetAllImageOfPlace(PlaceId);
            ViewData[GlobalConstans.LstDistrict] = ListDistrict;
            DIADIEMSANBONG placeYard = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
            var place = new PlaceYardViewModel
            {
                MaDiaDiem = placeYard.MaDiaDiem,
                CanDatCocKhiDatSan = placeYard.CanDatCocKhiDatSan,
                CoPhiMuonBong = placeYard.CoPhiMuonBong,
                CoPhiNuocUongTrenSan = placeYard.CoPhiNuocUongTrenSan,
                DiaChi = placeYard.DiaChi,
                GioDongCua = GlobalMethod.ConvertIntToHourNoMilisecond((int)placeYard.GioDongCua),
                GioMoCua = GlobalMethod.ConvertIntToHourNoMilisecond((int)placeYard.GioMoCua),
                MoTaDiaDiem = placeYard.MoTaDiaDiem,
                DistrictId = (int)placeYard.DistrictId,
                Sdt1 = placeYard.Sdt1,
                Sdt2 = placeYard.Sdt2,
                TenDiaDiem = placeYard.TenDiaDiem,
                MaChuSan = placeYard.MaChuSan,
                IsActive=placeYard.IsActive,
            };
            return PartialView("_FormEditPlace", place);
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreatePlace(PlaceYardViewModel model,List<HttpPostedFileBase> ListImage)
        {
            ViewData[GlobalConstans.LstDistrict] = ListDistrict;
            List<FILE> lstFile = new List<FILE>();
            //Kiem tra dinh dang Image
            string[] lstImageExtension = { ".JPG", ".JPEG",".PNG",".BMP",".ICO",".GIF"};
            if(ListImage !=null)
            {
                for (int i = 0; i < ListImage.Count; i++)
                {
                    var extension = Path.GetExtension(ListImage[i].FileName);
                    if(!lstImageExtension.Contains(extension.ToUpper()))
                    {
                        ModelState.AddModelError("ListImage", "File ảnh không đúng định dạng!");
                        return PartialView("_FormCreatePlace", model);
                    }
                    lstFile.Add(new FILE
                    {
                        Code = GlobalMethod.StreamToByteArray(ListImage[i].InputStream),
                        ContentType = ListImage[i].ContentType,
                        FileName = $"{model.TenDiaDiem}_{DateTime.Now}{Path.GetExtension(ListImage[i].FileName)}",
                    });
                }
            }
            if(ModelState.IsValid)
            {
                if(int.Parse(model.GioMoCua.Split(':')[0])>= int.Parse(model.GioDongCua.Split(':')[0]))
                {
                    ModelState.AddModelError("GioDongCua", "Giờ mở của không được lớn hơn hoặc bằng giờ đóng cửa");
                    return PartialView("_FormCreatePlace", model);
                }
                model.KeywordPlace = GlobalMethod.ConverVNSign(model.TenDiaDiem).ToLower();
                model.KeywordAddress = GlobalMethod.ConverVNSign(model.DiaChi).ToLower();
                PlaceYardFootballBusiness.CreatePlace(model,lstFile);
                TempData[GlobalConstans.MessageSuccess] = "Thêm địa điểm thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return PartialView("_FormCreatePlace",model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditPlace(PlaceYardViewModel model, List<HttpPostedFileBase> ListImage,FormCollection form)
        {
            ViewData[GlobalConstans.LstFileImage] = FileUploadBusiness.GetAllImageOfPlace((int)model.MaDiaDiem);
            var lstFileOfPlace = FileUploadBusiness.GetAllImageOfPlace((int)model.MaDiaDiem);
            var lstKeyOfForm = form.AllKeys.ToList();
            int countKeyImage = 0;
            foreach(var key in lstKeyOfForm)
            {
                if(key.StartsWith("IMAGE"))
                {
                    countKeyImage++;
                }
            }
            List<FILE> lstFile = new List<FILE>();
            if(ListImage!=null)
            ViewData[GlobalConstans.LstDistrict] = ListDistrict;
            if (ModelState.IsValid)
            {
                if (int.Parse(model.GioMoCua.Split(':')[0]) >= int.Parse(model.GioDongCua.Split(':')[0]))
                {
                    ModelState.AddModelError("GioDongCua", "Giờ mở của không được lớn hơn hoặc bằng giờ đóng cửa");
                    return PartialView("_FormEditPlace", model);
                }
                if (countKeyImage == 0)
                {
                    //Kiểu là Xóa sạch
                    if (ListImage == null)
                    {
                        //Kiểu là xóa toàn bộ ảnh của địa điểm này
                        FileUploadBusiness.DeleteAllImageByPlaceId((int)model.MaDiaDiem);
                    }
                    else //Xóa xong có thêm mới
                    {
                        FileUploadBusiness.DeleteAllImageByPlaceId((int)model.MaDiaDiem);
                        //Kiem tra dinh dang Image
                        string[] lstImageExtension = { ".JPG", ".JPEG", ".PNG", ".BMP", ".ICO", ".GIF" };
                        if (ListImage.Count > 0 || ListImage != null)
                        {
                            for (int i = 0; i < ListImage.Count; i++)
                            {
                                if (ListImage.Count > 4)
                                {
                                    ModelState.AddModelError("ListImage", "Số lượng hình ảnh không được lớn hơn 5!");
                                    return PartialView("_FormEditPlace", model);
                                }
                                var extension = Path.GetExtension(ListImage[i].FileName);
                                if (!lstImageExtension.Contains(extension.ToUpper()))
                                {
                                    ModelState.AddModelError("ListImage", "File ảnh không đúng định dạng!");
                                    return PartialView("_FormCreatePlace", model);
                                }
                                lstFile.Add(new FILE
                                {
                                    Code = GlobalMethod.StreamToByteArray(ListImage[i].InputStream),
                                    ContentType = ListImage[i].ContentType,
                                    FileName = $"{model.TenDiaDiem}_{DateTime.Now}{Path.GetExtension(ListImage[i].FileName)}",
                                });
                            }
                        }
                        FileUploadBusiness.CreateImageByPlaceId((int)model.MaDiaDiem,lstFile);
                    }
                }
                else if (countKeyImage == lstFileOfPlace.Count && ListImage!=null)
                {
                    string[] lstImageExtension = { ".JPG", ".JPEG", ".PNG", ".BMP", ".ICO", ".GIF" };
                    if (ListImage.Count > 0 || ListImage != null)
                    {
                        if(ListImage.Count+countKeyImage >4)
                        {
                            ModelState.AddModelError("ListImage", "Số lượng hình ảnh không được lớn hơn 5!");
                            return PartialView("_FormEditPlace", model);
                        }
                        for (int i = 0; i < ListImage.Count; i++)
                        {
                            var extension = Path.GetExtension(ListImage[i].FileName);
                            if (!lstImageExtension.Contains(extension.ToUpper()))
                            {
                                ModelState.AddModelError("ListImage", "File ảnh không đúng định dạng!");
                                return PartialView("_FormEditPlace", model);
                            }
                            lstFile.Add(new FILE
                            {
                                Code = GlobalMethod.StreamToByteArray(ListImage[i].InputStream),
                                ContentType = ListImage[i].ContentType,
                                FileName = $"{model.TenDiaDiem}_{DateTime.Now}{Path.GetExtension(ListImage[i].FileName)}",
                            });
                        }
                    }
                    FileUploadBusiness.CreateImageByPlaceId((int)model.MaDiaDiem, lstFile);
                }
                model.KeywordPlace = GlobalMethod.ConverVNSign(model.TenDiaDiem).ToLower();
                model.KeywordAddress = GlobalMethod.ConverVNSign(model.DiaChi).ToLower();
                PlaceYardFootballBusiness.UpdatePlace(model);
                TempData[GlobalConstans.MessageSuccess] = "Sửa địa điểm thành công!";
                return Json(new {success=true},JsonRequestBehavior.AllowGet);
            }
            return PartialView("_FormEditPlace", model);
        }

        public JsonResult Delete(int PlaceId)
        {
            var lstEmpByPlaceId = EmployeeOfPlaceBusiness.SearchEmployeeByPlaceId(PlaceId);
            if(lstEmpByPlaceId.Count>0)
            {
                TempData[GlobalConstans.MessageFailBootBox] = "Bạn chưa xóa Nhân viên của địa điểm này!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            var lstYardByPlace = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            if(lstYardByPlace!=null)
            {
                TempData[GlobalConstans.MessageFailBootBox] = "Bạn chưa xóa Sân bóng của địa điểm này!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            PlaceYardFootballBusiness.DeletePlace(PlaceId);
            TempData[GlobalConstans.MessageSuccess] = "Xóa thành công!";
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ActivePlace(int PlaceId)
        {
            var lstYOP = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            lstYOP = lstYOP.Where(n => n.IsActive == true).ToList();
            if(lstYOP.Count>0)
            {
                PlaceYardFootballBusiness.ActivePlace(PlaceId);
                TempData[GlobalConstans.MessageSuccess] = "Kích hoạt địa điểm thành công!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                TempData[GlobalConstans.MessageFailBootBox] = "Kích hoạt địa điểm thất bại! </br> Chưa có sân bóng nào được đưa vào sử dụng!";
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UnActivePlace(int PlaceId)
        {
            var Place = PlaceYardFootballBusiness.SearchInfoPlace(PlaceId);
            var lstYardOfPlace = YardFootballOfPlaceBusiness.GetAllYardFooballByPlace(PlaceId);
            foreach(var y in lstYardOfPlace)
            {
                if(y.IsActive==true)
                {
                    y.IsActive = false;
                    YardFootballOfPlaceBusiness.UpdateYardNew(y);
                }
            }
            PlaceYardFootballBusiness.UnActivePlace(PlaceId);
            TempData[GlobalConstans.MessageSuccess] = "Hủy kích hoạt sân bóng thành công!";
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}