/** @type {import('plop').NodePlopAPI} */
const output = 'output'
module.exports = function (plop) {
  plop.setHelper('mustacheL', () => '{{')
  plop.setHelper('mustacheR', () => '}}')

  plop.setGenerator('monkey-gm', {
    description: 'Create a gm project based on test/gm template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'project name (kebab-case)',
        validate(input) {
          if (!input || !input.trim()) {
            return 'project name is required'
          }
          if (!/^[a-z0-9][a-z0-9-]*$/.test(input)) {
            return 'use kebab-case: letters, numbers, and dash only'
          }
          return true
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'userscript description',
        default: 'try to take over the world!',
      },
      {
        type: 'input',
        name: 'match',
        message: '@match URL pattern',
        default: 'http://localhost:3000/*',
      },
      {
        type: 'input',
        name: 'namespace',
        message: '@namespace',
        default: 'https://www.wdssmq.com/',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: `${output}/{{name}}`,
        templateFiles: [
          'gm-base/**/*',
          '!gm-base/**/node_modules/**',
        ],
        base: 'gm-base',
        force: true,
      },
      {
        type: 'modify',
        path: `${output}/{{name}}/src/__info.js`,
        pattern: /__GM_NAME__/g,
        template: '{{name}}',
      },
      {
        type: 'modify',
        path: `${output}/{{name}}/src/__info.js`,
        pattern: /__GM_DESCRIPTION__/g,
        template: '{{description}}',
      },
      {
        type: 'modify',
        path: `${output}/{{name}}/src/__info.js`,
        pattern: /__GM_MATCH__/g,
        template: '{{match}}',
      },
      {
        type: 'modify',
        path: `${output}/{{name}}/src/__info.js`,
        pattern: /__GM_NAMESPACE__/g,
        template: '{{namespace}}',
      },
    ],
  })
}
