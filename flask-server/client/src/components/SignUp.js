import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [majorOrSpecialty, setMajorOrSpecialty] = useState("");
  const [formData, setFormData] = useState({UserRole: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    // Dynamically updates the specific field (username or email)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const MoveToLogIn = (e) => {
    e.preventDefault();
    navigate('/')
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log(formData.UserRole)
    try {
      // We pass the data in the body of a POST request
      const res = await fetch('http://127.0.0.1:5000/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log(result)

      if (result === true) {
        navigate("/")
      } else {
        setMessage(result)
      }

    } catch (err) {
      setError(err.message);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const placeholderLabel = formData.UserRole === "student" 
  ? "Major" 
  : (formData.UserRole !== "" ? "Specialty" : "Select a role first...");

  return (
    <div id="SignUp" className="Wrapper">
      <form id="SignUpForm" onSubmit={handleSignUp}>
        <input  
          name="Username" 
          placeholder="Username"
          onChange={handleChange}  
        />
        <p>{message}</p>
        <input
          name="Password" 
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          name="First_Name" 
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="Last_Name" 
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input
          name="Age" 
          placeholder="Age"
          onChange={handleChange}
        />
        <select 
          name="UserRole" 
          onChange={handleChange}
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        
        <input
          name="MajorOrSpecialty"
          placeholder={placeholderLabel}
          value={formData.MajorOrSpecialty || ""} 
          onChange={handleChange}
          disabled={!formData.UserRole}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Checking..." : "Sign Up"}
        </button>
      </form>

      <div onClick={MoveToLogIn}>
        <p id="LogIn" >
          Log In
        </p>
      </div>
    </div>
  )
}

export default SignUp;
