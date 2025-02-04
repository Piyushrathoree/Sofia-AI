# type: ignore
from flask import (Flask, 
                   request, 
                   render_template, 
                   redirect, 
                   url_for,
                   session)
import secrets
from JFile import *
from crypt import hash_passwd

config_data = config_retrive()
app = Flask(__name__, template_folder=config_data["template_folder"])
app.secret_key = secrets.token_hex(16) # Generate a secure secret key

# Defining the routes.
@app.route('/')
def mainPage():
    status = request.args.get('status')
    return f"<h1>{status}</h1>"

@app.route('/login', methods = ["GET", "POST"])
def login():

    # Request is GET.
    if request.method == "GET":
        render_page = render_template("login.html")
        return render_page

    # Request is POST.
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        hash_password = hash_passwd(password)

        session["username"] = username
        session["hash_password"] = hash_password

        if isPasswordRight(username, hash_password):
            return redirect(url_for("mainPage", status = "Login Successful"))
        
        else:
            return redirect(url_for("mainPage", status = "Invalid details"))


@app.route('/register', methods = ["GET", "POST"])
def register():
    # Request is GET.
    if request.method == "GET":
        render_page = render_template("register.html")
        return render_page

    # Request is POST.
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        cpassword = request.form.get("cpassword")

        if len(password) >= config_data["length_password"]:
            if password == cpassword:
                if isUserExist(username) == False:
                    try:
                        hash_password = hash_passwd(password)

                        data_to_write = {
                            "username" : username,
                            "password" : hash_password
                        }

                        write_data(data_to_write)
                        return redirect(url_for('mainPage', status = "Registred Successfully"))

                    except Exception as e:
                        return redirect(url_for('mainPage', status = e))


                # User already exist.
                else:
                    return redirect(url_for('mainPage', status = "User already exist"))

            # Password do not match.
            else:
                return redirect(url_for('mainPage', status = "Password do not match"))
        
        # Password length is smaller.
        else:
            return redirect(url_for('mainPage', status = "Password length is smaller")) 


@app.route('/logout')
def logout():
    if 'username' in session:
        session.pop("username", None)
        session.pop("hash_password", None)
        return redirect(url_for("mainPage", status = "Loged out."))
    
    else:
        return redirect(url_for("login"))

#


if __name__ == "__main__":
    app.run(host = config_data["host"], 
            port = config_data["port"], 
            debug = config_data["debug"])
