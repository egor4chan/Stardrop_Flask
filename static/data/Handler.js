var WebApp = window.Telegram.WebApp;
var user_id = WebApp.initDataUnsafe.user.id // user id
var userDataReferals = document.getElementById('user-data-referals')
var userDataIncome = document.getElementById('user-data-income')

httpRequest = new XMLHttpRequest();
httpRequest.open('POST', 'getfriendscount');
var data = JSON.stringify({"user_id": user_id});

httpRequest.send(data) 
     
httpRequest.onprogress = function() {
    var response = httpRequest.response;
    var result = JSON.parse(response)
    userDataReferals.innerHTML = result
}




httpRequest = new XMLHttpRequest();
httpRequest.open('POST', 'getuserincome');
var data = JSON.stringify({"user_id": user_id});

httpRequest.send(data) 
     
httpRequest.onprogress = function() {
    var response = httpRequest.response;
    var result = JSON.parse(response)
    userDataIncome.innerHTML = result
}