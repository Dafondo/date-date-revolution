from flask import Flask, render_template, session
from . import app


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route("/")
def index():
    """Reached the homepage of the site"""
    return render_template("login.html")

@app.route("/ddr")
def ddr():
	return render_template("ddr.html", name = "", pic_url = "")

@app.route("/matches")
def matches():
	return render_template("matches.html", name = "", pic_url = "")
