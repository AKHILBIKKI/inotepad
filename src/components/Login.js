import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    let navigate = useNavigate();

    const [credentials, setCredentails] = useState({email: "",password:""})

    const onChange = (e)=>{
        setCredentails({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success)
          {
            //redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Logged in successfully","success")
            navigate("/");
          }else{
            props.showAlert("Invalid Details","danger")
          }
    }

  return (
    <div className="container my-3" >
      <form onSubmit={handleSubmit}>
        <h2>Enter your credentials to login or If you are new please signup</h2>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
