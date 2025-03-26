var WebApp = window.Telegram.WebApp;
var user_id = WebApp.initDataUnsafe.user.id

if (window.localStorage.getItem('drawpepe') == null) {
    console.log('Not a member')
    var button = document.getElementById('bet-give')
    button.style.opacity = 1
}

else {
    console.log('Member')
    var button = document.getElementById('bet-give')
    button.innerHTML = 'Вы участвуете'
    button.setAttribute('disabled', 'true')
}

function reload_cursor() {
    var cursor = document.getElementById('cursorgift');
    width = (Number(document.getElementById('bank').innerHTML) / 200) * 100
    cursor.style.width = width + '%';
}

totalDeposits = 0

function data_check() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'getfastdeposits');
    var data = JSON.stringify({"user_id": user_id});

    httpRequest.send(data) 
 
    httpRequest.onprogress = function() {
        var response = httpRequest.response;
        var result = JSON.parse(response)
        
        document.getElementById('members').innerHTML = result[1]
        document.getElementById('bank').innerHTML = result[1]
        document.getElementById('dep24').innerHTML = result[0]

        totalDeposits = Number(result[0])

        reload_cursor()

        if (Number(result[0]) < 100) {
            button.style.opacity = 0.8
        }

    }
}

function take_part() {
    if (totalDeposits >= 100) {
        window.localStorage.setItem('drawpepe', 1)
        send_notify('Вы участвуете!')
        var button = document.getElementById('bet-give')
        button.innerHTML = 'Вы участвуете'
        button.style.opacity = 0.8
        button.setAttribute('disabled', 'true')

        document.getElementById('members').innerHTML = Number(document.getElementById('members').innerHTML) + 1
        document.getElementById('bank').innerHTML = Number(document.getElementById('bank').innerHTML) + 1
        reload_cursor()

        httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'takepartfast');
        var data = JSON.stringify({"user_id": user_id});

        httpRequest.send(data) 
    }
    else {
        send_notify('Вы не выполнили условие розыгрыша.')
    }
}

data_check()
reload_cursor()