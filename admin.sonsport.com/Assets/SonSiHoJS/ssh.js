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
};