// import fs from "fs";
// import { wl } from "./wl";

const fs = require("fs");
const wl = require("./wl");

// Parse the content and extract unique wallet addresses
const addresses = wl.map((item) => {
  return Object.keys(item)[0];
});

// Create new content using Set to ensure uniqueness
const newContent = `// Generated whitelist
export const whitelist = new Set([
    ${addresses.map((addr) => `"${addr}"`).join(",\n    ")}
]);
`;

// Write to a new file
fs.writeFileSync("./generatedWhitelist.ts", newContent);

console.log(`Processed ${addresses.length} unique addresses`);
