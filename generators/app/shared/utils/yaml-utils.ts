import YAML from 'yaml';

export function jsonToYaml(jsonObj: Record<string, string>): string {
  return YAML.stringify(jsonObj);
}
