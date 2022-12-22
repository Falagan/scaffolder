import { CeNodeGenerator, CeNodeGeneratorOpts } from '../../index';
import { TEMPLATES } from '../../templates/templates-list';

export function defaultPrompting() {
  return CeNodeGenerator.prompt<CeNodeGeneratorOpts>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Your project name',
      store: true,
    },
    {
      type: 'input',
      name: 'appName',
      message: 'Your app name',
      store: true,
    },
    {
      type: 'input',
      name: 'gitRemoteRepository',
      message: 'Your remote git repository',
      store: true,
    },
    {
      type: 'list',
      name: 'templateType',
      message: 'Select the template you want:',
      choices: Object.values(TEMPLATES),
    },
  ]);
}
