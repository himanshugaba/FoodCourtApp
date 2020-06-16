import React,{Component} from 'react'
import {Card, CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,
    Button,Modal,ModalHeader,ModalBody,Label,Col,Row} from 'reactstrap'
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom'
import {Control, LocalForm , Errors} from 'react-redux-form'
import {Loading} from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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

    handleSubmit=(values)=>{
   
        alert('Current State is:' +JSON.stringify(values))
        console.log('Current State is:' +JSON.stringify(values))
        this.toggleModal()
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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
                            <Label htmlFor="author" md={5}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
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

   
   
   function RenderDish  ({dish}){
    if(dish!=null){
        return(           
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>  
                    <Card>
                     <CardImg width='100%' src={baseUrl + dish.image} alt={dish.name} />
                     <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                     </CardBody>
                </Card>
        </FadeTransform>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}
       
   function RenderComments({comments,postComment,dishId}){
       if(comments!=null){
          
        return(
            <div>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
               <Stagger in>
               
               
               
               
                   {comments.map((com)=>{
                       return(
                        
                      
                           <Fade in>
                           <li key={com.id} className='p-2'>
                         {com.comment}
                           <br />
                           <br/>
                         --{com.author}, {dateFormat(com.date,"mmm dd, yyyy")} 
                         </li>
                         </Fade>
                        
                        
                        )
                   })}
                
                
                
                </Stagger>
               </ul>
               <CommentForm dishId={dishId} postComment={postComment}/>
               </div>
           )
       }
       else{
           return(
               <div></div>
           )
       }

   }
   
   const Dishdetail = (props)=>{
    const dish = props.dish;


        if(props.isLoading){
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>    
                    </div>    
                </div>
            )
        }
        else if(props.errmess){
            return(
                <div className='container'>
                    <div className='row'>
            <h4>{props.errmess}</h4>   
                    </div>    
                </div>
            )
        }
        else if(dish!=null){
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} 
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>
                </div>
            </div>
            </div>
        );
        }
  }


export default Dishdetail