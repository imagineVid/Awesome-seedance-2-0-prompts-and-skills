import fs from "node:fs";
const prompts = JSON.parse(fs.readFileSync("data/prompts.json","utf8"));
const categories = JSON.parse(fs.readFileSync("data/categories.json","utf8"));
const ids = new Set(); const sources = new Set(); const bodies = new Set();
for (const p of prompts) {
 if (ids.has(p.id)) throw new Error(`Duplicate id ${p.id}`); ids.add(p.id);
 if (sources.has(p.sourceLink)) throw new Error(`Duplicate source ${p.sourceLink}`); sources.add(p.sourceLink);
 const body=p.content.toLowerCase().replace(/[^a-z0-9]+/g," ").trim(); if (bodies.has(body)) throw new Error(`Duplicate prompt ${p.id}`); bodies.add(body);
 if (!p.sourceMeta?.tweet_id || p.sourceMeta?.source!=="twitterapi.io") throw new Error(`Missing provenance ${p.id}`);
 if (!p.sourceMedia?.length) throw new Error(`Missing result media ${p.id}`);
 if (!p.content || p.content.length<30) throw new Error(`Prompt too short ${p.id}`);
}
if (prompts.length < 5 || categories.length < 5) throw new Error("Collection is incomplete");
const text = fs.readdirSync(".").filter(f=>f.startsWith("README")&&f.endsWith(".md")).map(f=>fs.readFileSync(f,"utf8")).join("\n");
if (/Seedance 2\.5|Nano Banana(?!\s+Pro)/i.test(text)) throw new Error("Inherited model copy detected");
console.log(`Validated ${prompts.length} unique source-backed prompts and ${categories.length} workflows.`);
