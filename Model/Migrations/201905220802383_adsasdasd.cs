namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adsasdasd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DATSAN", "IsCancelled", c => c.Boolean());
            DropColumn("dbo.DATSAN", "Status");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DATSAN", "Status", c => c.Boolean());
            DropColumn("dbo.DATSAN", "IsCancelled");
        }
    }
}
