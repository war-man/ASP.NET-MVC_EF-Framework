using System.Web;
using System.Web.Optimization;

namespace sonsport.com
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/js").IncludeDirectory("~/Assets/Scripts", "*.js"));
            bundles.Add(new ScriptBundle("~/Scripts/site.js").Include("~/Assets/Scripts/SiteJS/site-main.js"));

            BundleTable.EnableOptimizations = false;
        }
    }
}
