import { OUT_PUT_DIRECTORY } from '../../../../config';
import { ScaffolderGenerator } from '../../../../index';
import { setUpCommitLint } from '../../../../shared/commands/commit-lint-commands';
import { setUpHusky } from '../../../../shared/commands/husky-commands';
import { setUpLintStaged } from '../../../../shared/commands/lint-staged-commands';
import { log, LOGS_COLORS, LOGS_ICONS } from '../../../../shared/logs/log';
import { setUpPrettier } from '../../../../shared/commands/prettier-commands';
import { setUpReadme } from '../../../../shared/commands/readme-commands';
import path from 'path';
import { jsonToYaml } from '../../../../shared/utils/yaml-utils';
import { dockerComposeJsonContentTemplate } from '../../../../assets/configs/docker/docker-compose-content-template';

export async function writingMonoRepoNxNestjsTemplate() {
  await createTemplate();
  ScaffolderGenerator.destinationRoot(`${OUT_PUT_DIRECTORY}/${ScaffolderGenerator.options.projectName}`);
  setUpHusky();
  setUpCommitLint();
  setUpLintStaged();
  setUpPrettier();
  setUpDocker();
  setUpNpmScripts();
  setUpReadme();
}

function createTemplate() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Creating template...');
  ScaffolderGenerator.spawnCommandSync(
    'create-nx-workspace',
    [
      '--name',
      `${ScaffolderGenerator.options.projectName}`,
      '--preset',
      'nest',
      '--appName',
      `${ScaffolderGenerator.options.appName}`,
      '--nxCloud',
      'false',
      '--verbose',
    ],
    { shell: true },
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Template created!');
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
  const dockerScriptAction = `nx serve ${ScaffolderGenerator.options.appName} --host=0.0.0.0 --port=4311`;
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
  const yamlJsonContent = dockerComposeJsonContentTemplate(ScaffolderGenerator.options.appName, [
    '3333:3333',
    '4311:4311',
  ]);
  const yamlContent = jsonToYaml(yamlJsonContent);
  const destinationPath = `${ScaffolderGenerator.destinationRoot()}/docker-compose.yml`;
  ScaffolderGenerator.writeDestination(destinationPath, yamlContent);
  ScaffolderGenerator.fs.append(destinationPath, '#Example to add another app in services');
  ScaffolderGenerator.fs.append(destinationPath, '#[appName]:');
  ScaffolderGenerator.fs.append(destinationPath, '   #extends:');
  ScaffolderGenerator.fs.append(destinationPath, '       #file: docker-compose.base.yml');
  ScaffolderGenerator.fs.append(destinationPath, '       #service: base-service ');
  ScaffolderGenerator.fs.append(destinationPath, "   #command: 'npm run [appName]:local:docker' ");
  ScaffolderGenerator.fs.append(destinationPath, '   #ports: ');
  ScaffolderGenerator.fs.append(destinationPath, '   #- 4201:4200');
}
