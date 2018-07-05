import {Container, Service} from "typedi";
import {Connection, createConnection} from "typeorm";
import {EntityManager} from "typeorm/entity-manager/EntityManager";
import {UserIdentity} from "../types/UserIdentity";

@Service("db")
export class SqlStorage {

    public connection: Connection;

    constructor() {
        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "deploy",
            entities: [
                UserIdentity
            ],
        }).then(value => {
            this.connection = value;
        });
    }

    public get manager(): EntityManager {
        return this.connection.manager;
    }

}

Container.set("db", new SqlStorage());
