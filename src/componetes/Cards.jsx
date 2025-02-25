/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const Cards = (props) => {
  return (
    <>
      <div className="card">
        <div className={`${ props.complete ?  "head2" : "" }`}>{props.title}</div>
        <div className="action">
          <div className="icon-btn">
            <div
              className="complete-btn"
              onClick={() => props.handleComplete(props.id)}
            >
              <FaCheck size={20} />
            </div>
            <div className="edit-btn" onClick={() => props.handleEditTask (props.id)}>
              <FaEdit size={20} />
            </div>
            <div
              className="delete-btn"
              onClick={() => props.handleDelete(props.id)}
            >
              <MdDelete size={20} />
            </div>
            <div className="more-btn" onClick={() => props.handleMore(props.id)}>
              <FaArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
