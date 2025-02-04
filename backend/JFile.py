import json

# To read configuration file.
def config_retrive():
    with open("./configuration/config.json", 'r') as file:
        data = json.load(file)

    return data


# To retrive the data from database file.
def retrive():
    try:
        with open("./db/database.json", 'r') as file:
            data = json.load(file)

        return data
    
    except Exception:
        pass

# To write the data into database file.
def write_data(data):
    db_data = retrive()
    db_data["users"].append(data)

    try:
        with open("./db/database.json", 'w') as file:
            json.dump(db_data, file, indent = 4)

    except Exception:
        pass


# Checks if user does not pre-exist in database.
def isUserExist(username):
    return_value = False

    db_data = retrive()

    for db_user in db_data["users"]:
        if db_user["username"] == username:
            return_value = True
            break
    
    return return_value

# Match the password.
def isPasswordRight(username, password):
    return_value = False

    db_data = retrive()

    for db_user in db_data["users"]:
        if db_user["username"] == username:
            if db_user["password"] == password:
                return_value = True
            
            break
    return return_value
