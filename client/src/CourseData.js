import axios from 'axios';



async function getCourseData() {
    const response = await axios.get("/courses/allcourses");
    return response.data;
}

export default getCourseData;