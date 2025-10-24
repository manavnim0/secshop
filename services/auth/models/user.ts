interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends UserAttrs {
  id: string;
}

const users: UserDoc[] = [];

export const User = {
  findOne: async (query: { email: string }) => users.find(u => u.email === query.email),
  create: async (data: UserAttrs) => {
    const user = { ...data, id: (users.length + 1).toString() };
    users.push(user);
    return user;
  }
};