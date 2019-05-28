namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.IMAGE_OF_PLACE", "MaDiaDiem", "dbo.DIADIEMSANBONG");
            DropForeignKey("dbo.IMAGE_OF_PLACE", "FileId", "dbo.FILE");
            DropIndex("dbo.IMAGE_OF_PLACE", new[] { "FileId" });
            DropIndex("dbo.IMAGE_OF_PLACE", new[] { "MaDiaDiem" });
            DropTable("dbo.FILE");
            DropTable("dbo.IMAGE_OF_PLACE");
        }
    }
}
