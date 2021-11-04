import { Controller, Get, Query, Route } from "tsoa";
import { Account } from "./account";
import { AccountsService } from "./accountsService";

@Route("accounts")
export class AccountsController extends Controller {
  @Get("")
  public async getAccounts(
    @Query("userId")
    userId?: string,
  ): Promise<Account[]> {
    userId; // This is here to make the compiler happy
    return new AccountsService().get();
  }
}
