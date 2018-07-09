import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {UserIdentity} from "../types/UserIdentity";
import {Inject} from "typedi";
import {Connection} from "typeorm";
import {SqlStorage} from "../services/SqlStorage";

@Resolver()
class UsersResolver {

    @Inject("db")
    public db: SqlStorage;

    @Mutation(returns => UserIdentity)
    public async login(@Arg("login") login: string, @Arg("password") password: string): Promise<UserIdentity> {
        const user = await this.db.manager.findOne(UserIdentity, {
            where: `login='${login}' AND password='${password}'`,
        });
        return user;
    }

    @Query(returns => [UserIdentity])
    public async users(): Promise<UserIdentity[]> {
        return await this.db.manager.find(UserIdentity);
    }

}
