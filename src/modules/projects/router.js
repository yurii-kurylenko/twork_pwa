import Projects from './Projects';
import requireAuth from "@/core/services/requireAuth";

export const PROJECT_ROUTES = {
  path: '/projects',
  component: Projects,
  name: 'projects',
  beforeEnter: requireAuth
};
