import { OUT_PUT_DIRECTORY } from '../../../../config';
import { ScaffolderGenerator } from '../../../../index';
import { setUpCommitLint } from '../../../../shared/commands/commit-lint-commands';
import { setUpHusky } from '../../../../shared/commands/husky-commands';
import { setUpLintStaged } from '../../../../shared/commands/lint-staged-commands';
import { log, LOGS_COLORS, LOGS_ICONS } from '../../../../shared/logs/log';
import path from 'path';
import { setUpPrettier } from '../../../../shared/commands/prettier-commands';
import { setUpReadme } from '../../../../shared/commands/readme-commands';
import { dockerComposeJsonContentTemplate } from '../../../../assets/configs/docker/docker-compose-content-template';
import { jsonToYaml } from '../../../../shared/utils/yaml-utils';

export function writingMonoRepoNxAngularTemplate() {
  createBaseWorkspace();
  ScaffolderGenerator.destinationRoot(`${OUT_PUT_DIRECTORY}/${ScaffolderGenerator.options.projectName}`);
  createAngularTemplate();
  setUpNgrx();
  setUpHusky();
  setUpCommitLint();
  setUpLintStaged();
  setUpPrettier();
  setUpDocker();
  setUpNpmScripts();
  setUpReadme();
}

function createBaseWorkspace() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Creating base workspace...');
  ScaffolderGenerator.spawnCommandSync(
    'create-nx-workspace',
    ['--preset', 'apps', '--name', `${ScaffolderGenerator.options.projectName}`, '--nxCloud', 'false', '--verbose'],
    { shell: true },
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Base workspace created!');
}

function createAngularTemplate() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Creating template...');
  ScaffolderGenerator.spawnCommandSync('npm', ['install', '-D', '@nrwl/angular'], { shell: true });
  ScaffolderGenerator.spawnCommandSync(
    'nx',
    [
      'generate',
      '@nrwl/angular:application',
      '--name',
      `${ScaffolderGenerator.options.appName}`,
      '--routing',
      `${ScaffolderGenerator.options.angularMonoRepoNxRouting}`,
      '--viewEncapsulation',
      'Emulated',
      '--unitTestRunner',
      'jest',
      '--e2eTestRunner',
      'cypress',
      '--linter',
      'eslint',
      `${ScaffolderGenerator.options.angularMonoRepoNxBackendProjectName}`
        ? `--backendProject=${ScaffolderGenerator.options.angularMonoRepoNxBackendProjectName}`
        : '',
      '--strict',
      '--standaloneConfig',
      '--addTailwind',
      `${ScaffolderGenerator.options.angularMonoRepoNxTailwind}`,
      '--standalone',
      `${ScaffolderGenerator.options.angularMonoRepoNxStandAloneStrategy}`,
      '--verbose',
    ],
    { shell: true },
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Template created!');
}

function setUpNgrx() {
  if (ScaffolderGenerator.options.angularMonoRepoNxNgrx === 'true') {
    {
      log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up ngrx ...');
      ScaffolderGenerator.spawnCommandSync(
        'nx',
        [
          'generate',
          '@nrwl/angular:ngrx',
          `${ScaffolderGenerator.options.appName}`,
          `--module=apps/${ScaffolderGenerator.options.appName}/src/app/app.module.ts`,
          '--root',
        ],
        { shell: true },
      );
      log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Ngrx ready!');
    }
  }
}

function setUpNpmScripts() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up npm scripts ...');
  // Local environment scripts
  const localScriptName = `scripts.${ScaffolderGenerator.options.appName}:local`;
  const localScriptAction = `nx serve ${ScaffolderGenerator.options.appName}`;
  ScaffolderGenerator.spawnCommandSync('npm', ['pkg', 'set', `${localScriptName}="${localScriptAction}"`], {
    shell: true,
  });
  // Docker environment scripts
  const dockerScriptName = `scripts.${ScaffolderGenerator.options.appName}:local:docker`;
  const dockerScriptAction = `nx serve ${ScaffolderGenerator.options.appName} --host=0.0.0.0 --poll 5000`;
  ScaffolderGenerator.spawnCommandSync('npm', ['pkg', 'set', `${dockerScriptName}="${dockerScriptAction}"`], {
    shell: true,
  });
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Npm scripts ready!');
}

export function setUpDocker() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up Docker..');
  ScaffolderGenerator.fs.copy(
    `${path.resolve('./')}/generators/app/assets/configs/docker/.dockerignore`,
    `${ScaffolderGenerator.destinationRoot()}/.dockerignore`,
  );
  ScaffolderGenerator.fs.copy(
    `${path.resolve('./')}/generators/app/assets/configs/docker/Dockerfile`,
    `${ScaffolderGenerator.destinationRoot()}/Dockerfile`,
  );
  ScaffolderGenerator.fs.copy(
    `${path.resolve('./')}/generators/app/assets/configs/docker/docker-compose.base.yml`,
    `${ScaffolderGenerator.destinationRoot()}/docker-compose.base.yml`,
  );
  createDockerComposeFile();
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Docker ready!');
}

function createDockerComposeFile() {
  const yamlJsonContent = dockerComposeJsonContentTemplate(ScaffolderGenerator.options.appName, ['4201:4200']);
  const yamlContent = jsonToYaml(yamlJsonContent);
  const destinationPath = `${ScaffolderGenerator.destinationRoot()}/docker-compose.yml`;
  ScaffolderGenerator.writeDestination(destinationPath, yamlContent);
  ScaffolderGenerator.fs.append(destinationPath, '#Example to add another app to services ');
  ScaffolderGenerator.fs.append(destinationPath, '#[appName]:');
  ScaffolderGenerator.fs.append(destinationPath, '   #extends:');
  ScaffolderGenerator.fs.append(destinationPath, '       #file: docker-compose.base.yml');
  ScaffolderGenerator.fs.append(destinationPath, '       #service: base-service ');
  ScaffolderGenerator.fs.append(destinationPath, "   #command: 'npm run [appName]:local:docker' ");
  ScaffolderGenerator.fs.append(destinationPath, '   #ports: ');
  ScaffolderGenerator.fs.append(destinationPath, '   #- 4201:4200');
}
