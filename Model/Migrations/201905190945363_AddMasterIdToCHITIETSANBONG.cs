namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMasterIdToCHITIETSANBONG : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CHITIETDATSAN", "MaChuSan", c => c.Int());
            CreateIndex("dbo.CHITIETDATSAN", "MaChuSan");
            AddForeignKey("dbo.CHITIETDATSAN", "MaChuSan", "dbo.CHUSANQUANLY", "MaChuSan");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CHITIETDATSAN", "MaChuSan", "dbo.CHUSANQUANLY");
            DropIndex("dbo.CHITIETDATSAN", new[] { "MaChuSan" });
            DropColumn("dbo.CHITIETDATSAN", "MaChuSan");
        }
    }
}
