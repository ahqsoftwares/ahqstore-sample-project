const AdmZip = require("adm-zip");
const fs = require("fs");
const { Octokit } = require("octokit");

module.exports = (async () => {
  const zip = new AdmZip();

  zip.addLocalFile("./src-tauri/target/release/ahq-store-sample-app.exe");

  zip.writeZip("./app.zip");

  const github = new Octokit({
    auth: process.env.token,
  });

  const base = {
    owner: "ahqsoftwares",
    repo: "ahqstore-sample-project",
    release_id: process.env.releaseid
  };

  await github.rest.repos.uploadReleaseAsset({
    ...base,
    name: "sample_app-tauri-windows.zip",
    data: fs.readFileSync("./app.zip"),
    headers: {
      "Content-Type": "application/zip",
      "Content-Length": fs.statSync("./app.zip").size,
    }
  });
})();
