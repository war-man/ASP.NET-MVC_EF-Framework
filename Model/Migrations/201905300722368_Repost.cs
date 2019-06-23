namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Repost : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.REPORT",
                c => new
                    {
                        ReportId = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ReportId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.REPORT");
        }
    }
}
