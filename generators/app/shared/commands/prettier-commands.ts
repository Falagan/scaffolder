import { ScaffolderGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function setUpPrettier() {
  install();
  config();
}

function install() {
  ScaffolderGenerator.spawnCommandSync('npm', ['install', '--save-dev', 'prettier'], { shell: true });
}

function config() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up prettier config...');
  ScaffolderGenerator.fs.copy(
    `./generators/app/assets/configs/prettier/.prettierrc`,
    `${ScaffolderGenerator.destinationRoot()}/.prettierrc`,
  );
  ScaffolderGenerator.fs.copy(
    `./generators/app/assets/configs/prettier/.prettierignore`,
    `${ScaffolderGenerator.destinationRoot()}/.prettierignore`,
  );
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Commitlint configured!');
}
