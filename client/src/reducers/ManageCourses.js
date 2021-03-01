import React from 'react';

const ManageCoursesReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_COURSE":
            return [...state, action.payload];
        case "REMOVE_COURSE":
            return state.filter(course => course.crn !== action.payload);
        case "LOAD_COURSES":
            return action.payload;
        default:
            return state;
    }
}

export default ManageCoursesReducer;