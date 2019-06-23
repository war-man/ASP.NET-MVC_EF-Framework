namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMaDiaDiemToReport : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.REPORT", "MaDiaDiem", c => c.Int(nullable: true));
            CreateIndex("dbo.REPORT", "MaDiaDiem");
            AddForeignKey("dbo.REPORT", "MaDiaDiem", "dbo.DIADIEMSANBONG", "MaDiaDiem");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.REPORT", "MaDiaDiem", "dbo.DIADIEMSANBONG");
            DropIndex("dbo.REPORT", new[] { "MaDiaDiem" });
            DropColumn("dbo.REPORT", "MaDiaDiem");
        }
    }
}
