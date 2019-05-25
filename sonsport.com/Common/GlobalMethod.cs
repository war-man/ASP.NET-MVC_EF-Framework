using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace sonsport.com.Common
{
    public static class GlobalMethod
    {
        public static string IsMenuSelected(this HtmlHelper html, string actionName, string controllerName)
        {
            var conname = html.ViewContext.RouteData.Values["controller"].ToString().ToLower();
            var actname = html.ViewContext.RouteData.Values["action"].ToString().ToLower();
            if (conname.Equals(controllerName.ToLower()) && actname.Equals(actionName.ToLower()))
            {
                return "selected";
            }
            return "";
        }

        public static DateTime ParseStringToDateTime(string strDate=null)
        {
            if (string.IsNullOrEmpty(strDate))
                return DateTime.Now;
            return Convert.ToDateTime(strDate);
        }

        public static string ParseDayOfWeekToVN(DayOfWeek DayOfWeek)
        {
            switch(DayOfWeek)
            {
                case DayOfWeek.Sunday: return "CN";
                case DayOfWeek.Monday: return "Thứ 2";
                case DayOfWeek.Tuesday: return "Thứ 3";
                case DayOfWeek.Wednesday: return "Thứ 4";
                case DayOfWeek.Thursday: return "Thứ 5";
                case DayOfWeek.Friday: return "Thứ 6";
                case DayOfWeek.Saturday: return "Thứ 7";
                default: return "???";
            }
        }

        public static string ConvertIntToHourNoMilisecond(int Hour)
        {
            if (Hour >= 10)
            {
                return $"{Hour}:00";
            }
            return $"0{Hour}:00";
        }

        public static List<string> ParseToListStringDateView()
        {
            List<string> lstDateView = new List<string>();
            for(int i=0;i<6; i++)
            {
                lstDateView.Add($"{ParseDayOfWeekToVN(DateTime.Now.AddDays(+i).DayOfWeek)}, {DateTime.Now.AddDays(+i).ToString("dd-MM-yyyy")}");
            }
            return lstDateView;
        }

        public static List<string> ListStartTimeByYardId(int YardId,int OpenTime,int CloseTime,List<CHITIETDATSAN> lstOrder)
        {
            List<string> lstStartTime = new List<string>();
            for (int i = OpenTime; i <= CloseTime; i++)
            {
                if(lstOrder.Count==0)
                {
                    lstStartTime.Add($"{ConvertIntToHourNoMilisecond(i)}");
                }
                else
                {
                    if(lstOrder.Exists(n=>n.ThoiGianBatDau==i))
                    {
                        lstStartTime.Add($"{ConvertIntToHourNoMilisecond(i)} (Đã có người đặt)");
                    }
                    else
                    {
                        lstStartTime.Add($"{ConvertIntToHourNoMilisecond(i)}");
                    }
                }
            }
            return lstStartTime;
        }
    }
}