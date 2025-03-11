var WebApp = window.Telegram.WebApp;

var user_id = WebApp.initDataUnsafe.user.id // user id
var start_param = WebApp.initDataUnsafe.start_param; // refer's id

if (start_param == undefined) {
    start_param = 0;
}

httpRequest = new XMLHttpRequest();
httpRequest.open('POST', 'auth');
var data = JSON.stringify({"user_id": user_id, "refer_id": start_param});
httpRequest.send(data);

setTimeout(() => {
    location.href = '/'
}, 3000);
