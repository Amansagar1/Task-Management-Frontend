const BASE_URL = "http://localhost:5000/api";
console.log(BASE_URL)
const EndPoints = {

    LOGIN: () => BASE_URL + '/auth/login',
    REGISTER: () => BASE_URL + '/auth/register',
    TASKS: () => BASE_URL + '/tasks',
    GET_TASKS: () => BASE_URL + '/tasks',
    TASK: (id) => BASE_URL + `/tasks/${id}`,
    DELETE_TASK: (id) => BASE_URL + `/tasks/${id}`,
    GET_CATEGORY: (category) => BASE_URL + `/tasks?category=${encodeURIComponent(category)}`,
    GET_STATUS: (status) => BASE_URL + `/tasks?status=${encodeURIComponent(status)}`,
    GET_GROCERIES: (searchTerm) => BASE_URL + `/tasks?search=${encodeURIComponent(searchTerm)}`,
    GET_SUMMARY: () => BASE_URL + '/tasks/summary',




};

Object.freeze(EndPoints);

export default EndPoints;



