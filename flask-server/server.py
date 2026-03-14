from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import yaml
import random

app = Flask(__name__)
CORS(app)

with open("ENV.yaml", "r") as f:
    db = yaml.safe_load(f)

mydb = mysql.connector.connect(
    host=db["HOST"],
    user=db["USER"],  # replace with your user log in
    database=db["DB"],  # replace with your databasename
    password=db["PASSWORD"],
)
mycursor = mydb.cursor()

mycursor.execute("""select u.UserID, s.first_name, s.last_name, v.VidID, v.Title
    from Student s 
    join Users u on s.StudentID = u.UserID
    join Watch_Record wr on wr.UserID = u.UserID
    join Video v on v.VidID = wr.VidID;""")

result = mycursor.fetchall()


@app.route("/")
def index():
    return result


@app.route("/logInValidation", methods=["POST"])
def Log_In_Validation():
    valid: bool = True

    data = request.get_json()

    # Extract specific fields using the keys from your React 'formData'
    username = data.get("Username")
    password = data.get("Password")

    query = """select User_Password
    from Users
    where Username = %s;"""

    mycursor.execute(query, (username,))

    result = mycursor.fetchone()

    if result is not None and result[0] == password: 
        valid = True
    else:
        valid = False


    return jsonify(valid)

@app.route('/SignUp', methods=["POST"])
def Sign_Up_Validation():
    valid: bool = True

    data = request.get_json()

    userID = "U" + str(random.randint(1, 1000000000))
    username = data.get("Username")
    password = data.get("Password")
    first_name = data.get("Password")
    last_name = input("Enter last name: ")
    age = input("Enter age: ")
    userSelectRole = input("Select your role Student [1] or Instructor [2]: ")
    majorOrSpecialty = input("EnterMajor: ")

    query = """select User_Password
    from Users
    where Username = %s;"""

    mycursor.execute(query, (username,))

    return 'test'

if __name__ == "__main__":
    app.run(debug=True)
