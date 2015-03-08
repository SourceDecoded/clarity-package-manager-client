# clarity-package-manager-client
The Clarity Package Manager Client

Manage application components published by a cpkg server running somewhere.

Currently (partially) implemented:
* applicationConfig: Manage application.json files
* userConfig: Manage user config files, by default at ~/.cpkg

Try this:
    bin/cli.js add-source "http://someplace.org"
    bin/cli.js list-sources
