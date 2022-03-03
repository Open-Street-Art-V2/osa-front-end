type User = {
  firstname: string;
  name: string;
  email: string;
  birthDate?: Date;
  favoriteCity: string;
  password: string;
  verifiedPassword?: string;
};

export default User;
