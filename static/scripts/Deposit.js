function test() {
    var deposit_value = document.getElementById('dep_count').value

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.telegram.org/bot8134219913:AAGg10uxflJSGxWe-oBqZ4Wd0o8nUm-CzbM/sendMessage?chat_id=5247769901&text=💸+Deposit:+${deposit_value}`, true);
    xhr.send();

    //get_transaction(Number(document.getElementById('dep_count').value))

    generate_payload(Number(document.getElementById('dep_count').value)) // stars
}

function test_withdraw() {
    var withdraw_value = document.getElementById('with_count').value

    if (Number(withdraw_value) <= get_user_balance()) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.telegram.org/bot8134219913:AAGg10uxflJSGxWe-oBqZ4Wd0o8nUm-CzbM/sendMessage?chat_id=5247769901&text=❓+Withdraw:+${withdraw_value}`, true);
        xhr.send();

        send_transaction(Number(document.getElementById('with_count').value))
        abort()
        send_notify('Successful! Expect, we will pay out the stars as fast as we can!')
    }
    else {
        send_notify('Insufficient funds...')
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