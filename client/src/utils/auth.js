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

export const getCustomerId = () => {
  const state = store.getState();
  const userState = state.user;

  const user = userState?.user;

  if (!user) {
    console.error("User object is missing from Redux");
    return null;
  }

  // Try all common ID structures
  const customerId =
    user.customerId ??
    user.customerID ??
    user.customer_id ??
    user.id ??
    user._id ??
    user.userId ??
    user.userID ??
    user.customer?.id ??
    user.customer?.customerId ??
    user.data?.customerId ??
    user.data?.id ??
    null;

  console.log("Resolved Customer ID:", customerId);
  console.log("================================");

  return customerId;
};