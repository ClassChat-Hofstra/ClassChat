import axios from "axios"
import io from "socket.io-client";

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

export const updateMessages = (message, crn, isSection) => {
    return {
        type: "UPDATE_MESSAGES",
        payload: {
            message,
            crn,
            isSection
        }
    }
}

// export const loadCourses = (userEmail) => {
//     // return {
//     //     type: "LOAD_COURSES",
//     //     payload: courseList
//     // }
//     const request = axios.post("/courses/currentcourses", {
//         email: userEmail
//     });
//     return (dispatch) => {
//         request.then(({
//             data
//         }) => {
//             dispatch({
//                 type: "LOAD_COURSES",
//                 payload: data
//             })
//         })
//     }
// }

export const loadCourses = (courseList) => {
    return {
        type: "LOAD_COURSES",
        payload: courseList
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
}

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

export const unselectChat = () => ({
    type: 'UNSELECT_CHAT'
});

export const setSocket = (socket) => {
    return {
        type: 'SET_SOCKET',
        payload: socket
    }
}

export const pinPost = (post) => {
    return {
        type: "PIN_POST",
        payload: post
    }
}

export const removePin = (post) => {
    return {
        type: "REMOVE_PIN",
        payload: post
    }
}

export const createSection = (section) => {
    return {
        type: "CREATE_SECTION",
        payload: section
    }
}

export const updateCurrentUser = (user) => {
    return {
        type: "UPDATE_CURRENT_USER",
        payload: user
    }
}

export const updateUsersName = (newName) => {
    return {
        type: "UPDATE_USERS_NAME",
        payload: newName
    }
}

export const updateUsersEmail = (newEmail) => {
    return {
        type: "UPDATE_USERS_EMAIL",
        payload: newEmail
    }
}