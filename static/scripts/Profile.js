function Haptic() {
    var WebApp = window.Telegram.WebApp;
    WebApp.HapticFeedback.impactOccurred('light')
}


function deposit() {
    Haptic()
    var backScreen = document.getElementById('screen')
    backScreen.style.opacity = 0.5;
    backScreen.style.zIndex = 100;

    var depoWindow = document.getElementById('deposit-window')
    depoWindow.style.top = 'calc(50% - 200px)'
    depoWindow.style.opacity = 1;
}

function abort() {
    window.scrollTo(0, 0)
    var backScreen = document.getElementById('screen')
    backScreen.style.opacity = 0;
    backScreen.style.zIndex = -2;

    var depoWindow = document.getElementById('deposit-window')
    depoWindow.style.top = '-60%'
    depoWindow.style.opacity = 0;


    var depoWindow = document.getElementById('withdraw-window')
    depoWindow.style.top = '-60%'
    depoWindow.style.opacity = 0;

    var promoblock = document.getElementById('promoblock')
    promoblock.style.top = '146px'
    promoblock.style.zIndex = 1
}

function withdraw() {
    Haptic()
    var backScreen = document.getElementById('screen')
    backScreen.style.opacity = 0.5;
    backScreen.style.zIndex = 100;

    var depoWindow = document.getElementById('withdraw-window')
    depoWindow.style.top = 'calc(50% - 200px)'
    depoWindow.style.opacity = 1;
}

function promo_vvod() {
    Haptic()
    window.scrollTo(0, 200)
    var promoblock = document.getElementById('promoblock')
    promoblock.style.zIndex = 1000
    var backScreen = document.getElementById('screen')
    backScreen.style.opacity = 0.5;
    backScreen.style.zIndex = 100;
}

function promo_back() {
    window.scrollTo(0, 0)
    abort()
}



function create_withdraw() {
    // снять звезды с баланса
    
    send_notify('Успешно!')
    abort()
}