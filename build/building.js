const packager = require('electron-packager');
const path = require('path');

process.env['DEBUG'] = 'electron-packager';
let sourceDir = path.resolve('..');
let windowsIconPath = path.resolve('..', 'assets', 'logo', 'ico', 'logo.ico');
let macIconPath = path.resolve('..', 'assets', 'logo', 'icns', 'icon.icns');
let linuxIconPath = path.resolve(__dirname, 'logo.png ');
let debug = true;

if ('TRAVIS' in process.env && 'CI' in process.env) {
    windowsIconPath = '';
    macIconPath = '';
    linuxIconPath = '';
    sourceDir = path.resolve('.');
    debug = false;
    process.env['DEBUG'] = '';
}

function shouldIgnore(filePath) {
    //console.log(filePath);
    if (
        filePath.includes('test') ||
        filePath.includes('WorkInProgress') ||
        filePath.includes('.git') ||
        path.basename(filePath).startsWith('.') ||
        filePath.includes('coverage')
    ) {
        if (debug) {
            console.log(`Ignored ${filePath}`);
        }
        return true;
    }
    if (/node_modules/.test(filePath)) {
        if (
            /\/(obj|test.*?|spec.*?|htdocs|demo|dist|example.*?|sample.*?)[\/$]/i.test(
                filePath
            )
        ) {
            if (debug) {
                console.log(`Ignored ${filePath}`);
            }
            return true;
        }
        if (
            /^(\..*|.*\.(sln|pdb|exp|lib|map|md|sh|gypi|gyp|h|cpp|xml|yml|html)|vcxproj.*|LICENSE|README|CONTRIBUTORS|vagrant|Dockerfile|Makefile)$/i.test(
                path.basename(filePath)
            )
        ) {
            if (debug) {
                console.log(`Ignored ${filePath}`);
            }
            return true;
        }
    }
}

packager({
    dir: sourceDir,
    asar: true,
    platform: 'win32',
    arch: 'ia32',
    icon: windowsIconPath,
    ignore: shouldIgnore
})
    .then((appPath) => {
        console.log(`Win32 ${appPath}`);
    })
    .catch((e) => {
        console.error(error);
    });

packager({
    dir: sourceDir,
    asar: true,
    platform: 'win32',
    arch: 'x64',
    icon: windowsIconPath,
    ignore: shouldIgnore
})
    .then((appPath) => {
        console.log(`Win64 ${appPath}`);
    })
    .catch((e) => {
        console.error(error);
    });

packager({
    dir: sourceDir,
    asar: true,
    platform: 'darwin',
    icon: macIconPath,
    ignore: shouldIgnore
})
    .then((appPath) => {
        console.log(`Mac ${appPath}`);
    })
    .catch((e) => {
        console.error(e);
    });
/*
packager({
    dir: sourceDir,
    asar: true,
    platform: "linux",
    arch: 'ia32',
    icon: linuxIconPath,
    ignore: shouldIgnore
}).then(appPath => {
    console.log(`Linux32 ${appPath}`)
}).catch(e => {
    console.error(e);
});
*/
packager({
    dir: sourceDir,
    asar: true,
    platform: 'linux',
    arch: 'x64',
    icon: linuxIconPath,
    ignore: shouldIgnore
})
    .then((appPath) => {
        console.log(`Linux64 ${appPath}`);
    })
    .catch((e) => {
        console.error(e);
    });
