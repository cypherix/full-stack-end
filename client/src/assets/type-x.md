Namespaces in TypeScript are a way to organize and group related code together. They can be useful for logically grouping functionalities, avoiding name collisions, and maintaining a clean code structure. Here's an in-depth look at using namespaces in TypeScript:

### Defining and Using Namespaces

#### Basic Namespace Example
```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// Usage
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

const strings = ["Hello", "98052", "101"];

for (let s of strings) {
  for (let name in validators) {
    console.log(`'${s}' ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
  }
}
```

### Nested Namespaces
```typescript
namespace Animals {
  export namespace Mammals {
    export class Dog {
      bark(): void {
        console.log('Woof! Woof!');
      }
    }
  }

  export namespace Birds {
    export class Sparrow {
      fly(): void {
        console.log('Flap! Flap!');
      }
    }
  }
}

// Usage
const dog = new Animals.Mammals.Dog();
dog.bark();

const sparrow = new Animals.Birds.Sparrow();
sparrow.fly();
```

### Merging Namespaces
TypeScript allows you to merge namespaces with other namespaces or with classes, functions, and enums.

#### Merging Namespaces with Functions
```typescript
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let prefix = "Hello, ";
  export let suffix = "!";
}

// Usage
console.log(buildLabel("World"));
```

#### Merging Namespaces with Classes
```typescript
class Album {
  label: Album.AlbumLabel;
}

namespace Album {
  export class AlbumLabel {
    constructor(public name: string) {}
  }
}

// Usage
const album = new Album();
album.label = new Album.AlbumLabel("Awesome Mix");
console.log(album.label.name);
```

### Namespaces and Modules
While namespaces are useful for organizing code, in modern TypeScript, modules (using `import` and `export`) are generally preferred for encapsulating code. Namespaces can still be useful in some scenarios, such as when you want to organize a large library of code into a single file.

#### Using Namespaces with External Modules
```typescript
// Validation.ts
export namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }
}

// main.ts
import { Validation } from './Validation';

let validator = new Validation.LettersOnlyValidator();
console.log(validator.isAcceptable("Hello")); // true
```

### Splitting Namespaces Across Multiple Files
You can split a namespace across multiple files using the `reference` tag.

#### File 1: Validation.ts
```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }
}
```

#### File 2: main.ts
```typescript
/// <reference path="Validation.ts" />

let validator = new Validation.LettersOnlyValidator();
console.log(validator.isAcceptable("Hello")); // true
```

### Conclusion
Namespaces are a powerful feature in TypeScript that help in organizing and encapsulating code, especially in large applications. However, with the advent of ES6 modules and their widespread adoption, it's generally recommended to use modules (`import` and `export`) for encapsulating code. Namespaces can still be useful in certain situations, particularly when dealing with legacy code or large libraries.