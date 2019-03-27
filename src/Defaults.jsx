import { createMuiTheme } from '@material-ui/core';

export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.pierpontglobal.com';

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
