var fs = require('fs'),
    path = require('path');

// ==============================================
// Backup original methods
// ==============================================
var activated = false;
var mod = fs.exists ? fs : path;
var rename          = fs.rename,
    renameSync      = fs.renameSync,
    chown           = fs.chown,
    chownSync       = fs.chownSync,
    lchown          = fs.lchown,
    lchownSync      = fs.lchownSync,
    chmod           = fs.chmod,
    chmodSync       = fs.chmodSync,
    lchmod          = fs.lchmod,
    lchmodSync      = fs.lchmodSync,
    stat            = fs.stat,
    statSync        = fs.statSync,
    lstat           = fs.lstat,
    lstatSync       = fs.lstatSync,
    link            = fs.link,
    linkSync        = fs.linkSync,
    symlink         = fs.symlink,
    symlinkSync     = fs.symlinkSync,
    readlink        = fs.readlink,
    readlinkSync    = fs.readlinkSync,
    unlink          = fs.unlink,
    unlinkSync      = fs.unlinkSync,
    rmdir           = fs.rmdir,
    rmdirSync       = fs.rmdirSync,
    mkdir           = fs.mkdir,
    mkdirSync       = fs.mkdirSync,
    readdir         = fs.readdir,
    readdirSync     = fs.readdirSync,
    open            = fs.open,
    openSync        = fs.openSync,
    utimes          = fs.utimes,
    utimesSync      = fs.utimesSync,
    readFile        = fs.readFile,
    readFileSync    = fs.readFileSync,
    writeFile       = fs.writeFile,
    writeFileSync   = fs.writeFileSync,
    appendFile      = fs.appendFile,
    appendFileSync  = fs.appendFileSync,
    watchFile       = fs.watchFile,
    watch           = fs.watch,
    createreadstream    = fs.createreadstream,
    createwritestream   = fs.createwritestream,
    exists          = mod.exists,
    existsSync      = mod.existsSync;


