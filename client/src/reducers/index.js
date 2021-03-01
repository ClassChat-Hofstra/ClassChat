import ManageCoursesReducer from './ManageCourses';
import CoursesReducer from "./Courses";

import {
    combineReducers
} from 'redux';

const allReducers = combineReducers({
    courseRoster: ManageCoursesReducer,
    courseList: CoursesReducer
})

export default allReducers;