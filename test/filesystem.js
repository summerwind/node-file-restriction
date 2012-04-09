var chai    = require('chai'),
    fs      = require('fs'),
    path    = require('path'),
    should  = chai.should();

var etc_path = '/etc/hosts',
    tmp_path = '/tmp/node-restriction.log',
    mod      = fs.exists ? fs : path;

require('../restriction').activate(__dirname + '/restriction.json');

describe('File System', function() {
    it('rename() - OK', function(done) {
        var renamed_path = tmp_path + '.renamed';
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        fs.rename(tmp_path, renamed_path, function(err){
            should.not.exist(err);
            fs.unlinkSync(renamed_path);
            done();
        });
    });
    
    it('rename() - NG (path1)', function() {   
        (function() {  
            fs.rename('package.json', tmp_path);
        }).should.throw(/^File restriction - /);
    });
    
    it('rename() - NG (path2)', function() {   
        (function() {  
            fs.rename(etc_path, 'package.json');
        }).should.throw(/^File restriction - /);
    });

    it('renameSync() - OK', function() {
        var renamed_path = tmp_path + '.renamed';
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        fs.renameSync(tmp_path, renamed_path);
        
        var exists = mod.existsSync(renamed_path);
        exists.should.be.true;
        fs.unlinkSync(renamed_path);
    });
    
    it('renameSync() - NG (path1)', function() {   
        (function() {  
            fs.renameSync('package.json', tmp_path);
        }).should.throw(/^File restriction - /);
    });
    
    it('renameSync() - NG (path2)', function() {   
        (function() {  
            fs.renameSync(etc_path, 'package.json');
        }).should.throw(/^File restriction - /);
    });
    
    it('chown() - OK', function(done) {
        var uid = process.getuid();
        var gid = process.getgid();
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        fs.chown(tmp_path, uid, gid, function(err){
            should.not.exist(err);
            fs.unlinkSync(tmp_path);
            done();
        });
    });
    
    it('chown() - NG', function() {   
        (function() {  
            fs.chown('package.json', 0, 0);
        }).should.throw(/^File restriction - /);
    });
    
    it('chownSync() - OK', function() {
        var uid = process.getuid();
        var gid = process.getgid();
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        var result = fs.chownSync(tmp_path, uid, gid);
        should.not.exist(result);
        fs.unlinkSync(tmp_path);
    });
    
    it('chownSync() - NG', function() {   
        (function() {  
            fs.chownSync('package.json', 0, 0);
        }).should.throw(/^File restriction - /);
    });

    it('lchown() - OK', function(done) {
        var uid = process.getuid();
        var gid = process.getgid();
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        fs.lchown(tmp_path, uid, gid, function(err){
            should.not.exist(err);
            fs.unlinkSync(tmp_path);
            done();
        });
    });
    
    it('lchown() - NG', function() {   
        (function() {  
            fs.lchown('package.json', 0, 0);
        }).should.throw(/^File restriction - /);
    });
    
    it('lchownSync() - OK', function() {
        var uid = process.getuid();
        var gid = process.getgid();
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        var result = fs.lchownSync(tmp_path, uid, gid);
        should.not.exist(result);
        fs.unlinkSync(tmp_path);
    });
    
    it('lchownSync() - NG', function() {   
        (function() {  
            fs.lchownSync('package.json', 0, 0);
        }).should.throw(/^File restriction - /);
    });
    
    it('readFileSync() - OK', function() {
        var file = fs.readFileSync(etc_path);
        file.should.be.ok;
    });
        
    it('readFileSync() - NG', function() {
        (function() {
            fs.readFileSync('package.json');
        }).should.throw(/^File restriction - /);
    });

    it('writeFileSync() - OK', function() {
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        
        var exists = mod.existsSync(tmp_path);
        exists.should.be.true;
        fs.unlinkSync(tmp_path);
    });
        
    it('writeFileSync() - NG', function() {
        (function() {
            fs.writeFileSync('tmp.log', 'log', 'utf8');
        }).should.throw(/^File restriction - /);
    });

    it('exists() - OK', function(done) {        
        mod.exists(etc_path, function(exists) {
            exists.should.be.true;
            done();
        });
    });
        
    it('exists() - NG', function() {
        (function() {
            mod.exists('package.json');
        }).should.throw(/^File restriction - /);
    });

    it('existsSync() - OK', function() {        
        var exists = mod.existsSync(etc_path);
        exists.should.be.true;
    });
        
    it('existsSync() - NG', function() {
        (function() {
            mod.existsSync('package.json');
        }).should.throw(/^File restriction - /);
    });
});
