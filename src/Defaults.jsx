import { createMuiTheme } from '@material-ui/core';

export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.pierpontlogistics.com';
export const PPGServer = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.pierpontglobal.com';
export const APP_SERVER = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://pierpontlogistics.com';

export const PPG_SECRET_KEY = process.env.NODE_ENV === 'development' ? '66c1bfe580dbe62ae6aaaf4d71ff2595e14be5fe' : '';
export const PPG_PUBLIC_KEY = process.env.NODE_ENV === 'development' ? '5BBfyxxzZwUnE4FLkWBrg9TZ' : '';

export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#3A3E43' },
    secondary: { main: '#FAFAFA' },
    accent: { main: '#27E888' },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Raleway, serif',
  },
});
