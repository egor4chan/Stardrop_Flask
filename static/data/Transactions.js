var WebApp = window.Telegram.WebApp;

// Передаем в main.py данные после нажатия на кнопку Вывод
function create_transaction_withdraw(withdraw_amount) {
    var user_id = WebApp.initDataUnsafe.user.id 
    var type = 'withdraw'
    var amount = withdraw_amount

    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'createtransaction');
    var data = JSON.stringify({"user_id": user_id, "type": type, "amount": amount});

    httpRequest.send(data) 
}

function create_transaction_deposit(deposit_amount) {
    var user_id = WebApp.initDataUnsafe.user.id 
    var type = 'deposit'
    var amount = deposit_amount

    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'createtransaction');
    var data = JSON.stringify({"user_id": user_id, "type": type, "amount": amount});

    httpRequest.send(data) 
}