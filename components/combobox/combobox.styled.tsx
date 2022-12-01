import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

/**
 * <div class="react-tags">
 *   <div class="react-tags__selected">
 *     <button class="react-tags__selected-tag">
 *       <span class="react-tags__selected-tag-name" />
 *     </button>
 *   </div>
 *   <div class="react-tags__search">
 *     <div class="react-tags__search-wrapper">
 *       <input class="react-tags__search-input" />
 *       <div />
 *     </div>
 *     <div class="react-tags__suggestions">
 *       <ul>
 *         <li class="is-active">
 *           <mark />
 *         </li>
 *         <li class="is-disabled">
 *           <mark />
 *         </li>
 *       </ul>
 *     </div>
 *   </div>
 */

export const ComboboxStyles: React.FC<Props> = ({ children }) => (
  <Box
    width={'100%'}
    sx={{
      '.react-tags': {
        position: 'relative',
        padding: '10px 10px',
        background: 'var(--chakra-colors-darkGrey-100)',
        border: '1px solid var(--chakra-colors-darkGrey-200)',
        borderRadius: '10px',
        /* shared font styles */
        fontSize: '1em',
        lineHeight: '1.2',
        /* clicking anywhere will focus the input */
        cursor: 'text',

        '&.is-focused': {
          borderColor: '#B1B1B1',
        },

        '&__selected': {
          display: 'inline',
        },

        '&__search': {
          display: 'inline-block',
          position: 'relative',
          width: '100%',

          /* match tag layout */
          // padding: '7px 2px',
          // marginBottom: '6px',

          /* prevent autoresize overflowing the container */
          maxWidth: '100%',
        },

        '&__search-input': {
          color: '#DBE1E6',

          /* prevent autoresize overflowing the container */
          maxWidth: '100%',

          /* remove styles and layout from this element */
          margin: '0',
          padding: '0',
          border: '0',
          outline: 'none',
          background: 'none',

          /* match the font styles */
          fontSize: 'inherit',
          lineHeight: 'inherit',

          '&::-ms-clear': {
            display: 'none',
          },

          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },

        '&__suggestions': {
          position: 'absolute',
          marginTop: '10px',
          top: '100%',
          left: '0',
          width: '100%',

          ul: {
            margin: '4px -10px',
            padding: '0',
            listStyle: 'none',
            background: 'var(--chakra-colors-darkGrey-100)',
            border: '1px solid #B1B1B1',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          },

          li: {
            // borderBottom: '1px solid #ddd',
            padding: '6px 8px',
            // background: 'var(--chakra-colors-darkGrey-100)',
            borderBottom: '1px solid var(--chakra-colors-darkGrey-200)',

            '&:hover': {
              cursor: 'pointer',
              // color: 'green!important',
              background: 'var(--chakra-colors-darkGrey-200)',
              // background: 'var(--chakra-colors-darkGrey-100)',
            },

            '&.is-active': {
              // background: 'white',
              background: 'var(--chakra-colors-darkGrey-200)',
              color: 'green!important',
            },

            '&.is-disabled': {
              opacity: '0.5',
              cursor: 'auto',
            },
          },

          'li mark': {
            textDecoration: 'underline',
            background: 'none',
            fontWeight: '600',
          },
        },
      },
      '@media screen and (min-width: 30em)': {
        '.react-tags__search': { position: 'relative' },
        // '.react-tags__suggestions': { width: '240px' },
      },
    }}
  >
    {children}
  </Box>
);
