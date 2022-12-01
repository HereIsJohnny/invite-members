import { Button, Center, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head';

import { InviteModal } from '../components/invite/inviteModal';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Head>
        <title>Invite Members</title>
      </Head>
      <main>
        <Center w={'100vw'} h={'100vh'} flexDirection="column">
          <Button onClick={onOpen} variant="secondary" size="medium">
            Invite teammates
          </Button>
        </Center>
      </main>

      <InviteModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
