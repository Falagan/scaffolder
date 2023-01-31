import YAML from 'yaml';

export function jsonToYaml(jsonObj: Record<any, any>): string {
  return YAML.stringify(jsonObj);
}
