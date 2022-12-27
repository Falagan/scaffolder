import Generator from 'yeoman-generator';
import { OUT_PUT_DIRECTORY } from './config';
import { gitInitialization } from './shared/commands/git-commands';
import { basePrompting, ScaffolderGeneratorOpts } from './shared/inputs/base-prompting';
import { logEasterEgg } from './shared/logs/custom/easter-egg-log';
import { TEMPLATES_MAP } from './templates/templates-map';
import { logJobDone } from './shared/logs/custom/job-done-log';

export let ScaffolderGenerator: Generator<ScaffolderGeneratorOpts>;

module.exports = class extends Generator<ScaffolderGeneratorOpts> {
  constructor(args: string | string[], opts: ScaffolderGeneratorOpts) {
    super(args, opts);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    ScaffolderGenerator = this;
  }

  initializing() {
    ScaffolderGenerator.destinationRoot(OUT_PUT_DIRECTORY);
    logEasterEgg();
  }

  async prompting() {
    ScaffolderGenerator.options = await basePrompting();
  }

  writing() {
    const templateFn = TEMPLATES_MAP[ScaffolderGenerator.options.templateType];
    templateFn();
  }

  end() {
    gitInitialization(ScaffolderGenerator.options.gitRemoteRepository);
    logJobDone();
  }
};
