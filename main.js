// This script demonstrates JavaScript's Iterables, Iterators, Generator Functions, and Asynchronous Iteration.

console.log("--- 1. Built-in Iterables (Array) ---");
const numbers = [1, 2, 3];
// Arrays are built-in iterables, meaning they have a default iterator.
for (const num of numbers) {
  console.log(num);
}

console.log("\n--- 1. Built-in Iterables (String) ---");
const greeting = "Hello";
// Strings are also built-in iterables, allowing iteration over their characters.
for (const char of greeting) {
  console.log(char);
}

console.log("\n--- 2. Custom Iterable Object ---");
// A custom iterable object that counts from 'start' to 'end'.
// To be iterable, an object must implement the Symbol.iterator method.
const counter = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    // The Symbol.iterator method must return an iterator object.
    return {
      // An iterator object must have a 'next' method.
      next() {
        // The 'next' method returns an object with 'value' and 'done' properties.
        if (current <= end) {
          return { value: current++, done: false }; // 'done: false' indicates more values to come.
        } else {
          return { value: undefined, done: true }; // 'done: true' indicates iteration is complete.
        }
      }
    };
  }
};

// The for...of loop works with any object that implements the iterable protocol.
for (const n of counter) {
  console.log(n);
}

console.log("\n--- 3. Generator Function for Iteration ---");
// Generator functions provide a simpler way to create iterators.
// They are defined with a '*' after 'function' (e.g., function*).
function* generateRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i; // The 'yield' keyword pauses the generator and returns a value.
             // When 'next()' is called again, execution resumes from where it left off.
  }
}

// Generator functions automatically conform to the iterable protocol.
for (const num of generateRange(10, 12)) {
  console.log(num);
}

console.log("\n--- 4. Asynchronous Iterable (Async Generator) ---");
// Async generator functions allow for asynchronous iteration.
// They are defined with 'async function*' and can use 'await' inside.
async function* asyncGenerateNumbers(count) {
  for (let i = 1; i <= count; i++) {
    // Simulate an asynchronous operation (e.g., fetching data).
    await new Promise(resolve => setTimeout(resolve, 100)); 
    yield i; // 'yield' returns a value, 'await' pauses for async operations.
  }
}

// To iterate over an async iterable, use the 'for await...of' loop.
async function runAsyncIteration() {
  console.log("Starting async iteration...");
  for await (const num of asyncGenerateNumbers(3)) {
    console.log(`Async number: ${num}`);
  }
  console.log("Async iteration finished.");
}

runAsyncIteration();
