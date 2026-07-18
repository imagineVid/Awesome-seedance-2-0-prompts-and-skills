import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const required = [{"code":"en","file":"README.md"},{"code":"zh","file":"README.zh.md"},{"code":"ja","file":"README.ja.md"},{"code":"ko","file":"README.ko.md"},{"code":"es","file":"README.es.md"},{"code":"de","file":"README.de.md"},{"code":"fr","file":"README.fr.md"},{"code":"it","file":"README.it.md"},{"code":"pt","file":"README.pt.md"},{"code":"tr","file":"README.tr.md"},{"code":"ar","file":"README.ar.md"},{"code":"ru","file":"README.ru.md"},{"code":"nl","file":"README.nl.md"},{"code":"pl","file":"README.pl.md"}];
for (const {file} of required) { if (!fs.existsSync(path.join(root,file))) throw new Error(`Missing localized README: ${file}`); }
console.log(`Verified ${required.length} generated README files.`);
