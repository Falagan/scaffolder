import Generator from 'yeoman-generator';
import { OUT_PUT_DIRECTORY } from './config';
import { gitInitialization } from './shared/commands/git-commands';
import { defaultPrompting } from './shared/inputs/default-prompting';
import { logEasterEgg } from './shared/logs/custom/easter-egg-log';
import { TEMPLATES_MAP } from './templates/templates-map';
import { logJobDone } from './shared/logs/custom/job-done-log';

export interface CeNodeGeneratorOpts {
  name: string;
  templateType: string;
  gitRemoteRepository: string;
  appName: string;
  projectName: string;
}

export let CeNodeGenerator: Generator<CeNodeGeneratorOpts>;

module.exports = class extends Generator<CeNodeGeneratorOpts> {
  constructor(args: string | string[], opts: CeNodeGeneratorOpts) {
    super(args, opts);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    CeNodeGenerator = this;
  }

  initializing() {
    CeNodeGenerator.destinationRoot(OUT_PUT_DIRECTORY);
    logEasterEgg();
  }

  async prompting() {
    CeNodeGenerator.options = await defaultPrompting();
  }

  install() {
    // npmInstall();
  }

  writing() {
    const template = TEMPLATES_MAP[CeNodeGenerator.options.templateType];
    template.FN();
  }

  end() {
    gitInitialization(CeNodeGenerator.options.gitRemoteRepository);
    logJobDone();
  }
};
