#!/usr/bin/env sh

set -e

npm run build

cd dist
cp index.html 404.html

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/alan99613/Recipe-client.git master:gh-pages

cd -