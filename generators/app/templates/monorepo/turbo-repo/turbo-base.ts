import { log, LOGS_COLORS, LOGS_ICONS } from '../../../shared/logs/log';

export function writingMonoRepoTurboRepoBaseTemplate() {
  createTemplate();
}

function createTemplate() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Creating template...');
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Template created!');
}
