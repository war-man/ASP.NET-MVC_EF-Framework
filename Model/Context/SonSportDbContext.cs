namespace Model.Context
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Model.Application;

    public partial class SonSportDbContext : IdentityDbContext<ApplicationUser>
    {
        public SonSportDbContext()
            : base("name=SonSportDbContext", throwIfV1Schema: false)
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public static SonSportDbContext Create()
        {
            return new SonSportDbContext();
        }

        public virtual DbSet<BANGGIALOAISAN> BANGGIALOAISAN { get; set; }
        public virtual DbSet<CHITIETDATSAN> CHITIETDATSAN { get; set; }
        public virtual DbSet<CHUSAN_KHACHHANG> CHUSAN_KHACHHANG { get; set; }
        public virtual DbSet<CHUSANQUANLY> CHUSANQUANLY { get; set; }
        public virtual DbSet<DATSAN> DATSAN { get; set; }
        public virtual DbSet<DIADIEMSANBONG> DIADIEMSANBONG { get; set; }
        public virtual DbSet<KHACHHANG> KHACHHANG { get; set; }
        public virtual DbSet<LOAISANBONG> LOAISANBONG { get; set; }
        public virtual DbSet<NHANVIEN> NHANVIEN { get; set; }
        public virtual DbSet<SANBONG> SANBONG { get; set; }
        public virtual DbSet<DISTRICT> DISTRICT { get; set; }
        public virtual DbSet<FILE> FILE { get; set; }
        public virtual DbSet<IMAGE_OF_PLACE> IMAGE_OF_PLACE { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CHUSANQUANLY>()
                .Property(e => e.Sdt)
                .IsUnicode(false);

            modelBuilder.Entity<CHUSANQUANLY>()
                .HasMany(e => e.CHUSAN_KHACHHANG)
                .WithRequired(e => e.CHUSANQUANLY)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DATSAN>()
                .HasMany(e => e.CHITIETDATSAN)
                .WithRequired(e => e.DATSAN)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DIADIEMSANBONG>()
                .Property(e => e.Sdt1)
                .IsUnicode(false);

            modelBuilder.Entity<DIADIEMSANBONG>()
                .Property(e => e.Sdt2)
                .IsUnicode(false);

            modelBuilder.Entity<KHACHHANG>()
                .Property(e => e.Sdt)
                .IsUnicode(false);

            modelBuilder.Entity<KHACHHANG>()
                .HasMany(e => e.CHUSAN_KHACHHANG)
                .WithRequired(e => e.KHACHHANG)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DIADIEMSANBONG>()
                .HasMany(e => e.IMAGE_OF_PLACE)
                .WithOptional(e => e.DIADIEMSANBONG)
                .WillCascadeOnDelete();

            modelBuilder.Entity<FILE>()
                .HasMany(e => e.IMAGE_OF_PLACE)
                .WithOptional(e => e.FILE)
                .WillCascadeOnDelete();
        }
    }
}
