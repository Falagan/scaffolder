import { TEMPLATES } from '../../templates/templates-list';
import { ScaffolderGeneratorOpts } from './base-prompting';

export interface AngularGeneratorOptions {
  angularMonoRepoNxStandAloneStrategy: 'true' | 'false';
  angularMonoRepoNxRouting: 'true' | 'false';
  angularMonoRepoNxTailwind: 'true' | 'false';
  angularMonoRepoNxNgrx: 'true' | 'false';
  angularMonoRepoNxFormly: 'true' | 'false';
  angularMonoRepoNxBackendProjectName: string; //Adds a proxy config
  angularMonoRepoNxStyle: 'true' | 'false'; //Adds a proxy config
}

export const angularPrompting = [
  // Angular Nx Monorepo Options
  {
    when: (answers: ScaffolderGeneratorOpts) => answers.templateType === TEMPLATES.MONO_REPO_NX_ANGULAR,
    type: 'list',
    name: 'angularMonoRepoNxRouting',
    message: 'Add Routing?',
    default: 'false',
    choices: ['true', 'false'],
    store: true,
  },
  {
    when: (answers: ScaffolderGeneratorOpts) => answers.templateType === TEMPLATES.MONO_REPO_NX_ANGULAR,
    type: 'list',
    name: 'angularMonoRepoNxStandAloneStrategy',
    message: 'StandAlone strategy?',
    default: 'false',
    choices: ['true', 'false'],
    store: true,
  },
  {
    when: (answers: ScaffolderGeneratorOpts) => answers.templateType === TEMPLATES.MONO_REPO_NX_ANGULAR,
    type: 'list',
    name: 'angularMonoRepoNxFormly',
    message: 'Add Formly?',
    default: 'false',
    choices: ['true', 'false'],
    store: true,
  },
  {
    when: (answers: ScaffolderGeneratorOpts) => answers.templateType === TEMPLATES.MONO_REPO_NX_ANGULAR,
    type: 'list',
    name: 'angularMonoRepoNxTailwind',
    message: 'Add Tailwind CSS?',
    default: 'false',
    choices: ['true', 'false'],
    store: true,
  },
  {
    when: (answers: ScaffolderGeneratorOpts) => answers.templateType === TEMPLATES.MONO_REPO_NX_ANGULAR,
    type: 'input',
    name: 'angularMonoRepoNxBackendProjectName',
    message: 'Backend project name?',
    default: '',
    store: true,
  },
  {
    when: (answers: ScaffolderGeneratorOpts) => answers.templateType === TEMPLATES.MONO_REPO_NX_ANGULAR,
    type: 'list',
    name: 'angularMonoRepoNxNgrx',
    message: 'Add NgRx?',
    default: 'false',
    choices: ['true', 'false'],
    store: true,
  },
];
