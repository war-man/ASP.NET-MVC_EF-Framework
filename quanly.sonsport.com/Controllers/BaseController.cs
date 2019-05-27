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
    [Authorize(Roles = ("CHUSAN,CHUSAN_NHANVIEN"))]
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

        public string UserId
        {
            get
            {
                return User.Identity.GetUserId();
            }
        }

        public ApplicationUser GetUser()
        {
            using (_dbContext = new SonSportDbContext())
            {
                var user = _dbContext.Users.Find(UserId);
                return user;
            }
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

        public ApplicationUser UserAccount
        {
            get
            {
                return UserManager.FindById(User.Identity.GetUserId()); 
            }
        }

        public CHUSANQUANLY MasterOfPlace
        {
            get
            {
                var user = GetUser();
                using (_dbContext = new SonSportDbContext())
                {
                    return _dbContext.CHUSANQUANLY.FirstOrDefault(n => n.MaChuSan == user.MaChuSan);
                }   
            }
        }

        public List<DISTRICT> ListDistrict
        {
            get
            {
                using (_dbContext = new SonSportDbContext())
                {
                    var lstDistric = _dbContext.DISTRICT.ToList();
                    return lstDistric;
                }
            }
        }
    }
}