function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function get_filename_winner() {
    
var cf = 120 / randomInteger(1, 120) // 120 - максимаьный икс в первом кейсе
cf = cf.toFixed(2) // коэффициент

var caseFor500 = {1: 100, 2: 150, 3: 200, 4: 1000, 5: 4000, 6: 5000, 7: 60000}

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
    if (session(500, cf, itemPrice) == true) {
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

if (win_price == 100) {
    fileName = '7.png'
}
if (win_price == 150) {
    fileName = '2.png'
}
if (win_price == 200) {
    fileName = '1.png'
}
if (win_price == 1000) {
    fileName = '6.png'
}
if (win_price == 4000) {
    fileName = '5.png'
}
if (win_price == 5000) {
    fileName = '3.png'
}
if (win_price == 60000) {
    fileName = '4.png'
}

return [fileName, win_price]
}
