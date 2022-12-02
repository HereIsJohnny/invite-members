import { Avatar, Box, Button } from '@chakra-ui/react';
import { EmailIcon } from './emailIcon';

type Props = {
  children?: string;
  type: 'email' | 'user';
  onRemove: () => void;
};

// TODO: Tags should accept chakra props inline
export const TagComponent: React.FC<Props> = ({ children, type, onRemove }) => {
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
      cursor="default"
    >
      {type === 'email' ? (
        <EmailIcon mr="6px" />
      ) : (
        <Avatar mr="6px" name={children} size="xs" bg="red" scale="0.7" />
      )}
      {children}
      <Box display="inline" p="6px">
        <button onClick={() => onRemove()}>&#10005;</button>
      </Box>
    </Box>
  );
};
