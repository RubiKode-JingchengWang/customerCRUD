# rubikode-engine-nodejs

## Add your env file and edit if necessary
cp env.SAMPLE .env.development
vi .env.development

## Set your local environment variables
## for mac
export NODE_ENV=development
export NODE_PATH=./

## for windows
$Env:NODE_PATH="./"
$Env:NODE_ENV="development"

## Install packages and compile typescript
npm install
tsc

## run service
node generatedServices/YOUR-PROJECT-NAME/YOUR-SERVICE-NAME/YOUR-SERVICE-NAME.js