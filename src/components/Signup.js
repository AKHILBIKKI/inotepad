import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate(props);

  const [credentials, setCredentails] = useState({name:"", email: "", password: "",cpassword:"" });

  const onChange = (e) => {
    setCredentails({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const {name,email,password} = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account Created successfully","success")
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <h2>Enter your details to signup or If you already have an account please click login</h2>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              name="name"
              // value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              // value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              // value={credentials.password}
              onChange={onChange}
              minLength={5} required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="cpassword"
              className="form-control"
              id="cpassword"
              placeholder="Confirm Password"
              name="cpassword"
              // value={credentials.password}
              onChange={onChange}
              minLength={5} required
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
