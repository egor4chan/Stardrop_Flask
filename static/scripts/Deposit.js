function test() {
    //get_transaction(Number(document.getElementById('dep_count').value))

    generate_payload(Number(document.getElementById('dep_count').value)) // stars
}

function test_withdraw() {
    var withdraw_value = document.getElementById('with_count').value

    if (Number(withdraw_value) <= get_user_balance()) {
        if (Number(withdraw_value) >= 100) {
            let xhr = new XMLHttpRequest();
            let username = window.localStorage.getItem('username')
            xhr.open('GET', `https://api.telegram.org/bot8134219913:AAGg10uxflJSGxWe-oBqZ4Wd0o8nUm-CzbM/sendMessage?chat_id=5247769901&text=❓+Withdraw:+${withdraw_value} (@${username})`, true);
            xhr.send();

            send_transaction(Number(document.getElementById('with_count').value))
            abort()
            send_notify('Выплата создана. Мы пополним Ваш баланс звездами в течение ближайшего времени.') 
            create_transaction_withdraw(withdraw_value)  
        }
        else {
            send_notify('Вывод доступен от 100 звезд.')
        }
    }
    else {
        send_notify('Недостаточный баланс...')
    }
}

function log_opened(profit, price) {
    if (profit >= 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.telegram.org/bot8134219913:AAGg10uxflJSGxWe-oBqZ4Wd0o8nUm-CzbM/sendMessage?chat_id=5247769901&text=⭐️+Profit:+${profit} (Case ${price})`, true);
        xhr.send();
    }
    else {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.telegram.org/bot8134219913:AAGg10uxflJSGxWe-oBqZ4Wd0o8nUm-CzbM/sendMessage?chat_id=5247769901&text=❗️+Lose:+${profit} (Case ${price})`, true);
        xhr.send();
    }
}