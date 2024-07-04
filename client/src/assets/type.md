Here's a comprehensive TypeScript cheat sheet covering basics to advanced topics:

### Basic Types
```typescript
let isDone: boolean = false;
let count: number = 10;
let userName: string = "John Doe";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

function warnUser(): void {
  console.log("This is my warning message");
}

let u: undefined = undefined;
let n: null = null;
```

### Interfaces
```typescript
interface User {
  name: string;
  age?: number; // optional property
  readonly id: number;
}

let user: User = {
  name: "John Doe",
  id: 1,
};

// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
```

### Functions
```typescript
function add(x: number, y: number): number {
  return x + y;
}

let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

function buildName(firstName: string, lastName: string = "Smith"): string {
  return firstName + " " + lastName;
}

function buildName2(firstName: string, ...restOfName: string[]): string {
  return firstName + " " + restOfName.join(" ");
}
```

### Classes
```typescript
class Animal {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }

  public move(distanceInMeters: number): void {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log('Woof! Woof!');
  }
}

let dog = new Dog("Rex");
dog.bark();
dog.move(10);
```

### Generics
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### Advanced Types
```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();

if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else {
  (pet as Bird).fly();
}
```

### Utility Types
```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;
type ReadonlyTodo = Readonly<Todo>;
type TodoPreview = Pick<Todo, "title" | "completed">;
type TodoKeys = keyof Todo; // "title" | "description" | "completed"
```

### Modules
```typescript
// math.ts
export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}

// main.ts
import { add, subtract } from "./math";

console.log(add(5, 3));
console.log(subtract(5, 3));
```

### Namespaces
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

let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```

### Decorators
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### Async/Await
```typescript
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function doWork() {
  console.log("Start");
  await delay(2000);
  console.log("End");
}

doWork();
```

### TypeScript with React
```typescript
// Counter.tsx
import React, { useState } from 'react';

interface CounterProps {
  initialCount: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;
```

This cheat sheet should help you navigate through various aspects of TypeScript, from basic types to advanced features, including working with React. Let me know if you need more details or additional examples!