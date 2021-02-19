import ManageCoursesReducer from './ManageCourses';
import {
    combineReducers
} from 'redux';

const allReducers = combineReducers({
    courseRoster: ManageCoursesReducer
})

export default allReducers;