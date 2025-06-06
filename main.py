from flask import Flask, render_template, request, redirect, jsonify
from telegram import Bot
import requests

from data import Data, Payments, Draws, Promocode, Vouchers, Give, FastPayments, FastMembers
#asfd

app = Flask(__name__)
db = Data()
pay = Payments()
draws = Draws()
promo = Promocode()
voucher = Vouchers()
g = Give()
fast = FastPayments()
members = FastMembers()

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
@app.route('/case8')
def case_8():
    return render_template('case8.html')


@app.route('/case6')
def case_6():
    return render_template('case6.html')

@app.route('/case7')
def case_7():
    return render_template('case7.html')


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

@app.route('/freecase')
def freecase():
    return render_template('freecase.html')


# DRAWS
@app.route('/draw')
def draw():
    return render_template('draw.html')

@app.route('/drawpep')
def drawpep():
    return render_template('drawpep.html')


# CRASH
@app.route('/crash')
def crash():
    return render_template('crash.html')

@app.route('/mines')
def mines():
    return render_template('mines.html')

@app.route('/tickets')
def tickets():
    return render_template('tickets.html')

@app.route('/gives')
def gives():
    return render_template('gives.html')

@app.route('/give')
def give():
    return render_template('give.html')

# FAST DEPOSIT 
@app.route('/fastdeposit', methods=['POST'])
def fastDeposit():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        amount = req['amount']

        fast.AddPayment(user_id, amount)

        return ['True']
    except Exception as error:
        print(error)
        return ['Error']
    
@app.route('/takepartfast', methods=['POST'])
def takePartFast():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])

        members.SetMember(user_id)

        return ['True']
    except Exception as error:
        print(error)
        return ['Error']

@app.route('/getfastdeposits', methods=['POST'])
def getFastDeposits():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])

        totalPayments = fast.ReturnTotalPayments(user_id)
        membersTotal = members.ReturnMembersCount()

        return [totalPayments, membersTotal]
    
    except Exception as error:
        print(error)
        return ['Error']

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
        voucher.AddVoucher(refer_id)
        return 'True'
    except:
        user_id = int(req['user_id'])
        refer_id = 0

        db.Auth(user_id, refer_id)
        return 'False'

@app.route('/getfriendscount', methods=['POST'])
def getFriends():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        friends = db.GetReferralsCount(user_id)

        return [friends]
    except Exception as error:
        print(error)
        return ['Error']
    
@app.route('/getvouchers', methods=['POST'])
def getVouchersCount():
    req = request.get_json(force=True, silent=True)
    
    user_id = int(req['user_id'])
    vouchers = voucher.GetVouchCount(user_id)

    return [vouchers]
    
    
@app.route('/deletevoucher', methods=['POST'])
def deleteVoucher():
    req = request.get_json(force=True, silent=True)

    user_id = int(req['user_id'])
    vouchers = voucher.DeleteVoucher(user_id)

    return [vouchers]

@app.route('/getfriendscountandmembers', methods=['POST'])
def getFriendsAndMembers():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        friends = db.GetReferralsCount(user_id)
        members = draws.GetMembersCount('120325')

        return [friends, members]
    except Exception as error:
        print(error)
        return ['Error']

@app.route('/getuserincome', methods=['POST'])
def getUserInc():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        income = db.GetUserIncome(user_id)

        return [income]
    except Exception as error:
        print(error)
        return ['Error']

@app.route('/createtransaction', methods=['POST'])
def createTransaction():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        type = req['type']
        amount = req['amount']
        
        pay.NewPayment(user_id, type, amount)

        if type == 'deposit':
            prize = int(int(amount) / 10)
            db.RewardUser(db.GetRefer(user_id), prize)
        return 'True'

    except Exception as error:
        print(error)
        return 'False'
    
@app.route('/gettransactions', methods=['POST'])
def getTransaction():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        
        result = pay.GetHistory(user_id)
        print('SUCC')
        return [result]

    except Exception as error:
        print('ERROR')
        redirect('/')
        return 'False'
    
@app.route('/takepart', methods=['POST'])
def tp():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        draw_id = int(req['draw_id'])
        
        draws.TakePart(draw_id, user_id)

        return 'True'

    except Exception as error:
        print(error)
        return 'False'
    
@app.route('/ismember', methods=['POST'])
def checkIsMember():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        draw_id = int(req['draw_id'])
        
        status = draws.IsMember(user_id, draw_id)

        return [status]

    except Exception as error:
        print(error)
        return 'False'


@app.route('/check_promo', methods=['POST'])
def checkPromo():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        promo_code = req['promo_code']
        
        status = promo.ActivatePromocode(promo_code, user_id)

        return [status]

    except Exception as error:
        print(error)
        return 'False'

@app.route('/give_info', methods=['POST'])
def giveInfo():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        prize = req['prize']
        
        status = g.ReturnInfo(user_id, prize)

        print(status)
        return status
        

    except Exception as error:
        print(error)
        return 'False'
    
@app.route('/give_buy', methods=['POST'])
def giveBuyTicket():
    req = request.get_json(force=True, silent=True)
    try:
        user_id = int(req['user_id'])
        prize = req['prize']
        
        status = g.BuyTicket(user_id, prize)
        return True
    except:
        return False

if __name__ == '__main__':
    app.run()
    #sd
