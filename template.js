
exports.description = 'Javascript Lib for Bower';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  init.process({ type: 'bower' }, [
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('homepage'),
    init.prompt('author_name'),
    init.prompt('licenses')
  ], function(err, props) {

    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    done();
  });
};
