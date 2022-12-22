import chalk from 'chalk';
import { CeNodeGenerator } from '../../../index';

export function logJobDone() {
  CeNodeGenerator.log(chalk.green('----------------------------------------'));
  CeNodeGenerator.log(chalk.magenta('Jobs is done motherfucker.'));
  CeNodeGenerator.log(chalk.green('----------------------------------------'));
}
