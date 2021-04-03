import axios from "axios";


const ManageCoursesReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_COURSE":
            return [...state, action.payload];
        case "REMOVE_COURSE":
            return state.filter(course => course.crn !== action.payload);
        case "LOAD_COURSES":
            return action.payload;
        case "UPDATE_MESSAGES":
            const courseToUpdate = state.find((course) => course.crn === action.payload.crn);
            const filteredState = state.filter(course => course.crn !== action.payload.crn);

            if (courseToUpdate !== undefined && filteredState !== undefined) {
                courseToUpdate.messages.push(action.payload.message);
                console.log(courseToUpdate);
                console.log(filteredState);
                return [...filteredState, courseToUpdate];
            }
            return state;
        default:
            return state;
    }
}

export default ManageCoursesReducer;