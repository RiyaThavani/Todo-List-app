import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

/* eslint-disable react/prop-types */
const Alertbox = (props) => {
   const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className="alert-box">
        <div className="drop-box">  </div>
          <div className={`${theme === "dark" ? "model-content" : "model-content-light"}`} >
              <div className={`${theme === "dark" ? "heding" : "heding-light"}`}> Are you sure you want to logout?</div>
              <div className="buttons-group">
                <button type="submit" className={`${theme === "dark" ? "btn-red" : "btn-red-light"}`} onClick={props.handlelogoutcancle}>Cancle</button>
                <button type="submit" className={`${theme === "dark" ? "btn-log" : "btn-log-light"}`} onClick={props.handlelogoutconfirm}>Logout</button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Alertbox;
