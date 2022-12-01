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
import { useCallback, useContext, useRef, useState } from 'react';
import ReactTags, { Tag } from 'react-tag-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { getUsers } from '../../services/userService';
import { validateEmail } from '../../utils/validateEmail';
import { ComboboxStyles } from '../../components/combobox/combobox.styled';
import { SuggestionComponent } from './components/suggestion';
import { TagComponent } from './components/tag';
import { UserContext } from '../../pages';

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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { setUsers } = useContext(UserContext);

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setUsers(tags.map(tag => ({ ...tag, id: `${tag.id}` })));
    setTags([]);
    onClose();
  };

  const debounceHandleInputChange = debounce(handleInputChange, 200);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="darkBlue" p={16}>
        <Heading mb={8} fontSize="1.5rem" textAlign="center">
          Invite members
        </Heading>
        <Text mb={4}>Email invite</Text>
        <Text mb={6} color="grey.900">
          Send members as email invitation to join this workspace
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="row" gap={4}>
            <ComboboxStyles>
              <ReactTags
                ref={reactTags as any}
                tags={tags}
                suggestions={suggestions}
                minQueryLength={1}
                // onBlur={handleBlur}
                suggestionsFilter={() => true}
                onDelete={handleDelete}
                onAddition={handleAddition}
                onInput={debounceHandleInputChange}
                placeholderText={
                  tags.length > 0 ? '' : 'Search names or emails...'
                }
                tagComponent={({ tag }) => {
                  const customItem = tag as CustomTag;
                  const onRemove = () => handleDeleteById(`${customItem.id}`);
                  return (
                    <TagComponent type={customItem.type} onRemove={onRemove}>
                      {customItem.name}
                    </TagComponent>
                  );
                }}
                suggestionComponent={({ item: suggestion }) => {
                  const customItem = suggestion as Suggestion;
                  return (
                    <SuggestionComponent type={customItem.type}>
                      {customItem.name}
                    </SuggestionComponent>
                  );
                }}
              />
            </ComboboxStyles>

            <Button variant="primary" disabled={tags.length < 1} type="submit">
              Invite
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
};
