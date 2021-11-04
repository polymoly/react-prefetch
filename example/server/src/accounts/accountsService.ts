import { Account } from "./account";

const data: Account[] = Array.from({ length: 500 }, (_, i) => {
  return {
    id: i + 1,
    name: `gholi_${i + 1}`,
  };
});

export class AccountsService {
  public async get(): Promise<Account[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, Math.random() * 10000);
    });
  }
}
