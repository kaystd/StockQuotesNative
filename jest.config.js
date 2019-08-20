module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-navigation)/'
  ]
}
