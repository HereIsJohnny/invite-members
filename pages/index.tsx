import {
  Button,
  Center,
  List,
  ListItem,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { createContext, useState } from 'react';

import { InviteModal } from '../features/invite/inviteModal';
interface User {
  email: string;
  name: string;
  id: string;
  type: string;
}
interface UserContextInterface {
  setUsers: (users: User[]) => void;
}
// TOOD: extract to the providers
export const UserContext = createContext<UserContextInterface>({
  setUsers: () => {},
});

UserContext.displayName = 'Invited Users';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div>
      <Head>
        <title>Invite Members</title>
      </Head>
      <main>
        <Center w={'100vw'} h={'100vh'} flexDirection="column">
          <Button mb="6" onClick={onOpen} variant="secondary" size="medium">
            Invite teammates
          </Button>
          <ol>
            {users.map(user => (
              <li key={user.id}>
                {user.type} - {user.name}
              </li>
            ))}
          </ol>
        </Center>
      </main>
      <UserContext.Provider value={{ setUsers }}>
        {isOpen && <InviteModal isOpen={isOpen} onClose={onClose} />}
      </UserContext.Provider>
    </div>
  );
}
