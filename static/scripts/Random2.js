function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function get_filename_winner() {
    
var cf = 50 / randomInteger(1, 50) // 120 - максимаьный икс в первом кейсе
cf = cf.toFixed(2) // коэффициент

var caseFor500 = {1: 30, 2: 50, 3: 50, 4: 500, 5: 3000, 6: 5000}

function session(casePrice, cf, item) {
    if ((casePrice * cf) >= item) {
        console.log('Win ', cf, item)
        return true
    }
    else {
        console.log('Lose ', cf, item)
    }
}

var allWinItems = []
for (var i = 1; i != 8; i++) {
    var itemPrice = caseFor500[i]
    var lastWinItem
    if (session(100, cf, itemPrice) == true) {
        allWinItems.push(itemPrice)
        lastWinItem = itemPrice;
    } 
    else {
        break
    }
}

console.log(lastWinItem) // цена максимально доступного выигранного подарка
console.log(allWinItems) // список всех доступных items выигранных по коэф

var winIndex = randomInteger(0, allWinItems.length-1)
var win_price = allWinItems[winIndex] // окончательная цена приза

console.log('You won item priced ', win_price)

var fileName

if (win_price == 30) {
    fileName = '6.png'
}
if (win_price == 50) {
    if (randomInteger(1, 2) == 1) {
        fileName = '1.png'
    }
    else {
        fileName = '2.png'
    }
}
if (win_price == 500) {
    fileName = '3.png'
}
if (win_price == 3000) {
    fileName = '5.png'
}
if (win_price == 5000) {
    fileName = '4.png'
}


return [fileName, win_price]
}