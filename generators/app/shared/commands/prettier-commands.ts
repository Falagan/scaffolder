import { CeNodeGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function setUpPrettier() {
  install();
  config();
}

function install() {
  CeNodeGenerator.spawnCommandSync('npm', ['install', '--save-dev', 'prettier'], { shell: true });
}

function config() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up prettier config...');
  CeNodeGenerator.fs.copy(
    `./generators/app/assets/configs/prettier/.prettierrc`,
    `${CeNodeGenerator.destinationRoot()}/.prettierrc`,
  );
  CeNodeGenerator.fs.copy(
    `./generators/app/assets/configs/prettier/.prettierignore`,
    `${CeNodeGenerator.destinationRoot()}/.prettierignore`,
  );
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Commitlint configured!');
}
