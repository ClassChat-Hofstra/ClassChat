import axios from "axios"

export const addCourse = (courseObject) => {
    return {
        type: "ADD_COURSE",
        payload: courseObject
    }
}
export const removeCourse = (crn) => {
    return {
        type: "REMOVE_COURSE",
        payload: crn
    }
}
export const loadCourses = (userEmail) => {
    // return {
    //     type: "LOAD_COURSES",
    //     payload: courseList
    // }
    console.log(userEmail);
    const request = axios.post("/courses/currentcourses", {
        email: userEmail
    });
    return (dispatch) => {
        request.then(({
            data
        }) => {
            console.log(data);
            dispatch({
                type: "LOAD_COURSES",
                payload: data
            })
        })
    }
}

// export const loadCourses = (userEmail) => async dispatch => {
//     try {
//         const request = await axios.post("/courses/currentcourses", {
//             email: userEmail
//         });

//         return request.data;

//     } catch (err) {
//         console.log(err);
//     }

// }


export const loadInitialCourses = (courseList) => {
    return {
        type: "LOAD_INITIAL_COURSES",
        payload: courseList
    }
}

export const sidebarAction = (name) => ({
    type: 'SIDEBAR',
    name
});

export const mobileSidebarAction = (status) => ({
    type: 'MOBILE_SIDEBAR',
    status
});

export const profileAction = (status) => ({
    type: 'PROFILE',
    status
});

export const mobileProfileAction = (status) => ({
    type: 'MOBILE_PROFILE',
    status
});

export const selectedChatAction = (chat) => ({
    type: 'SELECTED_CHAT',
    chat
});