import { register } from "../pages/user/register";
import { login }    from "../pages/user/login";
import { todo }     from "../pages/todo/todo";

const routes = [
  {
    path: "/register",
    linkLabel: "Register",
    content: register,
  },
  {
    path: "/login",
    linkLabel: "Login",
    content: login,
  },
  {
    path: "/todo",
    linkLabel: "My Tasks",
    content: todo,
    isAuthenticated: true,
  },
  {
    path: "/404",
    linkLabel: "Not Found",
    content: login,
  },
];

export default routes;