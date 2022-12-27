import { writingMonoRepoNxNestjsTemplate } from './monorepo/nx/nestjs/nestjs-template';
import { TEMPLATES } from './templates-list';
import { writingMonoRepoNxAngularTemplate } from './monorepo/nx/angular/angular-template';

export const TEMPLATES_MAP: { [key: string]: () => void } = {
  [TEMPLATES.MONO_REPO_NX_NESTJS]: writingMonoRepoNxNestjsTemplate,
  [TEMPLATES.MONO_REPO_NX_ANGULAR]: writingMonoRepoNxAngularTemplate,
};
