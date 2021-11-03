import { Controller, Get, Route } from "tsoa";
import { Account } from "./account";
import { AccountsService } from "./accountsService";

@Route("accounts")
export class AccountsController extends Controller {
  @Get("")
  public async getAccounts(): Promise<Account[]> {
    return new AccountsService().get();
  }
}
