import React, {Component} from 'react';
import {getOnePost} from "../../store/action/actionPost";
import {connect} from "react-redux";
import FormComment from "../../components/FormComment/FormComment";
import Comments from "../../components/Comments/Comments";
import {createComment, getComments} from "../../store/action/actionComents";
import textImage from "../../image/s375.webp";

class Post extends Component {

    componentDidMount() {
        this.props.getOnePost(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
    }

    render() {

        if (this.props.loading || !this.props.post) {
            return <div>Loading...</div>
        }
        return (
            <>
                <h2>Post</h2>
                <div className="post">
                    <div style={{width: "100px", height: "100px"}} className="album-img">
                        <img
                            style={{width: "100%", height: "100%"}}
                            src={this.props.post[0].image !== 'null' ? 'http://localhost:8000/uploads/' + this.props.post[0].image : textImage}
                            alt={this.props.post[0].title}
                        />
                    </div>
                    <div className="wrap-text">
                        <p> Date: {new Date(this.props.post[0].datetime).toLocaleString()}</p>
                        <p> Author: {this.props.post[0].user.username}</p>
                        <p>Description{this.props.post[0].description}</p>
                    </div>

                </div>
               {this.props.comments.length ? <h2>Comments</h2>:null}
                {this.props.comments && this.props.comments.map(comment => {
                    return <Comments
                        key={comment._id}
                        author={comment.user.username}
                        date={comment.datetime}
                        text={comment.description}
                    />
                })}
                <div>
                    {this.props.user && <FormComment
                        commentSend={this.props.createComment}
                        postId={this.props.match.params.id}
                    />}
                </div>
            </>
        );
    }
}

const mapStateToPops = state => {
    return {
        post: state.post.post,
        comments: state.comment.comments,
        user: state.users.user,
        loading: state.post.loading
    }

};
const mapDispatchToProps = dispatch => {
    return {
        getOnePost: (id) => dispatch(getOnePost(id)),
        getComments: (id) => dispatch(getComments(id)),
        createComment: (data) => dispatch(createComment(data))
    }
};

export default connect(mapStateToPops, mapDispatchToProps)(Post);