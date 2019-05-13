using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace admin.sonsport.com.Common
{
    public class JsonMessage
    {
        public const string SUCCESS = "success";
        public const string ERROR = "error";
        public string Type { get; set; }

        public string Message { get; set; }

        public JsonMessage()
        {
        }

        public JsonMessage(string Message,string Type = SUCCESS)
        {
            this.Type = Type;
            this.Message = Message;
        }

        public string ToJsonString()
        {
            return "{Type:'" + Type + "',Message:'" + Message + "'}";
        }

    }
}