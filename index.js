module.exports = (async function () {
  const { Octokit } = require("octokit");

  const { version } = require("./tauri/package.json");

  const client = new Octokit({
    auth: process.env.token,
  });

  const release = await client.request("POST /repos/{owner}/{repo}/releases", {
    owner: "ahqsoftwares",
    repo: "ahqstore-sample-project",
    tag_name: `v${version}`,
    name: `AHQ Store Sample Project v${version}`,
    draft: true,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return release.data.id;
})();
