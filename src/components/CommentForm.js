import React ,{Component} from  'react'
import {Button,Modal,ModalHeader,ModalBody,Label,Col,Row } from 'reactstrap'
import {Control, LocalForm , Errors} from 'react-redux-form'


const maxLength = (len) =>(val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



    class CommentForm extends Component{
        constructor(props){
            super(props)
            this.state={
                isModalOpen:false
    
            }   
        }
        
        toggleModal =()=>{
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }
    
        handleSubmit=(value)=>{
       
            alert('Current State is:' +JSON.stringify(value))
            console.log('Current State is:' +JSON.stringify(value))
            this.toggleModal()
        }

        render(){
            return(
                <>
                <Button outline onClick={this.toggleModal}><i className='fa fa-pencil fa-lg'>
                                    </i>Submit Comment
                </Button>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                            
                            
                                <Col md={12} >
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"                                        
                                         >
                                             <option value='1'>1</option>
                                             <option value='2'>2</option>
                                             <option value='3'>3</option>
                                             <option value='4'>4</option>
                                             <option value='5'>5</option>

                                    </Control.select>
                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={5}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength:maxLength(15)
                                        }}
                                         />
                                         <Errors 
                                         className='text-danger'
                                         model='.yourname'
                                         show='touched'
                                         messages={{
                                             minLength: ' Must be greater than 2 character',
                                             maxLength: ' Must be 15 character or less'
                                         }}
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment </Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                       rows="6"
                                        className="form-control"                                      
                                         />                                         
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>
                </ModalBody>
            </Modal>
            </>
            )
            
        }
    }




export default CommentForm