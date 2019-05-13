using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Configuration;

namespace quanly.sonsport.com.Common
{
    public static class Utils
    {
        #region                                                 
        /// <summary>												
        /// Thuyen												
        /// </summary>												
        /// <param name="value"></param>												
        /// <param name="customCulture"></param>												
        /// <param name="formatString"></param>												
        /// <returns></returns>												
        public static string FormatDecimal(this decimal? value, CultureInfo customCulture = null, string formatString = "#.##")
        {
            if (customCulture == null)
            {
                customCulture = (CultureInfo)Thread.CurrentThread.CurrentCulture.Clone();
                customCulture.NumberFormat.NumberDecimalSeparator = ".";
            }
            return value.HasValue ? value.Value.ToString(formatString, customCulture) : "";
        }

        public static string ValidateStringToDecimal(this string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return value.Replace(".", ",");
        }

        public static decimal? ToDecimal(this string value, int decimals = 1)
        {
            decimal _n = 0; decimal.TryParse(ValidateStringToDecimal(value), out _n);
            if (_n == 0) return null;
            return decimal.Round(_n, decimals);
        }

        public static bool IsDateTime(string txtDate)
        {
            DateTime tempDate;
            return DateTime.TryParse(txtDate, out tempDate);
        }

        public static bool IsDecimal(string txtValue)
        {
            decimal temValue;
            return Decimal.TryParse(txtValue, out temValue);
        }

        public static bool IsInt32(string txtValue)
        {
            int temValue;
            return Int32.TryParse(txtValue, out temValue);
        }
        #endregion

        /// <summary>												
        /// Get Guild value												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>08/05/2013</date>												
        /// <param name="val"></param>												
        /// <returns></returns>												
        public static int GetLong(object val, int def = 0)
        {
            if (val == null)
            {
                return def;
            }

            if (val is int)
            {
                return (int)val;
            }
            else
            {
                try
                {
                    return int.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetInt error, object is not a Decimal value");
                }
            }
        }

        /// <summary>												
        /// Get Guild value												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>08/05/2013</date>												
        /// <param name="val"></param>												
        /// <returns></returns>												
        public static int GetLong(IDictionary<string, object> dic, string key, int def = 0)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetLong(dic[key], def);
        }

        /// <summary>												
        /// Get Guild value												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>26/04/2013</date>												
        /// <param name="val"></param>												
        /// <returns></returns>												
        public static Guid? GetGuid(object val)
        {
            if (val == null)
            {
                return null;
            }
            else if (val is Guid)
            {
                return (Guid)val;
            }
            else
            {
                try
                {
                    return Guid.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetGuid error, object is not a Guid value");
                }
            }
        }

        /// <summary>												
        /// Get Guild value												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>26/04/2013</date>												
        /// <param name="val"></param>												
        /// <returns></returns>												
        public static Guid? GetGuid(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            return GetGuid(dic[key]);
        }

        public static decimal GetDecimal(object val, decimal def = 0)
        {
            if (val == null)
            {
                return def;
            }

            if (val is decimal)
            {
                return (decimal)val;
            }
            else
            {
                try
                {
                    return Decimal.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetInt error, object is not a Decimal value");
                }
            }
        }

