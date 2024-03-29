interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ErrorRegex = /error/gi;

const Users = [
  {
    firstName: 'Tara',
    lastName: 'Halvik',
    id: (Math.random() * 1000).toString(),
    email: 'tara@claap.io',
  },
  {
    firstName: 'Tristan',
    lastName: 'Agosta',
    id: (Math.random() * 1000).toString(),
    email: 'tristan@claap.com',
  },
];

const normalize = (input: string): string => {
  return input.trim().toLowerCase();
};

const searchUser = async (input: string): Promise<User[]> => {
  const normalized = normalize(input);

  await delay(200 + Math.random() * 200);

  if (normalized.match(ErrorRegex)) {
    throw new Error('Backend failed for some reasons.');
  }

  if (!normalized) {
    return [];
  }

  return Users.filter(({ firstName, lastName, email }) => {
    if (email === normalized) {
      return true;
    }

    if (normalize(firstName).startsWith(normalized)) {
      return true;
    }

    if (normalize(lastName).startsWith(normalized)) {
      return true;
    }

    return false;
  });
};

interface UserReturnType {
  name: string;
  type: 'user';
  id: string;
  email: string;
}

export const getUsers = async (input: string): Promise<UserReturnType[]> => {
  const response = await searchUser(input);
  return response.map(user => ({
    name: `${user.firstName} ${user.lastName}`,
    type: 'user',
    id: user.id,
    email: user.email,
  }));
};
