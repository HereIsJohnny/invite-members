import { Avatar, Box } from '@chakra-ui/react';
import { EmailIcon } from './emailIcon';

type Props = {
  children?: string;
  type: 'email' | 'user';
};

// TODO: Suggestion should accept chakra props inline
export const TagComponent: React.FC<Props> = ({ children, type }) => {
  return (
    <Box
      display="inline-block"
      borderRadius="10px"
      border="1px"
      borderColor="red"
      color="red"
      fontSize="0.6875rem"
      lineHeight="1.81"
      fontWeight="400"
      px={3}
      py={1.5}
      mr="6px"
      mb="6px"
    >
      {type === 'email' ? (
        <EmailIcon mr="6px" />
      ) : (
        <Avatar name={children} size="xs" bg="red" mr="6px" scale="0.7" />
      )}
      {children}
    </Box>
  );
};
