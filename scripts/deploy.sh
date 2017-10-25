#!/bin/bash
#
# Usage: scripts/deploy.sh {major|minor|patch}

TYPE=$1
if [[ -z "$TYPE" ]]; then
    echo "Please specify major, minor, or patch" >&2
    exit 1
fi

npm version $TYPE -m "Upgrade to v%s"
npm publish
git push
git push --tags
