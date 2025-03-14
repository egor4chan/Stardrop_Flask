function set_user_balance(value=0) {
    console.log('EVENT set_user_balance()')
    window.localStorage.setItem('user_balance', value)
}

function get_user_balance() {
    console.log('EVENT get_user_balance()')
    return window.localStorage.getItem('user_balance')
}

function set_html_user_balance() { 
    document.getElementById('balance-count').innerHTML = get_user_balance()
}

function send_transaction(value) { // списать деньги
    set_user_balance((Number(get_user_balance()) - Number(value)).toFixed(0))
    set_html_user_balance()
}

function get_transaction(value) { // зачислить д
    set_user_balance((Number(get_user_balance()) + Number(value)).toFixed(0))
    set_html_user_balance()
}

function locate(src){
    var WebApp = window.Telegram.WebApp;
    WebApp.HapticFeedback.impactOccurred('light')
    location.href = src;
}
set_html_user_balance()
document.getElementById('tlink').setAttribute('onclick', 'locate("https://t.me/Stardrop_Official")')


if (get_user_balance() == null) { // если пользователь не зарегистрирован
    set_user_balance()
}

//set_user_balance(0)


