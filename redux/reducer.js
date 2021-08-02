let InitialState = []


export const TodoReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADDTASK':
            return [...state, { id: action.payload.id, name: action.payload.name }]
        case 'DELETETASK':
            console.log(action.payload.id)
            console.log(state.filter(item => item.id != action.payload.id))
            return [ ...state.splice(1, action.payload.id)] 



        default:
            return state;
    }
}