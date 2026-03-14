import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const MoveToSignUp = (e) => {
    e.preventDefault();
    navigate('/SignUp')
  }

  const handleChange = (e) => {
    // Dynamically updates the specific field (username or email)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // We pass the data in the body of a POST request
      const res = await fetch('http://127.0.0.1:5000/logInValidation', {
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

      if (result) {
        navigate('/Home')
      } else {
        setMessage("Wrong password or username does not exist!"); 
      }
    } catch (err) {
      setError(err.message);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div id="LogIn" className="Wrapper">
      <form id="logInForm" onSubmit={handleLogIn}>
        <input  
          name="Username" 
          placeholder="Username"
          onChange={handleChange}  
        />
        <p id="Warning">{message}</p>
        <input
          name="Password" 
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Checking..." : "Log In"}
        </button>
      </form>

      <div onClick={MoveToSignUp}>
        <p id="signUp" >
          Sign Up
        </p>
      </div>
    </div>
  )
}

export default LogIn;
