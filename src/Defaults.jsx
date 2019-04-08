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
    ? "2ca9963f3ee0647ade22302f6d89abfe84acb262"
    : "";
export const PPG_PUBLIC_KEY =
  process.env.NODE_ENV === "development" ? "ArE5KRqqmNd6b3KUrb7s6emk" : "";

export const GOOGLE_API_KEY =
  process.env.NODE_ENV === "development"
    ? "AIzaSyA6p9-yG5S0jb7CtGAFFo07Dk3eMV2lyZg&libraries"
    : "";

export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: "#A81919" },
    secondary: { main: "#696D7D" },
    accent: { main: "#fb3e3e" }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Raleway, serif"
  }
});
