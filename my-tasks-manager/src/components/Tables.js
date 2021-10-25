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
            tableErr: '',
            numberEmoji: null,
            emojis: ['😄','😉','😃','🙃','😉','😊','😇','🤩','😜','🤪',
                    '🤗','🥳','🤠','😎','🤓','🧐','👻','👾','😸','😻',
                    '🤟','👋','👌','✌️','🧑‍🚀','👨‍🔬','🧑‍🚒','👑','🦘','🙈',
                    '🐶','🐼','🦊','🦄','🐯','🦁','🐴','🐻‍❄️','🦖','🦖',
                    '🦈','🌵','🍀','☀️','🔥','🌈','⛷️','🏄','🛹','🏈',
                    '⚽','⚾','🏓','🗽','🗼','🎡','⚓','🪂','🚁','🚀',
                    '🛸','🗿','🏎️','🗻','🎉','🧿','🧸','💎','🔱','⚜️']
        }
    }

    saveTask = (e) => {
        this.setState({project: e.target.value})
    }

    createTable = () => {
        const {project} = this.state
        if (project) {
            fetch(`https://trolleo-db.herokuapp.com/createTable`,{
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

        fetch(`https://trolleo-db.herokuapp.com/getUserTables`,{
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
        let random = Math.floor(Math.random() * 70)
        this.setState({userTables: data, numberEmoji: random})
           
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
                
                <h1 className='tableH1'>
                    Welcome back, {user[0].username} {this.state.emojis[this.state.numberEmoji]}
                </h1>
                

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
                <div style={{marginTop: '25px'}}>
                    {this.state.userTables ? this.state.userTables.map((item,index) => {
                        return <div key={item.table_name}>
                            <Link className='linkTasks' to={`/tasks/${item.table_name}`}><h3>{item.table_name}</h3></Link>
                            
                            </div>
                    }) : null}
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
        // userT: (val) => dispatch(userTables(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables)