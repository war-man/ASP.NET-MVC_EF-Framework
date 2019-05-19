namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NotNullDatetime : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.CHITIETDATSAN", "DaVaoNgay", c => c.DateTime(nullable: false, storeType: "date"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.CHITIETDATSAN", "DaVaoNgay", c => c.DateTime(storeType: "date"));
        }
    }
}
