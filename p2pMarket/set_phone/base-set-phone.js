checkPhoneHandler = function (checkPhoneData, resendSms) {

    $('#message-error').html('');

    resendSms = resendSms || false;

    $('#popup_loader').show();
    $('#submitButton').prop({'readonly': true});

    if (hasPhone2) {
        checkPhoneData.phone2 = $('#phone2').val() != undefined ? $('#phone2').val().replace(/[()_\+\-\s]/g, '') : "";
    } else {
        checkPhoneData.phone = $('#phone').val() != undefined ? $('#phone').val().replace(/[()_\+\-\s]/g, '') : "";
    }
    checkPhoneData.passphrase = $('#passphrase').val();
    checkPhoneData.newpassphrase = $('#newpassphrase') != undefined && $('#newpassphrase').length > 0 ? $('#newpassphrase').val() : undefined;
    checkPhoneData.repassphrase = $('#repassphrase').val();
    if (resendSms) {
        checkPhoneData.resendSms = true;
    }

    $.ajax({
        url: '/webapi/b2puser/CheckValidPhone',
        method: 'post',
        data: checkPhoneData,
        dataType: 'json',
        success: function (data) {
            if (data.success == true) {
                smsCodeVisibility(true);
                isPhoneChecked = true;

                if (resendSms) {
                    $('#message-error').html(i18nMessage('codeResent'));
                }
                return false;
            } else {
                if (resendSms == false) {
                    isPhoneChecked = false;
                    smsCodeVisibility(false);
                } else {
                    isPhoneChecked = true;
                }
                $('#message-error').html(data.message);
                return false;
            }
        },
        error: function (data) {
            smsCodeVisibility(false);
            isPhoneChecked = false;
            isCodeChecked = false;
            isFormReady = false;
            $('#message-error').html(i18nMessage('requestError'));
        }
    });
};
/**
 * @param checkCodeData передается по ссылке и в нем уже указаны параметры для checkPhone. Подчищаем ненужное и добавляем нужное
 */
checkCodeHandler = function (checkCodeData) {

    $('#popup_loader').show();
    $('#submitButton').prop({'readonly': true});

    if (hasPhone2) {
        checkCodeData.phone2 = $('#phone2').val() != undefined ? $('#phone2').val().replace(/[()_\+\-\s]/g, '') : "";
    } else {
        checkCodeData.phone = $('#phone').val() != undefined ? $('#phone').val().replace(/[()_\+\-\s]/g, '') : "";
    }
    checkCodeData.smscode = $('#smscode').val();
    checkCodeData.passphrase = undefined;
    checkCodeData.newpassphrase = undefined;
    checkCodeData.repassphrase = undefined;

    $.ajax({
        url: '/webapi/b2puser/CheckSmsCode',
        method: 'post',
        data: checkCodeData,
        dataType: 'json',
        success: function (data) {
            if (data.success == true) {
                isCodeChecked = true;
                // На этом этапе форма готова к отправке
                isFormReady = true;

                $('#payForm').submit();
                return false;
            } else {
                isCodeChecked = false;
                if (data.message != null) {
                    $('#message-error').html(data.message);
                } else {
                    $('#message-error').html(i18nMessage('incorrectCode'));
                }
                $('#submitButton').prop({'readonly': false});
                $('#popup_loader').hide();
                return false;
            }
        },
        error: function (data) {
            isCodeChecked = false;
            isFormReady = false;
            $('#submitButton').prop({'readonly': false});
            $('#popup_loader').hide();
        }
    });
};