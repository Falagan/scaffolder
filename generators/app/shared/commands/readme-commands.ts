import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';
import { ScaffolderGenerator } from '../../index';
import path from 'path';

export function setUpReadme() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Setting up README.md...');
  ScaffolderGenerator.fs.delete(`${ScaffolderGenerator.destinationRoot()}/README.md`);
  ScaffolderGenerator.fs.copyTpl(
    `${path.resolve('./')}/generators/app/assets/configs/readmes/README.md`,
    `${ScaffolderGenerator.destinationRoot()}/README.md`,
    {
      projectName: ScaffolderGenerator.options.projectName,
      appName: ScaffolderGenerator.options.appName,
    },
  );
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'README.md ready!');
}
