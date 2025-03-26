var prize = 250
var bet = 10
var user_id = 0

function reload_cursor() {
    var cursor = document.getElementById('cursorgift');
    width = (Number(document.getElementById('bank').innerHTML) / prize) * 100
    cursor.style.width = width + '%';
}

function reset_button() {
    var button = document.getElementById('bet-give')
    button.innerHTML = 'Розыгрыш проводится...'
}

function reload_values(user_tickets_count, bank_value, members_count) {
    document.getElementById('userbet').innerHTML = user_tickets_count * bet
    document.getElementById('bank').innerHTML = bank_value * bet
    document.getElementById('members').innerHTML = members_count
    
    document.getElementById('chance').innerHTML = user_tickets_count * 4

    reload_cursor()
}

function button_disabled() {
    var button = document.getElementById('bet-give')
    button.setAttribute('disabled', 'true')
    button.style = "opacity: 0.8"

    setTimeout(() => {
        button.removeAttribute('disabled')
        button.style = "opacity: 1"
    }, 1000);
}

function buy_ticket_on_server(user_id, prize) {
    
    setTimeout(() => {
        httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'give_buy');
        var data = JSON.stringify({"user_id": user_id, 'prize': prize});
    
        httpRequest.send(data) 
    }, 300);
}

function buy_ticket(bet) {
    button_disabled()
    if (Number(document.getElementById('bank').innerHTML) < prize) {
        if (get_user_balance() >= bet) {
            if (Number(document.getElementById('chance').innerHTML) > 100) { // 80%
                send_notify('Вы сделали максимальное количество ставок!')
            }
                
            else {
                buy_ticket_on_server(user_id, prize)
                send_transaction(bet)
                var bank = document.getElementById('bank');
                var chance = document.getElementById('chance');
                var userbet = document.getElementById('userbet');

                
                bank.innerHTML = Number(bank.innerHTML) + bet
                chance.innerHTML = Number(chance.innerHTML) + 4
                userbet.innerHTML = Number(userbet.innerHTML) + bet
                reload_cursor()
                
                send_notify('Успешно!')
                log_ticket_buy(bet)

                if (Number(document.getElementById('bank').innerHTML) == 250)
                    reset_button()

                if (userbet.innerHTML == bet) 
                    document.getElementById('members').innerHTML = Number(document.getElementById('members').innerHTML) + 1
            }
        }
        else {
            send_notify('Недостаточно средств...')
        }
    }

    else {
        reset_button()
        send_notify('Банк переполнен. Скоро объявим победителя...')
    }
}

function server_set_info(user_id, prize) {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'give_info');
    var data = JSON.stringify({"user_id": user_id, 'prize': prize});

    httpRequest.send(data) 
 
    httpRequest.onprogress = function() {
        var response = httpRequest.response;
        var result = JSON.parse(response)
        
        var user_tickets_count = result[0]
        var bank_value = result[1]
        var members_count = result[2]

        reload_values(user_tickets_count, bank_value, members_count)
    }
}

server_set_info(user_id, 250)

setInterval(() => {
    server_set_info(user_id, 250)
    console.log('SUCCESS')
}, 3000);

reload_cursor()
