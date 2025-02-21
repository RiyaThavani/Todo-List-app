import { useParams } from "react-router-dom";

export const Todo = () => {
  //get all data from localstorage
  const params = useParams();
  console.log(params);

  const localDATA = JSON.parse(localStorage.getItem("AddData"));

  const filteredData = localDATA.filter((item) => item.id === params.id);
  console.log(filteredData);

  return (
    <>
      <div>
        <div>Todo-details: {params.id}</div>
        {filteredData.map((item) => (
          <div key={item.id}>
            <div className="title">{item.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
