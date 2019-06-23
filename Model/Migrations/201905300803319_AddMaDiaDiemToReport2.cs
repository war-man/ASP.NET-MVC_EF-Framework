namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMaDiaDiemToReport2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.REPORT", "Description", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.REPORT", "Description", c => c.String());
        }
    }
}
