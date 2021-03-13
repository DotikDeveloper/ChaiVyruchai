var applepayMobile;
var applepayDesktop;
var applepayButton;

var showApplePayButton = function () {
    applepayButton.addClass("visible");

    var ua = navigator.userAgent;
    if (ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/Android/i) || ua.match(/BlackBerry/i) || ua.match(/symbianos/i) || ua.match(/symbian/i) || ua.match(/samsung/i) || ua.match(/nokia/i) || ua.match(/windows ce/i) || ua.match(/sonyericsson/i) || ua.match(/webos/i) || ua.match(/wap/i) || ua.match(/motor/i)) {
        if (applepayMobile.length > 0) {
            applepayMobile.css({'display': 'block'});
        }
    } else {
        if (applepayDesktop.length > 0) {
            applepayDesktop.css({'display': 'block'});
        }
    }
};

$(document).ready(function () {

    applepayMobile = $('#apple-pay-mobile');
    applepayDesktop = $('#apple-pay-desktop');
    applepayButton = $('.apple-pay-button');

    if (window.ApplePaySession !== undefined && ApplePaySession.canMakePayments !== undefined && showAppleButton) {
        showApplePayButton();
    }

    const sector = Number($("[name=sector]").val());
    const applePaymentData = $('<input name="applePaymentData" type="hidden" id="applePaymentData">');
    const appleShippingContact = $('<input name="appleShippingContact" type="hidden" id="appleShippingContact">');
    const source = $('<input name="source" type="hidden" value="payform">');

    var payForm = $('#payForm');
    if (payForm.length === 0) {
        payForm = $('#pageForm');
    }
    payForm.append(applePaymentData);
    payForm.append(appleShippingContact);
    payForm.append(source);

    applepayButton.on('click', function () {
        const paymentFields = $('input[name=pan], input[name=name], input[name=pan1], input[name=year], input[name=month], select[name=year], select[name=month], input[name=date], input[name=cvc]');
        paymentFields.val('').attr('disabled', true);
        if (!payForm.valid()) {
            paymentFields.val('').attr('disabled', false);
            return;
        }
        paymentFields.val('').attr('disabled', false);

        const paymentRequest = {
            requiredShippingContactFields: [],
            countryCode: 'RU',
            currencyCode: currencyCode(),
            supportedNetworks: ['visa', 'masterCard'],
            merchantCapabilities: ['supports3DS'],
            lineItems: [
                {
                    type: 'final',
                    //type: 'pending',
                    label: 'Amount',
                    amount: amount().toFixed(2)
                },
                {
                    type: 'final',
                    //type: 'pending',
                    label: 'Fee',
                    amount: fee().toFixed(2)
                },
            ],
            total: {
                label: 'Total',
                amount: totalAmount().toFixed(2)
            }
        };

        const session = new ApplePaySession(1, paymentRequest);
        session.onvalidatemerchant = function (event) {
            getApplePaySession(event.validationURL, session).then(function (response) {
                session.completeMerchantValidation(response);
            });
        };
        session.onpaymentauthorized = function (event) {

            applePaymentData.val(JSON.stringify(event.payment.token.paymentData));
            appleShippingContact.val(JSON.stringify(event.payment.shippingContact));

            paymentFields.val('').attr('disabled', true);
            if (payForm.valid()) {
                $('button, input[type=submit]').attr('disabled', true);
                session.completePayment(ApplePaySession.STATUS_SUCCESS);
                payForm.submit();
            } else {
                paymentFields.val('').attr('disabled', false);
                session.completePayment(ApplePaySession.STATUS_FAILURE);
            }
        };
        session.oncancel = function (event) {
            setPropertyFieldsRequired();
        };
        session.begin();

        return false;
    });

    function getApplePaySession(url, session) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/webapi/GetApplePaySession',
                type: "POST",
                data: {
                    url: url,
                    sector: sector,
                    source: 'payform'
                },
                dataType: 'xml',
                success: function (xml) {
                    var tokenBody = "";
                    var result = false;
                    $(xml).find('token').each(function () {
                        result = true;
                        tokenBody = $(this).find('tokenBody').text();
                    });
                    if (result) {
                        resolve(JSON.parse(tokenBody));
                    } else {
                        session.abort();
                    }
                },
                error: function () {
                    session.abort();
                }
            });
        });
    }

    var setPropertyFieldsRequired = function () {
        var pan = $('#cardFrom');
        pan.attr('required', 'required');
        $('#cardFrom').rules('add', {
            validatePan: true,
            blackBins: true,
            ownBins: true,
            sectorBinsList1: true
        });

        if (typeof ($('#name')) !== typeof (undefined) && $('#name').length > 0) {
            var name = $('#name');
            name.attr('required', 'required');
        }
        if (typeof ($('input[name="name"]')) !== typeof (undefined) && $('input[name="name"]').length > 0) {
            var name = $('input[name="name"]');
            name.attr('required', 'required');
        }

        var cardDate = $('#cardDate');
        cardDate.attr('required', 'required');
        var cvc = $('#cvc');
        cvc.attr('required', 'required');
        $('button, input[type=submit]').attr('disabled', false);
    };

    function currencyCode() {
        const currency = $('input[name=currency]').val();
        switch (currency) {
            case "398":
                return "KZT";
            case "643":
                return "RUR";
            case "840":
                return "USD";
            case "978":
                return "EUR";
            default:
                return "RUR";
        }
    }

    function fee() {
        let feeEl = $('input[name=fee_value]');
        if (feeEl.length === 0) {
            feeEl = $('input[name=fee]');
        }
        return feeEl.val() !== '' ? parseFloat(parseInt(feeEl.val()) / 100.0) : 0.0;
    }

    function amount() {
        const amountEl = $('input[name=amount]');
        return amountEl.val() !== '' ? parseFloat(parseInt(amountEl.val()) / 100.0) : 0.0;
    }

    function totalAmount() {
        return amount() + fee();
    }
});
