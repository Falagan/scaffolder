import * as fs from 'fs';
import { CeNodeGenerator } from '../../index';
import { log, LOGS_COLORS, LOGS_ICONS } from '../logs/log';

export function cleanOutputDirectory() {
  log(LOGS_COLORS.INFO, LOGS_ICONS.INFO, 'Cleaning output directory...');
  fs.rmSync(CeNodeGenerator.destinationRoot(), { recursive: true });
  log(LOGS_COLORS.SUCCESS, LOGS_ICONS.SUCCESS, 'Output directory cleaned!');
}
