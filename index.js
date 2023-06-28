module.exports = async function() {
    const {
        Octokit
    } = require("octokit");

    const {
        version
    } = require("./tauri/package.json");

    const client = new Octokit({
        auth: process.env.token
    });

    const release = await client.rest.repos.createRelease({
        owner: "ahqsoftwares",
        repo: "astore-sample-project",
        tag_name: `v${version}`,
        name: `AHQ Store Sample App v${version}`,
        draft: true
    });

    release.data.id
}