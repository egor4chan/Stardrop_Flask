var x = document.getElementById('x');
var bet = document.getElementById('betcount')
var betValue = document.getElementById('betcount').value


var coef = 1.01
var power = 0.005
var max_coef = 1 // итоговый кф

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function game_over(prize) {
    clearInterval(session)

    var button = document.getElementById('startcrash');
    button.setAttribute('onclick', `start_crash()`)
    button.innerHTML = 'Bet'
    bet.style.color = 'white'
    bet.removeAttribute('disabled');
    bet.value = betValue

    coef = 1.01
    power = 0.005
    max_coef = 1 // итоговый кф

    if (prize != 0) {
        alert(prize)
        send_notify('You won ' + prize + ' stars in Crash!')
        document.getElementById('profitlastgame').innerHTML = `+${prize}`
        document.getElementById('profitlastgame').style.color = 'rgb(23, 180, 23)';
        x.innerHTML = `+${prize} <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 45 44" fill="none"><g clip-path="url(#clip0_2247_45444)"><mask id="mask0_2247_45444" maskUnits="userSpaceOnUse" x="0" y="1" width="45" height="44" style="mask-type: luminance;"><path d="M44.5 1H0.5V45H44.5V1Z" fill="white"></path></mask><g mask="url(#mask0_2247_45444)"><mask id="mask1_2247_45444" maskUnits="userSpaceOnUse" x="2" y="3" width="41" height="40" style="mask-type: luminance;"><path d="M2.94531 3.44434H42.0564V42.5555H2.94531V3.44434Z" fill="white"></path></mask><g mask="url(#mask1_2247_45444)"><path d="M17.4633 15.5576L20.9763 8.55898C21.3825 7.75208 22.3651 7.42822 23.1665 7.83442C23.4794 7.9936 23.7319 8.25159 23.891 8.56996L27.212 15.3216C27.4809 15.876 28.0134 16.2493 28.6227 16.3206L35.5664 17.155C36.5106 17.2702 37.1857 18.132 37.076 19.0817C37.0266 19.4714 36.8509 19.8337 36.571 20.1081L31.0763 25.5259C30.8513 25.7455 30.747 26.0529 30.7854 26.3658L31.7021 33.6773C31.8338 34.7257 31.0928 35.6808 30.0499 35.8126C29.6546 35.862 29.2594 35.7906 28.9081 35.5985L23.1061 32.4258C22.6834 32.1952 22.1784 32.1897 21.7558 32.4093L15.7397 35.4942C14.8943 35.9278 13.8624 35.5875 13.4287 34.7367C13.2641 34.4183 13.2092 34.0615 13.2586 33.7102L13.7361 30.3509C13.9722 28.7096 14.9877 27.2824 16.4587 26.5304L23.1335 23.1217C23.3092 23.0338 23.3806 22.8143 23.2927 22.6331C23.2214 22.4959 23.0732 22.4136 22.9195 22.4355L14.7516 23.6102C13.5056 23.7859 12.2431 23.4346 11.2605 22.6331L8.54341 20.4155C7.76944 19.7843 7.64319 18.6316 8.27444 17.8521C8.57085 17.4898 8.99352 17.2538 9.4546 17.1934L16.4258 16.2987C16.8704 16.2383 17.2602 15.9638 17.4633 15.5576Z" fill="url(#paint0_linear_2247_45444)"></path><path d="M23.6454 9.80483C22.9373 9.64565 22.1853 9.98597 21.845 10.6666L18.3264 17.6653C18.1233 18.0715 17.7391 18.3459 17.289 18.4063L10.3178 19.3065C9.86765 19.3669 9.45596 19.5865 9.16504 19.9323L11.7449 22.0401C12.5573 22.7043 13.6112 22.9952 14.6487 22.847L22.811 21.6778C23.2941 21.612 23.7662 21.8535 23.9802 22.2871C24.2602 22.8415 24.0406 23.5222 23.4862 23.8076L21.3564 24.8945L23.7826 24.5432C23.9363 24.5212 24.09 24.6036 24.1559 24.7408C24.2492 24.9219 24.1723 25.1415 23.9967 25.2293L17.3219 28.6381C15.8508 29.3901 14.8353 30.8173 14.5993 32.4585L14.2864 34.6377C14.5718 34.9231 15.022 35 15.3952 34.8079L21.4003 31.723C22.0535 31.3881 22.8275 31.3991 23.4697 31.7504L29.2718 34.9231C29.4803 35.0384 29.7219 35.0823 29.9579 35.0549C30.5727 34.978 31.0173 34.4072 30.9405 33.7759L30.0293 26.4589C29.9634 25.91 30.15 25.3665 30.5398 24.9823L36.0344 19.5645C36.1277 19.4712 36.1991 19.3614 36.2485 19.2407L29.4858 18.4283C28.8765 18.3569 28.3496 17.9782 28.0751 17.4292L27.8117 16.8858C27.2572 16.6443 26.8016 16.2161 26.5272 15.6617L23.6454 9.80483Z" fill="url(#paint1_linear_2247_45444)"></path><path d="M23.5127 7.1492C22.327 6.55088 20.8889 7.02844 20.2961 8.21409L16.7775 15.2182C16.6897 15.3939 16.5195 15.5146 16.3274 15.5366L9.3562 16.4368C8.69751 16.5192 8.0937 16.8595 7.67653 17.3755C6.7818 18.4843 6.95196 20.1091 8.05528 21.0093L10.7779 23.2324C11.9251 24.1655 13.4017 24.5772 14.8618 24.3686L20.6309 23.5398L16.1078 25.8507C14.4117 26.718 13.248 28.3538 12.979 30.242L12.496 33.6014C12.4246 34.1119 12.507 34.6278 12.743 35.0889C13.3633 36.313 14.8673 36.8015 16.0914 36.1758L22.102 33.0909C22.2996 32.9866 22.5356 32.9921 22.7332 33.1019L28.5353 36.2691C29.0238 36.5381 29.5892 36.6478 30.1436 36.5765C31.6092 36.3899 32.6411 35.045 32.46 33.5849L31.5488 26.2679C31.5378 26.1965 31.5653 26.1197 31.6147 26.0703L37.1093 20.6525C37.51 20.2518 37.768 19.7303 37.8339 19.1704C37.9931 17.8036 37.027 16.5631 35.6602 16.3984L28.7109 15.5641C28.3651 15.5256 28.0577 15.3061 27.8985 14.9877L24.5831 8.23056C24.3525 7.76398 23.9738 7.38523 23.5127 7.1492ZM21.6629 8.90023C21.8769 8.47208 22.3984 8.30192 22.8211 8.51599C22.9857 8.59833 23.123 8.74105 23.2053 8.91121L26.5262 15.6629C26.9105 16.4478 27.6625 16.9803 28.5298 17.0845L35.479 17.9189C36.0005 17.9793 36.3738 18.4568 36.3134 18.9893C36.2859 19.2088 36.1871 19.4119 36.0334 19.5656L30.5388 24.9834C30.1491 25.3677 29.9624 25.9111 30.0283 26.46L30.9395 33.777C31.0164 34.4083 30.5717 34.9791 29.957 35.056C29.7209 35.0834 29.4794 35.0395 29.2708 34.9243L23.4688 31.7515C22.8266 31.4002 22.0526 31.3947 21.3994 31.7296L15.3888 34.8145C14.9222 35.0505 14.3513 34.8639 14.1098 34.3918C14.022 34.2162 13.989 34.0131 14.0165 33.8154L14.494 30.4616C14.6917 29.0673 15.5589 27.8542 16.805 27.2175L23.4798 23.8087C24.0397 23.5233 24.2592 22.8427 23.9793 22.2882C23.7597 21.8546 23.2931 21.6131 22.8101 21.679L14.6422 22.8481C13.6048 22.9963 12.5564 22.7054 11.744 22.0412L9.02686 19.8181C8.57675 19.4504 8.50539 18.7862 8.87316 18.3361C9.04332 18.1275 9.28485 17.9903 9.54832 17.9573L16.5195 17.0571C17.2221 16.9693 17.8314 16.5356 18.1498 15.9044L21.6629 8.90023Z" fill="url(#paint2_linear_2247_45444)"></path></g></g></g><defs><linearGradient id="paint0_linear_2247_45444" x1="22.4803" y1="7.65876" x2="22.4803" y2="35.829" gradientUnits="userSpaceOnUse"><stop stop-color="#FFF0C2"></stop><stop offset="1" stop-color="#FFEBBA"></stop></linearGradient><linearGradient id="paint1_linear_2247_45444" x1="22.7067" y1="9.76641" x2="30.4355" y2="35.0604" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD147"></stop><stop offset="1" stop-color="#FFB526"></stop></linearGradient><linearGradient id="paint2_linear_2247_45444" x1="22.4807" y1="6.89121" x2="29.2598" y2="36.593" gradientUnits="userSpaceOnUse"><stop stop-color="#E58F0D"></stop><stop offset="1" stop-color="#EB7814"></stop></svg>`
    }

    

    
}

