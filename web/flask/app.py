#!/usr/bin/env python

from flask import Flask, render_template

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Debug mode
app.debug = True

@app.route('/', methods=['GET','POST'])
def index():
	return render_template('index.html')

@app.route('/home', methods=['GET','POST'])
def home():
	return render_template('home.html')

@app.route('/about')
def about():
	return render_template('about.html')

if __name__ == '__main__':
	app.run()

