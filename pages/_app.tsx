import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Color from 'color';
import { extendTheme } from '@chakra-ui/react';
import { Lato } from '@next/font/google';

const inter = Lato({
  weight: ['400', '700'],
  style: ['normal'],
});

const colors = {
  blue: '#2C54EA',
  darkBlue: '#272D45',
  white: '#FFF',
  grey: {
    200: '#47475E',
    700: '#DBE1E6',
    800: '#E7ECF0',
    900: '#8C9DB5',
  },
  darkGrey: {
    100: '#202437',
    200: '#383C56',
  },
  red: '#EE748F',
};

const fonts = {
  body: `${inter.style.fontFamily}, system-ui, sans-serif`,
  heading: `${inter.style.fontFamily}, Georgia, serif`,
};

const components = {
  Button: {
    sizes: {
      medium: {
        px: '3',
        py: '2',
        fontSize: '.875rem',
        lineHeight: '1.5',
      },
      big: {
        fontSize: '.8125rem',
        lineHeight: '1',
        px: '5.625',
        py: '2.5',
      },
    },
    variants: {
      primary: {
        bg: 'blue',
        color: 'white',
        _hover: {
          bg: Color(colors.blue).darken(0.05).hex(),
        },
      },
      secondary: {
        bg: 'grey.200',
        color: 'grey.800',
        fontWeight: '700',
        _hover: {
          bg: Color(colors.grey[200]).darken(0.05).hex(),
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      color: 'grey.700',
      fontWeight: '700',
      // lineHeight: '1.2', TODO: fix it
    },
  },
  Text: {
    baseStyle: {
      color: 'grey.700',
      fontSize: '0.9375rem',
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
