/* =========================================================
   Mastercommerce - copy-web.js
   Copies your website files into a folder called "www".
   The mobile app reads its pages from "www".

   - It only COPIES. Your original files are never changed.
   - It only deletes and rebuilds the "www" folder, which is
     a generated copy (it is safe to rebuild at any time).
   - Run it with:  node copy-web.js
   ========================================================= */

const fs = require("fs");
const path = require("path");

const root = __dirname;
const out = path.join(root, "www");

/* Files the app needs. If one is missing the script stops. */
const files = [
  "index.html",
  "style.css",
  "script.js",
  "business.js",
  "manifest.json",
  "icon.PNG"
];

/* Optional folders, copied only if they exist (for example "libs"). */
const optionalFolders = ["libs"];

const missing = files.filter(f => !fs.existsSync(path.join(root, f)));
if (missing.length) {
  console.error("\nStopped. These files were not found next to this script:");
  missing.forEach(f => console.error("  - " + f));
  console.error("\nNothing was copied. Put copy-web.js in the same folder as index.html and try again.\n");
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

files.forEach(f => {
  fs.copyFileSync(path.join(root, f), path.join(out, f));
  console.log("Copied " + f);
});

optionalFolders.forEach(d => {
  const from = path.join(root, d);
  if (fs.existsSync(from)) {
    fs.cpSync(from, path.join(out, d), { recursive: true });
    console.log("Copied folder " + d + "/");
  }
});

console.log("\nDone. The app copy of your website is now in the \"www\" folder.\n");
