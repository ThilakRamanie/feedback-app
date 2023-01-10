import { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: "Sample Text 1 for provider",
    },
    {
      id: 2,
      rating: 7,
      text: "Sample Text 2 for provider",
    },
    {
      id: 3,
      rating: 8,
      text: "Sample Text 3 for provider",
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const deleteFeedback = (id) => {
    if (window.confirm("Sure? Delete Feedback ?!")) {
      setFeedback(
        feedback.filter((item) => {
          return item.id !== id;
        })
      );
    }
  };

  const addNewFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([...feedback, newFeedback]);
  };

  const editFeedbackHandler = (item) => {
    console.log(item);
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback=(id, updItem)=> {
    setFeedback(feedback.map((item) => item.id===id ? {...item, ...updItem} : item))
  }

  return (
    <FeedbackContext.Provider
      value={{ feedback, deleteFeedback, addNewFeedback, editFeedbackHandler, feedbackEdit, updateFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
