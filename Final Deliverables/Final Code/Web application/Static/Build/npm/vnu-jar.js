#!/usr/bin/env node
'use strict'

const childProcess = require('child_process')
const vnu = require('vnu-jar')

childProcess.exec('java -version', (error, stdout, stderr) => {
  if (error) {
    console.error('Skipping vnu-jar test; Java is missing.')
    return
  }

  const is32bitJava = !/64-Bit/.test(stderr)
  const ignores = [
    'Attribute “autocomplete” is only allowed when the input type is.*'
  ].join('|')

  const args = [
    '-jar',
    vnu,
    '--asciiquotes',
    '--skip-non-html',
    '--no-langdetect',
    '--Werror',
    `--filterpattern "${ignores}"`,
    './*.html',
    'docs_html/',
    'pages/'
  ]

  if (is32bitJava) {
    args.splice(0, 0, '-Xss512k')
  }

  return childProcess.spawn('java', args, {
    shell: true,
    stdio: 'inherit'
  })
    .on('exit', process.exit)
})
Footer
