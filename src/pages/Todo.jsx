import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const Todo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const allData = JSON.parse(localStorage.getItem("AddData")) || [];
  const todo = Array.isArray(allData)
    ? allData.find((item) => item.id === params.id)
    : null;

  if (!todo) {
    return (
      <div className="home-section">
        <div className="home-content">
          <div className="home-card">
            <button className="back-btn" onClick={() => navigate("/")}> 
              <FaArrowLeft size={14} /> Home
            </button>
            <h2>Todo not found</h2>
            <p>There is no task with the requested id.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-section">
      <div className="home-content">
        <div className="home-card">
          <div className="home-text">Todo Details</div>
          <div className="card todo-detail-card">
            <div className="back-btn" onClick={() => navigate("/")}>
                          <FaArrowLeft size={13} /> Back To Home
                        </div>
            <div className={`${todo.complete ? "head2" : ""}`}>
              {todo.title}
            </div>
            <div className="todo-detail-info">
              <p>
                <strong>Task ID:</strong> {todo.id}
              </p>
              <p>
                <strong>Status:</strong> {todo.complete ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
