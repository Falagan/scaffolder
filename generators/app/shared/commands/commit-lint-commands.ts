import { CeNodeGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function setUpCommitLint() {
  install();
  config();

  function install() {
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Installing commitlint...');
    CeNodeGenerator.spawnCommandSync(
      'npm',
      ['install', '--save-dev', '@commitlint/cli', '@commitlint/config-conventional'],
      { shell: true },
    );
  }

  function config() {
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up commitlint config...');
    CeNodeGenerator.fs.copy(
      `./generators/app/assets/configs/commit-lint/commitlint.config.js`,
      `${CeNodeGenerator.destinationRoot()}/commitlint.config.js`,
    );
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Commitlint configured!');
  }
}
