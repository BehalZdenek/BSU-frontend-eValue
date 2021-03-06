import superagentPromise from "superagent-promise";
import _superagent from "superagent";
//import { request } from "http";

const superagent = superagentPromise(_superagent, global.Promise);

let API_ROOT = "http://private-9aad-note10.apiary-mock.com";

const responseBody = res => res.body;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
    }
    return err;
};

const requests = {
    del: (url, body) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .send(`${body}`)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`)
            .send(`${body}`)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .type("form")
            .send(`${body}`)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .then(responseBody),
    postJSON: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .type("form")
            .send(`${body}`)
            .set("Content-Type", "application/json")
            .then(responseBody),
    post_upload: (url, file) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .attach("files[]", file)
            .end(handleErrors)
            .then(responseBody),
    postImage: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .type("form")
            .send(`${body}`)
            .set("Content-Type", "multipart/form-data")
            .then(responseBody)
};

const NOTES = "/notes";
const Notes = {
    getNotes: () => requests.get(`${NOTES}`),
    getNote: id => requests.get(`${NOTES}/${id}`),
    addNote: body => requests.post(`${NOTES}`, body),
    deleteNote: id => requests.del(`${NOTES}/${id}`),
    updateNote: (id, body) => requests.put(`${NOTES}/${id}`, body)
};

export default {
    Notes
};
