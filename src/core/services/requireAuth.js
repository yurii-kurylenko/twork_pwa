import store from "@/store";

const requireAuth = (to, from, next) => {
  if (!store.getters["auth/userLoggedIn"]) {
    next("/sign/in");
  }
  else {
    next()
  }
};

export default requireAuth;

