
  const fs = require("fs");
  const { Octokit } = require("octokit");

  const github = new Octokit({
    auth: process.env.token,
  });

  const base = {
    owner: "ahqsoftwares",
    repo: "alang",
    release_id: process.env.releaseid
  };

  const files = fs.readdirSync("./dist");

  async function publish(fileName) {
    await github.rest.repos.uploadReleaseAsset({
      ...base,
      name: fileName,
      data: fs.readFileSync(`./dist/${fileName}`),
      headers: {
        "Content-Type": fileName.endsWith(".zip") ? "application/zip" : "application/octet-stream",
        "Content-Length": fs.statSync(`./dist/${fileName}`).size
      }
    });
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.endsWith(".zip") || file.endsWith(".exe") || file.endsWith(".dmg") || file.endsWith(".appImage") || file.endsWith(".AppImage") || file.endsWith(".appimage") || file.endsWith(".deb")) {
      publish(file);
    }
  }
