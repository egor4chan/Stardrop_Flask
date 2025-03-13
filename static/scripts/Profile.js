function deposit() {
    var backScreen = document.getElementById('screen')
    backScreen.style.opacity = 0.5;
    backScreen.style.zIndex = 100;

    var depoWindow = document.getElementById('deposit-window')
    depoWindow.style.top = 'calc(50% - 200px)'
    depoWindow.style.opacity = 1;
}

function abort() {
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
    var backScreen = document.getElementById('screen')
    backScreen.style.opacity = 0.5;
    backScreen.style.zIndex = 100;

    var depoWindow = document.getElementById('withdraw-window')
    depoWindow.style.top = 'calc(50% - 200px)'
    depoWindow.style.opacity = 1;
}

function promo_vvod() {
    window.scrollTo(0, 200)
}

function promo_back() {
    window.scrollTo(0, 0)
}



function create_withdraw() {
    // снять звезды с баланса
    
    send_notify('Успешно!')
    abort()
}