const CoursesReducer = (state = [], action) => {
    switch (action.type) {
        case "LOAD_INITIAL_COURSES":
            return action.payload;
        default:
            return state;
    }
}

export default CoursesReducer;