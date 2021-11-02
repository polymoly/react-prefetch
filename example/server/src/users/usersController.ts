import { Controller, Get, Route } from "tsoa";
import { User } from "./user";
import { UsersService } from "./usersService";

@Route("users")
export class UsersController extends Controller {
  @Get("")
  public async getUser(): Promise<User[]> {
    return new UsersService().get();
  }
}
