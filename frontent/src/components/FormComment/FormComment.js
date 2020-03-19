import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class FormComment extends Component {
    state = {
        description: ''
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.commentSend({...this.state,post:this.props.postId});
    };

    render() {
        return (
            <>
                <h2>Add comment</h2>
                <hr className="HRColor"/>
                {this.props.error && (
                    <Alert color="danger">{this.props.error.error}</Alert>
                )}
                <div>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="description"
                            title="description"
                            value={this.state.description}
                            onChange={this.inputChangeHandler}
                            type="textarea"
                            autoComplete="current-description"
                            placeholder="Enter description"
                        />
                        <FormGroup row>
                            <Col sm={{offset: 2, size: 10}}>
                                <Button type="submit">
                                    Add commit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

export default FormComment;