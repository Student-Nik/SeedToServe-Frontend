import { store } from "../store";

export const getToken = () => {
  return store.getState().user.token;
};

export const isAuthenticated = () => {
  const { isLoggedIN, token } = store.getState().user;
  return isLoggedIN && !!token;
};

export const getCurrentUser = () => {
  return store.getState().user.user;
};