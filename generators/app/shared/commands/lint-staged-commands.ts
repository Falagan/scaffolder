import editJsonFile from 'edit-json-file';
import { CeNodeGenerator } from '../../index';

export function setUpLintStaged() {
  install();
  config();
}

function install() {
  CeNodeGenerator.spawnCommandSync('npm', ['install', '--save-dev', 'lint-staged'], { shell: true });
}

function config() {
  const file = editJsonFile(`${CeNodeGenerator.destinationRoot()}/package.json`);
  file.set('lint-staged', { '**/**/*.{js,jsx,ts,tsx,json}': ['eslint'] });
  file.save();
  CeNodeGenerator.spawnCommandSync('npm', ['pkg', 'set', 'scripts.lint-staged="lint-staged"'], {
    shell: true,
  });
}
