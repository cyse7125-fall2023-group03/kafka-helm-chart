const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/exec', {
      prepareCmd: 'rm -f *.tgz && helm package --version ${nextRelease.version} .'
    }],
    ['@semantic-release/git', {
      'assets': [],
      'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    ['@semantic-release/github', {
      assets: ['*.tgz'],
    }]
  ],
  // Define rules for commit messages to trigger releases
  // Add or modify rules as needed
  preset: 'conventionalcommits',
  release: {
    analyzeCommits: 'semantic-release/commit-analyzer',
    generateNotes: 'semantic-release/release-notes-generator',
    branches: ['main'],
  },
  // Rules to specify which commit types trigger a release
  // In this case, 'chore' commits will trigger releases
  commitAnalyzer: {
    releaseRules: [
      { type: 'chore', release: 'patch' },
      // Add more rules if needed for other types
    ],
  },
};

module.exports = config;
