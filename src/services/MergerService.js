import axios from 'axios';

export function mergePdf(file) {
    let formData = new FormData();
    file.forEach((file, i) => {
        formData.append(`file ${i}`, file);
    })

    axios.post('http://localhost:5000/merge', formData).then((res) => {
        console.log(res);
    }, (err) => {
        console.error(err);
    })
}
