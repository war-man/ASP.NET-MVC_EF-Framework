using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(sonsport.com.Startup))]
namespace sonsport.com
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
