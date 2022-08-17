import axios from "axios";


const BASE_URL = "http://localhost:3001/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmFkYjFiM2I3MWFiOTk0OTdmOGFjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDc1MDAwNSwiZXhwIjoxNjYxMDA5MjA1fQ.SsAZtB7ma4NvRGDTXBieg5-DMD4w3hIAuo0Z1jw_QGs";


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});