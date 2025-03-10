function send_notify(message) {
    var notify = document.createElement('div')
    document.body.appendChild(notify)
    notify.setAttribute('class', 'notify')
    notify.innerHTML = message;

    setTimeout(() => {
        notify.style.top = '100px'
    }, 10);

    setTimeout(() => {
        notify.style.top = '-100px'
    }, 2000);

    setTimeout(() => {
        notify.remove()
    }, 3000);

}