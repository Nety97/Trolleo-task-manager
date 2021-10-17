import React from "react";
import {connect} from 'react-redux';
import {addTask, orderedArr, addInProgress,orderedProgress, addToDone, orderedDone, userTable} from '../redux/actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NavbarAuth from "./NavbarAuth";

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            task: '',
            taskProgress: '',
            taskDone: '',
            urlParam: props.match,
            userTable: null
        }
        
    }

    savetask = (e)=>{
        this.setState({task: e.target.value})
        
    }
    sendRedux = () => {
        let {task} = this.state
        if (!task) {
            return 
        }
        let val = {
            task: task,
            userId: this.props.user[0].user_id,
            table: this.state.urlParam.params.id
        }
        this.props.addTask(val)
        this.setState({task: ''})
        // this.saveTaskOnDBOne({task: this.props.toDoList, 
        //     userId: this.props.user[0].user_id,
        //     table: this.state.urlParam.params.id})
        //     console.log(this.props.toDoList );
        
    }
    savetaskTwo = (e)=>{
        this.setState({taskProgress: e.target.value})
        
    }
    sendReduxTwo = () => {
        let {taskProgress} = this.state
        if (!taskProgress) {
            return 
        }
        let val = {
            task: taskProgress,
            userId: this.props.user[0].user_id,
            table: this.state.urlParam.params.id
        }
        this.props.addInProgress(val)
        this.setState({taskProgress: ''})
        
    }
    savetaskThree = (e)=>{
        this.setState({taskDone: e.target.value})
        
    }
    sendReduxThree = () => {
        let {taskDone} = this.state
        if (!taskDone) {
            return 
        }
        let val = {
            task: taskDone,
            userId: this.props.user[0].user_id,
            table: this.state.urlParam.params.id
        }
        this.props.addToDone(val)
        this.setState({taskDone: ''})
        
    }
    saveTaskOnDBOne = () => {
        fetch('http://localhost:4000/addTask',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.toDoList)
    })
    .then(data => {
        console.log(data); 
        
    })
    .catch(err => console.log(err))
    }
    handleOnDragEnd = (result) =>{
        if (!result.destination) {
            return
        }
        console.log(result);
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "colunmOne") {
            const items = this.props.toDoList;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)
            console.log( [reorderedItem] );
            this.props.orderedArr(items)
            
        }
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "colunmTwo") {
            const items = this.props.inProgressList;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)

            this.props.orderedProgress(items)
        }
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "colunmThree") {
            const items = this.props.doneList;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)

            this.props.orderedDone(items)
        }

        if (result.source.droppableId !== result.destination.droppableId) {
            if (result.destination.droppableId === "colunmOne") {
                if (result.source.droppableId === "colunmTwo") {
                    const items = this.props.inProgressList;
                    const [reorderedItem] = items.splice(result.source.index, 1);
                    // items.splice(result.destination.index, 0)
        
                    // console.log(result.destination.index);
                    // this.props.orderedProgress(items)

                    const itemsTwo = this.props.toDoList;
                    // const [reorderedItem] = itemsTwo.splice(result.source.index, 1);
                    // first try to make it work
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)

                    this.props.orderedArr(itemsTwo)
                    console.log(this.props.inProgressList);
                }
                if (result.source.droppableId === "colunmThree") {
                    const items = this.props.doneList;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.props.toDoList;
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)

                    this.props.orderedArr(itemsTwo)
                }
                
            }
            if (result.destination.droppableId === "colunmTwo") {
                if (result.source.droppableId === "colunmOne") {
                    const items = this.props.toDoList;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.props.inProgressList
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.props.orderedProgress(itemsTwo)
                }
                if (result.source.droppableId === "colunmThree") {
                    const items = this.props.doneList;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.props.inProgressList
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.props.orderedProgress(itemsTwo)
                }
                
            }
            if (result.destination.droppableId === "colunmThree") {
                if (result.source.droppableId === "colunmOne") {
                    const items = this.props.toDoList;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.props.doneList
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.props.orderedDone(itemsTwo)
                }
                if (result.source.droppableId === "colunmTwo") {
                    const items = this.props.inProgressList;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.props.doneList
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.props.orderedDone(itemsTwo)
                }
            }
            
        }
        
    }

    componentDidMount () {
        // console.log('hello mount');
        // console.log(this.props.user);
        fetch('http://localhost:4000/getTable',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: this.props.user[0].user_id, table: this.state.urlParam.params.id })
        })
        .then(res => res.json())
        .then(data => {
        //    console.log(data);
           this.props.userTable(data)
           this.setState({userTable: data})
           
        })
        .catch(err => console.log(err))
    }

    render(){
        // console.log(this.state.urlParam);
        // console.log(this.state.userTable);
       
        return(
            <div>

                <NavbarAuth/>
                
                <h1 className='tableH1'>{this.state.urlParam.params.id}</h1>

                <div className='father'>
                    
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId='colunmOne'>
                            {(provided)=>(
                                <div className='columnOne'>
                                    <h1>To Do List</h1>
                                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                                            
                                            {this.props.toDoList.map((item,index)=>{
                                                return <Draggable key={item} draggableId={item} index={index}> 
                                                        {(provided)=>(

                                                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='task'>{item}</li>
                                                        )}
                                                    </Draggable>
                                            })}
                                            {provided.placeholder}
                                        </ul>
                                        {provided.placeholder}
                                    
                                        <input className='MyinputToDo' onChange={this.savetask} value={this.state.task} placeholder='Add some tasks'/>
                                        
                                        <button className='MybtnToDo' onClick={this.sendRedux}>Create task</button>
                                </div>
                            )}
                            
                        </Droppable>
                    

                        <Droppable droppableId='colunmTwo'>
                            {(provided)=>(
                                <div className='columnTwo'>
                                    <h1>In progress</h1>
                                    <ul  {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.inProgressList.map((item,index)=>{
                                            return <Draggable key={item} draggableId={item} index={index}>
                                                {(provided)=>(
                                                    
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef} className='tasktwo'>{item} </li>
                                                    
                                                )}
                                                
                                                </Draggable>
                                        })}
                                        
                                    </ul>
                                    {provided.placeholder}
                                    <input className='MyinputProg' onChange={this.savetaskTwo} value={this.state.taskProgress} placeholder='Add in progress tasks'/>
                                    <button className='MybtnProg' onClick={this.sendReduxTwo}>Create task</button>
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId='colunmThree'>
                            {(provided)=>(
                                <div className='columnThree'>
                                    <h1>Done</h1>
                                    <ul  {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.doneList.map((item,index)=>{
                                            return <Draggable key={item} draggableId={item} index={index}>
                                                {(provided)=>(
                                                    
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef} className='taskthree'>{item} </li>
                                                    
                                                )}
                                                
                                                </Draggable>
                                        })}
                                        
                                    </ul>
                                    {provided.placeholder}
                                    <input className='MyinputDone' onChange={this.savetaskThree} value={this.state.taskDone} placeholder='Add done tasks'/>
                                    <button className='MybtnDone' onClick={this.sendReduxThree}>Create task</button>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        toDoList: state.toDoList,
        inProgressList: state.inProgressList,
        doneList: state.doneList,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (val)=> dispatch(addTask(val)),
        orderedArr: (val)=> dispatch(orderedArr(val)),
        addInProgress: (val)=> dispatch(addInProgress(val)),
        orderedProgress: (val)=> dispatch(orderedProgress(val)),
        addToDone: (val)=> dispatch(addToDone(val)),
        orderedDone: (val)=> dispatch(orderedDone(val)),
        userTable: (val)=> dispatch(userTable(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)