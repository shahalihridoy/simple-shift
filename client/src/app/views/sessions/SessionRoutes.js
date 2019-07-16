import SignUp from "./SignUp";
import SignIn from './SignIn';
import NotFound from "./NotFound";

const sessionRoutes = [
  {
    path: '/session/signup',
    component: SignUp
  },
  {
    path: '/session/signin',
    component: SignIn
  },
  {
    path: '/session/404',
    component: NotFound
  }
]

export default sessionRoutes;