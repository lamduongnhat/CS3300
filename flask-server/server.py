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
    user=db["USER"],
    database=db["DB"],
    password=db["PASSWORD"],
)
mycursor = mydb.cursor()

mycursor.execute("""select * from Users""")

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
    sql = ""
    data = request.get_json()

    userID = "U" + str(random.randint(1, 1000000000))
    username = data.get("Username")
    password = data.get("Password")
    first_name = data.get("First_Name")
    last_name = data.get("Last_Name")
    age = data.get("Age")
    userSelectRole = data.get("UserRole")
    majorOrSpecialty = data.get("MajorOrSpecialty")

    if userSelectRole == "student":
        sql = """
        insert into Student(StudentID,first_name, last_name, Student_Age, Major) 
        values (%s,%s,%s,%s,%s)
        """
    elif userSelectRole == "instructor":
        sql = """
        insert into Instructor(InstructorID,first_name, last_name, Instructor_Age, Specialty) 
        values (%s,%s,%s,%s,%s)
        """
    else:
        return jsonify("Please pick a role!")

    query = "select * from Users where Username = %s"
    mycursor.execute(query, (username, ))
    result = mycursor.fetchall()

    if (result is not None):
        return jsonify("Username already exits!")
    
    query = "insert into Users(UserID,Username,User_Password,User_Role) values (%s,%s,%s,%s)"
    val = (userID, username, password, userSelectRole)

    mycursor.execute(query, val)
    mydb.commit()

    val = (userID, first_name, last_name, age, majorOrSpecialty)

    mycursor.execute(sql, val)
    mydb.commit()

    return jsonify(True)

if __name__ == "__main__":
    app.run(debug=True)
