import { CeNodeGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function gitInitialization(repoUrl: string) {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Initializing git...');
  repoUrl ? gitInitAndRemoteInitialCommit(repoUrl) : gitInit();

  function gitInit() {
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Git init...');
    CeNodeGenerator.spawnCommandSync('git', ['init'], {
      shell: true,
    });
    log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Git init done!');
  }

  function gitInitAndRemoteInitialCommit(repoUrl: string) {
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Git init...');
    CeNodeGenerator.spawnCommandSync('git', ['init']);
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting git remote...');
    CeNodeGenerator.spawnCommandSync('git', ['remote', 'add', 'origin', repoUrl]);
    CeNodeGenerator.spawnCommandSync('git', ['add', '--all']);
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting init commit...');
    CeNodeGenerator.spawnCommandSync('git', ['commit', '-m', 'chore: scaffolding']);
    log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Git pushing init commit to origin/master...');
    CeNodeGenerator.spawnCommandSync('git', ['branch', '-M', 'master']);
    CeNodeGenerator.spawnCommandSync('git', ['push', '-u', 'origin', 'master']);
    log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Git init and remote setup done!');
  }
}
