import { createMuiTheme } from '@material-ui/core';

export const ApiServer =
  process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:3001'
    : 'https://api.pierpontlogistics.com';
export const PPGServer =
  process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:3000'
    : 'https://api.pierpontglobal.com';
export const WEB_APP_LOGISTICS =
  process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:4001'
    : 'https://pierpontlogistics.com';
export const WEB_APP_PLATFORM =
  process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:4000' : '';

export const PPG_SECRET_KEY =
  process.env.NODE_ENV === 'development'
    ? 'f52e94126a0f3ceaee09b9c076a7e7353a8d0365'
    : '';
export const PPG_PUBLIC_KEY =
  process.env.NODE_ENV === 'development' ? '4ZjAu8uQshMCQgD4kp7BQ9xW' : '';

export const GOOGLE_API_KEY =
  process.env.NODE_ENV === 'development'
    ? 'AIzaSyA6p9-yG5S0jb7CtGAFFo07Dk3eMV2lyZg&libraries'
    : '';

export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
    secondary: { main: '#000' },
    accent: { main: '#000' }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Raleway, serif'
  }
});
