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
import { useCallback, useRef, useState } from 'react';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { getUsers } from '../../services/userService';
import { validateEmail } from '../../utils/validateEmail';
import { ComboboxStyles } from '../../components/combobox/combobox.styled';
import { SuggestionComponent } from './components/suggestion';
import { TagComponent } from './components/tag';

type CustomTag = Tag & { email: string; type: 'email' | 'user' };
type Suggestion = CustomTag;

export const InviteModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const reactTags = useRef();
  const [tags, setTags] = useState<CustomTag[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    // {
    //   id: '1',
    //   email: 'maciej.kowalski@gmail.com',
    //   type: 'email',
    //   name: 'maciej.kowalski@gmail.com',
    // },
    // {
    //   id: '2',
    //   email: 'maciej.kowalski@gmail.com',
    //   type: 'user',
    //   name: 'maciej.kowalski@gmail.com',
    // },
  ]);

  const handleDelete = useCallback(
    (tagIndex: number) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags],
  );

  const handleDeleteById = useCallback(
    (idToDelete: string) => {
      setTags(tags.filter(({ id }) => id !== idToDelete));
    },
    [tags],
  );

  const handleBlur = useCallback(() => {
    reactTags.current && (reactTags.current as any).clearInput();
  }, [reactTags.current]);

  const handleAddition = useCallback(
    (selectedTag: Tag) => {
      const customTagToAdd = suggestions.find(
        ({ id }) => id === selectedTag.id,
      );
      if (customTagToAdd) {
        setTags([...tags, customTagToAdd]);
      }
      setSuggestions([]);
    },
    [suggestions, tags],
  );

  const handleInputChange = async (input: string) => {
    setSuggestions([]);
    const isDuplication = tags.some(({ email }) => email === input);
    if (isDuplication) {
      return;
    }

    if (validateEmail(input)) {
      setSuggestions([
        { id: uuidv4(), name: input, email: input, type: 'email' },
      ]);
    }

    try {
      const userResponse = await getUsers(input);
      const notSelectedUsers = userResponse.filter(
        user => !tags.some(({ id }) => id === user.id),
      );

      if (notSelectedUsers.length > 0) {
        setSuggestions(notSelectedUsers);
      }
    } catch (e) {
      console.log('logging to the sentry', e);
    }
  };

  const debounceHandleInputChange = debounce(handleInputChange, 200);

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
                  onAddition={handleAddition}
                  onInput={debounceHandleInputChange}
                  tagComponent={({ tag }) => {
                    const customItem = tag as CustomTag;
                    return (
                      <TagComponent
                        type={customItem.type}
                        onRemove={() => handleDeleteById(`${customItem.id}`)}
                      >
                        {customItem.name}
                      </TagComponent>
                    );
                  }}
                  suggestionComponent={({ item }) => {
                    const customItem = item as CustomTag;
                    return (
                      <SuggestionComponent type={customItem.type}>
                        {customItem.name}
                      </SuggestionComponent>
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
