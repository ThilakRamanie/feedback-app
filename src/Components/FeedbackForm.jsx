import Card from "./shared/Card"
import { useState, useContext, useEffect } from "react"
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

import FeedbackContext from "../Context/FeedbackContext";

function FeedbackForm() {
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);

    const { addNewFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    useEffect(()=> {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    },[feedbackEdit])

    const handleTextChange = (event) => {
        if(text === '') {
            setBtnDisabled(true);
            setMessage(null)
        } else if(text !== '' && text.trim().length<=10 ) {
            setBtnDisabled(true);
            setMessage('Feedback must be atleast 10 characters')
        } else {
            setMessage(null)
            setBtnDisabled(false);
        }
        setText(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }
            console.log(newFeedback);
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addNewFeedback(newFeedback)
            }
            setText('')
        }
    }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Rate your service :)</h2>
        <RatingSelect select={(rating) => setRating(rating)} selected={rating} />
        {/*rating select*/}
        <div className="input-group">
            <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text} />
            <Button type="submit" version="secondary" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
