# Vite-plugin-gk

一些 vite 插件和工具

## generateAliasFromTsConfig

解析 tsconfig 中的别名，同步到 vite 中

## gkHotReloadPlugin

为 GK.Component 提供 HMR 支持（实验性）

开启条件
1、继承 GK.Component
2、实现 onSwap 方法

```ts
import * as GK from '@package/framework';
export class InputComponent extends GK.Component {
    manager: InputManager;
    constructor() {
        super();
        this.manager = new InputManager(this._deviceType);
    }

    // 实现onSwap方法，接收修改后的新class。需要返回一个新的实例替换旧实例。这里需要进行一些旧实例的销毁和数据的转移（可选）
    onSwap(newComponent) {
        const newInstance = new newComponent();
        return newInstance;
    }
}
```
