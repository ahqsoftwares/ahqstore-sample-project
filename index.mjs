import { Octokit } from "octokit";
import { join, dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(join(dirname, "tauri", "package.json")).toString();

const { version } = JSON.parse(data);

export default async function () {
  const client = new Octokit({
    auth: process.env.token,
  });

  const release = await client.rest.repos.createRelease({
    owner: "ahqstore",
    repo: "sample-app",
    tag_name: `v${version}`,
    name: `AHQ Store Sample App v${version}`,
    draft: true,
  });

  return release.data.id;
}

export async function release() {
  const client = new Octokit({
    auth: process.env.token,
  });

  await client.rest.repos.updateRelease({
    owner: "ahqstore",
    repo: "sample-app",
    release_id: process.env.release_id,
    draft: false,
  });
}
