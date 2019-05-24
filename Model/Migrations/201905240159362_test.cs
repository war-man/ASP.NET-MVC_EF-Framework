namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CHITIETDATSAN", "MaDiaDiem", c => c.Int());
            CreateIndex("dbo.CHITIETDATSAN", "MaDiaDiem");
            AddForeignKey("dbo.CHITIETDATSAN", "MaDiaDiem", "dbo.DIADIEMSANBONG", "MaDiaDiem");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CHITIETDATSAN", "MaDiaDiem", "dbo.DIADIEMSANBONG");
            DropIndex("dbo.CHITIETDATSAN", new[] { "MaDiaDiem" });
            DropColumn("dbo.CHITIETDATSAN", "MaDiaDiem");
        }
    }
}
