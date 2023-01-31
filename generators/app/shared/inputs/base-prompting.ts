import { ScaffolderGenerator } from '../../index';
import { TEMPLATES } from '../../templates/templates-list';
import { nxAngularPrompting, AngularGeneratorOptions } from './nx-angular-prompting';

export interface ScaffolderGeneratorBaseOpts {
  name: string;
  templateType: string;
  gitRemoteRepository: string;
  appName: string;
  projectName: string;
}

export type ScaffolderGeneratorOpts = ScaffolderGeneratorBaseOpts & AngularGeneratorOptions;

export function basePrompting() {
  return ScaffolderGenerator.prompt<ScaffolderGeneratorOpts>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Your project name',
      store: false,
    },
    {
      type: 'input',
      name: 'appName',
      message: 'Your app name',
      store: false,
    },
    {
      type: 'input',
      name: 'gitRemoteRepository',
      message: 'Your remote git repository',
      store: false,
    },
    {
      type: 'list',
      name: 'templateType',
      message: 'Select the template you want:',
      choices: Object.values(TEMPLATES),
    },
    ...nxAngularPrompting,
  ]);
}
