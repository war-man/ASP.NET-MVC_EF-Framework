namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class aaaa : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.NHANVIEN", "TenNhanVien", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.NHANVIEN", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.NHANVIEN", "SoDienThoai", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.NHANVIEN", "SoDienThoai", c => c.String());
            AlterColumn("dbo.NHANVIEN", "Email", c => c.String());
            AlterColumn("dbo.NHANVIEN", "TenNhanVien", c => c.String(maxLength: 50));
        }
    }
}
