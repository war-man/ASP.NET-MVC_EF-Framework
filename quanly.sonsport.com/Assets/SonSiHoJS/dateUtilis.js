var dateUtils = {

    //Namta
    getLocaleShortDateString: function (d) {
        var f = { "ar-SA": "dd/MM/yy", "bg-BG": "dd.M.yyyy", "ca-ES": "dd/MM/yyyy", "zh-TW": "yyyy/M/d", "cs-CZ": "d.M.yyyy", "da-DK": "dd-MM-yyyy", "de-DE": "dd.MM.yyyy", "el-GR": "d/M/yyyy", "en-US": "M/d/yyyy", "fi-FI": "d.M.yyyy", "fr-FR": "dd/MM/yyyy", "he-IL": "dd/MM/yyyy", "hu-HU": "yyyy. MM. dd.", "is-IS": "d.M.yyyy", "it-IT": "dd/MM/yyyy", "ja-JP": "yyyy/MM/dd", "ko-KR": "yyyy-MM-dd", "nl-NL": "d-M-yyyy", "nb-NO": "dd.MM.yyyy", "pl-PL": "yyyy-MM-dd", "pt-BR": "d/M/yyyy", "ro-RO": "dd.MM.yyyy", "ru-RU": "dd.MM.yyyy", "hr-HR": "d.M.yyyy", "sk-SK": "d. M. yyyy", "sq-AL": "yyyy-MM-dd", "sv-SE": "yyyy-MM-dd", "th-TH": "d/M/yyyy", "tr-TR": "dd.MM.yyyy", "ur-PK": "dd/MM/yyyy", "id-ID": "dd/MM/yyyy", "uk-UA": "dd.MM.yyyy", "be-BY": "dd.MM.yyyy", "sl-SI": "d.M.yyyy", "et-EE": "d.MM.yyyy", "lv-LV": "yyyy.MM.dd.", "lt-LT": "yyyy.MM.dd", "fa-IR": "MM/dd/yyyy", "vi-VN": "dd/MM/yyyy", "hy-AM": "dd.MM.yyyy", "az-Latn-AZ": "dd.MM.yyyy", "eu-ES": "yyyy/MM/dd", "mk-MK": "dd.MM.yyyy", "af-ZA": "yyyy/MM/dd", "ka-GE": "dd.MM.yyyy", "fo-FO": "dd-MM-yyyy", "hi-IN": "dd-MM-yyyy", "ms-MY": "dd/MM/yyyy", "kk-KZ": "dd.MM.yyyy", "ky-KG": "dd.MM.yy", "sw-KE": "M/d/yyyy", "uz-Latn-UZ": "dd/MM yyyy", "tt-RU": "dd.MM.yyyy", "pa-IN": "dd-MM-yy", "gu-IN": "dd-MM-yy", "ta-IN": "dd-MM-yyyy", "te-IN": "dd-MM-yy", "kn-IN": "dd-MM-yy", "mr-IN": "dd-MM-yyyy", "sa-IN": "dd-MM-yyyy", "mn-MN": "yy.MM.dd", "gl-ES": "dd/MM/yy", "kok-IN": "dd-MM-yyyy", "syr-SY": "dd/MM/yyyy", "dv-MV": "dd/MM/yy", "ar-IQ": "dd/MM/yyyy", "zh-CN": "yyyy/M/d", "de-CH": "dd.MM.yyyy", "en-GB": "dd/MM/yyyy", "es-MX": "dd/MM/yyyy", "fr-BE": "d/MM/yyyy", "it-CH": "dd.MM.yyyy", "nl-BE": "d/MM/yyyy", "nn-NO": "dd.MM.yyyy", "pt-PT": "dd-MM-yyyy", "sr-Latn-CS": "d.M.yyyy", "sv-FI": "d.M.yyyy", "az-Cyrl-AZ": "dd.MM.yyyy", "ms-BN": "dd/MM/yyyy", "uz-Cyrl-UZ": "dd.MM.yyyy", "ar-EG": "dd/MM/yyyy", "zh-HK": "d/M/yyyy", "de-AT": "dd.MM.yyyy", "en-AU": "d/MM/yyyy", "es-ES": "dd/MM/yyyy", "fr-CA": "yyyy-MM-dd", "sr-Cyrl-CS": "d.M.yyyy", "ar-LY": "dd/MM/yyyy", "zh-SG": "d/M/yyyy", "de-LU": "dd.MM.yyyy", "en-CA": "dd/MM/yyyy", "es-GT": "dd/MM/yyyy", "fr-CH": "dd.MM.yyyy", "ar-DZ": "dd-MM-yyyy", "zh-MO": "d/M/yyyy", "de-LI": "dd.MM.yyyy", "en-NZ": "d/MM/yyyy", "es-CR": "dd/MM/yyyy", "fr-LU": "dd/MM/yyyy", "ar-MA": "dd-MM-yyyy", "en-IE": "dd/MM/yyyy", "es-PA": "MM/dd/yyyy", "fr-MC": "dd/MM/yyyy", "ar-TN": "dd-MM-yyyy", "en-ZA": "yyyy/MM/dd", "es-DO": "dd/MM/yyyy", "ar-OM": "dd/MM/yyyy", "en-JM": "dd/MM/yyyy", "es-VE": "dd/MM/yyyy", "ar-YE": "dd/MM/yyyy", "en-029": "MM/dd/yyyy", "es-CO": "dd/MM/yyyy", "ar-SY": "dd/MM/yyyy", "en-BZ": "dd/MM/yyyy", "es-PE": "dd/MM/yyyy", "ar-JO": "dd/MM/yyyy", "en-TT": "dd/MM/yyyy", "es-AR": "dd/MM/yyyy", "ar-LB": "dd/MM/yyyy", "en-ZW": "M/d/yyyy", "es-EC": "dd/MM/yyyy", "ar-KW": "dd/MM/yyyy", "en-PH": "M/d/yyyy", "es-CL": "dd-MM-yyyy", "ar-AE": "dd/MM/yyyy", "es-UY": "dd/MM/yyyy", "ar-BH": "dd/MM/yyyy", "es-PY": "dd/MM/yyyy", "ar-QA": "dd/MM/yyyy", "es-BO": "dd/MM/yyyy", "es-SV": "dd/MM/yyyy", "es-HN": "dd/MM/yyyy", "es-NI": "dd/MM/yyyy", "es-PR": "dd/MM/yyyy", "am-ET": "d/M/yyyy", "tzm-Latn-DZ": "dd-MM-yyyy", "iu-Latn-CA": "d/MM/yyyy", "sma-NO": "dd.MM.yyyy", "mn-Mong-CN": "yyyy/M/d", "gd-GB": "dd/MM/yyyy", "en-MY": "d/M/yyyy", "prs-AF": "dd/MM/yy", "bn-BD": "dd-MM-yy", "wo-SN": "dd/MM/yyyy", "rw-RW": "M/d/yyyy", "qut-GT": "dd/MM/yyyy", "sah-RU": "MM.dd.yyyy", "gsw-FR": "dd/MM/yyyy", "co-FR": "dd/MM/yyyy", "oc-FR": "dd/MM/yyyy", "mi-NZ": "dd/MM/yyyy", "ga-IE": "dd/MM/yyyy", "se-SE": "yyyy-MM-dd", "br-FR": "dd/MM/yyyy", "smn-FI": "d.M.yyyy", "moh-CA": "M/d/yyyy", "arn-CL": "dd-MM-yyyy", "ii-CN": "yyyy/M/d", "dsb-DE": "d. M. yyyy", "ig-NG": "d/M/yyyy", "kl-GL": "dd-MM-yyyy", "lb-LU": "dd/MM/yyyy", "ba-RU": "dd.MM.yy", "nso-ZA": "yyyy/MM/dd", "quz-BO": "dd/MM/yyyy", "yo-NG": "d/M/yyyy", "ha-Latn-NG": "d/M/yyyy", "fil-PH": "M/d/yyyy", "ps-AF": "dd/MM/yy", "fy-NL": "d-M-yyyy", "ne-NP": "M/d/yyyy", "se-NO": "dd.MM.yyyy", "iu-Cans-CA": "d/M/yyyy", "sr-Latn-RS": "d.M.yyyy", "si-LK": "yyyy-MM-dd", "sr-Cyrl-RS": "d.M.yyyy", "lo-LA": "dd/MM/yyyy", "km-KH": "yyyy-MM-dd", "cy-GB": "dd/MM/yyyy", "bo-CN": "yyyy/M/d", "sms-FI": "d.M.yyyy", "as-IN": "dd-MM-yyyy", "ml-IN": "dd-MM-yy", "en-IN": "dd-MM-yyyy", "or-IN": "dd-MM-yy", "bn-IN": "dd-MM-yy", "tk-TM": "dd.MM.yy", "bs-Latn-BA": "d.M.yyyy", "mt-MT": "dd/MM/yyyy", "sr-Cyrl-ME": "d.M.yyyy", "se-FI": "d.M.yyyy", "zu-ZA": "yyyy/MM/dd", "xh-ZA": "yyyy/MM/dd", "tn-ZA": "yyyy/MM/dd", "hsb-DE": "d. M. yyyy", "bs-Cyrl-BA": "d.M.yyyy", "tg-Cyrl-TJ": "dd.MM.yy", "sr-Latn-BA": "d.M.yyyy", "smj-NO": "dd.MM.yyyy", "rm-CH": "dd/MM/yyyy", "smj-SE": "yyyy-MM-dd", "quz-EC": "dd/MM/yyyy", "quz-PE": "dd/MM/yyyy", "hr-BA": "d.M.yyyy.", "sr-Latn-ME": "d.M.yyyy", "sma-SE": "yyyy-MM-dd", "en-SG": "d/M/yyyy", "ug-CN": "yyyy-M-d", "sr-Cyrl-BA": "d.M.yyyy", "es-US": "M/d/yyyy" };

        var l = navigator.language ? navigator.language : navigator['userLanguage'], y = d.getFullYear(), m = d.getMonth() + 1, d = d.getDate();
        f = "dd/MM/yyyy";
        function z(s) { s = '' + s; return s.length > 1 ? s : '0' + s; }
        f = f.replace(/yyyy/, y); f = f.replace(/yy/, String(y).substr(2));
        f = f.replace(/MM/, z(m)); f = f.replace(/M/, m);
        f = f.replace(/dd/, z(d)); f = f.replace(/d/, d);

        return f;
    },

    //HaiVT 10/04/2013 - convert datetime with format, default format ='dd/MM/yyyy'
    convertDateTime: function (value, format) {
        if (value == '') {
            return '';
        }

        format = format || 'dd/MM/yyyy';

        var d = new Date(value);

        minutes = d.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes;

        hours = d.getHours();

        date = d.getDate();
        date = date < 10 ? "0" + date : date;

        mon = d.getMonth() + 1;
        mon = mon < 10 ? "0" + mon : mon;

        year = d.getFullYear()

        if (format.trim() == 'dd/MM/yyyy') {
            return (date + "/" + mon + "/" + year);
        }
        else if (format.trim() == 'MM/dd/yyyy') {
            return (mon + "/" + date + "/" + year);
        }
        else if (format.trim() == 'yyyy/MM/dd') {
            return (year + "/" + mon + "/" + date);
        }
        else if (format.trim() == 'yyyy/dd/MM') {
            return (year + "/" + date + "/" + mon);
        }
        else if (format.trim() == 'MM/yyyy') {
            return (mon + '/' + year);
        }
        else if (format.trim() == 'HH:mm, dd/MM/yyyy')
            return (hours + ':' + minutes + ', ' + date + "/" + mon + "/" + year);
        else if ($.trim(format) == 'dd/MM/yyyy hh:mm') {
            return (date + "/" + mon + "/" + year + ' ' + hours + ':' + minutes);
        }
        else if ($.trim(format) == 'hh:mm dd/MM/yyyy') {
            return (hours + ':' + minutes + '  ' + date + "/" + mon + "/" + year);
        }
        else {
            return 'unknow format';
        }
    },

    ParseDate: function (strDate) {
        if (strDate != null && strDate != "") {
            arr = strDate.split("/");
            return new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
        }
        return null;
    },

    Parse: function (strDate) {
        if (strDate != null && strDate != "") {
            arr = strDate.split("/");
            return new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
        }
        return null;
    },

    convertDate: function (value) {
        if ($.type(value) == 'string') {
            var dateCheck = "/Date("
            var pos = value.indexOf(dateCheck);
            if (pos != -1) {
                try {
                    var miliSeconds = parseInt(value.substring(dateCheck.length, value.length - 2));
                    var date = new Date(miliSeconds);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    month = month.toString();
                    if (month.length == 1) {
                        month = "0" + month;
                    }
                    var day = date.getDate().toString();
                    if (day.length == 1) {
                        day = "0" + day;
                    }
                    var strDateTime = day + "/" + month + "/" + year;
                    return strDateTime;
                } catch (err) {
                    // ignored
                }
            }
        }
    },
    ConvertDateUS: function (divTimeStr) {
        //eg:-divTimeStr=18/03/2013 12:53:00
        var tmstr = divTimeStr.toString().split(' '); //'21-01-2013 PM 3:20:24'
        var dt = tmstr[0].split('/');
        var str = dt[2] + "/" + dt[1] + "/" + dt[0];// + " " + tmstr[1]; //+ " " + tmstr[1]//'2013/01/20 3:20:24 pm'
        return str;
    },
    getCurrentDate: function () {
        var curDate = new Date();
        var day = curDate.getDate();
        var month = curDate.getMonth() + 1;
        var year = curDate.getFullYear();

        var dayStr = day < 10 ? "0" + day : day;
        var monthStr = month < 10 ? "0" + month : month;

        return dayStr + "/" + monthStr + "/" + year;
    },
    ConvertDateUS: function (divTimeStr) {
        //eg:-divTimeStr=18/03/2013 12:53:00
        var tmstr = divTimeStr.toString().split(' '); //'21-01-2013 PM 3:20:24'
        var dt = tmstr[0].split('/');
        var str = dt[2] + "/" + dt[1] + "/" + dt[0];// + " " + tmstr[1]; //+ " " + tmstr[1]//'2013/01/20 3:20:24 pm'
        return str;
    },
    formatDate: function formatDateString(s) {
        var pad = function (x) { return ((x.length < 2) ? "0" : "") + x; }
            , dt = new Date("" + s), d, m, y;
        if (dt.getTime()) {
            d = pad(dt.getDate());
            m = pad(dt.getMonth() + 1);
            y = dt.getFullYear();
            return [d, m, y].join('/');
        }
        return null;
    },

    displayDate: function (date) {
        if (date == null) return "";
        var pad = function (x) { return ((x.length < 2) ? "0" : "") + x; }
        var d = pad(date.getDate());
        var m = pad(date.getMonth() + 1);
        var y = date.getFullYear();
        return [d, m, y].join('/');
    },
    isDate: function (txtDate) {
        var currVal = txtDate;
        if (currVal == '')
            return false;

        //Declare Regex 
        var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var dtArray = currVal.match(rxDatePattern); // is format OK?

        if (dtArray == null)
            return false;

        //Checks for dd/mm/yyyy format.
        dtDay = dtArray[1];
        dtMonth = dtArray[3];
        dtYear = dtArray[5];

        if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        }
        return true;
    }
};
