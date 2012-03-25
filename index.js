var fs = require('fs'),
    path = require('path');

// ==============================================
// Backup original methods
// ==============================================
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
    exists          = path.exists,
    existsSync      = path.existsSync,
    createreadstream    = fs.createreadstream,
    createwritestream   = fs.createwritestream;


// ==============================================
// File restriction checker
// ==============================================
var restrictor = {
    config: (function() {
        // TODO: Search file from current dir, parent module's dir and script dir
        var config_dir  = path.dirname(module.parent.filename);
        var config_path = config_dir + '/restriction.json';

        // If file does not exists, throw exception.
        if(!path.existsSync(config_path)) {
            throw new Error('Restriction file is not found - ' + config_path);
        }

        // TODO: Should check parse result
        var config = JSON.parse(fs.readFileSync(config_path, 'utf8'));
        for(var ix=0, len=config.length; ix<len; ix++) {
            config[ix] = new RegExp('^' + path.resolve(config[ix]));
        }

        return config;
    })(),
    
    // Path checker
    checkPath: function(target) {
        var allowed = false;
        
        // Resolve path
        target = path.resolve(target);

        // Check restriction pattarn
        this.config.forEach(function(pattern) {
            if(target.match(pattern)) {
                allowed = true;
            }
        });
        
        if(!allowed) {
            throw new Error('File restriction - ' + target);
        }
    }
};


// ==============================================
// Patching methods
// ==============================================
fs.rename = function(path1, path2, callback) {
    restrictor.checkPath(path1);
    restrictor.checkPath(path2);
    return rename.call(fs, path1, path2, callback);
};

fs.renameSync = function(path1, path2) {
    restrictor.checkPath(path1);
    restrictor.checkPath(path2);
    return renameSync.call(fs, path1, path2);
};

fs.chown = function(path, uid, gid, callback) {
    restrictor.checkPath(path);
    return chown.call(fs, path, uid, gid, callback);
};

fs.chownSync = function(path, uid, gid) {
    restrictor.checkPath(path);
    return chownSync.call(fs, path, uid, gid);
};

fs.lchown = function(path, uid, gid, callback) {
    restrictor.checkPath(path);
    return lchown.call(fs, path, uid, gid, callback);
};

fs.lchownSync = function(path, uid, gid) {
    restrictor.checkPath(path);
    return lchownSync.call(fs, path, uid, gid);
};

fs.chmod = function(path, mode, callback) {
    restrictor.checkPath(path);
    return chmod.call(fs, path, mode, callback);
};

fs.chmodSync = function(path, mode) {
    restrictor.checkPath(path);
    return chmodSync.call(fs, path, mode);
};

fs.lchmod = function(path, mode, callback) {
    restrictor.checkPath(path);
    return lchmod.call(fs, path, mode, callback);
};

fs.lchmodSync = function(path, mode) {
    restrictor.checkPath(path);
    return lchmodSync.call(fs, path, mode);
};

fs.stat = function(path, callback) {
    restrictor.checkPath(path);
    return stat.call(fs, path, callback);
};

fs.statSync = function(path) {
    restrictor.checkPath(path);
    return statSync.call(fs, path);
};

fs.lstat = function(path, callback) {
    restrictor.checkPath(path);
    return lstat.call(fs, path, callback);
};

fs.lstatSync = function(path) {
    restrictor.checkPath(path);
    return lstatSync.call(fs, path);
};

fs.lstat = function(path, callback) {
    restrictor.checkPath(path);
    return lstat.call(fs, path, callback);
};

fs.lstatSync = function(path) {
    restrictor.checkPath(path);
    return lstatSync.call(fs, path);
};

fs.link = function(srcpath, dstpath, callback) {
    restrictor.checkPath(srcpath);
    restrictor.checkPath(dstpath);
    return link.call(fs, srcpath, dstpath, callback);
};

fs.linkSync = function(srcpath, dstpath) {
    restrictor.checkPath(srcpath);
    restrictor.checkPath(dstpath);
    return linkSync.call(fs, srcpath, dstpath);
};

fs.symlink = function(linkdata, path, type, callback) {
    restrictor.checkPath(linkdata);
    restrictor.checkPath(path);
    return symlink.call(fs, linkdata, path, type, callback);
};

fs.symlinkSync = function(linkdata, path, type) {
    restrictor.checkPath(linkdata);
    restrictor.checkPath(path);
    return symlinkSync.call(fs, linkdata, path, type);
};

fs.readlink = function(path, callback) {
    restrictor.checkPath(path);
    return readlink.call(fs, path, callback);
};

fs.readlinkSync = function(path) {
    restrictor.checkPath(path);
    return readlinkSync.call(fs, path);
};

fs.unlink = function(path, callback) {
    restrictor.checkPath(path);
    return unlink.call(fs, path, callback);
};

fs.unlinkSync = function(path) {
    restrictor.checkPath(path);
    return unlinkSync.call(fs, path);
};

fs.rmdir = function(path, callback) {
    restrictor.checkPath(path);
    return rmdir.call(fs, path, callback);
};

fs.rmdirSync = function(path) {
    restrictor.checkPath(path);
    return rmdirSync.call(fs, path);
};

fs.mkdir = function(path, mode, callback) {
    restrictor.checkPath(path);
    return mkdir.call(fs, path, mode, callback);
};

fs.mkdirSync = function(path, mode) {
    restrictor.checkPath(path);
    return mkdirSync.call(fs, path, mode);
};

fs.readdir = function(path, callback) {
    restrictor.checkPath(path);
    return readdir.call(fs, path, callback);
};

fs.readdirSync = function(path) {
    restrictor.checkPath(path);
    return readdirSync.call(fs, path);
};

fs.open = function(path, flags, mode, callback) {
    restrictor.checkPath(path);
    return open.call(fs, path, flags, mode, callback);
};

fs.openSync = function(path, flags, mode) {
    restrictor.checkPath(path);
    return openSync.call(fs, path, flags, mode);
};

fs.utimes = function(path, atime, mtime, callback) {
    restrictor.checkPath(path);
    return utimes.call(fs, path, atime, mtime);
};

fs.utimesSync = function(path, atime, mtime) {
    restrictor.checkPath(path);
    return utimesSync.call(fs, path, atime, mtime);
};

fs.readFile = function(filename, encoding, callback) {
    restrictor.checkPath(filename);
    return readFile.call(fs, filename, encoding, callback);
};

fs.readFileSync = function(filename, encoding) {
    restrictor.checkPath(filename);
    return readFileSync.call(fs, filename, encoding);
};

fs.writeFile = function(filename, data, encoding, callback) {
    restrictor.checkPath(filename);
    return writeFile.call(fs, filename, data, encoding, callback);
};

fs.writeFileSync = function(filename, data, encoding) {
    restrictor.checkPath(filename);
    return writeFileSync.call(fs, filename, data, encoding);
};

fs.watchFile = function(filename, options, listener) {
    restrictor.checkPath(filename);
    return watchFile.call(fs, filename, options, listener);
};

fs.watch = function(filename, options, listener) {
    restrictor.checkPath(filename);
    return watch.call(fs, filename, options, listener);
};

fs.createReadStream = function(path, options) {
    restrictor.checkPath(path);
    return createReadStream.call(fs, path, options);
};

fs.createWriteStream = function(path, options) {
    restrictor.checkPath(path);
    return createWriteStream.call(fs, path, options);
};

path.exists = function(p, callback) {
    restrictor.checkPath(p);
    return exists.call(path, p, callback);
};

path.existsSync = function(p) {
    restrictor.checkPath(p);
    return existsSync.call(path, p);
};
