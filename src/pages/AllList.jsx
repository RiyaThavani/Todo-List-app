/* eslint-disable no-irregular-whitespace */
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme-context";

const AllList = () => {
  const { theme } = useContext(ThemeContext);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  console.log({ formData });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", //for creating new resource
      body: JSON.stringify({
        //for leaction on your data
        title: formData.title,
        body: formData.desc,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8", //for data type-JSON forment
      },
    });
    const data = await response.json();
    getAPIData();
    console.log({ data, response });
  };
  const getAPIData = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
    });

    console.log({ response });
    const data = await response.json();
    console.log({ data });
    setAllData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <>
    <div className="form-container">
    <div className="form-group">
      <form onSubmit={submitHandler}>
      <div className="form-row">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={inputChangeHandler}
        />
        </div>
        <div className="form-row">
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          name="desc"
          id="desc"
          value={formData.desc}
          onChange={inputChangeHandler}
        />
        </div>
        <button className={` ${theme === "dark" ? "btn-red" : "btn-red-light"}`}>Submit</button>
      </form>
      </div>
      </div>
      
      <div className="todolist-container">
        <div className="about">
          <div className="about-text">
            <h1>List Of ToDos</h1>
            <div className="row2"></div>
          </div>
          {isLoading && (
            <p className={` ${theme === "dark" ? "text-p" : "text-p-light"}`}>
              Loading...
            </p>
          )}
          {allData.map((item) => (
            <div key={item.id} className="textbox-group">
              <div className="textbox-dark">
                <div className="text-title">{item.title}</div>
                <div className={`${item.completed ? "complete" : "pending"}`}>
                  {item.completed ? "Completed" : "Pending"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllList;


//1) npx create-react-app my-app
//2) npm create vite@latest