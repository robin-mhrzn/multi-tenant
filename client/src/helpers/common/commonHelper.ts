import { message } from "antd";

export const isSubDomain = (): boolean => {
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  return host !== subdomain;
};
export const getCurrentProtocol = () => {
  return window.location.protocol + "//";
};
export const showMessage = (success: boolean, msg: string) => {
  if (success) {
    message.success(msg);
  } else {
    message.error(msg);
  }
};

// export const showConfirm = (message: string, callback: () => void) => {

// };

export const getAuthToken = () => {
  let authToken = localStorage.getItem("authToken");
  return authToken == undefined ? "" : authToken;
};
export const formatDate = (isoDate: string) => {
  const formattedDate = new Date(isoDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
export const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = new Date(isoDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${date} ${time}`; // Concatenating date and time without 'at'
};

export const convertJsonToFormData = (jsonObj: any) => {
  const formData = new FormData();
  Object.keys(jsonObj).forEach((key) => {
    const value = jsonObj[key];
    formData.append(key, value);
  });
  return formData;
};

export const isJsonString = (value: any) => {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const getCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear;
};
