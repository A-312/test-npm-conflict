const convict = require('convict');

convict.addFormat({
  name: 'source-array',
  validate: function(sources, schema) {
    if (!Array.isArray(sources)) {
      throw new Error('must be of type Array');
    }

    for (source of sources) {
      convict(schema.children).load(source).validate();
    }
  }
});

const schema = {
  sources: {
    doc: 'A collection of data sources.',
    format: 'source-array',
    default: [],

    children: {
      type: {
        doc: 'The source type',
        format: ['git', 'hg', 'svn'],
        default: null
      },
      url: {
        doc: 'The source URL',
        format: 'url',
        default: null
      }
    }
  }
};

const config = convict(schema).load({
  'sources': [
    {
      'type': 'git',
      'url': 'https://github.com/mozilla/node-convict.git'
    },
    {
      'type': 'git',
      'url': 'https://github.com/github/hub.git'
    }
  ]
});

(() => {
  try {
    config.validate();
    console.log("Ok! Node use the new version of conflict ! :D")
  } catch (e) {
    throw Error("Error conflict");
  }
})();

require("dep-avion");