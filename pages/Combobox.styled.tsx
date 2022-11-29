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
    sx={{
      '.react-tags': {
        position: 'relative',
        padding: '6px 0 0 6px',
        border: '1px solid #D1D1D1',
        borderRadius: '1px',
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

        '&__selected-tag': {
          display: 'inline-block',
          boxSizing: 'border-box',
          margin: '0 6px 6px 0',
          padding: '6px 8px',
          border: '1px solid #D1D1D1',
          borderRadius: '2px',
          background: ' #F1F1F1',

          /* match the font styles */
          fontSize: 'inherit',
          lineHeight: 'inherit',

          '&:after': {
            content: '"\2715"',
            color: '#AAA',
            marginLeft: '8px',
          },

          '&:hover': {
            borderColor: '#B1B1B1',
          },

          '&:focus': {
            borderColor: '#B1B1B1',
          },
        },

        '&__search': {
          display: 'inline-block',

          /* match tag layout */
          padding: '7px 2px',
          marginBottom: '6px',

          /* prevent autoresize overflowing the container */
          maxWidth: '100%',
        },

        '&__search-input': {
          /* prevent autoresize overflowing the container */
          maxWidth: '100%',

          /* remove styles and layout from this element */
          margin: '0',
          padding: '0',
          border: '0',
          outline: 'none',

          /* match the font styles */
          fontSize: 'inherit',
          lineHeight: 'inherit',

          '&::-ms-clear': {
            display: 'none',
          },
        },

        '&__suggestions': {
          position: 'absolute',
          top: '100%',
          left: '0',
          width: '100%',

          ul: {
            margin: '4px -1px',
            padding: '0',
            listStyle: 'none',
            background: 'white',
            border: '1px solid #D1D1D1',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          },

          li: {
            borderBottom: '1px solid #ddd',
            padding: '6px 8px',

            '&:hover': {
              cursor: 'pointer',
              background: '#eee',
            },

            '&.is-active': {
              background: '#b7cfe0',
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
        '.react-tags__suggestions': { width: '240px' },
      },
    }}
  >
    {children}
  </Box>
);
