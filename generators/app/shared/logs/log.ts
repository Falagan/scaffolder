import chalk from 'chalk';
import { CeNodeGenerator } from '../../index';

export enum LOGS_COLORS {
  INFO = 'blue',
  SUCCESS = 'green',
  WARNING = 'yellow',
  ERROR = 'red',
}

export enum LOGS_ICONS {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export function log(color: LOGS_COLORS, icon: LOGS_ICONS, text: string) {
  CeNodeGenerator.log(chalk[color](`${text}`));
}
