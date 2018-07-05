import {Field, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class UserIdentity {

    constructor(name, token) {
        this.name = name;
        this.token = token;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field(type => String)
    name: string;

    @Column()
    @Field(type => String)
    token: string;

    @Column()
    login: string;

    @Column()
    password: string;

}
