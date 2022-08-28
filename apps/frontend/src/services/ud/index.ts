import UAuth from "@uauth/js";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const NEXT_PUBLIC_FRONTEND_ENDPOINT = process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT;

const uauth = new UAuth({
  clientID: "c7f2d46d-9d91-488d-91d3-c1baa846b8a7",
  redirectUri: "https://axit.dev",
  scope: "openid wallet",
});

export default uauth;
