import { writingMonoRepoNxNestjsTemplate } from './monorepo/nx/nestjs/nestjs-template';
import { TEMPLATES } from './templates-list';
import { writingMonoRepoNxExpressTemplate } from './monorepo/nx/express-template';

export const TEMPLATES_MAP = {
  [TEMPLATES.MONO_REPO_NX_NESTJS]: {
    NAME: 'Monorepo Nx - Nestjs',
    FN: writingMonoRepoNxNestjsTemplate,
  },
  [TEMPLATES.MONO_REPO_NX_EXPRESS]: {
    NAME: 'Monorepo Nx - Express',
    FN: writingMonoRepoNxExpressTemplate,
  },
};
