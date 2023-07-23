// export const pick = <T extends object, k extends keyof T>(
//   obj: T,
//   keys: k[]
// ): Partial<T> => {
//   const finalObj: Partial<T> = {}

//   // [ "page", "limit", "sortBy", "sortOrder"]
//   for (const key of keys) {
//     if (obj && Object.hasOwnProperty.call(obj, key)) {
//       finalObj[key] = obj[key]
//     }
//   }
//   return finalObj
// }
const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T, // object of key string type, value unknown type
  keys: k[] // array of T object's keys
): Partial<T> => {
  //partial means all properties set to optional.

  const finalObj: Partial<T> = {}

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key]
    }
  }
  return finalObj
}

export default pick

/* 
This code defines a TypeScript function called pick that takes in two parameters: obj and keys.

The function signature <T extends Record<string, unknown>, k extends keyof T> uses generics to provide flexibility in the types of obj and keys.

T represents an object type that extends Record<string, unknown>, meaning it can be any object that has string keys and values of unknown type.
k represents a key type that extends keyof T, which means it can be any key that exists in the T object.
The function pick returns a new object (Partial<T>) that contains only the properties specified by the keys array.

Here's a step-by-step breakdown of the code:

Create an empty object finalObj of type Partial<T>. This object will eventually store the selected properties from obj.

Iterate over each key in the keys array using a for...of loop.

Check if the obj is truthy and if it has the property key using Object.hasOwnProperty.call(obj, key). This check ensures that the obj has the property specified by the current key.

If the check passes, assign the value of obj[key] to the corresponding property in finalObj using finalObj[key] = obj[key].

After iterating over all the keys, return the finalObj object containing the selected properties.

The use of Partial<T> as the return type indicates that the returned object may have fewer properties than the original obj. It retains the same types as the original object but allows those properties to be optional in the returned object.
*/

/* 
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key]
    }
  }
*  explanation:
for (const key of keys): This loop iterates over each element key in the keys array. The keys array contains the properties that we want to pick from the obj.

if (obj && Object.hasOwnProperty.call(obj, key)): This if statement checks two conditions:

obj: It ensures that obj is truthy, meaning it exists and is not null or undefined. This check prevents potential errors if obj is null or undefined.
Object.hasOwnProperty.call(obj, key): This checks if the obj has the property specified by the current key. It uses the hasOwnProperty method from Object to perform the check. This ensures that we only pick properties that directly belong to obj and not its prototype chain.
finalObj[key] = obj[key]: If both conditions pass, it assigns the value of obj[key] to the corresponding property in finalObj. This line copies the property from obj to finalObj.

By iterating over the keys array and checking the conditions, the code selectively picks properties from obj and assigns them to finalObj. If a property doesn't meet the conditions, it is not included in finalObj.

After iterating through all the keys, the function returns finalObj, which contains only the selected properties from obj.
*/
