import { CeNodeGenerator } from '../../../index';

export function writingMonoRepoNxExpressTemplate() {
  CeNodeGenerator.spawnCommandSync('create-nx-workspace', [
    '--name',
    `${CeNodeGenerator.options.projectName}`,
    '--preset',
    'express',
    '--appName',
    `${CeNodeGenerator.options.appName}`,
    '--nxCloud',
    'false',
  ]);
}
