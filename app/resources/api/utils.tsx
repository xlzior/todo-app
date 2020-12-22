export const getJsonData = response => response.json().then(({ data }) => data);

export const getToken = () => document.querySelector("meta[name=csrf-token]").textContent;