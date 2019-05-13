var validateUtils = {
    IsEditable: function (obj) {
        var input = $(obj);
        if (input.length > 0 && !input.is(":hidden") && input.css('display') != 'none'
            && !input.is(":disabled") && !input.is("[readonly]")) {
            return true;
        } else {
            return false;
        }
    },

    IsValidSelector: function (input) {
        var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
        var matches = rquickExpr.exec(input);
        if (matches && matches.length > 0) return true;
        return false;
    },

    isValidMark: function (input, appliedLevel, isCommenting) {    //hieund9									
        //Neu truyen null tra ve true									
        if (typeof (input) == 'undefined' || input == null) return true;

        if (input == '') return false;

        if ((appliedLevel + '') == '1') { //Cap 1									
            if ((isCommenting + '') == '1') { //Mon nhan xet									
                if (input == "A" || input == "A+" || input == "B" || input == "a" || input == "a+" || input == "b")
                    return true;

                if (typeof (input) == 'string' && input.trim().length > 0) { //Kieu chuoi 									
                    var retVal = true;

                    if (!validateUtils.IsValidSelector(input)) //khong phai la selector									
                        return false;

                    $.each($(input), function (index, item) {
                        var textVal = $(item).val().toUpperCase();

                        if (!(textVal == "A" || textVal == "A+" || textVal == "B"))
                            retVal = false;
                    });

                    return retVal;
                }
                else
                    return false;
            } else {    //Mon tinh diem									
                //Neu kieu so thi kiem tra 0 <= x <= 10									
                if (typeof (input) == 'number')
                    return input >= 0 && input <= 10;

                if (typeof (input) == 'string') { //Kieu chuoi 									
                    //Neu truyen truc tiep la chuoi so ("5")									
                    if (input.match(/^0*\d$/) || input.match(/^0*10?$/))
                        return true;

                    if (!validateUtils.IsValidSelector(input)) //khong phai la selector									
                        return false;

                    //Con lai, tham so truyen vao la selector. 									
                    //Duyet cac input trong selector, kiem tra value cua cac input do									
                    var retVal = true;

                    $.each($(input), function (index, item) {
                        var textVal = $(item).val();

                        if (!(textVal.match(/^0*\d$/) || textVal.match(/^0*10$/)))
                            retVal = false;
                    });

                    return retVal;
                }
                else
                    return false;
            }
        } else { //Cap 2									
            if ((isCommenting + '') == '1') { //Mon nhan xet									
                if (input == "Đ" || input == "CĐ" || input == "đ" || input == "cđ")
                    return true;

                if (typeof (input) == 'string' && input.trim().length > 0) { //Kieu chuoi 									

                    if (!validateUtils.IsValidSelector(input)) //Kiem tra dau vao la selecter									
                        return false;

                    var retVal = true;

                    $.each($(input), function (index, item) {
                        var textVal = $(item).val().toUpperCase();

                        if (!(textVal == "Đ" || textVal == "CĐ"))
                            retVal = false;
                    });

                    return retVal;
                }
                else
                    return false;
            } else { //Mon tinh diem									
                //Neu kieu so thi kiem tra 0 <= x <= 10									
                if (typeof (input) == 'number')
                    return input >= 0 && input <= 10;

                if (typeof (input) == 'string') { //Kieu chuoi  									
                    //Neu truyen truc tiep la chuoi so ("5,365")									
                    if (input.match(/^0*\d(.\d*)?$/) || input.match(/^0*10(.0*)?$/))
                        return true;

                    if (!validateUtils.IsValidSelector(input)) //Kiem tra dau vao la selecter									
                        return false;

                    //Con lai, tham so truyen vao la selector. 									
                    //Duyet cac input trong selector, kiem tra value cua cac input do									
                    var retVal = true;

                    $.each($(input), function (index, item) {
                        var textVal = $(item).val();

                        if (!(textVal.match(/^0*\d(.\d*)?$/) || textVal.match(/^0*10(.0*)?$/)))
                            retVal = false;
                    });

                    return retVal;
                }
                else
                    return false;
            }
        }
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
    },
    numbersOnly: function (e, id) {
        var key;
        var keychar;
        if (window.event) {
            key = window.event.keyCode;
        } else if (e) {
            key = e.which;
        } else {
            return true;
        }
        keychar = String.fromCharCode(key);

        if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) {
            return true;
        } else if ((("0123456789").indexOf(keychar) > -1)) {
            return true;
        } else {
            return false;
        }
    },
    numbersOnlyN: function (e, id) {
        var key;
        var keychar;
        if (window.event) {
            key = window.event.keyCode;
        } else if (e) {
            key = e.which;
        } else {
            return true;
        }
        keychar = String.fromCharCode(key);

        if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) || (key == 27)) {
            return true;
        } else if ((("-0123456789").indexOf(keychar) > -1)) {
            return true;
        } else {
            return false;
        }
    },
    fixCommonValidate: function () {
        $("input[type=text]").each(function () {
            if ($(this).attr("data-val-length-max") != null && $(this).attr("data-val-length-max") != "") {
                $(this).attr("maxlength", $(this).attr("data-val-length-max"));
            }
            $(this).blur(function () {
                this.value = $.trim(this.value);
            });


            $("input[type=text].decimal").keypress(function (e) {
                if ((e.which < 48 || e.which > 57) && e.which != 8 && e.which != 127 && e.which != 44 && e.which != 0) {
                    return false;
                }
            });

            $("input[type=text].decimal-31").keydown(function (e) {
                // cac phim dieu khien									
                var commandKey = [8, 9, 13, 16, 17, 18, 19, 20, 32, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 145];
                var numberKey = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57 // Cac phim so hang phia tren ban phim					
                    , 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]; // cac phim so  ben phai ban phim
                var dotKey = [110, 190]; // Dau cham					
                var illegal = {
                    reg: [106, 111, 191, 220],
                    shift: [56, 59, 188, 190, 191, 220, 222]
                };
                var eKey = e.which || e.keyCode;
                if (numberKey.indexOf(eKey) === -1 && commandKey.indexOf(eKey) === -1 && dotKey.indexOf(eKey) === -1)
                    return false;
                if (illegal.reg.indexOf(eKey) > -1) return false;
                if (e.shiftKey && illegal.shift.indexOf(eKey) > -1) return false;
                if (dotKey.indexOf(eKey) >= 0) {
                    if ($(this).val().indexOf(".") >= 0) { // Khong cho phep dau 2 dau cham(.)				
                        return false;
                    }
                }
            });

            $("input[type=text].integer").keypress(function (e) {
                if ((e.which < 48 || e.which > 57) && e.which != 8 && e.which != 127 && e.which != 0) {
                    return false;
                }
            });

            $("input[type=text].integer-negative").keydown(function (e) {
                // cac phim dieu khien									
                var commandKey = [8, 9, 13, 16, 17, 18, 19, 20, 32, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 145];
                var numberKey = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57 // Cac phim so hang phia tren ban phim					
                    , 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]; // cac phim so  ben phai ban phim
                var minusKey = [173, 109]; // Dau tru					
                var illegal = {
                    reg: [106, 111, 191, 220],
                    shift: [56, 59, 188, 190, 191, 220, 222]
                };
                var eKey = e.which || e.keyCode;
                if (numberKey.indexOf(eKey) === -1 && commandKey.indexOf(eKey) === -1 && minusKey.indexOf(eKey) === -1)
                    return false;
                if (illegal.reg.indexOf(eKey) > -1) return false;
                if (e.shiftKey && illegal.shift.indexOf(eKey) > -1) return false;
                if (minusKey.indexOf(eKey) >= 0) {
                    if ($(this).val().length >= 1) { // Chi cho phep nhap dau tru o vi tri dau tien				
                        return false;
                    }
                    if ($(this).val().indexOf(".") >= 0) { // Khong cho phep dau 2 dau cham(.)				
                        return false;
                    }
                }
            });
        });
    },
    /**									
    * Hàm không cho phép nhập kí tự đặc biệt									
    **/
    checkchar: function (e) {
        if ((e.which < 48 || (e.which > 57 && e.which < 65) || (e.which > 123 && e.which < 127) || (e.which > 91 && e.which < 96)) && e.which != 8 && e.which != 44 && e.which != 0) {
            return false;
        }
        else {
            return true;
        }

    },

    validateForm: function (formId) {
        var form = $("#" + formId);

        //alert(validateUtils.ValidateDateTime($(form)));									
        if (!form.valid() || validateUtils.ValidateDateTime($(form))) {
            var inputs = form.find(".input-validation-error");
            return false;
        }

        return true;
    },
    //ham validate hack cho ie7+8 namta									
    validateSForm: function (btn) {
        var form = $(btn).closest("form");

        if (form != null && form != undefined && form.length > 0) {
            if (!form.valid() || form.find(".t-state-error").length > 0) {
                var inputs = form.find(".input-validation-error");
            } else {
                $(form).append("<input type='submit' id='frmSubmit' style='display:none'/>");
                $("#frmSubmit").click();
            }
        }
    },

    //HaiVT 04/06/2013 validate sms									
    validationSMS: function (idTextarea, idMsg, idLeng, idCount) {
        //fix prefix									
        $('#' + idMsg).html('');
        var content = $('#' + idTextarea).val();
        //maxlength la 1280									
        if (content.length > 1280) {
            content = content.substring(0, 1280);
            $('#' + idTextarea).val(content);
        }

        var SubPrefix = content.substring(0, preFixSendSMS.length); //preFixSendSMS sms duoc gan trong layout									
        if (SubPrefix != preFixSendSMS) {
            $('#' + idTextarea).val(preFixSendSMS + content.substring(preFixSendSMS.length + 1, content.length));
            $('#' + idMsg).html(msgPreFixErrorSMS); // msgPrefix duoc gan gia tri trong layout									
            $('#' + idMsg).css('color', 'red');
        }
        else {
            $('#' + idMsg).html('');
            $('#' + idMsg).css('color', '');
        }

        //count sms									
        var lengthContent = $('#' + idTextarea).val().trim().length;
        $('#' + idLeng).html(lengthContent);
        if (lengthContent % 160 == 0) {
            $('#' + idCount).html(lengthContent / 160);
        }
        else {
            $('#' + idCount).html(parseInt(lengthContent / 160) + 1);
        }
    },


    IsValidDate: function (value) {
        if (value == null || $.trim(value) == "") {
            return true;
        }
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (re.test(value)) {
            var adata = value.split('/');
            var mm = parseInt(adata[1], 10);
            var dd = parseInt(adata[0], 10);
            var yyyy = parseInt(adata[2], 10);
            var xdata = new Date(yyyy, mm - 1, dd);
            if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd))
                check = true;
            else
                check = false;
        } else
            check = false;
        return check;
    },
    CheckManglength: function (Text, maxthlengthValue) {
        var length = Text.value.length;
        var str = Text.value;
        if (length > maxthlengthValue) {
            str = str.substr(0, maxthlengthValue);
            Text.value = str;
        }
    },
    //validate DateTime Namta									
    ValidateDateTime: function (form) {
        var ValidateDateTime;
        ValidateDateTime = false;
        $(".t-datepicker", form).each(function () {
            var inputDt = $(this).find("input");
            $(inputDt).focus();
            if ($(inputDt).not(":disabled") && $(inputDt).val() != "" && Date.parseLocale($(inputDt).val(), "dd/MM/yyyy") == null) {

                ValidateDateTime = true;
                if ($(this).next().hasClass('field-validation-valid')) {
                    $(this).next().attr('class', 'field-validation-error');
                    var strValidate = '<span class="" htmlfor="' + $(this).next().attr('data-valmsg-for') + '" generated="true">';
                    strValidate = strValidate + 'Ngày tháng không đúng định dạng';
                    strValidate = strValidate + '</span>';
                    $(this).next().html(strValidate);

                }
            }
        });
        return ValidateDateTime;
    },
    ltrim: function (stringToTrim) {
        return stringToTrim.replace(/^\s+/, "");
    },

    rtrim: function (stringToTrim) {
        return stringToTrim.replace(/\s+$/, "");
    },
    SetPrefixSMS: function (thisObj) {
        //fix prefix									
        var content = this.ltrim($(thisObj).val());
        brandNamePrefix = stringUtils.HtmlDecode(brandNamePrefix);
        $(thisObj).val(content);
        if (content.length < brandNamePrefix.length) {
            content = brandNamePrefix;
            $(thisObj).val(content);
        } else if (!content.startsWith(brandNamePrefix)) {
            content = brandNamePrefix + content.substring(brandNamePrefix.length, content.length);
            $(thisObj).val(content);
        } else {
            var subHeadContent = content.substring(0, brandNamePrefix.length); // chu truong trong content									
            var subnewContent = content.substring($.trim(subHeadContent).length, content.length);
            var newcontent = brandNamePrefix + "" + subnewContent;
            if (subHeadContent != brandNamePrefix) {
                $(thisObj).val(newcontent);
            }
        }
        //maxlength la 2000									
        if (content.length > 2000) {
            content = content.substring(0, 2000);
            $(thisObj).val($.trim(content));
        }
    },

    SetPrefixSMSBySchool: function (thisObj) {
        //fix prefix									
        var content = this.ltrim($(thisObj).val());
        var brandNameUpper = (stringUtils.HtmlDecode(brandNamePrefix).toUpperCase());
        $(thisObj).val(content);
        //if (content.length < brandNameUpper.length ) {									
        //    content = brandNamePrefix;									
        //    $(thisObj).val(content);									
        //}									
        //if (!content.toUpperCase().startsWith($.trim(brandNameUpper)) ) {									
        //    content = brandNamePrefix + content.substring(brandNamePrefix.length, content.length);									
        //    $(thisObj).val(content);									
        //} else {									
        //    var subHeadContent = (content.substring(0, brandNamePrefix.length)).toUpperCase(); // chu truong trong content									
        //    var subnewContent = (content.substring($.trim(subHeadContent).length, content.length));									
        //    var newcontent = brandNamePrefix + subnewContent;									
        //    if (subHeadContent != brandNameUpper) {									
        //        $(thisObj).val(newcontent);									
        //    }									
        //}									

        //maxlength la 2000									
        if (content.length > 2000) {
            content = content.substring(0, 2000);
            $(thisObj).val($.trim(content));
        }
    },

    CountSMS: function (idSMSContent, idCount, isSignMsg) {
        var lengthContent = $.trim($('#' + idSMSContent).val()).length;
        var text = jQuery.validator.format("{0}/{1}");
        if (isSignMsg) { // Nếu là tin nhắn có dấu									
            if (lengthContent <= 70) {
                $('#' + idCount).html(text(lengthContent, 1));
            }
            else if (lengthContent % 67 == 0) {
                $('#' + idCount).html(text(lengthContent, parseInt(lengthContent / 67)));
            }
            else {
                $('#' + idCount).html(text(lengthContent, parseInt(lengthContent / 67 + 1)));
            }
        } else { // Tin nhắn KHÔNG dấu									
            if (lengthContent % 160 == 0) {
                $('#' + idCount).html(text(lengthContent, parseInt(lengthContent / 160)));
            }
            else {
                $('#' + idCount).html(text(lengthContent, parseInt(lengthContent / 160 + 1)));
            }
        }

    },
};


