from flask import Flask, render_template

app = Flask(__name__)

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')