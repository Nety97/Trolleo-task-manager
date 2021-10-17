import React from "react";
import {Link} from 'react-router-dom'
import Navbarhome from "./Navbarhome";

class Register extends React.Component{
    constructor(){
        super();
        this.state={
            nameUser: '',
            email: '',
            password:'',
            incorrect: '',
            succesRegister: '',
            badForm: ''
        }
    }
    handlerChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    sendDataBase = () => {
        let {nameUser, email, password} = this.state
        fetch('http://localhost:4000/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: nameUser.toLowerCase(), email: email.toLowerCase(), password: password})
        })
        .then(res => res.json())
        .then(data => {
            if (data === 'incorrect form submission') {
                this.setState({badForm: 'Please fill out the form correctly'})
            }
            if (data.message === 'ok') {
                this.setState({succesRegister: 'You are Register, Please Sign In'})
            }
            if (data.message.name === 'error') {
                this.setState({incorrect: 'Alredy Register, Please Sign In'})
            } 
            
        })
        .catch(err => console.log(err))
        this.setState({nameUser: '', email: '', password: ''})
        
    }
    render(){
        
        let {incorrect, succesRegister, badForm} = this.state
        return(
            <div>
                <Navbarhome/>
                <div className='sign-style'>
                    <h1 className='Myh1'>Register</h1>
                    <div className='forms'>
                        <input className='margin Myinput' name='nameUser' onChange={this.handlerChange} value={this.state.nameUser} type='text' placeholder='Enter your Name' required/>
                        <input className='margin Myinput' name='email' onChange={this.handlerChange} value={this.state.email} type='text' placeholder='Enter your Email' required/>
                        <input className='margin Myinput' name='password' onChange={this.handlerChange} value={this.state.password} type='password' placeholder='Enter your Password' required/>
                        <button className='margin Mybtn' onClick={this.sendDataBase}>Register</button>
                        {incorrect ? (
                            <div>
                            <h5 style={{color:'red'}}>{incorrect}</h5>
                            <Link to='/signin'><h5 style={{color: 'blue'}}>Sign In</h5></Link>
                            </div>
                        ) : (
                            null
                            )}
                        {succesRegister ? (
                            <div>
                            <h5 style={{color:'rgb(14, 207, 79)'}}>{succesRegister}</h5>
                            <Link to='/signin'><h5 style={{color: 'blue'}}>Sign In</h5></Link>
                            </div>
                        ) : (
                            null
                            )}
                        {badForm ? (
                            <div>
                            <h5 style={{color:'red'}}>{badForm}</h5>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Register