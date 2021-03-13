$(document).ready(function () {

    var payForm = $('#payForm');
    if (payForm.length === 0) {
        payForm = $('#pageForm');
    }
    const googleCryptogram = $('<input name="googleCryptogram" type="hidden" id="googleCryptogram">');
    payForm.append(googleCryptogram);

    const sector = $('input[name=sector]').val();
    const order = $('input[name=id]').val();
    const serviceSignatureEl = $('#serviceSignature');
    const signature = serviceSignatureEl.length !== 0 ? serviceSignatureEl.val() : $('input[name=signature]').val();

    const baseRequest = {
        apiVersion: 2,
        apiVersionMinor: 0
    };

    const baseCardPaymentMethod = {
        type: 'CARD',
        parameters: {
            //allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedAuthMethods: ["PAN_ONLY"],
            allowedCardNetworks: ["MASTERCARD", "VISA"]
        }
    };

    $.ajax({
        url: '/webapi/GooglePay/Environment',
        data: {
            sector: sector,
            id: order,
            signature: signature
        },
        dataType: 'json',
        method: 'post',
        success: function (data) {

            if (data === undefined || data.data === undefined) {
                console.error("GooglePay Environment error");
                return;
            }

            const tokenizationSpecification = {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    'gateway': data.data.googleGatewayId,
                    'gatewayMerchantId': data.data.googleMerchantId
                }
            };

            const cardPaymentMethod = Object.assign(
                {tokenizationSpecification: tokenizationSpecification},
                baseCardPaymentMethod
            );

            const paymentDataRequest = Object.assign({}, baseRequest);

            paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];

            paymentDataRequest.merchantInfo = {
                merchantName: typeof (gPayMerchantName) !== typeof (undefined) ? gPayMerchantName : "Best2Pay",
                merchantOrigin: typeof (gPayMerchantOrigin) !== typeof (undefined) ? gPayMerchantOrigin : "",
                merchantId: data.data.googleMerchantId
            };

            const paymentsClient = new google.payments.api.PaymentsClient({environment: data.data.environment});

            const isReadyToPayRequest = Object.assign({}, baseRequest);
            isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod];

            paymentsClient.isReadyToPay(isReadyToPayRequest)
                .then(function (response) {
                    if (response.result) {

                        const button = $(paymentsClient.createButton({
                            onClick: () => {

                                const paymentFields = $('input[name=pan], input[name=name], input[name=pan1], input[name=year], input[name=month], select[name=year], select[name=month], input[name=date], input[name=cvc]');
                                paymentFields.val('').attr('disabled', true);
                                if (!payForm.valid()) {
                                    paymentFields.val('').attr('disabled', false);
                                    return;
                                }
                                paymentFields.val('').attr('disabled', false);

                                paymentDataRequest.transactionInfo = {
                                    totalPriceStatus: 'FINAL',
                                    totalPrice: parseFloat(totalAmount() / 100.0).toFixed(2),
                                    currencyCode: currencyCode()
                                };
                                paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
                                    // if using gateway tokenization, pass this token without modification
                                    paymentToken = paymentData.paymentMethodData.tokenizationData.token;

                                    if (paymentToken !== null && paymentToken !== undefined) {
                                        googleCryptogram.val(btoa(paymentToken));
                                        paymentFields.val('').attr('disabled', true);
                                        if (payForm.valid()) {
                                            $('button, input[type=submit]').attr('disabled', true);
                                            payForm.submit();
                                        } else {
                                            $('button, input[type=submit]').attr('disabled', false);
                                            paymentFields.val('').attr('disabled', false);
                                        }
                                    }
                                }).catch(function (err) {
                                    $('button, input[type=submit]').attr('disabled', false);
                                    console.error(err);
                                })
                            }
                        }));

                        $('.googlepay-button-container').append(button);
                        $('.googlepay-oferta').show();
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        },
        error: function (data) {
            console.error(data);
        }
    });

    function fee() {
        let feeEl = $('input[name=fee_value]');
        if (feeEl.length === 0) {
            feeEl = $('input[name=fee]');
        }
        return feeEl.val() !== '' ? parseInt(feeEl.val()) : 0;
    }

    function amount() {
        const amountEl = $('input[name=amount]');
        return amountEl.val() !== '' ? parseInt(amountEl.val()) : 0;
    }

    function totalAmount() {
        return amount() + fee();
    }

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
});