function open_game() {
    var button = document.getElementById('startcrash');
    button.style.backgroundColor = 'rgb(255, 196, 0)';
    button.removeAttribute('disabled');
    
    button.innerHTML = 'Save'



    x.innerHTML = String(coef) + 'x'
    var session = setInterval(() => {
        if (coef < max_coef) {
            coef += power
            x.innerHTML = String(coef.toFixed(2)) + 'x'
            
            power += 0.0001
            bet.value = (betValue * coef).toFixed(0)
            button.setAttribute('onclick', `game_over(${bet.value})`)

        }
        else { // game over
            if (max_coef != 1)
            x.innerHTML = String(max_coef) + 'x'
            clearInterval(session)
            
            game_over(0)
            
        }
        
    }, 100);
}

function start_crash() {
    betValue = document.getElementById('betcount').value

    max_coef = (10000 / (randomInteger(1, 10000))).toFixed(2)
    console.log(max_coef)

    var button = document.getElementById('startcrash');
    button.style.backgroundColor = 'rgb(199, 142, 18)';
    button.setAttribute('disabled', 'true');
    button.innerHTML = 'Starting...'
    
    bet.style.color = 'grey'
    bet.setAttribute('disabled', 'true');

    x.innerHTML = 3;
    setTimeout(() => { // счетчик
        x.innerHTML = 2;
        setTimeout(() => {
            x.innerHTML = 1;
            setTimeout(() => {
                open_game() // начало игры
            }, 1000);
        }, 1000);
    }, 1000);
    
}