import {ADD, ORDER, PROGRESS, ORDERPROG, DONE, ORDERDONE, USERDATA, USERTABLE} from './actions'

let initState = {
    toDoList: [],
    inProgressList: [],
    doneList: [],
    user: null,
    token: null,
    userTable: null
    
}

export const reducer = (state=initState, action={}) => {
    switch (action.type) {
        case ADD: 
            let newArr = [...state.toDoList]
            newArr.push(action.payload)
            
            return {...state, toDoList: [...newArr] }

        case ORDER:
            return {...state, toDoList: [...action.payload]}

        case PROGRESS: 
            let newArrTwo = [...state.inProgressList]
            newArrTwo.push(action.payload)
            return {...state, inProgressList: [...newArrTwo]}

        case ORDERPROG:
            return {...state, inProgressList: [...action.payload]}

        case DONE:
            let newArrThree = [...state.doneList]
            newArrThree.push(action.payload)
            return {...state, doneList: [...newArrThree]}

        case ORDERDONE:
            return {...state, doneList: [...action.payload]}
        case USERDATA: 
            let {user, token} = action.payload
            return {...state, user: [...user], token: token}
        case USERTABLE:
            let {data_table} = action.payload[0]
            let {table} = data_table
            let {toDo, inProgress, done} = table
            return {...state, toDoList: [...toDo], inProgressList: [...inProgress], doneList: [...done]}
        default:
            return {...state}
    }
}