namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.KHACHHANG", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.KHACHHANG", "Address");
        }
    }
}
