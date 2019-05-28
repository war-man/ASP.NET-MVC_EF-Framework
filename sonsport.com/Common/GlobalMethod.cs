using Model.Context;
using System;
using System.Collections.Generic;
using System.IO;
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

        public static string ConverVNSign(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return string.Empty;
            }

            List<string> ListAllVNChars = new List<string>{
                "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ",
            "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê",
            "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ",
            "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở",
            "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ",
            "ý", "ỵ", "ỷ", "ỹ", "đ", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ",
            "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ",
            "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò",
            "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ",
            "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử",
            "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ", "ê", "ù", "à",

            "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă",
            "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê",
            "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò",
            "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ",
            "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư",
            "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ",
            "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ",
            "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ",
            "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ",
            "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ",
            "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ",
            "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
            "Đ"
            };

            List<string> ListAllUnsignChars = new List<string>{
                "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
            "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e",
            "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "o", "o", "o",
            "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
            "o", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "y",
            "y", "y", "y", "y", "d", "A", "A", "A", "A", "A", "A", "A", "A",
            "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E",
            "E", "E", "E", "E", "E", "E", "E", "I", "I", "I", "I", "I", "O",
            "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
            "O", "O", "O", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U",
            "U", "Y", "Y", "Y", "Y", "Y", "D", "e", "u", "a",

            "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
            "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
            "e", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o",
            "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u",
            "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y",
            "d", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A",
            "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E",
            "E", "E", "E", "I", "I", "I", "I", "I", "O", "O", "O", "O", "O",
            "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "U",
            "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "Y", "Y", "Y",
            "Y", "Y", "D"
            };

            for (int i = 0; i < ListAllVNChars.Count; i++)
            {
                text = text.Replace(ListAllVNChars[i], ListAllUnsignChars[i]);
            }
            return text;
        }

        public static byte[] FileToByteArray(string _FilePath)
        {
            byte[] _Buffer = null;
            System.IO.FileStream _FileStream = null;
            System.IO.BinaryReader _BinaryReader = null;
            try
            {
                // Open file for reading
                _FileStream = new System.IO.FileStream(_FilePath, System.IO.FileMode.Open, System.IO.FileAccess.Read);

                // attach filestream to binary reader
                _BinaryReader = new System.IO.BinaryReader(_FileStream);

                // get total int length of the file
                long _TotalBytes = new System.IO.FileInfo(_FilePath).Length;

                // read entire file into buffer
                _Buffer = _BinaryReader.ReadBytes((Int32)_TotalBytes);

                return _Buffer;
            }
            catch (Exception _Exception)
            {
                // Error                
                return null;
            }
            finally
            {
                if (_FileStream != null)
                {
                    _FileStream.Close();
                    _FileStream.Dispose();
                }

                // close file reader
                if (_BinaryReader != null)
                {
                    _BinaryReader.Close();
                    _BinaryReader.Dispose();
                }
            }
        }

        public static byte[] StreamToByteArray(Stream _FileStream)
        {
            byte[] _Buffer = null;
            System.IO.BinaryReader _BinaryReader = null;
            try
            {
                // attach filestream to binary reader
                _BinaryReader = new System.IO.BinaryReader(_FileStream);

                // get total int length of the file
                long _TotalBytes = _FileStream.Length;

                // read entire file into buffer
                _Buffer = _BinaryReader.ReadBytes((Int32)_TotalBytes);

                return _Buffer;
            }
            catch (Exception _Exception)
            {
                // Error                
                return null;
            }
            finally
            {
                if (_FileStream != null)
                {
                    _FileStream.Close();
                    _FileStream.Dispose();
                }

                // close file reader
                if (_BinaryReader != null)
                {
                    _BinaryReader.Close();
                    _BinaryReader.Dispose();
                }
            }
        }
    }
}