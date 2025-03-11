from flask import Flask, render_template, request
from telegram import Bot
import requests

from data import Data


app = Flask(__name__)
db = Data()

TELEGRAM_TOKEN = "7662681489:AAHdPwn1v9nQxPvxp8lVutN7S_C5wPDUgEk"
API_URL = f'https://api.telegram.org/bot{TELEGRAM_TOKEN}/'

bot = Bot(token=TELEGRAM_TOKEN)
paid_users = {}

# START
@app.route('/start')
def start():
    return render_template('start.html')

# NAV BAR

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/frens')
def frens():
    return render_template('frens.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

# CASES
@app.route('/case6')
def case_6():
    return render_template('case6.html')


@app.route('/case5')
def case_5():
    return render_template('case5.html')

@app.route('/case')
def case():
    return render_template('case.html')

@app.route('/case2')
def case_2():
    return render_template('case2.html')

@app.route('/case3')
def case_3():
    return render_template('case3.html')

@app.route('/case4')
def case_4():
    return render_template('case4.html')

# CRASH
@app.route('/crash')
def crash():
    return render_template('crash.html')

# STARS
def generate_invoice(price):
    title = "Deposit"
    description = "Instant stars deposit."
    payload = "{}"
    currency = "XTR"  # Telegram Stars
    prices = [{'label': 'Deposit', 'amount': int(price)}]

    params = {
        'title': title,
        'description': description,
        'payload': payload,
        'currency': currency,
        'prices': prices
    }

    response = requests.post(API_URL + 'createInvoiceLink', json=params)
    print(response.json())

    if response.status_code == 200:
        res = response.json()
        return res["result"]
    else:
        return {'error': 'Failed to create invoice'}

@app.route('/generate-invoice<price>', methods=['GET'])
def generate_invoice_route(price):
    invoice_data = generate_invoice(price)

    return invoice_data

@app.route('/payment-success', methods=['POST'])
def payment_success():
    data = request.json
    user_id = data.get('user_id')
    payment_info = data.get('payment_info')

    if user_id and payment_info:
        paid_users[user_id] = payment_info

        return jsonify({'status': 'success', 'message': 'Payment received!'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid payment data'}), 400

# DATA 
@app.route('/auth', methods=['POST'])
def auth_user():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        refer_id = int(req['refer_id'])
        
        db.Auth(user_id, refer_id)
        return 'True'
    except:
        user_id = int(req['user_id'])
        refer_id = 0

        db.Auth(user_id, refer_id)
        return 'False'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')