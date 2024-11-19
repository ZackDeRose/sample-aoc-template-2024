// import type {
//   CreateNodesResult,
//   CreateNodesResultV2,
//   NxPluginV2,
// } from '@nx/devkit';

// export const aocPlugin: NxPluginV2 = {
const aocPlugin = {
  name: 'aoc',
  createNodesV2: [
    'day-*/*.data*.txt',
    // async (files, _options): Promise<CreateNodesResultV2> => {
    async (files, _options) => {
      const result = [];
      for (const file of files) {
        result.push(createTargetForFile(file));
      }
      return result;
    },
  ],
};

// function createTargetForFile(file: string): [string, CreateNodesResult] {
function createTargetForFile(file) {
  const [day, part, dataSetName] = deriveFromFileName(file);
  // const result: [string, CreateNodesResult] = [
  const result = [
    file,
    {
      projects: {
        '.': {
          name: 'aoc',
          root: '.',
          sourceRoot: '.',
          targets: {
            [`day-${day}-${part}${dataSetName ? `-${dataSetName}` : ''}`]: {
              command: `tsx day-${day}/${part}${
                dataSetName ? ` ${dataSetName}` : ''
              }`,
            },
          },
        },
      },
    },
  ];
  return result;
}

function deriveFromFileName(file) {
  const [directory, fileName] = file.split('/');
  const day = directory.split('-')[1];
  const part = fileName.split('.')[0];
  // 'day-1/a.data.txt' => dataSetName should be undefined
  // 'day-1/a.data.sample.txt' => dataSetName should be 'sample'
  // 'day-1/a.data.foo.txt' => dataSetName should be 'foo'
  const dataSetName =
    file.split('.').length === 3 ? undefined : file.split('.')[2];
  return dataSetName ? [day, part, dataSetName] : [day, part];
}

module.exports = aocPlugin;

// createTargetForFile('day-1/a.data.txt');
