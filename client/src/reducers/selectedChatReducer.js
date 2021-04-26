const selectedChatReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_CHAT':
            return action.chat;
        case 'UNSELECT_CHAT':
            return []
        case 'ADD_MESSAGE':
            state.messages.push(action.payload);
            return state;
        default:
            return state
    }
};

export default selectedChatReducer;