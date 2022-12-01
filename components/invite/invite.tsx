import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import { validateEmail } from '../../utils/validateEmail';
import { ComboboxStyles } from '../combobox/combobox.styled';
import { EmailIcon } from './emailIcon';
import { v4 as uuidv4 } from 'uuid';
import { getUsers } from '../../services/userService';
import debounce from 'lodash.debounce';

type CustomTag = Tag & { email: string; type: 'email' | 'user' };

export const Invite = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [tags, setTags] = useState<CustomTag[]>([]);

  const [suggestions, setSuggestions] = useState<CustomTag[]>([]);

  const reactTags = useRef();

  const handleDelete = useCallback(
    (tagIndex: number) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags],
  );

  const handleAddition = (selectedTag: Tag) => {
    const newTag = suggestions.find(({ id }) => id === selectedTag.id);
    if (newTag) {
      setTags([...tags, newTag]);
      setSuggestions([]);
    }
  };

  const handleInputChange = async (input: string) => {
    if (tags.some(({ email, id }) => email === input)) {
      return;
    }

    if (validateEmail(input)) {
      await setSuggestions([
        { id: uuidv4(), name: input, email: input, type: 'email' },
      ]);
    }

    const userResponse = await getUsers(input);
    const filteredResponse = userResponse.filter(
      user => !tags.some(({ id }) => id === user.id),
    );

    if (userResponse.length > 0) {
      setSuggestions([...filteredResponse]);
    }
  };

  const debouncedHandleInputChange = debounce(handleInputChange, 200);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="darkBlue" p={16}>
        <ModalBody>
          <Heading mb={8} fontSize="1.5rem" textAlign="center">
            Invite members
          </Heading>
          <Text mb={4}>Email invite</Text>
          <Text mb={6} color="grey.900">
            Send members as email invitation to join this workspace
          </Text>
          <Flex flexDirection="row" gap={4}>
            <Flex flexGrow={1}>
              <ComboboxStyles>
                <ReactTags
                  ref={reactTags as any}
                  tags={tags}
                  placeholderText="Search names or emails..."
                  minQueryLength={1}
                  suggestions={suggestions}
                  suggestionsFilter={() => true}
                  onDelete={handleDelete}
                  onAddition={handleAddition as any}
                  onInput={debouncedHandleInputChange}
                  suggestionComponent={({ item, query }) => {
                    const customItem = item as CustomTag;
                    return (
                      <Box
                        display="inline-block"
                        border="brand.secondary"
                        borderRadius="10px"
                        fontSize="sm"
                        width="100%"
                      >
                        {customItem.type === 'email' ? (
                          <EmailIcon />
                        ) : (
                          <Avatar
                            name={customItem.name}
                            bg="brand.secondary"
                            size={'xs'}
                          />
                        )}

                        {customItem.name}
                      </Box>
                    );
                  }}
                />
              </ComboboxStyles>
            </Flex>
            <Button variant="primary">Invite</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
