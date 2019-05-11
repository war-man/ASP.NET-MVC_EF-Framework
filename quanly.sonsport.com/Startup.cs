using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(quanly.sonsport.com.Startup))]
namespace quanly.sonsport.com
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
