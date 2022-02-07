import duolingoJson from './export.json';
import { promises as fs } from "fs";

function isWithin(timestamp, hours) {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now.getTime() - date.getTime();
    const diffHours = diff / (1000 * 60 * 60);
    return diffHours < hours;
}

const words = duolingoJson.vocab_overview
.filter(item => {
    return isWithin(item.last_practiced_ms, process.argv[2])
})
.map(item => {
    return item.infinitive || item.word_string
});

await fs.writeFile(
    "output.csv",
    Array.from(new Set(words)).join("\n")
  )