// jQuery shim for supporting <textarea> `maxlength` attribute in IE < 10									
// Author: Chris O'Brien, prettycode.org									

(function ($) {

    // Target only IE browsers that don't support `maxlength`									

    if (typeof document.selection === 'undefined' ||
        'maxLength' in document.createElement('textarea')
    ) {
        return;
    }

    // IE's API into document selections									

    var selection = document.selection;

    // There's a global selection (vs. getting element selection)									

    function selectionLength() {
        return selection.createRange().text.length;
    }

    // One of several implementations that work									

    function cursorIndex() {
        var current = selection.createRange(),
            diff = current.duplicate();

        diff.moveToElementText(this);
        diff.setEndPoint('EndToEnd', current);

        return diff.text.length - current.text.length;
    }

    function setCursorPosition(index) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveStart('character', index);
        range.moveEnd('character', 0);
        range.select();
    }

    // Don't store this anywhere; it could change dynamically									

    function maxlength() {
        return parseInt(this.getAttribute('maxlength'), 10);
    }

    // For every <textarea maxlength...> that does or will exist...									

    $('body')

        // Only allow key actions that won't exceed maxlength, and pasting									

        .on('keydown', 'textarea[maxlength]', function (e) {
            var value = this.value,
                length = value.length,
                maxLength = maxlength.call(this),
                keyCode = e.keyCode,
                hasSelection = !!selectionLength();

            return (
                length < maxLength ||
                keyCode === 8 || // backspace									
                keyCode === 9 || // tab									
                keyCode === 46 || // delete									
                (keyCode >= 37 && keyCode <= 40) || // arrows									
                e.ctrlKey ||
                hasSelection
            );
        })

        // 'paste' event, can happen via mouse, keyboard, or Edit menu									

        .on('paste', 'textarea[maxlength]', function () {
            var textbox = this,
                value = textbox.value,
                selectionLen = selectionLength(),
                cursorPos = cursorIndex.call(textbox),
                pasteText = window.clipboardData.getData('Text'),
                maxLength = maxlength.call(textbox);

            var prefix = value.substring(0, cursorPos),
                paste = pasteText.substring(0, maxLength - value.length + selectionLen),
                suffix = value.substr(cursorPos + selectionLen);

            textbox.value = prefix + paste + suffix;

            window.setTimeout(function () {
                setCursorPosition.call(textbox, prefix.length + paste.length);
                $(textbox).change();
            }, 0);

            return false;
        })
        ;

}(jQuery));									
