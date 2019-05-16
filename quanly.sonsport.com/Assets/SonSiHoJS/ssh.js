var ssh = {
    ShowAlertSuccess: function (message) {
        var alertMessage = $('#alert-result');
        alertMessage.addClass('alert alert-success').prop('role', 'alert').text(message).css('display', 'none');
        alertMessage.show('slow').delay(2000).hide('slow');
    },

    ShowAlertError: function (message) {
        var alertMessage = $('#alert-result');
        alertMessage.addClass('alert alert-danger').prop('role', 'alert').text(message).css('display', 'none');
        alertMessage.show('slow').delay(2000).hide('slow');
    },

    ScollToBottom: function (duration) {
        $('html, body').animate({ scrollTop: $(document).height() }, duration);
    },

    ScollToTop: function () {
        $('html, body').animate({ scrollTop: 0 }, duration);
    },

    setInputFilter: function(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });
    }
};

//setInputFilter(document.getElementById("intTextBox"), function (value) {
//    return /^-?\d*$/.test(value);
//});