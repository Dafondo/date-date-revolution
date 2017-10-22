from flask import Flask, render_template, session
from . import app

@app.route("/")
def index():
    """Reached the homepage of the site"""
    return render_template("index.html")

