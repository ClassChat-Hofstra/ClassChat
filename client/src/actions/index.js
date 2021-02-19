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