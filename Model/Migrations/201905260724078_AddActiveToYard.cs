namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddActiveToYard : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SANBONG", "IsActive", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SANBONG", "IsActive");
        }
    }
}
