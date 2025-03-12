var WebApp = window.Telegram.WebApp;
var user_id = WebApp.initDataUnsafe.user.id
var user_status 

function sub() {
    const url = 'https://t.me/Stardrop_Official'
    location.href = url;
}

function point_move(members) {
    let pointbar = document.getElementById('point')
    let p = String((Number(members)/500)*100)
    pointbar.style.width = p + '%'
    console.log(p)
}


function visual_status() {
    var visual_status_user = 0
    if (window.localStorage.getItem('drawStatus') == undefined)
        window.localStorage.setItem('drawStatus', 0)
       
    if (window.localStorage.getItem('drawStatus') == 1) 
        visual_status_user = 1

    return visual_status_user
}



function ready_check(vs) {
    // получить информацию о приглашенных
    console.log('ready_check()')
    if (vs == 0) {

    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'getfriendscountandmembers');
    var data = JSON.stringify({"user_id": user_id}); // !!!!!!!!!!!!!!!!!!!!

    httpRequest.send(data) 

    httpRequest.onprogress = function() {
        var response = httpRequest.response;
        var result = JSON.parse(response)
        var friends_count = result[0]
        var members_count = result[1]

        document.getElementById('membersCount').innerHTML = members_count
        point_move(members_count)
        
        if (Number(friends_count) >= 5) {
            console.log('User have 5 friends or more.')
            document.getElementById('takepart').style.backgroundColor = 'white';
            document.getElementById('takepart').setAttribute('onclick', 'take_part()')
        }
        else {
            console.log('User dont have 5 friends.', friends_count)
            document.getElementById('takepart').setAttribute('onclick', 'send_notify("Условия не выполнены.")')
        }
    }
    }
    else {
        document.getElementById('takepart').style.backgroundColor = 'rgb(223, 223, 223)';
        document.getElementById('takepart').setAttribute('onclick', '')
        document.getElementById('takepart').innerHTML = 'Вы участвуете'

        httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'getfriendscountandmembers');
        var data = JSON.stringify({"user_id": user_id}); // !!!!!!!!!!!!!!!!!!!!

        httpRequest.send(data) 

        httpRequest.onprogress = function() {
            var response = httpRequest.response;
            var result = JSON.parse(response)
            var friends_count = result[0]
            var members_count = result[1]

            document.getElementById('membersCount').innerHTML = members_count 
            point_move(members_count)
        }
    }
}

function take_part() {
    window.localStorage.setItem('drawStatus', 1)
    document.getElementById('takepart').style.backgroundColor = 'rgb(223, 223, 223)';
    document.getElementById('takepart').setAttribute('onclick', '')
    document.getElementById('takepart').innerHTML = 'Вы участвуете'
    send_notify('Вы участвуете в розыгрыше!')
    document.getElementById('membersCount').innerHTML = Number(document.getElementById('membersCount').innerHTML) + 1
    
    // занести в бд
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'takepart');
    var data = JSON.stringify({"user_id": user_id, "draw_id": '120325'}); // !!!!!!!!!!!!!!!!!!!!

    httpRequest.send(data) 
}

setTimeout(() => {
    ready_check(visual_status())
}, 500);