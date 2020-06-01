import * as core from '@actions/core';
import { context, GitHub } from '@actions/github';
import { parseReleaseName } from './utils';

const octokit = new GitHub({ auth: process.env.GITHUB_TOKEN });

async function main (): Promise<void> {
  try {
    const releaseBranch = core.getInput('branch');

    if (!context.ref.includes(releaseBranch)) {
      throw new Error('Workflow ref does not match configured branch.');
    }

    const message: string = context.payload.head_commit.message;
    const releaseName = parseReleaseName(message);

    core.info(`Creating tag ${releaseName}`);
    await octokit.git.createTag({
      ...context.repo,
      message: '',
      object: context.sha,
      tag: releaseName,
      type: 'commit',
    });

    core.info(`Tag created. Creating release ${releaseName}.`);
    /* eslint-disable camelcase */
    await octokit.repos.createRelease({
      ...context.repo,
      tag_name: releaseName,
      name: releaseName,
    });
    /* eslint-enable camelcase */

    core.info(`${releaseName} released.`);
  } catch (err) {
    core.setFailed(err.message);
  }
}

main();
