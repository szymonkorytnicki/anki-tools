import parse from "csv-parse/lib/sync.js";
import { promises as fs } from "fs";

(async () => {
  const baseFile = await fs.readFile("base.csv");
  const newFile = await fs.readFile("new.csv");
  const baseCSV = parse(baseFile, {
    skip_empty_lines: true,
  });
  const newCSV = parse(newFile, {
    skip_empty_lines: true,
  });
  let result = [];
  // Compare old and new file
  newCSV.forEach((line) => {
    if (
      !baseCSV.find(
        (baseLine) => baseLine[0] === line[0] && baseLine[1] === line[1]
      )
    ) {
      result.push(line);
    }
  });
  if (result.length === 0) {
    console.log("No new words to add.");
    process.exit();
  }

  // Create diff file to import to Anki
  await fs.writeFile("diff.csv", createCSVStr(result));

  // Update base file for next time
  await fs.writeFile(
    "base.csv",
    [createCSVStr(baseCSV), createCSVStr(result)].join("\n")
  );
  console.log("Done! ", result.length, "new cards");
  process.exit();
})();

function createCSVStr(arr) {
  return arr.map((line) => `${line[0]},${line[1]}`).join("\n");
}
