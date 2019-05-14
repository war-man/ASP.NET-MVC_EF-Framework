using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Model.Application;
using Model.Context;

namespace quanly.sonsport.com.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        protected ApplicationSignInManager _signInManager;
        protected ApplicationUserManager _userManager;
        protected ApplicationRoleManager _roleManager;
        protected SonSportDbContext _dbContext;

        public BaseController()
        {
        }

        public BaseController(ApplicationRoleManager roleManager,
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

        public ApplicationUser GetUser()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            return user;
        }

        public CHUSANQUANLY GetMaster()
        {
            using (_dbContext = new SonSportDbContext())
            {
                var user = GetUser();
                var master = _dbContext.CHUSANQUANLY.FirstOrDefault(n => n.MaChuSan == user.MaChuSan);
                return master;
            }  
        }
    }
}