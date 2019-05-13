var arrUtils = {
    //HaiVT 27/04/2013 - split string -> array with option remove empty element
    //'5,null, ,aa,undefined,' -> default = '5'
    //'5,null, ,aa,undefined,' -> isNoEmpty: false, isNumberic: true -> '5,null, ,aa,undefined,'
    //'5,null, ,aa,undefined,' -> isNoEmpty: true, isNumberic: false -> '5,null,aa,undefined,'
    //'5,null, ,aa,undefined,' -> isNoEmpty: false, isNumberic: false -> '5,null, ,aa,undefined,'
    toArray: function (text, sign, isNoEmpty, isNumberic) {
        sign = sign || ','; //default la dau ,

        //isNoEmpty default la true
        if (typeof (isNoEmpty) == 'undefined' || isNoEmpty == null) {
            isNoEmpty = true;
        }

        //isNumberic default la numberic
        if (typeof (isNumberic) == 'undefined' || isNumberic == null) {
            isNumberic = true;
        }

        text = text || ''; //default '' if undefined or null 

        var arr = text.split(sign);
        var returnArr = [];
        if (arr.length > 0) {
            if (isNumberic) {
                for (var i = 0, size = arr.length; i < size; i++) {
                    if (isNoEmpty) {
                        if (arr[i].trim() > 0) {
                            returnArr.push(arr[i]);
                        }
                    }
                    else {
                        returnArr.push(arr[i]);
                    }
                }
            }
            else {
                for (var i = 0, size = arr.length; i < size; i++) {
                    if (isNoEmpty) {
                        if (arr[i].trim().length > 0) {
                            returnArr.push(arr[i]);
                        }
                    }
                    else {
                        returnArr.push(arr[i]);
                    }
                }
            }
        }
        return returnArr;
    }
};
