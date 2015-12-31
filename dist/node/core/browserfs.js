/**
 * BrowserFS's main module. This is exposed in the browser via the BrowserFS global.
 */
var buffer = require('buffer');
var fs = require('./node_fs');
var path = require('path');
var emscripten_fs_1 = require('../generic/emscripten_fs');
exports.EmscriptenFS = emscripten_fs_1["default"];
var FileSystem = require('./backends');
exports.FileSystem = FileSystem;
var BFSUtils = require('./util');
if (process['initializeTTYs']) {
    process['initializeTTYs']();
}
function install(obj) {
    obj.Buffer = Buffer;
    obj.process = process;
    var oldRequire = obj.require != null ? obj.require : null;
    obj.require = function (arg) {
        var rv = BFSRequire(arg);
        if (rv == null) {
            return oldRequire.apply(null, Array.prototype.slice.call(arguments, 0));
        }
        else {
            return rv;
        }
    };
}
exports.install = install;
function registerFileSystem(name, fs) {
    FileSystem[name] = fs;
}
exports.registerFileSystem = registerFileSystem;
function BFSRequire(module) {
    switch (module) {
        case 'fs':
            return fs;
        case 'path':
            return path;
        case 'buffer':
            return buffer;
        case 'process':
            return process;
        case 'bfs_utils':
            return BFSUtils;
        default:
            return FileSystem[module];
    }
}
exports.BFSRequire = BFSRequire;
function initialize(rootfs) {
    return fs.initialize(rootfs);
}
exports.initialize = initialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlcmZzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYnJvd3NlcmZzLnRzIl0sIm5hbWVzIjpbImluc3RhbGwiLCJyZWdpc3RlckZpbGVTeXN0ZW0iLCJCRlNSZXF1aXJlIiwiaW5pdGlhbGl6ZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxJQUFPLE1BQU0sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUNsQyxJQUFPLEVBQUUsV0FBVyxXQUFXLENBQUMsQ0FBQztBQUNqQyxJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUU5Qiw4QkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQTJFNUMsb0JBQVk7QUExRXBCLElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBMEVuQixrQkFBVTtBQXpFaEMsSUFBWSxRQUFRLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7QUFDOUIsQ0FBQztBQWdCRCxpQkFBd0IsR0FBUTtJQUM5QkEsR0FBR0EsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7SUFDcEJBLEdBQUdBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBO0lBQ3RCQSxJQUFJQSxVQUFVQSxHQUFHQSxHQUFHQSxDQUFDQSxPQUFPQSxJQUFJQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUUxREEsR0FBR0EsQ0FBQ0EsT0FBT0EsR0FBR0EsVUFBU0EsR0FBV0E7UUFDaEMsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztJQUNILENBQUMsQ0FBQ0E7QUFDSkEsQ0FBQ0E7QUFiZSxlQUFPLFVBYXRCLENBQUE7QUFFRCw0QkFBbUMsSUFBWSxFQUFFLEVBQXFDO0lBQzdFQyxVQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtBQUNoQ0EsQ0FBQ0E7QUFGZSwwQkFBa0IscUJBRWpDLENBQUE7QUFRRCxvQkFBMkIsTUFBYztJQUN2Q0MsTUFBTUEsQ0FBQUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDZEEsS0FBS0EsSUFBSUE7WUFDUEEsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7UUFDWkEsS0FBS0EsTUFBTUE7WUFDVEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDZEEsS0FBS0EsUUFBUUE7WUFFWEEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDaEJBLEtBQUtBLFNBQVNBO1lBQ1pBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO1FBQ2pCQSxLQUFLQSxXQUFXQTtZQUNkQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtRQUNsQkE7WUFDRUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDOUJBLENBQUNBO0FBQ0hBLENBQUNBO0FBaEJlLGtCQUFVLGFBZ0J6QixDQUFBO0FBUUQsb0JBQTJCLE1BQThCO0lBQ3ZEQyxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtBQUMvQkEsQ0FBQ0E7QUFGZSxrQkFBVSxhQUV6QixDQUFBO0FBRWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCcm93c2VyRlMncyBtYWluIG1vZHVsZS4gVGhpcyBpcyBleHBvc2VkIGluIHRoZSBicm93c2VyIHZpYSB0aGUgQnJvd3NlckZTIGdsb2JhbC5cbiAqL1xuXG5pbXBvcnQgYnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJyk7XG5pbXBvcnQgZnMgPSByZXF1aXJlKCcuL25vZGVfZnMnKTtcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0IGZpbGVfc3lzdGVtID0gcmVxdWlyZSgnLi9maWxlX3N5c3RlbScpO1xuaW1wb3J0IEVtc2NyaXB0ZW5GUyBmcm9tICcuLi9nZW5lcmljL2Vtc2NyaXB0ZW5fZnMnO1xuaW1wb3J0ICogYXMgRmlsZVN5c3RlbSBmcm9tICcuL2JhY2tlbmRzJztcbmltcG9ydCAqIGFzIEJGU1V0aWxzIGZyb20gJy4vdXRpbCc7XG5cbmlmIChwcm9jZXNzWydpbml0aWFsaXplVFRZcyddKSB7XG4gIHByb2Nlc3NbJ2luaXRpYWxpemVUVFlzJ10oKTtcbn1cblxuLyoqXG4gKiBJbnN0YWxscyBCcm93c2VyRlMgb250byB0aGUgZ2l2ZW4gb2JqZWN0LlxuICogV2UgcmVjb21tZW5kIHRoYXQgeW91IHJ1biBpbnN0YWxsIHdpdGggdGhlICd3aW5kb3cnIG9iamVjdCB0byBtYWtlIHRoaW5nc1xuICogZ2xvYmFsLCBhcyBpbiBOb2RlLlxuICpcbiAqIFByb3BlcnRpZXMgaW5zdGFsbGVkOlxuICpcbiAqICogQnVmZmVyXG4gKiAqIHByb2Nlc3NcbiAqICogcmVxdWlyZSAod2UgbW9ua2V5LXBhdGNoIGl0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHlvdSB0byB3cml0ZSBjb2RlIGFzIGlmIHlvdSB3ZXJlIHJ1bm5pbmcgaW5zaWRlIE5vZGUuXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gVGhlIG9iamVjdCB0byBpbnN0YWxsIHRoaW5ncyBvbnRvIChlLmcuIHdpbmRvdylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGwob2JqOiBhbnkpIHtcbiAgb2JqLkJ1ZmZlciA9IEJ1ZmZlcjtcbiAgb2JqLnByb2Nlc3MgPSBwcm9jZXNzO1xuICB2YXIgb2xkUmVxdWlyZSA9IG9iai5yZXF1aXJlICE9IG51bGwgPyBvYmoucmVxdWlyZSA6IG51bGw7XG4gIC8vIE1vbmtleS1wYXRjaCByZXF1aXJlIGZvciBOb2RlLXN0eWxlIGNvZGUuXG4gIG9iai5yZXF1aXJlID0gZnVuY3Rpb24oYXJnOiBzdHJpbmcpIHtcbiAgICB2YXIgcnYgPSBCRlNSZXF1aXJlKGFyZyk7XG4gICAgaWYgKHJ2ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvbGRSZXF1aXJlLmFwcGx5KG51bGwsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBydjtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckZpbGVTeXN0ZW0obmFtZTogc3RyaW5nLCBmczogZmlsZV9zeXN0ZW0uRmlsZVN5c3RlbUNvbnN0cnVjdG9yKSB7XG4gICg8YW55PiBGaWxlU3lzdGVtKVtuYW1lXSA9IGZzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQkZTUmVxdWlyZShtb2R1bGU6ICdmcycpOiB0eXBlb2YgZnM7XG5leHBvcnQgZnVuY3Rpb24gQkZTUmVxdWlyZShtb2R1bGU6ICdwYXRoJyk6IHR5cGVvZiBwYXRoO1xuZXhwb3J0IGZ1bmN0aW9uIEJGU1JlcXVpcmUobW9kdWxlOiAnYnVmZmVyJyk6IHR5cGVvZiBidWZmZXI7XG5leHBvcnQgZnVuY3Rpb24gQkZTUmVxdWlyZShtb2R1bGU6ICdwcm9jZXNzJyk6IHR5cGVvZiBwcm9jZXNzO1xuZXhwb3J0IGZ1bmN0aW9uIEJGU1JlcXVpcmUobW9kdWxlOiAnYmZzX3V0aWxzJyk6IHR5cGVvZiBCRlNVdGlscztcbmV4cG9ydCBmdW5jdGlvbiBCRlNSZXF1aXJlKG1vZHVsZTogc3RyaW5nKTogYW55O1xuZXhwb3J0IGZ1bmN0aW9uIEJGU1JlcXVpcmUobW9kdWxlOiBzdHJpbmcpOiBhbnkge1xuICBzd2l0Y2gobW9kdWxlKSB7XG4gICAgY2FzZSAnZnMnOlxuICAgICAgcmV0dXJuIGZzO1xuICAgIGNhc2UgJ3BhdGgnOlxuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgY2FzZSAnYnVmZmVyJzpcbiAgICAgIC8vIFRoZSAnYnVmZmVyJyBtb2R1bGUgaGFzICdCdWZmZXInIGFzIGEgcHJvcGVydHkuXG4gICAgICByZXR1cm4gYnVmZmVyO1xuICAgIGNhc2UgJ3Byb2Nlc3MnOlxuICAgICAgcmV0dXJuIHByb2Nlc3M7XG4gICAgY2FzZSAnYmZzX3V0aWxzJzpcbiAgICAgIHJldHVybiBCRlNVdGlscztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEZpbGVTeXN0ZW1bbW9kdWxlXTtcbiAgfVxufVxuXG4vKipcbiAqIFlvdSBtdXN0IGNhbGwgdGhpcyBmdW5jdGlvbiB3aXRoIGEgcHJvcGVybHktaW5zdGFudGlhdGVkIHJvb3QgZmlsZSBzeXN0ZW1cbiAqIGJlZm9yZSB1c2luZyBhbnkgZmlsZSBzeXN0ZW0gQVBJIG1ldGhvZC5cbiAqIEBwYXJhbSB7QnJvd3NlckZTLkZpbGVTeXN0ZW19IHJvb3RGUyAtIFRoZSByb290IGZpbGVzeXN0ZW0gdG8gdXNlIGZvciB0aGVcbiAqICAgZW50aXJlIEJyb3dzZXJGUyBmaWxlIHN5c3RlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUocm9vdGZzOiBmaWxlX3N5c3RlbS5GaWxlU3lzdGVtKSB7XG4gIHJldHVybiBmcy5pbml0aWFsaXplKHJvb3Rmcyk7XG59XG5cbmV4cG9ydCB7RW1zY3JpcHRlbkZTLCBGaWxlU3lzdGVtfTtcbiJdfQ==