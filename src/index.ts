import {printSchema} from "graphql";

require("source-map-support").install();

import "reflect-metadata";
import {Container} from "typedi";
import {buildSchema, useContainer} from "type-graphql";
import {GraphQLServer} from "graphql-yoga";

async function bootstrap() {
    useContainer(Container);

    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.js"],
    });

    const server = new GraphQLServer({
        schema: schema,
    });

    console.log(printSchema(schema));

    const serverOptions = {
        port: process.env.PORT || 4000,
        endpoint: "/graphql",
        playground: "/playground",
    };

    server.start(serverOptions, ({ port, playground }) => {
        console.log(
            `Server is running, GraphQL Playground available at http://localhost:${port}${playground}`,
        );
    });
}

bootstrap();
