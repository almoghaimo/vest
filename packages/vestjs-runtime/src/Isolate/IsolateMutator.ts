import { Nullable, invariant, isNullish } from 'vest-utils';

import { Isolate } from 'Isolate';

export class IsolateMutator {
  static setParent(isolate: Isolate, parent: Nullable<Isolate>): Isolate {
    isolate.parent = parent;
    return isolate;
  }

  static saveOutput(isolate: Isolate, output: any): Isolate {
    isolate.output = output;
    return isolate;
  }

  static setKey(isolate: Isolate, key: Nullable<string>): Isolate {
    isolate.key = key;
    return isolate;
  }

  static addChild(isolate: Isolate, child: Isolate): void {
    invariant(isolate.children);
    isolate.children.push(child);
    IsolateMutator.setParent(child, isolate);
  }

  static removeChild(isolate: Isolate, node: Isolate): void {
    isolate.children =
      isolate.children?.filter(child => child !== node) ?? null;
  }

  static slice(isolate: Isolate, at: number): void {
    if (isNullish(isolate.children)) {
      return;
    }
    isolate.children.length = at;
  }
}
