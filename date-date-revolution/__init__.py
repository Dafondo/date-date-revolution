# import things necessary for the website
from flask import Flask

# this is just the app or some shit who knows really
app = Flask(__name__)

# import all the other shit now
from . import webview, config

# configure shit
app.secret_key = config.secret_key