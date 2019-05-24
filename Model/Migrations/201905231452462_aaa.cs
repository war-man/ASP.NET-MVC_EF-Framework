namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class aaa : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BANGGIALOAISAN", "GiaTien", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BANGGIALOAISAN", "GiaTien", c => c.Int());
        }
    }
}
