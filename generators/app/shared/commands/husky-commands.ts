import { CeNodeGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function setUpHusky() {
  install();
  config();
}

function install() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Installing husky...');
  CeNodeGenerator.spawnCommandSync('npm', ['install', 'husky', '--save-dev'], {
    shell: true,
  });
  CeNodeGenerator.spawnCommandSync('npm', ['pkg', 'set', 'scripts.prepare="husky install"'], {
    shell: true,
  });
  CeNodeGenerator.spawnCommandSync('npm', ['run', 'prepare'], {
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
  console.log(`${CeNodeGenerator.destinationRoot()}/.husky/pre-commit`);
  CeNodeGenerator.fs.copy(
    `./generators/app/assets/configs/husky/pre-commit`,
    `${CeNodeGenerator.destinationRoot()}/.husky/pre-commit`,
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky pre-commit hook set up!');
}

function setCommitMsgHook() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up husky commit-msg hook...');
  CeNodeGenerator.fs.copy(
    `./generators/app/assets/configs/husky/commit-msg`,
    `${CeNodeGenerator.destinationRoot()}/.husky/commit-msg`,
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky commit-msg hook set up!');
}

function setPrePushHook() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up husky pre-push hook...');
  CeNodeGenerator.fs.copy(
    `./generators/app/assets/configs/husky/pre-push`,
    `${CeNodeGenerator.destinationRoot()}/.husky/pre-push`,
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Husky pre-push hook set up!');
}
