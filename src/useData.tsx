import { useReducer } from "react";

const useData = () => {
  const initialData = {
    history: [],
    current: null,
    future: [],
  };
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "Undo": {
        let prev = state.history.slice(0, -1);
        let next = state.history.slice(-1)[0];
        return {
          history: prev,
          current: prev[prev.length - 1],
          future: [next, ...state.future],
        };
      }
      case "Redo": {
        let next = state.future[0];
        return {
          history: [...state.history, next],
          current: next,
          future: state.future.slice(1),
        };
      }
      case "Set": {
        return {
          history: [...state.history, action.content],
          current: action.content,
          future: [],
        };
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialData);
  const handleSubmit = (content) => {
    dispatch({ type: "Set", content: content });
  };
  const handleUndo = () => {
    dispatch({ type: "Undo" });
  };
  const handleRedo = () => {
    dispatch({ type: "Redo" });
  };
  const { current } = state;
  return { handleSubmit, handleUndo, handleRedo, current };
};
export default useData;
