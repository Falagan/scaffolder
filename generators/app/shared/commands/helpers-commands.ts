import * as fs from 'fs';
import { ScaffolderGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function cleanOutputDirectory() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Cleaning output directory...');
  fs.rmSync(ScaffolderGenerator.destinationRoot(), { recursive: true });
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Output directory cleaned!');
}
