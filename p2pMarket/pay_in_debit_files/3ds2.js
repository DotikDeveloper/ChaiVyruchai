$(document).ready(function () {

    try {
        /*var availChallengeWindowSize = {
            '01': ['250px', '400px'],
            '02': ['390px', '400px'],
            '03': ['500px', '600px'],
            '04': ['600px', '400px'],
            '05': ['100%', '100%']
        };
        var maxHeight = $(window).height() + 'px';
        var maxWidth = $(window).width() + 'px';*/

        var payForm = $('#payForm');
        if (typeof (payForm) === undefined || payForm.length === 0) {
            // carelia, valday
            payForm = $('#pageForm');
            if (typeof (payForm) === undefined || payForm.length === 0) {
                // old
                payForm = $('form[name=data]');
            }
        }
        if (typeof (payForm) !== undefined && payForm.length > 0) {
            payForm.append($('<input>').attr({'type': 'hidden', 'id': 'deviceChannel', 'name': 'deviceChannel'}));
            payForm.append($('<input>').attr({
                'type': 'hidden',
                'id': 'browserJavaEnabled',
                'name': 'browserJavaEnabled'
            }));
            payForm.append($('<input>').attr({
                'type': 'hidden',
                'id': 'browserScreenHeight',
                'name': 'browserScreenHeight'
            }));
            payForm.append($('<input>').attr({
                'type': 'hidden',
                'id': 'browserScreenWidth',
                'name': 'browserScreenWidth'
            }));
            payForm.append($('<input>').attr({
                'type': 'hidden',
                'id': 'browserLanguage',
                'name': 'browserLanguage'
            }));

            var deviceChannel = "02";
            $('#deviceChannel').val(deviceChannel);
            $('#browserJavaEnabled').val(navigator.javaEnabled());
            $('#browserScreenHeight').val(screen.height);
            $('#browserScreenWidth').val(screen.width);
            $('#browserLanguage').val(navigator.language);
        }

        /*function getChallengeWindowSize() {
            var body = $('body');
            var height = body.css('height');
            var width = body.css('width');
            if (height === maxHeight) {
                height = '100%';
            }
            if (width === maxWidth) {
                width = '100%';
            }
            for (var k in availChallengeWindowSize) {
                console.log(height + ', ' + width)
                console.log(height <= availChallengeWindowSize[k][0])
                console.log(width <= availChallengeWindowSize[k][1])
                if (height <= availChallengeWindowSize[k][0] && width <= availChallengeWindowSize[k][1]) {
                    return k;
                }
            }
        }*/
    } catch (e) {
        console.error(e);
    }
});