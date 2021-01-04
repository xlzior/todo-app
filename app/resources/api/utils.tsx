export const getJsonData = (response: Response) => response.json().then(({ data }) => data);

export const getToken = () => document.querySelector("meta[name=csrf-token]").textContent;

export const get = (url: string) => fetch(url).then(getJsonData);

export const post = async (url: string, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data }),
  });
  return getJsonData(response);
}

export const patch = async (url: string, data, returnValue: any = false) => {
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data }),
  });
  return returnValue || getJsonData(response);
}

export const del = async (url: string, returnValue: any) => {
  await fetch(url, {
    method: "DELETE",
  });
  return returnValue;
}
