import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts"
import { serveStatic } from "https://deno.land/x/hono@v3.11.8/middleware.ts"
import { streamSSE } from "https://deno.land/x/hono@v3.11.8/helper/streaming/index.ts"

const db = await Deno.openKv()
const app = new Hono()

interface lastVisit {
    city: string
    country: string,
    flag: string
}

let i = 0

app.get('/', serveStatic({ path: "./index.html" }))

// app.post("/counter", async (c) => {
//     await db.atomic().sum(["visits"], 1n).commit()
//     return c.json({message: "ok"})
// })

app.post("/visit", async (c) => {
    const { city, country, flag } = await c.req.json<lastVisit>()
    await db
        .atomic()
        .set(["lastVisit"], { city, country, flag })
        .sum(["visits"], 1n)
        .commit()
    return c.json({message: "ok"})
})

// app.get("/counter", (c) => {
//     return streamSSE(c, async (stream) => {
//         const watcher = db.watch([["visits"]])
//         for await (const entry of watcher) {
//             const { value } = entry[0] as Deno.KvU64
//             if (value != null)
//                 await stream.writeSSE({ data: value.toString(), event: "update", id: String(i++) })
//         }
//         /* while (true) {
//             const { value } = await db.get<Deno.KvU64>(["visits"])
//             await stream.writeSSE({ data: Number(value).toString(), event: "update", id: String(i++) })
//             await stream.sleep(1000)
            
//             // const message = `Son las ${new Date().toLocaleTimeString()}`
//             // await stream.writeSSE({ data: message, event: "update", id: String(i++) })
//             // await stream.sleep(1000)
//         }*/
//     })
// })

app.get("/visit", (c) => {
    return streamSSE(c, async (stream) => {
        const watcher = db.watch([["lastVisit"]])
        for await (const entry of watcher) {
            const { value } = entry[0] as Deno.KvU64
            if (value != null)
                await stream.writeSSE({ data: JSON.stringify(value), event: "update", id: String(i++) })
        }
       
    })
})

Deno.serve(app.fetch)