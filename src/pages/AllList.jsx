import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme-context";
import { MdDelete } from "react-icons/md";

const AllList = () => {
  const { theme } = useContext(ThemeContext);
  const [allData, setAllData] = useState(() => {
    const saved = localStorage.getItem("allTodosList");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAPIData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=15");
      const data = await response.json();
      const formatted = data.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.body || "Imported task",
        completed: Boolean(item.completed),
      }));
      setAllData(formatted);
      localStorage.setItem("allTodosList", JSON.stringify(formatted));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("allTodosList");
    if (!saved || JSON.parse(saved).length === 0) {
      getAPIData();
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.title || formData.title.trim() === "") {
      alert("Please enter a title for the todo");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: formData.title.trim(),
      desc: formData.desc ? formData.desc.trim() : "",
      completed: false,
    };

    // Update state and persist immediately to localStorage
    const updatedList = [newItem, ...allData];
    setAllData(updatedList);
    localStorage.setItem("allTodosList", JSON.stringify(updatedList));

    // Reset input fields
    setFormData({ title: "", desc: "" });

    // Optional background API call
    try {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: newItem.title,
          body: newItem.desc,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((err) => console.log("API POST sync:", err));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = (id) => {
    const updatedList = allData.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setAllData(updatedList);
    localStorage.setItem("allTodosList", JSON.stringify(updatedList));
  };

  const handleDelete = (id) => {
    const updatedList = allData.filter((item) => item.id !== id);
    setAllData(updatedList);
    localStorage.setItem("allTodosList", JSON.stringify(updatedList));
  };

  return (
    <>
      <div className={theme === "dark" ? "form-container" : "form-container-light"}>
        <div className={theme === "dark" ? "form-group" : "form-group-light"}>
          <form onSubmit={submitHandler}>
            <div className="form-row">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter todo title..."
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
                placeholder="Enter description (optional)..."
                value={formData.desc}
                onChange={inputChangeHandler}
              />
            </div>
            <button type="submit" className={theme === "dark" ? "btn-red" : "btn-red-light"}>
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className={theme === "dark" ? "todolist-container" : "todolist-container-light"}>
        <div className={theme === "dark" ? "about" : "about-light"}>
          <div className="about-text">
            <h1>List Of ToDos</h1>
            <div className="row2"></div>
          </div>
          {isLoading && (
            <p className={theme === "dark" ? "text-p" : "text-p-light"}>
              Loading...
            </p>
          )}
          {!isLoading && allData.length === 0 && (
            <p className={theme === "dark" ? "text-p" : "text-p-light"}>
              No todos found. Add your first todo above!
            </p>
          )}
          {allData.map((item) => (
            <div key={item.id} className="textbox-group">
              <div className={theme === "dark" ? "textbox-dark" : "textbox-light"}>
                <div className="textbox-content">
                  <div className={`text-title ${item.completed ? "head2" : ""}`}>
                    {item.title}
                  </div>
                  {item.desc && <div className="text-desc">{item.desc}</div>}
                </div>
                <div className="textbox-actions">
                  <div
                    className={item.completed ? "complete" : "pending"}
                    onClick={() => toggleComplete(item.id)}
                    style={{ cursor: "pointer", userSelect: "none" }}
                    title="Click to toggle status"
                  >
                    {item.completed ? "Completed" : "Pending"}
                  </div>
                  <div
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    title="Delete todo"
                  >
                    <MdDelete size={18} />
                  </div>
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