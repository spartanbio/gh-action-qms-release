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

## git alias

Add the following to your `.gitconfig`:

```sh
[alias]
  qms = "!f() { \
    LAST_QMS_REF=$(git rev-list --tags=\"$1-*\" --max-count=1);\
    LAST_QMS_TAG=$(git describe --tags $LAST_QMS_REF);\
    git log $LAST_QMS_TAG..HEAD --no-merges --format='- %s';\
  }; f"
```

Then run `git qms <DOCUMENT_NUMBER>` to get a summary of commits since the last release.
