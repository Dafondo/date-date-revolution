from flask import Flask, render_template
from . import app

@app.route("/")
def index():
    """Reached the homepage of the site"""
    return render_template("login.html")

@app.route("/ddr")
def ddr():
	return render_template("ddr.html", name = "", pic_url = "")