namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDistricIdToCustomer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.KHACHHANG", "DistrictId", c => c.Int(nullable: true));
            CreateIndex("dbo.KHACHHANG", "DistrictId");
            AddForeignKey("dbo.KHACHHANG", "DistrictId", "dbo.DISTRICT", "DistrictId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.KHACHHANG", "DistrictId", "dbo.DISTRICT");
            DropIndex("dbo.KHACHHANG", new[] { "DistrictId" });
            DropColumn("dbo.KHACHHANG", "DistrictId");
        }
    }
}
