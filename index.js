const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const readline = require('readline');

/**
 * This is a quick-and-dirty script does the following:
 *   - reads the file specified by input 'file_path' (reads line by line)
 *   - finds the line that contains the input 'search_string'
 *   - extracts the version number from that line
 *
 * This was created specifically to get the version number from the
 * CompatibilityManager.js file in the NG-CHM project
 * (https://github.com/MD-Anderson-Bioinformatics/NG-CHM)
 */
const filepath = core.getInput('file_path');
core.debug(`Searching for version number in file: ${filepath}`);
const filename = `${process.env.GITHUB_WORKSPACE}/${filepath}`

const searchString = core.getInput('search_string');
core.debug(`Searching for line containing: ${searchString}`);

const rl = readline.createInterface({
  input: fs.createReadStream(filename),
  crlfDelay: Infinity,
});

let found = false;
rl.on('line', (line) => {
  if (line.includes(searchString) && !line.startsWith("  //")) {
    core.debug(`found line containing search_string: ${line}`);
    let version_number = line.replace(/^[^0-9]+|[^0-9]+$/g, "")
    core.notice(`Found version number '${version_number}' in file: ${filepath}`);
    core.setOutput("version_number", version_number);
    found = true;
  }
}).on('close', () => {
  if (!found) {
    core.warning(`No line found containing search_string: ${searchString}`);
  } else {
    core.debug(`Version number found in file: ${filepath}`);
  }
})

