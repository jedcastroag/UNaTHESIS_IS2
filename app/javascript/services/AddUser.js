import axios from 'axios';

export default {
    add_user(email) {
        return axios.post('/process', {
            email: email            
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.error(error);
        });
    }
}
