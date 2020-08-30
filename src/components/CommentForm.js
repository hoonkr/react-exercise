import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len );
const minLength = (len) => (val) => (val) && (val.length >= len )

class CommentForm extends Component {
	constructor (props) {
		super(props);
		this.state={
			isModalOpen: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	render() {
		return(
			<React.Fragment>
				<Button onClick={this.toggleModal} className="btn btn-outline-secondary">
					<span className='fa fa-pencil fa-lg'> Submit Comment</span>
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className='form-group'>
								<Label htmlFor='rating' md={2}>Rating</Label>
								<Col md={{size: 3, offset:1}}>
									<Control.select model=".rating" className="form-control" name='rating' id='ating' >
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor='author' md={2}>Your Name</Label>
								<Col md={10}>
									<Control.text model=".author" className="form-control" id='author' name='author'className="form-control" placeholder='Your Name' validators={{minLength: minLength(3), maxLength: maxLength(15)}} />
									<Errors className='text-danger' model='.author' show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less'}} />
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor='comment' md={2}>Comment</Label>
								<Col md={10}>
									<Control.textarea model=".comment" className="form-control" id='comment' name='comment' rows='6'  />
								</Col>
							</Row>
							<Row className='form-group'>
								<Col md={{size:10, offset:2}}>
									<Button type='submit' color='primary' >Submit</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

export default CommentForm;