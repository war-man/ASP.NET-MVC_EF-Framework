namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NotNullInt : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.CHITIETDATSAN", "ThoiGianBatDau", c => c.Int(nullable: false));
            AlterColumn("dbo.CHITIETDATSAN", "ThoiGianKetThuc", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.CHITIETDATSAN", "ThoiGianKetThuc", c => c.Int());
            AlterColumn("dbo.CHITIETDATSAN", "ThoiGianBatDau", c => c.Int());
        }
    }
}
