var WebApp = window.Telegram.WebApp;

function create_transaction_withdraw(withdraw_amount) {
    var user_id = WebApp.initDataUnsafe.user.id 
    var type = 'withdraw'
    var amount = withdraw_amount

    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'createtransaction');
    var data = JSON.stringify({"user_id": user_id, "type": type, "amount": amount});

    httpRequest.send(data) 
}