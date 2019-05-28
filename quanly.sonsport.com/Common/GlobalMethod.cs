using Model.Context;
using System;
using System.Collections.Generic;
using System.IO;
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

        public static string ConvertIntToHourNoMilisecond(int Hour)
        {
            if (Hour >= 10)
            {
                return $"{Hour}:00";
            }
            return $"0{Hour}:00";
        }

        public static string CustomValidateInputTimeAndPrice(int bd, int kt, int price,List<CHITIETDATSAN> lstCTDS,DateTime kickatdate)
        {
            if (price > 10000000)
            {
                return "Giá tiền không được vượt quá 10 triệu";
            }
            if (bd == kt)
            {
                return "Thời gian bắt đầu không được bằng kết thúc";
            }
            if (bd > kt)
            {
                return "Thời gian bắt đầu không được lớn hơn kết thúc";
            }
            foreach (var item in lstCTDS)
            {
                if(kickatdate.Date==item.DaVaoNgay)
                {
                    if (bd >= item.ThoiGianBatDau && bd < item.ThoiGianKetThuc)
                    {
                        return "Khung giờ này đã có người đặt!";
                    }
                    if (kt > item.ThoiGianBatDau && kt <= item.ThoiGianKetThuc)
                    {
                        return "Khung giờ này đã có người đặt!";
                    }
                }
                else if(kickatdate.Date<DateTime.Now.Date)
                {
                    return "Không thể tạo lịch đặt trong quá khứ";
                }
            }
            return "success";
        }

        public static string CutString(string input,int maxlength)
        {
            if(input.Length>maxlength)
            {
                input = input.Substring(0, maxlength) + "...";
                return input;
            }
            else
            {
                return input;
            }
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
    }
}