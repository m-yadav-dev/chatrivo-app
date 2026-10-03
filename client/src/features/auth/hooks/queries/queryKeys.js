// queryKeys for login API
export const loginKeys = {
  all: ["login"],
  user: () => [...loginKeys.all, "user"],
};
