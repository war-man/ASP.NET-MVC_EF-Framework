namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test1 : DbMigration
    {
        public override void Up()
        {

        }
        
        public override void Down()
        {
            AlterColumn("dbo.KHACHHANG", "Email", c => c.String(maxLength: 20));
            AlterColumn("dbo.KHACHHANG", "Sdt", c => c.String(maxLength: 15, unicode: false));
            AlterColumn("dbo.KHACHHANG", "TenKhachHang", c => c.String(maxLength: 100));
        }
    }
}
