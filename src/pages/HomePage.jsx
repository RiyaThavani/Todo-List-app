import { useContext, useEffect, useState } from "react";
import Cards from "../componetes/Cards";

import { v4 as uuidv4 } from "uuid";
import { FaCheckSquare } from "react-icons/fa";
import { ThemeContext } from "../context/theme-context";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState(
    JSON.parse(localStorage.getItem("AddData")) || []
  );
  const [titleData, setTitle] = useState({
    title: "",
    id: uuidv4(),
  });
  const { theme } = useContext(ThemeContext);
  const [isEdit, setIsEdit] = useState(false);
  // usses
  const [dataToEdit, setDataToEdit] = useState({});

  const inputChangeHandler = (event) => {
    console.log(event.target.value, event.target.name);
    setTitle({ ...titleData, [event.target.name]: event.target.value });
  };

  //get data back to form for edit
  useEffect(() => {
    if (isEdit) {
      setTitle({ title: dataToEdit.title, id: dataToEdit.id });
    }
  }, [dataToEdit.title, isEdit, dataToEdit.id]);

  function addButton(event) {
    event.preventDefault();
    if (titleData.title.trim() === "") {
      alert("please fill all the detail");
      return;
    }
    console.log(JSON.stringify(titleData));
    localStorage.setItem("formData", JSON.stringify(allData));
    const localDATA = localStorage.getItem("formData");
    console.log({ titleData }, JSON.parse(localDATA));
    setAllData([...allData, titleData]);
    setTitle({ title: "", id: uuidv4() });

    // getFormData({ titleData });
  }

  useEffect(() => {
    console.log("useEffect running...");
    localStorage.setItem("AddData", JSON.stringify(allData));
  }, [allData]);

  const handleComplete = (id) => {
    console.log(id);
    let complteData = allData.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    console.log(complteData);
    setAllData(complteData);
  };

  const handleDelete = (id) => {
    console.log(id);
    let filteredData = allData.filter((item) => {
      return item.id !== id;
    });
    console.log(filteredData);
    setAllData(filteredData);
  };

  const handleEditTask = (id) => {
    setIsEdit(true);
    const filteredData = allData.find((item) => item.id === id);
    console.log(filteredData);
    setDataToEdit(filteredData);
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    let index = allData.findIndex((item) => item.id === dataToEdit.id);
    allData[index] = { title: titleData.title, id: dataToEdit.id };
    console.log({ allData });
    setAllData(allData);
    localStorage.setItem("AddData", JSON.stringify(allData));
    setTitle({ title: "", id: uuidv4() });
    setIsEdit(false);
    console.log(index, titleData);
  };

  const handleMore = (id) => {
    navigate(`/todo/${id}`);
  };
  return (
    <>
      <div className={"home-section"}>
        <div className="home-content">
          <div className="home-card">
            <div className="home-text">
              My Todos
              <span className="text-icon">
                <FaCheckSquare />
              </span>
            </div>
            <form action="" onSubmit={isEdit ? handleUpdate : addButton}>
              <input
                type="text"
                name="title"
                value={titleData.title}
                placeholder="Enter Your task..."
                onChange={inputChangeHandler}
              />

              <button type="submit" className="btn-add">
                {isEdit ? "Update" : "Add"}
              </button>
            </form>
            <div className=" card-main">
              {allData.length > 0 ? (
                allData.map((item) => {
                  return (
                    <Cards
                      key={item.title}
                      id={item.id}
                      complete={item.complete}
                      title={item.title}
                      handleDelete={handleDelete}
                      delete="Delete"
                      handleComplete={handleComplete}
                      handleEditTask={handleEditTask}
                      handleMore={handleMore}
                    />
                  );
                })
              ) : (
                <p
                  className={`${
                    theme === "dark" ? "card-pera" : "card-pera-light"
                  }`}
                >
                  No task added.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
