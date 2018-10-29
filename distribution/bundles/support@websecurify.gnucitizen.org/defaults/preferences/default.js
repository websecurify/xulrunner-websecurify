pref('browser.chromeURL', 'chrome://org.gnucitizen.weaponry.browser/content/xul/browserView.xul');

/* ------------------------------------------------------------------------ */

pref('app.update.enabled', true);
pref('app.update.url', 'https://websecurify.appspot.com/applications/update?locale=%LOCALE%&vendor=%VENDOR%&name=%NAME%&id=%ID%&version=%VERSION%&appbuildid=%APPBUILDID%&platformversion=%PLATFORMVERSION%&platformbuildid=%PLATFORMBUILDID%&app=%APP%&os=%OS%&xpcomabi=%XPCOMABI%&build_target=%BUILD_TARGET%&os_version=%OS_VERSION%&channel=%CHANNEL%&distribution=%DISTRIBUTION%&distribution_version=%DISTRIBUTION_VERSION%');
pref('app.update.url.manual', 'http://www.websecurify.com');
pref('app.update.url.details', 'http://www.websecurify.com');

/* ------------------------------------------------------------------------ */

pref('extensions.blocklist.enabled', false);
pref('extensions.getAddons.cache.enabled', true);
pref('extensions.getAddons.get.url', 'https://websecurify.appspot.com/extensions/get?locale=%LOCALE%&vendor=%VENDOR%&name=%NAME%&id=%ID%&version=%VERSION%&appbuildid=%APPBUILDID%&platformversion=%PLATFORMVERSION%&platformbuildid=%PLATFORMBUILDID%&app=%APP%&os=%OS%&xpcomabi=%XPCOMABI%&build_target=%BUILD_TARGET%&os_version=%OS_VERSION%&channel=%CHANNEL%&distribution=%DISTRIBUTION%&distribution_version=%DISTRIBUTION_VERSION%&api_version=%API_VERSION%&ids=%IDS%&time_main=%TIME_MAIN%&time_first_paint=%TIME_FIRST_PAINT%&time_session_restored=%TIME_SESSION_RESTORED%');
pref('extensions.getAddons.maxResults', 15);
pref('extensions.getAddons.search.browseURL', 'https://websecurify.appspot.com/extensions/browse?locale=%LOCALE%&vendor=%VENDOR%&name=%NAME%&id=%ID%&version=%VERSION%&appbuildid=%APPBUILDID%&platformversion=%PLATFORMVERSION%&platformbuildid=%PLATFORMBUILDID%&app=%APP%&os=%OS%&xpcomabi=%XPCOMABI%&build_target=%BUILD_TARGET%&os_version=%OS_VERSION%&channel=%CHANNEL%&distribution=%DISTRIBUTION%&distribution_version=%DISTRIBUTION_VERSION%&terms=%TERMS%');
pref('extensions.getAddons.search.url', 'https://websecurify.appspot.com/extensions/search?locale=%LOCALE%&vendor=%VENDOR%&name=%NAME%&id=%ID%&version=%VERSION%&appbuildid=%APPBUILDID%&platformversion=%PLATFORMVERSION%&platformbuildid=%PLATFORMBUILDID%&app=%APP%&os=%OS%&xpcomabi=%XPCOMABI%&build_target=%BUILD_TARGET%&os_version=%OS_VERSION%&channel=%CHANNEL%&distribution=%DISTRIBUTION%&distribution_version=%DISTRIBUTION_VERSION%&api_version=%API_VERSION%&terms=%TERMS%&max_results=%MAX_RESULTS%');
pref('extensions.update.url', 'https://websecurify.appspot.com/extensions/update?item_id=%ITEM_ID%&item_version=%ITEM_VERSION%&item_status=%ITEM_STATUS%&app_id=%APP_ID%&app_version=%APP_VERSION%&req_version=%REQ_VERSION%&app_os=%APP_OS%&app_abi=%APP_ABI%&app_locale=%APP_LOCALE%&current_app_version=%CURRENT_APP_VERSION%&update_type=%UPDATE_TYPE%&item_maxappversion=%ITEM_MAXAPPVERSION%');
pref('extensions.webservice.discoverURL', 'https://websecurify.appspot.com/extensions/discover??locale=%LOCALE%&vendor=%VENDOR%&name=%NAME%&id=%ID%&version=%VERSION%&appbuildid=%APPBUILDID%&platformversion=%PLATFORMVERSION%&platformbuildid=%PLATFORMBUILDID%&app=%APP%&os=%OS%&xpcomabi=%XPCOMABI%&build_target=%BUILD_TARGET%&os_version=%OS_VERSION%&channel=%CHANNEL%&distribution=%DISTRIBUTION%&distribution_version=%DISTRIBUTION_VERSION%');

/* ------------------------------------------------------------------------ */

pref('plugins.update.url', 'https://websecurify.appspot.com/plugins/update?locale=%LOCALE%&vendor=%VENDOR%&name=%NAME%&id=%ID%&version=%VERSION%&appbuildid=%APPBUILDID%&platformversion=%PLATFORMVERSION%&platformbuildid=%PLATFORMBUILDID%&app=%APP%&os=%OS%&xpcomabi=%XPCOMABI%&build_target=%BUILD_TARGET%&os_version=%OS_VERSION%&channel=%CHANNEL%&distribution=%DISTRIBUTION%&distribution_version=%DISTRIBUTION_VERSION%');

/* ------------------------------------------------------------------------ */

pref('org.gnucitizen.weaponry.common.brandingAboutURI', 'chrome://org.gnucitizen.websecurify.support/content/xul/aboutWindow.xul');

/* ------------------------------------------------------------------------ */

pref('org.gnucitizen.weaponry.security.CertOverrideService.exceptions.add.3', 'websecurify.appspot.com:443');
pref('org.gnucitizen.weaponry.security.CertOverrideService.exceptions.add.4', 'www.google.com:443');
