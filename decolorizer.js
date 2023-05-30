var f;
f || (f = typeof Module !== 'undefined' ? Module : {});
var aa = Object.assign({}, f), ca = [], da = "./this.program", ea = (a, b) => {
  throw b;
}, fa = "object" == typeof window, ha = "function" == typeof importScripts, ia = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ja = !fa && !ia && !ha;
if (f.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var ka = "", la, ma, na;
if (ia) {
  if ("undefined" == typeof process || !process.release || "node" !== process.release.name) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var oa = process.versions.node, pa = oa.split(".").slice(0, 3);
  pa = 10000 * pa[0] + 100 * pa[1] + 1 * pa[2].split("-")[0];
  if (101900 > pa) {
    throw Error("This emscripten-generated code requires node v10.19.19.0 (detected v" + oa + ")");
  }
  var fs = require("fs"), qa = require("path");
  ka = ha ? qa.dirname(ka) + "/" : __dirname + "/";
  la = (a, b) => {
    a = ra(a) ? new URL(a) : qa.normalize(a);
    return fs.readFileSync(a, b ? void 0 : "utf8");
  };
  na = a => {
    a = la(a, !0);
    a.buffer || (a = new Uint8Array(a));
    assert(a.buffer);
    return a;
  };
  ma = (a, b, c, d = !0) => {
    a = ra(a) ? new URL(a) : qa.normalize(a);
    fs.readFile(a, d ? void 0 : "utf8", (e, g) => {
      e ? c(e) : b(d ? g.buffer : g);
    });
  };
  !f.thisProgram && 1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
  ca = process.argv.slice(2);
  "undefined" != typeof module && (module.exports = f);
  process.on("uncaughtException", a => {
    if (!("unwind" === a || a instanceof sa || a.context instanceof sa)) {
      throw a;
    }
  });
  if (15 > process.versions.node.split(".")[0]) {
    process.on("unhandledRejection", a => {
      throw a;
    });
  }
  ea = (a, b) => {
    process.exitCode = a;
    throw b;
  };
  f.inspect = () => "[Emscripten Module object]";
} else if (ja) {
  if ("object" == typeof process && "function" === typeof require || "object" == typeof window || "function" == typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  "undefined" != typeof read && (la = a => read(a));
  na = a => {
    if ("function" == typeof readbuffer) {
      return new Uint8Array(readbuffer(a));
    }
    a = read(a, "binary");
    assert("object" == typeof a);
    return a;
  };
  ma = (a, b) => {
    setTimeout(() => b(na(a)), 0);
  };
  "undefined" == typeof clearTimeout && (globalThis.clearTimeout = () => {
  });
  "undefined" != typeof scriptArgs ? ca = scriptArgs : "undefined" != typeof arguments && (ca = arguments);
  "function" == typeof quit && (ea = (a, b) => {
    setTimeout(() => {
      if (!(b instanceof sa)) {
        let c = b;
        b && "object" == typeof b && b.stack && (c = [b, b.stack]);
        l(`exiting due to exception: ${c}`);
      }
      quit(a);
    });
    throw b;
  });
  "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
} else if (fa || ha) {
  ha ? ka = self.location.href : "undefined" != typeof document && document.currentScript && (ka = document.currentScript.src);
  ka = 0 !== ka.indexOf("blob:") ? ka.substr(0, ka.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
  if ("object" != typeof window && "function" != typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  la = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText;
  };
  ha && (na = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  ma = (a, b, c) => {
    var d = new XMLHttpRequest();
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
      200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
    };
    d.onerror = c;
    d.send(null);
  };
} else {
  throw Error("environment detection error");
}
var ta = f.print || console.log.bind(console), l = f.printErr || console.error.bind(console);
Object.assign(f, aa);
aa = null;
Object.getOwnPropertyDescriptor(f, "fetchSettings") && p("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
f.arguments && (ca = f.arguments);
ua("arguments", "arguments_");
f.thisProgram && (da = f.thisProgram);
ua("thisProgram", "thisProgram");
f.quit && (ea = f.quit);
ua("quit", "quit_");
assert("undefined" == typeof f.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof f.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof f.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof f.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof f.read, "Module.read option was removed (modify read_ in JS)");
assert("undefined" == typeof f.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
assert("undefined" == typeof f.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
assert("undefined" == typeof f.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
assert("undefined" == typeof f.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
ua("read", "read_");
ua("readAsync", "readAsync");
ua("readBinary", "readBinary");
ua("setWindowTitle", "setWindowTitle");
assert(!ja, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");
var va;
f.wasmBinary && (va = f.wasmBinary);
ua("wasmBinary", "wasmBinary");
var noExitRuntime = f.noExitRuntime || !0;
ua("noExitRuntime", "noExitRuntime");
"object" != typeof WebAssembly && p("no native wasm support detected");
var wa, xa = !1, ya;
function assert(a, b) {
  a || p("Assertion failed" + (b ? ": " + b : ""));
}
var q, v, za, z, B, C, D, Aa;
assert(!f.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
assert("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
assert(!f.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
assert(!f.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
var Ba;
function Ca() {
  var a = Da();
  assert(0 == (a & 3));
  0 == a && (a += 4);
  C[a >> 2] = 34821223;
  C[a + 4 >> 2] = 2310721022;
  C[0] = 1668509029;
}
function Ea() {
  if (!xa) {
    var a = Da();
    0 == a && (a += 4);
    var b = C[a >> 2], c = C[a + 4 >> 2];
    34821223 == b && 2310721022 == c || p("Stack overflow! Stack cookie has been overwritten at " + Fa(a) + ", expected hex dwords 0x89BACDFE and 0x2135467, but received " + Fa(c) + " " + Fa(b));
    1668509029 !== C[0] && p("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var Ga = new Int16Array(1), Ha = new Int8Array(Ga.buffer);
Ga[0] = 25459;
if (115 !== Ha[0] || 99 !== Ha[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var Ia = [], Ja = [], Ka = [], La = [], Ma = [], Na = !1;
function Oa() {
  var a = f.preRun.shift();
  Ia.unshift(a);
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var Pa = 0, Qa = null, Ra = null, Sa = {};
function Ta(a) {
  for (var b = a;;) {
    if (!Sa[a]) {
      return a;
    }
    a = b + Math.random();
  }
}
function Ua(a) {
  Pa++;
  f.monitorRunDependencies && f.monitorRunDependencies(Pa);
  a ? (assert(!Sa[a]), Sa[a] = 1, null === Qa && "undefined" != typeof setInterval && (Qa = setInterval(() => {
    if (xa) {
      clearInterval(Qa), Qa = null;
    } else {
      var b = !1, c;
      for (c in Sa) {
        b || (b = !0, l("still waiting on run dependencies:")), l("dependency: " + c);
      }
      b && l("(end of list)");
    }
  }, 10000))) : l("warning: run dependency added without ID");
}
function Va(a) {
  Pa--;
  f.monitorRunDependencies && f.monitorRunDependencies(Pa);
  a ? (assert(Sa[a]), delete Sa[a]) : l("warning: run dependency removed without ID");
  0 == Pa && (null !== Qa && (clearInterval(Qa), Qa = null), Ra && (a = Ra, Ra = null, a()));
}
function p(a) {
  if (f.onAbort) {
    f.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  l(a);
  xa = !0;
  ya = 1;
  throw new WebAssembly.RuntimeError(a);
}
function Wa(a) {
  return a.startsWith("data:application/octet-stream;base64,");
}
function ra(a) {
  return a.startsWith("file://");
}
function F(a) {
  return function() {
    var b = f.asm;
    assert(Na, "native function `" + a + "` called before runtime initialization");
    b[a] || assert(b[a], "exported native function `" + a + "` not found");
    return b[a].apply(null, arguments);
  };
}
var Xa;
Xa = "decolorizer.wasm";
if (!Wa(Xa)) {
  var Ya = Xa;
  Xa = f.locateFile ? f.locateFile(Ya, ka) : ka + Ya;
}
function Za(a) {
  try {
    if (a == Xa && va) {
      return new Uint8Array(va);
    }
    if (na) {
      return na(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (b) {
    p(b);
  }
}
function bb(a) {
  if (!va && (fa || ha)) {
    if ("function" == typeof fetch && !ra(a)) {
      return fetch(a, {credentials:"same-origin"}).then(b => {
        if (!b.ok) {
          throw "failed to load wasm binary file at '" + a + "'";
        }
        return b.arrayBuffer();
      }).catch(() => Za(a));
    }
    if (ma) {
      return new Promise((b, c) => {
        ma(a, d => b(new Uint8Array(d)), c);
      });
    }
  }
  return Promise.resolve().then(() => Za(a));
}
function cb(a, b, c) {
  return bb(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
    l("failed to asynchronously prepare wasm: " + d);
    ra(Xa) && l("warning: Loading from a file URI (" + Xa + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
    p(d);
  });
}
function db(a, b) {
  var c = Xa;
  va || "function" != typeof WebAssembly.instantiateStreaming || Wa(c) || ra(c) || ia || "function" != typeof fetch ? cb(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    l("wasm streaming compile failed: " + e);
    l("falling back to ArrayBuffer instantiation");
    return cb(c, a, b);
  }));
}
var eb, fb;
function ua(a, b) {
  Object.getOwnPropertyDescriptor(f, a) || Object.defineProperty(f, a, {configurable:!0, get:function() {
    p("Module." + a + " has been replaced with plain " + b + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function gb(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
(function(a, b) {
  "undefined" !== typeof globalThis && Object.defineProperty(globalThis, a, {configurable:!0, get:function() {
    hb("`" + a + "` is not longer defined by emscripten. " + b);
  }});
})("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
function ib(a) {
  Object.getOwnPropertyDescriptor(f, a) || Object.defineProperty(f, a, {configurable:!0, get:function() {
    var b = "'" + a + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
    gb(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    p(b);
  }});
}
function jb() {
  var a = this.files[0], b = new FileReader();
  b.onload = function() {
    console.log(`got name: ${a.name}, type: ${a.type}, size: ${a.size}`);
    if (4000000 < a.size) {
      alert("File is too big (bigger then 4MB), please try a smaller one!");
    } else {
      var c = kb(a.size);
      v.set(new Uint8Array(b.result), c);
      lb(c, a.size);
      mb(c);
    }
  };
  b.readAsArrayBuffer(a);
}
function sa(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
function nb(a) {
  for (; 0 < a.length;) {
    a.shift()(f);
  }
}
function Fa(a) {
  assert("number" === typeof a);
  return "0x" + a.toString(16).padStart(8, "0");
}
function hb(a) {
  ob || (ob = {});
  ob[a] || (ob[a] = 1, ia && (a = "warning: " + a), l(a));
}
var ob, pb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function qb(a, b, c) {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.buffer && pb) {
    return pb.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var g = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | g);
      } else {
        var h = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | g << 6 | h : (240 != (e & 248) && hb("Invalid UTF-8 leading byte " + Fa(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | g << 12 | h << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}
function G(a, b) {
  assert("number" == typeof a);
  return a ? qb(v, a, b) : "";
}
function rb(a) {
  this.ma = a - 24;
  this.ra = function(b) {
    C[this.ma + 4 >> 2] = b;
  };
  this.M = function(b) {
    C[this.ma + 8 >> 2] = b;
  };
  this.U = function(b, c) {
    this.l();
    this.ra(b);
    this.M(c);
  };
  this.l = function() {
    C[this.ma + 16 >> 2] = 0;
  };
}
var sb = 0, tb = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, ub = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = tb(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, vb = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b && (b = b.substr(0, b.length - 1));
  return a + b;
}, wb = a => {
  if ("/" === a) {
    return "/";
  }
  a = ub(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}, xb = (a, b) => ub(a + "/" + b);
function yb() {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    return c => crypto.getRandomValues(c);
  }
  if (ia) {
    try {
      var a = require("crypto");
      if (a.randomFillSync) {
        return c => a.randomFillSync(c);
      }
      var b = a.randomBytes;
      return c => (c.set(b(c.byteLength)), c);
    } catch (c) {
    }
  }
  p("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
}
function zb(a) {
  return (zb = yb())(a);
}
function Ab() {
  for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
    b = 0 <= c ? arguments[c] : K.cwd();
    if ("string" != typeof b) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!b) {
      return "";
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0);
  }
  a = tb(a.split("/").filter(d => !!d), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
var Bb = (a, b) => {
  function c(h) {
    for (var k = 0; k < h.length && "" === h[k]; k++) {
    }
    for (var m = h.length - 1; 0 <= m && "" === h[m]; m--) {
    }
    return k > m ? [] : h.slice(k, m - k + 1);
  }
  a = Ab(a).substr(1);
  b = Ab(b).substr(1);
  a = c(a.split("/"));
  b = c(b.split("/"));
  for (var d = Math.min(a.length, b.length), e = d, g = 0; g < d; g++) {
    if (a[g] !== b[g]) {
      e = g;
      break;
    }
  }
  d = [];
  for (g = e; g < a.length; g++) {
    d.push("..");
  }
  d = d.concat(b.slice(e));
  return d.join("/");
};
function Cb(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}
function Db(a, b, c, d) {
  assert("string" === typeof a);
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var g = 0; g < a.length; ++g) {
    var h = a.charCodeAt(g);
    if (55296 <= h && 57343 >= h) {
      var k = a.charCodeAt(++g);
      h = 65536 + ((h & 1023) << 10) | k & 1023;
    }
    if (127 >= h) {
      if (c >= d) {
        break;
      }
      b[c++] = h;
    } else {
      if (2047 >= h) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | h >> 6;
      } else {
        if (65535 >= h) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | h >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          1114111 < h && hb("Invalid Unicode code point " + Fa(h) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          b[c++] = 240 | h >> 18;
          b[c++] = 128 | h >> 12 & 63;
        }
        b[c++] = 128 | h >> 6 & 63;
      }
      b[c++] = 128 | h & 63;
    }
  }
  b[c] = 0;
  return c - e;
}
function Eb(a, b) {
  var c = Array(Cb(a) + 1);
  a = Db(a, c, 0, c.length);
  b && (c.length = a);
  return c;
}
var Fb = [];
function Gb(a, b) {
  Fb[a] = {input:[], output:[], ea:b};
  K.Ra(a, Hb);
}
var Hb = {open:function(a) {
  var b = Fb[a.node.rdev];
  if (!b) {
    throw new K.g(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close:function(a) {
  a.tty.ea.fsync(a.tty);
}, fsync:function(a) {
  a.tty.ea.fsync(a.tty);
}, read:function(a, b, c, d) {
  if (!a.tty || !a.tty.ea.ib) {
    throw new K.g(60);
  }
  for (var e = 0, g = 0; g < d; g++) {
    try {
      var h = a.tty.ea.ib(a.tty);
    } catch (k) {
      throw new K.g(29);
    }
    if (void 0 === h && 0 === e) {
      throw new K.g(6);
    }
    if (null === h || void 0 === h) {
      break;
    }
    e++;
    b[c + g] = h;
  }
  e && (a.node.timestamp = Date.now());
  return e;
}, write:function(a, b, c, d) {
  if (!a.tty || !a.tty.ea.Oa) {
    throw new K.g(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.ea.Oa(a.tty, b[c + e]);
    }
  } catch (g) {
    throw new K.g(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
}}, Ib = {ib:function(a) {
  if (!a.input.length) {
    var b = null;
    if (ia) {
      var c = Buffer.alloc(256), d = 0;
      try {
        d = fs.readSync(process.stdin.fd, c, 0, 256, -1);
      } catch (e) {
        if (e.toString().includes("EOF")) {
          d = 0;
        } else {
          throw e;
        }
      }
      0 < d ? b = c.slice(0, d).toString("utf-8") : b = null;
    } else {
      "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
    }
    if (!b) {
      return null;
    }
    a.input = Eb(b, !0);
  }
  return a.input.shift();
}, Oa:function(a, b) {
  null === b || 10 === b ? (ta(qb(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync:function(a) {
  a.output && 0 < a.output.length && (ta(qb(a.output, 0)), a.output = []);
}}, Jb = {Oa:function(a, b) {
  null === b || 10 === b ? (l(qb(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync:function(a) {
  a.output && 0 < a.output.length && (l(qb(a.output, 0)), a.output = []);
}};
function Kb() {
  p("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
}
var L = {I:null, s:function() {
  return L.createNode(null, "/", 16895, 0);
}, createNode:function(a, b, c, d) {
  if (K.Xb(c) || K.isFIFO(c)) {
    throw new K.g(63);
  }
  L.I || (L.I = {dir:{node:{F:L.h.F, v:L.h.v, lookup:L.h.lookup, P:L.h.P, rename:L.h.rename, unlink:L.h.unlink, rmdir:L.h.rmdir, readdir:L.h.readdir, symlink:L.h.symlink}, stream:{G:L.j.G}}, file:{node:{F:L.h.F, v:L.h.v}, stream:{G:L.j.G, read:L.j.read, write:L.j.write, R:L.j.R, da:L.j.da, la:L.j.la}}, link:{node:{F:L.h.F, v:L.h.v, readlink:L.h.readlink}, stream:{}}, Wa:{node:{F:L.h.F, v:L.h.v}, stream:K.Hb}});
  c = K.createNode(a, b, c, d);
  K.u(c.mode) ? (c.h = L.I.dir.node, c.j = L.I.dir.stream, c.i = {}) : K.isFile(c.mode) ? (c.h = L.I.file.node, c.j = L.I.file.stream, c.o = 0, c.i = null) : K.ia(c.mode) ? (c.h = L.I.link.node, c.j = L.I.link.stream) : K.ta(c.mode) && (c.h = L.I.Wa.node, c.j = L.I.Wa.stream);
  c.timestamp = Date.now();
  a && (a.i[b] = c, a.timestamp = c.timestamp);
  return c;
}, Cc:function(a) {
  return a.i ? a.i.subarray ? a.i.subarray(0, a.o) : new Uint8Array(a.i) : new Uint8Array(0);
}, eb:function(a, b) {
  var c = a.i ? a.i.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.i, a.i = new Uint8Array(b), 0 < a.o && a.i.set(c.subarray(0, a.o), 0));
}, ic:function(a, b) {
  if (a.o != b) {
    if (0 == b) {
      a.i = null, a.o = 0;
    } else {
      var c = a.i;
      a.i = new Uint8Array(b);
      c && a.i.set(c.subarray(0, Math.min(b, a.o)));
      a.o = b;
    }
  }
}, h:{F:function(a) {
  var b = {};
  b.dev = K.ta(a.mode) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  K.u(a.mode) ? b.size = 4096 : K.isFile(a.mode) ? b.size = a.o : K.ia(a.mode) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.timestamp);
  b.mtime = new Date(a.timestamp);
  b.ctime = new Date(a.timestamp);
  b.Fb = 4096;
  b.blocks = Math.ceil(b.size / b.Fb);
  return b;
}, v:function(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  void 0 !== b.size && L.ic(a, b.size);
}, lookup:function() {
  throw K.Ga[44];
}, P:function(a, b, c, d) {
  return L.createNode(a, b, c, d);
}, rename:function(a, b, c) {
  if (K.u(a.mode)) {
    try {
      var d = K.O(b, c);
    } catch (g) {
    }
    if (d) {
      for (var e in d.i) {
        throw new K.g(55);
      }
    }
  }
  delete a.parent.i[a.name];
  a.parent.timestamp = Date.now();
  a.name = c;
  b.i[c] = a;
  b.timestamp = a.parent.timestamp;
  a.parent = b;
}, unlink:function(a, b) {
  delete a.i[b];
  a.timestamp = Date.now();
}, rmdir:function(a, b) {
  var c = K.O(a, b), d;
  for (d in c.i) {
    throw new K.g(55);
  }
  delete a.i[b];
  a.timestamp = Date.now();
}, readdir:function(a) {
  var b = [".", ".."], c;
  for (c in a.i) {
    a.i.hasOwnProperty(c) && b.push(c);
  }
  return b;
}, symlink:function(a, b, c) {
  a = L.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink:function(a) {
  if (!K.ia(a.mode)) {
    throw new K.g(28);
  }
  return a.link;
}}, j:{read:function(a, b, c, d, e) {
  var g = a.node.i;
  if (e >= a.node.o) {
    return 0;
  }
  a = Math.min(a.node.o - e, d);
  assert(0 <= a);
  if (8 < a && g.subarray) {
    b.set(g.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = g[e + d];
    }
  }
  return a;
}, write:function(a, b, c, d, e, g) {
  assert(!(b instanceof ArrayBuffer));
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.i || a.i.subarray)) {
    if (g) {
      return assert(0 === e, "canOwn must imply no weird position inside the file"), a.i = b.subarray(c, c + d), a.o = d;
    }
    if (0 === a.o && 0 === e) {
      return a.i = b.slice(c, c + d), a.o = d;
    }
    if (e + d <= a.o) {
      return a.i.set(b.subarray(c, c + d), e), d;
    }
  }
  L.eb(a, e + d);
  if (a.i.subarray && b.subarray) {
    a.i.set(b.subarray(c, c + d), e);
  } else {
    for (g = 0; g < d; g++) {
      a.i[e + g] = b[c + g];
    }
  }
  a.o = Math.max(a.o, e + d);
  return d;
}, G:function(a, b, c) {
  1 === c ? b += a.position : 2 === c && K.isFile(a.node.mode) && (b += a.node.o);
  if (0 > b) {
    throw new K.g(28);
  }
  return b;
}, R:function(a, b, c) {
  L.eb(a.node, b + c);
  a.node.o = Math.max(a.node.o, b + c);
}, da:function(a, b, c, d, e) {
  if (!K.isFile(a.node.mode)) {
    throw new K.g(43);
  }
  a = a.node.i;
  if (e & 2 || a.buffer !== q.buffer) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    b = Kb();
    if (!b) {
      throw new K.g(48);
    }
    q.set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {ma:b, A:c};
}, la:function(a, b, c, d) {
  L.j.write(a, b, 0, d, c, !1);
  return 0;
}}};
function Lb(a, b, c) {
  var d = Ta(`al ${a}`);
  ma(a, e => {
    assert(e, `Loading data file "${a}" failed (no arrayBuffer).`);
    b(new Uint8Array(e));
    d && Va(d);
  }, () => {
    if (c) {
      c();
    } else {
      throw `Loading data file "${a}" failed.`;
    }
  });
  d && Ua(d);
}
var Mb = f.preloadPlugins || [];
function Nb(a, b, c, d) {
  "undefined" != typeof Browser && Browser.U();
  var e = !1;
  Mb.forEach(function(g) {
    !e && g.canHandle(b) && (g.handle(a, b, c, d), e = !0);
  });
  return e;
}
function Ob(a, b) {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}
var Pb = {0:"Success", 1:"Arg list too long", 2:"Permission denied", 3:"Address already in use", 4:"Address not available", 5:"Address family not supported by protocol family", 6:"No more processes", 7:"Socket already connected", 8:"Bad file number", 9:"Trying to read unreadable message", 10:"Mount device busy", 11:"Operation canceled", 12:"No children", 13:"Connection aborted", 14:"Connection refused", 15:"Connection reset by peer", 16:"File locking deadlock error", 17:"Destination address required", 
18:"Math arg out of domain of func", 19:"Quota exceeded", 20:"File exists", 21:"Bad address", 22:"File too large", 23:"Host is unreachable", 24:"Identifier removed", 25:"Illegal byte sequence", 26:"Connection already in progress", 27:"Interrupted system call", 28:"Invalid argument", 29:"I/O error", 30:"Socket is already connected", 31:"Is a directory", 32:"Too many symbolic links", 33:"Too many open files", 34:"Too many links", 35:"Message too long", 36:"Multihop attempted", 37:"File or path name too long", 
38:"Network interface is not configured", 39:"Connection reset by network", 40:"Network is unreachable", 41:"Too many open files in system", 42:"No buffer space available", 43:"No such device", 44:"No such file or directory", 45:"Exec format error", 46:"No record locks available", 47:"The link has been severed", 48:"Not enough core", 49:"No message of desired type", 50:"Protocol not available", 51:"No space left on device", 52:"Function not implemented", 53:"Socket is not connected", 54:"Not a directory", 
55:"Directory not empty", 56:"State not recoverable", 57:"Socket operation on non-socket", 59:"Not a typewriter", 60:"No such device or address", 61:"Value too large for defined data type", 62:"Previous owner died", 63:"Not super-user", 64:"Broken pipe", 65:"Protocol error", 66:"Unknown protocol", 67:"Protocol wrong type for socket", 68:"Math result not representable", 69:"Read only file system", 70:"Illegal seek", 71:"No such process", 72:"Stale file handle", 73:"Connection timed out", 74:"Text file busy", 
75:"Cross-device link", 100:"Device not a stream", 101:"Bad font file fmt", 102:"Invalid slot", 103:"Invalid request code", 104:"No anode", 105:"Block device required", 106:"Channel number out of range", 107:"Level 3 halted", 108:"Level 3 reset", 109:"Link number out of range", 110:"Protocol driver not attached", 111:"No CSI structure available", 112:"Level 2 halted", 113:"Invalid exchange", 114:"Invalid request descriptor", 115:"Exchange full", 116:"No data (for no delay io)", 117:"Timer expired", 
118:"Out of streams resources", 119:"Machine is not on the network", 120:"Package not installed", 121:"The object is remote", 122:"Advertise error", 123:"Srmount error", 124:"Communication error on send", 125:"Cross mount point (not really error)", 126:"Given log. name not unique", 127:"f.d. invalid for this operation", 128:"Remote address changed", 129:"Can   access a needed shared lib", 130:"Accessing a corrupted shared lib", 131:".lib section in a.out corrupted", 132:"Attempting to link in too many libs", 
133:"Attempting to exec a shared library", 135:"Streams pipe error", 136:"Too many users", 137:"Socket type not supported", 138:"Not supported", 139:"Protocol family not supported", 140:"Can't send after socket shutdown", 141:"Too many references", 142:"Host is down", 148:"No medium (in tape drive)", 156:"Level 2 not synchronized"}, Qb = {};
function Rb(a) {
  return a.replace(/\b_Z[\w\d_]+/g, function(b) {
    hb("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling");
    return b === b ? b : b + " [" + b + "]";
  });
}
var K = {root:null, ka:[], $a:{}, streams:[], bc:1, H:null, Ya:"/", sa:!1, mb:!0, g:null, Ga:{}, Tb:null, na:0, m:(a, b = {}) => {
  a = Ab(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({Ea:!0, Qa:0}, b);
  if (8 < b.Qa) {
    throw new K.g(32);
  }
  a = a.split("/").filter(h => !!h);
  for (var c = K.root, d = "/", e = 0; e < a.length; e++) {
    var g = e === a.length - 1;
    if (g && b.parent) {
      break;
    }
    c = K.O(c, a[e]);
    d = ub(d + "/" + a[e]);
    K.W(c) && (!g || g && b.Ea) && (c = c.ja.root);
    if (!g || b.D) {
      for (g = 0; K.ia(c.mode);) {
        if (c = K.readlink(d), d = Ab(vb(d), c), c = K.m(d, {Qa:b.Qa + 1}).node, 40 < g++) {
          throw new K.g(32);
        }
      }
    }
  }
  return {path:d, node:c};
}, V:a => {
  for (var b;;) {
    if (K.ua(a)) {
      return a = a.s.pb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}, Ia:(a, b) => {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % K.H.length;
}, kb:a => {
  var b = K.Ia(a.parent.id, a.name);
  a.Y = K.H[b];
  K.H[b] = a;
}, lb:a => {
  var b = K.Ia(a.parent.id, a.name);
  if (K.H[b] === a) {
    K.H[b] = a.Y;
  } else {
    for (b = K.H[b]; b;) {
      if (b.Y === a) {
        b.Y = a.Y;
        break;
      }
      b = b.Y;
    }
  }
}, O:(a, b) => {
  var c = K.$b(a);
  if (c) {
    throw new K.g(c, a);
  }
  for (c = K.H[K.Ia(a.id, b)]; c; c = c.Y) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return K.lookup(a, b);
}, createNode:(a, b, c, d) => {
  assert("object" == typeof a);
  a = new K.Bb(a, b, c, d);
  K.kb(a);
  return a;
}, Da:a => {
  K.lb(a);
}, ua:a => a === a.parent, W:a => !!a.ja, isFile:a => 32768 === (a & 61440), u:a => 16384 === (a & 61440), ia:a => 40960 === (a & 61440), ta:a => 8192 === (a & 61440), Xb:a => 24576 === (a & 61440), isFIFO:a => 4096 === (a & 61440), isSocket:a => 49152 === (a & 49152), fb:a => {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}, Z:(a, b) => {
  if (K.mb) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}, $b:a => {
  var b = K.Z(a, "x");
  return b ? b : a.h.lookup ? 0 : 2;
}, Na:(a, b) => {
  try {
    return K.O(a, b), 20;
  } catch (c) {
  }
  return K.Z(a, "wx");
}, ya:(a, b, c) => {
  try {
    var d = K.O(a, b);
  } catch (e) {
    return e.C;
  }
  if (a = K.Z(a, "wx")) {
    return a;
  }
  if (c) {
    if (!K.u(d.mode)) {
      return 54;
    }
    if (K.ua(d) || K.V(d) === K.cwd()) {
      return 10;
    }
  } else {
    if (K.u(d.mode)) {
      return 31;
    }
  }
  return 0;
}, ac:(a, b) => a ? K.ia(a.mode) ? 32 : K.u(a.mode) && ("r" !== K.fb(b) || b & 512) ? 31 : K.Z(a, K.fb(b)) : 44, Cb:4096, cc:(a = 0, b = K.Cb) => {
  for (; a <= b; a++) {
    if (!K.streams[a]) {
      return a;
    }
  }
  throw new K.g(33);
}, ga:a => K.streams[a], Xa:(a, b, c) => {
  K.pa || (K.pa = function() {
    this.l = {};
  }, K.pa.prototype = {}, Object.defineProperties(K.pa.prototype, {object:{get:function() {
    return this.node;
  }, set:function(d) {
    this.node = d;
  }}, flags:{get:function() {
    return this.l.flags;
  }, set:function(d) {
    this.l.flags = d;
  },}, position:{get:function() {
    return this.l.position;
  }, set:function(d) {
    this.l.position = d;
  },},}));
  a = Object.assign(new K.pa(), a);
  b = K.cc(b, c);
  a.fd = b;
  return K.streams[b] = a;
}, Ib:a => {
  K.streams[a] = null;
}, Hb:{open:a => {
  a.j = K.Ub(a.node.rdev).j;
  a.j.open && a.j.open(a);
}, G:() => {
  throw new K.g(70);
}}, Ma:a => a >> 8, Hc:a => a & 255, X:(a, b) => a << 8 | b, Ra:(a, b) => {
  K.$a[a] = {j:b};
}, Ub:a => K.$a[a], hb:a => {
  var b = [];
  for (a = [a]; a.length;) {
    var c = a.pop();
    b.push(c);
    a.push.apply(a, c.ka);
  }
  return b;
}, yb:(a, b) => {
  function c(h) {
    assert(0 < K.na);
    K.na--;
    return b(h);
  }
  function d(h) {
    if (h) {
      if (!d.Qb) {
        return d.Qb = !0, c(h);
      }
    } else {
      ++g >= e.length && c(null);
    }
  }
  "function" == typeof a && (b = a, a = !1);
  K.na++;
  1 < K.na && l(`warning: ${K.na} FS.syncfs operations in flight at once, probably just doing extra work`);
  var e = K.hb(K.root.s), g = 0;
  e.forEach(h => {
    if (!h.type.yb) {
      return d(null);
    }
    h.type.yb(h, a, d);
  });
}, s:(a, b, c) => {
  if ("string" == typeof a) {
    throw a;
  }
  var d = "/" === c, e = !c;
  if (d && K.root) {
    throw new K.g(10);
  }
  if (!d && !e) {
    var g = K.m(c, {Ea:!1});
    c = g.path;
    g = g.node;
    if (K.W(g)) {
      throw new K.g(10);
    }
    if (!K.u(g.mode)) {
      throw new K.g(54);
    }
  }
  b = {type:a, Nc:b, pb:c, ka:[]};
  a = a.s(b);
  a.s = b;
  b.root = a;
  d ? K.root = a : g && (g.ja = b, g.s && g.s.ka.push(b));
  return a;
}, Vc:a => {
  a = K.m(a, {Ea:!1});
  if (!K.W(a.node)) {
    throw new K.g(28);
  }
  a = a.node;
  var b = a.ja, c = K.hb(b);
  Object.keys(K.H).forEach(d => {
    for (d = K.H[d]; d;) {
      var e = d.Y;
      c.includes(d.s) && K.Da(d);
      d = e;
    }
  });
  a.ja = null;
  b = a.s.ka.indexOf(b);
  assert(-1 !== b);
  a.s.ka.splice(b, 1);
}, lookup:(a, b) => a.h.lookup(a, b), P:(a, b, c) => {
  var d = K.m(a, {parent:!0}).node;
  a = wb(a);
  if (!a || "." === a || ".." === a) {
    throw new K.g(28);
  }
  var e = K.Na(d, a);
  if (e) {
    throw new K.g(e);
  }
  if (!d.h.P) {
    throw new K.g(63);
  }
  return d.h.P(d, a, b, c);
}, create:(a, b) => K.P(a, (void 0 !== b ? b : 438) & 4095 | 32768, 0), mkdir:(a, b) => K.P(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0), Jc:(a, b) => {
  a = a.split("/");
  for (var c = "", d = 0; d < a.length; ++d) {
    if (a[d]) {
      c += "/" + a[d];
      try {
        K.mkdir(c, b);
      } catch (e) {
        if (20 != e.C) {
          throw e;
        }
      }
    }
  }
}, za:(a, b, c) => {
  "undefined" == typeof c && (c = b, b = 438);
  return K.P(a, b | 8192, c);
}, symlink:(a, b) => {
  if (!Ab(a)) {
    throw new K.g(44);
  }
  var c = K.m(b, {parent:!0}).node;
  if (!c) {
    throw new K.g(44);
  }
  b = wb(b);
  var d = K.Na(c, b);
  if (d) {
    throw new K.g(d);
  }
  if (!c.h.symlink) {
    throw new K.g(63);
  }
  return c.h.symlink(c, b, a);
}, rename:(a, b) => {
  var c = vb(a), d = vb(b), e = wb(a), g = wb(b);
  var h = K.m(a, {parent:!0});
  var k = h.node;
  h = K.m(b, {parent:!0});
  h = h.node;
  if (!k || !h) {
    throw new K.g(44);
  }
  if (k.s !== h.s) {
    throw new K.g(75);
  }
  var m = K.O(k, e);
  a = Bb(a, d);
  if ("." !== a.charAt(0)) {
    throw new K.g(28);
  }
  a = Bb(b, c);
  if ("." !== a.charAt(0)) {
    throw new K.g(55);
  }
  try {
    var r = K.O(h, g);
  } catch (t) {
  }
  if (m !== r) {
    b = K.u(m.mode);
    if (e = K.ya(k, e, b)) {
      throw new K.g(e);
    }
    if (e = r ? K.ya(h, g, b) : K.Na(h, g)) {
      throw new K.g(e);
    }
    if (!k.h.rename) {
      throw new K.g(63);
    }
    if (K.W(m) || r && K.W(r)) {
      throw new K.g(10);
    }
    if (h !== k && (e = K.Z(k, "w"))) {
      throw new K.g(e);
    }
    K.lb(m);
    try {
      k.h.rename(m, h, g);
    } catch (t) {
      throw t;
    } finally {
      K.kb(m);
    }
  }
}, rmdir:a => {
  var b = K.m(a, {parent:!0}).node;
  a = wb(a);
  var c = K.O(b, a), d = K.ya(b, a, !0);
  if (d) {
    throw new K.g(d);
  }
  if (!b.h.rmdir) {
    throw new K.g(63);
  }
  if (K.W(c)) {
    throw new K.g(10);
  }
  b.h.rmdir(b, a);
  K.Da(c);
}, readdir:a => {
  a = K.m(a, {D:!0}).node;
  if (!a.h.readdir) {
    throw new K.g(54);
  }
  return a.h.readdir(a);
}, unlink:a => {
  var b = K.m(a, {parent:!0}).node;
  if (!b) {
    throw new K.g(44);
  }
  a = wb(a);
  var c = K.O(b, a), d = K.ya(b, a, !1);
  if (d) {
    throw new K.g(d);
  }
  if (!b.h.unlink) {
    throw new K.g(63);
  }
  if (K.W(c)) {
    throw new K.g(10);
  }
  b.h.unlink(b, a);
  K.Da(c);
}, readlink:a => {
  a = K.m(a).node;
  if (!a) {
    throw new K.g(44);
  }
  if (!a.h.readlink) {
    throw new K.g(28);
  }
  return Ab(K.V(a.parent), a.h.readlink(a));
}, stat:(a, b) => {
  a = K.m(a, {D:!b}).node;
  if (!a) {
    throw new K.g(44);
  }
  if (!a.h.F) {
    throw new K.g(63);
  }
  return a.h.F(a);
}, lstat:a => K.stat(a, !0), chmod:(a, b, c) => {
  a = "string" == typeof a ? K.m(a, {D:!c}).node : a;
  if (!a.h.v) {
    throw new K.g(63);
  }
  a.h.v(a, {mode:b & 4095 | a.mode & -4096, timestamp:Date.now()});
}, lchmod:(a, b) => {
  K.chmod(a, b, !0);
}, fchmod:(a, b) => {
  a = K.ga(a);
  if (!a) {
    throw new K.g(8);
  }
  K.chmod(a.node, b);
}, chown:(a, b, c, d) => {
  a = "string" == typeof a ? K.m(a, {D:!d}).node : a;
  if (!a.h.v) {
    throw new K.g(63);
  }
  a.h.v(a, {timestamp:Date.now()});
}, lchown:(a, b, c) => {
  K.chown(a, b, c, !0);
}, fchown:(a, b, c) => {
  a = K.ga(a);
  if (!a) {
    throw new K.g(8);
  }
  K.chown(a.node, b, c);
}, truncate:(a, b) => {
  if (0 > b) {
    throw new K.g(28);
  }
  a = "string" == typeof a ? K.m(a, {D:!0}).node : a;
  if (!a.h.v) {
    throw new K.g(63);
  }
  if (K.u(a.mode)) {
    throw new K.g(31);
  }
  if (!K.isFile(a.mode)) {
    throw new K.g(28);
  }
  var c = K.Z(a, "w");
  if (c) {
    throw new K.g(c);
  }
  a.h.v(a, {size:b, timestamp:Date.now()});
}, Bc:(a, b) => {
  a = K.ga(a);
  if (!a) {
    throw new K.g(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new K.g(28);
  }
  K.truncate(a.node, b);
}, Wc:(a, b, c) => {
  a = K.m(a, {D:!0}).node;
  a.h.v(a, {timestamp:Math.max(b, c)});
}, open:(a, b, c) => {
  if ("" === a) {
    throw new K.g(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090,}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var e = a;
  } else {
    a = ub(a);
    try {
      e = K.m(a, {D:!(b & 131072)}).node;
    } catch (g) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new K.g(20);
      }
    } else {
      e = K.P(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new K.g(44);
  }
  K.ta(e.mode) && (b &= -513);
  if (b & 65536 && !K.u(e.mode)) {
    throw new K.g(54);
  }
  if (!d && (c = K.ac(e, b))) {
    throw new K.g(c);
  }
  b & 512 && !d && K.truncate(e, 0);
  b &= -131713;
  e = K.Xa({node:e, path:K.V(e), flags:b, seekable:!0, position:0, j:e.j, pc:[], error:!1});
  e.j.open && e.j.open(e);
  !f.logReadFiles || b & 1 || (K.Pa || (K.Pa = {}), a in K.Pa || (K.Pa[a] = 1));
  return e;
}, close:a => {
  if (K.ha(a)) {
    throw new K.g(8);
  }
  a.Ha && (a.Ha = null);
  try {
    a.j.close && a.j.close(a);
  } catch (b) {
    throw b;
  } finally {
    K.Ib(a.fd);
  }
  a.fd = null;
}, ha:a => null === a.fd, G:(a, b, c) => {
  if (K.ha(a)) {
    throw new K.g(8);
  }
  if (!a.seekable || !a.j.G) {
    throw new K.g(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new K.g(28);
  }
  a.position = a.j.G(a, b, c);
  a.pc = [];
  return a.position;
}, read:(a, b, c, d, e) => {
  if (0 > d || 0 > e) {
    throw new K.g(28);
  }
  if (K.ha(a)) {
    throw new K.g(8);
  }
  if (1 === (a.flags & 2097155)) {
    throw new K.g(8);
  }
  if (K.u(a.node.mode)) {
    throw new K.g(31);
  }
  if (!a.j.read) {
    throw new K.g(28);
  }
  var g = "undefined" != typeof e;
  if (!g) {
    e = a.position;
  } else if (!a.seekable) {
    throw new K.g(70);
  }
  b = a.j.read(a, b, c, d, e);
  g || (a.position += b);
  return b;
}, write:(a, b, c, d, e, g) => {
  if (0 > d || 0 > e) {
    throw new K.g(28);
  }
  if (K.ha(a)) {
    throw new K.g(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new K.g(8);
  }
  if (K.u(a.node.mode)) {
    throw new K.g(31);
  }
  if (!a.j.write) {
    throw new K.g(28);
  }
  a.seekable && a.flags & 1024 && K.G(a, 0, 2);
  var h = "undefined" != typeof e;
  if (!h) {
    e = a.position;
  } else if (!a.seekable) {
    throw new K.g(70);
  }
  b = a.j.write(a, b, c, d, e, g);
  h || (a.position += b);
  return b;
}, R:(a, b, c) => {
  if (K.ha(a)) {
    throw new K.g(8);
  }
  if (0 > b || 0 >= c) {
    throw new K.g(28);
  }
  if (0 === (a.flags & 2097155)) {
    throw new K.g(8);
  }
  if (!K.isFile(a.node.mode) && !K.u(a.node.mode)) {
    throw new K.g(43);
  }
  if (!a.j.R) {
    throw new K.g(138);
  }
  a.j.R(a, b, c);
}, da:(a, b, c, d, e) => {
  if (0 !== (d & 2) && 0 === (e & 2) && 2 !== (a.flags & 2097155)) {
    throw new K.g(2);
  }
  if (1 === (a.flags & 2097155)) {
    throw new K.g(2);
  }
  if (!a.j.da) {
    throw new K.g(43);
  }
  return a.j.da(a, b, c, d, e);
}, la:(a, b, c, d, e) => a.j.la ? a.j.la(a, b, c, d, e) : 0, Mc:() => 0, Ja:(a, b, c) => {
  if (!a.j.Ja) {
    throw new K.g(59);
  }
  return a.j.Ja(a, b, c);
}, readFile:(a, b = {}) => {
  b.flags = b.flags || 0;
  b.encoding = b.encoding || "binary";
  if ("utf8" !== b.encoding && "binary" !== b.encoding) {
    throw Error(`Invalid encoding type "${b.encoding}"`);
  }
  var c, d = K.open(a, b.flags);
  a = K.stat(a).size;
  var e = new Uint8Array(a);
  K.read(d, e, 0, a, 0);
  "utf8" === b.encoding ? c = qb(e, 0) : "binary" === b.encoding && (c = e);
  K.close(d);
  return c;
}, writeFile:(a, b, c = {}) => {
  c.flags = c.flags || 577;
  a = K.open(a, c.flags, c.mode);
  if ("string" == typeof b) {
    var d = new Uint8Array(Cb(b) + 1);
    b = Db(b, d, 0, d.length);
    K.write(a, d, 0, b, void 0, c.Gb);
  } else if (ArrayBuffer.isView(b)) {
    K.write(a, b, 0, b.byteLength, void 0, c.Gb);
  } else {
    throw Error("Unsupported data type");
  }
  K.close(a);
}, cwd:() => K.Ya, chdir:a => {
  a = K.m(a, {D:!0});
  if (null === a.node) {
    throw new K.g(44);
  }
  if (!K.u(a.node.mode)) {
    throw new K.g(54);
  }
  var b = K.Z(a.node, "x");
  if (b) {
    throw new K.g(b);
  }
  K.Ya = a.path;
}, Lb:() => {
  K.mkdir("/tmp");
  K.mkdir("/home");
  K.mkdir("/home/web_user");
}, Kb:() => {
  K.mkdir("/dev");
  K.Ra(K.X(1, 3), {read:() => 0, write:(d, e, g, h) => h,});
  K.za("/dev/null", K.X(1, 3));
  Gb(K.X(5, 0), Ib);
  Gb(K.X(6, 0), Jb);
  K.za("/dev/tty", K.X(5, 0));
  K.za("/dev/tty1", K.X(6, 0));
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (b = zb(a).byteLength);
    return a[--b];
  };
  K.S("/dev", "random", c);
  K.S("/dev", "urandom", c);
  K.mkdir("/dev/shm");
  K.mkdir("/dev/shm/tmp");
}, Nb:() => {
  K.mkdir("/proc");
  var a = K.mkdir("/proc/self");
  K.mkdir("/proc/self/fd");
  K.s({s:() => {
    var b = K.createNode(a, "fd", 16895, 73);
    b.h = {lookup:(c, d) => {
      var e = K.ga(+d);
      if (!e) {
        throw new K.g(8);
      }
      c = {parent:null, s:{pb:"fake"}, h:{readlink:() => e.path},};
      return c.parent = c;
    }};
    return b;
  }}, {}, "/proc/self/fd");
}, Ob:() => {
  f.stdin ? K.S("/dev", "stdin", f.stdin) : K.symlink("/dev/tty", "/dev/stdin");
  f.stdout ? K.S("/dev", "stdout", null, f.stdout) : K.symlink("/dev/tty", "/dev/stdout");
  f.stderr ? K.S("/dev", "stderr", null, f.stderr) : K.symlink("/dev/tty1", "/dev/stderr");
  var a = K.open("/dev/stdin", 0), b = K.open("/dev/stdout", 1), c = K.open("/dev/stderr", 1);
  assert(0 === a.fd, `invalid handle for stdin (${a.fd})`);
  assert(1 === b.fd, `invalid handle for stdout (${b.fd})`);
  assert(2 === c.fd, `invalid handle for stderr (${c.fd})`);
}, cb:() => {
  K.g || (K.g = function(a, b) {
    this.name = "ErrnoError";
    this.node = b;
    this.jc = function(c) {
      this.C = c;
      for (var d in Qb) {
        if (Qb[d] === c) {
          this.code = d;
          break;
        }
      }
    };
    this.jc(a);
    this.message = Pb[a];
    this.stack && (Object.defineProperty(this, "stack", {value:Error().stack, writable:!0}), this.stack = Rb(this.stack));
  }, K.g.prototype = Error(), K.g.prototype.constructor = K.g, [44].forEach(a => {
    K.Ga[a] = new K.g(a);
    K.Ga[a].stack = "<generic error, no stack>";
  }));
}, kc:() => {
  K.cb();
  K.H = Array(4096);
  K.s(L, {}, "/");
  K.Lb();
  K.Kb();
  K.Nb();
  K.Tb = {MEMFS:L,};
}, U:(a, b, c) => {
  assert(!K.U.sa, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  K.U.sa = !0;
  K.cb();
  f.stdin = a || f.stdin;
  f.stdout = b || f.stdout;
  f.stderr = c || f.stderr;
  K.Ob();
}, Pc:() => {
  K.U.sa = !1;
  Sb(0);
  for (var a = 0; a < K.streams.length; a++) {
    var b = K.streams[a];
    b && K.close(b);
  }
}, Ac:(a, b) => {
  a = K.Ua(a, b);
  return a.exists ? a.object : null;
}, Ua:(a, b) => {
  try {
    var c = K.m(a, {D:!b});
    a = c.path;
  } catch (e) {
  }
  var d = {ua:!1, exists:!1, error:0, name:null, path:null, object:null, dc:!1, fc:null, ec:null};
  try {
    c = K.m(a, {parent:!0}), d.dc = !0, d.fc = c.path, d.ec = c.node, d.name = wb(a), c = K.m(a, {D:!b}), d.exists = !0, d.path = c.path, d.object = c.node, d.name = c.node.name, d.ua = "/" === c.path;
  } catch (e) {
    d.error = e.C;
  }
  return d;
}, wc:(a, b) => {
  a = "string" == typeof a ? a : K.V(a);
  for (b = b.split("/").reverse(); b.length;) {
    var c = b.pop();
    if (c) {
      var d = ub(a + "/" + c);
      try {
        K.mkdir(d);
      } catch (e) {
      }
      a = d;
    }
  }
  return d;
}, Mb:(a, b, c, d, e) => {
  a = "string" == typeof a ? a : K.V(a);
  b = ub(a + "/" + b);
  return K.create(b, Ob(d, e));
}, Jb:(a, b, c, d, e, g) => {
  var h = b;
  a && (a = "string" == typeof a ? a : K.V(a), h = b ? ub(a + "/" + b) : a);
  a = Ob(d, e);
  h = K.create(h, a);
  if (c) {
    if ("string" == typeof c) {
      b = Array(c.length);
      d = 0;
      for (e = c.length; d < e; ++d) {
        b[d] = c.charCodeAt(d);
      }
      c = b;
    }
    K.chmod(h, a | 146);
    b = K.open(h, 577);
    K.write(b, c, 0, c.length, 0, g);
    K.close(b);
    K.chmod(h, a);
  }
  return h;
}, S:(a, b, c, d) => {
  a = xb("string" == typeof a ? a : K.V(a), b);
  b = Ob(!!c, !!d);
  K.S.Ma || (K.S.Ma = 64);
  var e = K.X(K.S.Ma++, 0);
  K.Ra(e, {open:g => {
    g.seekable = !1;
  }, close:() => {
    d && d.buffer && d.buffer.length && d(10);
  }, read:(g, h, k, m) => {
    for (var r = 0, t = 0; t < m; t++) {
      try {
        var u = c();
      } catch (A) {
        throw new K.g(29);
      }
      if (void 0 === u && 0 === r) {
        throw new K.g(6);
      }
      if (null === u || void 0 === u) {
        break;
      }
      r++;
      h[k + t] = u;
    }
    r && (g.node.timestamp = Date.now());
    return r;
  }, write:(g, h, k, m) => {
    for (var r = 0; r < m; r++) {
      try {
        d(h[k + r]);
      } catch (t) {
        throw new K.g(29);
      }
    }
    m && (g.node.timestamp = Date.now());
    return r;
  }});
  return K.za(a, b, e);
}, Fa:a => {
  if (a.Ka || a.Yb || a.link || a.i) {
    return !0;
  }
  if ("undefined" != typeof XMLHttpRequest) {
    throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  }
  if (la) {
    try {
      a.i = Eb(la(a.url), !0), a.o = a.i.length;
    } catch (b) {
      throw new K.g(29);
    }
  } else {
    throw Error("Cannot load without read() or XMLHttpRequest.");
  }
}, uc:(a, b, c, d, e) => {
  function g() {
    this.La = !1;
    this.l = [];
  }
  function h(t, u, A, n, w) {
    t = t.node.i;
    if (w >= t.length) {
      return 0;
    }
    n = Math.min(t.length - w, n);
    assert(0 <= n);
    if (t.slice) {
      for (var y = 0; y < n; y++) {
        u[A + y] = t[w + y];
      }
    } else {
      for (y = 0; y < n; y++) {
        u[A + y] = t.get(w + y);
      }
    }
    return n;
  }
  g.prototype.get = function(t) {
    if (!(t > this.length - 1 || 0 > t)) {
      var u = t % this.chunkSize;
      return this.jb(t / this.chunkSize | 0)[u];
    }
  };
  g.prototype.M = function(t) {
    this.jb = t;
  };
  g.prototype.Va = function() {
    var t = new XMLHttpRequest();
    t.open("HEAD", c, !1);
    t.send(null);
    if (!(200 <= t.status && 300 > t.status || 304 === t.status)) {
      throw Error("Couldn't load " + c + ". Status: " + t.status);
    }
    var u = Number(t.getResponseHeader("Content-length")), A, n = (A = t.getResponseHeader("Accept-Ranges")) && "bytes" === A;
    t = (A = t.getResponseHeader("Content-Encoding")) && "gzip" === A;
    var w = 1048576;
    n || (w = u);
    var y = this;
    y.M(J => {
      var Q = J * w, S = (J + 1) * w - 1;
      S = Math.min(S, u - 1);
      if ("undefined" == typeof y.l[J]) {
        var x = y.l;
        if (Q > S) {
          throw Error("invalid range (" + Q + ", " + S + ") or no bytes requested!");
        }
        if (S > u - 1) {
          throw Error("only " + u + " bytes available! programmer error!");
        }
        var H = new XMLHttpRequest();
        H.open("GET", c, !1);
        u !== w && H.setRequestHeader("Range", "bytes=" + Q + "-" + S);
        H.responseType = "arraybuffer";
        H.overrideMimeType && H.overrideMimeType("text/plain; charset=x-user-defined");
        H.send(null);
        if (!(200 <= H.status && 300 > H.status || 304 === H.status)) {
          throw Error("Couldn't load " + c + ". Status: " + H.status);
        }
        Q = void 0 !== H.response ? new Uint8Array(H.response || []) : Eb(H.responseText || "", !0);
        x[J] = Q;
      }
      if ("undefined" == typeof y.l[J]) {
        throw Error("doXHR failed!");
      }
      return y.l[J];
    });
    if (t || !u) {
      w = u = 1, w = u = this.jb(0).length, ta("LazyFiles on gzip forces download of the whole file when length is accessed");
    }
    this.Eb = u;
    this.Db = w;
    this.La = !0;
  };
  if ("undefined" != typeof XMLHttpRequest) {
    if (!ha) {
      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
    }
    var k = new g();
    Object.defineProperties(k, {length:{get:function() {
      this.La || this.Va();
      return this.Eb;
    }}, chunkSize:{get:function() {
      this.La || this.Va();
      return this.Db;
    }}});
    k = {Ka:!1, i:k};
  } else {
    k = {Ka:!1, url:c};
  }
  var m = K.Mb(a, b, k, d, e);
  k.i ? m.i = k.i : k.url && (m.i = null, m.url = k.url);
  Object.defineProperties(m, {o:{get:function() {
    return this.i.length;
  }}});
  var r = {};
  Object.keys(m.j).forEach(t => {
    var u = m.j[t];
    r[t] = function() {
      K.Fa(m);
      return u.apply(null, arguments);
    };
  });
  r.read = (t, u, A, n, w) => {
    K.Fa(m);
    return h(t, u, A, n, w);
  };
  r.da = (t, u, A) => {
    K.Fa(m);
    var n = Kb();
    if (!n) {
      throw new K.g(48);
    }
    h(t, q, n, u, A);
    return {ma:n, A:!0};
  };
  m.j = r;
  return m;
}, rc:() => {
  p("FS.absolutePath has been removed; use PATH_FS.resolve instead");
}, tc:() => {
  p("FS.createFolder has been removed; use FS.mkdir instead");
}, vc:() => {
  p("FS.createLink has been removed; use FS.symlink instead");
}, Fc:() => {
  p("FS.joinPath has been removed; use PATH.join instead");
}, Kc:() => {
  p("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
}, Sc:() => {
  p("FS.standardizePath has been removed; use PATH.normalize instead");
}}, Tb = void 0;
function Ub() {
  assert(void 0 != Tb);
  Tb += 4;
  return B[Tb - 4 >> 2];
}
function Vb(a) {
  a = K.ga(a);
  if (!a) {
    throw new K.g(8);
  }
  return a;
}
function Wb(a) {
  switch(a) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 4:
      return 2;
    case 8:
      return 3;
    default:
      throw new TypeError(`Unknown type size: ${a}`);
  }
}
var Xb = void 0;
function Yb(a) {
  for (var b = ""; v[a];) {
    b += Xb[v[a++]];
  }
  return b;
}
var Zb = {}, $b = {}, ac = {};
function bc(a) {
  if (void 0 === a) {
    return "_unknown";
  }
  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
  var b = a.charCodeAt(0);
  return 48 <= b && 57 >= b ? `_${a}` : a;
}
function cc(a, b) {
  a = bc(a);
  return {[a]:function() {
    return b.apply(this, arguments);
  }}[a];
}
function dc(a) {
  var b = Error, c = cc(a, function(d) {
    this.name = a;
    this.message = d;
    d = Error(d).stack;
    void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
  });
  c.prototype = Object.create(b.prototype);
  c.prototype.constructor = c;
  c.prototype.toString = function() {
    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
  };
  return c;
}
var ec = void 0;
function fc(a) {
  throw new ec(a);
}
function gc(a, b, c = {}) {
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  var d = b.name;
  a || fc(`type "${d}" must have a positive integer typeid pointer`);
  if ($b.hasOwnProperty(a)) {
    if (c.Vb) {
      return;
    }
    fc(`Cannot register type '${d}' twice`);
  }
  $b[a] = b;
  delete ac[a];
  Zb.hasOwnProperty(a) && (b = Zb[a], delete Zb[a], b.forEach(e => e()));
}
function hc() {
  this.A = [void 0];
  this.l = [];
  this.get = function(a) {
    assert(void 0 !== this.A[a], `invalid handle: ${a}`);
    return this.A[a];
  };
  this.has = function(a) {
    return void 0 !== this.A[a];
  };
  this.R = function(a) {
    var b = this.l.pop() || this.A.length;
    this.A[b] = a;
    return b;
  };
  this.gb = function(a) {
    assert(void 0 !== this.A[a]);
    this.A[a] = void 0;
    this.l.push(a);
  };
}
var M = new hc();
function ic(a) {
  a >= M.M && 0 === --M.get(a).hc && M.gb(a);
}
var jc = a => {
  a || fc("Cannot use deleted val. handle = " + a);
  return M.get(a).value;
}, kc = a => {
  switch(a) {
    case void 0:
      return 1;
    case null:
      return 2;
    case !0:
      return 3;
    case !1:
      return 4;
    default:
      return M.R({hc:1, value:a});
  }
};
function lc(a) {
  return this.fromWireType(B[a >> 2]);
}
function mc(a) {
  if (null === a) {
    return "null";
  }
  var b = typeof a;
  return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
}
function nc(a, b) {
  switch(b) {
    case 2:
      return function(c) {
        return this.fromWireType(D[c >> 2]);
      };
    case 3:
      return function(c) {
        return this.fromWireType(Aa[c >> 3]);
      };
    default:
      throw new TypeError("Unknown float type: " + a);
  }
}
function oc(a, b, c) {
  switch(b) {
    case 0:
      return c ? function(d) {
        return q[d];
      } : function(d) {
        return v[d];
      };
    case 1:
      return c ? function(d) {
        return za[d >> 1];
      } : function(d) {
        return z[d >> 1];
      };
    case 2:
      return c ? function(d) {
        return B[d >> 2];
      } : function(d) {
        return C[d >> 2];
      };
    default:
      throw new TypeError("Unknown integer type: " + a);
  }
}
function N(a, b, c) {
  assert("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return Db(a, v, b, c);
}
var pc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
function qc(a, b) {
  assert(0 == a % 2, "Pointer passed to UTF16ToString must be aligned to two bytes!");
  var c = a >> 1;
  for (var d = c + b / 2; !(c >= d) && z[c];) {
    ++c;
  }
  c <<= 1;
  if (32 < c - a && pc) {
    return pc.decode(v.subarray(a, c));
  }
  c = "";
  for (d = 0; !(d >= b / 2); ++d) {
    var e = za[a + 2 * d >> 1];
    if (0 == e) {
      break;
    }
    c += String.fromCharCode(e);
  }
  return c;
}
function rc(a, b, c) {
  assert(0 == b % 2, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
  assert("number" == typeof c, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  void 0 === c && (c = 2147483647);
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    za[b >> 1] = a.charCodeAt(e), b += 2;
  }
  za[b >> 1] = 0;
  return b - d;
}
function sc(a) {
  return 2 * a.length;
}
function tc(a, b) {
  assert(0 == a % 4, "Pointer passed to UTF32ToString must be aligned to four bytes!");
  for (var c = 0, d = ""; !(c >= b / 4);) {
    var e = B[a + 4 * c >> 2];
    if (0 == e) {
      break;
    }
    ++c;
    65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
  }
  return d;
}
function uc(a, b, c) {
  assert(0 == b % 4, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
  assert("number" == typeof c, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  void 0 === c && (c = 2147483647);
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var g = a.charCodeAt(e);
    if (55296 <= g && 57343 >= g) {
      var h = a.charCodeAt(++e);
      g = 65536 + ((g & 1023) << 10) | h & 1023;
    }
    B[b >> 2] = g;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  B[b >> 2] = 0;
  return b - d;
}
function vc(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && ++c;
    b += 4;
  }
  return b;
}
var wc = {};
function xc(a) {
  var b = wc[a];
  return void 0 === b ? Yb(a) : b;
}
var yc = [];
function zc() {
  return "object" == typeof globalThis ? globalThis : Function("return this")();
}
function Ac(a) {
  var b = yc.length;
  yc.push(a);
  return b;
}
function Bc(a, b) {
  for (var c = Array(a), d = 0; d < a; ++d) {
    var e = d, g = C[b + 4 * d >> 2], h = $b[g];
    if (void 0 === h) {
      var k = "parameter " + d + " has unknown type ";
      g = Cc(g);
      var m = Yb(g);
      Dc(g);
      fc(k + m);
    }
    c[e] = h;
  }
  return c;
}
var Ec = [];
function Fc(a) {
  var b = Function;
  if (!(b instanceof Function)) {
    throw new TypeError(`new_ called with constructor type ${typeof b} which is not a function`);
  }
  var c = cc(b.name || "unknownFunctionName", function() {
  });
  c.prototype = b.prototype;
  c = new c();
  a = b.apply(c, a);
  return a instanceof Object ? a : c;
}
function Gc(a) {
  return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
}
var Hc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Ic = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function Jc(a) {
  var b = Cb(a) + 1, c = O(b);
  c && N(a, c, b);
  return c;
}
function Kc(a) {
  var b = Lc();
  a();
  Mc(b);
}
var Nc = 0;
function Oc() {
  for (var a = Pc.length - 1; 0 <= a; --a) {
    Qc(a);
  }
  Pc = [];
  Rc = [];
}
var Rc = [];
function Sc() {
  if (Nc && Tc.qa) {
    for (var a = 0; a < Rc.length; ++a) {
      var b = Rc[a];
      Rc.splice(a, 1);
      --a;
      b.Tc.apply(null, b.sc);
    }
  }
}
var Pc = [];
function Qc(a) {
  var b = Pc[a];
  b.target.removeEventListener(b.B, b.Rb, b.K);
  Pc.splice(a, 1);
}
function Uc(a) {
  function b(d) {
    ++Nc;
    Tc = a;
    Sc();
    a.N(d);
    Sc();
    --Nc;
  }
  if (!a.target) {
    return l("registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:"), console.dir(a), -4;
  }
  if (a.L) {
    a.Rb = b, a.target.addEventListener(a.B, b, a.K), Pc.push(a), Vc || (La.push(Oc), Vc = !0);
  } else {
    for (var c = 0; c < Pc.length; ++c) {
      Pc[c].target == a.target && Pc[c].B == a.B && Qc(c--);
    }
  }
  return 0;
}
function Wc(a) {
  return a ? a == window ? "#window" : a == screen ? "#screen" : a && a.nodeName ? a.nodeName : "" : "";
}
var Vc, Tc, Xc, Yc, Zc, $c, ad, bd, cd, dd = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];
function P(a) {
  a = 2 < a ? G(a) : a;
  return dd[a] || ("undefined" != typeof document ? document.querySelector(a) : void 0);
}
function ed(a) {
  return 0 > dd.indexOf(a) ? a.getBoundingClientRect() : {left:0, top:0};
}
var fd;
fd = ia ? () => {
  var a = process.hrtime();
  return 1e3 * a[0] + a[1] / 1e6;
} : () => performance.now();
var gd = [];
function R(a) {
  var b = gd[a];
  b || (a >= gd.length && (gd.length = a + 1), gd[a] = b = Ba.get(a));
  assert(Ba.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}
function hd(a, b, c, d, e, g) {
  Xc || (Xc = O(256));
  a = {target:P(a), B:g, L:d, N:function(h = event) {
    var k = h.target.id ? h.target.id : "", m = Xc;
    N(Wc(h.target), m + 0, 128);
    N(k, m + 128, 128);
    R(d)(e, m, b) && h.preventDefault();
  }, K:c};
  return Uc(a);
}
function jd(a, b, c) {
  assert(0 == a % 4);
  Aa[a >> 3] = b.timeStamp;
  a >>= 2;
  B[a + 2] = b.screenX;
  B[a + 3] = b.screenY;
  B[a + 4] = b.clientX;
  B[a + 5] = b.clientY;
  B[a + 6] = b.ctrlKey;
  B[a + 7] = b.shiftKey;
  B[a + 8] = b.altKey;
  B[a + 9] = b.metaKey;
  za[2 * a + 20] = b.button;
  za[2 * a + 21] = b.buttons;
  B[a + 11] = b.movementX;
  B[a + 12] = b.movementY;
  c = ed(c);
  B[a + 13] = b.clientX - c.left;
  B[a + 14] = b.clientY - c.top;
}
function kd(a, b, c, d, e, g) {
  Yc || (Yc = O(72));
  a = P(a);
  return Uc({target:a, qa:"mousemove" != g && "mouseenter" != g && "mouseleave" != g, B:g, L:d, N:function(h = event) {
    jd(Yc, h, a);
    R(d)(e, Yc, b) && h.preventDefault();
  }, K:c});
}
function ld(a, b, c, d, e, g) {
  Zc || (Zc = O(176));
  a = {target:P(a), qa:!0, B:g, L:d, N:function(h) {
    assert(h);
    var k = Zc;
    Aa[k >> 3] = h.timeStamp;
    var m = k >> 2;
    B[m + 2] = h.location;
    B[m + 3] = h.ctrlKey;
    B[m + 4] = h.shiftKey;
    B[m + 5] = h.altKey;
    B[m + 6] = h.metaKey;
    B[m + 7] = h.repeat;
    B[m + 8] = h.charCode;
    B[m + 9] = h.keyCode;
    B[m + 10] = h.which;
    N(h.key || "", k + 44, 32);
    N(h.code || "", k + 76, 32);
    N(h.char || "", k + 108, 32);
    N(h.locale || "", k + 140, 32);
    R(d)(e, k, b) && h.preventDefault();
  }, K:c};
  return Uc(a);
}
function md(a, b, c, d, e) {
  $c || ($c = O(260));
  return Uc({target:a, B:e, L:d, N:function(g = event) {
    var h = $c, k = document.pointerLockElement || document.l || document.ra || document.M;
    B[h >> 2] = !!k;
    var m = k && k.id ? k.id : "";
    N(Wc(k), h + 4, 128);
    N(m, h + 132, 128);
    R(d)(20, h, b) && g.preventDefault();
  }, K:c});
}
function nd(a, b, c, d, e) {
  return Uc({target:a, B:e, L:d, N:function(g = event) {
    R(d)(38, 0, b) && g.preventDefault();
  }, K:c});
}
function od(a, b, c, d) {
  ad || (ad = O(36));
  a = P(a);
  return Uc({target:a, B:"resize", L:d, N:function(e = event) {
    if (e.target == a) {
      var g = document.body;
      if (g) {
        var h = ad;
        B[h >> 2] = e.detail;
        B[h + 4 >> 2] = g.clientWidth;
        B[h + 8 >> 2] = g.clientHeight;
        B[h + 12 >> 2] = innerWidth;
        B[h + 16 >> 2] = innerHeight;
        B[h + 20 >> 2] = outerWidth;
        B[h + 24 >> 2] = outerHeight;
        B[h + 28 >> 2] = pageXOffset;
        B[h + 32 >> 2] = pageYOffset;
        R(d)(10, h, b) && e.preventDefault();
      }
    }
  }, K:c});
}
function pd(a, b, c, d, e, g) {
  bd || (bd = O(1696));
  a = P(a);
  return Uc({target:a, qa:"touchstart" == g || "touchend" == g, B:g, L:d, N:function(h) {
    assert(h);
    for (var k, m = {}, r = h.touches, t = 0; t < r.length; ++t) {
      k = r[t], k.nb = k.qb = 0, m[k.identifier] = k;
    }
    for (t = 0; t < h.changedTouches.length; ++t) {
      k = h.changedTouches[t], k.nb = 1, m[k.identifier] = k;
    }
    for (t = 0; t < h.targetTouches.length; ++t) {
      m[h.targetTouches[t].identifier].qb = 1;
    }
    r = bd;
    Aa[r >> 3] = h.timeStamp;
    var u = r >> 2;
    B[u + 3] = h.ctrlKey;
    B[u + 4] = h.shiftKey;
    B[u + 5] = h.altKey;
    B[u + 6] = h.metaKey;
    u += 7;
    var A = ed(a), n = 0;
    for (t in m) {
      if (k = m[t], B[u] = k.identifier, B[u + 1] = k.screenX, B[u + 2] = k.screenY, B[u + 3] = k.clientX, B[u + 4] = k.clientY, B[u + 5] = k.pageX, B[u + 6] = k.pageY, B[u + 7] = k.nb, B[u + 8] = k.qb, B[u + 9] = k.clientX - A.left, B[u + 10] = k.clientY - A.top, u += 13, 31 < ++n) {
        break;
      }
    }
    B[r + 8 >> 2] = n;
    R(d)(e, r, b) && h.preventDefault();
  }, K:c});
}
function qd(a) {
  var b = a.getExtension("ANGLE_instanced_arrays");
  b && (a.vertexAttribDivisor = function(c, d) {
    b.vertexAttribDivisorANGLE(c, d);
  }, a.drawArraysInstanced = function(c, d, e, g) {
    b.drawArraysInstancedANGLE(c, d, e, g);
  }, a.drawElementsInstanced = function(c, d, e, g, h) {
    b.drawElementsInstancedANGLE(c, d, e, g, h);
  });
}
function rd(a) {
  var b = a.getExtension("OES_vertex_array_object");
  b && (a.createVertexArray = function() {
    return b.createVertexArrayOES();
  }, a.deleteVertexArray = function(c) {
    b.deleteVertexArrayOES(c);
  }, a.bindVertexArray = function(c) {
    b.bindVertexArrayOES(c);
  }, a.isVertexArray = function(c) {
    return b.isVertexArrayOES(c);
  });
}
function sd(a) {
  var b = a.getExtension("WEBGL_draw_buffers");
  b && (a.drawBuffers = function(c, d) {
    b.drawBuffersWEBGL(c, d);
  });
}
function td(a) {
  a.zc = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
}
function ud(a) {
  a.Gc = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
}
function vd(a) {
  a.Lc = a.getExtension("WEBGL_multi_draw");
}
var wd = 1, xd = [], T = [], yd = [], zd = [], Ad = [], Bd = [], Cd = [], Dd = [], Ed = {}, Fd = 4;
function U(a) {
  Gd || (Gd = a);
}
function Hd(a) {
  for (var b = wd++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  return b;
}
function Id(a, b) {
  a.l || (a.l = a.getContext, a.getContext = function(d, e) {
    e = a.l(d, e);
    return "webgl" == d == e instanceof WebGLRenderingContext ? e : null;
  });
  var c = 1 < b.ob ? a.getContext("webgl2", b) : a.getContext("webgl", b);
  return c ? Jd(c, b) : 0;
}
function Jd(a, b) {
  var c = Hd(Dd), d = {Dc:c, attributes:b, version:b.ob, Ca:a};
  a.canvas && (a.canvas.qc = d);
  Dd[c] = d;
  ("undefined" == typeof b.bb || b.bb) && Kd(d);
  return c;
}
function Kd(a) {
  a || (a = V);
  if (!a.Wb) {
    a.Wb = !0;
    var b = a.Ca;
    qd(b);
    rd(b);
    sd(b);
    td(b);
    ud(b);
    2 <= a.version && (b.ab = b.getExtension("EXT_disjoint_timer_query_webgl2"));
    if (2 > a.version || !b.ab) {
      b.ab = b.getExtension("EXT_disjoint_timer_query");
    }
    vd(b);
    (b.getSupportedExtensions() || []).forEach(function(c) {
      c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
    });
  }
}
var Gd, V;
function Ld(a, b, c, d, e, g) {
  a = {target:P(a), B:g, L:d, N:(h = event) => {
    R(d)(e, 0, b) && h.preventDefault();
  }, K:c};
  Uc(a);
}
function Md(a, b, c, d) {
  cd || (cd = O(104));
  return Uc({target:a, qa:!0, B:"wheel", L:d, N:function(e = event) {
    var g = cd;
    jd(g, e, a);
    Aa[g + 72 >> 3] = e.deltaX;
    Aa[g + 80 >> 3] = e.deltaY;
    Aa[g + 88 >> 3] = e.deltaZ;
    B[g + 96 >> 2] = e.deltaMode;
    R(d)(9, g, b) && e.preventDefault();
  }, K:c});
}
var Nd, Od;
function Pd(a, b, c, d, e) {
  function g() {
    var I = 0, ba = 0;
    x.response && Q && 0 === C[a + 12 >> 2] && (ba = x.response.byteLength);
    0 < ba && (I = O(ba), v.set(new Uint8Array(x.response), I));
    C[a + 12 >> 2] = I;
    W(a + 16, ba);
    W(a + 24, 0);
    (I = x.response ? x.response.byteLength : 0) && W(a + 32, I);
    z[a + 40 >> 1] = x.readyState;
    z[a + 42 >> 1] = x.status;
    x.statusText && N(x.statusText, a + 44, 64);
  }
  var h = C[a + 8 >> 2];
  if (h) {
    var k = G(h), m = a + 112, r = G(C[m >> 2]);
    r || (r = "GET");
    var t = C[m + 56 >> 2], u = C[m + 68 >> 2], A = C[m + 72 >> 2];
    h = C[m + 76 >> 2];
    var n = C[m + 80 >> 2], w = C[m + 84 >> 2], y = C[m + 88 >> 2], J = C[m + 52 >> 2], Q = !!(J & 1), S = !!(J & 2);
    J = !!(J & 64);
    u = u ? G(u) : void 0;
    A = A ? G(A) : void 0;
    var x = new XMLHttpRequest();
    x.withCredentials = !!v[m + 60 >> 0];
    x.open(r, k, !J, u, A);
    J || (x.timeout = t);
    x.l = k;
    assert(!S, "streaming uses moz-chunked-arraybuffer which is no longer supported; TODO: rewrite using fetch()");
    x.responseType = "arraybuffer";
    n && (k = G(n), x.overrideMimeType(k));
    if (h) {
      for (;;) {
        m = C[h >> 2];
        if (!m) {
          break;
        }
        k = C[h + 4 >> 2];
        if (!k) {
          break;
        }
        h += 8;
        m = G(m);
        k = G(k);
        x.setRequestHeader(m, k);
      }
    }
    var H = Nd.R(x);
    C[a >> 2] = H;
    h = w && y ? v.slice(w, w + y) : null;
    x.onload = I => {
      Nd.has(H) && (g(), 200 <= x.status && 300 > x.status ? b && b(a, x, I) : c && c(a, x, I));
    };
    x.onerror = I => {
      Nd.has(H) && (g(), c && c(a, x, I));
    };
    x.ontimeout = I => {
      Nd.has(H) && c && c(a, x, I);
    };
    x.onprogress = I => {
      if (Nd.has(H)) {
        var ba = Q && S && x.response ? x.response.byteLength : 0, E = 0;
        0 < ba && Q && S && (assert(d, "When doing a streaming fetch, you should have an onprogress handler registered to receive the chunks!"), E = O(ba), v.set(new Uint8Array(x.response), E));
        C[a + 12 >> 2] = E;
        W(a + 16, ba);
        W(a + 24, I.loaded - ba);
        W(a + 32, I.total);
        z[a + 40 >> 1] = x.readyState;
        3 <= x.readyState && 0 === x.status && 0 < I.loaded && (x.status = 200);
        z[a + 42 >> 1] = x.status;
        x.statusText && N(x.statusText, a + 44, 64);
        d && d(a, x, I);
        E && Dc(E);
      }
    };
    x.onreadystatechange = I => {
      Nd.has(H) && (z[a + 40 >> 1] = x.readyState, 2 <= x.readyState && (z[a + 42 >> 1] = x.status), e && e(a, x, I));
    };
    try {
      x.send(h);
    } catch (I) {
      c && c(a, x, I);
    }
  } else {
    c(a, 0, "no url specified!");
  }
}
function Qd(a) {
  a instanceof sa || "unwind" == a || (Ea(), a instanceof WebAssembly.RuntimeError && 0 >= Rd() && l("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), ea(1, a));
}
function Sd(a, b) {
  ya = a;
  Td();
  noExitRuntime && !b && l(`program exited (with status: ${a}), but keepRuntimeAlive() is set (counter=${0}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`);
  ya = a;
  if (!noExitRuntime) {
    if (f.onExit) {
      f.onExit(a);
    }
    xa = !0;
  }
  ea(a, new sa(a));
}
function W(a, b) {
  C[a >> 2] = b;
  C[a + 4 >> 2] = (b - C[a >> 2]) / 4294967296;
  var c = 0 <= b ? C[a >> 2] + 4294967296 * C[a + 4 >> 2] : C[a >> 2] + 4294967296 * B[a + 4 >> 2];
  c != b && hb("writeI53ToI64() out of range: serialized JS Number " + b + " to Wasm heap as bytes lo=" + Fa(C[a >> 2]) + ", hi=" + Fa(C[a + 4 >> 2]) + ", which deserializes back to " + c + " instead!");
}
function Ud(a, b, c, d) {
  var e = Od;
  if (e) {
    var g = C[a + 112 + 64 >> 2];
    g || (g = C[a + 8 >> 2]);
    var h = G(g);
    try {
      var k = e.transaction(["FILES"], "readwrite").objectStore("FILES").put(b, h);
      k.onsuccess = () => {
        z[a + 40 >> 1] = 4;
        z[a + 42 >> 1] = 200;
        N("OK", a + 44, 64);
        c(a, 0, h);
      };
      k.onerror = m => {
        z[a + 40 >> 1] = 4;
        z[a + 42 >> 1] = 413;
        N("Payload Too Large", a + 44, 64);
        d(a, 0, m);
      };
    } catch (m) {
      d(a, 0, m);
    }
  } else {
    d(a, 0, "IndexedDB not available!");
  }
}
function Vd(a, b, c) {
  var d = Od;
  if (d) {
    var e = C[a + 112 + 64 >> 2];
    e || (e = C[a + 8 >> 2]);
    e = G(e);
    try {
      var g = d.transaction(["FILES"], "readonly").objectStore("FILES").get(e);
      g.onsuccess = h => {
        if (h.target.result) {
          h = h.target.result;
          var k = h.byteLength || h.length, m = O(k);
          v.set(new Uint8Array(h), m);
          C[a + 12 >> 2] = m;
          W(a + 16, k);
          W(a + 24, 0);
          W(a + 32, k);
          z[a + 40 >> 1] = 4;
          z[a + 42 >> 1] = 200;
          N("OK", a + 44, 64);
          b(a, 0, h);
        } else {
          z[a + 40 >> 1] = 4, z[a + 42 >> 1] = 404, N("Not Found", a + 44, 64), c(a, 0, "no data");
        }
      };
      g.onerror = h => {
        z[a + 40 >> 1] = 4;
        z[a + 42 >> 1] = 404;
        N("Not Found", a + 44, 64);
        c(a, 0, h);
      };
    } catch (h) {
      c(a, 0, h);
    }
  } else {
    c(a, 0, "IndexedDB not available!");
  }
}
function Wd(a, b, c) {
  var d = Od;
  if (d) {
    var e = C[a + 112 + 64 >> 2];
    e || (e = C[a + 8 >> 2]);
    e = G(e);
    try {
      var g = d.transaction(["FILES"], "readwrite").objectStore("FILES").delete(e);
      g.onsuccess = h => {
        h = h.target.result;
        C[a + 12 >> 2] = 0;
        W(a + 16, 0);
        W(a + 24, 0);
        W(a + 32, 0);
        z[a + 40 >> 1] = 4;
        z[a + 42 >> 1] = 200;
        N("OK", a + 44, 64);
        b(a, 0, h);
      };
      g.onerror = h => {
        z[a + 40 >> 1] = 4;
        z[a + 42 >> 1] = 404;
        N("Not Found", a + 44, 64);
        c(a, 0, h);
      };
    } catch (h) {
      c(a, 0, h);
    }
  } else {
    c(a, 0, "IndexedDB not available!");
  }
}
var Xd = ["default", "low-power", "high-performance"], Yd = {};
function Zd() {
  if (!$d) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:da || "./this.program"}, b;
    for (b in Yd) {
      void 0 === Yd[b] ? delete a[b] : a[b] = Yd[b];
    }
    var c = [];
    for (b in a) {
      c.push(b + "=" + a[b]);
    }
    $d = c;
  }
  return $d;
}
var $d;
function ae(a, b, c, d) {
  for (var e = 0; e < a; e++) {
    var g = X[c](), h = g && Hd(d);
    g ? (g.name = h, d[h] = g) : U(1282);
    B[b + 4 * e >> 2] = h;
  }
}
function be(a, b) {
  if (b) {
    var c = void 0;
    switch(a) {
      case 36346:
        c = 1;
        break;
      case 36344:
        return;
      case 34814:
      case 36345:
        c = 0;
        break;
      case 34466:
        var d = X.getParameter(34467);
        c = d ? d.length : 0;
        break;
      case 33309:
        if (2 > V.version) {
          U(1282);
          return;
        }
        c = 2 * (X.getSupportedExtensions() || []).length;
        break;
      case 33307:
      case 33308:
        if (2 > V.version) {
          U(1280);
          return;
        }
        c = 33307 == a ? 3 : 0;
    }
    if (void 0 === c) {
      switch(d = X.getParameter(a), typeof d) {
        case "number":
          c = d;
          break;
        case "boolean":
          c = d ? 1 : 0;
          break;
        case "string":
          U(1280);
          return;
        case "object":
          if (null === d) {
            switch(a) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 36662:
              case 36663:
              case 35053:
              case 35055:
              case 36010:
              case 35097:
              case 35869:
              case 32874:
              case 36389:
              case 35983:
              case 35368:
              case 34068:
                c = 0;
                break;
              default:
                U(1280);
                return;
            }
          } else {
            if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
              for (a = 0; a < d.length; ++a) {
                B[b + 4 * a >> 2] = d[a];
              }
              return;
            }
            try {
              c = d.name | 0;
            } catch (e) {
              U(1280);
              l("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + e + ")");
              return;
            }
          }
          break;
        default:
          U(1280);
          l("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + d + " of type " + typeof d + "!");
          return;
      }
    }
    B[b >> 2] = c;
  } else {
    U(1281);
  }
}
function ce(a) {
  return "]" == a.slice(-1) && a.lastIndexOf("[");
}
var de = [];
function ee(a) {
  a -= 5120;
  return 0 == a ? q : 1 == a ? v : 2 == a ? za : 4 == a ? B : 6 == a ? D : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? C : z;
}
function fe(a) {
  return 31 - Math.clz32(a.BYTES_PER_ELEMENT);
}
function ge(a, b, c, d, e) {
  a = ee(a);
  var g = fe(a), h = Fd;
  return a.subarray(e >> g, e + d * (c * ({5:3, 6:4, 8:2, 29502:3, 29504:4, 26917:2, 26918:2, 29846:3, 29847:4}[b - 6402] || 1) * (1 << g) + h - 1 & -h) >> g);
}
function Y(a) {
  var b = X.Pb;
  if (b) {
    var c = b.oa[a];
    "number" == typeof c && (b.oa[a] = c = X.getUniformLocation(b, b.zb[a] + (0 < c ? "[" + c + "]" : "")));
    return c;
  }
  U(1282);
}
var he = [], ie = [], je = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ke = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function le(a, b) {
  assert(0 <= a.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
  q.set(a, b);
}
function me(a, b, c, d) {
  function e(n, w, y) {
    for (n = "number" == typeof n ? n.toString() : n || ""; n.length < w;) {
      n = y[0] + n;
    }
    return n;
  }
  function g(n, w) {
    return e(n, w, "0");
  }
  function h(n, w) {
    function y(Q) {
      return 0 > Q ? -1 : 0 < Q ? 1 : 0;
    }
    var J;
    0 === (J = y(n.getFullYear() - w.getFullYear())) && 0 === (J = y(n.getMonth() - w.getMonth())) && (J = y(n.getDate() - w.getDate()));
    return J;
  }
  function k(n) {
    switch(n.getDay()) {
      case 0:
        return new Date(n.getFullYear() - 1, 11, 29);
      case 1:
        return n;
      case 2:
        return new Date(n.getFullYear(), 0, 3);
      case 3:
        return new Date(n.getFullYear(), 0, 2);
      case 4:
        return new Date(n.getFullYear(), 0, 1);
      case 5:
        return new Date(n.getFullYear() - 1, 11, 31);
      case 6:
        return new Date(n.getFullYear() - 1, 11, 30);
    }
  }
  function m(n) {
    var w = n.aa;
    for (n = new Date((new Date(n.ba + 1900, 0, 1)).getTime()); 0 < w;) {
      var y = n.getMonth(), J = (Gc(n.getFullYear()) ? je : ke)[y];
      if (w > J - n.getDate()) {
        w -= J - n.getDate() + 1, n.setDate(1), 11 > y ? n.setMonth(y + 1) : (n.setMonth(0), n.setFullYear(n.getFullYear() + 1));
      } else {
        n.setDate(n.getDate() + w);
        break;
      }
    }
    y = new Date(n.getFullYear() + 1, 0, 4);
    w = k(new Date(n.getFullYear(), 0, 4));
    y = k(y);
    return 0 >= h(w, n) ? 0 >= h(y, n) ? n.getFullYear() + 1 : n.getFullYear() : n.getFullYear() - 1;
  }
  var r = B[d + 40 >> 2];
  d = {nc:B[d >> 2], mc:B[d + 4 >> 2], Aa:B[d + 8 >> 2], Sa:B[d + 12 >> 2], Ba:B[d + 16 >> 2], ba:B[d + 20 >> 2], J:B[d + 24 >> 2], aa:B[d + 28 >> 2], Uc:B[d + 32 >> 2], lc:B[d + 36 >> 2], oc:r ? G(r) : ""};
  c = G(c);
  r = {"%c":"%a %b %d %H:%M:%S %Y", "%D":"%m/%d/%y", "%F":"%Y-%m-%d", "%h":"%b", "%r":"%I:%M:%S %p", "%R":"%H:%M", "%T":"%H:%M:%S", "%x":"%m/%d/%y", "%X":"%H:%M:%S", "%Ec":"%c", "%EC":"%C", "%Ex":"%m/%d/%y", "%EX":"%H:%M:%S", "%Ey":"%y", "%EY":"%Y", "%Od":"%d", "%Oe":"%e", "%OH":"%H", "%OI":"%I", "%Om":"%m", "%OM":"%M", "%OS":"%S", "%Ou":"%u", "%OU":"%U", "%OV":"%V", "%Ow":"%w", "%OW":"%W", "%Oy":"%y",};
  for (var t in r) {
    c = c.replace(new RegExp(t, "g"), r[t]);
  }
  var u = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), A = "January February March April May June July August September October November December".split(" ");
  r = {"%a":function(n) {
    return u[n.J].substring(0, 3);
  }, "%A":function(n) {
    return u[n.J];
  }, "%b":function(n) {
    return A[n.Ba].substring(0, 3);
  }, "%B":function(n) {
    return A[n.Ba];
  }, "%C":function(n) {
    return g((n.ba + 1900) / 100 | 0, 2);
  }, "%d":function(n) {
    return g(n.Sa, 2);
  }, "%e":function(n) {
    return e(n.Sa, 2, " ");
  }, "%g":function(n) {
    return m(n).toString().substring(2);
  }, "%G":function(n) {
    return m(n);
  }, "%H":function(n) {
    return g(n.Aa, 2);
  }, "%I":function(n) {
    n = n.Aa;
    0 == n ? n = 12 : 12 < n && (n -= 12);
    return g(n, 2);
  }, "%j":function(n) {
    for (var w = 0, y = 0; y <= n.Ba - 1; w += (Gc(n.ba + 1900) ? je : ke)[y++]) {
    }
    return g(n.Sa + w, 3);
  }, "%m":function(n) {
    return g(n.Ba + 1, 2);
  }, "%M":function(n) {
    return g(n.mc, 2);
  }, "%n":function() {
    return "\n";
  }, "%p":function(n) {
    return 0 <= n.Aa && 12 > n.Aa ? "AM" : "PM";
  }, "%S":function(n) {
    return g(n.nc, 2);
  }, "%t":function() {
    return "\t";
  }, "%u":function(n) {
    return n.J || 7;
  }, "%U":function(n) {
    return g(Math.floor((n.aa + 7 - n.J) / 7), 2);
  }, "%V":function(n) {
    var w = Math.floor((n.aa + 7 - (n.J + 6) % 7) / 7);
    2 >= (n.J + 371 - n.aa - 2) % 7 && w++;
    if (w) {
      53 == w && (y = (n.J + 371 - n.aa) % 7, 4 == y || 3 == y && Gc(n.ba) || (w = 1));
    } else {
      w = 52;
      var y = (n.J + 7 - n.aa - 1) % 7;
      (4 == y || 5 == y && Gc(n.ba % 400 - 1)) && w++;
    }
    return g(w, 2);
  }, "%w":function(n) {
    return n.J;
  }, "%W":function(n) {
    return g(Math.floor((n.aa + 7 - (n.J + 6) % 7) / 7), 2);
  }, "%y":function(n) {
    return (n.ba + 1900).toString().substring(2);
  }, "%Y":function(n) {
    return n.ba + 1900;
  }, "%z":function(n) {
    n = n.lc;
    var w = 0 <= n;
    n = Math.abs(n) / 60;
    return (w ? "+" : "-") + String("0000" + (n / 60 * 100 + n % 60)).slice(-4);
  }, "%Z":function(n) {
    return n.oc;
  }, "%%":function() {
    return "%";
  }};
  c = c.replace(/%%/g, "\x00\x00");
  for (t in r) {
    c.includes(t) && (c = c.replace(new RegExp(t, "g"), r[t](d)));
  }
  c = c.replace(/\0\0/g, "%");
  t = Eb(c, !1);
  if (t.length > b) {
    return 0;
  }
  le(t, a);
  return t.length - 1;
}
function ne(a) {
  var b = Cb(a) + 1, c = oe(b);
  N(a, c, b);
  return c;
}
function pe(a, b, c, d) {
  a || (a = this);
  this.parent = a;
  this.s = a.s;
  this.ja = null;
  this.id = K.bc++;
  this.name = b;
  this.mode = c;
  this.h = {};
  this.j = {};
  this.rdev = d;
}
Object.defineProperties(pe.prototype, {read:{get:function() {
  return 365 === (this.mode & 365);
}, set:function(a) {
  a ? this.mode |= 365 : this.mode &= -366;
}}, write:{get:function() {
  return 146 === (this.mode & 146);
}, set:function(a) {
  a ? this.mode |= 146 : this.mode &= -147;
}}, Yb:{get:function() {
  return K.u(this.mode);
}}, Ka:{get:function() {
  return K.ta(this.mode);
}}});
K.Bb = pe;
K.xc = function(a, b, c, d, e, g, h, k, m, r) {
  function t(n) {
    function w(y) {
      r && r();
      k || K.Jb(a, b, y, d, e, m);
      g && g();
      Va(A);
    }
    Nb(n, u, w, () => {
      h && h();
      Va(A);
    }) || w(n);
  }
  var u = b ? Ab(ub(a + "/" + b)) : a, A = Ta(`cp ${u}`);
  Ua(A);
  "string" == typeof c ? Lb(c, n => t(n), h) : t(c);
};
K.kc();
Qb = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, EDEADLK:16, 
ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, ENOBUFS:42, 
EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, EOWNERDEAD:62, 
ESTRPIPE:135,};
for (var qe = Array(256), re = 0; 256 > re; ++re) {
  qe[re] = String.fromCharCode(re);
}
Xb = qe;
ec = f.BindingError = dc("BindingError");
f.InternalError = dc("InternalError");
M.A.push({value:void 0}, {value:null}, {value:!0}, {value:!1},);
M.M = M.A.length;
f.count_emval_handles = function() {
  for (var a = 0, b = M.M; b < M.A.length; ++b) {
    void 0 !== M.A[b] && ++a;
  }
  return a;
};
var X;
Nd = new hc();
Ua("library_fetch_init");
(function(a, b) {
  try {
    var c = indexedDB.open("emscripten_filesystem", 1);
  } catch (d) {
    b(d);
    return;
  }
  c.onupgradeneeded = d => {
    d = d.target.result;
    d.objectStoreNames.contains("FILES") && d.deleteObjectStore("FILES");
    d.createObjectStore("FILES");
  };
  c.onsuccess = d => a(d.target.result);
  c.onerror = d => b(d);
})(a => {
  Od = a;
  Va("library_fetch_init");
}, () => {
  Od = !1;
  Va("library_fetch_init");
});
for (var Z = 0; 32 > Z; ++Z) {
  de.push(Array(Z));
}
var se = new Float32Array(288);
for (Z = 0; 288 > Z; ++Z) {
  he[Z] = se.subarray(0, Z + 1);
}
var te = new Int32Array(288);
for (Z = 0; 288 > Z; ++Z) {
  ie[Z] = te.subarray(0, Z + 1);
}
var Fe = {__assert_fail:function(a, b, c, d) {
  p(`Assertion failed: ${G(a)}, at: ` + [b ? G(b) : "unknown filename", c, d ? G(d) : "unknown function"]);
}, __cxa_throw:function(a, b, c) {
  (new rb(a)).U(b, c);
  sb++;
  assert(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function(a, b, c) {
  Tb = c;
  try {
    var d = Vb(a);
    switch(b) {
      case 0:
        var e = Ub();
        return 0 > e ? -28 : K.Xa(d, e).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = Ub(), d.flags |= e, 0;
      case 5:
        return e = Ub(), za[e + 0 >> 1] = 2, 0;
      case 6:
      case 7:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        return B[ue() >> 2] = 28, -1;
      default:
        return -28;
    }
  } catch (g) {
    if ("undefined" == typeof K || "ErrnoError" !== g.name) {
      throw g;
    }
    return -g.C;
  }
}, __syscall_ioctl:function(a, b, c) {
  Tb = c;
  try {
    var d = Vb(a);
    switch(b) {
      case 21509:
      case 21505:
        return d.tty ? 0 : -59;
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508:
        return d.tty ? 0 : -59;
      case 21519:
        if (!d.tty) {
          return -59;
        }
        var e = Ub();
        return B[e >> 2] = 0;
      case 21520:
        return d.tty ? -28 : -59;
      case 21531:
        return e = Ub(), K.Ja(d, b, e);
      case 21523:
        return d.tty ? 0 : -59;
      case 21524:
        return d.tty ? 0 : -59;
      default:
        return -28;
    }
  } catch (g) {
    if ("undefined" == typeof K || "ErrnoError" !== g.name) {
      throw g;
    }
    return -g.C;
  }
}, __syscall_openat:function(a, b, c, d) {
  Tb = d;
  try {
    b = G(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var g = -100 === a ? K.cwd() : Vb(a).path;
      if (0 == e.length) {
        throw new K.g(44);
      }
      b = ub(g + "/" + e);
    }
    var h = d ? Ub() : 0;
    return K.open(b, c, h).fd;
  } catch (k) {
    if ("undefined" == typeof K || "ErrnoError" !== k.name) {
      throw k;
    }
    return -k.C;
  }
}, _embind_register_bigint:function() {
}, _embind_register_bool:function(a, b, c, d, e) {
  var g = Wb(c);
  b = Yb(b);
  gc(a, {name:b, fromWireType:function(h) {
    return !!h;
  }, toWireType:function(h, k) {
    return k ? d : e;
  }, argPackAdvance:8, readValueFromPointer:function(h) {
    if (1 === c) {
      var k = q;
    } else if (2 === c) {
      k = za;
    } else if (4 === c) {
      k = B;
    } else {
      throw new TypeError("Unknown boolean type size: " + b);
    }
    return this.fromWireType(k[h >> g]);
  }, fa:null,});
}, _embind_register_emval:function(a, b) {
  b = Yb(b);
  gc(a, {name:b, fromWireType:function(c) {
    var d = jc(c);
    ic(c);
    return d;
  }, toWireType:function(c, d) {
    return kc(d);
  }, argPackAdvance:8, readValueFromPointer:lc, fa:null,});
}, _embind_register_float:function(a, b, c) {
  c = Wb(c);
  b = Yb(b);
  gc(a, {name:b, fromWireType:function(d) {
    return d;
  }, toWireType:function(d, e) {
    if ("number" != typeof e && "boolean" != typeof e) {
      throw new TypeError(`Cannot convert ${mc(e)} to ${this.name}`);
    }
    return e;
  }, argPackAdvance:8, readValueFromPointer:nc(b, c), fa:null,});
}, _embind_register_integer:function(a, b, c, d, e) {
  b = Yb(b);
  -1 === e && (e = 4294967295);
  var g = Wb(c), h = r => r;
  if (0 === d) {
    var k = 32 - 8 * c;
    h = r => r << k >>> k;
  }
  var m = (r, t) => {
    if ("number" != typeof r && "boolean" != typeof r) {
      throw new TypeError(`Cannot convert "${mc(r)}" to ${t}`);
    }
    if (r < d || r > e) {
      throw new TypeError(`Passing a number "${mc(r)}" from JS side to C/C++ side to an argument of type "${b}", which is outside the valid range [${d}, ${e}]!`);
    }
  };
  c = b.includes("unsigned") ? function(r, t) {
    m(t, this.name);
    return t >>> 0;
  } : function(r, t) {
    m(t, this.name);
    return t;
  };
  gc(a, {name:b, fromWireType:h, toWireType:c, argPackAdvance:8, readValueFromPointer:oc(b, g, 0 !== d), fa:null,});
}, _embind_register_memory_view:function(a, b, c) {
  function d(g) {
    g >>= 2;
    var h = C;
    return new e(h.buffer, h[g + 1], h[g]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,][b];
  c = Yb(c);
  gc(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d,}, {Vb:!0,});
}, _embind_register_std_string:function(a, b) {
  b = Yb(b);
  var c = "std::string" === b;
  gc(a, {name:b, fromWireType:function(d) {
    var e = C[d >> 2], g = d + 4;
    if (c) {
      for (var h = g, k = 0; k <= e; ++k) {
        var m = g + k;
        if (k == e || 0 == v[m]) {
          h = G(h, m - h);
          if (void 0 === r) {
            var r = h;
          } else {
            r += String.fromCharCode(0), r += h;
          }
          h = m + 1;
        }
      }
    } else {
      r = Array(e);
      for (k = 0; k < e; ++k) {
        r[k] = String.fromCharCode(v[g + k]);
      }
      r = r.join("");
    }
    Dc(d);
    return r;
  }, toWireType:function(d, e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e));
    var g = "string" == typeof e;
    g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || fc("Cannot pass non-string to std::string");
    var h = c && g ? Cb(e) : e.length;
    var k = O(4 + h + 1), m = k + 4;
    C[k >> 2] = h;
    if (c && g) {
      N(e, m, h + 1);
    } else {
      if (g) {
        for (g = 0; g < h; ++g) {
          var r = e.charCodeAt(g);
          255 < r && (Dc(m), fc("String has UTF-16 code units that do not fit in 8 bits"));
          v[m + g] = r;
        }
      } else {
        for (g = 0; g < h; ++g) {
          v[m + g] = e[g];
        }
      }
    }
    null !== d && d.push(Dc, k);
    return k;
  }, argPackAdvance:8, readValueFromPointer:lc, fa:function(d) {
    Dc(d);
  },});
}, _embind_register_std_wstring:function(a, b, c) {
  c = Yb(c);
  if (2 === b) {
    var d = qc;
    var e = rc;
    var g = sc;
    var h = () => z;
    var k = 1;
  } else {
    4 === b && (d = tc, e = uc, g = vc, h = () => C, k = 2);
  }
  gc(a, {name:c, fromWireType:function(m) {
    for (var r = C[m >> 2], t = h(), u, A = m + 4, n = 0; n <= r; ++n) {
      var w = m + 4 + n * b;
      if (n == r || 0 == t[w >> k]) {
        A = d(A, w - A), void 0 === u ? u = A : (u += String.fromCharCode(0), u += A), A = w + b;
      }
    }
    Dc(m);
    return u;
  }, toWireType:function(m, r) {
    "string" != typeof r && fc(`Cannot pass non-string to C++ string type ${c}`);
    var t = g(r), u = O(4 + t + b);
    C[u >> 2] = t >> k;
    e(r, u + 4, t + b);
    null !== m && m.push(Dc, u);
    return u;
  }, argPackAdvance:8, readValueFromPointer:lc, fa:function(m) {
    Dc(m);
  },});
}, _embind_register_void:function(a, b) {
  b = Yb(b);
  gc(a, {Zb:!0, name:b, argPackAdvance:0, fromWireType:function() {
  }, toWireType:function() {
  },});
}, _emscripten_fetch_free:function(a) {
  if (Nd.has(a)) {
    var b = Nd.get(a);
    Nd.gb(a);
    0 < b.readyState && 4 > b.readyState && b.abort();
  }
}, _emval_call_void_method:function(a, b, c, d) {
  a = yc[a];
  b = jc(b);
  c = xc(c);
  a(b, c, null, d);
}, _emval_decref:ic, _emval_get_global:function(a) {
  if (0 === a) {
    return kc(zc());
  }
  a = xc(a);
  return kc(zc()[a]);
}, _emval_get_method_caller:function(a, b) {
  var c = Bc(a, b), d = c[0];
  b = d.name + "_$" + c.slice(1).map(function(t) {
    return t.name;
  }).join("_") + "$";
  var e = Ec[b];
  if (void 0 !== e) {
    return e;
  }
  e = ["retType"];
  for (var g = [d], h = "", k = 0; k < a - 1; ++k) {
    h += (0 !== k ? ", " : "") + "arg" + k, e.push("argType" + k), g.push(c[1 + k]);
  }
  var m = "return function " + bc("methodCaller_" + b) + "(handle, name, destructors, args) {\n", r = 0;
  for (k = 0; k < a - 1; ++k) {
    m += "    var arg" + k + " = argType" + k + ".readValueFromPointer(args" + (r ? "+" + r : "") + ");\n", r += c[k + 1].argPackAdvance;
  }
  m += "    var rv = handle[name](" + h + ");\n";
  for (k = 0; k < a - 1; ++k) {
    c[k + 1].deleteObject && (m += "    argType" + k + ".deleteObject(arg" + k + ");\n");
  }
  d.Zb || (m += "    return retType.toWireType(destructors, rv);\n");
  e.push(m + "};\n");
  a = Fc(e).apply(null, g);
  e = Ac(a);
  return Ec[b] = e;
}, _localtime_js:function(a, b) {
  a = new Date(1000 * (C[a >> 2] + 4294967296 * B[a + 4 >> 2]));
  B[b >> 2] = a.getSeconds();
  B[b + 4 >> 2] = a.getMinutes();
  B[b + 8 >> 2] = a.getHours();
  B[b + 12 >> 2] = a.getDate();
  B[b + 16 >> 2] = a.getMonth();
  B[b + 20 >> 2] = a.getFullYear() - 1900;
  B[b + 24 >> 2] = a.getDay();
  B[b + 28 >> 2] = (Gc(a.getFullYear()) ? Hc : Ic)[a.getMonth()] + a.getDate() - 1 | 0;
  B[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
  var c = (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset(), d = (new Date(a.getFullYear(), 0, 1)).getTimezoneOffset();
  B[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
}, _tzset_js:function(a, b, c) {
  function d(m) {
    return (m = m.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? m[1] : "GMT";
  }
  var e = (new Date()).getFullYear(), g = new Date(e, 0, 1), h = new Date(e, 6, 1);
  e = g.getTimezoneOffset();
  var k = h.getTimezoneOffset();
  C[a >> 2] = 60 * Math.max(e, k);
  B[b >> 2] = Number(e != k);
  a = d(g);
  b = d(h);
  a = Jc(a);
  b = Jc(b);
  k < e ? (C[c >> 2] = a, C[c + 4 >> 2] = b) : (C[c >> 2] = b, C[c + 4 >> 2] = a);
}, abort:function() {
  p("native code called abort()");
}, emscripten_date_now:function() {
  return Date.now();
}, emscripten_get_device_pixel_ratio:function() {
  return "number" == typeof devicePixelRatio && devicePixelRatio || 1.0;
}, emscripten_get_element_css_size:function(a, b, c) {
  a = P(a);
  if (!a) {
    return -4;
  }
  a = ed(a);
  Aa[b >> 3] = a.width;
  Aa[c >> 3] = a.height;
  return 0;
}, emscripten_get_now:fd, emscripten_is_main_browser_thread:function() {
  return !ha;
}, emscripten_memcpy_big:function(a, b, c) {
  v.copyWithin(a, b, b + c);
}, emscripten_request_animation_frame_loop:function(a, b) {
  function c(d) {
    R(a)(d, b) && requestAnimationFrame(c);
  }
  return requestAnimationFrame(c);
}, emscripten_resize_heap:function(a) {
  p(`Cannot enlarge memory arrays to size ${a >>> 0} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${q.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
}, emscripten_set_blur_callback_on_thread:function(a, b, c, d) {
  return hd(a, b, c, d, 12, "blur");
}, emscripten_set_canvas_element_size:function(a, b, c) {
  a = P(a);
  if (!a) {
    return -4;
  }
  a.width = b;
  a.height = c;
  return 0;
}, emscripten_set_click_callback_on_thread:function(a, b, c, d) {
  return kd(a, b, c, d, 4, "click");
}, emscripten_set_focus_callback_on_thread:function(a, b, c, d) {
  return hd(a, b, c, d, 13, "focus");
}, emscripten_set_keydown_callback_on_thread:function(a, b, c, d) {
  return ld(a, b, c, d, 2, "keydown");
}, emscripten_set_keypress_callback_on_thread:function(a, b, c, d) {
  return ld(a, b, c, d, 1, "keypress");
}, emscripten_set_keyup_callback_on_thread:function(a, b, c, d) {
  return ld(a, b, c, d, 3, "keyup");
}, emscripten_set_mousedown_callback_on_thread:function(a, b, c, d) {
  return kd(a, b, c, d, 5, "mousedown");
}, emscripten_set_mouseenter_callback_on_thread:function(a, b, c, d) {
  return kd(a, b, c, d, 33, "mouseenter");
}, emscripten_set_mouseleave_callback_on_thread:function(a, b, c, d) {
  return kd(a, b, c, d, 34, "mouseleave");
}, emscripten_set_mousemove_callback_on_thread:function(a, b, c, d) {
  return kd(a, b, c, d, 8, "mousemove");
}, emscripten_set_mouseup_callback_on_thread:function(a, b, c, d) {
  return kd(a, b, c, d, 6, "mouseup");
}, emscripten_set_pointerlockchange_callback_on_thread:function(a, b, c, d) {
  if (!document || !document.body || !(document.body.requestPointerLock || document.body.l || document.body.ra || document.body.M)) {
    return -1;
  }
  a = P(a);
  if (!a) {
    return -4;
  }
  md(a, b, c, d, "mozpointerlockchange");
  md(a, b, c, d, "webkitpointerlockchange");
  md(a, b, c, d, "mspointerlockchange");
  return md(a, b, c, d, "pointerlockchange");
}, emscripten_set_pointerlockerror_callback_on_thread:function(a, b, c, d) {
  if (!document || !(document.body.requestPointerLock || document.body.l || document.body.ra || document.body.M)) {
    return -1;
  }
  a = P(a);
  if (!a) {
    return -4;
  }
  nd(a, b, c, d, "mozpointerlockerror");
  nd(a, b, c, d, "webkitpointerlockerror");
  nd(a, b, c, d, "mspointerlockerror");
  return nd(a, b, c, d, "pointerlockerror");
}, emscripten_set_resize_callback_on_thread:function(a, b, c, d) {
  return od(a, b, c, d);
}, emscripten_set_touchcancel_callback_on_thread:function(a, b, c, d) {
  return pd(a, b, c, d, 25, "touchcancel");
}, emscripten_set_touchend_callback_on_thread:function(a, b, c, d) {
  return pd(a, b, c, d, 23, "touchend");
}, emscripten_set_touchmove_callback_on_thread:function(a, b, c, d) {
  return pd(a, b, c, d, 24, "touchmove");
}, emscripten_set_touchstart_callback_on_thread:function(a, b, c, d) {
  return pd(a, b, c, d, 22, "touchstart");
}, emscripten_set_webglcontextlost_callback_on_thread:function(a, b, c, d) {
  Ld(a, b, c, d, 31, "webglcontextlost");
  return 0;
}, emscripten_set_webglcontextrestored_callback_on_thread:function(a, b, c, d) {
  Ld(a, b, c, d, 32, "webglcontextrestored");
  return 0;
}, emscripten_set_wheel_callback_on_thread:function(a, b, c, d) {
  return (a = P(a)) ? "undefined" != typeof a.onwheel ? Md(a, b, c, d) : -1 : -4;
}, emscripten_start_fetch:function(a, b, c, d, e) {
  function g(E) {
    if (J) {
      E();
    } else {
      if (xa) {
        l("user callback triggered after runtime exited or application aborted.  Ignoring.");
      } else {
        try {
          if (E(), !noExitRuntime) {
            try {
              Sd(ya);
            } catch ($a) {
              Qd($a);
            }
          }
        } catch ($a) {
          Qd($a);
        }
      }
    }
  }
  var h = a + 112, k = G(h), m = C[h + 36 >> 2], r = C[h + 40 >> 2], t = C[h + 44 >> 2], u = C[h + 48 >> 2], A = C[h + 52 >> 2], n = !!(A & 4), w = !!(A & 32), y = !!(A & 16), J = !!(A & 64), Q = E => {
    g(() => {
      m ? R(m)(E) : b && b(E);
    });
  }, S = E => {
    g(() => {
      t ? R(t)(E) : d && d(E);
    });
  }, x = E => {
    g(() => {
      r ? R(r)(E) : c && c(E);
    });
  }, H = E => {
    g(() => {
      u ? R(u)(E) : e && e(E);
    });
  };
  A = E => {
    Pd(E, Q, x, S, H);
  };
  var I = (E, $a) => {
    Ud(E, $a.response, ab => {
      g(() => {
        m ? R(m)(ab) : b && b(ab);
      });
    }, ab => {
      g(() => {
        m ? R(m)(ab) : b && b(ab);
      });
    });
  }, ba = E => {
    Pd(E, I, x, S, H);
  };
  if ("EM_IDB_STORE" === k) {
    k = C[h + 84 >> 2], Ud(a, v.slice(k, k + C[h + 88 >> 2]), Q, x);
  } else if ("EM_IDB_DELETE" === k) {
    Wd(a, Q, x);
  } else if (y) {
    if (w) {
      return 0;
    }
    Pd(a, n ? I : Q, x, S, H);
  } else {
    Vd(a, Q, w ? x : n ? ba : A);
  }
  return a;
}, emscripten_webgl_create_context:function(a, b) {
  assert(b);
  b >>= 2;
  b = {alpha:!!B[b], depth:!!B[b + 1], stencil:!!B[b + 2], antialias:!!B[b + 3], premultipliedAlpha:!!B[b + 4], preserveDrawingBuffer:!!B[b + 5], powerPreference:Xd[B[b + 6]], failIfMajorPerformanceCaveat:!!B[b + 7], ob:B[b + 8], Ic:B[b + 9], bb:B[b + 10], Sb:B[b + 11], Oc:B[b + 12], Qc:B[b + 13]};
  a = P(a);
  return !a || b.Sb ? 0 : Id(a, b);
}, emscripten_webgl_enable_extension:function(a, b) {
  a = Dd[a];
  b = G(b);
  b.startsWith("GL_") && (b = b.substr(3));
  "ANGLE_instanced_arrays" == b && qd(X);
  "OES_vertex_array_object" == b && rd(X);
  "WEBGL_draw_buffers" == b && sd(X);
  "WEBGL_draw_instanced_base_vertex_base_instance" == b && td(X);
  "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && ud(X);
  "WEBGL_multi_draw" == b && vd(X);
  return !!a.Ca.getExtension(b);
}, emscripten_webgl_init_context_attributes:function(a) {
  assert(a);
  a >>= 2;
  for (var b = 0; 14 > b; ++b) {
    B[a + b] = 0;
  }
  B[a] = B[a + 1] = B[a + 3] = B[a + 4] = B[a + 8] = B[a + 10] = 1;
}, emscripten_webgl_make_context_current:function(a) {
  V = Dd[a];
  f.yc = X = V && V.Ca;
  return !a || X ? 0 : -5;
}, environ_get:function(a, b) {
  var c = 0;
  Zd().forEach(function(d, e) {
    var g = b + c;
    e = C[a + 4 * e >> 2] = g;
    for (g = 0; g < d.length; ++g) {
      assert(d.charCodeAt(g) === (d.charCodeAt(g) & 255)), q[e++ >> 0] = d.charCodeAt(g);
    }
    q[e >> 0] = 0;
    c += d.length + 1;
  });
  return 0;
}, environ_sizes_get:function(a, b) {
  var c = Zd();
  C[a >> 2] = c.length;
  var d = 0;
  c.forEach(function(e) {
    d += e.length + 1;
  });
  C[b >> 2] = d;
  return 0;
}, fd_close:function(a) {
  try {
    var b = Vb(a);
    K.close(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof K || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.C;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = Vb(a);
      a = b;
      for (var g, h = b = 0; h < c; h++) {
        var k = C[a >> 2], m = C[a + 4 >> 2];
        a += 8;
        var r = K.read(e, q, k, m, g);
        if (0 > r) {
          var t = -1;
          break a;
        }
        b += r;
        if (r < m) {
          break;
        }
        "undefined" !== typeof g && (g += r);
      }
      t = b;
    }
    C[d >> 2] = t;
    return 0;
  } catch (u) {
    if ("undefined" == typeof K || "ErrnoError" !== u.name) {
      throw u;
    }
    return u.C;
  }
}, fd_seek:function(a, b, c, d, e) {
  try {
    assert(b == b >>> 0 || b == (b | 0));
    assert(c === (c | 0));
    var g = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
    if (isNaN(g)) {
      return 61;
    }
    var h = Vb(a);
    K.G(h, g, d);
    fb = [h.position >>> 0, (eb = h.position, 1.0 <= +Math.abs(eb) ? 0.0 < eb ? +Math.floor(eb / 4294967296.0) >>> 0 : ~~+Math.ceil((eb - +(~~eb >>> 0)) / 4294967296.0) >>> 0 : 0)];
    B[e >> 2] = fb[0];
    B[e + 4 >> 2] = fb[1];
    h.Ha && 0 === g && 0 === d && (h.Ha = null);
    return 0;
  } catch (k) {
    if ("undefined" == typeof K || "ErrnoError" !== k.name) {
      throw k;
    }
    return k.C;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = Vb(a);
      a = b;
      for (var g, h = b = 0; h < c; h++) {
        var k = C[a >> 2], m = C[a + 4 >> 2];
        a += 8;
        var r = K.write(e, q, k, m, g);
        if (0 > r) {
          var t = -1;
          break a;
        }
        b += r;
        "undefined" !== typeof g && (g += r);
      }
      t = b;
    }
    C[d >> 2] = t;
    return 0;
  } catch (u) {
    if ("undefined" == typeof K || "ErrnoError" !== u.name) {
      throw u;
    }
    return u.C;
  }
}, glActiveTexture:function(a) {
  X.activeTexture(a);
}, glAttachShader:function(a, b) {
  X.attachShader(T[a], Bd[b]);
}, glBindBuffer:function(a, b) {
  35051 == a ? X.Za = b : 35052 == a && (X.T = b);
  X.bindBuffer(a, xd[b]);
}, glBindFramebuffer:function(a, b) {
  X.bindFramebuffer(a, yd[b]);
}, glBindRenderbuffer:function(a, b) {
  X.bindRenderbuffer(a, zd[b]);
}, glBindTexture:function(a, b) {
  X.bindTexture(a, Ad[b]);
}, glBindVertexArray:function(a) {
  X.bindVertexArray(Cd[a]);
}, glBlendColor:function(a, b, c, d) {
  X.blendColor(a, b, c, d);
}, glBlendEquationSeparate:function(a, b) {
  X.blendEquationSeparate(a, b);
}, glBlendFuncSeparate:function(a, b, c, d) {
  X.blendFuncSeparate(a, b, c, d);
}, glBlitFramebuffer:function(a, b, c, d, e, g, h, k, m, r) {
  X.blitFramebuffer(a, b, c, d, e, g, h, k, m, r);
}, glBufferData:function(a, b, c, d) {
  2 <= V.version ? c && b ? X.bufferData(a, v, d, c, b) : X.bufferData(a, b, d) : X.bufferData(a, c ? v.subarray(c, c + b) : b, d);
}, glBufferSubData:function(a, b, c, d) {
  2 <= V.version ? c && X.bufferSubData(a, b, v, d, c) : X.bufferSubData(a, b, v.subarray(d, d + c));
}, glClearBufferfi:function(a, b, c, d) {
  X.clearBufferfi(a, b, c, d);
}, glClearBufferfv:function(a, b, c) {
  X.clearBufferfv(a, b, D, c >> 2);
}, glClearBufferiv:function(a, b, c) {
  X.clearBufferiv(a, b, B, c >> 2);
}, glColorMask:function(a, b, c, d) {
  X.colorMask(!!a, !!b, !!c, !!d);
}, glCompileShader:function(a) {
  X.compileShader(Bd[a]);
}, glCompressedTexImage2D:function(a, b, c, d, e, g, h, k) {
  2 <= V.version ? X.T || !h ? X.compressedTexImage2D(a, b, c, d, e, g, h, k) : X.compressedTexImage2D(a, b, c, d, e, g, v, k, h) : X.compressedTexImage2D(a, b, c, d, e, g, k ? v.subarray(k, k + h) : null);
}, glCompressedTexImage3D:function(a, b, c, d, e, g, h, k, m) {
  X.T ? X.compressedTexImage3D(a, b, c, d, e, g, h, k, m) : X.compressedTexImage3D(a, b, c, d, e, g, h, v, m, k);
}, glCreateProgram:function() {
  var a = Hd(T), b = X.createProgram();
  b.name = a;
  b.xa = b.va = b.wa = 0;
  b.Ta = 1;
  T[a] = b;
  return a;
}, glCreateShader:function(a) {
  var b = Hd(Bd);
  Bd[b] = X.createShader(a);
  return b;
}, glCullFace:function(a) {
  X.cullFace(a);
}, glDeleteBuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = B[b + 4 * c >> 2], e = xd[d];
    e && (X.deleteBuffer(e), e.name = 0, xd[d] = null, d == X.Za && (X.Za = 0), d == X.T && (X.T = 0));
  }
}, glDeleteFramebuffers:function(a, b) {
  for (var c = 0; c < a; ++c) {
    var d = B[b + 4 * c >> 2], e = yd[d];
    e && (X.deleteFramebuffer(e), e.name = 0, yd[d] = null);
  }
}, glDeleteProgram:function(a) {
  if (a) {
    var b = T[a];
    b ? (X.deleteProgram(b), b.name = 0, T[a] = null) : U(1281);
  }
}, glDeleteRenderbuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = B[b + 4 * c >> 2], e = zd[d];
    e && (X.deleteRenderbuffer(e), e.name = 0, zd[d] = null);
  }
}, glDeleteShader:function(a) {
  if (a) {
    var b = Bd[a];
    b ? (X.deleteShader(b), Bd[a] = null) : U(1281);
  }
}, glDeleteTextures:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = B[b + 4 * c >> 2], e = Ad[d];
    e && (X.deleteTexture(e), e.name = 0, Ad[d] = null);
  }
}, glDeleteVertexArrays:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = B[b + 4 * c >> 2];
    X.deleteVertexArray(Cd[d]);
    Cd[d] = null;
  }
}, glDepthFunc:function(a) {
  X.depthFunc(a);
}, glDepthMask:function(a) {
  X.depthMask(!!a);
}, glDisable:function(a) {
  X.disable(a);
}, glDisableVertexAttribArray:function(a) {
  X.disableVertexAttribArray(a);
}, glDrawArrays:function(a, b, c) {
  X.drawArrays(a, b, c);
}, glDrawArraysInstanced:function(a, b, c, d) {
  X.drawArraysInstanced(a, b, c, d);
}, glDrawElements:function(a, b, c, d) {
  X.drawElements(a, b, c, d);
}, glDrawElementsInstanced:function(a, b, c, d, e) {
  X.drawElementsInstanced(a, b, c, d, e);
}, glEnable:function(a) {
  X.enable(a);
}, glEnableVertexAttribArray:function(a) {
  X.enableVertexAttribArray(a);
}, glFrontFace:function(a) {
  X.frontFace(a);
}, glGenBuffers:function(a, b) {
  ae(a, b, "createBuffer", xd);
}, glGenRenderbuffers:function(a, b) {
  ae(a, b, "createRenderbuffer", zd);
}, glGenTextures:function(a, b) {
  ae(a, b, "createTexture", Ad);
}, glGenVertexArrays:function(a, b) {
  ae(a, b, "createVertexArray", Cd);
}, glGetAttribLocation:function(a, b) {
  return X.getAttribLocation(T[a], G(b));
}, glGetError:function() {
  var a = X.getError() || Gd;
  Gd = 0;
  return a;
}, glGetIntegerv:function(a, b) {
  be(a, b);
}, glGetProgramInfoLog:function(a, b, c, d) {
  a = X.getProgramInfoLog(T[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? N(a, d, b) : 0;
  c && (B[c >> 2] = b);
}, glGetProgramiv:function(a, b, c) {
  if (c) {
    if (a >= wd) {
      U(1281);
    } else {
      if (a = T[a], 35716 == b) {
        a = X.getProgramInfoLog(a), null === a && (a = "(unknown error)"), B[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.xa) {
          for (b = 0; b < X.getProgramParameter(a, 35718); ++b) {
            a.xa = Math.max(a.xa, X.getActiveUniform(a, b).name.length + 1);
          }
        }
        B[c >> 2] = a.xa;
      } else if (35722 == b) {
        if (!a.va) {
          for (b = 0; b < X.getProgramParameter(a, 35721); ++b) {
            a.va = Math.max(a.va, X.getActiveAttrib(a, b).name.length + 1);
          }
        }
        B[c >> 2] = a.va;
      } else if (35381 == b) {
        if (!a.wa) {
          for (b = 0; b < X.getProgramParameter(a, 35382); ++b) {
            a.wa = Math.max(a.wa, X.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        B[c >> 2] = a.wa;
      } else {
        B[c >> 2] = X.getProgramParameter(a, b);
      }
    }
  } else {
    U(1281);
  }
}, glGetShaderInfoLog:function(a, b, c, d) {
  a = X.getShaderInfoLog(Bd[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? N(a, d, b) : 0;
  c && (B[c >> 2] = b);
}, glGetShaderiv:function(a, b, c) {
  c ? 35716 == b ? (a = X.getShaderInfoLog(Bd[a]), null === a && (a = "(unknown error)"), B[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = X.getShaderSource(Bd[a]), B[c >> 2] = a ? a.length + 1 : 0) : B[c >> 2] = X.getShaderParameter(Bd[a], b) : U(1281);
}, glGetStringi:function(a, b) {
  if (2 > V.version) {
    return U(1282), 0;
  }
  var c = Ed[a];
  if (c) {
    return 0 > b || b >= c.length ? (U(1281), 0) : c[b];
  }
  switch(a) {
    case 7939:
      return c = X.getSupportedExtensions() || [], c = c.concat(c.map(function(d) {
        return "GL_" + d;
      })), c = c.map(function(d) {
        return Jc(d);
      }), c = Ed[a] = c, 0 > b || b >= c.length ? (U(1281), 0) : c[b];
    default:
      return U(1280), 0;
  }
}, glGetUniformLocation:function(a, b) {
  b = G(b);
  if (a = T[a]) {
    var c = a, d = c.oa, e = c.Ab, g;
    if (!d) {
      for (c.oa = d = {}, c.zb = {}, g = 0; g < X.getProgramParameter(c, 35718); ++g) {
        var h = X.getActiveUniform(c, g);
        var k = h.name;
        h = h.size;
        var m = ce(k);
        m = 0 < m ? k.slice(0, m) : k;
        var r = c.Ta;
        c.Ta += h;
        e[m] = [h, r];
        for (k = 0; k < h; ++k) {
          d[r] = k, c.zb[r++] = m;
        }
      }
    }
    c = a.oa;
    d = 0;
    e = b;
    g = ce(b);
    0 < g && (d = parseInt(b.slice(g + 1)) >>> 0, e = b.slice(0, g));
    if ((e = a.Ab[e]) && d < e[0] && (d += e[1], c[d] = c[d] || X.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    U(1281);
  }
  return -1;
}, glInvalidateFramebuffer:function(a, b, c) {
  for (var d = de[b], e = 0; e < b; e++) {
    d[e] = B[c + 4 * e >> 2];
  }
  X.invalidateFramebuffer(a, d);
}, glLinkProgram:function(a) {
  a = T[a];
  X.linkProgram(a);
  a.oa = 0;
  a.Ab = {};
}, glPixelStorei:function(a, b) {
  3317 == a && (Fd = b);
  X.pixelStorei(a, b);
}, glPolygonOffset:function(a, b) {
  X.polygonOffset(a, b);
}, glReadBuffer:function(a) {
  X.readBuffer(a);
}, glRenderbufferStorageMultisample:function(a, b, c, d, e) {
  X.renderbufferStorageMultisample(a, b, c, d, e);
}, glScissor:function(a, b, c, d) {
  X.scissor(a, b, c, d);
}, glShaderSource:function(a, b, c, d) {
  for (var e = "", g = 0; g < b; ++g) {
    var h = d ? B[d + 4 * g >> 2] : -1;
    e += G(B[c + 4 * g >> 2], 0 > h ? void 0 : h);
  }
  X.shaderSource(Bd[a], e);
}, glStencilFunc:function(a, b, c) {
  X.stencilFunc(a, b, c);
}, glStencilFuncSeparate:function(a, b, c, d) {
  X.stencilFuncSeparate(a, b, c, d);
}, glStencilMask:function(a) {
  X.stencilMask(a);
}, glStencilOp:function(a, b, c) {
  X.stencilOp(a, b, c);
}, glStencilOpSeparate:function(a, b, c, d) {
  X.stencilOpSeparate(a, b, c, d);
}, glTexImage2D:function(a, b, c, d, e, g, h, k, m) {
  if (2 <= V.version) {
    if (X.T) {
      X.texImage2D(a, b, c, d, e, g, h, k, m);
    } else if (m) {
      var r = ee(k);
      X.texImage2D(a, b, c, d, e, g, h, k, r, m >> fe(r));
    } else {
      X.texImage2D(a, b, c, d, e, g, h, k, null);
    }
  } else {
    X.texImage2D(a, b, c, d, e, g, h, k, m ? ge(k, h, d, e, m) : null);
  }
}, glTexImage3D:function(a, b, c, d, e, g, h, k, m, r) {
  if (X.T) {
    X.texImage3D(a, b, c, d, e, g, h, k, m, r);
  } else if (r) {
    var t = ee(m);
    X.texImage3D(a, b, c, d, e, g, h, k, m, t, r >> fe(t));
  } else {
    X.texImage3D(a, b, c, d, e, g, h, k, m, null);
  }
}, glTexParameterf:function(a, b, c) {
  X.texParameterf(a, b, c);
}, glTexParameteri:function(a, b, c) {
  X.texParameteri(a, b, c);
}, glTexSubImage2D:function(a, b, c, d, e, g, h, k, m) {
  if (2 <= V.version) {
    if (X.T) {
      X.texSubImage2D(a, b, c, d, e, g, h, k, m);
    } else if (m) {
      var r = ee(k);
      X.texSubImage2D(a, b, c, d, e, g, h, k, r, m >> fe(r));
    } else {
      X.texSubImage2D(a, b, c, d, e, g, h, k, null);
    }
  } else {
    r = null, m && (r = ge(k, h, e, g, m)), X.texSubImage2D(a, b, c, d, e, g, h, k, r);
  }
}, glTexSubImage3D:function(a, b, c, d, e, g, h, k, m, r, t) {
  if (X.T) {
    X.texSubImage3D(a, b, c, d, e, g, h, k, m, r, t);
  } else if (t) {
    var u = ee(r);
    X.texSubImage3D(a, b, c, d, e, g, h, k, m, r, u, t >> fe(u));
  } else {
    X.texSubImage3D(a, b, c, d, e, g, h, k, m, r, null);
  }
}, glUniform1fv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform1fv(Y(a), D, c >> 2, b);
  } else {
    if (288 >= b) {
      for (var d = he[b - 1], e = 0; e < b; ++e) {
        d[e] = D[c + 4 * e >> 2];
      }
    } else {
      d = D.subarray(c >> 2, c + 4 * b >> 2);
    }
    X.uniform1fv(Y(a), d);
  }
}, glUniform1i:function(a, b) {
  X.uniform1i(Y(a), b);
}, glUniform1iv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform1iv(Y(a), B, c >> 2, b);
  } else {
    if (288 >= b) {
      for (var d = ie[b - 1], e = 0; e < b; ++e) {
        d[e] = B[c + 4 * e >> 2];
      }
    } else {
      d = B.subarray(c >> 2, c + 4 * b >> 2);
    }
    X.uniform1iv(Y(a), d);
  }
}, glUniform2fv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform2fv(Y(a), D, c >> 2, 2 * b);
  } else {
    if (144 >= b) {
      for (var d = he[2 * b - 1], e = 0; e < 2 * b; e += 2) {
        d[e] = D[c + 4 * e >> 2], d[e + 1] = D[c + (4 * e + 4) >> 2];
      }
    } else {
      d = D.subarray(c >> 2, c + 8 * b >> 2);
    }
    X.uniform2fv(Y(a), d);
  }
}, glUniform2iv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform2iv(Y(a), B, c >> 2, 2 * b);
  } else {
    if (144 >= b) {
      for (var d = ie[2 * b - 1], e = 0; e < 2 * b; e += 2) {
        d[e] = B[c + 4 * e >> 2], d[e + 1] = B[c + (4 * e + 4) >> 2];
      }
    } else {
      d = B.subarray(c >> 2, c + 8 * b >> 2);
    }
    X.uniform2iv(Y(a), d);
  }
}, glUniform3fv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform3fv(Y(a), D, c >> 2, 3 * b);
  } else {
    if (96 >= b) {
      for (var d = he[3 * b - 1], e = 0; e < 3 * b; e += 3) {
        d[e] = D[c + 4 * e >> 2], d[e + 1] = D[c + (4 * e + 4) >> 2], d[e + 2] = D[c + (4 * e + 8) >> 2];
      }
    } else {
      d = D.subarray(c >> 2, c + 12 * b >> 2);
    }
    X.uniform3fv(Y(a), d);
  }
}, glUniform3iv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform3iv(Y(a), B, c >> 2, 3 * b);
  } else {
    if (96 >= b) {
      for (var d = ie[3 * b - 1], e = 0; e < 3 * b; e += 3) {
        d[e] = B[c + 4 * e >> 2], d[e + 1] = B[c + (4 * e + 4) >> 2], d[e + 2] = B[c + (4 * e + 8) >> 2];
      }
    } else {
      d = B.subarray(c >> 2, c + 12 * b >> 2);
    }
    X.uniform3iv(Y(a), d);
  }
}, glUniform4fv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform4fv(Y(a), D, c >> 2, 4 * b);
  } else {
    if (72 >= b) {
      var d = he[4 * b - 1], e = D;
      c >>= 2;
      for (var g = 0; g < 4 * b; g += 4) {
        var h = c + g;
        d[g] = e[h];
        d[g + 1] = e[h + 1];
        d[g + 2] = e[h + 2];
        d[g + 3] = e[h + 3];
      }
    } else {
      d = D.subarray(c >> 2, c + 16 * b >> 2);
    }
    X.uniform4fv(Y(a), d);
  }
}, glUniform4iv:function(a, b, c) {
  if (2 <= V.version) {
    b && X.uniform4iv(Y(a), B, c >> 2, 4 * b);
  } else {
    if (72 >= b) {
      for (var d = ie[4 * b - 1], e = 0; e < 4 * b; e += 4) {
        d[e] = B[c + 4 * e >> 2], d[e + 1] = B[c + (4 * e + 4) >> 2], d[e + 2] = B[c + (4 * e + 8) >> 2], d[e + 3] = B[c + (4 * e + 12) >> 2];
      }
    } else {
      d = B.subarray(c >> 2, c + 16 * b >> 2);
    }
    X.uniform4iv(Y(a), d);
  }
}, glUniformMatrix4fv:function(a, b, c, d) {
  if (2 <= V.version) {
    b && X.uniformMatrix4fv(Y(a), !!c, D, d >> 2, 16 * b);
  } else {
    if (18 >= b) {
      var e = he[16 * b - 1], g = D;
      d >>= 2;
      for (var h = 0; h < 16 * b; h += 16) {
        var k = d + h;
        e[h] = g[k];
        e[h + 1] = g[k + 1];
        e[h + 2] = g[k + 2];
        e[h + 3] = g[k + 3];
        e[h + 4] = g[k + 4];
        e[h + 5] = g[k + 5];
        e[h + 6] = g[k + 6];
        e[h + 7] = g[k + 7];
        e[h + 8] = g[k + 8];
        e[h + 9] = g[k + 9];
        e[h + 10] = g[k + 10];
        e[h + 11] = g[k + 11];
        e[h + 12] = g[k + 12];
        e[h + 13] = g[k + 13];
        e[h + 14] = g[k + 14];
        e[h + 15] = g[k + 15];
      }
    } else {
      e = D.subarray(d >> 2, d + 64 * b >> 2);
    }
    X.uniformMatrix4fv(Y(a), !!c, e);
  }
}, glUseProgram:function(a) {
  a = T[a];
  X.useProgram(a);
  X.Pb = a;
}, glVertexAttribDivisor:function(a, b) {
  X.vertexAttribDivisor(a, b);
}, glVertexAttribPointer:function(a, b, c, d, e, g) {
  X.vertexAttribPointer(a, b, c, !!d, e, g);
}, glViewport:function(a, b, c, d) {
  X.viewport(a, b, c, d);
}, jsAddFileInputEventListener:function() {
  document.getElementById("fileInput").addEventListener("change", jb, !1);
}, jsLog:function(a) {
  console.log(G(a));
}, jsOpenLink:function(a) {
  a = G(a);
  console.log(a);
  var b = document.createElement("a");
  b.href = a;
  b.target = "_blank";
  b.Ec = "display: none; cursor: pointer;";
  b.click();
  b.remove();
}, jsShowFileChooser:function() {
  document.getElementById("fileInput").click();
}, sapp_js_add_beforeunload_listener:function() {
  f.rb = a => {
    0 != ve() && (a.preventDefault(), a.returnValue = " ");
  };
  window.addEventListener("beforeunload", f.rb);
}, sapp_js_add_clipboard_listener:function() {
  f.xb = a => {
    const b = a.clipboardData.getData("text");
    Kc(() => {
      const c = ne(b);
      we(c);
    });
  };
  window.addEventListener("paste", f.xb);
}, sapp_js_add_dragndrop_listeners:function(a) {
  f.Rc = [];
  a = G(a);
  a = document.getElementById(a);
  f.sb = b => {
    b.stopPropagation();
    b.preventDefault();
  };
  f.tb = b => {
    b.stopPropagation();
    b.preventDefault();
  };
  f.ub = b => {
    b.stopPropagation();
    b.preventDefault();
  };
  f.vb = b => {
    b.stopPropagation();
    b.preventDefault();
    const c = b.dataTransfer.files;
    f.wb = c;
    xe(c.length);
    for (let e = 0; e < c.length; e++) {
      Kc(() => {
        const g = ne(c[e].name);
        ye(e, g);
      });
    }
    let d = 0;
    b.shiftKey && (d |= 1);
    b.ctrlKey && (d |= 2);
    b.altKey && (d |= 4);
    b.metaKey && (d |= 8);
    ze(b.clientX, b.clientY, d);
  };
  a.addEventListener("dragenter", f.sb, !1);
  a.addEventListener("dragleave", f.tb, !1);
  a.addEventListener("dragover", f.ub, !1);
  a.addEventListener("drop", f.vb, !1);
}, sapp_js_clear_favicon:function() {
  const a = document.getElementById("sokol-app-favicon");
  a && document.head.removeChild(a);
}, sapp_js_create_textfield:function() {
  const a = document.createElement("input");
  a.type = "text";
  a.id = "_sokol_app_input_element";
  a.autocapitalize = "none";
  a.addEventListener("focusout", function() {
    Ae();
  });
  document.body.append(a);
}, sapp_js_dropped_file_size:function(a) {
  const b = f.wb;
  return 0 > a || a >= b.length ? 0 : b[a].size;
}, sapp_js_fetch_dropped_file:function(a, b, c, d, e) {
  const g = new FileReader();
  g.onload = h => {
    h = h.target.result;
    h.byteLength > d ? Be(a, 0, 1, b, 0, c, d, e) : (v.set(new Uint8Array(h), c), Be(a, 1, 0, b, h.byteLength, c, d, e));
  };
  g.onerror = () => {
    Be(a, 0, 2, b, 0, c, d, e);
  };
  g.readAsArrayBuffer(f.wb[a]);
}, sapp_js_focus_textfield:function() {
  document.getElementById("_sokol_app_input_element").focus();
}, sapp_js_init:function(a) {
  a = G(a);
  f.$ = document.getElementById(a);
  f.$ || console.log("sokol_app.h: invalid target:" + a);
  f.$.requestPointerLock || console.log("sokol_app.h: target doesn't support requestPointerLock:" + a);
}, sapp_js_remove_beforeunload_listener:function() {
  window.removeEventListener("beforeunload", f.rb);
}, sapp_js_remove_clipboard_listener:function() {
  window.removeEventListener("paste", f.xb);
}, sapp_js_remove_dragndrop_listeners:function(a) {
  a = G(a);
  a = document.getElementById(a);
  a.removeEventListener("dragenter", f.sb);
  a.removeEventListener("dragleave", f.tb);
  a.removeEventListener("dragover", f.ub);
  a.removeEventListener("drop", f.vb);
}, sapp_js_request_pointerlock:function() {
  f.$ && f.$.requestPointerLock && f.$.requestPointerLock();
}, sapp_js_set_cursor:function(a, b) {
  if (f.$) {
    if (0 === b) {
      a = "none";
    } else {
      switch(a) {
        case 0:
          a = "auto";
          break;
        case 1:
          a = "default";
          break;
        case 2:
          a = "text";
          break;
        case 3:
          a = "crosshair";
          break;
        case 4:
          a = "pointer";
          break;
        case 5:
          a = "ew-resize";
          break;
        case 6:
          a = "ns-resize";
          break;
        case 7:
          a = "nwse-resize";
          break;
        case 8:
          a = "nesw-resize";
          break;
        case 9:
          a = "all-scroll";
          break;
        case 10:
          a = "not-allowed";
          break;
        default:
          a = "auto";
      }
    }
    f.$.style.cursor = a;
  }
}, sapp_js_set_favicon:function(a, b, c) {
  const d = document.createElement("canvas");
  d.width = a;
  d.height = b;
  const e = d.getContext("2d"), g = e.createImageData(a, b);
  g.data.set(v.subarray(c, c + a * b * 4));
  e.putImageData(g, 0, 0);
  a = document.createElement("link");
  a.id = "sokol-app-favicon";
  a.rel = "shortcut icon";
  a.href = d.toDataURL();
  document.head.appendChild(a);
}, sapp_js_unfocus_textfield:function() {
  document.getElementById("_sokol_app_input_element").blur();
}, sapp_js_write_clipboard:function(a) {
  a = G(a);
  const b = document.createElement("textarea");
  b.setAttribute("autocomplete", "off");
  b.setAttribute("autocorrect", "off");
  b.setAttribute("autocapitalize", "off");
  b.setAttribute("spellcheck", "false");
  b.style.left = "-100px";
  b.style.top = "-100px";
  b.style.height = 1;
  b.style.width = 1;
  b.value = a;
  document.body.appendChild(b);
  b.select();
  document.execCommand("copy");
  document.body.removeChild(b);
}, sfetch_js_send_get_request:function(a, b, c, d, e, g) {
  b = G(b);
  const h = new XMLHttpRequest();
  h.open("GET", b);
  h.responseType = "arraybuffer";
  const k = 0 < d;
  k && h.setRequestHeader("Range", "bytes=" + c + "-" + (c + d - 1));
  h.onreadystatechange = function() {
    if (h.readyState == XMLHttpRequest.DONE) {
      if (206 == h.status || 200 == h.status && !k) {
        const m = new Uint8Array(h.response), r = m.length;
        r <= g ? (v.set(m, e), Ce(a, d, r)) : De(a);
      } else {
        Ee(a, h.status);
      }
    }
  };
  h.send();
}, simgui_js_is_osx:function() {
  return navigator.userAgent.includes("Macintosh") ? 1 : 0;
}, strftime_l:function(a, b, c, d) {
  return me(a, b, c, d);
}};
(function() {
  function a(d) {
    d = d.exports;
    f.asm = d;
    wa = f.asm.memory;
    assert(wa, "memory not found in wasm exports");
    var e = wa.buffer;
    f.HEAP8 = q = new Int8Array(e);
    f.HEAP16 = za = new Int16Array(e);
    f.HEAP32 = B = new Int32Array(e);
    f.HEAPU8 = v = new Uint8Array(e);
    f.HEAPU16 = z = new Uint16Array(e);
    f.HEAPU32 = C = new Uint32Array(e);
    f.HEAPF32 = D = new Float32Array(e);
    f.HEAPF64 = Aa = new Float64Array(e);
    Ba = f.asm.__indirect_function_table;
    assert(Ba, "table not found in wasm exports");
    Ja.unshift(f.asm.__wasm_call_ctors);
    Va("wasm-instantiate");
    return d;
  }
  var b = {env:Fe, wasi_snapshot_preview1:Fe,};
  Ua("wasm-instantiate");
  var c = f;
  if (f.instantiateWasm) {
    try {
      return f.instantiateWasm(b, a);
    } catch (d) {
      return l("Module.instantiateWasm callback failed with error: " + d), !1;
    }
  }
  db(b, function(d) {
    assert(f === c, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    c = null;
    a(d.instance);
  });
  return {};
})();
var O = F("malloc"), Dc = F("free"), kb = f._createBuffer = F("createBuffer"), mb = f._deleteBuffer = F("deleteBuffer"), lb = f._notifyImageAvailable = F("notifyImageAvailable"), Ae = f.__sapp_emsc_notify_keyboard_hidden = F("_sapp_emsc_notify_keyboard_hidden"), we = f.__sapp_emsc_onpaste = F("_sapp_emsc_onpaste"), ve = f.__sapp_html5_get_ask_leave_site = F("_sapp_html5_get_ask_leave_site"), xe = f.__sapp_emsc_begin_drop = F("_sapp_emsc_begin_drop"), ye = f.__sapp_emsc_drop = F("_sapp_emsc_drop"), 
ze = f.__sapp_emsc_end_drop = F("_sapp_emsc_end_drop"), Be = f.__sapp_emsc_invoke_fetch_cb = F("_sapp_emsc_invoke_fetch_cb"), Ge = f._main = F("__main_argc_argv");
f.__sfetch_emsc_head_response = F("_sfetch_emsc_head_response");
var Ce = f.__sfetch_emsc_get_response = F("_sfetch_emsc_get_response"), Ee = f.__sfetch_emsc_failed_http_status = F("_sfetch_emsc_failed_http_status"), De = f.__sfetch_emsc_failed_buffer_too_small = F("_sfetch_emsc_failed_buffer_too_small"), Sb = f._fflush = F("fflush"), Cc = F("__getTypeName");
f.__embind_initialize_bindings = F("_embind_initialize_bindings");
var ue = F("__errno_location");
function He() {
  return (He = f.asm.emscripten_stack_init).apply(null, arguments);
}
function Da() {
  return (Da = f.asm.emscripten_stack_get_end).apply(null, arguments);
}
var Lc = F("stackSave"), Mc = F("stackRestore"), oe = F("stackAlloc");
function Rd() {
  return (Rd = f.asm.emscripten_stack_get_current).apply(null, arguments);
}
f.dynCall_jiji = F("dynCall_jiji");
f.dynCall_viijii = F("dynCall_viijii");
f.dynCall_iiiiij = F("dynCall_iiiiij");
f.dynCall_iiiiijj = F("dynCall_iiiiijj");
f.dynCall_iiiiiijj = F("dynCall_iiiiiijj");
f.___start_em_js = 698764;
f.___stop_em_js = 707176;
f.FS = K;
"emscripten_realloc_buffer inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr getHostByName traverseStack getCallstack emscriptenLog convertPCtoSourceLocation readEmAsmArgs jstoi_s listenOnce autoResumeAudioContext dynCallLegacy getDynCaller dynCall runtimeKeepalivePush runtimeKeepalivePop safeSetTimeout asmjsMangle getNativeTypeSize STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertU32PairToI53 getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString getSocketFromFD getSocketAddress fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace stackTrace checkWasiClock wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags createDyncallWrapper setImmediateWrapped clearImmediateWrapped polyfillSetImmediate getPromise makePromise idsToPromises makePromiseCallback setMainLoop _setNetworkCallback emscriptenWebGLGetUniform emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform writeGLArray runAndAbortIfError SDL_unicode SDL_ttfContext SDL_audio GLFW_Window emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory init_embind throwUnboundTypeError ensureOverloadTable exposePublicSymbol replacePublicSymbol getBasestPointer registerInheritedInstance unregisterInheritedInstance getInheritedInstance getInheritedInstanceCount getLiveInheritedInstances heap32VectorToArray enumReadValueFromPointer runDestructors craftInvokerFunction embind__requireFunction genericPointerToWireType constNoSmartPtrRawPointerToWireType nonConstNoSmartPtrRawPointerToWireType init_RegisteredPointer RegisteredPointer RegisteredPointer_getPointee RegisteredPointer_destructor RegisteredPointer_deleteObject RegisteredPointer_fromWireType runDestructor releaseClassHandle detachFinalizer attachFinalizer makeClassHandle init_ClassHandle ClassHandle ClassHandle_isAliasOf throwInstanceAlreadyDeleted ClassHandle_clone ClassHandle_delete ClassHandle_isDeleted ClassHandle_deleteLater flushPendingDeletes setDelayFunction RegisteredClass shallowCopyInternalPointer downcastPointer upcastPointer validateThis craftEmvalAllocator".split(" ").forEach(function(a) {
  "undefined" === typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get:function() {
    var b = "`" + a + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line", c = a;
    c.startsWith("_") || (c = "$" + a);
    b += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + c + ")";
    gb(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    hb(b);
  }});
  ib(a);
});
"run addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency FS_createFolder FS_createPath FS_createDataFile FS_createLazyFile FS_createLink FS_createDevice FS_unlink out err callMain abort keepRuntimeAlive wasmMemory stackAlloc stackSave stackRestore getTempRet0 setTempRet0 writeStackCookie checkStackCookie ptrToString zeroMemory exitJS getHeapMax abortOnCannotGrowMemory ENV MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE isLeapYear ydayFromDate arraySum addDays ERRNO_CODES ERRNO_MESSAGES setErrNo DNS Protocols Sockets initRandomFill randomFill timers warnOnce UNWIND_CACHE readEmAsmArgsArray jstoi_q getExecutableName handleException callUserCallback maybeExit asyncLoad alignMemory mmapAlloc HandleAllocator writeI53ToI64 readI53FromI64 readI53FromU64 convertI32PairToI53Checked freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString stringToAscii UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory SYSCALLS JSEvents registerKeyEventCallback specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback currentFullscreenStrategy restoreOldWindowedStyle fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback registerTouchEventCallback demangle demangleAll ExitStatus getEnvStrings doReadv doWritev dlopenMissingError promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser wget preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType heapAccessShiftForWebGLHeap webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw GL emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData __glGenObject webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscripten_webgl_power_preferences registerWebGlEventCallback AL GLUT EGL GLEW IDBStore SDL SDL_gfx GLFW webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance allocateUTF8 allocateUTF8OnStack Fetch fetchDeleteCachedData fetchLoadCachedData fetchCacheData fetchXHR InternalError BindingError UnboundTypeError PureVirtualError throwInternalError throwBindingError extendError createNamedFunction embindRepr registeredInstances registeredTypes awaitingDependencies typeDependencies registeredPointers registerType whenDependentTypesAreResolved embind_charCodes embind_init_charCodes readLatin1String getTypeName requireRegisteredType getShiftFromSize integerReadValueFromPointer floatReadValueFromPointer simpleReadValueFromPointer newFunc tupleRegistrations structRegistrations finalizationRegistry detachFinalizer_deps deletionQueue delayFunction char_0 char_9 makeLegalFunctionName emval_handles emval_symbols init_emval count_emval_handles getStringOrSymbol Emval emval_newers emval_get_global emval_lookupTypes emval_allocateDestructors emval_methodCallers emval_addMethodCaller emval_registeredMethods".split(" ").forEach(ib);
var Ie;
Ra = function Je() {
  Ie || Ke();
  Ie || (Ra = Je);
};
function Le(a = []) {
  assert(0 == Pa, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(0 == Ia.length, "cannot call main when preRun functions remain to be called");
  a.unshift(da);
  var b = a.length, c = oe(4 * (b + 1)), d = c >> 2;
  a.forEach(g => {
    B[d++] = ne(g);
  });
  B[d] = 0;
  try {
    var e = Ge(b, c);
    Sd(e, !0);
  } catch (g) {
    Qd(g);
  }
}
function Ke() {
  var a = ca;
  function b() {
    if (!Ie && (Ie = !0, f.calledRun = !0, !xa)) {
      assert(!Na);
      Na = !0;
      Ea();
      f.noFSInit || K.U.sa || K.U();
      K.mb = !1;
      nb(Ja);
      Ea();
      nb(Ka);
      if (f.onRuntimeInitialized) {
        f.onRuntimeInitialized();
      }
      Me && Le(a);
      Ea();
      if (f.postRun) {
        for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
          var c = f.postRun.shift();
          Ma.unshift(c);
        }
      }
      nb(Ma);
    }
  }
  if (!(0 < Pa)) {
    He();
    Ca();
    if (f.preRun) {
      for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) {
        Oa();
      }
    }
    nb(Ia);
    0 < Pa || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        f.setStatus("");
      }, 1);
      b();
    }, 1)) : b(), Ea());
  }
}
function Td() {
  var a = ta, b = l, c = !1;
  ta = l = () => {
    c = !0;
  };
  try {
    Sb(0), ["stdout", "stderr"].forEach(function(d) {
      (d = K.Ua("/dev/" + d)) && (d = Fb[d.object.rdev]) && d.output && d.output.length && (c = !0);
    });
  } catch (d) {
  }
  ta = a;
  l = b;
  c && hb("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.");
}
if (f.preInit) {
  for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) {
    f.preInit.pop()();
  }
}
var Me = !0;
f.noInitialRun && (Me = !1);
Ke();

