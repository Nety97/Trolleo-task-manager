import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NavbarAuth from "./NavbarAuth";
import {connect} from 'react-redux'


class DragAndDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            task: '',
            taskProgress: '',
            taskDone: '',
            todoArray: [],
            progressArray: [],
            doneArray: [],
            trash: [],
            urlParam: props.match,
        }
    }
    savetask = (e)=>{
        this.setState({[e.target.name]: e.target.value}) 
    }
    sendRedux = () => {
        let {task, todoArray} = this.state
        if (!task) {
            return 
        }
        // let val = {
        //     task: task,
        //     userId: this.props.user[0].user_id,
        //     table: this.state.urlParam.params.id
        // }
        let copyArr = [...todoArray]
        copyArr.push(task)
        this.setState({todoArray: [...copyArr], task: ''}, ()=>{
            this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
        })
        // this.saveTaskOnDBOne({task: this.props.toDoList, 
        //     userId: this.props.user[0].user_id,
        //     table: this.state.urlParam.params.id})
        //     console.log(this.props.toDoList );
        
    }
    
    sendReduxTwo = () => {
        let {taskProgress, progressArray} = this.state
        if (!taskProgress) {
            return 
        }
        let copyArr = [...progressArray]
        copyArr.push(taskProgress)
        
        this.setState({progressArray: [...copyArr], taskProgress: ''}, ()=> {
            this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
        })
    }

    sendReduxThree = () => {
        let {taskDone, doneArray} = this.state
        if (!taskDone) {
            return 
        }
        let copyArr = [...doneArray]
        copyArr.push(taskDone)
        this.setState({doneArray: [...copyArr], taskDone: ''}, ()=> {
            this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
        })
    }



    handleOnDragEnd = (result) =>{
        if (!result.destination) {
            return
        }
        console.log(result);
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "colunmOne") {
            const items = this.state.todoArray;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)
            console.log( [reorderedItem] );
            this.setState({todoArray: [...items]}, ()=> {
                this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
            })
            
        }
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "colunmTwo") {
            const items = this.state.progressArray;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)

            this.setState({progressArray: [...items]}, ()=> {
                this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
            })
        }
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "colunmThree") {
            const items = this.state.doneArray;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)

            this.setState({doneArray: [...items]}, ()=> {
                this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
            })
        }
        if (result.destination.droppableId === result.source.droppableId && result.destination.droppableId === "trash") {
            const items = this.state.trash;
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem)

            this.setState({trash: [...items]}, ()=> {
                this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
            })
        }

        if (result.source.droppableId !== result.destination.droppableId) {
            if (result.destination.droppableId === "colunmOne") {
                if (result.source.droppableId === "colunmTwo") {
                    const items = this.state.progressArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);
                    // items.splice(result.destination.index, 0)
        
                    // console.log(result.destination.index);
                    // this.props.orderedProgress(items)

                    const itemsTwo = this.state.todoArray;
                    // const [reorderedItem] = itemsTwo.splice(result.source.index, 1);
                    // first try to make it work
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)

                    this.setState({todoArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                    // console.log(this.state.progressArray);
                }
                if (result.source.droppableId === "colunmThree") {
                    const items = this.state.doneArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.todoArray;
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)

                    this.setState({todoArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "trash") {
                    const items = this.state.trash;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.todoArray;
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)

                    this.setState({todoArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                
            }
            if (result.destination.droppableId === "colunmTwo") {
                if (result.source.droppableId === "colunmOne") {
                    const items = this.state.todoArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.progressArray
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({progressArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "colunmThree") {
                    const items = this.state.doneArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.progressArray
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({progressArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "trash") {
                    const items = this.state.trash;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.progressArray
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({progressArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                
            }
            if (result.destination.droppableId === "colunmThree") {
                if (result.source.droppableId === "colunmOne") {
                    const items = this.state.todoArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.doneArray
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({doneArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "colunmTwo") {
                    const items = this.state.progressArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.doneArray
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({doneArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "trash") {
                    const items = this.state.trash;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.doneArray
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({doneArray: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
            }

            if (result.destination.droppableId === "trash") {
                if (result.source.droppableId === "colunmOne") {
                    const items = this.state.todoArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.trash
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({trash: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "colunmTwo") {
                    const items = this.state.progressArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.trash
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({trash: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
                if (result.source.droppableId === "colunmThree") {
                    const items = this.state.doneArray;
                    const [reorderedItem] = items.splice(result.source.index, 1);

                    const itemsTwo = this.state.trash
                    itemsTwo.splice(result.destination.index, 0, reorderedItem)
                    this.setState({trash: [...itemsTwo]}, ()=> {
                        this.saveTasksOnDB(this.state.todoArray, this.state.progressArray, this.state.doneArray)
                    })
                }
            }
        }
        
    }

    saveTasksOnDB = (todoArray, progressArray, doneArray) => {
        let {urlParam} = this.state
        console.log(todoArray);
        
        fetch('http://localhost:4000/addTask',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: this.props.user[0].user_id, table: urlParam.params.id, todoArr: todoArray, progressArr: progressArray, doneArr: doneArray})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            
            let {table} = data[0]
            let {toDo, inProgress, done} = table
            this.setState({todoArray: toDo, progressArray: inProgress, doneArray: done})  
        })
        .catch(err => console.log(err))
        }

    componentDidMount () {
        
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
           console.log(data[0].data_table.table);
            let {data_table} = data[0]
            let {table} = data_table
            let {toDo, inProgress, done} = table
            
            this.setState({todoArray: toDo, progressArray: inProgress, doneArray: done})
           
        })
        .catch(err => console.log(err))
    }

    render () {
        console.log(this.state.progressArray)
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
                                            
                                            {this.state.todoArray.map((item,index)=>{
                                                return <Draggable key={item} draggableId={item} index={index}> 
                                                        {(provided)=>(

                                                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='task'>{item}</li>
                                                        )}
                                                    </Draggable>
                                            })}
                                            {provided.placeholder}
                                        </ul>
                                        {provided.placeholder}
                                    
                                        <input className='MyinputToDo' name='task' onChange={this.savetask} value={this.state.task} placeholder='Add some tasks'/>
                                        
                                        <button className='MybtnToDo' onClick={this.sendRedux}>Create task</button>
                                </div>
                            )}
                            
                        </Droppable>
                    

                        <Droppable droppableId='colunmTwo'>
                            {(provided)=>(
                                <div className='columnTwo'>
                                    <h1>In progress</h1>
                                    <ul  {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.progressArray.map((item,index)=>{
                                            return <Draggable key={item} draggableId={item} index={index}>
                                                {(provided)=>(
                                                    
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef} className='tasktwo'>{item} </li>
                                                    
                                                )}
                                                
                                                </Draggable>
                                        })}
                                        
                                    </ul>
                                    {provided.placeholder}
                                    <input className='MyinputProg' name='taskProgress' onChange={this.savetask} value={this.state.taskProgress} placeholder='Add tasks in progress'/>
                                    <button className='MybtnProg' onClick={this.sendReduxTwo}>Create task</button>
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId='colunmThree'>
                            {(provided)=>(
                                <div className='columnThree'>
                                    <h1>Done</h1>
                                    <ul  {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.doneArray.map((item,index)=>{
                                            return <Draggable key={item} draggableId={item} index={index}>
                                                {(provided)=>(
                                                    
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef} className='taskthree'>{item} </li>
                                                    
                                                )}
                                                
                                                </Draggable>
                                        })}
                                        
                                    </ul>
                                    {provided.placeholder}
                                    <input className='MyinputDone' name='taskDone' onChange={this.savetask} value={this.state.taskDone} placeholder='Add done tasks'/>
                                    <button className='MybtnDone' onClick={this.sendReduxThree}>Create task</button>
                                </div>
                            )}
                        </Droppable>
                        <br/>
                        <Droppable droppableId='trash'>
                            {(provided)=> (
                                <div className='trash'>
                                    <h1>Trash</h1>
                                    <ul  {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.state.trash.map((item,index)=>{
                                            return <Draggable key={item} draggableId={item} index={index}>
                                                {(provided)=>(
                                                    
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef} className='trashli'>{item} </li>
                                                    
                                                )}
                                                
                                                </Draggable>
                                        })}
                                        
                                    </ul>
                                    {provided.placeholder}
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
        user: state.user
    }
}

export default connect(mapStateToProps, null)(DragAndDrop)