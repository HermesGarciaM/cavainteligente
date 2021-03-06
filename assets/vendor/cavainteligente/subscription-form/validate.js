jQuery(document).ready(function($) {
    "use strict";

    $('form.subscription-form').submit(function() {
        let form = $(this).find('.subscribe-input'),
            formError = false,
            emailExpression = /^[^\s()<>@,;:\/]+@\w[\w.-]+\.[a-z]{2,}$/i,
            sendStr = '',
            action = '',
            thisForm = $(this);

        form.children('input').each(function() {
            let i = $(this),
                identif = i.attr('id');

            if (identif !== undefined) {
                let infoError = false,
                    errorLength = false;

                if (!emailExpression.test(i.val())) {
                    formError = infoError = true;
                }
                if (i.val().length > 50) {
                    formError = errorLength = true;
                }

                if(errorLength === true){
                    i.next('.subscription-validation').html((errorLength ? (i.attr('data-lengthmsg') !== undefined ? i.attr('data-lengthmsg') : 'Error Longitud') : '')).show('blind');
                }else if(infoError === true){
                    i.next('.subscription-validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error Info') : '')).show('blind');
                }else{
                    i.next('.subscription-validation').html((infoError ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Error') : '')).hide('blind');
                }
            }
        });
        if (formError) return false;
        else sendStr = $(this).serialize();
        action = $(this).attr('action');
        if( ! action ) {
            action = 'subscription/subscription.php';
        }

        thisForm = $(this);
        if( ! action ) {
            thisForm.find('.loading').slideUp();
            thisForm.find('.error-message').slideDown().html('Error!');
            return false;
        }
        thisForm.find('.sent-message').slideUp();
        thisForm.find('.error-message').slideUp();
        thisForm.find('.loading').slideDown();

        $.ajax({
            type: "POST",
            url: action,
            data: sendStr,
            success: function(msg) {
                let message = '';
                if(msg === ''){
                    message = 'Ocurri?? un error';
                }else{
                    message = msg;
                }
                if (message === 'OK') {
                    thisForm.find('.loading').slideUp();
                    thisForm.find('.sent-message').slideDown();
                    thisForm.find("input:not(input[type=submit])").val('');
                } else {
                    thisForm.find('.loading').slideUp();
                    thisForm.find('.error-message').slideDown().html(message);
                }
            }
        });
        return false;
    });
});
