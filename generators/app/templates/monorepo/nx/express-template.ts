import { ScaffolderGenerator } from '../../../index';

export function writingMonoRepoNxExpressTemplate() {
  ScaffolderGenerator.spawnCommandSync('create-nx-workspace', [
    '--name',
    `${ScaffolderGenerator.options.projectName}`,
    '--preset',
    'express',
    '--appName',
    `${ScaffolderGenerator.options.appName}`,
    '--nxCloud',
    'false',
  ]);
}
