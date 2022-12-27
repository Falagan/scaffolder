import editJsonFile from 'edit-json-file';
import { ScaffolderGenerator } from '../../index';

export function setUpLintStaged() {
  install();
  config();
}

function install() {
  ScaffolderGenerator.spawnCommandSync('npm', ['install', '--save-dev', 'lint-staged'], { shell: true });
}

function config() {
  const file = editJsonFile(`${ScaffolderGenerator.destinationRoot()}/package.json`);
  file.set('lint-staged', { '**/**/*.{js,jsx,ts,tsx,json}': ['eslint'] });
  file.save();
  ScaffolderGenerator.spawnCommandSync('npm', ['pkg', 'set', 'scripts.lint-staged="lint-staged"'], {
    shell: true,
  });
}
