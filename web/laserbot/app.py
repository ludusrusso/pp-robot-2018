#!/usr/bin/env python
from flask import Flask, render_template, request, json
from users import Users, jdefault


app = Flask(__name__, static_folder='static', static_url_path='/static')

# Debug mode
app.debug = True

users = Users()

@app.route('/', methods=['GET','POST'])
def index():
	return render_template('index.html')

@app.route('/home', methods=['GET','POST'])
def home():
	return render_template('home.html')

@app.route('/about')
def about():
	return render_template('about.html')


@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    name = request.form['data']

    # TODO: check first available robot id
    robotN = 0
    #print("is ", name, " available = ", users.isNameAvailable(name))

    if users.isNameAvailable(name) :
    	users.addUser(name, robotN)
    	return json.dumps({'status':'OK','user':name})
    else :
	    return json.dumps({'status':'UNAVAILABLE','user':name})


@app.route('/signOutUser', methods=['POST'])
def signOutUser():
    name = request.form['data']

    if not users.isNameAvailable(name) :
        users.delUser(name)
        return json.dumps({'status':'OK','user':name})
    else :
        return json.dumps({'status':'UNREGISTERED','user':name})


@app.route('/listUsers', methods=['POST'])
def listUsers():    
    return json.dumps({'status':'OK','users':users.toString()}, default=jdefault)



if __name__ == '__main__':
	app.run()

