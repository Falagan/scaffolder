import { CeNodeGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function npmInstall() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Installing npm packages...');
  CeNodeGenerator.spawnCommandSync('npm', ['install'], {
    shell: true,
  });
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Npm packages installed!');
}
