import React, {Component} from 'react';
import {getPost} from "../../store/action/actionPost";
import {connect} from "react-redux";
import textImage from "../../image/s375.webp";
import './PostPage.css'
import {Link} from "react-router-dom";

class PostPage extends Component {
    componentDidMount() {
        this.props.getPost()
    }

    render() {

        return (
            <div>
                {this.props.posts && this.props.posts.map(post=>{
                   return <div className="post" key={post._id}>
                       <div style={{width:"100px", height:"100px"}} className="album-img">
                           <img
                               style={{width:"100%", height:"100%"}}
                               src={post.image !== 'null' ? 'http://localhost:8000/uploads/' + post.image : textImage }
                               alt={post.title}
                           />
                       </div>
                       <div className="wrap-text">
                           <p> Date: {new Date(post.datetime).toLocaleString() }</p>
                           <p> Author: {post.user.username}</p>
                           <Link to={"/post/"+post._id }>Just chillin...</Link>
                       </div>

                   </div>
                })}
            </div>
        );
    }
}

const mapStateToPops = state => {
    return {
        posts: state.post.posts
    }

};
const mapDispatchToProps = dispatch => {
    return {
        getPost: () => dispatch(getPost())
    }
};
export default connect(mapStateToPops, mapDispatchToProps)(PostPage);