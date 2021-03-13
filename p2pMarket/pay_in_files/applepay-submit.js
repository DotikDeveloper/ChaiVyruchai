showOperationInfo = function (operation) {

    var pan = $('input[name="pan"]');
    pan.removeAttr('required');
    pan.rules("remove");

    if(typeof($('[name="month"]')) !== typeof(undefined) && $('[name="month"]').length > 0) {
        var month = $('[name="month"]');
        month.removeAttr('required');
    }

    if(typeof($('[name="year"]')) !== typeof(undefined) && $('[name="year"]').length > 0) {
        var year = $('[name="year"]');
        year.removeAttr('required');
    }

    if(typeof($('#cardDate')) !== typeof(undefined) && $('#cardDate').length > 0) {
        var cardDate = $('#cardDate');
        cardDate.removeAttr('required');
    }

    if(typeof($('[name="email"]')) !== typeof(undefined) && $('[name="email"]').length > 0) {
        var email = $('[name="email"]');
        email.removeAttr('required');
    }

    if(typeof($('input[name="name"]')) !== typeof(undefined) && $('input[name="name"]').length > 0) {
        var name = $('input[name="name"]');
        name.removeAttr('required');
    }
    if(typeof($('[name="cvc"]')) !== typeof(undefined) && $('[name="cvc"]').length > 0) {
        var cvc = $('input[name="cvc"]');
        cvc.removeAttr('required');
    }
    $('#payForm').attr('action', '/webapi/Notify?apple=true&operation_id=' + operation.id);
    $('#payForm').submit();
};
setPropertyFieldsRequired = function () {
    var pan = $('input[name="pan"]');
    pan.attr('required', 'required');

    $('input[name="pan"]').rules('add', {
        validatePan: true,
        blackBins: true,
        ownBins: true,
        sectorBinsList1: true
    });

    if(typeof($('input[name="name"]')) !== typeof(undefined) && $('input[name="name"]').length > 0) {
        var name = $('input[name="name"]');
        name.attr('required', 'required');
    }
    if(typeof($('#cardDate')) !== typeof(undefined) && $('#cardDate').length > 0) {
        var cardDate = $('#cardDate');
        cardDate.attr('required', 'required');
    }
    if(typeof($('[name="month"]')) !== typeof(undefined) && $('[name="month"]').length > 0) {
        var month = $('#month');
        month.attr('required', 'required');
    }
    if(typeof($('[name="year"]')) !== typeof(undefined) && $('[name="year"]').length > 0) {
        var year = $('#year');
        year.attr('required', 'required');
    }
    if(typeof($('[name="cvc"]')) !== typeof(undefined) && $('[name="cvc"]').length > 0) {
        var cvc = $('#cvc');
        cvc.attr('required', 'required');
    }
    if(typeof($('[name="email"]')) !== typeof(undefined) && $('[name="email"]').length > 0) {
        var email = $('input[name="email"]');
        email.attr('required', 'required');
    }
};