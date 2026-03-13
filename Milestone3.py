import mysql.connector
import random

mydb = mysql.connector.connect(
    host="cssql.seattleu.edu",
    user="ll_knguyen57",  # replace with your user log in
    database="ll_knguyen57",  # replace with your databasename
    password="nwXhrl7eq3A+It98",
)


mycursor = mydb.cursor()

# (1) List each student and the video they have watched
print("#(1) List each student and the video they have watched")

mycursor.execute("""select u.UserID, s.first_name, s.last_name, v.VidID, v.Title
    from Student s 
    join Users u on s.StudentID = u.UserID
    join Watch_Record wr on wr.UserID = u.UserID
    join Video v on v.VidID = wr.VidID;""")

result = mycursor.fetchall()

for i in result:
    print(i)

for i in range(0, 3, 1):
    print("")

# (2) Average age per major
print("#(2) Average age per major")

mycursor.execute("""
    select Major, avg(Student_Age) as AverageAge
    from Student group by Major;""")

result = mycursor.fetchall()

for i in result:
    print(i)


for i in range(0, 3, 1):
    print("")

# (3) Select all users who are students and are under 21 years of age
print("#(3) Select all users who are students and are under 21 years of age")

mycursor.execute("""
  select UserID
	from Users 
	where UserID in (select StudentID from Student where Student_Age < 21);""")

result = mycursor.fetchall()

for i in result:
    print(i)


for i in range(0, 3, 1):
    print("")

# (4) Show instructors who uploaded more than 1 video

print("#(4) Show instructors who uploaded more than 1 video")


mycursor.execute("""
  select InstructorID, COUNT(*) as Total_Videos
	from Video
	group by InstructorID
	having COUNT(*) > 1;""")

result = mycursor.fetchall()

for i in result:
    print(i)


for i in range(0, 3, 1):
    print("")

# (5) List all videos and how many times each has been watched,
# including videos that have never been watched

print(
    " #(5) List all videos and how many times each has been watched,# including videos that have never been watched)"
)


mycursor.execute("""
  select v.VidID, v.Title , count(wr.UserID) as times_watched, v.Topic
  from Video v left join Watch_Record wr 
  on v.VidID = wr.VidID group by v.VidID, v.Title;""")

result = mycursor.fetchall()

for i in result:
    print(i)


for i in range(0, 3, 1):
    print("")

# New user signup and is inserted into User as well as teacher/student table


# Function for inputing into subtypes
def enter_role_data(userID, first_name, last_name, age, majorOrSpecialty, userRole):

    if userRole == "Student":
        sql = """
    insert into Student(StudentID,first_name, last_name, Student_Age, Major) 
    values (%s,%s,%s,%s,%s)
    """
    elif userRole == "Instructor":
        sql = """
    insert into Instructor(InstructorID,first_name, last_name, Instructor_Age, Specialty) 
    values (%s,%s,%s,%s,%s)
    """

    val = (userID, first_name, last_name, age, majorOrSpecialty)

    mycursor.execute(sql, val)
    mydb.commit()


# generate random userID
userID = "U" + str(random.randint(1, 1000000000))

userName = input("please type in a Username: ")

userPassword = input("please type in a password: ")

first_name = input("Enter first name: ")

last_name = input("Enter last name: ")

age = input("Enter age: ")

userSelectRole = input("Select your role Student [1] or Instructor [2]: ")

if userSelectRole == "1":
    userRole = "Student"
    majorOrSpecialty = input("EnterMajor: ")

    sql = "insert into Users(UserID,Username,User_Password,User_Role) values (%s,%s,%s,%s)"
    val = (userID, userName, userPassword, userRole)

    mycursor.execute(sql, val)

    mydb.commit()

    enter_role_data(userID, first_name, last_name, age, majorOrSpecialty, userRole)

elif userSelectRole == "2":
    userRole = "Instructor"
    majorOrSpecialty = input("Enter specialty: ")

    sql = "insert into Users(UserID,Username,User_Password,User_Role) values (%s,%s,%s,%s)"
    val = (userID, userName, userPassword, userRole)

    mycursor.execute(sql, val)

    mydb.commit()

    enter_role_data(userID, first_name, last_name, age, majorOrSpecialty, userRole)


print("Account created Succesfully! here is the inserted results")

# select the users table
mycursor.execute("SELECT * FROM Users")

myresult = mycursor.fetchall()

for x in myresult:
    print(x)


# select the Instructor table to show if any inserted
mycursor.execute("SELECT * FROM Instructor")

myresult = mycursor.fetchall()

for x in myresult:
    print(x)

# select the student table to show if any inserted
mycursor.execute("SELECT * FROM Students")

myresult = mycursor.fetchall()

for x in myresult:
    print(x)
