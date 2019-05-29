namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDataTestToDb : DbMigration
    {
        public override void Up()
        {
            //Role
            Sql("INSERT[dbo].[AspNetRoles]([Id], [Name], [Discriminator]) VALUES(N'6ba7d127-7705-4de5-b227-de61791e0c1a', N'CHUSAN', N'ApplicationRole')");
            Sql("INSERT[dbo].[AspNetRoles]([Id], [Name], [Discriminator]) VALUES(N'74236ce4-df93-4c9a-98f8-e1a07c7c10c5', N'CHUSAN_NHANVIEN', N'ApplicationRole')");
            Sql("INSERT[dbo].[AspNetRoles]([Id], [Name], [Discriminator]) VALUES(N'9f9a70ef-a1ad-4d2c-8947-2e3057b3f3bf', N'KHACHHANG', N'ApplicationRole')");
            Sql("INSERT[dbo].[AspNetRoles]([Id], [Name], [Discriminator]) VALUES(N'f1dbd2ab-4991-41d8-9bb7-ac3d44f6444b', N'ADMIN', N'ApplicationRole')");
            
            //District
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Huyện Bình Chánh')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Huyện Cần Giờ')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Huyện Củ Chi')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Huyện Hóc Môn')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Huyện Nhà Bè')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 1')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 10')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 11')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 12')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 2')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 12')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 3')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 4')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 5')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 6')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 7')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 8')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận 9')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Bình Tân')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Bình Thạnh')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Gò Vấp')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Phú Nhuận')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Tân Bình')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Tân Phú')");
            Sql("INSERT [dbo].[DISTRICT] ([DistrictName]) VALUES (N'Quận Thủ Đức')");

            //Loai san
            Sql("INSERT [dbo].[LOAISANBONG] ([TenLoaiSan]) VALUES (N'Sân 5 người')");
            Sql("INSERT [dbo].[LOAISANBONG] ([TenLoaiSan]) VALUES (N'Sân 7 người')");

            //tk admin
            Sql("INSERT [dbo].[AspNetUsers] ([Id], [MaKhachHang], [MaChuSan], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'01931711-3dc8-412c-ab1c-3e17f55494d7', NULL, NULL, N'admin1@gmail.com', 0, N'AJ/1osNnJVL4K4tHOS9/DA8GbX1UN4GsjBy4SpNWXYLJYwLQC98Pad3ljhfX2zudTA==', N'ef9a29d9-c4be-4b87-8cf5-e68d6b27cc54', N'123456', 0, 0, NULL, 1, 0, N'admin1@gmail.com')");
            Sql("INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'01931711-3dc8-412c-ab1c-3e17f55494d7', N'f1dbd2ab-4991-41d8-9bb7-ac3d44f6444b')");
        }

    public override void Down()
        {
        }
    }
}
