import type {Plugin} from 'vite';
import ts from 'typescript';
import {transformSync, NodePath} from '@babel/core';
import * as t from '@babel/types';
import template from '@babel/template';

const hotReloadInjectionTemplate = template(`
  if (this.onSwap) {
    if (import.meta.hot) {
      import.meta.hot.accept((newModule) => {
        const newComponent = newModule.XXX;
        const newInstance = this.onSwap(newComponent);
        Object.assign(this, newInstance);
      });
    }
  }
`);

function getExportedTypeNames(sourceFile: ts.SourceFile): string[] {
    const types: string[] = [];
    ts.forEachChild(sourceFile, node => {
        if (ts.isClassDeclaration(node) && node.name) {
            types.push(node.name.text);
        }
    });
    return types;
}

function injectHotReloadCode(
    code: string,
    exportedTypes: string[],
    exportedDefaultType?: string,
): string {
    let result;
    try {
        result = transformSync(code, {
            plugins: [
                babel => ({
                    visitor: {
                        ClassDeclaration(path: NodePath<t.ClassDeclaration>) {
                            const node = path.node;
                            if (exportedTypes.includes(node.id.name || '')) {
                                const constructor = path
                                    .get('body.body')
                                    .find(path => {
                                        return (
                                            path.node.type === 'ClassMethod' &&
                                            path.node.kind === 'constructor'
                                        );
                                    });

                                if (constructor) {
                                    const block = constructor.get(
                                        'body',
                                    ) as NodePath<t.BlockStatement>;

                                    if (block) {
                                        const hotReloadInjection =
                                            hotReloadInjectionTemplate({
                                                XXX: t.identifier(node.id.name),
                                            });
                                        block.pushContainer(
                                            'body',
                                            hotReloadInjection,
                                        );
                                    }
                                }
                            }
                        },
                    },
                }),
            ],
        });
    } catch (error) {
        console.log(
            '🚀 ~ file: hotReloadPlugin.ts:113 ~ error:',
            error.message,
        );
    }
    const codeWithInjection = result?.code ?? code;

    return codeWithInjection;
}

export function gkHotReloadPlugin(): Plugin {
    return {
        name: 'gk-hot-reload',
        transform(code, id) {
            if (id.endsWith('.ts') && code.includes('extends GK.Component')) {
                const sourceFile = ts.createSourceFile(
                    id,
                    code,
                    ts.ScriptTarget.Latest,
                );
                const exportedTypes = getExportedTypeNames(sourceFile);
                const codeWithInjection = injectHotReloadCode(
                    code,
                    exportedTypes,
                );

                return codeWithInjection;
            }
            return null;
        },
    };
}
