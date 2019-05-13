using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace admin.sonsport.com.Common
{
    public class BusinessException : Exception
    {
        public string MessageKey;
        public List<object> Params;
        public BusinessException()
            : base()
        {
            // Add implementation (if required)
        }

        public BusinessException(string message)
            : base(message)
        {
            // Add implementation (if required)
            this.MessageKey = message;
            this.Params = new List<object>();
        }

        public BusinessException(string message, System.Exception inner)
            : base(message, inner)
        {
            // Add implementation (if required)
        }

        protected BusinessException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            // Add implementation (if required)
        }

        public BusinessException(string MessageKey, List<object> Params)
        {
            this.MessageKey = MessageKey;
            this.Params = Params;
        }

        public BusinessException(string MessageKey, params object[] Params)
        {
            this.MessageKey = MessageKey;
            this.Params = Params.ToList();
        }
    }

    public class SMASException : Exception
    {
        public SMASException() : base() { }
        public SMASException(string message) : base(message) { }
        public SMASException(string message, Exception innerException) : base(message, innerException) { }
    }
    /// <summary>
    /// Đại diện cho một lỗi xảy ra do dữ liệu từ người dùng, bao gồm dữ liệu người dùng nhập vào và dữ liệu ẩn trong các trường Hidden Field.
    /// </summary>
    public class SMASUserException : SMASException
    {
        public SMASUserException() : base() { }
        public SMASUserException(string message) : base(message) { }
        public SMASUserException(string message, Exception innerException) : base(message, innerException) { }
    }
    /// <summary>
    /// Đại diện cho một lỗi xảy ra do hệ thống. Các lỗi này được ghi vào log.
    /// </summary>
    public class SMASSystemException : SMASException
    {
        public SMASSystemException() : base() { }
        public SMASSystemException(string message) : base(message) { }
        public SMASSystemException(string message, Exception innerException) : base(message, innerException) { }
    }

}