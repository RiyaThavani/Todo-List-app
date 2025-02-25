import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme-context";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const RegisterPage = () => {
  // handle form through single state

  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({
    // username: "",
    // email: "",
    // password: "",
    // confirmpassword: "",
  });
  // const [isTrue, setIsTrue] = useState(false)
  // redirect to different page
  const [showPassword, setPassword] = useState(false);
  const [showconfirmPassword, setconfirmPassword] = useState(false);

  const togglePasswrdvisible = () => {
    setPassword(!showPassword);
  };
  const toggleconfirmPasswrdvisible = () => {
    setconfirmPassword(!showconfirmPassword);
  };

  const navigate = useNavigate();

  const [isTouched, setIsTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmpassword: false,
  });
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
  const validEmail = (email) => {
    const checkemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return checkemail.test(email);
  };
  const isFormValid = () => {
    let errors = {};

    if (formData.username.trim() === "") {
      errors.username = "Username is required";
    } else if (formData.username.length < 3) {
      errors.username = "Username atleast 3 character long.";
    }

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!validEmail(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (formData.password.trim() === "") {
      errors.password = "password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be 6 characters long";
    }
    if (formData.confirmpassword.trim() === "") {
      errors.confirmpassword = "confirm password is requird";
    } else if (formData.password !== formData.confirmpassword) {
      errors.confirmpassword = "Passwords must match";
    }
    return errors;
  };

  function onSubmit(event) {
    event.preventDefault();
    setIsTouched({
      username: true,
      email: true,
      password: true,
      confirmpassword: true,
    });
    let result = isFormValid();
    setError(result);
    console.log(Object.keys(result));
    if (Object.keys(result).length === 0) {
      localStorage.setItem("RegisterData", JSON.stringify(formData));
      localStorage.setItem("loginData", JSON.stringify(formData));
      navigate("/");
      console.log("navigate to home page")
    }
  }

  const formIsValid = Object.values(error).every((item) => item === "");
  console.log({ formIsValid }, Object.values(error));

  function handleClear(event) {
    event.preventDefault();
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
    setIsTouched({
      username: false,
      email: false,
      password: false,
      confirmpassword: false,
    });
    setError({});
  }

  return (
    <>
      <div className={`${theme === "dark" ? "container" : "container-light"}`}>
        <div className={`${theme === "dark" ? "content" : "content-light"}`}>
          <div className={`${theme === "dark" ? "text" : "text-light"}`}>
            <h1>Register</h1>
            <p className="reg-pera">Let`s create new account</p>
          </div>
          <form action="" onSubmit={onSubmit}>
            <div className="textinput">
              <label
                htmlFor=""
                className={`${theme === "dark" ? "lbl" : "lbl2"}`}
              >
                UserName:
              </label>
              <input
                type="text"
                name="username"
                className={`${error.username ? "input-error" : "input"}`}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={formData.username}
              />
              <p className="error">{error.username}</p>
            </div>

            <div className="textinput">
              <label
                htmlFor=""
                className={`${theme === "dark" ? "lbl" : "lbl2"}`}
              >
                EmailAddress:
              </label>
              <input
                type="text"
                name="email"
                className={`${error.email ? "input-error" : "input"}`}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={formData.email}
              />
              <p className="error">{error.email}</p>
            </div>

            <div className="textinput">
              <label
                htmlFor=""
                className={`${theme === "dark" ? "lbl" : "lbl2"}`}
              >
                Passworld:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`${error.password ? "input-error" : "input"}`}
                value={formData.password}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
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
              <p className="error">{error.password}</p>
            </div>

            <div className="textinput">
              <label
                htmlFor=""
                className={`${theme === "dark" ? "lbl" : "lbl2"}`}
              >
                confirm Passworld:
              </label>
              <input
                type={showconfirmPassword ? "text" : "password"}
                name="confirmpassword"
                className={`${error.confirmpassword ? "input-error" : "input"}`}
                value={formData.confirmpassword}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
              />
              <span className="eye" onClick={toggleconfirmPasswrdvisible}>
                <i className="icon-e">
                  {" "}
                  {showconfirmPassword ? (
                    <IoEye size={25} />
                  ) : (
                    <IoMdEyeOff size={25} />
                  )}
                </i>
              </span>
              <p className="error">{error.confirmpassword}</p>
            </div>

            <div className="btn-reg">
              <button type="submit" className= {`${theme === "dark" ? "reg-enable" : "reg-enable-light"}`}>
                Registre
              </button>
              <button
                type="submit"
                className={`${theme === "dark" ? "reg-enable" : "reg-enable-light"}`}
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

//convert to string format
// JSON.stringify(formData)

//convert to object format
// JSON.parse(formData)

//validation 1) onsubmit 2) change 3) blur
