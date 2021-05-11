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
        case "PIN_POST":
            console.log(action);
            return (state.map((course) => {
                if (course.crn === action.payload.crn) {
                    var alreadyPinned = course.pinnedPosts.find((posts) => {
                        return posts._id === action.payload.messageObject._id;
                    })
                    if (!alreadyPinned) {
                        course.pinnedPosts.push(action.payload.messageObject);
                    }
                }
                return course;
            }))
        case "REMOVE_PIN":
            return (state.map((course) => {
                if (course.crn === action.payload.crn) {
                    return {
                        ...course,
                        pinnedPosts: course.pinnedPosts.filter((post) => post._id !== action.payload.messageObj._id)
                    }
                }
                return course;
            }))

            // return produce(state, (draftState) => {
            //     draftState.map((course) => {
            //         if (course.crn === action.payload.crn) {
            //             // course.pinnedPosts.filter((post) => {
            //             //     return post._id !== action.payload.messageObj._id
            //             // })
            //             console.log("HEY IM CALLED AT LEAST");
            //             course.pinnedPosts = [];
            //         }
            //         return course;
            //     })
            // })
            //return newState;
        default:
            return state;
    }
}

export default ManageCoursesReducer;