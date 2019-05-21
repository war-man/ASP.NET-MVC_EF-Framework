namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ThemTenNguoiDat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DATSAN", "TenNguoiDat", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.DATSAN", "TenNguoiDat");
        }
    }
}
