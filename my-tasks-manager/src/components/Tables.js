import React from "react";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import NavbarAuth from "./NavbarAuth";

class Tables extends React.Component{
    constructor(){
        super();
        this.state={
            project: '',
            userTables: null,
            tableErr: ''
        }
    }

    saveTask = (e) => {
        this.setState({project: e.target.value})
    }

    createTable = () => {
        const {project} = this.state
        if (project) {
            fetch('http://localhost:4000/createTable',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: this.props.user[0].user_id , tableName: project})
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Table name alredy exists') {
                
                this.setState({tableErr: 'You cannot create 2 tables with the same name', project: ''})
            } else{
                this.setState({userTables: data, tableErr: '', project: ''})
            }
        })
        .catch(err => console.log(err))
        }
        
    }
    
    componentDidMount () {

        fetch('http://localhost:4000/getUserTables',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: this.props.user[0].user_id })
        })
        .then(res => res.json())
        .then(data => {
        //    console.log(data);
           
           this.setState({userTables: data})
           
        })
        .catch(err => console.log(err))
    }
    
    render(){
        let {user} = this.props
        let {tableErr} = this.state

        // console.log(this.state.userTables);
        
        return(
            <div>
                <NavbarAuth/>
                <h1 className='tableH1'>Welcome {user[0].username}</h1>

                <h2 className='tableH2'>Create new Project</h2>
                <input className='margin Myinput' onChange={this.saveTask} value={this.state.project} placeholder='The name of your project' />
                <button className='Mybtn' onClick={this.createTable}>Create</button>
                {tableErr ? (
                            <div>
                            <h5 style={{color:'red'}}>{tableErr}</h5>
                            </div>
                        ) : (
                            null
                        )}
                {this.state.userTables ? this.state.userTables.map((item,index) => {
                    return <div key={item.table_name}>
                        <Link  to={`/tasks/${item.table_name}`}><h3>{item.table_name}</h3></Link>
                        
                        </div>
                }) : null}
                
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
        // userT: (val) => dispatch(userTables(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)