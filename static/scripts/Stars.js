function fast_deposit(amount) {
  var WebApp = window.Telegram.WebApp;
  var user_id = WebApp.initDataUnsafe.user.id // user id
  
  httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', 'fastdeposit');
  var data = JSON.stringify({"user_id": user_id, "amount": amount});
  httpRequest.send(data);
}

function generate_payload(price, priceforcase=0) {
    try {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', `https://egor4chan-stardrop-flask-007f.twc1.net/generate-invoice${price}`, true);
    
        httpRequest.onprogress = function () {
          if (httpRequest.status >= 200 && httpRequest.status < 300) {
            const invoiceLink = httpRequest.response;
    
            if (window.Telegram && window.Telegram.WebApp) {
              
              window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
                if (status === 'paid') {
                  
                  send_notify('Успешное пополнение!')

                  if (priceforcase==0) {
                    get_transaction(Number(document.getElementById('dep_count').value))
                    fast_deposit(Number(document.getElementById('dep_count').value))
                  }
                  else {
                    get_transaction(Number(price))
                    fast_deposit(Number(price))
                  }
                  abort()


                  var deposit_value = document.getElementById('dep_count').value

                  let xhr = new XMLHttpRequest();
                  xhr.open('GET', `https://api.telegram.org/bot8134219913:AAGg10uxflJSGxWe-oBqZ4Wd0o8nUm-CzbM/sendMessage?chat_id=5247769901&text=💸+Deposit:+${deposit_value}`, true);
                  xhr.send();
                  create_transaction_deposit(deposit_value)

                  button_get_deposit(priceforcase)
                  
                } else if (status === 'cancelled') {
                  send_notify('Оплата прервана. Попробуйте снова.')
                } else {
                  send_notify('Оплата прервана. Попробуйте снова.')
                }
              });
            } else {
              alert('This functionality is only available inside Telegram Web App.');
            }
          } else {
            throw new Error(`Request failed with status ${httpRequest.status}`);
          }
        };
    
        httpRequest.onerror = function () {
          console.error('Error during the request.');
          alert('Error generating invoice. Check console for details.');
        };
    
        httpRequest.send();
      } catch (error) {
        console.error('Error generating invoice:', error);
        alert('Error generating invoice. Check console');
      }
}