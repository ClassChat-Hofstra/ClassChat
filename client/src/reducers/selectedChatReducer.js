const selectedChatReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_CHAT':
            return action.chat;
        case 'UNSELECT_CHAT':
            return []
        case 'CREATE_SECTION':
            //console.log(action.payload);
            //state.sections.push(action.payload);
            const newState = Object.assign({}, state);
            newState.sections.push(action.payload);
            return newState;
        default:
            return state
    }
};

export default selectedChatReducer;