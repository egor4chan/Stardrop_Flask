document.getElementById('spin').style.backgroundColor = 'rgb(27, 27, 27)';
document.getElementById('spin').style.borderBottom = '3px solid rgb(17, 17, 17)';
document.getElementById('spin').style.animation = 'none'

function button_get_vouchers(price_for_spin) {
    let vouchers_count = price_for_spin

    if (Number(vouchers_count) == 0) {
        let spinButton = document.getElementById('spin')

        spinButton.innerHTML = `Пригласить 1 друга`;
        spinButton.setAttribute('onclick', 'locate("/frens")')
        spinButton.style.backgroundColor = 'rgb(27, 27, 27)';
        spinButton.style.borderBottom = '3px solid rgb(17, 17, 17)';
        spinButton.style.animation = 'none'
    
    }
    else {
        document.getElementById('spin').style.backgroundColor = 'rgb(255, 196, 0)'
        document.getElementById('spin').style.borderBottom = '3px solid rgb(207, 159, 0)'
    }
}

function minus_voucher() {
    document.getElementById('free-try').innerHTML = Number(document.getElementById('free-try').innerHTML) - 1
}

function get_user_vouchers() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'getvouchers');
    var data = JSON.stringify({"user_id": 101});

    httpRequest.send(data) 
 
    httpRequest.onprogress = function() {
        var response = httpRequest.response;
        var result = JSON.parse(response)
        

        document.getElementById('free-try').innerHTML = result
        button_get_vouchers(document.getElementById('free-try').innerHTML)
    }
}


get_user_vouchers()

