To set this up for development, do the following:
1) cd into the top directory (i.e. date-date-revolution)
2) create a virtual environment in this directory with "virtualenv venv>"
3) Activate the virtual environment (i.e. source venv/bin/activate)
4) install the requirements (i.e. pip install requirements.txt)
5) install date-date-revolution as a package ("pip install --editable .")
6) run the following command: "export FLASK_APP=date-date-revolution"
7) When you want to test, simply run "flask run" (ensure that it's done from that directory)
8) voila
