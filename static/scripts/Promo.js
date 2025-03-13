var promoInput = document.getElementById('promoinput')
var okButton = document.getElementById('okbtn')

promoInput.oninput = function() {
    okButton.style = 'background-color: rgb(255, 196, 0);border-bottom: 3px solid rgb(172, 107, 10);'
    okButton.removeAttribute('disabled')

    if (promoInput.value == '') {
        okButton.style = 'background-color: rgb(197, 151, 0);border-bottom: 3px solid rgb(136, 85, 7);'
        okButton.setAttribute('disabled', 'true')
    } 
}

function check_promo() {
    promo_true = 0
    if (promo_true == 0) {
        promoInput.value = ''
        send_notify('Промокода не существует')
        okButton.style = 'background-color: rgb(197, 151, 0);border-bottom: 3px solid rgb(136, 85, 7);'
        okButton.setAttribute('disabled', 'true')
    }

    else {
        promoInput.value = ''
        send_notify('Промокод активирован!')
        okButton.style = 'background-color: rgb(197, 151, 0);border-bottom: 3px solid rgb(136, 85, 7);'
        okButton.setAttribute('disabled', 'true')
    }
}