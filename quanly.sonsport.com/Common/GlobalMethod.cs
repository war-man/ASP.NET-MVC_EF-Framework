using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace quanly.sonsport.com.Common
{
    public static class GlobalMethod
    {
        public static string IsMenuActive(this HtmlHelper html, string actionName, string controllerName)
        {
            var conname = html.ViewContext.RouteData.Values["controller"].ToString().ToLower();
            var actname = html.ViewContext.RouteData.Values["action"].ToString().ToLower();
            if (conname.Equals(controllerName.ToLower()) && actname.Equals(actionName.ToLower()))
            {
                return "active";
            }
            return "";
        }

        public static string ConvertIntToHour(int Hour)
        {
            if(Hour>=10)
            {
                return $"{Hour}:00:00";
            }
            return $"0{Hour}:00:00";
        }
    }
}