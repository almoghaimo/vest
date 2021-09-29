const isReleaseBranch = require('../scripts/release/isReleaseBranch');
const pushToLatestBranch = require('../scripts/release/steps/pushToLatestBranch');

const logger = require('vx/logger');
const packagesToRelease = require('vx/scripts/release/packagesToRelease');
const releasePackage = require('vx/scripts/release/releasePackage');
const integrationBranch = require('vx/util/integrationBranch');
const { usePackage } = require('vx/vxContext');
const ctx = require('vx/vxContext');
require('../scripts/genTsConfig');

function release() {
  const pkg = usePackage() || integrationBranch.targetPackage;
  if (pkg) {
    return ctx.withPackage(pkg, releasePackage);
  } else {
    releaseAll();
  }
}

module.exports = release;

async function releaseAll() {
  logger.info('🏃 Running release script.');

  const releaseList = await packagesToRelease();

  releaseList.forEach(name => {
    ctx.withPackage(name, release);
  });

  if (!isReleaseBranch()) {
    logger.info(`❌  Not in release branch. Not pushing changes to git.`);
    return;
  }

  pushToLatestBranch();
}