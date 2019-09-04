import { createMuiTheme } from "@material-ui/core";

export const ApiServer =
  process.env.NODE_ENV === "development"
    ? "http://0.0.0.0:3001"
    : "https://api.pierpontlogistics.com";
export const PPGServer =
  process.env.NODE_ENV === "development"
    ? "http://0.0.0.0:3000"
    : "https://api.pierpontglobal.com";
export const WEB_APP_LOGISTICS =
  process.env.NODE_ENV === "development"
    ? "http://0.0.0.0:4001"
    : "https://pierpontlogistics.com";
export const WEB_APP_PLATFORM =
  process.env.NODE_ENV === "development" ? "http://0.0.0.0:4000" : "";

export const PPG_SECRET_KEY =
  process.env.NODE_ENV === "development"
    ? "31844aeb13702eda3daff5f0e8c3acc4152da413"
    : "";
export const PPG_PUBLIC_KEY =
  process.env.NODE_ENV === "development" ? "dfSv2vzRieJMmbevVbQMHWpB" : "";

export const GOOGLE_API_KEY = process.env.NODE_ENV === "development" ? "" : "";

export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: "#A81919" },
    secondary: { main: "#696D7D" },
    accent: { main: "#FD7E28" }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Raleway, serif"
  }
});
