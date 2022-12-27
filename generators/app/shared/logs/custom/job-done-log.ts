import chalk from 'chalk';
import { ScaffolderGenerator } from '../../../index';

export function logJobDone() {
  ScaffolderGenerator.log(chalk.green('----------------------------------------'));
  ScaffolderGenerator.log(chalk.magenta('Job is done motherfucker.'));
  ScaffolderGenerator.log(chalk.green('----------------------------------------'));
}
