import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme-context";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState({
    emailaddress: "",
    password: "",
  });

  const [isTouched, setIsTouched] = useState({
    emailaddress: false,
    password: false,
  });
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const inputChangeHandler = (event) => {
    console.log(event.target.value, event.target.name);
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  };

  const inputBlurHandler = (event) => {
    const { name } = event.target;
    setIsTouched({ ...isTouched, [name]: true });
    if (formData[name] === "") {
      setError({ ...error, [name]: `${name} is required` });
    }
  };

  console.log(isTouched);
  // const inputemailBlurHandler = (event) => {
  //   if (!formData.emailaddress) {
  //     setEmailError('Email must not be empty.');
  //   } else {
  //     setEmailError('');
  //   }
  // };
  // const inputpasswordBlurHandler = () => {
  //   if (!formData.password) {
  //     setPasswordError('Email must not be empty.');
  //   } else {
  //     setPasswordError('');
  //   }

  // };
  const validEmail = (emailaddress) => {
    const checkemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return checkemail.test(emailaddress);
  };
  console.log(formData);
  const isFormValid = () => {
    let errors = {};

    if (formData.emailaddress.trim() === "") {
      errors.emailaddress = "Email must not be empty";
    } else if (!validEmail(formData.emailaddress)) {
      errors.emailaddress = "Enter a valid email address";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password must not be empty";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be 6 characters long";
    }

    return errors;
  };

  const [showPassword, setPassword] = useState(false);

  const togglePasswrdvisible = () => {
    setPassword(!showPassword);
  };

  function onSubmit(event) {
    event.preventDefault();
    setIsTouched({ emailaddress: true, password: true });
    let result = isFormValid();
    setError(result);
    console.log(Object.keys(result));
    if (Object.keys(result).length === 0) {
      localStorage.setItem("loginData", JSON.stringify(formData));
      navigate("/");
    }
  }
  function handleClear(event) {
    event.preventDefault();
    setFormData({
      emailaddress: "",
      password: "",
    });
    setIsTouched({ emailaddress: false, password: false });
    // setEmailError("");
    // setPasswordError("");
    setError("");
  }
  function handleregister(event) {
    event.preventDefault();
    navigate("/Register");
  }

  console.log(error);

  return (
    <>
      <div
        className={`${theme === "dark" ? "login-dark" : "login-dark-light"}`}
      >
        <div
          className={`${theme === "dark" ? "login-box" : "login-box-light"}`}
        >
          <h1>LOGIN</h1>
          <p className="login-pera">Welcome back !!</p>
          <form action="" onSubmit={onSubmit}>
            <div className="inputtext">
              <label htmlFor="">Email Address:</label>
              <input
                type="text"
                className={`${error.emailaddress ? "input-error" : "input"}`}
                name="emailaddress"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={formData.emailaddress}
                placeholder="john@doe.com"
              />
              <p className="login-error">{error.emailaddress}</p>
            </div>
            <div className="inputtext">
            <label htmlFor="">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`${error.password ? "input-error" : "input"}`}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              value={formData.password}
              placeholder="Your Password"
            />
            <span className="eye" onClick={togglePasswrdvisible}>
                <i className="icon-e">
                  {" "}
                  {showPassword ? (
                    <IoEye size={25} />
                  ) : (
                    <IoMdEyeOff size={25} />
                  )}
                </i>
              </span>
            {error.password && <p className="login-error">{error.password}</p>}
            </div>
            <div className="login-btn">
              <button
                type="submit"
                className={`${theme === "dark" ? "btn-red" : "btn-red-light"}`}
              >
                Login
              </button>
              <button
                type="submit"
                onClick={handleClear}
                className={`${
                  theme === "dark" ? "btn-clear" : "btn-clear-light"
                }`}
              >
                Clear
              </button>
            </div>
            <div className={`${theme === "" ? "reg-p" : "reg-p-light"}`}>
              <p>
                Do you have an account ?{" "}
                <button type="submit" onClick={handleregister}>
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
