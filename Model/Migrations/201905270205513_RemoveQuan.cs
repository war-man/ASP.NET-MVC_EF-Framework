namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveQuan : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.DIADIEMSANBONG", "Quan");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DIADIEMSANBONG", "Quan", c => c.String(maxLength: 20));
        }
    }
}
