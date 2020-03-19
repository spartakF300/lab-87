import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import PostPage from "./containers/PostPage/PostPage";
import AddPost from "./containers/AddPost/AddPost";
import Post from "./containers/Post/Post";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/" exact component={PostPage}/>
                        <Route path="/post/:id" exact component={Post}/>
                        <Route path="/add_post" exact component={AddPost}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;