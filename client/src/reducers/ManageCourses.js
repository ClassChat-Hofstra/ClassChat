import React from 'react';

const ManageCoursesReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_COURSE":
            return state.push(action.payload)
        default:
            return state;
    }
}

export default ManageCoursesReducer;

