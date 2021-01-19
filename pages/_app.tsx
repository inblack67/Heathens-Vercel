import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import '../styles/globals.css';
import { theme } from '../styles/styles';
import CSnackbar from '../components/CSnackbar';
import { RecoilRoot } from 'recoil';

console.log = function () { };
console.error = function () { };

function MyApp ({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <CSnackbar />
        <Component { ...pageProps } />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
