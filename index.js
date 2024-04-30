const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const readline = require('readline');

/**
 * This is a quick-and-dirty script does the following:
 *   - reads the file specified by input 'file_path' (reads line by line)
 *   - finds the line that starts with the input 'start_string'
 *   - extracts the version number from that line
 *
 * This was created specifically to get the version number from the 
 * CompatibilityManager.js file in the NG-CHM project
 * (https://github.com/MD-Anderson-Bioinformatics/NG-CHM)
 */
const filepath = core.getInput('file_path');
core.debug(`Searching for version number in file: ${filepath}`);
const filename = `${process.env.GITHUB_WORKSPACE}/${filepath}`

const startString = core.getInput('start_string');
core.debug(`Searching for string starting with: ${startString}`);

const rl = readline.createInterface({
  input: fs.createReadStream(filename),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  if (line.startsWith(startString)) {
    core.debug(`found line starting with start_string: ${line}`);
    let version_number = line.replace(/^[^0-9]+|[^0-9]+$/g, "")
    core.notice(`Found version number '${version_number}' in file: ${filepath}`);
    core.setOutput("version_number", version_number);
    return;
  }
});

core.warning(`No line found starting with start_string: ${startString}`);

