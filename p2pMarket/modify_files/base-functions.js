(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

var sendInProgress;


var errorPlacementFn = function (error, element) {
    var inputField = element;
    inputField.tooltip('destroy');
    inputField.tooltip({
        title: '<img src="/webapi/template/common/img/valday/error.svg"\ class="tooltipImg">' + ' ' + error.text(),
        placement: 'bottom',
        trigger: 'manual',
        animated: 'fade',
        html: true
    }).tooltip('show');
};

var feedbackFormShow = function () {
    if (sendInProgress) {
        return false;
    }

    $('#content-data').hide();
    $('#content-data').siblings().each(function () {
        $(this).remove();
    });

    var feedbackFormTitleTag = '<h3>' + i18nMessage('feedbackForm') + '</h3>';
    var emailCardLabelTag = '<label class="card-label">' + i18nMessage('email') + '</label>';
    var yourMessageCardLabelTag = '<label class="card-label">' + i18nMessage('yourMessage') + '</label>';
    var sendFeedbackButtonTag = '<button type="submit" id="send-feedback-button">' + i18nMessage('send') + '</button>';
    var cancelButtonTag = '<a href="#" id="feedback-close" title="' + i18nMessage('cancel') + '">' + i18nMessage('cancel') + '</a>';

    var feedback = $('<div id="feedback">').append($('<form id="feedback-form" class="ordinal-form">')
        .append($('<div>')
            .append(
                $('<div id="feedback-wrapper" class="content-wrapper">')

                    .append(
                        $('<div id="feedback-title">')
                            .append($('<img src="/webapi/template/common/img/valday/feedback-send.svg" alt=""/>'))
                            .append($(feedbackFormTitleTag))
                    )
                    .append(
                        $('<div id="feedback-content">')
                            .append(
                                $('<div class="input-field">')
                                    .append($(emailCardLabelTag))
                                    .append($('<input type="text" autocomplete="off" placeholder="username@mail.com" id="feedback-email" required name="email"/>'))
                            )
                            .append(
                                $('<div class="input-field">')
                                    .append($(yourMessageCardLabelTag))
                                    .append($('<textarea name="message" id="feedback-message" required autocomplete="off"></textarea>'))
                            )
                    )
            ).append(
                $('<div class="action-buttons">')
                    .append(
                        $('<div class="send-container">')
                            .append($(sendFeedbackButtonTag))
                    )
                    .append(
                        $('<div class="cancel-container">')
                            .append($(cancelButtonTag))
                    )
            )
        )
    )
    $('#content').append(feedback);
    $('#feedback').fadeIn();

    $('#feedback-form').validate({
        errorElement: "span",
        errorClass: 'has-error',
        errorPlacement: errorPlacementFn,
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();
        },
        ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input, .ignore-validation, .ignore-validation-runtime',
        success: function (error, element) {
            $(element).tooltip('destroy');
        },
        rules: {
            'email': {
                validateEmail: true
            }
        },
        submitHandler: function (form) {
            sendInProgress = true;
            var feedbackData = {
                email: $('#feedback-email').val(),
                message: $('#feedback-message').val(),
                sector: $('input[name=sector]') != undefined && $('input[name=sector]').length != 0 ? $('input[name=sector]').val() : null,
                id: $('input[name=id]').val() != undefined && $('input[name=id]').val().length != 0 ? $('input[name=id]').val() : null
            };

            var sendingInProgressTag = '<h3>' + i18nMessage('sendingInProgress') + '</h3>';

            $('#feedback > *').remove();
            $('#feedback').append(
                $('<div class="message-sending-status">')
                    .append($('<img src="/webapi/template/common/img/valday/feedback-sending.svg" alt=""/>'))
                    .append($(sendingInProgressTag))
            );

            $.ajax({
                url: '/webapi/mailer/SendFeedback',
                data: feedbackData,
                method: 'post',
                dataType: 'json',
                success: function (data) {
                    sendInProgress = false;
                    if (data != undefined && data.success == true) {
                        showSendResultGlobal('/webapi/template/common/img/valday/feedback-sent.svg', i18nMessage('messageSent'), i18nMessage('weWillContactYou'));
                    } else {
                        showSendResultGlobal('/webapi/template/common/img/valday/message-error.svg', i18nMessage('errorOccurred'), i18nMessage('pleaseRepeatSending'));
                    }
                },
                error: function () {
                    sendInProgress = false;
                    showSendResultGlobal('/webapi/template/common/img/valday/message-error.svg', i18nMessage('errorOccurred'), i18nMessage('noInternet'));
                }
            })

            return false;
        }
    });
    return false;
};

function displayInline() {
    if ($("#screen") != undefined && $("#screen").length > 0) {
        var f = document.getElementById('screen');
        f.style.display = "inline";
    }
    if ($("#notify-screen") != undefined && $("#notify-screen").length > 0) {
        var f = document.getElementById('notify-screen');
        f.style.display = "inline";
    }
}

$(document).ready(function () {
    if (typeof ($('#cardDate')) !== typeof (undefined) && $('#cardDate').length > 0) {
        $('#cardDate').rules('add', {
            validateCardDate: true
        });
    }
    if (typeof ($('#cvc')) !== typeof (undefined) && $('#cvc').length > 0) {
        $('#cvc').rules('add', {
            validateCVC: true
        });
    }

    /**
     * Popup
     */

    $('#popup_loader').on('show', function () {
        $('#popup_loader-wrapper').css('display', 'flex');
        $('#content').css('opacity', '0.5');
    });

    $('#popup_loader').on('hide', function () {
        $('#popup_loader-wrapper').css('display', 'none');
        $('#content').css('opacity', '1');
    });

    /**
     * Feedback
     */

    $('#feedback-link').on('click', function () {
        feedbackFormShow();
    });
    $('#content').on('click', '#feedback-close, #send-close a', function () {
        hideSendResult();
        return false;
    });

    function hideSendResult() {
        $('#feedback').remove();
        $('#content-data').fadeIn();
    }
});