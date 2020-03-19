import React, {Component}from "react";


import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/Form/FormElement";
import {connect} from "react-redux";
import {sendPost} from "../../store/action/actionPost";


class AddPost extends Component {
    state = {
        title: '',
        description: '',
        image:null
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {

        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.props.post(formData);
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <>
                <h2>Add new post</h2>
                <hr className="HRColor"/>
                {this.props.error && (
                    <Alert color="danger">{this.props.error.message}</Alert>
                )}

                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="title"
                        title="title"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        type="text"
                        autoComplete="current-title"
                        placeholder="Enter title"
                    />
                    <FormElement
                        propertyName="description"
                        title="description"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                        type="text"
                        autoComplete="current-description"
                        placeholder="Enter description"
                    />
                    <FormElement
                        propertyName="image"
                        title="image"

                        onChange={this.fileChangeHandler}
                        type="file"

                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit">
                                Send
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.post.loading,
    error: state.post.error
});

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(sendPost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);