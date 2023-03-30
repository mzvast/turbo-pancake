import fs from 'fs';
import path from 'path';

interface TsConfig {
    compilerOptions: {
        paths?: {
            [key: string]: string[];
        };
    };
}

interface Alias {
    [key: string]: string;
}

export function generateAliasFromTsConfig(tsConfigPath: string): Alias {
    const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf-8');
    const tsConfig: TsConfig = JSON.parse(tsConfigContent);

    const alias: Alias = {};
    if (tsConfig.compilerOptions.paths) {
        const paths = tsConfig.compilerOptions.paths;
        for (const key in paths) {
            const pathValue = paths[key][0];
            const aliasKey = key.replace('/*', '');
            const aliasValue = path.resolve(
                path.dirname(tsConfigPath),
                pathValue.replace('/*', ''),
            );
            alias[aliasKey] = aliasValue;
        }
    }

    return alias;
}
