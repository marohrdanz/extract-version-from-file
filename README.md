# Extract version number from file

This **extremely fragile** GitHub Action extracts the version number from a file in a repo.
This action was created specifically to extract the version number from 
the [NG=CHM Viewer repo](https://github.com/MD-Anderson-Bioinformatics/NG-CHM), and may
not be useful in general.

## Inputs

- `file_path`: Path in repo to file containing version number
- `start_string`: Starting characters of line containing version number

## Outputs

- `version_number`: Version number found in file\_path

## Example Usage

In order to use this action, the repo must have already been checked out
(e.g. via [GitHub Checkout Action](https://github.com/marketplace/actions/checkout).)

This example will search the repo file NG-CHM/NGCHM/WebContent/javascript/CompatibilityManager.js for the
line that starts with 'CM.version = ' and extract the version number.

```yaml
uses: marohrdanz/extract-version-from-file
with:
  file_path: 'NG-CHM/NGCHM/WebContent/javascript/CompatibilityManager.js'
  start_string: 'CM.version = '
```

