import { Nullable, isNotNullish, isNullish } from 'vest-utils';

import { Isolate } from 'Isolate';
import { closestExists } from 'IsolateWalker';

export class IsolateInspector {
  static at(isolate: Nullable<Isolate>, at: number): Nullable<Isolate> {
    if (isNullish(isolate)) {
      return null;
    }
    return isolate.children?.[at] ?? null;
  }

  static cursor(isolate: Nullable<Isolate>): number {
    if (isNullish(isolate)) {
      return 0;
    }
    return isolate.children?.length ?? 0;
  }

  static shouldAllowReorder(isolate: Nullable<Isolate>): boolean {
    if (isNullish(isolate)) {
      return false;
    }
    return closestExists(isolate, node => node.allowReorder);
  }

  static usesKey(isolate: Nullable<Isolate>): boolean {
    if (isNullish(isolate)) {
      return false;
    }
    return isNotNullish(isolate.key);
  }

  static dump(isolate: Isolate): string {
    if (isNullish(isolate)) {
      return '';
    }
    return JSON.stringify(isolate, (key, value) => {
      if (key === 'parent') {
        return undefined;
      }
      return value;
    });
  }
}
