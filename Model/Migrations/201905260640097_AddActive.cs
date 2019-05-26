namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddActive : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DIADIEMSANBONG", "IsActive", c => c.Boolean());
            AlterColumn("dbo.KHACHHANG", "Email", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.KHACHHANG", "Email", c => c.String(maxLength: 20));
            DropColumn("dbo.DIADIEMSANBONG", "IsActive");
        }
    }
}
