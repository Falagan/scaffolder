import { ScaffolderGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function setUpHusky() {
  install();
  config();
}

function install() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Installing husky...');
  ScaffolderGenerator.spawnCommandSync('npm', ['install', 'husky', '--save-dev'], {
    shell: true,
  });
  ScaffolderGenerator.spawnCommandSync('npm', ['pkg', 'set', 'scripts.prepare="husky install"'], {
    shell: true,
  });
  ScaffolderGenerator.spawnCommandSync('npm', ['run', 'prepare'], {
    shell: true,
  });
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky installed!');
}

function config() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Configuring husky...');
  setPreCommitHook();
  setCommitMsgHook();
  setPrePushHook();
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky configured!');
}

function setPreCommitHook() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up husky pre-commit hook...');
  console.log(`./generators/app/assets/configs/husky/pre-commit`);
  console.log(`${ScaffolderGenerator.destinationRoot()}/.husky/pre-commit`);
  ScaffolderGenerator.fs.copy(
    `./generators/app/assets/configs/husky/pre-commit`,
    `${ScaffolderGenerator.destinationRoot()}/.husky/pre-commit`,
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky pre-commit hook set up!');
}

function setCommitMsgHook() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up husky commit-msg hook...');
  ScaffolderGenerator.fs.copy(
    `./generators/app/assets/configs/husky/commit-msg`,
    `${ScaffolderGenerator.destinationRoot()}/.husky/commit-msg`,
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky commit-msg hook set up!');
}

function setPrePushHook() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up husky pre-push hook...');
  ScaffolderGenerator.fs.copy(
    `./generators/app/assets/configs/husky/pre-push`,
    `${ScaffolderGenerator.destinationRoot()}/.husky/pre-push`,
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky pre-push hook set up!');
}
