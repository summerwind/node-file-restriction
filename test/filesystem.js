var chai    = require('chai'),
    fs      = require('fs'),
    path    = require('path'),
    should  = chai.should();

var etc_path = '/etc/hosts',
    tmp_path = '/tmp/node-restriction.log';

require('../index');

describe('File System', function() {
    it('rename() - OK', function(done) {
        var renamed_path = tmp_path + '.renamed';
        
        fs.writeFileSync(tmp_path, 'log', 'utf8');
        fs.rename(tmp_path, renamed_path, function(err){
            var exists = path.existsSync(renamed_path);
            exists.should.be.true;
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
        
        var exists = path.existsSync(renamed_path);
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
        
        var exists = path.existsSync(tmp_path);
        exists.should.be.true;
        fs.unlinkSync(tmp_path);
    });
        
    it('writeFileSync() - NG', function() {
        (function() {
            fs.writeFileSync('tmp.log', 'log', 'utf8');
        }).should.throw(/^File restriction - /);
    });
});