// ==============================================
// File restriction checker
// ==============================================
var restrictor = {
    // Activation
    activate: function(config_path) {
        if(typeof config_path === "undefined") {
            config_path = process.cwd() + '/restriction.json';
        }

        // If file does not exists, throw exception.
        if(!fs.existsSync(config_path)) {
            throw new Error('Restriction file does not exists - ' + config_path);
        }

        // TODO: Should check parse result
        var config = JSON.parse(fs.readFileSync(config_path, 'utf8'));
        for(var ix=0, len=config.length; ix<len; ix++) {
            config[ix] = new RegExp('^' + path.resolve(config[ix]));
        }
        this.config = config;
        
        // Override methods
        this.overrideMethods();
    },
    
    // Path checker
    checkPath: function(target_path) {
        var allowed = false;
        
        // Resolve path
        target_path = path.resolve(target_path);

        // Check cache
        if(this.cache && this.cache[0] == target_path) {
            allowed = this.cache[1];
        } else {
            // Check restriction pattarn
            this.config.forEach(function(pattern) {
                if(target_path.match(pattern)) {
                    allowed = true;
                }
            });
            // Save cache
            this.cache = [target_path, allowed];
        }
        
        if(!allowed) {
            throw new Error('File restriction - ' + target_path);
        }
    },
    
    // Override core methods
    overrideMethods: function() {
        fs.rename = function(path1, path2, callback) {
            restrictor.checkPath(path1);
            restrictor.checkPath(path2);
            return rename.apply(fs, arguments);
        };

        fs.renameSync = function(path1, path2) {
            restrictor.checkPath(path1);
            restrictor.checkPath(path2);
            return renameSync.apply(fs, arguments);
        };

        fs.chown = function(path, uid, gid, callback) {
            restrictor.checkPath(path);
            return chown.apply(fs, arguments);
        };

        fs.chownSync = function(path, uid, gid) {
            restrictor.checkPath(path);
            return chownSync.apply(fs, arguments);
        };

        fs.lchown = function(path, uid, gid, callback) {
            restrictor.checkPath(path);
            return lchown.apply(fs, arguments);
        };

        fs.lchownSync = function(path, uid, gid) {
            restrictor.checkPath(path);
            return lchownSync.apply(fs, arguments);
        };

        fs.chmod = function(path, mode, callback) {
            restrictor.checkPath(path);
            return chmod.apply(fs, arguments);
        };

        fs.chmodSync = function(path, mode) {
            restrictor.checkPath(path);
            return chmodSync.apply(fs, arguments);
        };

        fs.lchmod = function(path, mode, callback) {
            restrictor.checkPath(path);
            return lchmod.apply(fs, arguments);
        };

        fs.lchmodSync = function(path, mode) {
            restrictor.checkPath(path);
            return lchmodSync.apply(fs, arguments);
        };

        fs.stat = function(path, callback) {
            restrictor.checkPath(path);
            return stat.apply(fs, arguments);
        };

        fs.statSync = function(path) {
            restrictor.checkPath(path);
            return statSync.apply(fs, arguments);
        };

        fs.lstat = function(path, callback) {
            restrictor.checkPath(path);
            return lstat.apply(fs, arguments);
        };

        fs.lstatSync = function(path) {
            restrictor.checkPath(path);
            return lstatSync.apply(fs, arguments);
        };

        fs.lstat = function(path, callback) {
            restrictor.checkPath(path);
            return lstat.apply(fs, arguments);
        };

        fs.lstatSync = function(path) {
            restrictor.checkPath(path);
            return lstatSync.apply(fs, arguments);
        };

        fs.link = function(srcpath, dstpath, callback) {
            restrictor.checkPath(srcpath);
            restrictor.checkPath(dstpath);
            return link.apply(fs, arguments);
        };

        fs.linkSync = function(srcpath, dstpath) {
            restrictor.checkPath(srcpath);
            restrictor.checkPath(dstpath);
            return linkSync.apply(fs, arguments);
        };

        fs.symlink = function(linkdata, path, type, callback) {
            restrictor.checkPath(linkdata);
            restrictor.checkPath(path);
            return symlink.apply(fs, arguments);
        };

        fs.symlinkSync = function(linkdata, path, type) {
            restrictor.checkPath(linkdata);
            restrictor.checkPath(path);
            return symlinkSync.apply(fs, arguments);
        };

        fs.readlink = function(path, callback) {
            restrictor.checkPath(path);
            return readlink.apply(fs, arguments);
        };

        fs.readlinkSync = function(path) {
            restrictor.checkPath(path);
            return readlinkSync.apply(fs, arguments);
        };

        fs.unlink = function(path, callback) {
            restrictor.checkPath(path);
            return unlink.apply(fs, arguments);
        };

        fs.unlinkSync = function(path) {
            restrictor.checkPath(path);
            return unlinkSync.apply(fs, arguments);
        };

        fs.rmdir = function(path, callback) {
            restrictor.checkPath(path);
            return rmdir.apply(fs, arguments);
        };

        fs.rmdirSync = function(path) {
            restrictor.checkPath(path);
            return rmdirSync.apply(fs, arguments);
        };

        fs.mkdir = function(path, mode, callback) {
            restrictor.checkPath(path);
            return mkdir.apply(fs, arguments);
        };

        fs.mkdirSync = function(path, mode) {
            restrictor.checkPath(path);
            return mkdirSync.apply(fs, arguments);
        };

        fs.readdir = function(path, callback) {
            restrictor.checkPath(path);
            return readdir.apply(fs, arguments);
        };

        fs.readdirSync = function(path) {
            restrictor.checkPath(path);
            return readdirSync.apply(fs, arguments);
        };

        fs.open = function(path, flags, mode, callback) {
            restrictor.checkPath(path);
            return open.apply(fs, arguments);
        };

        fs.openSync = function(path, flags, mode) {
            restrictor.checkPath(path);
            return openSync.apply(fs, arguments);
        };

        fs.utimes = function(path, atime, mtime, callback) {
            restrictor.checkPath(path);
            return utimes.apply(fs, arguments);
        };

        fs.utimesSync = function(path, atime, mtime) {
            restrictor.checkPath(path);
            return utimesSync.apply(fs, arguments);
        };

        fs.readFile = function(filename, encoding, callback) {
            restrictor.checkPath(filename);
            return readFile.apply(fs, arguments);
        };

        fs.readFileSync = function(filename, encoding) {
            restrictor.checkPath(filename);
            return readFileSync.apply(fs, arguments);
        };

        fs.writeFile = function(filename, data, encoding, callback) {
            restrictor.checkPath(filename);
            return writeFile.apply(fs, arguments);
        };

        fs.writeFileSync = function(filename, data, encoding) {
            restrictor.checkPath(filename);
            return writeFileSync.apply(fs, arguments);
        };

        fs.watchFile = function(filename, options, listener) {
            restrictor.checkPath(filename);
            return watchFile.apply(fs, arguments);
        };

        fs.watch = function(filename, options, listener) {
            restrictor.checkPath(filename);
            return watch.apply(fs, arguments);
        };

        fs.createReadStream = function(path, options) {
            restrictor.checkPath(path);
            return createReadStream.apply(fs, arguments);
        };

        fs.createWriteStream = function(path, options) {
            restrictor.checkPath(path);
            return createWriteStream.apply(fs, arguments);
        };

        mod.exists = function(p, callback) {
            restrictor.checkPath(p);
            return exists.apply(path, arguments);
        };

        mod.existsSync = function(p) {
            restrictor.checkPath(p);
            return existsSync.apply(path, arguments);
        };
    }
};


// ==============================================
// Export module interface
// ==============================================
exports.activate = function(config_path) {
    if(activated) { return; }
    restrictor.activate(config_path);
    activated = true;
};
