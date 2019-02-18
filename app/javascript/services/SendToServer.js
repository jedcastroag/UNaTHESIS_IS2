import axios from 'axios';

export default {
    addData(action,data) {
        console.log(data);
        return axios.post(action, data).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.error(error);
        });
    }
}
