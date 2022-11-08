// https://blog.dennisokeeffe.com/blog/2021-12-09-generating-json-schema-from-typescript-types
import * as tsj from 'ts-json-schema-generator';
import fs from 'node:fs';
import path from 'node:path';

const config = {
    path: path.join(__dirname, '../src/types/sceneConfig.ts'), // !change here
    tsconfig: path.join(__dirname, '../tsconfig.json'),
    type: 'IConfig', // Or <type-name> if you want to generate schema for that one type only
};

const schema_path = path.join(__dirname, '../public/schema/config.json');

function writeSchema(schema) {
    const schemaString = JSON.stringify(schema, null, 2);
    fs.mkdirSync(path.resolve(schema_path, '..'), {
        recursive: true,
    });
    fs.writeFileSync(schema_path, schemaString);
}

function generateSchema() {
    return tsj.createGenerator(config).createSchema(config.type);
}

function main() {
    const output = generateSchema();

    writeSchema(output);
}

main();
