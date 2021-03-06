import React, {Component} from 'react'
import {Navbar, NavbarBrand, Jumbotron,Nav ,NavbarToggler,Collapse,NavItem,Button,Modal,ModalHeader
,ModalBody,
Form,
FormGroup,
Label,
Input} from 'reactstrap'
import {NavLink} from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            isNavOpen:false,
            isModalOpen:false

        }

        

    }

    toggleNav =() =>{
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    toggleModal =()=>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin=(e)=>{
        e.preventDefault()
        this.toggleModal()
        alert('Username: ' + this.username.value +'Password: ' + this.password.value + this.remember.checked)
    }
    render(){
        return(
            <>
                <Navbar dark expand='md'>
                    <div className="container">
                       <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='mr-auto' href="/">
                            <img src='assets/images/logo.png' height='30' width='41' alt='something is here' />
                        </NavbarBrand>
                       <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/home'>
                                    <span className='fa fa-home fa-lg'></span> HOME
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/aboutus'>
                                    <span className='fa fa-info fa-lg'></span> ABOUT US
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/menu'>
                                    <span className='fa fa-list fa-lg'></span> MENU
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/contactus'>
                                    <span className='fa fa-address-card fa-lg'></span> CONTACT US
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}><span className='fa fa-sign-in fa-lg'>
                                    </span>Login
                                </Button>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1>Ristorante Con Fusion</h1>
                                <p>Fourt Court</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlfor='username'>Username</Label>
                                <Input type='text' id='username' name='username' 
                                innerRef={(input)=>this.username=input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlfor='password'>Password</Label>
                                <Input type='password' id='password' name='password' 
                                innerRef={(input)=>this.password=input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' name='checkbox' 
                                    innerRef={(input)=>this.remember=input}/>
                                    Remember Me
                                </Label>
                            </FormGroup>
                            <Button type='submit' value='submit' color='primary'>Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default Header
