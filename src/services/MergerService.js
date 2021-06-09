import axios from 'axios';

export function mergePdf(file) {
    let formData = new FormData();
    file.forEach((file, i) => {
        formData.append(`file ${i}`, file);
    })

    return axios.post('http://localhost:5000/merge', formData, {
        headers: {
            'accept': 'application/pdf'
        },
        responseType: 'blob'
    });
}
