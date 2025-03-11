var WebApp = window.Telegram.WebApp;
//var user_id = WebApp.initDataUnsafe.user.id // user id

var userDataReferals = document.getElementById('user-data-referals')
var userDataIncome = document.getElementById('user-data-income')

function setDataRef() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'getfriendscount');
    var data = JSON.stringify({"user_id": 5247769901});

    httpRequest.send(data) 
     
    httpRequest.onprogress = function() {
        var response = httpRequest.response;
        var result = JSON.parse(response)
        userDataReferals.innerHTML = result
    }
}

function setDataInc() {
    setTimeout(() => {
        httpRequest1 = new XMLHttpRequest();
        httpRequest1.open('POST', 'getuserincome');
        var data = JSON.stringify({"user_id": 5247769901});

        httpRequest1.send(data) 
     
        httpRequest1.onprogress = function() {
            var response = httpRequest1.response;
            var result = JSON.parse(response)
            userDataIncome.innerHTML = result
        }
    }, 500);
    
}

setDataRef()
setDataInc()

