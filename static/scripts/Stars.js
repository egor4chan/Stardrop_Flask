function generate_payload(price) {
    try {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', `https://egor4chan-stardrop-flask-ef79.twc1.net/generate-invoice${price}`, true);
    
        httpRequest.onprogress = function () {
          if (httpRequest.status >= 200 && httpRequest.status < 300) {
            const invoiceLink = httpRequest.response;
    
            if (window.Telegram && window.Telegram.WebApp) {
              
              window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
                if (status === 'paid') {
                  send_notify('Successful!')
                  get_transaction(Number(document.getElementById('dep_count').value))
                  abort()
                } else if (status === 'cancelled') {
                  send_notify('Payment cancelled. Try again!')
                } else {
                  send_notify('Payment cancelled. Try again!')
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