        public static decimal GetDecimal(IDictionary<string, object> dic, string key, decimal def = 0)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetDecimal(dic[key], def);
        }

        public static decimal? GetNullableDecimal(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }

            return GetDecimal(dic[key], 0);
        }

        public static byte GetByte(object val, byte def = 0)
        {
            if (val == null)
            {
                return def;
            }

            if (val is byte)
            {
                return (byte)val;
            }
            else
            {
                try
                {
                    return byte.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("Getbyte error, object is not a byte value");
                }
            }
        }

        public static byte GetByte(IDictionary<string, object> dic, string key, byte def = 0)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetByte(dic[key], def);
        }

        public static byte? GetNullableByte(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetByte(dic[key]);
        }

        public static int? GetNullableShort(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetShort(dic[key]);
        }

        public static int GetInt(IDictionary<string, object> dic, string key, int def = 0)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetInt(dic[key], def);
        }

        public static int? GetNullableInt(object val)
        {
            if (val == null || val.Equals(""))
            {
                return null;
            }

            if (val is int)
            {
                return (int)val;
            }
            else
            {
                try
                {
                    return Int32.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetNullableInt(object val) error, object is not a Int value");
                }
            }
        }

        public static int? GetNullableInt(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetInt(dic[key]);
        }

        public static int? GetNullInt(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return 0;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetInt(dic[key]);
        }

        public static int GetInt(object val, int def = 0)
        {
            if (val == null || val.Equals(""))
            {
                return def;
            }

            if (val is int)
            {
                return (int)val;
            }
            else
            {
                try
                {
                    return Int32.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetInt error, object is not a Int value");
                }
            }
        }

        public static short GetShort(IDictionary<string, object> dic, string key, short def = 0)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetShort(dic[key], def);
        }

        public static short GetShort(object val, short def = 0)
        {
            if (val == null)
            {
                return def;
            }

            if (val is short)
            {
                return (short)val;
            }
            else
            {
                try
                {
                    return short.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetSchort error, object is not a int value");
                }
            }
        }

        public static List<int> GetIntList(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return GetIntList(null);
            }

            return GetIntList(dic[key]);
        }

        public static List<long> GetLongList(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return GetLongList(null);
            }

            return GetLongList(dic[key]);
        }

        public static List<T> GetNullableList<T>(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key)) return null;

            if (dic[key] is List<T>)
                return (List<T>)dic[key];
            else
                throw new BusinessException("Common_Label_InternalError");
        }

        public static List<int> GetIntList(object val)
        {
            List<int> def = new List<int>();
            if (val == null)
            {
                return def;
            }

            if (val is List<int>)
            {
                return (List<int>)val;
            }
            else
            {
                throw new Exception("SMAS.Business.Common.Utils: GetIntList error, object is not a List<Int> value");
            }
        }

        public static List<string> GetStringList(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return GetStringList(null);
            }

            return GetStringList(dic[key]);
        }

        public static List<string> GetStringList(object val)
        {
            List<string> def = new List<string>();
            if (val == null)
            {
                return def;
            }

            if (val is List<string>)
            {
                return (List<string>)val;
            }
            else
            {
                throw new Exception("SMAS.Business.Common.Utils: GetIntList error, object is not a List<string> value");
            }
        }

        public static List<long> GetLongList(object val)
        {
            List<long> def = new List<long>();
            if (val == null)
            {
                return def;
            }

            if (val is List<long>)
            {
                return (List<long>)val;
            }
            else
            {
                throw new Exception("SMAS.Business.Common.Utils: GetLongList error, object is not a List<long> value");
            }
        }

        public static List<int> GetIntListSpecial(IDictionary<string, object> dic, string key)
        {
            List<int> lstResult = new List<int>();
            if (dic.ContainsKey(key))
            {
                if (dic[key] is List<int>)
                {
                    lstResult = GetIntList(dic[key]);
                }
                else if (dic[key] is int)
                {
                    if ((int)dic[key] != 0)
                    {
                        lstResult.Add((int)dic[key]);
                    }
                }
                else if (dic[key] is string)
                {
                    string value = (string)dic[key];
                    string[] arr = value.Split(',');
                    foreach (string str in arr)
                    {
                        lstResult.Add(Int32.Parse(str.Trim()));
                    }
                }
            }
            return lstResult;
        }

        public static string GetString(IDictionary<string, object> dic, string key, string def = "")
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetString(dic[key], def);
        }

        public static string GetString(object val, string def = "")
        {
            if (val == null)
            {
                return def;
            }

            if (val is string)
            {
                return (string)val;
            }
            else
            {
                throw new Exception("SMAS.Business.Common.Utils: GetString error, object is not a string value");
            }
        }

        public static bool? GetNullableBool(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetBool(dic[key]);
        }

        public static int? ConvertBoolToByte(bool? a)
        {
            if (a == null)
            {
                return null;
            }
            else
            {
                if (a == true)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }

            }
        }
        public static bool? GetIsActive(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return true;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetBool(dic[key]);
        }

        public static bool GetBool(IDictionary<string, object> dic, string key, bool def = true)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetBool(dic[key], def);
        }

        public static bool GetBool(object val, bool def = true)
        {
            if (val == null)
            {
                return def;
            }

            if (val is bool)
            {
                return (bool)val;
            }
            else
            {
                throw new Exception("SMAS.Business.Common.Utils: GetBool error, object is not a bool value");
            }
        }

        public static bool? GetNullableBool(Dictionary<string, object> dic, string key, bool? def = false)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetNullableBool(dic[key], def);
        }

        public static bool? GetNullableBool(Dictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetBool(dic[key]);
        }

        public static bool? GetNullableBool(object val, bool? def = true)
        {
            if (val == null)
            {
                return def;
            }

            if (val is bool)
            {
                return (bool)val;
            }
            else
            {
                throw new Exception("GetBool error, object is not a bool value");
            }
        }

        /**												
		 * Cac ham dung cho Validate du lieu												
		 * Author: AuNH												
		 **/
        public static void ValidateRequire(object val, string ResKey)
        {
            if (val == null || val.ToString().Trim() == "")
            {
                List<object> Params = new List<object>();
                Params.Add(ResKey);
                throw new BusinessException("Common_Validate_Required", Params);
            }
        }

        public static void ValidateMaxLength(object val, int maxlength, string ResKey)
        {
            if (val != null && val.ToString().Length > maxlength)
            {
                List<object> Params = new List<object>();
                Params.Add(ResKey);
                Params.Add(maxlength);
                throw new BusinessException("Common_Validate_MaxLength", Params);
            }
        }

        public static void ValidateRange(int val, int min, int max, string ResKey)
        {
            if (val >= min && val <= max)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            Params.Add(min);
            Params.Add(max);
            throw new BusinessException("Common_Validate_NotInRange", Params);
        }

        public static void ValidateRange(double val, double min, double max, string ResKey)
        {
            if (val >= min && val <= max)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            Params.Add(min);
            Params.Add(max);
            throw new BusinessException("Common_Validate_NotInRange", Params);
        }

        public static void ValidatePastDate(DateTime? val, string ResKey)
        {
            if (val == null)
                return;
            if (val <= DateTime.Now)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            throw new BusinessException("Common_Validate_NotPastDate", Params);
        }

        /// <summary>												
        /// So sánh với ngày hiện tại												
        /// </summary>												
        /// <param name="val">val</param>												
        /// <param name="ResKey">The res key.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidatePastDateNow(DateTime? val, string ResKey)
        {
            if (val == null)
                return;
            if (val.Value.Date <= DateTime.Now.Date)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            throw new BusinessException("Common_Validate_PastDate", Params);
        }

        public static void ValidatelessthanorequalDateNow(DateTime? val, string ResKey)
        {
            if (val == null)
                return;
            if (val.Value.Date <= DateTime.Now.Date)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            throw new BusinessException("Common_Validate_PastDate", Params);
        }


        /// <summary>												
        /// ValidatePastYearNow												
        /// </summary>												
        /// <param name="val"></param>												
        /// <param name="ResKey"></param>												
        /// <author>												
        /// vtit_dungnt77												
        /// </author>												
        public static void ValidatePastYearNow(DateTime? val, string ResKey)
        {
            if (val == null)
                return;
            if (val.Value.Year <= DateTime.Now.Year)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            throw new BusinessException("Common_Validate_PastYear", Params);
        }
        public static void ValidateFutureDate(DateTime val, string ResKey)
        {
            if (val == null)
                return;
            if (val.Date >= DateTime.Now.Date)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            throw new BusinessException("Common_Validate_NotFutureDate", Params);
        }

        /// <summary>												
        /// ValidateFutureDate												
        /// </summary>												
        /// <param name="val">val</param>												
        /// <param name="ResKey">The res key.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidateFutureDateNow(DateTime? val, string ResKey)
        {
            if (!val.HasValue)
                return;
            if (val > DateTime.Now)
                return;

            List<object> Params = new List<object>();
            Params.Add(ResKey);
            throw new BusinessException("Common_Validate_NotFutureDate", Params);
        }
        /// <summary>												
        /// So sánh 2 số 												
        /// </summary>												
        /// <param name="val1">Đối tượng Void</param>												
        /// <param name="val2">The val2.</param>												
        /// <param name="Reskey1">The reskey1.</param>												
        /// <param name="Reskey2">The reskey2.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidateCompareNumber(int val1, int val2, string Reskey1, string Reskey2)
        {//hath												
            if (val1 <= val2)
            {
                return;
            }
            List<object> Params = new List<object>();
            Params.Add(Reskey1);
            Params.Add(Reskey2);

            throw new BusinessException("Common_Validate_CompareNumber", Params);

        }
        public static void ValidateCompareWithNumber(int val1, int val2, string Reskey1, string Reskey2)
        {//hath												
            if (val1 < val2)
            {
                return;
            }
            List<object> Params = new List<object>();
            Params.Add(Reskey1);
            Params.Add(Reskey2);

            throw new BusinessException("Common_Validate_CompareWithNumber", Params);

        }
        public static void ValidateCompareWithNumber(int val, int Number)
        {//hath												
            if (val < Number)
            {
                return;
            }
            throw new BusinessException("Common_Validate_CompareWithNumber");

        }
        public static void ValidateCompareToNumber(int val, int Number, string Reskey)
        {//hath												
            if (val > Number)
            {
                return;
            }
            List<object> Params = new List<object>();
            Params.Add(Reskey);
            Params.Add(Number.ToString());
            throw new BusinessException("Common_Validate_CompareToNumber", Params);

        }

        //namdv												
        public static void ValidateCompareNumber(double val1, double val2, string Reskey1, string Reskey2)
        {
            if (val1 <= val2)
            {
                return;
            }
        }
        /**												
		 * Kiem tra xem dateToCheck co lon hon afterCheck hay khong												
		 **/
        public static void ValidateAfterDate(DateTime dateToCheck, DateTime afterDate, string dateToCheckResKey, string afterDateResKey)
        {
            if (dateToCheck >= afterDate)
                return;

            List<object> Params = new List<object>();
            Params.Add(dateToCheckResKey);
            Params.Add(afterDateResKey);
            throw new BusinessException("Common_Validate_NotAfterDate", Params);
        }


        public static void ValidateAfterDate(DateTime? dateToCheck, DateTime? afterDate, string dateToCheckResKey, string afterDateResKey)
        {
            if (!dateToCheck.HasValue || !afterDate.HasValue)
            {
                return;
            }
            if (dateToCheck >= afterDate)
                return;

            List<object> Params = new List<object>();
            Params.Add(dateToCheckResKey);
            Params.Add(afterDateResKey);
            throw new BusinessException("Common_Validate_NotAfterDate", Params);
        }

        public static void ValidateAfterDate(DateTime? dateToCheck, DateTime? afterDate, string dateToCheckResKey, string afterDateResKey, DateTime? firtSemesterStartDate)
        {
            if (!dateToCheck.HasValue || !afterDate.HasValue)
            {
                return;
            }
            if (dateToCheck >= afterDate)
                return;

            List<object> Params = new List<object>();
            Params.Add(dateToCheckResKey);
            Params.Add(afterDateResKey);
            Params.Add(firtSemesterStartDate.Value.ToString("dd/MM/yyyy"));
            throw new BusinessException("Common_Validate_FirtSemesterStarDate", Params);
        }

        public static void ValidateEmail(string email, string Reskey)
        {

            if (string.IsNullOrEmpty(email))
            {
                return;
            }
            else
            {
                if (email.Trim() == "")
                {
                    return;
                }
            }
            Regex re = new Regex(@"^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$");
            if (re.IsMatch(email))
            {
                return;
            }
            else
            {
                List<object> Params = new List<object>();
                Params.Add(Reskey);
                throw new BusinessException("Common_Validate_NotEmail", Params);
            }
        }
        public static void ValidateWebsite(string website, string Reskey)
        {
            if (string.IsNullOrEmpty(website))
            {
                return;
            }
            Regex re = new Regex(@"(http://|)(www\.)?([^\.]+)\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$");
            if (re.IsMatch(website))
            {
                return;
            }
            else
            {
                List<object> Params = new List<object>();
                Params.Add(Reskey);
                throw new BusinessException("Common_Validate_NotWebsite", Params);
            }
        }

        /**												
		 * Kiem tra xem dateToCheck co lon hon afterDate so nam yearCompare hay khong												
		 **/
        public static void ValidateAfterDate(DateTime dateToCheck, DateTime afterDate, int yearCompare, string dateToCheckResKey, string afterDateResKey)
        {
            bool pass = false;

            int subtractYear = dateToCheck.Year - afterDate.Year;
            int subtractMonth = dateToCheck.Month - afterDate.Month;
            int subtractDay = dateToCheck.Day - afterDate.Day;


            if (subtractYear > yearCompare)
            {
                pass = true;
            }
            else if (subtractYear < yearCompare)
            {
                pass = false;
            }
            else
            {
                if (subtractMonth < 0)
                {
                    pass = false;
                }
                else if (subtractMonth > 0)
                {
                    pass = true;
                }
                else
                {
                    if (subtractDay < 0)
                    {
                        pass = false;
                    }
                    else if (subtractDay >= 0)
                    {
                        pass = true;
                    }
                }
            }


            if (pass)
                return;

            List<object> Params = new List<object>();
            Params.Add(dateToCheckResKey);
            Params.Add(afterDateResKey);
            Params.Add(yearCompare);
            throw new BusinessException("Common_Validate_NotAfterDateNum", Params);
        }
        /// <summary>												
        /// Kiểm tra null												
        /// </summary>												
        /// <param name="o">Đối tượng</param>												
        /// <param name="Reskey">The reskey.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidateNull(object o, string Reskey)
        {//hath												
            if (o != null)
                return;
            else
            {
                List<object> Params = new List<object>();
                Params.Add(Reskey);
                throw new BusinessException("Common_Validate_Null", Params);
            }
        }

        public static DateTime? GetDateTime(IDictionary<string, object> dic, string key, DateTime? def = null)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetDateTime(dic[key], def);
        }

        public static DateTime? GetDateTime(object val, DateTime? def = null)
        {
            if (val == null)
            {
                return null;
            }

            if (val is DateTime)
            {
                return (DateTime)val;
            }
            else
            {
                throw new Exception("SMAS.Business.Common.Utils: GetDateTime error, object is not a DateTime value");
            }
        }
        /* Comment ANHVD 6/6/2013 */
        //public static TimeSpan? GetTimeSpan(IDictionary<string, object> dic, string key, TimeSpan? def = null)												
        //{												
        //    if (!dic.ContainsKey(key))												
        //    {												
        //        return def;												
        //    }												

        //    return GetTimeSpan(dic[key], def);												
        //}												

        //public static TimeSpan? GetTimeSpan(object val, TimeSpan? def = null)												
        //{												
        //    if (val == null)												
        //    {												
        //        return null;												
        //    }												

        //    if (val is TimeSpan)												
        //    {												
        //        return (TimeSpan)val;												
        //    }												
        //    else												
        //    {												
        //        throw new Exception("SMAS.Business.Common.Utils: GetTimeSpan error, object is not a TimeSpan value");												
        //    }												
        //}												

        /// <summary>												
        /// So sánh ngày nhỏ hơn hoặc bằng to ex												
        /// </summary>												
        /// <param name="dateToCheck">Đối tượng Void</param>												
        /// <param name="afterDate">The after date.</param>												
        /// <param name="dateToCheckResKey">The date to check res key.</param>												
        /// <param name="afterDateResKey">The after date res key.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidateBeforeDate(DateTime? dateToCheck, DateTime? beforeDate, string dateToCheckResKey, string afterDateResKey)
        {//hath												
            if (!dateToCheck.HasValue || !beforeDate.HasValue)
            {
                return;
            }
            if (dateToCheck > beforeDate)
            {
                return;
            }

            List<object> Params = new List<object>();
            Params.Add(dateToCheckResKey);
            Params.Add(afterDateResKey);
            throw new BusinessException("Common_Validate_NotBeforeDate", Params);
        }

        /// <summary>												
        /// Kiem tra so thoai thoai												
        /// </summary>												
        /// <param name="number"></param>												
        /// <returns></returns>												
        public static bool CheckMobileNumber(string number)
        {
            List<string> headerNumbers = SplitStringToList(WebConfigurationManager.AppSettings["PreNumber"].ToString(), ',');
            List<string> headerLen9 = null;
            List<string> headerLen10 = null;
            List<string> headerLen11 = null;
            List<string> headerLen12 = null;
            if (WebConfigurationManager.AppSettings["PreNumberLen9"] != null)
            {
                var str9 = WebConfigurationManager.AppSettings["PreNumberLen9"].ToString();
                headerLen9 = new List<string>(str9.Split(new char[] { ',' }));
            }

            if (WebConfigurationManager.AppSettings["PreNumberLen10"] != null)
            {
                var str10 = WebConfigurationManager.AppSettings["PreNumberLen10"].ToString();
                headerLen10 = new List<string>(str10.Split(new char[] { ',' }));
            }

            if (WebConfigurationManager.AppSettings["PreNumberLen11"] != null)
            {
                var str11 = WebConfigurationManager.AppSettings["PreNumberLen11"].ToString();
                headerLen11 = new List<string>(str11.Split(new char[] { ',' }));
            }

            if (WebConfigurationManager.AppSettings["PreNumberLen12"] != null)
            {
                var str12 = WebConfigurationManager.AppSettings["PreNumberLen12"].ToString();
                headerLen12 = new List<string>(str12.Split(new char[] { ',' }));
            }

            if (String.IsNullOrEmpty(number))
            {
                return false;
            }
            if ((number.Length < 9) || (number.Length > 12))
            {
                return false;
            }
            if ((headerNumbers == null) || (headerNumbers.Count == 0))
            {
                return false;
            }

            if (number.Length == 9)
            {
                string number2 = number.Substring(0, number.Length - 7);
                if (headerLen9 != null)
                {
                    return headerLen9.Exists(a => a.Contains(number2));
                }
                else
                {
                    return false;
                }
            }
            else if (number.Length == 10)
            {
                string number2 = number.Substring(0, number.Length - 7);
                if (headerLen10 != null)
                {
                    return headerLen10.Exists(a => a.Contains(number2));
                }
                else
                {
                    return false;
                }
            }
            else if (number.Length == 11)
            {
                string number2 = number.Substring(0, number.Length - 7);
                if (headerLen11 != null)
                {
                    return headerLen11.Exists(a => a.Contains(number2));
                }
                else
                {
                    return false;
                }
            }
            else
            {
                string number2 = number.Substring(0, number.Length - 7);
                if (headerLen12 != null)
                {
                    return headerLen12.Exists(a => a.Contains(number2));
                }
                else
                {
                    return false;
                }
            }
        }
        /// <summary>												
        /// Kiểm tra có phải là số hay ko												
        /// </summary>												
        /// <param name="pValue">Value</param>												
        /// <param name="Reskey">The reskey.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidateIsNumber(string pValue, string Reskey)
        {
            foreach (Char c in pValue)
            {

                if (!Char.IsDigit(c))
                {
                    List<object> Params = new List<object>();
                    Params.Add(Reskey);
                    throw new BusinessException("Common_Validate_NotIsNumber", Params);
                }

            }

        }

        /// <summary>												
        /// Lấy ngày trong tuần												
        /// <author>dungnt</author>												
        /// <date>05/09/2012</date>												
        /// </summary>												
        /// <param name="dt"></param>												
        /// <param name="startOfWeek"></param>												
        /// <returns></returns>        												
        public static DateTime StartOfWeekGreaterNow(this DateTime dt)
        {
            if (dt.DayOfWeek == DayOfWeek.Monday)
            {
                return dt;
            }
            DayOfWeek day = dt.DayOfWeek;
            int days = day - DayOfWeek.Monday;
            return dt.AddDays(-days + 7);
        }
        /// </summary>												
        /// <param name="dt"></param>												
        /// <param name="startOfWeek"></param>												
        /// <returns></returns>												
        /// edit by namdv3												
        public static DateTime StartOfWeek(this DateTime dt)
        {
            DayOfWeek day = dt.DayOfWeek;
            int days = day - DayOfWeek.Monday;
            if (days < 0)
            {
                days = days + 7;
            }
            return dt.AddDays(-days);
        }
        /// <summary>												
        /// namdv3												
        /// </summary>												
        /// <param name="dt"></param>												
        /// <returns></returns>												
        public static DateTime EndOfWeek(this DateTime dt)
        {
            return dt.StartOfWeek().AddDays(6);
        }
        /// <summary>												
        /// namdv3												
        /// </summary>												
        /// <param name="dt"></param>												
        /// <returns></returns>												
        public static DateTime StartOfMonth(this DateTime dt)
        {
            return new DateTime(dt.Year, dt.Month, 1);
        }
        /// <summary>												
        /// namdv3												
        /// </summary>												
        /// <param name="dt"></param>												
        /// <returns></returns>												
        public static DateTime EndOfMonth(this DateTime dt)
        {
            return dt.StartOfMonth().AddMonths(1).AddDays(-1);
        }

        /// <summary>												
        /// So sánh 2 số decimal												
        /// </summary>												
        /// <param name="val1">val1</param>												
        /// <param name="val2">The val2.</param>												
        /// <param name="Reskey1">The reskey1.</param>												
        /// <param name="Reskey2">The reskey2.</param>												
        /// <author>												
        /// hath												
        /// </author>												
        /// <remarks>												
        /// 9/6/2012												
        /// </remarks>												
        public static void ValidateCompareNumberDecimal(decimal val1, decimal val2, string Reskey1, string Reskey2)
        {
            if (val1 <= val2)
            {
                return;
            }
            List<object> Params = new List<object>();
            Params.Add(Reskey1);
            Params.Add(Reskey2);

            throw new BusinessException("Common_Validate_CompareNumberDecimal", Params);

        }
        public static void ValidatePositiveInteger(decimal val, string Reskey)
        {
            if (val >= 0)
                return;
            else
            {
                List<object> Params = new List<object>();
                Params.Add(Reskey);

                throw new BusinessException("Common_Validate_ComparePositiveInteger", Params);
            }
        }

        public static void ValidateEqual(object val1, object val2, string reskey)
        {

        }

        public static double GetDouble(IDictionary<string, object> dic, string key, double def = 0)
        {
            if (!dic.ContainsKey(key))
            {
                return def;
            }

            return GetDouble(dic[key], def);
        }

        public static double GetDouble(object val, double def = 0)
        {
            if (val == null)
            {
                return def;
            }

            if (val is double)
            {
                return (double)val;
            }
            else
            {
                try
                {
                    return Double.Parse(val.ToString());
                }
                catch
                {
                    throw new Exception("SMAS.Business.Common.Utils: GetDouble error, object is not a Double value");
                }
            }
        }

        /// <summary>												
        /// ham kiem tra so dien thoai ban va dien thoai di dong												
        /// </summary>												
        /// <Author>dungnt</Author>												
        /// <DateTime>28/09/2012</DateTime>												
        /// <param name="val1">so dien thoai can ktra</param>												
        /// <edit>hieund-07/05/2013</edit>												
        /// <param name="reskey"></param>												
        public static void ValidatePhoneNumber(object value, string reskey)
        {
            if (value == null || value.ToString() == string.Empty) return;
            string number = value.ToString();
            //Gmobile (099, 0199)											
            //MobiFone (090, 093, 0120, 0121, 0122, 0126, 0128)											
            //Vietnamobile (092, 0186, 0188)											
            //Viettel (096, 097, 098, 0162, 0163, 0164, 0165, 0166, 0167, 0168, 0169)											
            //VinaPhone (091, 094, 0123, 0124, 0125, 0127, 0129)											

            /*Regex regexObj = new Regex("^(84|0)(9|12|16|99|199|188|)\\d{7,11}$");											
			if (!regexObj.IsMatch(value.ToString()))											
			{											
				List<object> Params = new List<object>();										
				Params.Add(reskey);										
				throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);										
			}*/
            //Chiendd1: 18/03/2016. Sua lai ham validate so dien thoai. 											
            List<string> headerNumbers = SplitStringToList(WebConfigurationManager.AppSettings["PreNumber"].ToString(), ',');
            List<string> headerLen9 = null;
            List<string> headerLen10 = null;
            List<string> headerLen11 = null;
            List<string> headerLen12 = null;
            if (WebConfigurationManager.AppSettings["PreNumberLen9"] != null)
            {
                var str9 = WebConfigurationManager.AppSettings["PreNumberLen9"].ToString();
                headerLen9 = new List<string>(str9.Split(new char[] { ',' }));
            }

            if (WebConfigurationManager.AppSettings["PreNumberLen10"] != null)
            {
                var str10 = WebConfigurationManager.AppSettings["PreNumberLen10"].ToString();
                headerLen10 = new List<string>(str10.Split(new char[] { ',' }));
            }

            if (WebConfigurationManager.AppSettings["PreNumberLen11"] != null)
            {
                var str11 = WebConfigurationManager.AppSettings["PreNumberLen11"].ToString();
                headerLen11 = new List<string>(str11.Split(new char[] { ',' }));
            }

            if (WebConfigurationManager.AppSettings["PreNumberLen12"] != null)
            {
                var str12 = WebConfigurationManager.AppSettings["PreNumberLen12"].ToString();
                headerLen12 = new List<string>(str12.Split(new char[] { ',' }));
            }

            List<object> Params = new List<object>();
            Params.Add(reskey);

            if ((number.Length < 9) || (number.Length > 12))
            {
                throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);
            }
            if ((headerNumbers == null) || (headerNumbers.Count == 0))
            {
                throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);
            }

            string number2 = number.Substring(0, number.Length - 7);

            if (headerLen9 != null && number.Length == 9 && !headerLen9.Exists(a => a.Contains(number2)))
            {
                throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);
            }

            if (headerLen10 != null && number.Length == 10 && !headerLen10.Exists(a => a.Contains(number2)))
            {
                throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);
            }
            if (headerLen11 != null && number.Length == 11 && !headerLen11.Exists(a => a.Contains(number2)))
            {
                throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);
            }
            if (headerLen12 != null && number.Length == 12 && !headerLen12.Exists(a => a.Contains(number2)))
            {
                throw new BusinessException("Common_Validate_NotIsPhoneNumber", Params);
            }
        }

        public static double? GetNullableDouble(IDictionary<string, object> dic, string key)
        {
            if (!dic.ContainsKey(key))
            {
                return null;
            }
            if (dic[key] == null)
            {
                return null;
            }

            return GetDouble(dic[key]);
        }

        public static string ConvertDateToString(DateTime? date)
        {
            return date.GetValueOrDefault().ToString("dd/MM/yyyy");
        }

        public static string GetSBD(int Order, int CodeLength)
        {
            int a = 0; string result = "";
            if (CodeLength == 0)
            {
                return Order.ToString();
            }
            if (Order.ToString().Length > CodeLength)
            {
                throw new BusinessException("Validate_CodeLength");
            }
            else
            {
                a = CodeLength - Order.ToString().Length;
            }
            for (int i = 0; i < a; i++)
            {
                result = result + "0";
            }
            result = result + Order.ToString();
            return result;
        }

        /// <summary>												
        /// Copy dữ liệu từ đối tượng này sang đối tượng khác												
        /// </summary>												
        /// <param name="source"></param>												
        /// <param name="dest"></param>												
        /// <param name="ExceptVirtual"></param>												
        public static void Clone(object source, object dest, bool ExceptVirtual = false)
        {
            Type f = source.GetType();
            PropertyInfo[] fproperties = f.GetProperties();

            Type m = dest.GetType();
            PropertyInfo[] mproperties = m.GetProperties();
            List<string> tmp = new List<string>();
            foreach (PropertyInfo p in mproperties)
            {
                tmp.Add(p.Name);
            }

            foreach (PropertyInfo p in fproperties)
            {
                if (ExceptVirtual)
                {
                    if (p.GetGetMethod().IsVirtual)
                    {
                        continue;
                    }
                }
                if (tmp.Contains(p.Name))
                {
                    m.GetProperty(p.Name).SetValue(dest, p.GetValue(source, null), null);
                }
            }
        }

        public static string FormatMark(decimal mark)
        {

            return string.Format("{0:0.#}", mark);
        }


        public static decimal RoundMark(decimal mark)
        {
            if (mark <= 0)
            {
                return mark;
            }
            return Math.Round(mark, 1, MidpointRounding.AwayFromZero);
        }


        public static int GradeToBinary(int grade)
        {
            return (int)Math.Pow(2, grade - 1);
        }

        public static List<string> GetListGradeFromEducationGrade(int EducationGrade)
        {
            List<string> ListGrade = new List<string>();
            if ((GradeToBinary(1) & EducationGrade) != 0)
            {
                ListGrade.Add("1");
            }

            if ((GradeToBinary(2) & EducationGrade) != 0)
            {
                ListGrade.Add("2");
            }

            if ((GradeToBinary(3) & EducationGrade) != 0)
            {
                ListGrade.Add("3");
            }
            return ListGrade;
        }
        public static List<string> GetListGrade(int EducationGrade)
        {
            List<string> ListGrade = new List<string>();
            if ((GradeToBinary(1) & EducationGrade) != 0)
            {
                ListGrade.Add("Cấp 1");
            }

            if ((GradeToBinary(2) & EducationGrade) != 0)
            {
                ListGrade.Add("Cấp 2");
            }

            if ((GradeToBinary(3) & EducationGrade) != 0)
            {
                ListGrade.Add("Cấp 3");
            }
            if ((GradeToBinary(4) & EducationGrade) != 0)
            {
                ListGrade.Add("Nhà trẻ");
            }
            if ((GradeToBinary(5) & EducationGrade) != 0)
            {
                ListGrade.Add("Mẫu giáo");
            }
            return ListGrade;
        }
        /// <summary>												
        /// ValidateDateInsideDateRange												
        /// </summary>												
        /// <param name="dateToCheck">The date to check.</param>												
        /// <param name="fromDate">From date.</param>												
        /// <param name="toDate">To date.</param>												
        /// <param name="dateToCheckResKey">The date to check res key.</param>												
        /// <author>												
        /// dungnt77												
        /// </author>												
        /// <remarks>												
        /// 20/12/2012   1:36 PM												
        /// </remarks>												
        public static void ValidateDateInsideDateRange(DateTime dateToCheck, DateTime fromDate, DateTime toDate, string dateToCheckResKey)
        {
            if (dateToCheck >= fromDate && dateToCheck <= toDate)
                return;

            List<object> Params = new List<object>();
            Params.Add(dateToCheckResKey);
            Params.Add(string.Format("{0:dd/MM/yyyy}", fromDate));
            Params.Add(string.Format("{0:dd/MM/yyyy}", toDate));
            throw new BusinessException("Common_Validate_NotInsideDateRange", Params);
        }

        /// <summary>												
        /// Validate Numberic And Letters												
        /// </summary>												
        /// <param name="stringToValidate"></param>												
        /// <param name="resourceOfStringValidate"></param>												
        /// <author>												
        /// vtit_dungnt77												
        /// </author>												
        public static void ValidateNumbericAndLetters(string stringToValidate, string resourceOfStringValidate)
        {
            // Create the regular expression											
            string pattern = @"^[a-zA-Z0-9]+$";
            Regex regex = new Regex(pattern);

            // Compare a string against the regular expression											
            bool isValidate = regex.IsMatch(stringToValidate);
            if (isValidate)
            {
                return;
            }
            else
            {
                throw new BusinessException("Common_Validate_NumbericAndLetter", new List<object>() { resourceOfStringValidate });
            }
        }
        /// <summary>												
        /// replace unicode												
        /// </summary>												
        /// <param name="strContent"></param>												
        /// <returns>hoantv5</returns>												
        public static string replaceUnicode(this string strContent)
        {
            //'Dấu Ngang											
            strContent = strContent.Replace("ă", "a");
            strContent = strContent.Replace("â", "a");
            strContent = strContent.Replace("e", "e");
            strContent = strContent.Replace("ê", "e");
            strContent = strContent.Replace("i", "i");
            strContent = strContent.Replace("o", "o");
            strContent = strContent.Replace("ô", "o");
            strContent = strContent.Replace("ơ", "o");
            strContent = strContent.Replace("u", "u");
            strContent = strContent.Replace("ư", "u");
            strContent = strContent.Replace("y", "y");

            //    'Dấu Huyền											
            strContent = strContent.Replace("à", "a");
            strContent = strContent.Replace("ằ", "a");
            strContent = strContent.Replace("ầ", "a");
            strContent = strContent.Replace("è", "e");
            strContent = strContent.Replace("ề", "e");
            strContent = strContent.Replace("ì", "i");
            strContent = strContent.Replace("ò", "o");
            strContent = strContent.Replace("ồ", "o");
            strContent = strContent.Replace("ờ", "o");
            strContent = strContent.Replace("ù", "u");
            strContent = strContent.Replace("ừ", "u");
            strContent = strContent.Replace("ỳ", "y");

            //'Dấu Sắc											
            strContent = strContent.Replace("á", "a");
            strContent = strContent.Replace("ắ", "a");
            strContent = strContent.Replace("ấ", "a");
            strContent = strContent.Replace("é", "e");
            strContent = strContent.Replace("ế", "e");
            strContent = strContent.Replace("í", "i");
            strContent = strContent.Replace("ó", "o");
            strContent = strContent.Replace("ố", "o");
            strContent = strContent.Replace("ớ", "o");
            strContent = strContent.Replace("ú", "u");
            strContent = strContent.Replace("ứ", "u");
            strContent = strContent.Replace("ý", "y");

            //'Dấu Hỏi											
            strContent = strContent.Replace("ả", "a");
            strContent = strContent.Replace("ẳ", "a");
            strContent = strContent.Replace("ẩ", "a");
            strContent = strContent.Replace("ẻ", "e");
            strContent = strContent.Replace("ể", "e");
            strContent = strContent.Replace("ỉ", "i");
            strContent = strContent.Replace("ỏ", "o");
            strContent = strContent.Replace("ổ", "o");
            strContent = strContent.Replace("ở", "o");
            strContent = strContent.Replace("ủ", "u");
            strContent = strContent.Replace("ử", "u");
            strContent = strContent.Replace("ỷ", "y");

            //'Dấu Ngã   											
            strContent = strContent.Replace("ã", "a");
            strContent = strContent.Replace("ẵ", "a");
            strContent = strContent.Replace("ẫ", "a");
            strContent = strContent.Replace("ẽ", "e");
            strContent = strContent.Replace("ễ", "e");
            strContent = strContent.Replace("ĩ", "i");
            strContent = strContent.Replace("õ", "o");
            strContent = strContent.Replace("ỗ", "o");
            strContent = strContent.Replace("ỡ", "o");
            strContent = strContent.Replace("ũ", "u");
            strContent = strContent.Replace("ữ", "u");
            strContent = strContent.Replace("ỹ", "y");

            //'Dẫu Nặng											
            strContent = strContent.Replace("ạ", "a");
            strContent = strContent.Replace("ặ", "a");
            strContent = strContent.Replace("ậ", "a");
            strContent = strContent.Replace("ẹ", "e");
            strContent = strContent.Replace("ệ", "e");
            strContent = strContent.Replace("ị", "i");
            strContent = strContent.Replace("ọ", "o");
            strContent = strContent.Replace("ộ", "o");
            strContent = strContent.Replace("ợ", "o");
            strContent = strContent.Replace("ụ", "u");
            strContent = strContent.Replace("ự", "u");
            strContent = strContent.Replace("ỵ", "y");
            strContent = strContent.Replace("đ", "d");
            return strContent;
        }

        public static string StripVNSignAndSpace(string text, bool isOnlyAlphabetCharacterAndNumber = false)
        {
            var pattern = new Regex("[:!@#$%^&*()}{|\":?><\\[\\]\\;'/.,~]");
            text = pattern.Replace(text, "_");

            text = StripVNSign(text);
            text = text.Replace(" ", "");
            text = text.Replace("@", "");
            text = text.Replace("'", "");
            text = text.Replace("/*", "");
            text = text.Replace("\"", "");
            text = text.Replace("//", "");
            text = StandartClassName(text);

            if (!string.IsNullOrEmpty(text) && isOnlyAlphabetCharacterAndNumber)
            {
                string alpha = "QWERTYUIOPASDFGHJKLZXCVBNM0123456789";
                string output = string.Empty;
                for (int i = 0; i < text.Length; i++)
                {
                    if (alpha.IndexOf(text[i].ToString().ToUpper()) > 0)
                    {
                        output += text[i].ToString();
                    }
                }
                return !string.IsNullOrEmpty(output) ? output : "___";
            }

            return text;
        }

        public static string StripVNSign(string text)
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
        public static string RemoveUnprintableChar(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return string.Empty;
            }

            for (int i = text.Length - 1; i >= 0; i--)
            {
                string s = Utils.StripVNSign(text[i].ToString());
                if (!string.IsNullOrWhiteSpace(s) && (s[0] < 32 || s[0] > 126))
                {
                    text = text.Remove(i, 1);
                }
            }

            return text;
        }

        //HoanTV5												
        /// <summary>												
        /// chuyển những ký tự đặc biệt thành dấu "_" khi đẩy vào sheetName												
        /// </summary>												
        /// <param name="text"></param>												
        /// <returns></returns>												
        private static string StandartClassName(string str)
        {
            if (str.Contains("/"))
            {
                str = str.Replace("/", "_");
            }
            if (str.Contains("["))
            {
                str = str.Replace("[", "_");
            }
            if (str.Contains("]"))
            {
                str = str.Replace("]", "_");
            }
            if (str.Contains(":"))
            {
                str = str.Replace(":", "_");
            }
            if (str.Contains("*"))
            {
                str = str.Replace("*", "_");
            }

            return str;
        }
        public static char[] startingChars = new char[] { '<', '&' };
        /// <summary>												
        /// IsDangerousString												
        /// </summary>												
        /// <param name="s"></param>												
        /// <returns></returns>												
        /// <author>												
        /// vtit_dungnt77												
        /// </author>												
        public static void ValidateDangerousString(string s)
        {
            if (s == null) s = "";
            int startIndex = 0;
            while (true)
            {
                int num2 = s.IndexOfAny(startingChars, startIndex);
                if (num2 < 0)
                {
                    return;
                }
                if (num2 == (s.Length - 1))
                {
                    return;
                }
                char ch = s[num2];
                if (ch != '&')
                {
                    if ((ch == '<') && ((IsAtoZ(s[num2 + 1]) || (s[num2 + 1] == '!')) || ((s[num2 + 1] == '/') || (s[num2 + 1] == '?'))))
                    {
                        throw new BusinessException("Common_Validate_XSS");
                    }
                }
                else if (s[num2 + 1] == '#')
                {
                    throw new BusinessException("Common_Validate_XSS");
                }
                startIndex = num2 + 1;
            }
        }

        #region date time comparation												
        /// <summary>												
        /// hàm so sánh 1 khoảng thời gian A có dính líu đến khoảng thời gian B hay không												
        /// </summary>												
        /// <param name="sourceStart">Bắt đầu thời gian A</param>												
        /// <param name="sourceEnd">Kết thúc thời gian A</param>												
        /// <param name="destinationStart">Bắt đầu thời gian B</param>												
        /// <param name="destinationEnd">Kết thúc thời gian B</param>												
        /// <returns>true nếu dính líu và false nếu không</returns>												
        public static bool CompareDateTimeRange(DateTime sourceStart, DateTime? sourceEnd, DateTime destinationStart, DateTime destinationEnd)
        {
            //Có các trường hợp dính líu sau:											
            //            |--- Date 1 ---|											
            //                 | --- Date 2 --- |											


            //                | --- Date 1 --- |											
            //         | --- Date 2 ---- |											


            //         | -------- Date 1 -------- |											
            //               | --- Date 2 --- |											

            //               | --- Date 1 --- |											
            //         | -------- Date 2 -------- |											


            //if (sourceStart == sourceEnd || destinationStart == destinationEnd)											
            // return false; // No actual date range											

            if (sourceStart == destinationStart || (sourceEnd != null && sourceEnd == destinationEnd))
                return true; // If any set is the same time, then by default there must be some overlap. 										

            if (sourceStart < destinationStart)
            {
                if (sourceEnd >= destinationStart && sourceEnd <= destinationEnd && sourceEnd != null)
                    return true; // Condition 1									

                if (sourceEnd >= destinationEnd && sourceEnd != null)
                    return true; // Condition 3									
            }
            else
            {
                if (destinationEnd >= sourceStart && destinationEnd <= sourceEnd && sourceEnd != null)
                    return true; // Condition 2									

                if (destinationEnd >= sourceEnd && sourceEnd != null)
                    return true; // Condition 4									
            }
            if (sourceEnd == null && destinationEnd != null)
            {
                if (sourceStart >= destinationStart && sourceStart <= destinationEnd)
                    return true;
            }
            return false;

        }
        #endregion

        /// <summary>												
        /// IsAtoZ												
        /// </summary>												
        /// <param name="c"></param>												
        /// <returns></returns>												
        /// <author>												
        /// vtit_dungnt77												
        /// </author>												
        public static bool IsAtoZ(char c)
        {
            return (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')));
        }
        /// <summary>												
        /// get object from dictionnary												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>01/04/2013</date>												
        /// <typeparam name="T"></typeparam>												
        /// <param name="dic"></param>												
        /// <param name="key"></param>												
        /// <returns></returns>												
        public static T GetObject<T>(IDictionary<string, object> dic, string key) where T : new()
        {
            if (!dic.ContainsKey(key))
            {
                return new T();
            }
            return (T)Convert.ChangeType(dic[key], typeof(T));
        }

        /// <summary>												
        /// Split String to list by char												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>01/04/2013</date>												
        /// <param name="inputText">input string</param>												
        /// <param name="cSlpit">char to split</param>												
        /// <returns></returns>												
        public static List<string> SplitStringToList(string inputText, char cSlpit)
        {
            if (string.IsNullOrEmpty(inputText))
            {
                return null;
            }
            return new List<string>(inputText.Split(new char[] { cSlpit }));
        }



        /// <summary>												
        /// check isCentive content SMS												
        /// </summary>												
        /// <auth>HaiVT</auth>												
        /// <date>01/04/2013</date>												
        /// <param name="content"></param>												
        /// <param name="lstSensitive"></param>												
        /// <returns></returns>												
        public static bool CheckContentSMS(string content)
        {
            List<string> lstSensitive = SplitStringToList(WebConfigurationManager.AppSettings["SensitiveKeywords"].ToString(), ',');
            if (string.IsNullOrEmpty(content) || (lstSensitive == null))
            {
                return false;
            }
            return lstSensitive.Any(t => content.Contains(t));
        }


        /// <summary>												
        /// QuangLM												
        /// Lay ten cua thuoc tinh trong 1 class												
        /// </summary>												
        /// <typeparam name="T"></typeparam>												
        /// <param name="propertyExpression"></param>												
        /// <returns></returns>												
        public static string GetPropertyName<T>(Expression<Func<T>> propertyExpression)
        {
            return (propertyExpression.Body as MemberExpression).Member.Name;
        }

        /// <summary>												
        /// PhuongH1												
        /// object -> List<int>												
        public static List<int?> ConvertToListInt(this object Value)
        {
            List<int?> listResult = new List<int?>();
            if (Value is List<int?>)
            {
                listResult = (List<int?>)Value;
            }
            else if (!(Value is string) && Value is IEnumerable)
            {
                IEnumerable enumerable = (IEnumerable)Value;
                IEnumerator enumerator = enumerable.GetEnumerator();
                while (enumerator.MoveNext())
                {
                    if (enumerator.Current != null)
                    {
                        listResult.Add(Int32.Parse(enumerator.Current.ToString()));
                    }
                }
            }
            else
            {
                string[] arr = Value.ToString().Split(',');
                listResult = arr.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => (int?)Int32.Parse(x)).ToList();
            }
            return listResult;
        }

        /// <summary>												
        /// bind value object to object with property mapping												
        /// </summary>												
        /// <author>HaiVT</author>												
        /// <date>19/07/2013</date>               												
        /// <returns></returns>												
        public static T BindTo<T>(this object source) where T : new()
        {
            T objectDes = new T();
            Type typeSource = source.GetType();
            IList<PropertyInfo> sourcePropertyInfo = new List<PropertyInfo>(typeSource.GetProperties());

            typeSource = objectDes.GetType();
            IList<PropertyInfo> desProperties = new List<PropertyInfo>(typeSource.GetProperties());
            List<string> desName = new List<string>();

            for (int i = desProperties.Count - 1; i >= 0; i--)
            {
                desName.Add(desProperties[i].Name);
            }

            PropertyInfo objPropertyInFo = null;
            for (int i = sourcePropertyInfo.Count - 1; i >= 0; i--)
            {
                objPropertyInFo = sourcePropertyInfo[i];
                if (objPropertyInFo.GetValue(source, null) == null)
                {
                    continue;
                }

                if (desName.Contains(objPropertyInFo.Name))
                {
                    typeSource.GetProperty(objPropertyInFo.Name).SetValue(objectDes, objPropertyInFo.GetValue(source, null), null);
                }

            }
            return objectDes;
        }

        /// <summary>												
        /// bind list object to object with property mapping												
        /// </summary>												
        /// <author>HaiVT</author>												
        /// <date>2014/03/04</date>               												
        /// <returns></returns>												
        public static List<T> BindToList<T>(this IEnumerable<object> sources) where T : new()
        {
            List<T> results = new List<T>();
            T item = new T();
            foreach (var obj in sources)
            {
                item = obj.BindTo<T>();
                results.Add(item);
            }

            return results;
        }



        /// <summary>												
        /// chiendd: 13/08/2014												
        /// Method dung de sap xep tieng viet co dau. Cac ky tu tieng viet duoc chuyen sang 1 ky tu theo  1 thu tu												
        ///Thu tu dau tieg viet: Khong dau, huyen, sac, hoi, nga, nang												
        /// </summary>												
        /// <param name="text"></param>												
        /// <returns></returns>												
        public static string ConvertVN(string text)
        {
            if (String.IsNullOrEmpty(text))
            {
                return "";
            }
            //Quy tắc đặt ký tự Ký tự thay thế+dau: ví dụ:à => a01											
            //text = text.ToLower();											
            //Tu khong dau											

            text = text.Replace("a", "a00");
            text = text.Replace("A", "a00");
            text = text.Replace("ă", "a10");
            text = text.Replace("Ă", "a10");
            text = text.Replace("â", "a20");
            text = text.Replace("Â", "a20");
            text = text.Replace("e", "e00");
            text = text.Replace("E", "e00");
            text = text.Replace("ê", "e10");
            text = text.Replace("Ê", "e10");
            text = text.Replace("i", "i00");
            text = text.Replace("I", "i00");
            text = text.Replace("o", "o00");
            text = text.Replace("O", "o00");
            text = text.Replace("ô", "o10");
            text = text.Replace("Ô", "o10");
            text = text.Replace("ơ", "o20");
            text = text.Replace("Ơ", "o20");
            text = text.Replace("u", "u00");
            text = text.Replace("U", "u00");
            text = text.Replace("ư", "u10");
            text = text.Replace("Ư", "u10");
            text = text.Replace("y", "y00");
            text = text.Replace("Y", "y00");


            //    'Dấu Huyền											
            text = text.Replace("à", "a01");
            text = text.Replace("À", "a01");
            text = text.Replace("ằ", "a11");
            text = text.Replace("Ằ", "a11");
            text = text.Replace("ầ", "a21");
            text = text.Replace("Ầ", "a21");
            text = text.Replace("è", "e01");
            text = text.Replace("È", "e01");
            text = text.Replace("ề", "e11");
            text = text.Replace("Ề", "e11");
            text = text.Replace("ì", "i01");
            text = text.Replace("Ì", "i01");
            text = text.Replace("ò", "o01");
            text = text.Replace("Ò", "o01");
            text = text.Replace("ồ", "o11");
            text = text.Replace("Ồ", "o11");
            text = text.Replace("ờ", "o21");
            text = text.Replace("Ờ", "o21");
            text = text.Replace("ù", "u01");
            text = text.Replace("Ù", "u01");
            text = text.Replace("ừ", "u11");
            text = text.Replace("Ừ", "u11");
            text = text.Replace("ỳ", "y01");
            text = text.Replace("Ỳ", "y01");


            //'Dấu Sắc            											
            text = text.Replace("á", "a02");
            text = text.Replace("Á", "a02");
            text = text.Replace("ắ", "a12");
            text = text.Replace("Ắ", "a12");
            text = text.Replace("ấ", "a22");
            text = text.Replace("Ấ", "a22");
            text = text.Replace("é", "e02");
            text = text.Replace("É", "e02");
            text = text.Replace("ế", "e12");
            text = text.Replace("Ế", "e12");
            text = text.Replace("í", "i02");
            text = text.Replace("Í", "i02");
            text = text.Replace("ó", "o02");
            text = text.Replace("Ó", "o02");
            text = text.Replace("ố", "o12");
            text = text.Replace("Ố", "o12");
            text = text.Replace("ớ", "o22");
            text = text.Replace("Ớ", "o22");
            text = text.Replace("ú", "u02");
            text = text.Replace("Ú", "u02");
            text = text.Replace("ứ", "u12");
            text = text.Replace("Ứ", "u12");
            text = text.Replace("ý", "y02");
            text = text.Replace("Ý", "y02");


            //'Dấu Hỏi											
            text = text.Replace("ả", "a03");
            text = text.Replace("Ả", "a03");
            text = text.Replace("ẳ", "a13");
            text = text.Replace("Ẳ", "a13");
            text = text.Replace("ẩ", "a23");
            text = text.Replace("Ẩ", "a23");
            text = text.Replace("ẻ", "e03");
            text = text.Replace("Ẻ", "e03");
            text = text.Replace("ể", "e13");
            text = text.Replace("Ể", "e13");
            text = text.Replace("ỉ", "i03");
            text = text.Replace("Ỉ", "i03");
            text = text.Replace("ỏ", "o03");
            text = text.Replace("Ỏ", "o03");
            text = text.Replace("ổ", "o13");
            text = text.Replace("Ổ", "o13");
            text = text.Replace("ở", "o23");
            text = text.Replace("Ở", "o23");
            text = text.Replace("ủ", "u03");
            text = text.Replace("Ủ", "u03");
            text = text.Replace("ử", "u13");
            text = text.Replace("Ử", "u13");
            text = text.Replace("ỷ", "y03");
            text = text.Replace("Ỷ", "y03");


            //'Dấu Ngã   											
            text = text.Replace("ã", "a04");
            text = text.Replace("Ã", "a04");
            text = text.Replace("ẵ", "a14");
            text = text.Replace("Ẵ", "a14");
            text = text.Replace("ẫ", "a24");
            text = text.Replace("Ẫ", "a24");
            text = text.Replace("ẽ", "e04");
            text = text.Replace("Ẽ", "e04");
            text = text.Replace("ễ", "e14");
            text = text.Replace("Ễ", "e14");
            text = text.Replace("ĩ", "i04");
            text = text.Replace("Ĩ", "i04");
            text = text.Replace("õ", "o04");
            text = text.Replace("Õ", "o04");
            text = text.Replace("ỗ", "o14");
            text = text.Replace("Ỗ", "o14");
            text = text.Replace("ỡ", "o24");
            text = text.Replace("Ỡ", "o24");
            text = text.Replace("ũ", "u04");
            text = text.Replace("Ũ", "u04");
            text = text.Replace("ữ", "u14");
            text = text.Replace("Ữ", "u14");
            text = text.Replace("ỹ", "y04");
            text = text.Replace("Ỹ", "y04");

            //'Dẫu Nặng											
            text = text.Replace("ạ", "a05");
            text = text.Replace("Ạ", "a05");
            text = text.Replace("ặ", "a15");
            text = text.Replace("Ặ", "a15");
            text = text.Replace("ậ", "a25");
            text = text.Replace("Ậ", "a25");
            text = text.Replace("ẹ", "e05");
            text = text.Replace("Ẹ", "e05");
            text = text.Replace("ệ", "e15");
            text = text.Replace("Ệ", "e15");
            text = text.Replace("ị", "i05");
            text = text.Replace("Ị", "i05");
            text = text.Replace("ọ", "o05");
            text = text.Replace("Ọ", "o05");
            text = text.Replace("ộ", "o15");
            text = text.Replace("Ộ", "o15");
            text = text.Replace("ợ", "o25");
            text = text.Replace("Ợ", "o25");
            text = text.Replace("ụ", "u05");
            text = text.Replace("Ụ", "u05");
            text = text.Replace("ự", "u15");
            text = text.Replace("Ự", "u15");
            text = text.Replace("ỵ", "y05");
            text = text.Replace("Ỵ", "y05");
            text = text.Replace("đ", "dzz");
            text = text.Replace("Đ", "dzz");

            return text;
        }
        /// <summary>												
        /// Chiendd: Sap xep tieng viet Unicode												
        /// </summary>												
        /// <param name="text"></param>												
        /// <returns></returns>												
        public static string SortABC(string text)
        {
            if (String.IsNullOrEmpty(text))
            {
                return "";
            }
            text = text.Replace("0", "01");
            text = text.Replace("1", "02");
            text = text.Replace("2", "03");
            text = text.Replace("3", "04");
            text = text.Replace("4", "05");
            text = text.Replace("5", "06");
            text = text.Replace("6", "07");
            text = text.Replace("7", "08");
            text = text.Replace("8", "09");
            text = text.Replace("9", "10");

            text = ConvertVN(text.ToLower());
            text = text.Replace("a", "11");
            text = text.Replace("b", "12");
            text = text.Replace("c", "13");
            text = text.Replace("d", "14");
            text = text.Replace("e", "15");
            text = text.Replace("f", "16");
            text = text.Replace("g", "17");
            text = text.Replace("h", "18");
            text = text.Replace("i", "19");
            text = text.Replace("j", "20");
            text = text.Replace("k", "21");
            text = text.Replace("l", "22");
            text = text.Replace("m", "23");
            text = text.Replace("n", "24");
            text = text.Replace("o", "25");
            text = text.Replace("p", "26");
            text = text.Replace("q", "27");
            text = text.Replace("r", "28");
            text = text.Replace("s", "29");
            text = text.Replace("t", "30");
            text = text.Replace("u", "31");
            text = text.Replace("v", "32");
            text = text.Replace("w", "33");
            text = text.Replace("x", "34");
            text = text.Replace("y", "35");
            text = text.Replace("z", "36");

            return text;
        }

        public static string ToShortContent(this string content, int numToShort)
        {
            if (string.IsNullOrEmpty(content))
            {
                return string.Empty;
            }

            if (content.Length <= numToShort)
            {
                return content;
            }

            string[] tmp = content.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string shortContent = string.Empty;

            if (tmp.Length == 1)
            {
                if (tmp[0].Length > numToShort)
                {
                    shortContent = tmp[0].Substring(0, numToShort) + "...";
                }
                else
                {
                    shortContent = tmp[0];
                }
            }
            else
            {
                StringBuilder strBuilder = new StringBuilder();
                for (int i = 0, size = tmp.Length; i < size; i++)
                {
                    if (strBuilder.Length > numToShort)
                    {
                        shortContent = strBuilder.ToString().Substring(0, numToShort) + "...";
                        break;
                    }
                    if (i == size - 1)
                    {
                        shortContent = strBuilder.ToString();
                        break;
                    }

                    strBuilder.Append(tmp[i]).Append(" ");
                }
            }
            return shortContent;
        }

        /// <summary>												
        /// Lấy tên của một người từ tên đầy đủ tùy theo dân tộc												
        /// </summary>												
        /// <param name="fullname">Tên đầy đủ</param>												
        /// <param name="ethnicCode">Mã dân tộc. Mặc định là dân tộc Kinh</param>												
        /// <returns>Tên</returns>												
        public static string getFirstName(this string fullname, string ethnicCode = "01")
        {
            string firstName;
            if (string.IsNullOrEmpty(fullname))
            {
                firstName = string.Empty;
            }
            else
            {
                if (ethnicCode == "20" || ethnicCode == "12") // Dan toc E-de va Mnong										
                {
                    // Thuc hien hieu chinh ten cho dung									
                    if (fullname[0] == 'H' || fullname[0] == 'h' || fullname[0] == 'Y' || fullname[0] == 'y') // Them khoang cach phia sau chu 'H', 'Y'									
                    {
                        fullname = fullname.Insert(1, " ");
                    }
                    else
                    {
                        fullname = "Y " + fullname;
                    }
                    char[] seperator = new char[] { ' ', '\'', '’', '"' };
                    string[] words = fullname.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 1) firstName = string.Empty;
                    else if (words.Length == 1) firstName = words[0];
                    else if (words.Length == 2) firstName = words[1]; // Lay tu thu 2 lam ten									
                    else firstName = string.Concat<string>(words.Skip(1).Take(words.Length - 2)); // Lay cac tu thu tu thu 2 den tu truoc tu cuoi cung lam ten									
                }
                else
                {
                    char[] seperator = new char[] { ' ' };
                    string[] words = fullname.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 1) firstName = string.Empty;
                    else firstName = words[words.Length - 1]; // Lay tu cuoi cung lam ten									
                }
            }
            return firstName;
        }

        /// <summary>												
        /// Lấy họ của một người từ tên đầy đủ tùy theo dân tộc												
        /// </summary>												
        /// <param name="fullname">Tên đầy đủ</param>												
        /// <param name="ethnicCode">Mã dân tộc. Mặc định là dân tộc Kinh</param>												
        /// <returns>Họ</returns>												
        public static string getLastName(this string fullname, string ethnicCode = "01")
        {
            string lastName;
            if (string.IsNullOrEmpty(fullname))
            {
                lastName = string.Empty;
            }
            else
            {
                if (ethnicCode == "20" || ethnicCode == "12") // Dan toc E-de va Mnong										
                {
                    // Thuc hien hieu chinh ten cho dung									
                    if (fullname[0] == 'H' || fullname[0] == 'h' || fullname[0] == 'Y' || fullname[0] == 'y') // Them khoang cach phia sau chu 'H', 'Y'									
                    {
                        fullname = fullname.Insert(1, " ");
                    }
                    else
                    {
                        fullname = "Y " + fullname;
                    }
                    char[] seperator = new char[] { ' ', '\'', '’', '"' };
                    string[] words = fullname.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 3) lastName = string.Empty;
                    else lastName = words[words.Length - 1]; // Lay tu cuoi cung lam ho									
                }
                else
                {
                    char[] seperator = new char[] { ' ' };
                    string[] words = fullname.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 2) lastName = string.Empty; // Neu chi co 1 tu thi tu do uu tien lam Ten nen Ho la rong									
                    else return words[0]; // Lay tu dau tien lam ho									
                }
            }
            return lastName;
        }

        /// <summary>														
        /// Lấy ho va ten giua của một người từ tên đầy đủ tùy theo dân tộc														
        /// </summary>														
        /// <param name="fullname">Tên đầy đủ</param>														
        /// <param name="ethnicCode">Mã dân tộc. Mặc định là dân tộc Kinh</param>														
        /// <returns>Tên</returns>														
        public static string getLastAndMidName(this string fullname, string ethnicCode = "01")
        {
            string firstName = fullname.getFirstName(ethnicCode);
            string result = fullname.Replace(firstName, string.Empty).Trim();
            if (string.IsNullOrEmpty(result))
            {
                result = fullname;
            }
            return fullname.Replace(firstName, string.Empty).Trim();
        }

        public static string GetLastNameHCM(this string fullname, string Name)
        {
            int length = fullname.Length;
            string result = fullname.Substring(0, length - Name.Length);
            return result;
        }

        /// <summary>												
        /// Lấy tên đệm của một người từ tên đầy đủ tùy theo dân tộc												
        /// </summary>												
        /// <param name="fullname">Tên đầy đủ</param>												
        /// <param name="ethnicCode">Mã dân tộc. Mặc định là dân tộc Kinh</param>												
        /// <returns>Tên đệm</returns>												
        public static string getMidName(this string fullname, string ethnicCode = "01")
        {
            string midName;
            if (string.IsNullOrEmpty(fullname))
            {
                midName = string.Empty;
            }
            else
            {
                if (ethnicCode == "20" || ethnicCode == "12") // Dan toc E-de va Mnong										
                {
                    // Thuc hien hieu chinh ten cho dung									
                    if (fullname[0] == 'H' || fullname[0] == 'h' || fullname[0] == 'Y' || fullname[0] == 'y') // Them khoang cach phia sau chu 'H', 'Y'									
                    {
                        fullname = fullname.Insert(1, " ");
                    }
                    else
                    {
                        fullname = "Y " + fullname;
                    }
                    char[] seperator = new char[] { ' ', '\'', '’', '"' };
                    string[] words = fullname.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 2) midName = string.Empty;
                    else midName = words[0]; // Lay tu dau tien lam ten dem									
                }
                else
                {
                    char[] seperator = new char[] { ' ' };
                    string[] words = fullname.Split(seperator, StringSplitOptions.RemoveEmptyEntries);
                    if (words.Length < 3) midName = string.Empty;
                    else midName = string.Concat<string>(words.Skip(1).Take(words.Count() - 2)); // Lay tu thu hai den tu truoc tu cuoi cung lam ten dem									
                }
            }
            return midName;
        }

        /// <summary>												
        /// Đảo tên để sắp xếp												
        /// </summary>												
        /// <param name="fullname">Tên đầy đủ</param>												
        /// <param name="ethnicCode">Mã dân tộc. Mặc định là dân tộc Kinh</param>												
        /// <returns>Tên đã được đảo lại để săp xếp</returns>												
        public static string getOrderingName(this string fullname, string ethnicCode = "01")
        {
            if (ethnicCode == "20" || ethnicCode == "12") // Dan toc E-de va Mnong											
            {
                return getFirstName(fullname, ethnicCode) + " " + getLastName(fullname, ethnicCode) + " " + getMidName(fullname, ethnicCode);
            }
            else
            {
                return getFirstName(fullname, ethnicCode) + " " + getLastName(fullname, ethnicCode) + " " + getMidName(fullname, ethnicCode);
            }
        }
        /// <summary>												
        /// lay partitionMonth theo ngay phuc vu cho chuc nang lich su su dung												
        /// </summary>												
        /// <param name="DateTime"></param>												
        /// <returns></returns>												
        public static int GetPartitionMonth(DateTime DateTime)
        {
            int values = 0;
            string partitionMonth = string.Empty;

            partitionMonth = (DateTime.Date.Year.ToString() + (DateTime.Date.Month < 10 ? "0" + DateTime.Date.Month.ToString() : DateTime.Date.Month.ToString()));
            values = Int32.Parse(partitionMonth);
            return values;
        }

        /// <summary>												
        /// So sanh ngay, neu ngay truyen vao lon  hon retun true												
        /// </summary>												
        /// <param name="val"></param>												
        /// <returns></returns>												
        public static bool CompareDateWithDateNow(DateTime? val)
        {
            if (val == null)
                return false;
            if (val.Value.Date <= DateTime.Now.Date)
                return false;
            return true;
        }

        /// <summary>												
        /// So sanh nam, neu namg cua ngay  lon hon returun true												
        /// </summary>												
        /// <param name="val"></param>												
        /// <param name="ResKey"></param>												
        /// <returns></returns>												
        public static bool CompareYearWithYearNow(DateTime? val)
        {
            if (val == null)
                return false;
            if (val.Value.Year <= DateTime.Now.Year)
                return false;
            return true;
        }

        /// <summary>												
        /// So sanh ngay, neu ngay thu 1 lon hon ngay thu 2 return true												
        /// </summary>												
        /// <param name="dateToCheck"></param>												
        /// <param name="beforeDate"></param>												
        /// <returns></returns>												
        public static bool CompareTwoDate(DateTime? dateToCheck, DateTime? beforeDate)
        {
            if (!dateToCheck.HasValue || !beforeDate.HasValue)
            {
                return true;
            }
            if (dateToCheck > beforeDate)
            {
                return true;
            }
            return false;
        }

        /// <summary>												
        /// Validate Email, return true neu email hop le (rong tinh la hop le)												
        /// </summary>												
        /// <param name="email"></param>												
        /// <returns></returns>												
        public static bool ValidateEmail(string email)
        {

            if (string.IsNullOrEmpty(email))
            {
                return true;
            }
            Regex re = new Regex(@"^[a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$");
            if (re.IsMatch(email))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        // Define supported password characters divided into groups.												
        // You can add (or remove) characters to (from) these groups.												
        private static string PASSWORD_CHARS_LCASE = "abcdefghijklmnopqrstuvwxyz";
        private static string PASSWORD_CHARS_UCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static string PASSWORD_CHARS_NUMERIC = "0123456789";
        private static string PASSWORD_CHARS_SPECIAL = "[!+-@$?%!=_^&*(){})]";
        public static bool CheckPasswordInValid(string password)
        {
            bool isValid = false;
            string strBlackListPassword = System.Configuration.ConfigurationManager.AppSettings["BlackListPassword"];
            List<string> blackListPass = strBlackListPassword.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();

            //check 											
            int numericCount = Regex.Matches(password, @"\d").Count;
            int upperCount = Regex.Matches(password, @"[A-Z]").Count;
            int lowerCount = Regex.Matches(password, @"[a-z]").Count;
            char[] SpecialChars = "[!+-@$?%!=_^&*(){})]".ToCharArray();
            int specialCount = password.IndexOfAny(SpecialChars);

            //Match match = Regex.Match(password, @"^.*(?=.{8,})(?=.*[a-z]){2}(?=.*[A-Z]){2}.*$");											
            //match.Success											
            if (numericCount > 0 && upperCount > 0 && lowerCount > 0 && specialCount > -1 && !blackListPass.Exists(p => p == password))
            {
                isValid = true;
            }
            return isValid;
        }

        public static string GenPassRandom(int PasswordLength)
        {

            int minLength = PasswordLength;
            int maxLength = PasswordLength;

            // Make sure that input parameters are valid.											
            if (minLength <= 0 || maxLength <= 0 || minLength > maxLength)
                return null;

            // Create a local array containing supported password characters											
            // grouped by types. You can remove character groups from this											
            // array, but doing so will weaken the password strength.											
            char[][] charGroups = new char[][]
        {
            PASSWORD_CHARS_LCASE.ToCharArray(),
            PASSWORD_CHARS_UCASE.ToCharArray(),
            PASSWORD_CHARS_NUMERIC.ToCharArray(),
            PASSWORD_CHARS_SPECIAL.ToCharArray()
        };

            // Use this array to track the number of unused characters in each											
            // character group.											
            int[] charsLeftInGroup = new int[charGroups.Length];

            // Initially, all characters in each group are not used.											
            for (int i = 0; i < charsLeftInGroup.Length; i++)
                charsLeftInGroup[i] = charGroups[i].Length;

            // Use this array to track (iterate through) unused character groups.											
            int[] leftGroupsOrder = new int[charGroups.Length];

            // Initially, all character groups are not used.											
            for (int i = 0; i < leftGroupsOrder.Length; i++)
                leftGroupsOrder[i] = i;

            // Because we cannot use the default randomizer, which is based on the											
            // current time (it will produce the same "random" number within a											
            // second), we will use a random number generator to seed the											
            // randomizer.											

            // Use a 4-byte array to fill it with random bytes and convert it then											
            // to an integer value.											
            byte[] randomBytes = new byte[4];

            // Generate 4 random bytes.											
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            rng.GetBytes(randomBytes);

            // Convert 4 bytes into a 32-bit integer value.											
            int seed = (randomBytes[0] & 0x7f) << 24 |
                        randomBytes[1] << 16 |
                        randomBytes[2] << 8 |
                        randomBytes[3];

            // Now, this is real randomization.											
            Random random = new Random(seed);

            // This array will hold password characters.											
            char[] password = null;

            // Allocate appropriate memory for the password.											
            if (minLength < maxLength)
                password = new char[random.Next(minLength, maxLength + 1)];
            else
                password = new char[minLength];

            // Index of the next character to be added to password.											
            int nextCharIdx;

            // Index of the next character group to be processed.											
            int nextGroupIdx;

            // Index which will be used to track not processed character groups.											
            int nextLeftGroupsOrderIdx;

            // Index of the last non-processed character in a group.											
            int lastCharIdx;

            // Index of the last non-processed group.											
            int lastLeftGroupsOrderIdx = leftGroupsOrder.Length - 1;

            // Generate password characters one at a time.											
            for (int i = 0; i < password.Length; i++)
            {
                // If only one character group remained unprocessed, process it;										
                // otherwise, pick a random character group from the unprocessed										
                // group list. To allow a special character to appear in the										
                // first position, increment the second parameter of the Next										
                // function call by one, i.e. lastLeftGroupsOrderIdx + 1.										
                if (lastLeftGroupsOrderIdx == 0)
                    nextLeftGroupsOrderIdx = 0;
                else
                    nextLeftGroupsOrderIdx = random.Next(0,
                                                         lastLeftGroupsOrderIdx);

                // Get the actual index of the character group, from which we will										
                // pick the next character.										
                nextGroupIdx = leftGroupsOrder[nextLeftGroupsOrderIdx];

                // Get the index of the last unprocessed characters in this group.										
                lastCharIdx = charsLeftInGroup[nextGroupIdx] - 1;

                // If only one unprocessed character is left, pick it; otherwise,										
                // get a random character from the unused character list.										
                if (lastCharIdx == 0)
                    nextCharIdx = 0;
                else
                    nextCharIdx = random.Next(0, lastCharIdx + 1);

                // Add this character to the password.										
                password[i] = charGroups[nextGroupIdx][nextCharIdx];

                // If we processed the last character in this group, start over.										
                if (lastCharIdx == 0)
                    charsLeftInGroup[nextGroupIdx] =
                                              charGroups[nextGroupIdx].Length;
                // There are more unprocessed characters left.										
                else
                {
                    // Swap processed character with the last unprocessed character									
                    // so that we don't pick it until we process all characters in									
                    // this group.									
                    if (lastCharIdx != nextCharIdx)
                    {
                        char temp = charGroups[nextGroupIdx][lastCharIdx];
                        charGroups[nextGroupIdx][lastCharIdx] =
                                    charGroups[nextGroupIdx][nextCharIdx];
                        charGroups[nextGroupIdx][nextCharIdx] = temp;
                    }
                    // Decrement the number of unprocessed characters in									
                    // this group.									
                    charsLeftInGroup[nextGroupIdx]--;
                }

                // If we processed the last group, start all over.										
                if (lastLeftGroupsOrderIdx == 0)
                    lastLeftGroupsOrderIdx = leftGroupsOrder.Length - 1;
                // There are more unprocessed groups left.										
                else
                {
                    // Swap processed group with the last unprocessed group									
                    // so that we don't pick it until we process all groups.									
                    if (lastLeftGroupsOrderIdx != nextLeftGroupsOrderIdx)
                    {
                        int temp = leftGroupsOrder[lastLeftGroupsOrderIdx];
                        leftGroupsOrder[lastLeftGroupsOrderIdx] =
                                    leftGroupsOrder[nextLeftGroupsOrderIdx];
                        leftGroupsOrder[nextLeftGroupsOrderIdx] = temp;
                    }
                    // Decrement the number of unprocessed groups.									
                    lastLeftGroupsOrderIdx--;
                }
            }

            // Convert password characters into a string and return the result.											
            return new string(password);
        }

        /// <summary>												
        /// Remove ky tu o cuoi chuoi												
        /// </summary>												
        /// <param name="content"></param>												
        /// <param name="lastChar"></param>												
        /// <returns></returns>												
        public static string RemoveLastIndexCharacter(string content, string lastChar)
        {
            if (String.IsNullOrEmpty(content))
            {
                return content;
            }
            int lastIndex = content.LastIndexOf(lastChar);
            if (lastIndex > 0)
            {
                return content.Substring(0, lastIndex);
            }
            return content;
        }

        public static DateTime ConvertDateVN(this string date)
        {
            if (String.IsNullOrEmpty(date))
            {
                return DateTime.Now;
            }
            return DateTime.ParseExact(date, "dd/MM/yyyy", System.Globalization.DateTimeFormatInfo.InvariantInfo);
        }
        
        /// <summary>														
        /// Calculate number week in month 														
        /// </summary>														
        /// <param name="thisMonth"></param>														
        /// <returns></returns>														
        public static int MondaysInMonth(DateTime thisMonth)
        {
            int mondays = 0;
            int month = thisMonth.Month;
            int year = thisMonth.Year;
            int daysThisMonth = DateTime.DaysInMonth(year, month);
            DateTime beginingOfThisMonth = new DateTime(year, month, 1);
            for (int i = 0; i < daysThisMonth; i++)
                if (beginingOfThisMonth.AddDays(i).DayOfWeek == DayOfWeek.Monday)
                    mondays++;
            return mondays;
        }
        public static string ConvertNumberToText(float _number)
        {
            if (_number == 0)
                return "Không em.";

            string _source = String.Format("{0:0,0}", _number);

            string[] _arrsource = _source.Split(',');

            string _letter = "";

            int _numunit = _arrsource.Length;
            foreach (string _str in _arrsource)
            {
                if (ThreeNumber2Letter(_str).Length != 0)
                    _letter += String.Format("{0} {1} ", ThreeNumber2Letter(_str), NumUnit(_numunit));
                _numunit--;
            }

            if (_letter.StartsWith("không trăm"))
                _letter = _letter.Substring(11, _letter.Length - 12);
            if (_letter.StartsWith("lẻ"))
                _letter = _letter.Substring(3, _letter.Length - 3);

            return String.Format("{0}{1} em.", _letter.Substring(0, 1).ToUpper(), _letter.Substring(1, _letter.Length - 1).Trim());
        }

        public static string ThreeNumber2Letter(string _number)
        {
            int _hunit = 0, _tunit = 0, _nunit = 0;
            if (_number.Length == 3)
            {
                _hunit = int.Parse(_number.Substring(0, 1));
                _tunit = int.Parse(_number.Substring(1, 1));
                _nunit = int.Parse(_number.Substring(2, 1));
            }
            else if (_number.Length == 2)
            {
                _tunit = int.Parse(_number.Substring(0, 1));
                _nunit = int.Parse(_number.Substring(1, 1));
            }
            else if (_number.Length == 1)
                _nunit = int.Parse(_number.Substring(0, 1));

            if (_hunit == 0 && _tunit == 0 && _nunit == 0)
                return "";

            switch (_tunit)
            {
                case 0:
                    if (_nunit == 0)
                        return String.Format("{0} trăm", OneNumber2Letter(_hunit));
                    else
                        return String.Format("{0} trăm lẻ {1}", OneNumber2Letter(_hunit), OneNumber2Letter(_nunit));
                case 1:
                    if (_nunit == 0)
                        return String.Format("{0} trăm mười", OneNumber2Letter(_hunit));
                    else
                        return String.Format("{0} trăm mười {1}", OneNumber2Letter(_hunit), OneNumber2Letter(_nunit));
                default:
                    if (_nunit == 0)
                        return String.Format("{0} trăm {1} mươi", OneNumber2Letter(_hunit), OneNumber2Letter(_tunit));
                    else if (_nunit == 1)
                        return String.Format("{0} trăm {1} mươi mốt", OneNumber2Letter(_hunit), OneNumber2Letter(_tunit));
                    else if (_nunit == 4)
                        return String.Format("{0} trăm {1} mươi tư", OneNumber2Letter(_hunit), OneNumber2Letter(_tunit));
                    else
                        return String.Format("{0} trăm {1} mươi {2}", OneNumber2Letter(_hunit), OneNumber2Letter(_tunit), OneNumber2Letter(_nunit));
            }
        }

        public static string NumUnit(int _unit)
        {
            switch (_unit)
            {
                case 0:
                case 1:
                    return "";
                case 2:
                    return "em";
                case 3:
                    return "em";
                case 4:
                    return "em";
                default:
                    return String.Format("{0} {1}", NumUnit(_unit - 3), NumUnit(4));
            }
        }

        public static string OneNumber2Letter(int _number)
        {
            switch (_number)
            {
                case 0:
                    return "không";
                case 1:
                    return "một";
                case 2:
                    return "hai";
                case 3:
                    return "ba";
                case 4:
                    return "bốn";
                case 5:
                    return "năm";
                case 6:
                    return "sáu";
                case 7:
                    return "bảy";
                case 8:
                    return "tám";
                case 9:
                    return "chín";
                default:
                    return "";
            }
        }

        public static string StandardNumber(decimal? input)
        {
            string result = input.HasValue ? input.Value.ToString().Replace(",", ".") : string.Empty;
            if (!string.IsNullOrEmpty(result) && result.Contains("."))
            {
                var num = result.Split('.');
                if (!string.IsNullOrEmpty(num[1]) && Int32.Parse(num[1]) == 0)
                    return num[0];
                if (!string.IsNullOrEmpty(num[1]) && num[1].Length >= 2)
                    result = result.Substring(0, result.Length - 1);
            }
            return result;
        }

        public static string StandardMaxLenght(string input, int maxlength = 30)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            if (input.Length <= maxlength)
                return input;

            return input.Substring(0, maxlength);
        }
    }

}