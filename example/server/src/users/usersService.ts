import { User } from "./user";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService {
  public get(): User[] {
    return [
      {
        id: 1,
        email: "jane@doe.com",
        name: "Jane Doe",
        status: "Happy",
        phoneNumbers: [],
      },
    ];
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      ...userCreationParams,
    };
  }
}
