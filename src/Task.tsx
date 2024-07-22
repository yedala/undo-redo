import { useReducer, useState } from "react";
import useData from "./useData";

export default function Task() {
  const [create, setCreate] = useState(false);
  const [content, setContent] = useState("");
  const { handleSubmit, handleRedo, handleUndo, current } = useData();
  const handleInput = (e) => {
    setContent(e.target.value);
  };
  const handleCancel = () => {
    setCreate(false);
  };
  const handleDone = () => {
    handleSubmit(content);
    handleCancel();
  };
  return (
    <div>
      <div className="action">
        <button className="btn" onClick={() => setCreate(true)}>
          Create
        </button>
        <button className="btn" onClick={handleUndo}>
          Undo
        </button>
        <button className="btn" onClick={handleRedo}>
          {" "}
          Redo
        </button>
      </div>
      {create == true ? (
        <div className="container">
          <input type="text" onChange={handleInput} />
          <button className="btn" onClick={handleDone}>
            Submit
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="container display">{current}</div>
      )}
    </div>
  );
}
