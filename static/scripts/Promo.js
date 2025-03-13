var promoInput = document.getElementById('promoinput')
var okButton = document.getElementById('okbtn')

promoInput.oninput = function() {
    okButton.style = 'background: linear-gradient(45deg, rgb(255, 196, 0), rgb(255, 136, 0));border-bottom: 3px solid rgb(255, 136, 0);'
    okButton.removeAttribute('disabled')

    if (promoInput.value == '') {
        okButton.style = 'background: linear-gradient(45deg, rgb(197, 151, 0), rgb(196, 104, 0));border-bottom: 3px solid rgb(199, 106, 0);'
        okButton.setAttribute('disabled', 'true')
    } 
}


function disable_btn() {
    okButton.style = 'background: linear-gradient(45deg, rgb(197, 151, 0), rgb(196, 104, 0));border-bottom: 3px solid rgb(199, 106, 0);'
    okButton.setAttribute('disabled', 'true')
}

function check_promo() {
    promo_back()

    var WebApp = window.Telegram.WebApp;
    var user_id = WebApp.initDataUnsafe.user.id;

    disable_btn()
    setTimeout(() => {
        let promo_code = promoInput.value;
        httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'check_promo');
        var data = JSON.stringify({"user_id": user_id, 'promo_code': promo_code});

        httpRequest.send(data) 
     
        httpRequest.onprogress = function() {
            var response = httpRequest.response;
            var result = JSON.parse(response)
            
            if (result == 'nopromo') {
                send_notify('Такого промокода нет!')
                promoInput.value = ''
            }
            if (result == 'activated') {
                send_notify('Вы уже активировали этот промокод.')
                promoInput.value = ''
            }
            if (result == 'notactive') {
                send_notify('Промокод закончился :(')
                promoInput.value = ''
            }
            else {
                if (Number(result)) {
                    get_transaction(Number(result))
                    promo_activated()
                    send_notify(`Промокод активирован!`)
                    promoInput.value = ''
                }
            }
        }
    }, 500);
}
