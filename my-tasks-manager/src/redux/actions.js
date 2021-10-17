export const ADD = 'ADD';
export const ORDER = 'ORDER';
export const PROGRESS = 'PROGRESS';
export const ORDERPROG = 'ORDERPROG';
export const DONE = 'DONE';
export const ORDERDONE = 'ORDERDONE';
export const USERDATA = 'USERDATA';
export const USERTABLE = 'USERTABLE'

export const addTask = (val) =>  { //(dispatch) =>

    // console.log(val);
    // fetch('http://localhost:4000/addTask',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(val)
    // })
    // .then(data => {
    //     console.log(data); 
    //     dispatch({
    //         type: ADD,
    //         payload: data.currentTask
    //     })
    // })
    // .catch(err => console.log(err))
    return{
        type: ADD,
        payload: val.task
    }
}

export const orderedArr = (val) => {
    return{
        type: ORDER,
        payload: val
    }
}

export const addInProgress = (val) => {
    return{
        type: PROGRESS,
        payload: val.task
    }
}

export const orderedProgress = (val) => {
    return{
        type: ORDERPROG,
        payload: val
    }
}

export const addToDone = (val) => {
    return{
        type: DONE,
        payload: val.task
    }
}

export const orderedDone = (val) => {
    return{
        type: ORDERDONE,
        payload: val
    }
}

export const userData = (val) => {
    // console.log('form actions');
    return{
        type: USERDATA,
        payload: val
    }
}

export const userTable = (val) => {
    // console.log('table user', val);
    return{
        type: USERTABLE,
        payload: val
    }
}