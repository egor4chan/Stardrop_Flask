var WebApp = window.Telegram.WebApp;
var user_id = WebApp.initDataUnsafe.user.id;


function copy_link() {
    var link = `t.me/Stardrop_Gifts_bot?startapp=${user_id}`
    navigator.clipboard.writeText(link)
    send_notify('Ссылка скопирована.')
}