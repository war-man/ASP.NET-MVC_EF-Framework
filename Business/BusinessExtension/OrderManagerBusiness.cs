using Business.BusinessInterface;
using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Business.BusinessViewModels;

namespace Business.BusinessExtension
{
    public class OrderManagerBusiness : GenericBusiness, IOrderManagerBusiness
    {
        private SonSportDbContext dbContext;
        public OrderManagerBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void CreateOrder(DATSAN ds)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.DATSAN.Add(ds);
                dbContext.SaveChanges();
            }
        }

        public void CreateOrderDetails(CHITIETDATSAN ctds)
        {
            using (dbContext = new SonSportDbContext())
            {
                dbContext.CHITIETDATSAN.Add(ctds);
                dbContext.SaveChanges();
            }
        }

        public void DeleteOrderDetails(int OrderId)
        {
            using(dbContext = new SonSportDbContext())
            {
                var OrderDetails = dbContext.CHITIETDATSAN.FirstOrDefault(n => n.MaDatSan == OrderId);
                dbContext.Entry(OrderDetails).State = EntityState.Deleted;
                
            }
            using (dbContext = new SonSportDbContext())
            {
                var Order = dbContext.DATSAN.FirstOrDefault(n => n.MaDatSan == OrderId);
                dbContext.Entry(Order).State = EntityState.Deleted;
            }
        }

        public List<CHITIETDATSAN> GetOrderDetails(int? MasterId, int? PlaceId,int? YardId)
        {
            var lstOrderDetails = new List<CHITIETDATSAN>();
            using (dbContext=new SonSportDbContext())
            {
                lstOrderDetails = dbContext.CHITIETDATSAN.Include(n => n.DATSAN).Include(n => n.CHUSANQUANLY).Include(n => n.SANBONG).ToList();
            }
            if(MasterId!=null)
            {
                lstOrderDetails = lstOrderDetails.Where(n => n.MaChuSan == MasterId).ToList();
            }
            if(PlaceId != null)
            {
                lstOrderDetails = lstOrderDetails.Where(n => n.SANBONG.MaDiaDiem == PlaceId).ToList();
            }
            if(YardId!=null)
            {
                lstOrderDetails = lstOrderDetails.Where(n => n.SANBONG.MaSanBong == YardId).ToList();
            }
            return lstOrderDetails;
        }

        public List<CHITIETDATSAN> GetOrderDetailsByMasterId(int MasterId)
        {
            return dbContext.CHITIETDATSAN.Include(n=>n.DATSAN).Where(n => n.MaChuSan == MasterId).ToList();
        }

        public OrderDetailsViewModels GetOrderDetailsByOrderId(int OrderId)
        {
            var ctds = dbContext.CHITIETDATSAN.Include(n => n.DATSAN).Include(n => n.SANBONG).FirstOrDefault(n => n.MaDatSan == OrderId);
            var odvm = new OrderDetailsViewModels
            {
                OrderId = OrderId,
                CustomerId=ctds.DATSAN.MaKhachHang,
                CustomerName = ctds.DATSAN.TenNguoiDat,
                EndTime = ctds.ThoiGianKetThuc,
                KickAtDate = ctds.DaVaoNgay,
                MasterId = (int)ctds.MaChuSan,
                PlaceId = (int)ctds.SANBONG.MaDiaDiem,
                Price = (int)ctds.GiaTien,
                StartTime = ctds.ThoiGianBatDau,
                YardId = ctds.MaSanBong,
                YardName = ctds.SANBONG.TenSanBong,
                PhoneNumber = ctds.DATSAN.PhoneNumber,
            };
            return odvm;
        }
    }
}
