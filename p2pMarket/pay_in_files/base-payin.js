var OrderFee = 0;

ajaxHandler = function (data) {
    $.ajax({
        url: '/webapi/b2puser/PayInFee',
        method: 'post',
        data: data,
        dataType: 'json',
        success: function (data) {
            $('#popup_loader').hide();
            $('#submitButton').prop({'disabled': false});

            if (data === undefined || data.success === false || (feePaidByReceiver && (getFloat(data.fee) > getFloat(getAmount()) * 100))) {
                if (data === undefined || data.success === false) {
                    alert(i18nMessage('errorCalculatingFeeTryAgain'));
                } else {
                    alert(i18nMessage('errorCalculatingFeeCheckAmount'));
                }
                return false;
            }

            fillForm(getFloat(getAmount()), data.data.fee);
            OrderFee = data.data.fee;
            $('#submitButton').val(TRANSFER);
            needsRecalc = false;
        },
        error: function () {
            alert(i18nMessage('serviceError'));
            $('#popup_loader').hide();
            $('#submitButton').prop({'disabled': false});
        }
    });
};
var requestOrderFee = function () {
    TRANSFER = i18nMessage('pay');
    CONTINUE = i18nMessage('pay');

    if (ORDER_FEE === undefined) {
        var data = {
            'sector': $('input[name="sector"]').val(),
            'amount': (getFloat(getAmount()) * 100).toFixed(0),
            'to_client_ref': $('input[name="to_client_ref"]').val()
        };
        if (ajaxHandler != undefined) {
            ajaxHandler(data);
        }
        needsRecalc = false;
    } else {
        fillForm(getFloat(getAmount()), ORDER_FEE);
        OrderFee = ORDER_FEE;
        needsRecalc = false;
    }
    $('#submitButton').val(TRANSFER);
};
resetOrderFee = function () {
    if (ORDER_FEE === undefined) {
        needsRecalc = true;
        $('#submitButton').val(TRANSFER).prop({'disabled': true});
    } else {
        $('#fee_value').val(OrderFee);
        needsRecalc = false;
    }
};
changeCardFrom = function (self) {

    var cardFromEl = $('#cardFrom');
    // keyup added for IE8 which doesnt have oninput event
    self.on('input', function () {
        var amount = getFloat(getAmount());
        var commission = OrderFee;
        var pan1 = cardFromEl.val().replace(/\s/g, '');
        // Если нет доступного алгоритма расчета комиссии - выполняем расчет по стандартному
        if (ORDER_FEE == undefined) {

            //Если есть изменение поля, но при этом флаг необходимости пересчета комиссии не установлен - устанавливаем его
            if (!needsRecalc) {
                needsRecalc = true;
                $('#submitButton').val(CONTINUE);
            }
            if (amount > 0 && pan1.length >= 16) {
                needsRecalc = true;
                $('#submitButton').prop({'disabled': false});
            } else {
                $('#submitButton').prop({'disabled': false});
            }

        } else {
            commission = ORDER_FEE;
        }
        fillForm(amount, commission);
    });
};
controlSubmitHandler = function () {

    // Убираем плейсхолдер, записанный в value при отправке формы
    if ($('input[name=emailFrom]') !== undefined && $('input[name=emailFrom]')[0] !== undefined && $('input[name=emailFrom]')[0].value == 'E-mail') {
        $('input[name=emailFrom]')[0].value = '';
    }
    //Проверяем на разрешение платежа для МПС
    var ps = cardType($('#cardFrom').val());
    if (notifies[ps] !== undefined && notifies[ps]['ENABLE'] !== undefined && notifies[ps]['ENABLE']) {
        alert(notifies[ps]['MESSAGE']);
        return false;
    }
    //Вызываем дополнительную функцию проверки. Если функция возвращает false - то выходим из обработчика отправки формы, не отправляя форму.
    if (customAdditionalSubmitHandler !== undefined) {
        var checkResult = customAdditionalSubmitHandler(form);
        if (checkResult === false) {
            return false;
        }
    }
};
$(document).ready(function () {
    var orderReference = $('input[name=reference]').val();
    $('#order-reference').html(orderReference);
});