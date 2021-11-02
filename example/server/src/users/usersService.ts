import { User } from "./user";

const data: User[] = Array.from({ length: 500 }, (_, i) => {
  return {
    id: i + 1,
    email: `gholi@gholi.com_${i + 1}`,
    name: `gholi_${i + 1}`,
    status: "Happy",
  };
});

export class UsersService {
  public get(): User[] {
    return data;
  }
}
