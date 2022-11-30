import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import { m } from 'framer-motion';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    bg: '#272D45',
    secondary: '#EE748F',
  },
};

const theme = extendTheme({
  colors,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
