using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(admin.sonsport.com.Startup))]
namespace admin.sonsport.com
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
