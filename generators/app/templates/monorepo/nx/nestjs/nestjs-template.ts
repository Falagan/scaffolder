import { OUT_PUT_DIRECTORY } from '../../../../config';
import { CeNodeGenerator } from '../../../../index';
import { setUpCommitLint } from '../../../../shared/commands/commit-lint-commands';
import { setUpHusky } from '../../../../shared/commands/husky-commands';
import { setUpLintStaged } from '../../../../shared/commands/lint-staged-commands';
import { log, LOGS_COLORS, LOGS_ICONS } from '../../../../shared/logs/log';
import path from 'path';
import { setUpPrettier } from '../../../../shared/commands/prettier-commands';

export function writingMonoRepoNxNestjsTemplate() {
  createTemplate();
  CeNodeGenerator.destinationRoot(`${OUT_PUT_DIRECTORY}/${CeNodeGenerator.options.projectName}`);
  setUpHusky();
  setUpCommitLint();
  setUpLintStaged();
  setUpPrettier();
  setUpReadme();
}

function createTemplate() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Creating template...');
  CeNodeGenerator.spawnCommandSync(
    'create-nx-workspace',
    [
      '--name',
      `${CeNodeGenerator.options.projectName}`,
      '--preset',
      'nest',
      '--appName',
      `${CeNodeGenerator.options.appName}`,
      '--nxCloud',
      'false',
      '--verbose',
    ],
    { shell: true },
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Template created!');
}

function setUpReadme() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up README.md...');
  CeNodeGenerator.fs.delete(`${CeNodeGenerator.destinationRoot()}/README.md`);
  CeNodeGenerator.fs.copyTpl(
    `${path.resolve('./')}/generators/app/assets/configs/readmes/README.md`,
    `${CeNodeGenerator.destinationRoot()}/README.md`,
    {
      projectName: CeNodeGenerator.options.projectName,
    },
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'README.md ready!');
}
