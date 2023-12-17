//const db = await Deno.openKv();

//ejemplo create & get user
// const user = "mathew903"
// const result = await db.set(["name"], user)
// console.log(result)
// const name = await db.get(["name"])
// console.log(name)

//ejemplo definir tipo obtenido
// const { value } = await db.get<number>(["counter"])
// console.log(value)

//ejemplo counter
// const newCounter = value == null ? 0 : value + 1
// const res = await db.set(["counter"], newCounter)
// console.log(res)

//ejemplo visits
//await db.set(["visits"], new Deno.KvU64(0n)) // 0n -> bigInt
// await db.atomic().sum(["visits"], 1n).commit()
// const res = await db.get<Deno.KvU64>(["visits"])
// console.log(res)

/* ejemplo preferences user
const juanPreferences = {
    username: "juan",
    theme: "dark",
    language: "es-Es"
}

const mathewPreferences = {
    username: "mathew",
    theme: "light",
    language: "en-En"
}

await db.set(["preferences", "juan"], juanPreferences)
await db.set(["preferences", "mathew"], mathewPreferences)
*/

//1er forma
// const juanPreferences = await db.get(["preferences", "juan"])
// const mathewPreferences = await db.get(["preferences", "mathew"])
// console.log(juanPreferences)
// console.log(mathewPreferences)

//2da forma
// const [juanPreferences, mathewPreferences] = await db.getMany([
//     ["preferences", "juan"],
//     ["preferences", "mathew"]
// ])
// console.log(juanPreferences)
// console.log(mathewPreferences)

//3ra forma
// const entries = db.list({ prefix: ["preferences"] })

// for await (const entry of entries) {
//     console.log(entry)
// }

// await db.delete(["preferences", "juan"]) -> delete property for db