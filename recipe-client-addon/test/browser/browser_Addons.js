"use strict";

Cu.import("resource://testing-common/AddonTestUtils.jsm", this);
Cu.import("resource://gre/modules/Services.jsm", this);
Cu.import("resource://shield-recipe-client/lib/Addons.jsm", this);

// Initialize test utils
AddonTestUtils.initMochitest(this);

const testInstallId = "testInstallUpdate@example.com";
compose_task(
  withWebExtension({version: "1.0", id: testInstallId}),
  withWebExtension({version: "2.0", id: testInstallId}),
  async function testInstallUpdate([id1, addonFile1], [id2, addonFile2]) {
    // Install 1.0 add-on
    let startupPromise = AddonTestUtils.promiseWebExtensionStartup(testInstallId);
    const installedAddonUrl = Services.io.newFileURI(addonFile1).spec;
    await Addons.install(installedAddonUrl);
    await startupPromise;

    // Fail to install the 2.0 add-on without updating enabled
    const newAddonUrl = Services.io.newFileURI(addonFile2).spec;
    await Assert.rejects(
      Addons.install(newAddonUrl, {update: false}),
      /updating is disabled/,
      "install rejects when the study add-on is already installed and updating is disabled"
    );

    // Install the new add-on with updating enabled
    startupPromise = AddonTestUtils.promiseWebExtensionStartup(testInstallId);
    await Addons.install(newAddonUrl, {update: true});

    const addon = await startupPromise;
    is(
      addon.version,
      "2.0",
      "install can successfully update an already-installed addon when updating is enabled."
    );

    await Addons.uninstall(testInstallId);
  }
);
