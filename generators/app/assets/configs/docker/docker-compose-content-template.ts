export function dockerComposeJsonContentTemplate(appName: string, ports: string[]) {
  return {
    version: '3',
    services: {
      [appName]: {
        extends: {
          file: 'docker-compose.base.yml',
          service: 'base-service',
        },
        command: `npm run ${appName}:local:docker`,
        ports,
      },
    },
    volumes: { 'mono-node-modules': null },
  };
}
