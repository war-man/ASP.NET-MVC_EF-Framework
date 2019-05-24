using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity.Owin;
using System.Web.SessionState;
using sonsport.com.Common;
using System.Threading.Tasks;
using Model.Application;
using Microsoft.AspNet.Identity;
using Model.Context;

namespace sonsport.com.Controllers
{

    public class BaseController : Controller
    {
        protected ApplicationSignInManager _signInManager;
        protected ApplicationUserManager _userManager;
        protected ApplicationRoleManager _roleManager;
        protected SonSportDbContext _dbContext;
        public BaseController()
        {
        }

        public BaseController(
            ApplicationRoleManager roleManager,
            ApplicationUserManager userManager, 
            ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            RoleManager = roleManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ApplicationRoleManager RoleManager
        {
            get
            {
                return _roleManager ?? HttpContext.GetOwinContext().Get<ApplicationRoleManager>();
            }
            private set
            {
                _roleManager = value;
            }
        }

        public async Task<ApplicationUser> GetUser()
        {
            if(User.Identity.IsAuthenticated)
            {
               
                var user = await UserManager.FindByNameAsync(User.Identity.Name);
                return user;
            }
            return null;
        }

        public ApplicationUser CurrentUserAccount
        {
            get
            {
                var userId = User.Identity.GetUserId();
                return UserManager.FindById(userId);
            }
        }

        public object CurrentUser 
        {
            get
            {
                var currentUser = CurrentUserAccount;
                if(User.IsInRole("CHUSAN") && currentUser.MaChuSan!=null)
                {
                    var MasterId = currentUser.MaChuSan;
                    using (_dbContext = new SonSportDbContext())
                    {
                        return _dbContext.CHUSANQUANLY.Find(MasterId);
                    }
                }
                else if(User.IsInRole("KHACHHANG") && currentUser.MaKhachHang != null)
                {
                    var CustomerId = currentUser.MaKhachHang;
                    using (_dbContext = new SonSportDbContext())
                    {
                        return _dbContext.KHACHHANG.Find(CustomerId);
                    }
                }
                return null;
            }
        }
    }
}