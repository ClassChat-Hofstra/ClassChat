const currentUserReducer = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_CURRENT_USER":
            return action.payload;
        case "UPDATE_USERS_NAME":
            return {
                ...state, name: action.payload
            };
        case "UPDATE_USERS_EMAIL":
            return {
                ...state, email: action.payload
            };
        default:
            return state;
    }
}

export default currentUserReducer;