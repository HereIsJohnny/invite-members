import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import { Lato } from '@next/font/google';

const inter = Lato({
  weight: ['400', '700'],
  style: ['normal'],
});

const colors = {
  brand: {
    bg: '#272D45',
    secondary: '#EE748F',
  },
  grey: {
    200: '#47475E',
    800: '#E7ECF0',
  },
};

const fonts = {
  body: `${inter.style.fontFamily}, system-ui, sans-serif`,
  heading: `${inter.style.fontFamily}, Georgia, serif`,
};

const theme = extendTheme({
  colors,
  fonts,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
