## Running the app using Docker

```bash
# Docker env
cd docker/dev
docker compose up -d
docker compose up -d --no-deps --build api
# development
$ npm run start:dev


# production mode
$ npm run start:prod
```

## Deployment

### Publish using CI/CD

- To create a Git tag, you typically use the following command:

```bash

git tag <tagname>
```

So, in the context of the naming pattern mentioned earlier (`nestjs-server-v1.2.3`), you would create a tag for a new version by running:

```bash

git tag nestjs-server-v1.2.3
```

After creating the tag, you would need to push it to the remote repository. You can do that with the following command:

```bash

git push origin nestjs-server-v1.2.3
# or
git push --tags
```

This will push the specific tag `nestjs-server-v1.2.3` to the remote repository, and if your GitHub Actions workflow is configured as I described earlier, it will trigger the build and publish process.

Note: Make sure to run the `git tag` command on the commit you want to mark as a release. Typically, this would be the latest commit on your main branch or another branch you're using for production releases, but you can also tag previous commits if needed.

## Example

```bash
# Update the version in package.json
npm version patch # or minor, major
# Create a tag
git tag nestjs-server-v1.2.3
# Push the changes to the main branch
git push origin main
# Push the tag to the remote repository
git push origin --tags

```
