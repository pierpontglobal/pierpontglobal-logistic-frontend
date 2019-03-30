import { createMuiTheme } from '@material-ui/core';

export const ApiServer =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://api.pierpontlogistics.com';
export const PPGServer =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.pierpontglobal.com';
export const WEB_APP_LOGISTICS =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://pierpontlogistics.com';
export const WEB_APP_PLATFORM =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';

export const PPG_SECRET_KEY =
  process.env.NODE_ENV === 'development'
    ? '66c1bfe580dbe62ae6aaaf4d71ff2595e14be5fe'
    : '';
export const PPG_PUBLIC_KEY =
  process.env.NODE_ENV === 'development' ? 'XrR624RH4y5phVRFBrVvnKzg' : '';

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
