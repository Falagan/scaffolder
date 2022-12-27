import YAML from 'yaml';

export function jsonToYaml(jsonObj: any): string {
  return YAML.stringify(jsonObj);
}
