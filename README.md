# Alorica Skill Set

## Deployment

As of this writing, we have 2 environments: staging and production. The deployment only covers the "lambda" function only.

### Pre-requisites

You need to have the following installed in your machine:

1. [ask-cli](https://www.npmjs.com/package/ask-cli)
2. [ruby](https://www.ruby-lang.org/en/)

### Commands
To deploy the lambda function the commands are:

    // For Staging
    $ rake deploy_staging

    // For Production
    $ rake deploy_prod
