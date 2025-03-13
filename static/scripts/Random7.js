function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function get_filename_winner() {
    
var cf = 100 / randomInteger(1, 100) // 120 - максимаьный икс в первом кейсе
cf = cf.toFixed(2) // коэффициент

var caseFor500 = {1: 30, 2: 50, 3: 150, 4: 500, 5: 1500, 6: 3000, 7: 5000, 8: 7500}

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
    if (session(75, cf, itemPrice) == true) {
        allWinItems.push(itemPrice)
        lastWinItem = itemPrice;
    } 
    else {
        break
    }
}

//allWinItems = [allWinItems[allWinItems.length-2], allWinItems[allWinItems.length-1]]
if (allWinItems.length == 4) {
    allWinItems = [allWinItems[allWinItems.length-3], allWinItems[allWinItems.length-2], allWinItems[allWinItems.length-1]]
}
if (allWinItems.length == 5) {
    allWinItems = [allWinItems[allWinItems.length-4], allWinItems[allWinItems.length-3], allWinItems[allWinItems.length-2], allWinItems[allWinItems.length-1]]
}
if (allWinItems.length == 6) {
    allWinItems = [allWinItems[allWinItems.length-5], allWinItems[allWinItems.length-4], allWinItems[allWinItems.length-3], allWinItems[allWinItems.length-2], allWinItems[allWinItems.length-1]]
}
if (allWinItems.length == 7) {
    allWinItems = [allWinItems[allWinItems.length-5], allWinItems[allWinItems.length-4], allWinItems[allWinItems.length-3], allWinItems[allWinItems.length-2], allWinItems[allWinItems.length-1]]
}
if (allWinItems.length == 8) {
    allWinItems = [allWinItems[allWinItems.length-5], allWinItems[allWinItems.length-4], allWinItems[allWinItems.length-3], allWinItems[allWinItems.length-2], allWinItems[allWinItems.length-1]]
}

console.log(lastWinItem) // цена максимально доступного выигранного подарка
console.log(allWinItems) // список всех доступных items выигранных по коэф

var winIndex = randomInteger(0, allWinItems.length-1)
var win_price = allWinItems[winIndex] // окончательная цена приза

console.log(' won item priced ', win_price)

var fileName

if (win_price == 30) {
    fileName = '1.png'
}
if (win_price == 50) {
    fileName = '2.png'
}
if (win_price == 150) {
    fileName = '3.png'
}
if (win_price == 500) {
    fileName = '4.png'
}

if (win_price == 1500) {
    fileName = '5.png'
}
if (win_price == 3000) {
    fileName = '6.png'
}
if (win_price == 5000) {
    fileName = '7.png'
}
if (win_price == 7500) {
    fileName = '8.png'
}


return [fileName, win_price]
}