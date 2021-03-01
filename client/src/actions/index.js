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
export const loadCourses = (courseList) => {
    return {
        type: "LOAD_COURSES",
        payload: courseList
    }
}

export const loadInitialCourses = (courseList) => {
    return {
        type: "LOAD_INITIAL_COURSES",
        payload: courseList
    }
}