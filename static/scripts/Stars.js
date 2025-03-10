function generate_payload(price) {
    try {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', `https://egor4chan-void-flask-9155.twc1.net/generate-invoice${price}`, true);
    
        httpRequest.onprogress = function () {
          if (httpRequest.status >= 200 && httpRequest.status < 300) {
            const invoiceLink = httpRequest.response;
    
            if (window.Telegram && window.Telegram.WebApp) {
              
              window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
                if (status === 'paid') {
                  alert('Payment successful!');
                } else if (status === 'cancelled') {
                  console.log('payment cancelled')
                } else {
                  console.log('payment cancelled or else')
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
        alert('Error generating invoice. Check console for details.');
      }
}