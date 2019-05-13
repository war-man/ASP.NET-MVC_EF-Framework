var byteUtils = {
    //HaiVT 10/04/2013 - convert byte[] to image
    convertImage: function (value) {
        var str64 = String.fromCharCode.apply(null, value);
        return 'data:image/png;base64,' + btoa(str64).replace(/.{76}(?=.)/g, '$&\n');
    }
};
