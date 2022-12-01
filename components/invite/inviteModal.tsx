import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { getUsers } from '../../services/userService';
import { validateEmail } from '../../utils/validateEmail';
import { ComboboxStyles } from '../combobox/combobox.styled';
import { TagComponent } from './tag';

type CustomTag = Tag & { email: string; type: 'email' | 'user' };

export const InviteModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [tags, setTags] = useState<CustomTag[]>([]);
  const [suggestions, setSuggestions] = useState<CustomTag[]>([
    {
      id: '1',
      email: 'maciej.kowalski@gmail.com',
      type: 'email',
      name: 'maciej.kowalski@gmail.com',
    },
    {
      id: '2',
      email: 'maciej.kowalski@gmail.com',
      type: 'user',
      name: 'maciej.kowalski@gmail.com',
    },
  ]);

  const reactTags = useRef();

  const handleDelete = useCallback(
    (tagIndex: number) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags],
  );

  const handleBlur = () => {
    reactTags.current && (reactTags.current as any).clearInput();
  };

  const handleAddition = (selectedTag: Tag) => {
    const newTag = suggestions.find(({ id }) => id === selectedTag.id);
    if (newTag) {
      setTags([...tags, newTag]);
      // setSuggestions([]); TODO: uncomment
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
                  placeholderText={
                    tags.length > 0 ? '' : 'Search names or emails...'
                  }
                  minQueryLength={1}
                  onBlur={handleBlur}
                  suggestions={suggestions}
                  suggestionsFilter={() => true}
                  onDelete={handleDelete}
                  onAddition={handleAddition as any}
                  // onInput={debouncedHandleInputChange}
                  tagComponent={({ tag }) => {
                    const customItem = tag as CustomTag;
                    return (
                      <TagComponent type={customItem.type}>
                        {customItem.name}
                      </TagComponent>
                    );
                  }}
                  suggestionComponent={({ item }) => {
                    const customItem = item as CustomTag;
                    return (
                      <TagComponent type={customItem.type}>
                        {customItem.name}
                      </TagComponent>
                    );
                  }}
                />
              </ComboboxStyles>
            </Flex>
            <Button variant="primary" disabled={tags.length < 1}>
              Invite
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
