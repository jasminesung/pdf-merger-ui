import axios from 'axios';
import { BASE_URL, MERGE_PATH } from '../constants';

export function mergePdf(file) {
    let formData = new FormData();
    file.forEach((file, i) => {
        formData.append(`file ${i}`, file);
    })

    return axios.post(`${BASE_URL}${MERGE_PATH}`, formData, {
        headers: {
            'accept': 'application/pdf'
        },
        responseType: 'blob'
    });
}
