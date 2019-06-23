namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMaKhachHangToReport : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.REPORT", "MaKhachHang", c => c.Int(nullable: true));
            CreateIndex("dbo.REPORT", "MaKhachHang");
            AddForeignKey("dbo.REPORT", "MaKhachHang", "dbo.KHACHHANG", "MaKhachHang");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.REPORT", "MaKhachHang", "dbo.KHACHHANG");
            DropIndex("dbo.REPORT", new[] { "MaKhachHang" });
            DropColumn("dbo.REPORT", "MaKhachHang");
        }
    }
}
