const selectedChatReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_CHAT':
            return action.chat;
        case 'UNSELECT_CHAT':
            return []
        default:
            return state
    }
};

export default selectedChatReducer;