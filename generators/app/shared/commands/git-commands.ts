import { ScaffolderGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function gitInitialization(repoUrl: string) {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Initializing git...');
  repoUrl ? gitInitAndRemoteInitialCommit(repoUrl) : gitInit();

  function gitInit() {
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Git init...');
    ScaffolderGenerator.spawnCommandSync('git', ['init'], {
      shell: true,
    });
    ScaffolderGenerator.spawnCommandSync('git', ['add', '--all']);
    ScaffolderGenerator.spawnCommandSync('git', ['commit', '-m', 'chore: initial commit scaffolding']);
    log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Git init done!');
  }

  function gitInitAndRemoteInitialCommit(repoUrl: string) {
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Git init...');
    ScaffolderGenerator.spawnCommandSync('git', ['init']);
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting git remote...');
    ScaffolderGenerator.spawnCommandSync('git', ['remote', 'add', 'origin', repoUrl]);
    ScaffolderGenerator.spawnCommandSync('git', ['add', '--all']);
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting init commit...');
    ScaffolderGenerator.spawnCommandSync('git', ['commit', '-m', 'chore: scaffolding']);
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Git pushing init commit to origin/master...');
    ScaffolderGenerator.spawnCommandSync('git', ['branch', '-M', 'master']);
    ScaffolderGenerator.spawnCommandSync('git', ['push', '-u', 'origin', 'master']);
    log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Git init and remote setup done!');
  }
}
