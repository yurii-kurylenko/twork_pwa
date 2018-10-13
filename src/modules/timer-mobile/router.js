import Timer from './Timer';
import requireAuth from "@/core/services/requireAuth";

export const TIMER_MOBILE_ROUTES = {
  path: '/timer',
  component: Timer,
  name: 'timer',
  beforeEnter: requireAuth
};
