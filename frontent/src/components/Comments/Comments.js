import React from 'react';
import './Coments.css'
const Comments = (props) => {
    return (
        <div className="comment">
            <div className="comment-title">
                <h3>Date: { new Date(props.date).toLocaleString()}</h3>
                <h3>Author: {props.author}</h3>
            </div>

            <p> Text: {props.text}</p>

        </div>
    );
};

export default Comments;