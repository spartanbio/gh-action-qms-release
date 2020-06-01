# gh-action-qms-release

GitHub action to automatically add tags with QMS document and revision numbers. A tag and release will be created.

## Usage

In your job's `steps` add:

```yml
uses: spartanbio/gh-action-qms-release@v1
```

### Inputs

- `document-number` (required): The QMS document number.

## Example Workflow

```yml
name: Release

on: [push]

jobs:
  qms-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: spartanbio/gh-action-qms-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          document-number: NNN-00000
```
