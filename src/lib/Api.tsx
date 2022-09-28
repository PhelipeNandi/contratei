import axios from "axios";

export const Api = axios.create({
    baseURL: "http://192.168.16.127:8080/api/"
});

export const ViaCep = axios.create({
    baseURL: "http://viacep.com.br/ws/"
});