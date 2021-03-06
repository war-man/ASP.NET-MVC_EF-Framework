﻿using Business.BusinessInterface;
using Model.Context;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using Business.BusinessViewModels;

namespace Business.BusinessExtension
{
    public class PlaceYardFootballBusiness : GenericBusiness, IPlaceYardFootballBusiness
    {
        private SonSportDbContext dbContext;
        public PlaceYardFootballBusiness(SonSportDbContext database) : base(database)
        {
            dbContext = database;
        }

        public void ActivePlace(int PlaceId)
        {
            var place = this.SearchInfoPlace(PlaceId);
            place.IsActive = true;
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(place).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }

        public void CreatePlace(PlaceYardViewModel model,List<FILE> lstFile)
        {
            var place = new DIADIEMSANBONG
            {
                CanDatCocKhiDatSan = model.CanDatCocKhiDatSan,
                CoPhiMuonBong = model.CoPhiMuonBong,
                CoPhiNuocUongTrenSan = model.CoPhiNuocUongTrenSan,
                DiaChi = model.DiaChi,
                GioDongCua = int.Parse(model.GioDongCua.Substring(0, 2)),
                GioMoCua = int.Parse(model.GioMoCua.Substring(0, 2)),
                MoTaDiaDiem = model.MoTaDiaDiem,
                DistrictId = model.DistrictId,
                Sdt1 = model.Sdt1,
                Sdt2 = model.Sdt2,
                TenDiaDiem = model.TenDiaDiem,
                MaChuSan = model.MaChuSan,
                IsActive = false,
                KeywordAddress = model.KeywordAddress,
                KeywordPlace = model.KeywordPlace
            };
            using (dbContext = new SonSportDbContext())
            {
                dbContext.DIADIEMSANBONG.Add(place);
                dbContext.SaveChanges();
                if (lstFile.Count > 0 || lstFile != null)
                {
                    foreach (var image in lstFile)
                    {
                        dbContext.FILE.Add(image);
                        dbContext.SaveChanges();
                        dbContext.IMAGE_OF_PLACE.Add(new IMAGE_OF_PLACE { MaDiaDiem = place.MaDiaDiem, FileId = image.FileId });
                        dbContext.SaveChanges();
                    }
                }
            }

        }

        public void DeletePlace(int MaDiaDiem)
        {
            var place = this.SearchInfoPlace(MaDiaDiem);
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(place).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
        }

        public List<DIADIEMSANBONG> GetAllPlaceYardFootball()
        {
            return dbContext.DIADIEMSANBONG.Include(n => n.DISTRICT).Include(n=>n.IMAGE_OF_PLACE).ToList();
        }

        public List<DIADIEMSANBONG> SearchByMaster(int? MaChuSan)
        {
            var lstPlace = dbContext.DIADIEMSANBONG.Include(d => d.CHUSANQUANLY).Include(n=>n.IMAGE_OF_PLACE).ToList();
            if (MaChuSan != null)
            {
                lstPlace = lstPlace.Where(n => n.MaChuSan == MaChuSan).ToList();
            }
            return lstPlace;
        }

        public DIADIEMSANBONG SearchInfoPlace(int? MaDiaDiem)
        {
            DIADIEMSANBONG Place = new DIADIEMSANBONG();
            if (MaDiaDiem != null)
            {
                Place = dbContext.DIADIEMSANBONG.Include(d => d.CHUSANQUANLY).Include(n=>n.IMAGE_OF_PLACE).Include(n=>n.NHANVIEN).Include(n=>n.SANBONG)
                                                .ToList()
                                                .FirstOrDefault(n => n.MaDiaDiem == MaDiaDiem);
            }
            return Place;
        }

        public DIADIEMSANBONG SearchInfoPlaceByYardId(int YardId)
        {
            var yard = dbContext.SANBONG.FirstOrDefault(n => n.MaSanBong == YardId);
            return dbContext.DIADIEMSANBONG.FirstOrDefault(n => n.MaDiaDiem == yard.MaDiaDiem);
        }

        public void UnActivePlace(int PlaceId)
        {
            var place = this.SearchInfoPlace(PlaceId);
            place.IsActive = false;
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(place).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }

        public void UpdatePlace(PlaceYardViewModel model)
        {
            var place = new DIADIEMSANBONG
            {
                MaDiaDiem = (int)model.MaDiaDiem,
                CanDatCocKhiDatSan = model.CanDatCocKhiDatSan,
                CoPhiMuonBong = model.CoPhiMuonBong,
                CoPhiNuocUongTrenSan = model.CoPhiNuocUongTrenSan,
                DiaChi = model.DiaChi,
                GioDongCua = int.Parse(model.GioDongCua.Substring(0, 2)),
                GioMoCua = int.Parse(model.GioMoCua.Substring(0, 2)),
                MoTaDiaDiem = model.MoTaDiaDiem,
                DistrictId = model.DistrictId,
                Sdt1 = model.Sdt1,
                Sdt2 = model.Sdt2,
                TenDiaDiem = model.TenDiaDiem,
                MaChuSan = model.MaChuSan,
                KeywordAddress = model.KeywordAddress,
                KeywordPlace = model.KeywordPlace,
                IsActive=model.IsActive
            };
            using (dbContext = new SonSportDbContext())
            {
                dbContext.Entry(place).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
        }
    }
}