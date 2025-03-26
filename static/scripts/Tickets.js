document.getElementById('m1').setAttribute('onclick', 'open_ticket(1)')
document.getElementById('m2').setAttribute('onclick', 'open_ticket(2)')
document.getElementById('m3').setAttribute('onclick', 'open_ticket(3)')
document.getElementById('m4').setAttribute('onclick', 'open_ticket(4)')
document.getElementById('m5').setAttribute('onclick', 'open_ticket(5)')
document.getElementById('m6').setAttribute('onclick', 'open_ticket(6)')
document.getElementById('m7').setAttribute('onclick', 'open_ticket(7)')
document.getElementById('m8').setAttribute('onclick', 'open_ticket(8)')
document.getElementById('m9').setAttribute('onclick', 'open_ticket(9)')


function open_ticket(ticket_number) {
    var div_id = `m${ticket_number}`
    document.getElementById(div_id).style = 'background-color: rgb(20, 20, 22);border-bottom: 3px solid rgb(6, 6, 7);'
    document.getElementById(div_id).style.animation = 'checks 0.6s forwards ease'
}