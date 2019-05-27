namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDistricIdToCustomer1 : DbMigration
    {
        public override void Up()
        {

        }
        
        public override void Down()
        {
            DropForeignKey("dbo.KHACHHANG", "DistrictId", "dbo.DISTRICT");
            DropIndex("dbo.KHACHHANG", new[] { "DistrictId" });
            AlterColumn("dbo.KHACHHANG", "DistrictId", c => c.Int(nullable: false));
            CreateIndex("dbo.KHACHHANG", "DistrictId");
            AddForeignKey("dbo.KHACHHANG", "DistrictId", "dbo.DISTRICT", "DistrictId", cascadeDelete: true);
        }
    }
}
