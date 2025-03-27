import axios from "axios";

export const Api = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;

    return axios.create({
        baseURL: `https://${apiHost}`,
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": apiKey || "",
            "X-RapidAPI-Host": apiHost || ""
        }
    });
}