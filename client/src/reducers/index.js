import ManageCoursesReducer from './ManageCourses';
import CoursesReducer from "./Courses";
import sidebarReducer from "./sidebarReducer"
import mobileSidebarReducer from "./mobileSidebarReducer"
import profileSidebarReducer from "./profileSidebarReducer"
import mobileProfileSidebarReducer from "./mobileProfileSidebarReducer"
import selectedChatReducer from "./selectedChatReducer"


import {
    combineReducers
} from 'redux';

const allReducers = combineReducers({
    courseRoster: ManageCoursesReducer,
    courseList: CoursesReducer,
    selectedSidebar: sidebarReducer,
    mobileSidebar: mobileSidebarReducer,
    profileSidebar: profileSidebarReducer,
    mobileProfileSidebar: mobileProfileSidebarReducer,
    selectedChat: selectedChatReducer
})

export default allReducers;