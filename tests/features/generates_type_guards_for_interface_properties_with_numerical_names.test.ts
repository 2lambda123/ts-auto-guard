import { testProcessProject } from '../generate'

testProcessProject(
  'generates type guards for interface properties with numerical names',
  {
    'test.ts': `
    /** @see {isFoo} ts-auto-guard:type-guard */
    export interface Foo {
      "1": number,
      "2": string
    }`,
  },
  {
    'test.ts': null,
    'test.guard.ts': `
    import { Foo } from "./test";

    export function isFoo(obj: unknown): obj is Foo {
        const typedObj = obj as Foo
        return (
            (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
            typeof typedObj["1"] === "number" &&
            typeof typedObj["2"] === "string"
        )
    }`,
  }
)
