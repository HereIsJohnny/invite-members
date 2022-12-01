import { Avatar, Box } from '@chakra-ui/react';
import { EmailIcon } from '../emailIcon';

type Props = {
  children?: string;
  type: 'email' | 'user';
};

// TODO: Suggestion should accept chakra props inline
export const SuggestionComponent: React.FC<Props> = ({ children, type }) => {
  return (
    <Box color="grey.700" padding="6px">
      {type === 'email' ? (
        <EmailIcon mr="6px" />
      ) : (
        <Avatar name={children} size="xs" bg="red" mr="6px" scale="0.7" />
      )}
      {children}
    </Box>
  );
};
