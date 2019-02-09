import axios from 'axios';

export default {
    add_student(email) {
        return axios.post(
            "/new_process",
            {email: email}
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
}
