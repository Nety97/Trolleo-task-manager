import React from "react";
import {userData} from '../redux/actions';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import Navbarhome from "./Navbarhome";


class SignIn extends React.Component{
    constructor(){
        super();
        this.state={
            email: '',
            password:'',
            wrong: '',
            badForm: ''
        }
    }
    handlerChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    sendNode = () => {
        let {email, password} = this.state
        
        fetch('http://localhost:4000/signin',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email.toLowerCase(), password: password})
        })
        .then(res => res.json())
        .then(data => {
            if (data === 'wrong credentials') {
                this.setState({wrong: 'The password is invalid or you dont have an account'})
            }
            if (data === 'incorrect form submission') {
                this.setState({badForm: 'Please fill out the form correctly'})
            }
            // console.log(data);
            this.props.userData(data)
        })
        .catch(err => console.log(err))
        this.setState({email: '', password: ''})
        
    }

    render(){
        let {wrong, badForm} = this.state
        return(
            <div>
                <Navbarhome/>
                <div className='sign-style'>
                    <h1 className='Myh1'>Sign In</h1>
                    <div className='forms'>
                        <input className='margin Myinput' name='email' onChange={this.handlerChange} type='text' value={this.state.email} placeholder='Enter your Email' required/>
                        <input className='margin Myinput' name='password' onChange={this.handlerChange} type='password' value={this.state.password} placeholder='Enter your Password' required/>
                        <button className='margin Mybtn' onClick={this.sendNode}>Sign In</button>
                        {wrong ? (
                            <div>
                            <h5 style={{color:'red'}}>{wrong}</h5>
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
                    {this.props.token ? <Redirect to='/tasks'/> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        user: state.user,
        token: state.token 
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userData: (val)=> dispatch(userData(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)