const fs = require('fs');
const path = require('path');
var electron_notarize = require('electron-notarize');

module.exports = async function(params) {
  // Only notarize the app on Mac OS only.
  if (process.platform !== 'darwin' || process.env['SKIP_NOTARIZATION']) {
    return;
  }

  // Same appId in electron-builder.
  let appId = 'com.shiftreset.actual';

  let appPath = path.join(
    params.appOutDir,
    `${params.packager.appInfo.productFilename}.app`
  );
  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.log(`Notarizing ${appId} found at ${appPath}`);

  try {
    await electron_notarize.notarize({
      appBundleId: appId,
      appPath: appPath,
      appleId: 'longster@gmail.com',
      appleIdPassword: '@keychain:AC_PASSWORD',
      ascProvider: 'JamesLong106746326'
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
