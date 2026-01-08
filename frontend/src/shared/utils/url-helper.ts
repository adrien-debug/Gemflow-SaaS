export const getCurrentEnvironmentUrl = () => window.location.origin;

export const getLoginWithRedirectBackUrl = () => `/login?redirectTo=${window.location.pathname}`;
