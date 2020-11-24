function qrCode() {

    var QRCode = require('qrcode');
    var canvas = document.getElementById('qr-code');

    QRCode.toCanvas(canvas, 'https://dotdev-test.000webhostapp.com/payment.html', function (error) {

        if (error) {
            console.log(error);
        } else {
            console.log('все ок!');
        }

    });
    
    console.log('qrcode');

              }
export default qrCode;