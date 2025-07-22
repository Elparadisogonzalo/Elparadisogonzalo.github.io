(function(){var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(array) {
  var index = 0;
  return function() {
    return index < array.length ? {done:!1, value:array[index++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(array) {
  return {next:$jscomp.arrayIteratorImpl(array)};
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_ES6 = !1;
$jscomp.ASSUME_ES2020 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.INSTRUMENT_ASYNC_CONTEXT = !0;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function(target, property, descriptor) {
  if (target == Array.prototype || target == Object.prototype) {
    return target;
  }
  target[property] = descriptor.value;
  return target;
};
$jscomp.getGlobal = function(passedInThis) {
  for (var possibleGlobals = ["object" == typeof globalThis && globalThis, passedInThis, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global], i = 0; i < possibleGlobals.length; ++i) {
    var maybeGlobal = possibleGlobals[i];
    if (maybeGlobal && maybeGlobal.Math == Math) {
      return maybeGlobal;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.ASSUME_ES2020 ? globalThis : $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = typeof Symbol === "function" && typeof Symbol("x") === "symbol";
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.polyfill = function(target, polyfill, fromLang, toLang) {
  polyfill && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(target, polyfill, fromLang, toLang) : $jscomp.polyfillUnisolated(target, polyfill, fromLang, toLang));
};
$jscomp.polyfillUnisolated = function(target, polyfill) {
  for (var obj = $jscomp.global, split = target.split("."), i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in obj)) {
      return;
    }
    obj = obj[key];
  }
  var property = split[split.length - 1], orig = obj[property], impl = polyfill(orig);
  impl != orig && impl != null && $jscomp.defineProperty(obj, property, {configurable:!0, writable:!0, value:impl});
};
$jscomp.polyfillIsolated = function(target, polyfill, fromLang) {
  var split = target.split("."), isSimpleName = split.length === 1, root = split[0];
  var ownerObject = !isSimpleName && root in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in ownerObject)) {
      return;
    }
    ownerObject = ownerObject[key];
  }
  var property = split[split.length - 1], nativeImpl = $jscomp.IS_SYMBOL_NATIVE && fromLang === "es6" ? ownerObject[property] : null, impl = polyfill(nativeImpl);
  if (impl != null) {
    if (isSimpleName) {
      $jscomp.defineProperty($jscomp.polyfills, property, {configurable:!0, writable:!0, value:impl});
    } else if (impl !== nativeImpl) {
      if ($jscomp.propertyToPolyfillSymbol[property] === void 0) {
        var BIN_ID = Math.random() * 1E9 >>> 0;
        $jscomp.propertyToPolyfillSymbol[property] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(property) : $jscomp.POLYFILL_PREFIX + BIN_ID + "$" + property;
      }
      var obfuscatedName = $jscomp.propertyToPolyfillSymbol[property];
      $jscomp.defineProperty(ownerObject, obfuscatedName, {configurable:!0, writable:!0, value:impl});
    }
  }
};
$jscomp.initSymbol = function() {
};
$jscomp.polyfill("Symbol", function(orig) {
  if (orig) {
    return orig;
  }
  var SymbolClass = function(id, opt_description) {
    this.$jscomp$symbol$id_ = id;
    $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:opt_description});
  };
  SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var BIN_ID = Math.random() * 1E9 >>> 0, SYMBOL_PREFIX = "jscomp_symbol_" + BIN_ID + "_", counter = 0, symbolPolyfill = function(opt_description) {
    if (this instanceof symbolPolyfill) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new SymbolClass(SYMBOL_PREFIX + (opt_description || "") + "_" + counter++, opt_description);
  };
  return symbolPolyfill;
}, "es6", "es3");
$jscomp.polyfill("Symbol.iterator", function(orig) {
  if (orig) {
    return orig;
  }
  for (var symbolIterator = Symbol("Symbol.iterator"), arrayLikes = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), i = 0; i < arrayLikes.length; i++) {
    var ArrayLikeCtor = $jscomp.global[arrayLikes[i]];
    typeof ArrayLikeCtor === "function" && typeof ArrayLikeCtor.prototype[symbolIterator] != "function" && $jscomp.defineProperty(ArrayLikeCtor.prototype, symbolIterator, {configurable:!0, writable:!0, value:function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
    }});
  }
  return symbolIterator;
}, "es6", "es3");
$jscomp.iteratorPrototype = function(next) {
  var iterator = {next:next};
  iterator[Symbol.iterator] = function() {
    return this;
  };
  return iterator;
};
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || typeof Object.create == "function" ? Object.create : function(prototype) {
  var ctor = function() {
  };
  ctor.prototype = prototype;
  return new ctor();
};
$jscomp.getConstructImplementation = function() {
  function reflectConstructWorks() {
    function Base() {
    }
    function Derived() {
    }
    new Base();
    Reflect.construct(Base, [], Derived);
    return new Base() instanceof Base;
  }
  function construct(target, argList, opt_newTarget) {
    opt_newTarget === void 0 && (opt_newTarget = target);
    var proto = opt_newTarget.prototype || Object.prototype, obj = $jscomp.objectCreate(proto), apply = Function.prototype.apply, out = apply.call(target, obj, argList);
    return out || obj;
  }
  if ($jscomp.TRUST_ES6_POLYFILLS && typeof Reflect != "undefined" && Reflect.construct) {
    if (reflectConstructWorks()) {
      return Reflect.construct;
    }
    var brokenConstruct = Reflect.construct, patchedConstruct = function(target, argList, opt_newTarget) {
      var out = brokenConstruct(target, argList);
      opt_newTarget && Reflect.setPrototypeOf(out, opt_newTarget.prototype);
      return out;
    };
    return patchedConstruct;
  }
  return construct;
};
$jscomp.construct = {valueOf:$jscomp.getConstructImplementation}.valueOf();
$jscomp.underscoreProtoCanBeSet = function() {
  var x = {a:!0}, y = {};
  try {
    return y.__proto__ = x, y.a;
  } catch (e) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.ASSUME_ES6 || $jscomp.TRUST_ES6_POLYFILLS && typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(target, proto) {
  target.__proto__ = proto;
  if (target.__proto__ !== proto) {
    throw new TypeError(target + " is not extensible");
  }
  return target;
} : null;
$jscomp.inherits = function(childCtor, parentCtor) {
  childCtor.prototype = $jscomp.objectCreate(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
  if ($jscomp.ASSUME_ES6 || $jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf;
    setPrototypeOf(childCtor, parentCtor);
  } else {
    for (var p in parentCtor) {
      if (p != "prototype") {
        if (Object.defineProperties) {
          var descriptor = Object.getOwnPropertyDescriptor(parentCtor, p);
          descriptor && Object.defineProperty(childCtor, p, descriptor);
        } else {
          childCtor[p] = parentCtor[p];
        }
      }
    }
  }
  childCtor.superClass_ = parentCtor.prototype;
};
$jscomp.makeIterator = function(iterable) {
  var iteratorFunction = typeof Symbol != "undefined" && Symbol.iterator && iterable[Symbol.iterator];
  if (iteratorFunction) {
    return iteratorFunction.call(iterable);
  }
  if (typeof iterable.length == "number") {
    return $jscomp.arrayIterator(iterable);
  }
  throw Error(String(iterable) + " is not an iterable or ArrayLike");
};
$jscomp.arrayFromIterator = function(iterator) {
  for (var i, arr = []; !(i = iterator.next()).done;) {
    arr.push(i.value);
  }
  return arr;
};
$jscomp.arrayFromIterable = function(iterable) {
  return iterable instanceof Array ? iterable : $jscomp.arrayFromIterator($jscomp.makeIterator(iterable));
};
$jscomp.createTemplateTagFirstArg = function(arrayStrings) {
  return $jscomp.createTemplateTagFirstArgWithRaw(arrayStrings, arrayStrings);
};
$jscomp.createTemplateTagFirstArgWithRaw = function(arrayStrings, rawArrayStrings) {
  arrayStrings.raw = rawArrayStrings;
  Object.freeze && (Object.freeze(arrayStrings), Object.freeze(rawArrayStrings));
  return arrayStrings;
};
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(result) {
  if (!(result instanceof Object)) {
    throw new TypeError("Iterator result " + result + " is not an object");
  }
};
$jscomp.generator.Context = function() {
  this.isRunning_ = !1;
  this.yieldAllIterator_ = null;
  this.yieldResult = void 0;
  this.nextAddress = 1;
  this.finallyAddress_ = this.catchAddress_ = 0;
  this.finallyContexts_ = this.abruptCompletion_ = null;
};
$jscomp.generator.Context.prototype.start_ = function() {
  if (this.isRunning_) {
    throw new TypeError("Generator is already running");
  }
  this.isRunning_ = !0;
};
$jscomp.generator.Context.prototype.stop_ = function() {
  this.isRunning_ = !1;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function(value) {
  this.yieldResult = value;
};
$jscomp.generator.Context.prototype.throw_ = function(e) {
  this.abruptCompletion_ = {exception:e, isException:!0};
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype.return = function(value) {
  this.abruptCompletion_ = {return:value};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function(value, resumeAddress) {
  this.nextAddress = resumeAddress;
  return {value:value};
};
$jscomp.generator.Context.prototype.jumpTo = function(nextAddress) {
  this.nextAddress = nextAddress;
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(finallyAddress) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = finallyAddress || 0;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(nextCatchAddress, nextFinallyAddress, finallyDepth) {
  finallyDepth ? this.finallyContexts_[finallyDepth] = this.abruptCompletion_ : this.finallyContexts_ = [this.abruptCompletion_];
  this.catchAddress_ = nextCatchAddress || 0;
  this.finallyAddress_ = nextFinallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(nextAddress, finallyDepth) {
  var preservedContext = this.finallyContexts_.splice(finallyDepth || 0)[0], abruptCompletion = this.abruptCompletion_ = this.abruptCompletion_ || preservedContext;
  if (abruptCompletion) {
    if (abruptCompletion.isException) {
      return this.jumpToErrorHandler_();
    }
    abruptCompletion.jumpTo != void 0 && this.finallyAddress_ < abruptCompletion.jumpTo ? (this.nextAddress = abruptCompletion.jumpTo, this.abruptCompletion_ = null) : this.nextAddress = this.finallyAddress_;
  } else {
    this.nextAddress = nextAddress;
  }
};
$jscomp.generator.Context.PropertyIterator = function(object) {
  this.properties_ = [];
  for (var property in object) {
    this.properties_.push(property);
  }
  this.properties_.reverse();
};
$jscomp.generator.Engine_ = function(program) {
  this.context_ = new $jscomp.generator.Context();
  this.program_ = program;
};
$jscomp.generator.Engine_.prototype.next_ = function(value) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, value, this.context_.next_);
  }
  this.context_.next_(value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function(value) {
  this.context_.start_();
  var yieldAllIterator = this.context_.yieldAllIterator_;
  if (yieldAllIterator) {
    var returnFunction = "return" in yieldAllIterator ? yieldAllIterator["return"] : function(v) {
      return {value:v, done:!0};
    };
    return this.yieldAllStep_(returnFunction, value, this.context_.return);
  }
  this.context_.return(value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function(exception) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], exception, this.context_.next_);
  }
  this.context_.throw_(exception);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(action, value, nextAction) {
  try {
    var result = action.call(this.context_.yieldAllIterator_, value);
    $jscomp.generator.ensureIteratorResultIsObject_(result);
    if (!result.done) {
      return this.context_.stop_(), result;
    }
    var resultValue = result.value;
  } catch (e) {
    return this.context_.yieldAllIterator_ = null, this.context_.throw_(e), this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  nextAction.call(this.context_, resultValue);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
  for (; this.context_.nextAddress;) {
    try {
      var yieldValue = this.program_(this.context_);
      if (yieldValue) {
        return this.context_.stop_(), {value:yieldValue.value, done:!1};
      }
    } catch (e) {
      this.context_.yieldResult = void 0, this.context_.throw_(e);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    var abruptCompletion = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (abruptCompletion.isException) {
      throw abruptCompletion.exception;
    }
    return {value:abruptCompletion.return, done:!0};
  }
  return {value:void 0, done:!0};
};
$jscomp.generator.Generator_ = function(engine) {
  this.next = function(opt_value) {
    return engine.next_(opt_value);
  };
  this.throw = function(exception) {
    return engine.throw_(exception);
  };
  this.return = function(value) {
    return engine.return_(value);
  };
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(generator, program) {
  var result = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program));
  $jscomp.setPrototypeOf && generator.prototype && $jscomp.setPrototypeOf(result, generator.prototype);
  return result;
};
$jscomp.asyncExecutePromiseGenerator = function(generator) {
  function passValueToGenerator(value) {
    return generator.next(value);
  }
  function passErrorToGenerator(error) {
    return generator.throw(error);
  }
  return new Promise(function(resolve, reject) {
    function handleGeneratorRecord(genRec) {
      genRec.done ? resolve(genRec.value) : Promise.resolve(genRec.value).then(passValueToGenerator, passErrorToGenerator).then(handleGeneratorRecord, reject);
    }
    handleGeneratorRecord(generator.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(generatorFunction) {
  return $jscomp.asyncExecutePromiseGenerator(generatorFunction());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(program) {
  return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program)));
};
$jscomp.getRestArguments = function() {
  for (var startIndex = Number(this), restArgs = [], i = startIndex; i < arguments.length; i++) {
    restArgs[i - startIndex] = arguments[i];
  }
  return restArgs;
};
$jscomp.polyfill("globalThis", function(orig) {
  return orig || $jscomp.global;
}, "es_2020", "es3");
$jscomp.polyfill("Reflect", function(orig) {
  return orig ? orig : {};
}, "es6", "es3");
$jscomp.polyfill("Reflect.construct", function() {
  return $jscomp.construct;
}, "es6", "es3");
$jscomp.polyfill("Reflect.setPrototypeOf", function(orig) {
  if (orig) {
    return orig;
  }
  if ($jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf, polyfill = function(target, proto) {
      try {
        return setPrototypeOf(target, proto), !0;
      } catch (e) {
        return !1;
      }
    };
    return polyfill;
  }
  return null;
}, "es6", "es5");
$jscomp.polyfill("Promise", function(NativePromise) {
  function AsyncExecutor() {
    this.batch_ = null;
  }
  function resolvingPromise(opt_value) {
    return opt_value instanceof PolyfillPromise ? opt_value : new PolyfillPromise(function(resolve) {
      resolve(opt_value);
    });
  }
  if (NativePromise && (!($jscomp.FORCE_POLYFILL_PROMISE || $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && typeof $jscomp.global.PromiseRejectionEvent === "undefined") || !$jscomp.global.Promise || $jscomp.global.Promise.toString().indexOf("[native code]") === -1)) {
    return NativePromise;
  }
  AsyncExecutor.prototype.asyncExecute = function(f) {
    if (this.batch_ == null) {
      this.batch_ = [];
      var self = this;
      this.asyncExecuteFunction(function() {
        self.executeBatch_();
      });
    }
    this.batch_.push(f);
  };
  var nativeSetTimeout = $jscomp.global.setTimeout;
  AsyncExecutor.prototype.asyncExecuteFunction = function(f) {
    nativeSetTimeout(f, 0);
  };
  AsyncExecutor.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var executingBatch = this.batch_;
      this.batch_ = [];
      for (var i = 0; i < executingBatch.length; ++i) {
        var f = executingBatch[i];
        executingBatch[i] = null;
        try {
          f();
        } catch (error) {
          this.asyncThrow_(error);
        }
      }
    }
    this.batch_ = null;
  };
  AsyncExecutor.prototype.asyncThrow_ = function(exception) {
    this.asyncExecuteFunction(function() {
      throw exception;
    });
  };
  var PromiseState = {PENDING:0, FULFILLED:1, REJECTED:2}, PolyfillPromise = function(executor) {
    this.state_ = PromiseState.PENDING;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var resolveAndReject = this.createResolveAndReject_();
    try {
      executor(resolveAndReject.resolve, resolveAndReject.reject);
    } catch (e) {
      resolveAndReject.reject(e);
    }
  };
  PolyfillPromise.prototype.createResolveAndReject_ = function() {
    function firstCallWins(method) {
      return function(x) {
        alreadyCalled || (alreadyCalled = !0, method.call(thisPromise, x));
      };
    }
    var thisPromise = this, alreadyCalled = !1;
    return {resolve:firstCallWins(this.resolveTo_), reject:firstCallWins(this.reject_)};
  };
  PolyfillPromise.prototype.resolveTo_ = function(value) {
    if (value === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (value instanceof PolyfillPromise) {
      this.settleSameAsPromise_(value);
    } else {
      a: {
        switch(typeof value) {
          case "object":
            var JSCompiler_inline_result = value != null;
            break a;
          case "function":
            JSCompiler_inline_result = !0;
            break a;
          default:
            JSCompiler_inline_result = !1;
        }
      }
      JSCompiler_inline_result ? this.resolveToNonPromiseObj_(value) : this.fulfill_(value);
    }
  };
  PolyfillPromise.prototype.resolveToNonPromiseObj_ = function(obj) {
    var thenMethod = void 0;
    try {
      thenMethod = obj.then;
    } catch (error) {
      this.reject_(error);
      return;
    }
    typeof thenMethod == "function" ? this.settleSameAsThenable_(thenMethod, obj) : this.fulfill_(obj);
  };
  PolyfillPromise.prototype.reject_ = function(reason) {
    this.settle_(PromiseState.REJECTED, reason);
  };
  PolyfillPromise.prototype.fulfill_ = function(value) {
    this.settle_(PromiseState.FULFILLED, value);
  };
  PolyfillPromise.prototype.settle_ = function(settledState, valueOrReason) {
    if (this.state_ != PromiseState.PENDING) {
      throw Error("Cannot settle(" + settledState + ", " + valueOrReason + "): Promise already settled in state" + this.state_);
    }
    this.state_ = settledState;
    this.result_ = valueOrReason;
    this.state_ === PromiseState.REJECTED && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  PolyfillPromise.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var self = this;
    nativeSetTimeout(function() {
      if (self.notifyUnhandledRejection_()) {
        var nativeConsole = $jscomp.global.console;
        typeof nativeConsole !== "undefined" && nativeConsole.error(self.result_);
      }
    }, 1);
  };
  PolyfillPromise.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var NativeCustomEvent = $jscomp.global.CustomEvent, NativeEvent = $jscomp.global.Event, nativeDispatchEvent = $jscomp.global.dispatchEvent;
    if (typeof nativeDispatchEvent === "undefined") {
      return !0;
    }
    if (typeof NativeCustomEvent === "function") {
      var event = new NativeCustomEvent("unhandledrejection", {cancelable:!0});
    } else {
      typeof NativeEvent === "function" ? event = new NativeEvent("unhandledrejection", {cancelable:!0}) : (event = $jscomp.global.document.createEvent("CustomEvent"), event.initCustomEvent("unhandledrejection", !1, !0, event));
    }
    event.promise = this;
    event.reason = this.result_;
    return nativeDispatchEvent(event);
  };
  PolyfillPromise.prototype.executeOnSettledCallbacks_ = function() {
    if (this.onSettledCallbacks_ != null) {
      for (var i = 0; i < this.onSettledCallbacks_.length; ++i) {
        asyncExecutor.asyncExecute(this.onSettledCallbacks_[i]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var asyncExecutor = new AsyncExecutor();
  PolyfillPromise.prototype.settleSameAsPromise_ = function(promise) {
    var methods = this.createResolveAndReject_();
    promise.callWhenSettled_(methods.resolve, methods.reject);
  };
  PolyfillPromise.prototype.settleSameAsThenable_ = function(thenMethod, thenable) {
    var methods = this.createResolveAndReject_();
    try {
      thenMethod.call(thenable, methods.resolve, methods.reject);
    } catch (error) {
      methods.reject(error);
    }
  };
  PolyfillPromise.prototype.then = function(onFulfilled, onRejected) {
    function createCallback(paramF, defaultF) {
      return typeof paramF == "function" ? function(x) {
        try {
          resolveChild(paramF(x));
        } catch (error) {
          rejectChild(error);
        }
      } : defaultF;
    }
    var resolveChild, rejectChild, childPromise = new PolyfillPromise(function(resolve, reject) {
      resolveChild = resolve;
      rejectChild = reject;
    });
    this.callWhenSettled_(createCallback(onFulfilled, resolveChild), createCallback(onRejected, rejectChild));
    return childPromise;
  };
  PolyfillPromise.prototype.catch = function(onRejected) {
    return this.then(void 0, onRejected);
  };
  PolyfillPromise.prototype.callWhenSettled_ = function(onFulfilled, onRejected) {
    function callback() {
      switch(thisPromise.state_) {
        case PromiseState.FULFILLED:
          onFulfilled(thisPromise.result_);
          break;
        case PromiseState.REJECTED:
          onRejected(thisPromise.result_);
          break;
        default:
          throw Error("Unexpected state: " + thisPromise.state_);
      }
    }
    var thisPromise = this;
    this.onSettledCallbacks_ == null ? asyncExecutor.asyncExecute(callback) : this.onSettledCallbacks_.push(callback);
    this.isRejectionHandled_ = !0;
  };
  PolyfillPromise.resolve = resolvingPromise;
  PolyfillPromise.reject = function(opt_reason) {
    return new PolyfillPromise(function(resolve, reject) {
      reject(opt_reason);
    });
  };
  PolyfillPromise.race = function(thenablesOrValues) {
    return new PolyfillPromise(function(resolve, reject) {
      for (var iterator = $jscomp.makeIterator(thenablesOrValues), iterRec = iterator.next(); !iterRec.done; iterRec = iterator.next()) {
        resolvingPromise(iterRec.value).callWhenSettled_(resolve, reject);
      }
    });
  };
  PolyfillPromise.all = function(thenablesOrValues) {
    var iterator = $jscomp.makeIterator(thenablesOrValues), iterRec = iterator.next();
    return iterRec.done ? resolvingPromise([]) : new PolyfillPromise(function(resolveAll, rejectAll) {
      function onFulfilled(i) {
        return function(ithResult) {
          resultsArray[i] = ithResult;
          unresolvedCount--;
          unresolvedCount == 0 && resolveAll(resultsArray);
        };
      }
      var resultsArray = [], unresolvedCount = 0;
      do {
        resultsArray.push(void 0), unresolvedCount++, resolvingPromise(iterRec.value).callWhenSettled_(onFulfilled(resultsArray.length - 1), rejectAll), iterRec = iterator.next();
      } while (!iterRec.done);
    });
  };
  return PolyfillPromise;
}, "es6", "es3");
$jscomp.polyfill("Object.setPrototypeOf", function(orig) {
  return orig || $jscomp.setPrototypeOf;
}, "es6", "es5");
$jscomp.owns = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
$jscomp.assign = $jscomp.TRUST_ES6_POLYFILLS && typeof Object.assign == "function" ? Object.assign : function(target, var_args) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source) {
      for (var key in source) {
        $jscomp.owns(source, key) && (target[key] = source[key]);
      }
    }
  }
  return target;
};
$jscomp.polyfill("Object.assign", function(orig) {
  return orig || $jscomp.assign;
}, "es6", "es3");
$jscomp.polyfill("Symbol.dispose", function(orig) {
  return orig ? orig : Symbol("Symbol.dispose");
}, "es_next", "es3");
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var proxied = {}, proxy = Object.create(new $jscomp.global.Proxy(proxied, {get:function(target, key, receiver) {
      return target == proxied && key == "q" && receiver == proxy;
    }}));
    return proxy.q === !0;
  } catch (err) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.polyfill("WeakMap", function(NativeWeakMap) {
  function isConformant() {
    if (!NativeWeakMap || !Object.seal) {
      return !1;
    }
    try {
      var x = Object.seal({}), y = Object.seal({}), map = new NativeWeakMap([[x, 2], [y, 3]]);
      if (map.get(x) != 2 || map.get(y) != 3) {
        return !1;
      }
      map.delete(x);
      map.set(y, 4);
      return !map.has(x) && map.get(y) == 4;
    } catch (err) {
      return !1;
    }
  }
  function WeakMapMembership() {
  }
  function isValidKey(key) {
    var type = typeof key;
    return type === "object" && key !== null || type === "function";
  }
  function insert(target) {
    if (!$jscomp.owns(target, prop)) {
      var obj = new WeakMapMembership();
      $jscomp.defineProperty(target, prop, {value:obj});
    }
  }
  function patch(name) {
    if (!$jscomp.ISOLATE_POLYFILLS) {
      var prev = Object[name];
      prev && (Object[name] = function(target) {
        if (target instanceof WeakMapMembership) {
          return target;
        }
        Object.isExtensible(target) && insert(target);
        return prev(target);
      });
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakMap && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakMap;
    }
  } else {
    if (isConformant()) {
      return NativeWeakMap;
    }
  }
  var prop = "$jscomp_hidden_" + Math.random();
  patch("freeze");
  patch("preventExtensions");
  patch("seal");
  var index = 0, PolyfillWeakMap = function(opt_iterable) {
    this.id_ = (index += Math.random() + 1).toString();
    if (opt_iterable) {
      for (var iter = $jscomp.makeIterator(opt_iterable), entry; !(entry = iter.next()).done;) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillWeakMap.prototype.set = function(key, value) {
    if (!isValidKey(key)) {
      throw Error("Invalid WeakMap key");
    }
    insert(key);
    if (!$jscomp.owns(key, prop)) {
      throw Error("WeakMap key fail: " + key);
    }
    key[prop][this.id_] = value;
    return this;
  };
  PolyfillWeakMap.prototype.get = function(key) {
    return isValidKey(key) && $jscomp.owns(key, prop) ? key[prop][this.id_] : void 0;
  };
  PolyfillWeakMap.prototype.has = function(key) {
    return isValidKey(key) && $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_);
  };
  PolyfillWeakMap.prototype.delete = function(key) {
    return isValidKey(key) && $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_) ? delete key[prop][this.id_] : !1;
  };
  return PolyfillWeakMap;
}, "es6", "es3");
$jscomp.MapEntry = function() {
};
$jscomp.polyfill("Map", function(NativeMap) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !NativeMap || typeof NativeMap != "function" || !NativeMap.prototype.entries || typeof Object.seal != "function") {
      return !1;
    }
    try {
      var key = Object.seal({x:4}), map = new NativeMap($jscomp.makeIterator([[key, "s"]]));
      if (map.get(key) != "s" || map.size != 1 || map.get({x:4}) || map.set({x:4}, "t") != map || map.size != 2) {
        return !1;
      }
      var iter = map.entries(), item = iter.next();
      if (item.done || item.value[0] != key || item.value[1] != "s") {
        return !1;
      }
      item = iter.next();
      return item.done || item.value[0].x != 4 || item.value[1] != "t" || !iter.next().done ? !1 : !0;
    } catch (err) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeMap && $jscomp.ES6_CONFORMANCE) {
      return NativeMap;
    }
  } else {
    if (isConformant()) {
      return NativeMap;
    }
  }
  var idMap = new WeakMap(), PolyfillMap = function(opt_iterable) {
    this[0] = {};
    this[1] = createHead();
    this.size = 0;
    if (opt_iterable) {
      for (var iter = $jscomp.makeIterator(opt_iterable), entry; !(entry = iter.next()).done;) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillMap.prototype.set = function(key, value) {
    key = key === 0 ? 0 : key;
    var r = maybeGetEntry(this, key);
    r.list || (r.list = this[0][r.id] = []);
    r.entry ? r.entry.value = value : (r.entry = {next:this[1], previous:this[1].previous, head:this[1], key:key, value:value}, r.list.push(r.entry), this[1].previous.next = r.entry, this[1].previous = r.entry, this.size++);
    return this;
  };
  PolyfillMap.prototype.delete = function(key) {
    var r = maybeGetEntry(this, key);
    return r.entry && r.list ? (r.list.splice(r.index, 1), r.list.length || delete this[0][r.id], r.entry.previous.next = r.entry.next, r.entry.next.previous = r.entry.previous, r.entry.head = null, this.size--, !0) : !1;
  };
  PolyfillMap.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].previous = createHead();
    this.size = 0;
  };
  PolyfillMap.prototype.has = function(key) {
    return !!maybeGetEntry(this, key).entry;
  };
  PolyfillMap.prototype.get = function(key) {
    var entry = maybeGetEntry(this, key).entry;
    return entry && entry.value;
  };
  PolyfillMap.prototype.entries = function() {
    return makeIterator(this, function(entry) {
      return [entry.key, entry.value];
    });
  };
  PolyfillMap.prototype.keys = function() {
    return makeIterator(this, function(entry) {
      return entry.key;
    });
  };
  PolyfillMap.prototype.values = function() {
    return makeIterator(this, function(entry) {
      return entry.value;
    });
  };
  PolyfillMap.prototype.forEach = function(callback, opt_thisArg) {
    for (var iter = this.entries(), item; !(item = iter.next()).done;) {
      var entry = item.value;
      callback.call(opt_thisArg, entry[1], entry[0], this);
    }
  };
  PolyfillMap.prototype[Symbol.iterator] = PolyfillMap.prototype.entries;
  var maybeGetEntry = function(map, key) {
    var obj = key, type = obj && typeof obj;
    if (type == "object" || type == "function") {
      if (idMap.has(obj)) {
        var id = idMap.get(obj);
      } else {
        var id$jscomp$0 = "" + ++mapIndex;
        idMap.set(obj, id$jscomp$0);
        id = id$jscomp$0;
      }
    } else {
      id = "p_" + obj;
    }
    var list = map[0][id];
    if (list && $jscomp.owns(map[0], id)) {
      for (var index = 0; index < list.length; index++) {
        var entry = list[index];
        if (key !== key && entry.key !== entry.key || key === entry.key) {
          return {id:id, list:list, index:index, entry:entry};
        }
      }
    }
    return {id:id, list:list, index:-1, entry:void 0};
  }, makeIterator = function(map, func) {
    var entry = map[1];
    return $jscomp.iteratorPrototype(function() {
      if (entry) {
        for (; entry.head != map[1];) {
          entry = entry.previous;
        }
        for (; entry.next != entry.head;) {
          return entry = entry.next, {done:!1, value:func(entry)};
        }
        entry = null;
      }
      return {done:!0, value:void 0};
    });
  }, createHead = function() {
    var head = {};
    return head.previous = head.next = head.head = head;
  }, mapIndex = 0;
  return PolyfillMap;
}, "es6", "es3");
$jscomp.polyfill("Set", function(NativeSet) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !NativeSet || typeof NativeSet != "function" || !NativeSet.prototype.entries || typeof Object.seal != "function") {
      return !1;
    }
    try {
      var value = Object.seal({x:4}), set = new NativeSet($jscomp.makeIterator([value]));
      if (!set.has(value) || set.size != 1 || set.add(value) != set || set.size != 1 || set.add({x:4}) != set || set.size != 2) {
        return !1;
      }
      var iter = set.entries(), item = iter.next();
      if (item.done || item.value[0] != value || item.value[1] != value) {
        return !1;
      }
      item = iter.next();
      return item.done || item.value[0] == value || item.value[0].x != 4 || item.value[1] != item.value[0] ? !1 : iter.next().done;
    } catch (err) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeSet && $jscomp.ES6_CONFORMANCE) {
      return NativeSet;
    }
  } else {
    if (isConformant()) {
      return NativeSet;
    }
  }
  var PolyfillSet = function(opt_iterable) {
    this.map_ = new Map();
    if (opt_iterable) {
      for (var iter = $jscomp.makeIterator(opt_iterable), entry; !(entry = iter.next()).done;) {
        var item = entry.value;
        this.add(item);
      }
    }
    this.size = this.map_.size;
  };
  PolyfillSet.prototype.add = function(value) {
    value = value === 0 ? 0 : value;
    this.map_.set(value, value);
    this.size = this.map_.size;
    return this;
  };
  PolyfillSet.prototype.delete = function(value) {
    var result = this.map_.delete(value);
    this.size = this.map_.size;
    return result;
  };
  PolyfillSet.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  PolyfillSet.prototype.has = function(value) {
    return this.map_.has(value);
  };
  PolyfillSet.prototype.entries = function() {
    return this.map_.entries();
  };
  PolyfillSet.prototype.values = function() {
    return this.map_.values();
  };
  PolyfillSet.prototype.keys = PolyfillSet.prototype.values;
  PolyfillSet.prototype[Symbol.iterator] = PolyfillSet.prototype.values;
  PolyfillSet.prototype.forEach = function(callback, opt_thisArg) {
    var set = this;
    this.map_.forEach(function(value) {
      return callback.call(opt_thisArg, value, value, set);
    });
  };
  return PolyfillSet;
}, "es6", "es3");
$jscomp.iteratorFromArray = function(array, transform) {
  if ($jscomp.ASSUME_ES6) {
    return array[Symbol.iterator]();
  }
  array instanceof String && (array += "");
  var i = 0, done = !1, iter = {next:function() {
    if (!done && i < array.length) {
      var index = i++;
      return {value:transform(index, array[index]), done:!1};
    }
    done = !0;
    return {done:!0, value:void 0};
  }};
  iter[Symbol.iterator] = function() {
    return iter;
  };
  return iter;
};
$jscomp.polyfill("Array.prototype.entries", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i, v) {
      return [i, v];
    });
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.keys", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i) {
      return i;
    });
  };
  return polyfill;
}, "es6", "es3");
$jscomp.checkStringArgs = function(thisArg, arg, func) {
  if (thisArg == null) {
    throw new TypeError("The 'this' value for String.prototype." + func + " must not be null or undefined");
  }
  if (arg instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + func + " must not be a regular expression");
  }
  return thisArg + "";
};
$jscomp.polyfill("String.prototype.startsWith", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, "startsWith");
    searchString += "";
    for (var strLen = string.length, searchLen = searchString.length, i = Math.max(0, Math.min(opt_position | 0, string.length)), j = 0; j < searchLen && i < strLen;) {
      if (string[i++] != searchString[j++]) {
        return !1;
      }
    }
    return j >= searchLen;
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, "endsWith");
    searchString += "";
    opt_position === void 0 && (opt_position = string.length);
    for (var i = Math.max(0, Math.min(opt_position | 0, string.length)), j = searchString.length; j > 0 && i > 0;) {
      if (string[--i] != searchString[--j]) {
        return !1;
      }
    }
    return j <= 0;
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("Number.isFinite", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return typeof x !== "number" ? !1 : !isNaN(x) && x !== Infinity && x !== -Infinity;
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("String.prototype.repeat", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(copies) {
    var string = $jscomp.checkStringArgs(this, null, "repeat");
    if (copies < 0 || copies > 1342177279) {
      throw new RangeError("Invalid count value");
    }
    copies |= 0;
    for (var result = ""; copies;) {
      if (copies & 1 && (result += string), copies >>>= 1) {
        string += string;
      }
    }
    return result;
  };
  return polyfill;
}, "es6", "es3");
$jscomp.findInternal = function(array, callback, thisArg) {
  array instanceof String && (array = String(array));
  for (var len = array.length, i = 0; i < len; i++) {
    var value = array[i];
    if (callback.call(thisArg, value, i, array)) {
      return {i:i, v:value};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.find", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).v;
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("String.prototype.codePointAt", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(position) {
    var string = $jscomp.checkStringArgs(this, null, "codePointAt"), size = string.length;
    position = Number(position) || 0;
    if (position >= 0 && position < size) {
      position |= 0;
      var first = string.charCodeAt(position);
      if (first < 55296 || first > 56319 || position + 1 === size) {
        return first;
      }
      var second = string.charCodeAt(position + 1);
      return second < 56320 || second > 57343 ? first : (first - 55296) * 1024 + second + 9216;
    }
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("String.fromCodePoint", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    for (var result = "", i = 0; i < arguments.length; i++) {
      var code = Number(arguments[i]);
      if (code < 0 || code > 1114111 || code !== Math.floor(code)) {
        throw new RangeError("invalid_code_point " + code);
      }
      code <= 65535 ? result += String.fromCharCode(code) : (code -= 65536, result += String.fromCharCode(code >>> 10 & 1023 | 55296), result += String.fromCharCode(code & 1023 | 56320));
    }
    return result;
  };
  return polyfill;
}, "es6", "es3");
$jscomp.polyfill("Object.entries", function(orig) {
  if (orig) {
    return orig;
  }
  var entries = function(obj) {
    var result = [], key;
    for (key in obj) {
      $jscomp.owns(obj, key) && result.push([key, obj[key]]);
    }
    return result;
  };
  return entries;
}, "es8", "es3");
$jscomp.polyfill("String.prototype.trimLeft", function(orig) {
  function polyfill() {
    return this.replace(/^[\s\xa0]+/, "");
  }
  return orig || polyfill;
}, "es_2019", "es3");
$jscomp.polyfill("Array.prototype.values", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(k, v) {
      return v;
    });
  };
  return polyfill;
}, "es8", "es3");
$jscomp.polyfill("Array.from", function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(arrayLike, opt_mapFn, opt_thisArg) {
    opt_mapFn = opt_mapFn != null ? opt_mapFn : function(x) {
      return x;
    };
    var result = [], iteratorFunction = typeof Symbol != "undefined" && Symbol.iterator && arrayLike[Symbol.iterator];
    if (typeof iteratorFunction == "function") {
      arrayLike = iteratorFunction.call(arrayLike);
      for (var next, k = 0; !(next = arrayLike.next()).done;) {
        result.push(opt_mapFn.call(opt_thisArg, next.value, k++));
      }
    } else {
      for (var len = arrayLike.length, i = 0; i < len; i++) {
        result.push(opt_mapFn.call(opt_thisArg, arrayLike[i], i));
      }
    }
    return result;
  };
  return polyfill;
}, "es6", "es3");
var CLOSURE_TOGGLE_ORDINALS = {GoogFlags__async_throw_on_unicode_to_byte__enable:!1, GoogFlags__client_only_wiz_context_per_component__enable:!1, GoogFlags__client_only_wiz_lazy_tsx__enable:!1, GoogFlags__client_only_wiz_queue_effect_and_on_init_initial_runs__enable:!1, GoogFlags__disable_wiz_service_logging_map__enable:!1, GoogFlags__fixed_noopener_behavior__enable:!1, GoogFlags__jspb_disallow_message_tojson__enable:!1, GoogFlags__jspb_serialize_with_dynamic_pivot_selector__enable:!1, GoogFlags__jspb_use_constant_default_pivot__enable:!1, 
GoogFlags__optimize_get_ei_from_ved__enable:!1, GoogFlags__override_disable_toggles:!1, GoogFlags__testonly_debug_flag__enable:!1, GoogFlags__testonly_disabled_flag__enable:!1, GoogFlags__testonly_stable_flag__disable:!1, GoogFlags__testonly_staging_flag__disable:!1, GoogFlags__use_toggles:!1, GoogFlags__use_user_agent_client_hints__enable:!1, GoogFlags__wiz_enable_native_promise__enable:!1};
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var goog = goog || {};
goog.global = this || self;
goog.exportPath_ = function(name, object, overwriteImplicit, objectToExportTo) {
  for (var parts = name.split("."), cur = objectToExportTo || goog.global, part; parts.length && (part = parts.shift());) {
    if (parts.length || object === void 0) {
      cur = cur[part] && cur[part] !== Object.prototype[part] ? cur[part] : cur[part] = {};
    } else {
      if (!overwriteImplicit && goog.isObject(object) && goog.isObject(cur[part])) {
        for (var prop in object) {
          object.hasOwnProperty(prop) && (cur[part][prop] = object[prop]);
        }
      } else {
        cur[part] = object;
      }
    }
  }
};
goog.CLOSURE_DEFINES = typeof CLOSURE_DEFINES !== "undefined" ? CLOSURE_DEFINES : goog.global.CLOSURE_DEFINES;
goog.CLOSURE_UNCOMPILED_DEFINES = typeof CLOSURE_UNCOMPILED_DEFINES !== "undefined" ? CLOSURE_UNCOMPILED_DEFINES : goog.global.CLOSURE_UNCOMPILED_DEFINES;
goog.define = function(name, defaultValue) {
  var value = defaultValue;
  return value;
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.DISALLOW_TEST_ONLY_CODE = !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.readFlagInternalDoNotUseOrElse = function(googFlagId, defaultValue) {
  var obj = goog.getObjectByName(goog.FLAGS_OBJECT_), val = obj && obj[googFlagId];
  return val != null ? val : defaultValue;
};
goog.FLAGS_OBJECT_ = "CLOSURE_FLAGS";
goog.FLAGS_STAGING_DEFAULT = !0;
goog.CLOSURE_TOGGLE_ORDINALS = typeof CLOSURE_TOGGLE_ORDINALS === "object" ? CLOSURE_TOGGLE_ORDINALS : goog.global.CLOSURE_TOGGLE_ORDINALS;
goog.readToggleInternalDoNotCallDirectly = function(name) {
  var ordinals = goog.CLOSURE_TOGGLE_ORDINALS, ordinal = ordinals && ordinals[name];
  return typeof ordinal !== "number" ? !!ordinal : !!(goog.TOGGLES_[Math.floor(ordinal / 30)] & 1 << ordinal % 30);
};
goog.TOGGLE_VAR_ = "_F_toggles";
goog.TOGGLES_ = goog.global[goog.TOGGLE_VAR_] || [];
goog.GENDERED_MESSAGES_ENABLED = !0;
goog.GrammaticalGender_ = {OTHER:0, MASCULINE:1, FEMININE:2, NEUTER:3};
goog.GRAMMATICAL_GENDER_MAP_ = {FEMININE:goog.GrammaticalGender_.FEMININE, MASCULINE:goog.GrammaticalGender_.MASCULINE, NEUTER:goog.GrammaticalGender_.NEUTER};
goog.viewerGrammaticalGender_ = goog.GRAMMATICAL_GENDER_MAP_[goog.GENDERED_MESSAGES_ENABLED && goog.global._F_VIEWER_GRAMMATICAL_GENDER] || goog.GrammaticalGender_.OTHER;
goog.msgKind = {MASCULINE:goog.viewerGrammaticalGender_ === goog.GrammaticalGender_.MASCULINE, FEMININE:goog.viewerGrammaticalGender_ === goog.GrammaticalGender_.FEMININE, NEUTER:goog.viewerGrammaticalGender_ === goog.GrammaticalGender_.NEUTER};
goog.LEGACY_NAMESPACE_OBJECT_ = goog.global;
goog.provide = function(name) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide cannot be used within a module.");
  }
  goog.constructNamespace_(name);
};
goog.constructNamespace_ = function(name, object, overwriteImplicit) {
  goog.exportPath_(name, object, overwriteImplicit, goog.LEGACY_NAMESPACE_OBJECT_);
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.getScriptNonce_ = function(opt_window) {
  var doc = (opt_window || goog.global).document, script = doc.querySelector && doc.querySelector("script[nonce]");
  if (script) {
    var nonce = script.nonce || script.getAttribute("nonce");
    if (nonce && goog.NONCE_PATTERN_.test(nonce)) {
      return nonce;
    }
  }
  return "";
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function() {
};
goog.module.get = function() {
  return null;
};
goog.module.getInternal_ = function() {
  return null;
};
goog.requireDynamic = function() {
  return null;
};
goog.importHandler_ = null;
goog.uncompiledChunkIdHandler_ = null;
goog.setImportHandlerInternalDoNotCallOrElse = function(fn) {
  goog.importHandler_ = fn;
};
goog.setUncompiledChunkIdHandlerInternalDoNotCallOrElse = function(fn) {
  goog.uncompiledChunkIdHandler_ = fn;
};
goog.maybeRequireFrameworkInternalOnlyDoNotCallOrElse = function() {
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  var inLoader = !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6;
  if (inLoader) {
    return !0;
  }
  var jscomp = goog.LEGACY_NAMESPACE_OBJECT_.$jscomp;
  return jscomp ? typeof jscomp.getCurrentModulePath != "function" ? !1 : !!jscomp.getCurrentModulePath() : !1;
};
goog.module.declareLegacyNamespace = function() {
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.module.preventModuleExportSealing = function() {
  goog.moduleLoaderState_.preventModuleExportSealing = !0;
};
goog.declareModuleId = function(namespace) {
  if (goog.moduleLoaderState_) {
    goog.moduleLoaderState_.moduleName = namespace;
  } else {
    var jscomp = goog.LEGACY_NAMESPACE_OBJECT_.$jscomp;
    if (!jscomp || typeof jscomp.getCurrentModulePath != "function") {
      throw Error('Module with namespace "' + namespace + '" has been loaded incorrectly.');
    }
    var exports = jscomp.require(jscomp.getCurrentModulePath());
    goog.loadedModules_[namespace] = {exports:exports, type:goog.ModuleType.ES6, moduleId:namespace};
  }
};
goog.setTestOnly = function(opt_message) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw opt_message = opt_message || "", Error("Importing test-only code into non-debug environment" + (opt_message ? ": " + opt_message : "."));
  }
};
goog.forwardDeclare = function() {
};
goog.getObjectByName = function(name, opt_obj) {
  for (var parts = name.split("."), cur = opt_obj || goog.global, i = 0; i < parts.length; i++) {
    if (cur = cur[parts[i]], cur == null) {
      return null;
    }
  }
  return cur;
};
goog.addDependency = function() {
};
goog.ENABLE_DEBUG_LOADER = !1;
goog.logToConsole_ = function(msg) {
  goog.global.console && goog.global.console.error(msg);
};
goog.require = function() {
};
goog.requireType = function() {
  return {};
};
goog.basePath = "";
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.instance_ = void 0;
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor);
    return ctor.instance_ = new ctor();
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !1;
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRUSTED_TYPES_POLICY_NAME = "goog";
goog.loadModule = function(moduleDef) {
  var previousState = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:!1, preventModuleExportSealing:!1, type:goog.ModuleType.GOOG};
    var origExports = {}, exports = origExports;
    if (typeof moduleDef === "function") {
      exports = moduleDef.call(void 0, exports);
    } else if (typeof moduleDef === "string") {
      exports = goog.loadModuleFromSource_.call(void 0, exports, moduleDef);
    } else {
      throw Error("Invalid module definition");
    }
    var moduleName = goog.moduleLoaderState_.moduleName;
    if (typeof moduleName === "string" && moduleName) {
      if (goog.moduleLoaderState_.declareLegacyNamespace) {
        var isDefaultExport = origExports !== exports;
        goog.constructNamespace_(moduleName, exports, isDefaultExport);
      } else {
        goog.SEAL_MODULE_EXPORTS && Object.seal && typeof exports == "object" && exports != null && !goog.moduleLoaderState_.preventModuleExportSealing && Object.seal(exports);
      }
      var data = {exports:exports, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
      goog.loadedModules_[moduleName] = data;
    } else {
      throw Error('Invalid module name "' + moduleName + '"');
    }
  } finally {
    goog.moduleLoaderState_ = previousState;
  }
};
goog.loadModuleFromSource_ = function(exports) {
  eval(goog.CLOSURE_EVAL_PREFILTER_.createScript(arguments[1]));
  return exports;
};
goog.normalizePath_ = function(path) {
  for (var components = path.split("/"), i = 0; i < components.length;) {
    components[i] == "." ? components.splice(i, 1) : i && components[i] == ".." && components[i - 1] && components[i - 1] != ".." ? components.splice(--i, 2) : i++;
  }
  return components.join("/");
};
goog.loadFileSync_ = function(src) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(src);
  }
  try {
    var xhr = new goog.global.XMLHttpRequest();
    xhr.open("get", src, !1);
    xhr.send();
    return xhr.status == 0 || xhr.status == 200 ? xhr.responseText : null;
  } catch (err) {
    return null;
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  return s != "object" ? s : value ? Array.isArray(value) ? "array" : s : "null";
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number";
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function";
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == "object" && val != null || type == "function";
};
goog.getUid = function(obj) {
  return Object.prototype.hasOwnProperty.call(obj, goog.UID_PROPERTY_) && obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(obj) {
  return !!obj[goog.UID_PROPERTY_];
};
goog.removeUid = function(obj) {
  obj !== null && "removeAttribute" in obj && obj.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (Math.random() * 1E9 >>> 0);
goog.uidCounter_ = 0;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if (type == "object" || type == "array") {
    if (typeof obj.clone === "function") {
      return obj.clone();
    }
    if (typeof Map !== "undefined" && obj instanceof Map) {
      return new Map(obj);
    }
    if (typeof Set !== "undefined" && obj instanceof Set) {
      return new Set(obj);
    }
    var clone = type == "array" ? [] : {}, key;
    for (key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments);
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw Error();
  }
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  }
  return function() {
    return fn.apply(selfObj, arguments);
  };
};
goog.bind = function(fn, selfObj, var_args) {
  goog.TRUSTED_SITE && goog.FEATURESET_YEAR > 2012 || Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(this, newArgs);
  };
};
goog.now = function() {
  return Date.now();
};
goog.globalEval = function(script) {
  (0,eval)(script);
};
goog.getCssName = function(className, opt_modifier) {
  if (String(className).charAt(0) == ".") {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + className);
  }
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  }, renameByParts = function(cssName) {
    for (var parts = cssName.split("-"), mapped = [], i = 0; i < parts.length; i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join("-");
  };
  var rename = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts : function(a) {
    return a;
  };
  var result = opt_modifier ? className + "-" + rename(opt_modifier) : rename(className);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(result) : result;
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.GetMsgOptions = function() {
};
goog.getMsg = function(str, opt_values, opt_options) {
  opt_options && opt_options.html && (str = str.replace(/</g, "&lt;"));
  opt_options && opt_options.unescapeHtmlEntities && (str = str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  opt_values && (str = str.replace(/\{\$([^}]+)}/g, function(match, key) {
    return opt_values != null && key in opt_values ? opt_values[key] : match;
  }));
  return str;
};
goog.getMsgWithFallback = function(a) {
  return a;
};
goog.exportSymbol = function(publicPath, object, objectToExportTo) {
  goog.exportPath_(publicPath, object, !0, objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.weakUsage = function(name) {
  return name;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
  childCtor.base = function(me, methodName, var_args) {
    for (var args = Array(arguments.length - 2), i = 2; i < arguments.length; i++) {
      args[i - 2] = arguments[i];
    }
    return parentCtor.prototype[methodName].apply(me, args);
  };
};
goog.scope = function(fn) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a module.");
  }
  fn.call(goog.global);
};
goog.identity_ = function(s) {
  return s;
};
goog.createTrustedTypesPolicy = function(name) {
  var policy = null, policyFactory = goog.global.trustedTypes;
  if (!policyFactory || !policyFactory.createPolicy) {
    return policy;
  }
  try {
    policy = policyFactory.createPolicy(name, {createHTML:goog.identity_, createScript:goog.identity_, createScriptURL:goog.identity_});
  } catch (e) {
    goog.logToConsole_(e.message);
  }
  return policy;
};
goog.CodeLocation = {DO_NOT_USE:"", DO_NOT_USE_ME_EITHER:"."};
goog.callerLocation = function() {
  return "";
};
goog.callerLocationIdInternalDoNotCallOrElse = function(id) {
  return id;
};
var module$exports$google3$javascript$common$asserts$enable_goog_asserts = {};
module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS = goog.DEBUG;
function module$contents$google3$javascript$typescript$contrib$check_checkExhaustiveAllowing(value, msg) {
  msg = msg === void 0 ? "unexpected value " + value + "!" : msg;
  throw Error(msg);
}
;goog.debug = {};
function module$contents$goog$debug$Error_DebugError(msg, cause) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, module$contents$goog$debug$Error_DebugError);
  } else {
    var stack = Error().stack;
    stack && (this.stack = stack);
  }
  msg && (this.message = String(msg));
  cause !== void 0 && (this.cause = cause);
}
goog.inherits(module$contents$goog$debug$Error_DebugError, Error);
module$contents$goog$debug$Error_DebugError.prototype.name = "CustomError";
goog.debug.Error = module$contents$goog$debug$Error_DebugError;
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS;
function module$contents$goog$asserts_AssertionError(messagePattern, messageArgs) {
  for (var JSCompiler_temp_const = module$contents$goog$debug$Error_DebugError, JSCompiler_temp_const$jscomp$0 = JSCompiler_temp_const.call, JSCompiler_inline_result, pattern = messagePattern, subs = messageArgs, splitParts = pattern.split("%s"), returnString = "", subLast = splitParts.length - 1, i = 0; i < subLast; i++) {
    var sub = i < subs.length ? subs[i] : "%s";
    returnString += splitParts[i] + sub;
  }
  JSCompiler_inline_result = returnString + splitParts[subLast];
  JSCompiler_temp_const$jscomp$0.call(JSCompiler_temp_const, this, JSCompiler_inline_result);
}
goog.inherits(module$contents$goog$asserts_AssertionError, module$contents$goog$debug$Error_DebugError);
goog.asserts.AssertionError = module$contents$goog$asserts_AssertionError;
module$contents$goog$asserts_AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
  throw e;
};
var module$contents$goog$asserts_errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
function module$contents$goog$asserts_doAssertFailure(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if (givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs;
  } else {
    defaultMessage && (message += ": " + defaultMessage, args = defaultArgs);
  }
  var e = new module$contents$goog$asserts_AssertionError("" + message, args || []);
  module$contents$goog$asserts_errorHandler_(e);
}
goog.asserts.setErrorHandler = function(errorHandler) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && (module$contents$goog$asserts_errorHandler_ = errorHandler);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && !condition && module$contents$goog$asserts_doAssertFailure("", null, opt_message, Array.prototype.slice.call(arguments, 2));
  return condition;
};
goog.asserts.assertExists = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && value == null && module$contents$goog$asserts_doAssertFailure("Expected to exist: %s.", [value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.fail = function(opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && module$contents$goog$asserts_errorHandler_(new module$contents$goog$asserts_AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && typeof value !== "number" && module$contents$goog$asserts_doAssertFailure("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && typeof value !== "string" && module$contents$goog$asserts_doAssertFailure("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && typeof value !== "function" && module$contents$goog$asserts_doAssertFailure("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && !goog.isObject(value) && module$contents$goog$asserts_doAssertFailure("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && !Array.isArray(value) && module$contents$goog$asserts_doAssertFailure("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && typeof value !== "boolean" && module$contents$goog$asserts_doAssertFailure("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertElement = function(value, opt_message, var_args) {
  !module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS || goog.isObject(value) && value.nodeType == goog.dom.NodeType.ELEMENT || module$contents$goog$asserts_doAssertFailure("Expected Element but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  !module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS || value instanceof type || module$contents$goog$asserts_doAssertFailure("Expected instanceof %s but got %s.", [module$contents$goog$asserts_getType(type), module$contents$goog$asserts_getType(value)], opt_message, Array.prototype.slice.call(arguments, 3));
  return value;
};
goog.asserts.assertFinite = function(value, opt_message, var_args) {
  !module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS || typeof value == "number" && isFinite(value) || module$contents$goog$asserts_doAssertFailure("Expected %s to be a finite number but it is not.", [value], opt_message, Array.prototype.slice.call(arguments, 2));
  return value;
};
function module$contents$goog$asserts_getType(value) {
  return value instanceof Function ? value.displayName || value.name || "unknown type name" : value instanceof Object ? value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value) : value === null ? "null" : typeof value;
}
;goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
var module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS = goog.FEATURESET_YEAR > 2012;
goog.array.ASSUME_NATIVE_FUNCTIONS = module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS;
function module$contents$goog$array_peek(array) {
  return array[array.length - 1];
}
goog.array.peek = module$contents$goog$array_peek;
goog.array.last = module$contents$goog$array_peek;
var module$contents$goog$array_indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.indexOf.call(arr, obj, opt_fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if (typeof arr === "string") {
    return typeof obj !== "string" || obj.length != 1 ? -1 : arr.indexOf(obj, fromIndex);
  }
  for (var i = fromIndex; i < arr.length; i++) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.indexOf = module$contents$goog$array_indexOf;
var module$contents$goog$array_lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return Array.prototype.lastIndexOf.call(arr, obj, fromIndex);
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  fromIndex < 0 && (fromIndex = Math.max(0, arr.length + fromIndex));
  if (typeof arr === "string") {
    return typeof obj !== "string" || obj.length != 1 ? -1 : arr.lastIndexOf(obj, fromIndex);
  }
  for (var i = fromIndex; i >= 0; i--) {
    if (i in arr && arr[i] === obj) {
      return i;
    }
  }
  return -1;
};
goog.array.lastIndexOf = module$contents$goog$array_lastIndexOf;
var module$contents$goog$array_forEach = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  Array.prototype.forEach.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = typeof arr === "string" ? arr.split("") : arr, i = 0; i < l; i++) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
};
goog.array.forEach = module$contents$goog$array_forEach;
function module$contents$goog$array_forEachRight(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = typeof arr === "string" ? arr.split("") : arr, i = l - 1; i >= 0; --i) {
    i in arr2 && f.call(opt_obj, arr2[i], i, arr);
  }
}
goog.array.forEachRight = module$contents$goog$array_forEachRight;
var module$contents$goog$array_filter = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.filter.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = [], resLength = 0, arr2 = typeof arr === "string" ? arr.split("") : arr, i = 0; i < l; i++) {
    if (i in arr2) {
      var val = arr2[i];
      f.call(opt_obj, val, i, arr) && (res[resLength++] = val);
    }
  }
  return res;
};
goog.array.filter = module$contents$goog$array_filter;
var module$contents$goog$array_map = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.map.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, res = Array(l), arr2 = typeof arr === "string" ? arr.split("") : arr, i = 0; i < l; i++) {
    i in arr2 && (res[i] = f.call(opt_obj, arr2[i], i, arr));
  }
  return res;
};
goog.array.map = module$contents$goog$array_map;
var module$contents$goog$array_reduce = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  opt_obj && (f = goog.TRUSTED_SITE ? f.bind(opt_obj) : goog.bind(f, opt_obj));
  return Array.prototype.reduce.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  module$contents$goog$array_forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduce = module$contents$goog$array_reduce;
var module$contents$goog$array_reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(arr, f, val, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.asserts.assert(f != null);
  opt_obj && (f = goog.TRUSTED_SITE ? f.bind(opt_obj) : goog.bind(f, opt_obj));
  return Array.prototype.reduceRight.call(arr, f, val);
} : function(arr, f, val, opt_obj) {
  var rval = val;
  module$contents$goog$array_forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr);
  });
  return rval;
};
goog.array.reduceRight = module$contents$goog$array_reduceRight;
var module$contents$goog$array_some = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.some.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = typeof arr === "string" ? arr.split("") : arr, i = 0; i < l; i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return !0;
    }
  }
  return !1;
};
goog.array.some = module$contents$goog$array_some;
var module$contents$goog$array_every = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.every.call(arr, f, opt_obj);
} : function(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = typeof arr === "string" ? arr.split("") : arr, i = 0; i < l; i++) {
    if (i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return !1;
    }
  }
  return !0;
};
goog.array.every = module$contents$goog$array_every;
function module$contents$goog$array_count(arr, f, opt_obj) {
  var count = 0;
  module$contents$goog$array_forEach(arr, function(element, index, arr) {
    f.call(opt_obj, element, index, arr) && ++count;
  }, opt_obj);
  return count;
}
goog.array.count = module$contents$goog$array_count;
function module$contents$goog$array_find(arr, f, opt_obj) {
  var i = module$contents$goog$array_findIndex(arr, f, opt_obj);
  return i < 0 ? null : typeof arr === "string" ? arr.charAt(i) : arr[i];
}
goog.array.find = module$contents$goog$array_find;
function module$contents$goog$array_findIndex(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = typeof arr === "string" ? arr.split("") : arr, i = 0; i < l; i++) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
goog.array.findIndex = module$contents$goog$array_findIndex;
function module$contents$goog$array_findRight(arr, f, opt_obj) {
  var i = module$contents$goog$array_findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : typeof arr === "string" ? arr.charAt(i) : arr[i];
}
goog.array.findRight = module$contents$goog$array_findRight;
function module$contents$goog$array_findIndexRight(arr, f, opt_obj) {
  for (var l = arr.length, arr2 = typeof arr === "string" ? arr.split("") : arr, i = l - 1; i >= 0; i--) {
    if (i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
goog.array.findIndexRight = module$contents$goog$array_findIndexRight;
function module$contents$goog$array_contains(arr, obj) {
  return module$contents$goog$array_indexOf(arr, obj) >= 0;
}
goog.array.contains = module$contents$goog$array_contains;
function module$contents$goog$array_isEmpty(arr) {
  return arr.length == 0;
}
goog.array.isEmpty = module$contents$goog$array_isEmpty;
function module$contents$goog$array_clear(arr) {
  if (!Array.isArray(arr)) {
    for (var i = arr.length - 1; i >= 0; i--) {
      delete arr[i];
    }
  }
  arr.length = 0;
}
goog.array.clear = module$contents$goog$array_clear;
function module$contents$goog$array_insert(arr, obj) {
  module$contents$goog$array_contains(arr, obj) || arr.push(obj);
}
goog.array.insert = module$contents$goog$array_insert;
function module$contents$goog$array_insertAt(arr, obj, opt_i) {
  module$contents$goog$array_splice(arr, opt_i, 0, obj);
}
goog.array.insertAt = module$contents$goog$array_insertAt;
function module$contents$goog$array_insertArrayAt(arr, elementsToAdd, opt_i) {
  goog.partial(module$contents$goog$array_splice, arr, opt_i, 0).apply(null, elementsToAdd);
}
goog.array.insertArrayAt = module$contents$goog$array_insertArrayAt;
function module$contents$goog$array_insertBefore(arr, obj, opt_obj2) {
  var i;
  arguments.length == 2 || (i = module$contents$goog$array_indexOf(arr, opt_obj2)) < 0 ? arr.push(obj) : module$contents$goog$array_insertAt(arr, obj, i);
}
goog.array.insertBefore = module$contents$goog$array_insertBefore;
function module$contents$goog$array_remove(arr, obj) {
  var i = module$contents$goog$array_indexOf(arr, obj), rv;
  (rv = i >= 0) && module$contents$goog$array_removeAt(arr, i);
  return rv;
}
goog.array.remove = module$contents$goog$array_remove;
function module$contents$goog$array_removeLast(arr, obj) {
  var i = module$contents$goog$array_lastIndexOf(arr, obj);
  return i >= 0 ? (module$contents$goog$array_removeAt(arr, i), !0) : !1;
}
goog.array.removeLast = module$contents$goog$array_removeLast;
function module$contents$goog$array_removeAt(arr, i) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.splice.call(arr, i, 1).length == 1;
}
goog.array.removeAt = module$contents$goog$array_removeAt;
function module$contents$goog$array_removeIf(arr, f, opt_obj) {
  var i = module$contents$goog$array_findIndex(arr, f, opt_obj);
  return i >= 0 ? (module$contents$goog$array_removeAt(arr, i), !0) : !1;
}
goog.array.removeIf = module$contents$goog$array_removeIf;
function module$contents$goog$array_removeAllIf(arr, f, opt_obj) {
  var removedCount = 0;
  module$contents$goog$array_forEachRight(arr, function(val, index) {
    f.call(opt_obj, val, index, arr) && module$contents$goog$array_removeAt(arr, index) && removedCount++;
  });
  return removedCount;
}
goog.array.removeAllIf = module$contents$goog$array_removeAllIf;
function module$contents$goog$array_concat(var_args) {
  return Array.prototype.concat.apply([], arguments);
}
goog.array.concat = module$contents$goog$array_concat;
function module$contents$goog$array_join(var_args) {
  return Array.prototype.concat.apply([], arguments);
}
goog.array.join = module$contents$goog$array_join;
function module$contents$goog$array_toArray(object) {
  var length = object.length;
  if (length > 0) {
    for (var rv = Array(length), i = 0; i < length; i++) {
      rv[i] = object[i];
    }
    return rv;
  }
  return [];
}
goog.array.toArray = module$contents$goog$array_toArray;
goog.array.clone = module$contents$goog$array_toArray;
function module$contents$goog$array_extend(arr1, var_args) {
  for (var i = 1; i < arguments.length; i++) {
    var arr2 = arguments[i];
    if (goog.isArrayLike(arr2)) {
      var len1 = arr1.length || 0, len2 = arr2.length || 0;
      arr1.length = len1 + len2;
      for (var j = 0; j < len2; j++) {
        arr1[len1 + j] = arr2[j];
      }
    } else {
      arr1.push(arr2);
    }
  }
}
goog.array.extend = module$contents$goog$array_extend;
function module$contents$goog$array_splice(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return Array.prototype.splice.apply(arr, module$contents$goog$array_slice(arguments, 1));
}
goog.array.splice = module$contents$goog$array_splice;
function module$contents$goog$array_slice(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  return arguments.length <= 2 ? Array.prototype.slice.call(arr, start) : Array.prototype.slice.call(arr, start, opt_end);
}
goog.array.slice = module$contents$goog$array_slice;
function module$contents$goog$array_removeDuplicates(arr, opt_rv, opt_keyFn) {
  var returnArray = opt_rv || arr;
  if (goog.FEATURESET_YEAR >= 2018) {
    for (var defaultKeyFn = function(item) {
      return item;
    }, keyFn = opt_keyFn || defaultKeyFn, cursorInsert = 0, cursorRead = 0, seen = new Set(); cursorRead < arr.length;) {
      var current = arr[cursorRead++], key = keyFn(current);
      seen.has(key) || (seen.add(key), returnArray[cursorInsert++] = current);
    }
    returnArray.length = cursorInsert;
  } else {
    for (var defaultKeyFn$jscomp$0 = function(item) {
      return goog.isObject(item) ? "o" + goog.getUid(item) : (typeof item).charAt(0) + item;
    }, keyFn$jscomp$0 = opt_keyFn || defaultKeyFn$jscomp$0, cursorInsert$jscomp$0 = 0, cursorRead$jscomp$0 = 0, seen$jscomp$0 = {}; cursorRead$jscomp$0 < arr.length;) {
      var current$jscomp$0 = arr[cursorRead$jscomp$0++], key$jscomp$0 = keyFn$jscomp$0(current$jscomp$0);
      Object.prototype.hasOwnProperty.call(seen$jscomp$0, key$jscomp$0) || (seen$jscomp$0[key$jscomp$0] = !0, returnArray[cursorInsert$jscomp$0++] = current$jscomp$0);
    }
    returnArray.length = cursorInsert$jscomp$0;
  }
}
goog.array.removeDuplicates = module$contents$goog$array_removeDuplicates;
function module$contents$goog$array_binarySearch(arr, target, opt_compareFn) {
  return module$contents$goog$array_binarySearch_(arr, opt_compareFn || module$contents$goog$array_defaultCompare, !1, target);
}
goog.array.binarySearch = module$contents$goog$array_binarySearch;
function module$contents$goog$array_binarySelect(arr, evaluator, opt_obj) {
  return module$contents$goog$array_binarySearch_(arr, evaluator, !0, void 0, opt_obj);
}
goog.array.binarySelect = module$contents$goog$array_binarySelect;
function module$contents$goog$array_binarySearch_(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  for (var left = 0, right = arr.length, found; left < right;) {
    var middle = left + (right - left >>> 1);
    var compareResult = isEvaluator ? compareFn.call(opt_selfObj, arr[middle], middle, arr) : compareFn(opt_target, arr[middle]);
    compareResult > 0 ? left = middle + 1 : (right = middle, found = !compareResult);
  }
  return found ? left : -left - 1;
}
function module$contents$goog$array_sort(arr, opt_compareFn) {
  arr.sort(opt_compareFn || module$contents$goog$array_defaultCompare);
}
goog.array.sort = module$contents$goog$array_sort;
function module$contents$goog$array_stableSort(arr, opt_compareFn) {
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index;
  }
  for (var compArr = Array(arr.length), i = 0; i < arr.length; i++) {
    compArr[i] = {index:i, value:arr[i]};
  }
  var valueCompareFn = opt_compareFn || module$contents$goog$array_defaultCompare;
  module$contents$goog$array_sort(compArr, stableCompareFn);
  for (var i$jscomp$0 = 0; i$jscomp$0 < arr.length; i$jscomp$0++) {
    arr[i$jscomp$0] = compArr[i$jscomp$0].value;
  }
}
goog.array.stableSort = module$contents$goog$array_stableSort;
function module$contents$goog$array_sortByKey(arr, keyFn, opt_compareFn) {
  var keyCompareFn = opt_compareFn || module$contents$goog$array_defaultCompare;
  module$contents$goog$array_sort(arr, function(a, b) {
    return keyCompareFn(keyFn(a), keyFn(b));
  });
}
goog.array.sortByKey = module$contents$goog$array_sortByKey;
function module$contents$goog$array_sortObjectsByKey(arr, key, opt_compareFn) {
  module$contents$goog$array_sortByKey(arr, function(obj) {
    return obj[key];
  }, opt_compareFn);
}
goog.array.sortObjectsByKey = module$contents$goog$array_sortObjectsByKey;
function module$contents$goog$array_isSorted(arr, opt_compareFn, opt_strict) {
  for (var compare = opt_compareFn || module$contents$goog$array_defaultCompare, i = 1; i < arr.length; i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if (compareResult > 0 || compareResult == 0 && opt_strict) {
      return !1;
    }
  }
  return !0;
}
goog.array.isSorted = module$contents$goog$array_isSorted;
function module$contents$goog$array_equals(arr1, arr2, opt_equalsFn) {
  if (!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return !1;
  }
  for (var l = arr1.length, equalsFn = opt_equalsFn || module$contents$goog$array_defaultCompareEquality, i = 0; i < l; i++) {
    if (!equalsFn(arr1[i], arr2[i])) {
      return !1;
    }
  }
  return !0;
}
goog.array.equals = module$contents$goog$array_equals;
function module$contents$goog$array_compare3(arr1, arr2, opt_compareFn) {
  for (var compare = opt_compareFn || module$contents$goog$array_defaultCompare, l = Math.min(arr1.length, arr2.length), i = 0; i < l; i++) {
    var result = compare(arr1[i], arr2[i]);
    if (result != 0) {
      return result;
    }
  }
  return module$contents$goog$array_defaultCompare(arr1.length, arr2.length);
}
goog.array.compare3 = module$contents$goog$array_compare3;
function module$contents$goog$array_defaultCompare(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
goog.array.defaultCompare = module$contents$goog$array_defaultCompare;
function module$contents$goog$array_inverseDefaultCompare(a, b) {
  return -module$contents$goog$array_defaultCompare(a, b);
}
goog.array.inverseDefaultCompare = module$contents$goog$array_inverseDefaultCompare;
function module$contents$goog$array_defaultCompareEquality(a, b) {
  return a === b;
}
goog.array.defaultCompareEquality = module$contents$goog$array_defaultCompareEquality;
function module$contents$goog$array_binaryInsert(array, value, opt_compareFn) {
  var index = module$contents$goog$array_binarySearch(array, value, opt_compareFn);
  return index < 0 ? (module$contents$goog$array_insertAt(array, value, -(index + 1)), !0) : !1;
}
goog.array.binaryInsert = module$contents$goog$array_binaryInsert;
function module$contents$goog$array_binaryRemove(array, value, opt_compareFn) {
  var index = module$contents$goog$array_binarySearch(array, value, opt_compareFn);
  return index >= 0 ? module$contents$goog$array_removeAt(array, index) : !1;
}
goog.array.binaryRemove = module$contents$goog$array_binaryRemove;
function module$contents$goog$array_bucket(array, sorter, opt_obj) {
  for (var buckets = {}, i = 0; i < array.length; i++) {
    var value = array[i], key = sorter.call(opt_obj, value, i, array);
    if (key !== void 0) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value);
    }
  }
  return buckets;
}
goog.array.bucket = module$contents$goog$array_bucket;
function module$contents$goog$array_bucketToMap(array, sorter) {
  for (var buckets = new Map(), i = 0; i < array.length; i++) {
    var value = array[i], key = sorter(value, i, array);
    if (key !== void 0) {
      var bucket = buckets.get(key);
      bucket || (bucket = [], buckets.set(key, bucket));
      bucket.push(value);
    }
  }
  return buckets;
}
goog.array.bucketToMap = module$contents$goog$array_bucketToMap;
function module$contents$goog$array_toObject(arr, keyFunc, opt_obj) {
  var ret = {};
  module$contents$goog$array_forEach(arr, function(element, index) {
    ret[keyFunc.call(opt_obj, element, index, arr)] = element;
  });
  return ret;
}
goog.array.toObject = module$contents$goog$array_toObject;
function module$contents$goog$array_toMap(arr, keyFunc) {
  for (var map = new Map(), i = 0; i < arr.length; i++) {
    var element = arr[i];
    map.set(keyFunc(element, i, arr), element);
  }
  return map;
}
goog.array.toMap = module$contents$goog$array_toMap;
function module$contents$goog$array_range(startOrEnd, opt_end, opt_step) {
  var array = [], start = 0, end = startOrEnd, step = opt_step || 1;
  opt_end !== void 0 && (start = startOrEnd, end = opt_end);
  if (step * (end - start) < 0) {
    return [];
  }
  if (step > 0) {
    for (var i = start; i < end; i += step) {
      array.push(i);
    }
  } else {
    for (var i$jscomp$0 = start; i$jscomp$0 > end; i$jscomp$0 += step) {
      array.push(i$jscomp$0);
    }
  }
  return array;
}
goog.array.range = module$contents$goog$array_range;
function module$contents$goog$array_repeat(value, n) {
  for (var array = [], i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}
goog.array.repeat = module$contents$goog$array_repeat;
function module$contents$goog$array_flatten(var_args) {
  for (var result = [], i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (Array.isArray(element)) {
      for (var c = 0; c < element.length; c += 8192) {
        for (var chunk = module$contents$goog$array_slice(element, c, c + 8192), recurseResult = module$contents$goog$array_flatten.apply(null, chunk), r = 0; r < recurseResult.length; r++) {
          result.push(recurseResult[r]);
        }
      }
    } else {
      result.push(element);
    }
  }
  return result;
}
goog.array.flatten = module$contents$goog$array_flatten;
function module$contents$goog$array_rotate(array, n) {
  goog.asserts.assert(array.length != null);
  array.length && (n %= array.length, n > 0 ? Array.prototype.unshift.apply(array, array.splice(-n, n)) : n < 0 && Array.prototype.push.apply(array, array.splice(0, -n)));
  return array;
}
goog.array.rotate = module$contents$goog$array_rotate;
function module$contents$goog$array_moveItem(arr, fromIndex, toIndex) {
  goog.asserts.assert(fromIndex >= 0 && fromIndex < arr.length);
  goog.asserts.assert(toIndex >= 0 && toIndex < arr.length);
  var removedItems = Array.prototype.splice.call(arr, fromIndex, 1);
  Array.prototype.splice.call(arr, toIndex, 0, removedItems[0]);
}
goog.array.moveItem = module$contents$goog$array_moveItem;
function module$contents$goog$array_zip(var_args) {
  if (!arguments.length) {
    return [];
  }
  for (var result = [], minLen = arguments[0].length, i = 1; i < arguments.length; i++) {
    arguments[i].length < minLen && (minLen = arguments[i].length);
  }
  for (var i$jscomp$0 = 0; i$jscomp$0 < minLen; i$jscomp$0++) {
    for (var value = [], j = 0; j < arguments.length; j++) {
      value.push(arguments[j][i$jscomp$0]);
    }
    result.push(value);
  }
  return result;
}
goog.array.zip = module$contents$goog$array_zip;
function module$contents$goog$array_shuffle(arr, opt_randFn) {
  for (var randFn = opt_randFn || Math.random, i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(randFn() * (i + 1)), tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}
goog.array.shuffle = module$contents$goog$array_shuffle;
function module$contents$goog$array_copyByIndex(arr, index_arr) {
  var result = [];
  module$contents$goog$array_forEach(index_arr, function(index) {
    result.push(arr[index]);
  });
  return result;
}
goog.array.copyByIndex = module$contents$goog$array_copyByIndex;
function module$contents$goog$array_concatMap(arr, f, opt_obj) {
  return module$contents$goog$array_concat.apply([], module$contents$goog$array_map(arr, f, opt_obj));
}
goog.array.concatMap = module$contents$goog$array_concatMap;
function module$contents$goog$dom$HtmlElement_HtmlElement() {
}
goog.dom.HtmlElement = module$contents$goog$dom$HtmlElement_HtmlElement;
goog.dom.TagName = function() {
};
goog.dom.TagName.cast = function(name) {
  return name;
};
goog.dom.TagName.prototype.toString = function() {
};
goog.dom.TagName.A = "A";
goog.dom.TagName.ABBR = "ABBR";
goog.dom.TagName.ACRONYM = "ACRONYM";
goog.dom.TagName.ADDRESS = "ADDRESS";
goog.dom.TagName.APPLET = "APPLET";
goog.dom.TagName.AREA = "AREA";
goog.dom.TagName.ARTICLE = "ARTICLE";
goog.dom.TagName.ASIDE = "ASIDE";
goog.dom.TagName.AUDIO = "AUDIO";
goog.dom.TagName.B = "B";
goog.dom.TagName.BASE = "BASE";
goog.dom.TagName.BASEFONT = "BASEFONT";
goog.dom.TagName.BDI = "BDI";
goog.dom.TagName.BDO = "BDO";
goog.dom.TagName.BIG = "BIG";
goog.dom.TagName.BLOCKQUOTE = "BLOCKQUOTE";
goog.dom.TagName.BODY = "BODY";
goog.dom.TagName.BR = "BR";
goog.dom.TagName.BUTTON = "BUTTON";
goog.dom.TagName.CANVAS = "CANVAS";
goog.dom.TagName.CAPTION = "CAPTION";
goog.dom.TagName.CENTER = "CENTER";
goog.dom.TagName.CITE = "CITE";
goog.dom.TagName.CODE = "CODE";
goog.dom.TagName.COL = "COL";
goog.dom.TagName.COLGROUP = "COLGROUP";
goog.dom.TagName.COMMAND = "COMMAND";
goog.dom.TagName.DATA = "DATA";
goog.dom.TagName.DATALIST = "DATALIST";
goog.dom.TagName.DD = "DD";
goog.dom.TagName.DEL = "DEL";
goog.dom.TagName.DETAILS = "DETAILS";
goog.dom.TagName.DFN = "DFN";
goog.dom.TagName.DIALOG = "DIALOG";
goog.dom.TagName.DIR = "DIR";
goog.dom.TagName.DIV = "DIV";
goog.dom.TagName.DL = "DL";
goog.dom.TagName.DT = "DT";
goog.dom.TagName.EM = "EM";
goog.dom.TagName.EMBED = "EMBED";
goog.dom.TagName.FIELDSET = "FIELDSET";
goog.dom.TagName.FIGCAPTION = "FIGCAPTION";
goog.dom.TagName.FIGURE = "FIGURE";
goog.dom.TagName.FONT = "FONT";
goog.dom.TagName.FOOTER = "FOOTER";
goog.dom.TagName.FORM = "FORM";
goog.dom.TagName.FRAME = "FRAME";
goog.dom.TagName.FRAMESET = "FRAMESET";
goog.dom.TagName.H1 = "H1";
goog.dom.TagName.H2 = "H2";
goog.dom.TagName.H3 = "H3";
goog.dom.TagName.H4 = "H4";
goog.dom.TagName.H5 = "H5";
goog.dom.TagName.H6 = "H6";
goog.dom.TagName.HEAD = "HEAD";
goog.dom.TagName.HEADER = "HEADER";
goog.dom.TagName.HGROUP = "HGROUP";
goog.dom.TagName.HR = "HR";
goog.dom.TagName.HTML = "HTML";
goog.dom.TagName.I = "I";
goog.dom.TagName.IFRAME = "IFRAME";
goog.dom.TagName.IMG = "IMG";
goog.dom.TagName.INPUT = "INPUT";
goog.dom.TagName.INS = "INS";
goog.dom.TagName.ISINDEX = "ISINDEX";
goog.dom.TagName.KBD = "KBD";
goog.dom.TagName.KEYGEN = "KEYGEN";
goog.dom.TagName.LABEL = "LABEL";
goog.dom.TagName.LEGEND = "LEGEND";
goog.dom.TagName.LI = "LI";
goog.dom.TagName.LINK = "LINK";
goog.dom.TagName.MAIN = "MAIN";
goog.dom.TagName.MAP = "MAP";
goog.dom.TagName.MARK = "MARK";
goog.dom.TagName.MATH = "MATH";
goog.dom.TagName.MENU = "MENU";
goog.dom.TagName.MENUITEM = "MENUITEM";
goog.dom.TagName.META = "META";
goog.dom.TagName.METER = "METER";
goog.dom.TagName.NAV = "NAV";
goog.dom.TagName.NOFRAMES = "NOFRAMES";
goog.dom.TagName.NOSCRIPT = "NOSCRIPT";
goog.dom.TagName.OBJECT = "OBJECT";
goog.dom.TagName.OL = "OL";
goog.dom.TagName.OPTGROUP = "OPTGROUP";
goog.dom.TagName.OPTION = "OPTION";
goog.dom.TagName.OUTPUT = "OUTPUT";
goog.dom.TagName.P = "P";
goog.dom.TagName.PARAM = "PARAM";
goog.dom.TagName.PICTURE = "PICTURE";
goog.dom.TagName.PRE = "PRE";
goog.dom.TagName.PROGRESS = "PROGRESS";
goog.dom.TagName.Q = "Q";
goog.dom.TagName.RP = "RP";
goog.dom.TagName.RT = "RT";
goog.dom.TagName.RTC = "RTC";
goog.dom.TagName.RUBY = "RUBY";
goog.dom.TagName.S = "S";
goog.dom.TagName.SAMP = "SAMP";
goog.dom.TagName.SCRIPT = "SCRIPT";
goog.dom.TagName.SECTION = "SECTION";
goog.dom.TagName.SELECT = "SELECT";
goog.dom.TagName.SMALL = "SMALL";
goog.dom.TagName.SOURCE = "SOURCE";
goog.dom.TagName.SPAN = "SPAN";
goog.dom.TagName.STRIKE = "STRIKE";
goog.dom.TagName.STRONG = "STRONG";
goog.dom.TagName.STYLE = "STYLE";
goog.dom.TagName.SUB = "SUB";
goog.dom.TagName.SUMMARY = "SUMMARY";
goog.dom.TagName.SUP = "SUP";
goog.dom.TagName.SVG = "SVG";
goog.dom.TagName.TABLE = "TABLE";
goog.dom.TagName.TBODY = "TBODY";
goog.dom.TagName.TD = "TD";
goog.dom.TagName.TEMPLATE = "TEMPLATE";
goog.dom.TagName.TEXTAREA = "TEXTAREA";
goog.dom.TagName.TFOOT = "TFOOT";
goog.dom.TagName.TH = "TH";
goog.dom.TagName.THEAD = "THEAD";
goog.dom.TagName.TIME = "TIME";
goog.dom.TagName.TITLE = "TITLE";
goog.dom.TagName.TR = "TR";
goog.dom.TagName.TRACK = "TRACK";
goog.dom.TagName.TT = "TT";
goog.dom.TagName.U = "U";
goog.dom.TagName.UL = "UL";
goog.dom.TagName.VAR = "VAR";
goog.dom.TagName.VIDEO = "VIDEO";
goog.dom.TagName.WBR = "WBR";
goog.dom.element = {};
var module$contents$goog$dom$element_isElement = function(value) {
  return goog.isObject(value) && value.nodeType === goog.dom.NodeType.ELEMENT;
}, module$contents$goog$dom$element_isHtmlElement = function(value) {
  return goog.isObject(value) && module$contents$goog$dom$element_isElement(value) && (!value.namespaceURI || value.namespaceURI === "http://www.w3.org/1999/xhtml");
}, module$contents$goog$dom$element_isHtmlElementOfType = function(value, tagName) {
  return goog.isObject(value) && module$contents$goog$dom$element_isHtmlElement(value) && value.tagName.toUpperCase() === tagName.toString();
}, module$contents$goog$dom$element_isHtmlAnchorElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.A);
}, module$contents$goog$dom$element_isHtmlButtonElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.BUTTON);
}, module$contents$goog$dom$element_isHtmlLinkElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.LINK);
}, module$contents$goog$dom$element_isHtmlImageElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.IMG);
}, module$contents$goog$dom$element_isHtmlAudioElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.AUDIO);
}, module$contents$goog$dom$element_isHtmlVideoElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.VIDEO);
}, module$contents$goog$dom$element_isHtmlInputElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.INPUT);
}, module$contents$goog$dom$element_isHtmlTextAreaElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.TEXTAREA);
}, module$contents$goog$dom$element_isHtmlCanvasElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.CANVAS);
}, module$contents$goog$dom$element_isHtmlEmbedElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.EMBED);
}, module$contents$goog$dom$element_isHtmlFormElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.FORM);
}, module$contents$goog$dom$element_isHtmlFrameElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.FRAME);
}, module$contents$goog$dom$element_isHtmlIFrameElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.IFRAME);
}, module$contents$goog$dom$element_isHtmlObjectElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.OBJECT);
}, module$contents$goog$dom$element_isHtmlScriptElement = function(value) {
  return module$contents$goog$dom$element_isHtmlElementOfType(value, goog.dom.TagName.SCRIPT);
};
goog.dom.element.isElement = module$contents$goog$dom$element_isElement;
goog.dom.element.isHtmlElement = module$contents$goog$dom$element_isHtmlElement;
goog.dom.element.isHtmlElementOfType = module$contents$goog$dom$element_isHtmlElementOfType;
goog.dom.element.isHtmlAnchorElement = module$contents$goog$dom$element_isHtmlAnchorElement;
goog.dom.element.isHtmlButtonElement = module$contents$goog$dom$element_isHtmlButtonElement;
goog.dom.element.isHtmlLinkElement = module$contents$goog$dom$element_isHtmlLinkElement;
goog.dom.element.isHtmlImageElement = module$contents$goog$dom$element_isHtmlImageElement;
goog.dom.element.isHtmlAudioElement = module$contents$goog$dom$element_isHtmlAudioElement;
goog.dom.element.isHtmlVideoElement = module$contents$goog$dom$element_isHtmlVideoElement;
goog.dom.element.isHtmlInputElement = module$contents$goog$dom$element_isHtmlInputElement;
goog.dom.element.isHtmlTextAreaElement = module$contents$goog$dom$element_isHtmlTextAreaElement;
goog.dom.element.isHtmlCanvasElement = module$contents$goog$dom$element_isHtmlCanvasElement;
goog.dom.element.isHtmlEmbedElement = module$contents$goog$dom$element_isHtmlEmbedElement;
goog.dom.element.isHtmlFormElement = module$contents$goog$dom$element_isHtmlFormElement;
goog.dom.element.isHtmlFrameElement = module$contents$goog$dom$element_isHtmlFrameElement;
goog.dom.element.isHtmlIFrameElement = module$contents$goog$dom$element_isHtmlIFrameElement;
goog.dom.element.isHtmlObjectElement = module$contents$goog$dom$element_isHtmlObjectElement;
goog.dom.element.isHtmlScriptElement = module$contents$goog$dom$element_isHtmlScriptElement;
goog.asserts.dom = {};
var module$contents$goog$asserts$dom_assertIsElement = function(value) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && !module$contents$goog$dom$element_isElement(value) && goog.asserts.fail("Argument is not an Element; got: " + module$contents$goog$asserts$dom_debugStringForType(value));
  return value;
}, module$contents$goog$asserts$dom_assertIsHtmlElement = function(value) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && !module$contents$goog$dom$element_isHtmlElement(value) && goog.asserts.fail("Argument is not an HTML Element; got: " + module$contents$goog$asserts$dom_debugStringForType(value));
  return value;
}, module$contents$goog$asserts$dom_assertIsHtmlElementOfType = function(value, tagName) {
  module$exports$google3$javascript$common$asserts$enable_goog_asserts.ENABLE_GOOG_ASSERTS && !module$contents$goog$dom$element_isHtmlElementOfType(value, tagName) && goog.asserts.fail("Argument is not an HTML Element with tag name " + (tagName.toString() + "; got: " + module$contents$goog$asserts$dom_debugStringForType(value)));
  return value;
}, module$contents$goog$asserts$dom_assertIsHtmlAnchorElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.A);
}, module$contents$goog$asserts$dom_assertIsHtmlButtonElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.BUTTON);
}, module$contents$goog$asserts$dom_assertIsHtmlLinkElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.LINK);
}, module$contents$goog$asserts$dom_assertIsHtmlImageElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.IMG);
}, module$contents$goog$asserts$dom_assertIsHtmlAudioElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.AUDIO);
}, module$contents$goog$asserts$dom_assertIsHtmlVideoElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.VIDEO);
}, module$contents$goog$asserts$dom_assertIsHtmlInputElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.INPUT);
}, module$contents$goog$asserts$dom_assertIsHtmlTextAreaElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.TEXTAREA);
}, module$contents$goog$asserts$dom_assertIsHtmlCanvasElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.CANVAS);
}, module$contents$goog$asserts$dom_assertIsHtmlEmbedElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.EMBED);
}, module$contents$goog$asserts$dom_assertIsHtmlFormElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.FORM);
}, module$contents$goog$asserts$dom_assertIsHtmlFrameElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.FRAME);
}, module$contents$goog$asserts$dom_assertIsHtmlIFrameElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.IFRAME);
}, module$contents$goog$asserts$dom_assertIsHtmlObjectElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.OBJECT);
}, module$contents$goog$asserts$dom_assertIsHtmlScriptElement = function(value) {
  return module$contents$goog$asserts$dom_assertIsHtmlElementOfType(value, goog.dom.TagName.SCRIPT);
}, module$contents$goog$asserts$dom_debugStringForType = function(value) {
  if (goog.isObject(value)) {
    try {
      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);
    } catch (e) {
      return "<object could not be stringified>";
    }
  } else {
    return value === void 0 ? "undefined" : value === null ? "null" : typeof value;
  }
};
goog.asserts.dom.assertIsElement = module$contents$goog$asserts$dom_assertIsElement;
goog.asserts.dom.assertIsHtmlElement = module$contents$goog$asserts$dom_assertIsHtmlElement;
goog.asserts.dom.assertIsHtmlElementOfType = module$contents$goog$asserts$dom_assertIsHtmlElementOfType;
goog.asserts.dom.assertIsHtmlAnchorElement = module$contents$goog$asserts$dom_assertIsHtmlAnchorElement;
goog.asserts.dom.assertIsHtmlButtonElement = module$contents$goog$asserts$dom_assertIsHtmlButtonElement;
goog.asserts.dom.assertIsHtmlLinkElement = module$contents$goog$asserts$dom_assertIsHtmlLinkElement;
goog.asserts.dom.assertIsHtmlImageElement = module$contents$goog$asserts$dom_assertIsHtmlImageElement;
goog.asserts.dom.assertIsHtmlAudioElement = module$contents$goog$asserts$dom_assertIsHtmlAudioElement;
goog.asserts.dom.assertIsHtmlVideoElement = module$contents$goog$asserts$dom_assertIsHtmlVideoElement;
goog.asserts.dom.assertIsHtmlInputElement = module$contents$goog$asserts$dom_assertIsHtmlInputElement;
goog.asserts.dom.assertIsHtmlTextAreaElement = module$contents$goog$asserts$dom_assertIsHtmlTextAreaElement;
goog.asserts.dom.assertIsHtmlCanvasElement = module$contents$goog$asserts$dom_assertIsHtmlCanvasElement;
goog.asserts.dom.assertIsHtmlEmbedElement = module$contents$goog$asserts$dom_assertIsHtmlEmbedElement;
goog.asserts.dom.assertIsHtmlFormElement = module$contents$goog$asserts$dom_assertIsHtmlFormElement;
goog.asserts.dom.assertIsHtmlFrameElement = module$contents$goog$asserts$dom_assertIsHtmlFrameElement;
goog.asserts.dom.assertIsHtmlIFrameElement = module$contents$goog$asserts$dom_assertIsHtmlIFrameElement;
goog.asserts.dom.assertIsHtmlObjectElement = module$contents$goog$asserts$dom_assertIsHtmlObjectElement;
goog.asserts.dom.assertIsHtmlScriptElement = module$contents$goog$asserts$dom_assertIsHtmlScriptElement;
goog.debug.errorcontext = {};
function module$contents$goog$debug$errorcontext_addErrorContext(err, contextKey, contextValue) {
  err.__closure__error__context__984382 || (err.__closure__error__context__984382 = {});
  err.__closure__error__context__984382[contextKey] = contextValue;
}
function module$contents$goog$debug$errorcontext_getErrorContext(err) {
  return err.__closure__error__context__984382 || {};
}
goog.debug.errorcontext.addErrorContext = module$contents$goog$debug$errorcontext_addErrorContext;
goog.debug.errorcontext.getErrorContext = module$contents$goog$debug$errorcontext_getErrorContext;
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.CHECK_FOR_THROWN_EVENT = !1;
goog.debug.catchErrors = function(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global, oldErrorHandler = target.onerror, retVal = !!opt_cancel;
  target.onerror = function(message, url, line, opt_col, opt_error) {
    oldErrorHandler && oldErrorHandler(message, url, line, opt_col, opt_error);
    logFunc({message:message, fileName:url, line:line, lineNumber:line, col:opt_col, error:opt_error});
    return retVal;
  };
};
goog.debug.expose = function(obj, opt_showFn) {
  if (typeof obj == "undefined") {
    return "undefined";
  }
  if (obj == null) {
    return "NULL";
  }
  var str = [], x;
  for (x in obj) {
    if (opt_showFn || typeof obj[x] !== "function") {
      var s = x + " = ";
      try {
        s += obj[x];
      } catch (e) {
        s += "*** " + e + " ***";
      }
      str.push(s);
    }
  }
  return str.join("\n");
};
goog.debug.deepExpose = function(obj, opt_showFn) {
  var str = [], uidsToCleanup = [], ancestorUids = {}, helper = function(obj, space) {
    var nestspace = space + "  ";
    try {
      if (obj === void 0) {
        str.push("undefined");
      } else if (obj === null) {
        str.push("NULL");
      } else if (typeof obj === "string") {
        str.push('"' + obj.replace(/\n/g, "\n" + space) + '"');
      } else if (typeof obj === "function") {
        str.push(String(obj).replace(/\n/g, "\n" + space));
      } else if (goog.isObject(obj)) {
        goog.hasUid(obj) || uidsToCleanup.push(obj);
        var uid = goog.getUid(obj);
        if (ancestorUids[uid]) {
          str.push("*** reference loop detected (id=" + uid + ") ***");
        } else {
          ancestorUids[uid] = !0;
          str.push("{");
          for (var x in obj) {
            if (opt_showFn || typeof obj[x] !== "function") {
              str.push("\n"), str.push(nestspace), str.push(x + " = "), helper(obj[x], nestspace);
            }
          }
          str.push("\n" + space + "}");
          delete ancestorUids[uid];
        }
      } else {
        str.push(obj);
      }
    } catch (e) {
      str.push("*** " + e + " ***");
    }
  };
  helper(obj, "");
  for (var i = 0; i < uidsToCleanup.length; i++) {
    goog.removeUid(uidsToCleanup[i]);
  }
  return str.join("");
};
goog.debug.exposeArray = function(arr) {
  for (var str = [], i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) ? str.push(goog.debug.exposeArray(arr[i])) : str.push(arr[i]);
  }
  return "[ " + str.join(", ") + " ]";
};
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName("window.location.href");
  err == null && (err = 'Unknown Error of type "null/undefined"');
  if (typeof err === "string") {
    return {message:err, name:"Unknown error", lineNumber:"Not available", fileName:href, stack:"Not available"};
  }
  var threwError = !1;
  try {
    var lineNumber = err.lineNumber || err.line || "Not available";
  } catch (e) {
    lineNumber = "Not available", threwError = !0;
  }
  try {
    var fileName = err.fileName || err.filename || err.sourceURL || goog.global.$googDebugFname || href;
  } catch (e) {
    fileName = "Not available", threwError = !0;
  }
  var stack = goog.debug.serializeErrorStack_(err);
  if (!(!threwError && err.lineNumber && err.fileName && err.stack && err.message && err.name)) {
    var message = err.message;
    if (message == null) {
      if (err.constructor && err.constructor instanceof Function) {
        var ctorName = err.constructor.name ? err.constructor.name : goog.debug.getFunctionName(err.constructor);
        message = 'Unknown Error of type "' + ctorName + '"';
        if (goog.debug.CHECK_FOR_THROWN_EVENT && ctorName == "Event") {
          try {
            message = message + ' with Event.type "' + (err.type || "") + '"';
          } catch (e) {
          }
        }
      } else {
        message = "Unknown Error of unknown type";
      }
      typeof err.toString === "function" && Object.prototype.toString !== err.toString && (message += ": " + err.toString());
    }
    return {message:message, name:err.name || "UnknownError", lineNumber:lineNumber, fileName:fileName, stack:stack || "Not available"};
  }
  return {message:err.message, name:err.name, lineNumber:err.lineNumber, fileName:err.fileName, stack:stack};
};
goog.debug.serializeErrorStack_ = function(e, seen) {
  seen || (seen = {});
  seen[goog.debug.serializeErrorAsKey_(e)] = !0;
  var stack = e.stack || "", cause = e.cause;
  cause && !seen[goog.debug.serializeErrorAsKey_(cause)] && (stack += "\nCaused by: ", cause.stack && cause.stack.indexOf(cause.toString()) == 0 || (stack += typeof cause === "string" ? cause : cause.message + "\n"), stack += goog.debug.serializeErrorStack_(cause, seen));
  var errors = e.errors;
  if (Array.isArray(errors)) {
    var actualIndex = 1, i;
    for (i = 0; i < errors.length && !(actualIndex > 4); i++) {
      seen[goog.debug.serializeErrorAsKey_(errors[i])] || (stack += "\nInner error " + actualIndex++ + ": ", errors[i].stack && errors[i].stack.indexOf(errors[i].toString()) == 0 || (stack += typeof errors[i] === "string" ? errors[i] : errors[i].message + "\n"), stack += goog.debug.serializeErrorStack_(errors[i], seen));
    }
    i < errors.length && (stack += "\n... " + (errors.length - i) + " more inner errors");
  }
  return stack;
};
goog.debug.serializeErrorAsKey_ = function(e) {
  var keyPrefix = "";
  typeof e.toString === "function" && (keyPrefix = "" + e);
  return keyPrefix + e.stack;
};
goog.debug.enhanceError = function(err, opt_message) {
  if (err instanceof Error) {
    var error = err;
  } else {
    error = Error(err), Error.captureStackTrace && Error.captureStackTrace(error, goog.debug.enhanceError);
  }
  error.stack || (error.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
  if (opt_message) {
    for (var x = 0; error["message" + x];) {
      ++x;
    }
    error["message" + x] = String(opt_message);
  }
  return error;
};
goog.debug.enhanceErrorWithContext = function(err, opt_context) {
  var error = goog.debug.enhanceError(err);
  if (opt_context) {
    for (var key in opt_context) {
      module$contents$goog$debug$errorcontext_addErrorContext(error, key, opt_context[key]);
    }
  }
  return error;
};
goog.debug.getStacktraceSimple = function(opt_depth) {
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var stack = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
    if (stack) {
      return stack;
    }
  }
  for (var sb = [], fn = arguments.callee.caller, depth = 0; fn && (!opt_depth || depth < opt_depth);) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push("()\n");
    try {
      fn = fn.caller;
    } catch (e) {
      sb.push("[exception trying to get caller]\n");
      break;
    }
    depth++;
    if (depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push("[...long stack...]");
      break;
    }
  }
  opt_depth && depth >= opt_depth ? sb.push("[...reached max depth limit...]") : sb.push("[end]");
  return sb.join("");
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(fn) {
  var tempErr = Error();
  if (Error.captureStackTrace) {
    return Error.captureStackTrace(tempErr, fn), String(tempErr.stack);
  }
  try {
    throw tempErr;
  } catch (e) {
    tempErr = e;
  }
  var stack = tempErr.stack;
  return stack ? String(stack) : null;
};
goog.debug.getStacktrace = function(fn) {
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var contextFn = fn || goog.debug.getStacktrace;
    var stack = goog.debug.getNativeStackTrace_(contextFn);
  }
  stack || (stack = goog.debug.getStacktraceHelper_(fn || arguments.callee.caller, []));
  return stack;
};
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];
  if (module$contents$goog$array_contains(visited, fn)) {
    sb.push("[...circular reference...]");
  } else if (fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
    sb.push(goog.debug.getFunctionName(fn) + "(");
    for (var args = fn.arguments, i = 0; args && i < args.length; i++) {
      i > 0 && sb.push(", ");
      var arg = args[i];
      switch(typeof arg) {
        case "object":
          var argDesc = arg ? "object" : "null";
          break;
        case "string":
          argDesc = arg;
          break;
        case "number":
          argDesc = String(arg);
          break;
        case "boolean":
          argDesc = arg ? "true" : "false";
          break;
        case "function":
          argDesc = (argDesc = goog.debug.getFunctionName(arg)) ? argDesc : "[fn]";
          break;
        default:
          argDesc = typeof arg;
      }
      argDesc.length > 40 && (argDesc = argDesc.slice(0, 40) + "...");
      sb.push(argDesc);
    }
    visited.push(fn);
    sb.push(")\n");
    try {
      sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited));
    } catch (e) {
      sb.push("[exception trying to get caller]\n");
    }
  } else {
    fn ? sb.push("[...long stack...]") : sb.push("[end]");
  }
  return sb.join("");
};
goog.debug.getFunctionName = function(fn) {
  if (goog.debug.fnNameCache_[fn]) {
    return goog.debug.fnNameCache_[fn];
  }
  var functionSource = String(fn);
  if (!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function\s+([^\(]+)/m.exec(functionSource);
    if (matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method;
    } else {
      goog.debug.fnNameCache_[functionSource] = "[Anonymous]";
    }
  }
  return goog.debug.fnNameCache_[functionSource];
};
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
goog.debug.runtimeType = function(value) {
  return value instanceof Function ? value.displayName || value.name || "unknown type name" : value instanceof Object ? value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value) : value === null ? "null" : typeof value;
};
goog.debug.fnNameCache_ = {};
goog.debug.freezeInternal_ = goog.DEBUG && Object.freeze || function(arg) {
  return arg;
};
goog.debug.freeze = function(arg) {
  return goog.debug.freezeInternal_(arg);
};
goog.math = {};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
};
goog.math.modulo = function(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
};
goog.math.lerp = function(a, b, x) {
  return a + x * (b - a);
};
goog.math.nearlyEquals = function(a, b, opt_tolerance) {
  return Math.abs(a - b) <= (opt_tolerance || 1E-6);
};
goog.math.standardAngle = function(angle) {
  return goog.math.modulo(angle, 360);
};
goog.math.standardAngleInRadians = function(angle) {
  return goog.math.modulo(angle, 2 * Math.PI);
};
goog.math.toRadians = function(angleDegrees) {
  return angleDegrees * Math.PI / 180;
};
goog.math.toDegrees = function(angleRadians) {
  return angleRadians * 180 / Math.PI;
};
goog.math.angleDx = function(degrees, radius) {
  return radius * Math.cos(goog.math.toRadians(degrees));
};
goog.math.angleDy = function(degrees, radius) {
  return radius * Math.sin(goog.math.toRadians(degrees));
};
goog.math.angle = function(x1, y1, x2, y2) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));
};
goog.math.angleDifference = function(startAngle, endAngle) {
  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);
  d > 180 ? d -= 360 : d <= -180 && (d = 360 + d);
  return d;
};
goog.math.sign = function(x) {
  return x > 0 ? 1 : x < 0 ? -1 : x;
};
goog.math.longestCommonSubsequence = function(array1, array2, opt_compareFn, opt_collectorFn) {
  var compare = opt_compareFn || function(a, b) {
    return a == b;
  }, collect = opt_collectorFn || function(i1) {
    return array1[i1];
  }, length1 = array1.length, length2 = array2.length, arr = [], i;
  for (i = 0; i < length1 + 1; i++) {
    arr[i] = [], arr[i][0] = 0;
  }
  var j;
  for (j = 0; j < length2 + 1; j++) {
    arr[0][j] = 0;
  }
  for (i = 1; i <= length1; i++) {
    for (j = 1; j <= length2; j++) {
      compare(array1[i - 1], array2[j - 1]) ? arr[i][j] = arr[i - 1][j - 1] + 1 : arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
    }
  }
  var result = [];
  i = length1;
  for (j = length2; i > 0 && j > 0;) {
    compare(array1[i - 1], array2[j - 1]) ? (result.unshift(collect(i - 1, j - 1)), i--, j--) : arr[i - 1][j] > arr[i][j - 1] ? i-- : j--;
  }
  return result;
};
goog.math.sum = function(var_args) {
  return Array.prototype.reduce.call(arguments, function(sum, value) {
    return sum + value;
  }, 0);
};
goog.math.average = function(var_args) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(var_args) {
  var sampleSize = arguments.length;
  if (sampleSize < 2) {
    return 0;
  }
  var mean = goog.math.average.apply(null, arguments), variance = goog.math.sum.apply(null, Array.prototype.map.call(arguments, function(val) {
    return Math.pow(val - mean, 2);
  })) / (sampleSize - 1);
  return variance;
};
goog.math.standardDeviation = function(var_args) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(num) {
  return isFinite(num) && num % 1 == 0;
};
goog.math.isFiniteNumber = function(num) {
  return isFinite(num);
};
goog.math.isNegativeZero = function(num) {
  return num == 0 && 1 / num < 0;
};
goog.math.log10Floor = function(num) {
  if (num > 0) {
    var x = Math.round(Math.log(num) * Math.LOG10E);
    return x - (parseFloat("1e" + x) > num ? 1 : 0);
  }
  return num == 0 ? -Infinity : NaN;
};
goog.math.safeFloor = function(num, opt_epsilon) {
  goog.asserts.assert(opt_epsilon === void 0 || opt_epsilon > 0);
  return Math.floor(num + (opt_epsilon || 2E-15));
};
goog.math.safeCeil = function(num, opt_epsilon) {
  goog.asserts.assert(opt_epsilon === void 0 || opt_epsilon > 0);
  return Math.ceil(num - (opt_epsilon || 2E-15));
};
goog.math.Coordinate = function(opt_x, opt_y) {
  this.x = opt_x !== void 0 ? opt_x : 0;
  this.y = opt_y !== void 0 ? opt_y : 0;
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y);
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
});
goog.math.Coordinate.prototype.equals = function(other) {
  return other instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, other);
};
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1;
};
goog.math.Coordinate.distance = function(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Coordinate.prototype.translate = function(tx, opt_ty) {
  tx instanceof goog.math.Coordinate ? (this.x += tx.x, this.y += tx.y) : (this.x += Number(tx), typeof opt_ty === "number" && (this.y += opt_ty));
  return this;
};
goog.math.Coordinate.prototype.scale = function(sx, opt_sy) {
  var sy = typeof opt_sy === "number" ? opt_sy : sx;
  this.x *= sx;
  this.y *= sy;
  return this;
};
goog.math.Size = function(width, height) {
  this.width = width;
  this.height = height;
};
goog.math.Size.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1;
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
  return "(" + this.width + " x " + this.height + ")";
});
goog.math.Size.prototype.area = function() {
  return this.width * this.height;
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height;
};
goog.math.Size.prototype.isEmpty = function() {
  return !this.area();
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Size.prototype.scale = function(sx, opt_sy) {
  var sy = typeof opt_sy === "number" ? opt_sy : sx;
  this.width *= sx;
  this.height *= sy;
  return this;
};
goog.object = {};
function module$contents$goog$object_forEach(obj, f, opt_obj) {
  for (var key in obj) {
    f.call(opt_obj, obj[key], key, obj);
  }
}
function module$contents$goog$object_filter(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    f.call(opt_obj, obj[key], key, obj) && (res[key] = obj[key]);
  }
  return res;
}
function module$contents$goog$object_map(obj, f, opt_obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj);
  }
  return res;
}
function module$contents$goog$object_some(obj, f, opt_obj) {
  for (var key in obj) {
    if (f.call(opt_obj, obj[key], key, obj)) {
      return !0;
    }
  }
  return !1;
}
function module$contents$goog$object_every(obj, f, opt_obj) {
  for (var key in obj) {
    if (!f.call(opt_obj, obj[key], key, obj)) {
      return !1;
    }
  }
  return !0;
}
function module$contents$goog$object_getCount(obj) {
  var rv = 0, key;
  for (key in obj) {
    rv++;
  }
  return rv;
}
function module$contents$goog$object_getAnyKey(obj) {
  for (var key in obj) {
    return key;
  }
}
function module$contents$goog$object_getAnyValue(obj) {
  for (var key in obj) {
    return obj[key];
  }
}
function module$contents$goog$object_contains(obj, val) {
  return module$contents$goog$object_containsValue(obj, val);
}
function module$contents$goog$object_getValues(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = obj[key];
  }
  return res;
}
function module$contents$goog$object_getKeys(obj) {
  var res = [], i = 0, key;
  for (key in obj) {
    res[i++] = key;
  }
  return res;
}
function module$contents$goog$object_getValueByKeys(obj, var_args) {
  for (var isArrayLike = goog.isArrayLike(var_args), keys = isArrayLike ? var_args : arguments, i = isArrayLike ? 0 : 1; i < keys.length; i++) {
    if (obj == null) {
      return;
    }
    obj = obj[keys[i]];
  }
  return obj;
}
function module$contents$goog$object_containsKey(obj, key) {
  return obj !== null && key in obj;
}
function module$contents$goog$object_containsValue(obj, val) {
  for (var key in obj) {
    if (obj[key] == val) {
      return !0;
    }
  }
  return !1;
}
function module$contents$goog$object_findKey(obj, f, thisObj) {
  for (var key in obj) {
    if (f.call(thisObj, obj[key], key, obj)) {
      return key;
    }
  }
}
function module$contents$goog$object_findValue(obj, f, thisObj) {
  var key = module$contents$goog$object_findKey(obj, f, thisObj);
  return key && obj[key];
}
function module$contents$goog$object_isEmpty(obj) {
  for (var key in obj) {
    return !1;
  }
  return !0;
}
function module$contents$goog$object_clear(obj) {
  for (var i in obj) {
    delete obj[i];
  }
}
function module$contents$goog$object_remove(obj, key) {
  var rv;
  (rv = key in obj) && delete obj[key];
  return rv;
}
function module$contents$goog$object_add(obj, key, val) {
  if (obj !== null && key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  obj[key] = val;
}
function module$contents$goog$object_get(obj, key, val) {
  return obj !== null && key in obj ? obj[key] : val;
}
function module$contents$goog$object_set(obj, key, value) {
  obj[key] = value;
}
function module$contents$goog$object_setIfUndefined(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value;
}
function module$contents$goog$object_setWithReturnValueIfNotSet(obj, key, f) {
  if (key in obj) {
    return obj[key];
  }
  var val = f();
  return obj[key] = val;
}
function module$contents$goog$object_equals(a, b) {
  for (var k in a) {
    if (!(k in b) || a[k] !== b[k]) {
      return !1;
    }
  }
  for (var k$jscomp$0 in b) {
    if (!(k$jscomp$0 in a)) {
      return !1;
    }
  }
  return !0;
}
function module$contents$goog$object_clone(obj) {
  var res = {}, key;
  for (key in obj) {
    res[key] = obj[key];
  }
  return res;
}
function module$contents$goog$object_unsafeClone(obj) {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  if (typeof obj.clone === "function") {
    return obj.clone();
  }
  if (typeof Map !== "undefined" && obj instanceof Map) {
    return new Map(obj);
  }
  if (typeof Set !== "undefined" && obj instanceof Set) {
    return new Set(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  var clone = Array.isArray(obj) ? [] : typeof ArrayBuffer !== "function" || typeof ArrayBuffer.isView !== "function" || !ArrayBuffer.isView(obj) || obj instanceof DataView ? {} : new obj.constructor(obj.length), key;
  for (key in obj) {
    clone[key] = module$contents$goog$object_unsafeClone(obj[key]);
  }
  return clone;
}
function module$contents$goog$object_transpose(obj) {
  var transposed = {}, key;
  for (key in obj) {
    transposed[obj[key]] = key;
  }
  return transposed;
}
var module$contents$goog$object_PROTOTYPE_FIELDS = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function module$contents$goog$object_extend(target, var_args) {
  for (var key, source, i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      target[key] = source[key];
    }
    for (var j = 0; j < module$contents$goog$object_PROTOTYPE_FIELDS.length; j++) {
      key = module$contents$goog$object_PROTOTYPE_FIELDS[j], Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
  }
}
function module$contents$goog$object_create(var_args) {
  var argLength = arguments.length;
  if (argLength == 1 && Array.isArray(arguments[0])) {
    return module$contents$goog$object_create.apply(null, arguments[0]);
  }
  if (argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var rv = {}, i = 0; i < argLength; i += 2) {
    rv[arguments[i]] = arguments[i + 1];
  }
  return rv;
}
function module$contents$goog$object_createSet(var_args) {
  var argLength = arguments.length;
  if (argLength == 1 && Array.isArray(arguments[0])) {
    return module$contents$goog$object_createSet.apply(null, arguments[0]);
  }
  for (var rv = {}, i = 0; i < argLength; i++) {
    rv[arguments[i]] = !0;
  }
  return rv;
}
function module$contents$goog$object_createImmutableView(obj) {
  var result = obj;
  Object.isFrozen && !Object.isFrozen(obj) && (result = Object.create(obj), Object.freeze(result));
  return result;
}
function module$contents$goog$object_isImmutableView(obj) {
  return !!Object.isFrozen && Object.isFrozen(obj);
}
function module$contents$goog$object_getAllPropertyNames(obj, includeObjectPrototype, includeFunctionPrototype) {
  if (!obj) {
    return [];
  }
  if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
    return module$contents$goog$object_getKeys(obj);
  }
  for (var visitedSet = {}, proto = obj; proto && (proto !== Object.prototype || includeObjectPrototype) && (proto !== Function.prototype || includeFunctionPrototype);) {
    for (var names = Object.getOwnPropertyNames(proto), i = 0; i < names.length; i++) {
      visitedSet[names[i]] = !0;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return module$contents$goog$object_getKeys(visitedSet);
}
function module$contents$goog$object_getSuperClass(constructor) {
  var proto = Object.getPrototypeOf(constructor.prototype);
  return proto && proto.constructor;
}
goog.object.add = module$contents$goog$object_add;
goog.object.clear = module$contents$goog$object_clear;
goog.object.clone = module$contents$goog$object_clone;
goog.object.contains = module$contents$goog$object_contains;
goog.object.containsKey = module$contents$goog$object_containsKey;
goog.object.containsValue = module$contents$goog$object_containsValue;
goog.object.create = module$contents$goog$object_create;
goog.object.createImmutableView = module$contents$goog$object_createImmutableView;
goog.object.createSet = module$contents$goog$object_createSet;
goog.object.equals = module$contents$goog$object_equals;
goog.object.every = module$contents$goog$object_every;
goog.object.extend = module$contents$goog$object_extend;
goog.object.filter = module$contents$goog$object_filter;
goog.object.findKey = module$contents$goog$object_findKey;
goog.object.findValue = module$contents$goog$object_findValue;
goog.object.forEach = module$contents$goog$object_forEach;
goog.object.get = module$contents$goog$object_get;
goog.object.getAllPropertyNames = module$contents$goog$object_getAllPropertyNames;
goog.object.getAnyKey = module$contents$goog$object_getAnyKey;
goog.object.getAnyValue = module$contents$goog$object_getAnyValue;
goog.object.getCount = module$contents$goog$object_getCount;
goog.object.getKeys = module$contents$goog$object_getKeys;
goog.object.getSuperClass = module$contents$goog$object_getSuperClass;
goog.object.getValueByKeys = module$contents$goog$object_getValueByKeys;
goog.object.getValues = module$contents$goog$object_getValues;
goog.object.isEmpty = module$contents$goog$object_isEmpty;
goog.object.isImmutableView = module$contents$goog$object_isImmutableView;
goog.object.map = module$contents$goog$object_map;
goog.object.remove = module$contents$goog$object_remove;
goog.object.set = module$contents$goog$object_set;
goog.object.setIfUndefined = module$contents$goog$object_setIfUndefined;
goog.object.setWithReturnValueIfNotSet = module$contents$goog$object_setWithReturnValueIfNotSet;
goog.object.some = module$contents$goog$object_some;
goog.object.transpose = module$contents$goog$object_transpose;
goog.object.unsafeClone = module$contents$goog$object_unsafeClone;
goog.string = {};
goog.string.Const = function(opt_token, opt_content) {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = opt_token === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && opt_content || "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.toString = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
goog.string.Const.unwrap = function(stringConst) {
  if (stringConst instanceof goog.string.Const && stringConst.constructor === goog.string.Const && stringConst.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return stringConst.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  }
  goog.asserts.fail("expected object of type Const, got '" + stringConst + "'");
  return "type_error:Const";
};
goog.string.Const.from = function(s) {
  return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, s);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.string.Const.EMPTY = goog.string.Const.from("");
goog.string.internal = {};
function module$contents$goog$string$internal_startsWith(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0;
}
function module$contents$goog$string$internal_endsWith(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
}
function module$contents$goog$string$internal_caseInsensitiveStartsWith(str, prefix) {
  return module$contents$goog$string$internal_caseInsensitiveCompare(prefix, str.slice(0, prefix.length)) == 0;
}
function module$contents$goog$string$internal_caseInsensitiveEndsWith(str, suffix) {
  return module$contents$goog$string$internal_caseInsensitiveCompare(suffix, str.slice(str.length - suffix.length)) == 0;
}
function module$contents$goog$string$internal_caseInsensitiveEquals(str1, str2) {
  return str1.toLowerCase() == str2.toLowerCase();
}
function module$contents$goog$string$internal_isEmptyOrWhitespace(str) {
  return /^[\s\xa0]*$/.test(str);
}
var module$contents$goog$string$internal_trim = goog.TRUSTED_SITE && (goog.FEATURESET_YEAR >= 2018 || String.prototype.trim) ? function(str) {
  return str.trim();
} : function(str) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(str)[1];
};
function module$contents$goog$string$internal_caseInsensitiveCompare(str1, str2) {
  var test1 = String(str1).toLowerCase(), test2 = String(str2).toLowerCase();
  return test1 < test2 ? -1 : test1 == test2 ? 0 : 1;
}
function module$contents$goog$string$internal_newLineToBr(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>");
}
function module$contents$goog$string$internal_htmlEscape(str, opt_isLikelyToContainHtmlChars) {
  if (opt_isLikelyToContainHtmlChars) {
    str = str.replace(module$contents$goog$string$internal_AMP_RE, "&amp;").replace(module$contents$goog$string$internal_LT_RE, "&lt;").replace(module$contents$goog$string$internal_GT_RE, "&gt;").replace(module$contents$goog$string$internal_QUOT_RE, "&quot;").replace(module$contents$goog$string$internal_SINGLE_QUOTE_RE, "&#39;").replace(module$contents$goog$string$internal_NULL_RE, "&#0;");
  } else {
    if (!module$contents$goog$string$internal_ALL_RE.test(str)) {
      return str;
    }
    str.indexOf("&") != -1 && (str = str.replace(module$contents$goog$string$internal_AMP_RE, "&amp;"));
    str.indexOf("<") != -1 && (str = str.replace(module$contents$goog$string$internal_LT_RE, "&lt;"));
    str.indexOf(">") != -1 && (str = str.replace(module$contents$goog$string$internal_GT_RE, "&gt;"));
    str.indexOf('"') != -1 && (str = str.replace(module$contents$goog$string$internal_QUOT_RE, "&quot;"));
    str.indexOf("'") != -1 && (str = str.replace(module$contents$goog$string$internal_SINGLE_QUOTE_RE, "&#39;"));
    str.indexOf("\x00") != -1 && (str = str.replace(module$contents$goog$string$internal_NULL_RE, "&#0;"));
  }
  return str;
}
var module$contents$goog$string$internal_AMP_RE = /&/g, module$contents$goog$string$internal_LT_RE = /</g, module$contents$goog$string$internal_GT_RE = />/g, module$contents$goog$string$internal_QUOT_RE = /"/g, module$contents$goog$string$internal_SINGLE_QUOTE_RE = /'/g, module$contents$goog$string$internal_NULL_RE = /\x00/g, module$contents$goog$string$internal_ALL_RE = /[\x00&<>"']/;
function module$contents$goog$string$internal_whitespaceEscape(str, opt_xml) {
  return module$contents$goog$string$internal_newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
}
function module$contents$goog$string$internal_contains(str, subString) {
  return str.indexOf(subString) != -1;
}
function module$contents$goog$string$internal_caseInsensitiveContains(str, subString) {
  return module$contents$goog$string$internal_contains(str.toLowerCase(), subString.toLowerCase());
}
function module$contents$goog$string$internal_compareVersions(version1, version2) {
  for (var order = 0, v1Subs = module$contents$goog$string$internal_trim(String(version1)).split("."), v2Subs = module$contents$goog$string$internal_trim(String(version2)).split("."), subCount = Math.max(v1Subs.length, v2Subs.length), subIdx = 0; order == 0 && subIdx < subCount; subIdx++) {
    var v1Sub = v1Subs[subIdx] || "", v2Sub = v2Subs[subIdx] || "";
    do {
      var v1Comp = /(\d*)(\D*)(.*)/.exec(v1Sub) || ["", "", "", ""], v2Comp = /(\d*)(\D*)(.*)/.exec(v2Sub) || ["", "", "", ""];
      if (v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break;
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10), v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = module$contents$goog$string$internal_compareElements(v1CompNum, v2CompNum) || module$contents$goog$string$internal_compareElements(v1Comp[2].length == 0, v2Comp[2].length == 0) || module$contents$goog$string$internal_compareElements(v1Comp[2], v2Comp[2]);
      v1Sub = v1Comp[3];
      v2Sub = v2Comp[3];
    } while (order == 0);
  }
  return order;
}
function module$contents$goog$string$internal_compareElements(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
goog.string.internal.caseInsensitiveCompare = module$contents$goog$string$internal_caseInsensitiveCompare;
goog.string.internal.caseInsensitiveContains = module$contents$goog$string$internal_caseInsensitiveContains;
goog.string.internal.caseInsensitiveEndsWith = module$contents$goog$string$internal_caseInsensitiveEndsWith;
goog.string.internal.caseInsensitiveEquals = module$contents$goog$string$internal_caseInsensitiveEquals;
goog.string.internal.caseInsensitiveStartsWith = module$contents$goog$string$internal_caseInsensitiveStartsWith;
goog.string.internal.compareVersions = module$contents$goog$string$internal_compareVersions;
goog.string.internal.contains = module$contents$goog$string$internal_contains;
goog.string.internal.endsWith = module$contents$goog$string$internal_endsWith;
goog.string.internal.htmlEscape = module$contents$goog$string$internal_htmlEscape;
goog.string.internal.isEmptyOrWhitespace = module$contents$goog$string$internal_isEmptyOrWhitespace;
goog.string.internal.newLineToBr = module$contents$goog$string$internal_newLineToBr;
goog.string.internal.startsWith = module$contents$goog$string$internal_startsWith;
goog.string.internal.trim = module$contents$goog$string$internal_trim;
goog.string.internal.whitespaceEscape = module$contents$goog$string$internal_whitespaceEscape;
/*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
function module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(valueOf) {
  return {valueOf:valueOf}.valueOf();
}
;var module$exports$google3$third_party$javascript$safevalues$internals$secrets = {secretToken:{}};
function module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token) {
  if (goog.DEBUG && token !== module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken) {
    throw Error("Bad secret");
  }
}
module$exports$google3$third_party$javascript$safevalues$internals$secrets.ensureTokenIsValid = module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid;
var module$exports$google3$third_party$javascript$safevalues$internals$trusted_types = {}, module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_configuredPolicyName = goog.TRUSTED_TYPES_POLICY_NAME ? goog.TRUSTED_TYPES_POLICY_NAME + "#html" : "", module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policyName = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_configuredPolicyName;
module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes = globalThis.trustedTypes;
var module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_trustedTypesInternal = module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes, module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policy;
function module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_createPolicy() {
  var policy = null;
  if (module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policyName === "" || !module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_trustedTypesInternal) {
    return policy;
  }
  try {
    var identity = function(x) {
      return x;
    };
    policy = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_trustedTypesInternal.createPolicy(module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policyName, {createHTML:identity, createScript:identity, createScriptURL:identity});
  } catch (e) {
    if (goog.DEBUG) {
      throw e;
    }
  }
  return policy;
}
function module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_getPolicy() {
  module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policy === void 0 && (module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policy = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_createPolicy());
  return module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policy;
}
module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.getPolicy = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_getPolicy;
module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.TEST_ONLY = {setPolicyName:function(name) {
  module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policyName = name;
}, setTrustedTypes:function(mockTrustedTypes) {
  module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_trustedTypesInternal = mockTrustedTypes;
}, resetDefaults:function() {
  module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policy = void 0;
  module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_policyName = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_configuredPolicyName;
  module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_trustedTypesInternal = module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes;
}};
var module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl = {TrustedResourceUrl:function(token, value) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
  this.privateDoNotAccessOrElseWrappedResourceUrl = value;
}};
module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl.prototype.toString = function() {
  return this.privateDoNotAccessOrElseWrappedResourceUrl + "";
};
function module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(value$jscomp$0) {
  var noinlineValue = value$jscomp$0, policy = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_getPolicy(), JSCompiler_inline_result, value = policy ? policy.createScriptURL(noinlineValue) : noinlineValue;
  return JSCompiler_inline_result = new module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, value);
}
module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.createResourceUrlInternal = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal;
function module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_isResourceUrl(value) {
  return value instanceof module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl;
}
module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.isResourceUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_isResourceUrl;
function module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(value) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_isResourceUrl(value)) {
    return value.privateDoNotAccessOrElseWrappedResourceUrl;
  }
  var message = "";
  goog.DEBUG && (message = "Unexpected type when unwrapping TrustedResourceUrl");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.unwrapResourceUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl;
var $jscomp$templatelit$m425881384$5 = $jscomp.createTemplateTagFirstArg([""]), $jscomp$templatelit$m425881384$6 = $jscomp.createTemplateTagFirstArgWithRaw(["\x00"], ["\\0"]), $jscomp$templatelit$m425881384$7 = $jscomp.createTemplateTagFirstArgWithRaw(["\n"], ["\\n"]), $jscomp$templatelit$m425881384$8 = $jscomp.createTemplateTagFirstArgWithRaw(["\x00"], ["\\u0000"]), $jscomp$templatelit$m425881384$9 = $jscomp.createTemplateTagFirstArg([""]), $jscomp$templatelit$m425881384$10 = $jscomp.createTemplateTagFirstArgWithRaw(["\x00"], 
["\\0"]), $jscomp$templatelit$m425881384$11 = $jscomp.createTemplateTagFirstArgWithRaw(["\n"], ["\\n"]), $jscomp$templatelit$m425881384$12 = $jscomp.createTemplateTagFirstArgWithRaw(["\x00"], ["\\u0000"]);
function module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, numExprs) {
  if (!Array.isArray(templateObj) || !Array.isArray(templateObj.raw) || templateObj.length !== templateObj.raw.length || !module$contents$google3$third_party$javascript$safevalues$internals$string_literal_isTranspiled && templateObj === templateObj.raw || !(module$contents$google3$third_party$javascript$safevalues$internals$string_literal_isTranspiled && !module$contents$google3$third_party$javascript$safevalues$internals$string_literal_frozenTSA || module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkFrozen(templateObj)) || 
  numExprs + 1 !== templateObj.length) {
    throw new TypeError("\n    ############################## ERROR ##############################\n\n    It looks like you are trying to call a template tag function (fn`...`)\n    using the normal function syntax (fn(...)), which is not supported.\n\n    The functions in the safevalues library are not designed to be called\n    like normal functions, and doing so invalidates the security guarantees\n    that safevalues provides.\n\n    If you are stuck and not sure how to proceed, please reach out to us\n    instead through:\n     - go/ise-hardening-yaqs (preferred) // LINE-INTERNAL\n     - g/ise-hardening // LINE-INTERNAL\n     - https://github.com/google/safevalues/issues\n\n    ############################## ERROR ##############################");
  }
}
function module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkFrozen(templateObj) {
  return Object.isFrozen(templateObj) && Object.isFrozen(templateObj.raw);
}
function module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkTranspiled(fn) {
  return fn.toString().indexOf("`") === -1;
}
var module$contents$google3$third_party$javascript$safevalues$internals$string_literal_isTranspiled = module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkTranspiled(function(tag) {
  return tag($jscomp$templatelit$m425881384$5);
}) || module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkTranspiled(function(tag) {
  return tag($jscomp$templatelit$m425881384$6);
}) || module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkTranspiled(function(tag) {
  return tag($jscomp$templatelit$m425881384$7);
}) || module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkTranspiled(function(tag) {
  return tag($jscomp$templatelit$m425881384$8);
}), module$contents$google3$third_party$javascript$safevalues$internals$string_literal_frozenTSA = module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkFrozen($jscomp$templatelit$m425881384$9) && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkFrozen($jscomp$templatelit$m425881384$10) && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkFrozen($jscomp$templatelit$m425881384$11) && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_checkFrozen($jscomp$templatelit$m425881384$12);
var module$exports$google3$third_party$javascript$safevalues$internals$url_impl = {SafeUrl:function(token, value) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
  this.privateDoNotAccessOrElseWrappedUrl = value;
}};
module$exports$google3$third_party$javascript$safevalues$internals$url_impl.SafeUrl.prototype.toString = function() {
  return this.privateDoNotAccessOrElseWrappedUrl;
};
function module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(value) {
  return new module$exports$google3$third_party$javascript$safevalues$internals$url_impl.SafeUrl(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, value);
}
module$exports$google3$third_party$javascript$safevalues$internals$url_impl.createUrlInternal = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal;
module$exports$google3$third_party$javascript$safevalues$internals$url_impl.ABOUT_BLANK = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal("about:blank");
module$exports$google3$third_party$javascript$safevalues$internals$url_impl.INNOCUOUS_URL = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal("about:invalid#zClosurez");
function module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl(value) {
  return value instanceof module$exports$google3$third_party$javascript$safevalues$internals$url_impl.SafeUrl;
}
module$exports$google3$third_party$javascript$safevalues$internals$url_impl.isUrl = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl;
function module$contents$google3$third_party$javascript$safevalues$internals$url_impl_unwrapUrl(value) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl(value)) {
    return value.privateDoNotAccessOrElseWrappedUrl;
  }
  var message = "";
  goog.DEBUG && (message = "Unexpected type when unwrapping SafeUrl, got '" + value + "' of type '" + typeof value + "'");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$internals$url_impl.unwrapUrl = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_unwrapUrl;
var module$exports$google3$third_party$javascript$safevalues$builders$url_builders = {};
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_Scheme() {
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.Scheme = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_Scheme;
var module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl = function(isValid) {
  this.isValid = isValid;
};
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme(scheme) {
  return new module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl(function(url) {
    return url.substr(0, scheme.length + 1).toLowerCase() === scheme + ":";
  });
}
var module$contents$google3$third_party$javascript$safevalues$builders$url_builders_RELATIVE_SCHEME = new module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl(function(url) {
  return /^[^:]*([/?#]|$)/.test(url);
}), module$contents$google3$third_party$javascript$safevalues$builders$url_builders_CALLTO_SCHEME = new module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl(function(url) {
  return /^callto:\+?\d*$/i.test(url);
}), module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SSH_SCHEME = new module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl(function(url) {
  return url.indexOf("ssh://") === 0;
}), module$contents$google3$third_party$javascript$safevalues$builders$url_builders_EXTENSION_SCHEME = new module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl(function(url) {
  return url.indexOf("chrome-extension://") === 0 || url.indexOf("moz-extension://") === 0 || url.indexOf("ms-browser-extension://") === 0;
}), module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SIP_SCHEME = new module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl(function(url) {
  return url.indexOf("sip:") === 0 || url.indexOf("sips:") === 0;
});
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme = {TEL:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("tel"), CALLTO:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_CALLTO_SCHEME, SSH:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SSH_SCHEME, RTSP:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("rtsp"), 
DATA:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("data"), HTTP:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("http"), HTTPS:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("https"), EXTENSION:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_EXTENSION_SCHEME, FTP:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("ftp"), 
RELATIVE:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_RELATIVE_SCHEME, MAILTO:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("mailto"), INTENT:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("intent"), MARKET:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("market"), ITMS:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("itms"), 
ITMS_APPSS:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("itms-appss"), ITMS_SERVICES:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("itms-services"), FACEBOOK_MESSENGER:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("fb-messenger"), WHATSAPP:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("whatsapp"), SIP:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SIP_SCHEME, 
SMS:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("sms"), VND_YOUTUBE:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("vnd.youtube"), GOOGLEHOME:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("googlehome"), GOOGLEHOMESDK:module$contents$google3$third_party$javascript$safevalues$builders$url_builders_simpleScheme("googlehomesdk")};
var module$contents$google3$third_party$javascript$safevalues$builders$url_builders_DEFAULT_SCHEMES = [module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme.DATA, module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme.HTTP, module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme.HTTPS, module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme.MAILTO, 
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme.FTP, module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme.RELATIVE];
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_trySanitizeUrl(url, allowedSchemes) {
  allowedSchemes = allowedSchemes === void 0 ? module$contents$google3$third_party$javascript$safevalues$builders$url_builders_DEFAULT_SCHEMES : allowedSchemes;
  if (module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl(url)) {
    return url;
  }
  for (var i = 0; i < allowedSchemes.length; ++i) {
    var scheme = allowedSchemes[i];
    if (scheme instanceof module$contents$google3$third_party$javascript$safevalues$builders$url_builders_SchemeImpl && scheme.isValid(url)) {
      return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(url);
    }
  }
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.trySanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_trySanitizeUrl;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrl(url, allowedSchemes) {
  allowedSchemes = allowedSchemes === void 0 ? module$contents$google3$third_party$javascript$safevalues$builders$url_builders_DEFAULT_SCHEMES : allowedSchemes;
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_trySanitizeUrl(url, allowedSchemes);
  sanitizedUrl === void 0 && module$contents$google3$third_party$javascript$safevalues$builders$url_builders_triggerCallbacks(url.toString());
  return sanitizedUrl || module$exports$google3$third_party$javascript$safevalues$internals$url_impl.INNOCUOUS_URL;
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.sanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrl;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_objectUrlFromSafeSource(source) {
  var windowAsAny = window;
  if (typeof MediaSource !== "undefined" && source instanceof MediaSource || typeof windowAsAny.ManagedMediaSource !== "undefined" && source instanceof windowAsAny.ManagedMediaSource) {
    return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(URL.createObjectURL(source));
  }
  var blob = source;
  var mimeType = blob.type;
  if (mimeType.toLowerCase() === "application/octet-stream") {
    var JSCompiler_inline_result = !0;
  } else {
    var match = mimeType.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i), $jscomp$inline_64;
    JSCompiler_inline_result = (($jscomp$inline_64 = match) == null ? void 0 : $jscomp$inline_64.length) === 2 && (/^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif|avif|x-ms-bmp)$/i.test(match[1]) || /^video\/(?:3gpp|avi|mpeg|mpg|mp4|ogg|webm|x-flv|x-matroska|quicktime|x-ms-wmv)$/i.test(match[1]) || /^audio\/(?:3gpp2|3gpp|aac|amr|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(match[1]) || /^font\/[\w-]+$/i.test(match[1]));
  }
  if (!JSCompiler_inline_result) {
    var message = "";
    goog.DEBUG && (message = "unsafe blob MIME type: " + blob.type);
    throw Error(message);
  }
  return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(URL.createObjectURL(blob));
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.objectUrlFromSafeSource = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_objectUrlFromSafeSource;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromMediaSource(media) {
  if (typeof MediaSource !== "undefined" && media instanceof MediaSource) {
    return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(URL.createObjectURL(media));
  }
  var message = "";
  goog.DEBUG && (message = "fromMediaSource only accepts MediaSource instances, but was called with " + media + ".");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.fromMediaSource = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromMediaSource;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromTrustedResourceUrl(url) {
  return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url).toString());
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.fromTrustedResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromTrustedResourceUrl;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_safeUrl(templateObj) {
  var rest = $jscomp.getRestArguments.apply(1, arguments);
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, rest.length);
  var prefix = templateObj[0];
  if (goog.DEBUG) {
    var prefix$jscomp$0 = prefix, isWholeUrl = rest.length === 0, markerIdx = prefix$jscomp$0.search(/[:/?#]/);
    if (markerIdx < 0) {
      var JSCompiler_inline_result = isWholeUrl;
    } else {
      if (prefix$jscomp$0.charAt(markerIdx) !== ":") {
        JSCompiler_inline_result = !0;
      } else {
        var scheme = prefix$jscomp$0.substring(0, markerIdx).toLowerCase();
        JSCompiler_inline_result = /^[a-z][a-z\d+.-]*$/.test(scheme) && scheme !== "javascript";
      }
    }
    if (!JSCompiler_inline_result) {
      throw Error("Trying to interpolate with unsupported prefix: " + prefix);
    }
  }
  for (var urlParts = [prefix], i = 0; i < rest.length; i++) {
    urlParts.push(String(rest[i])), urlParts.push(templateObj[i + 1]);
  }
  return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(urlParts.join(""));
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.safeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_safeUrl;
var module$contents$google3$third_party$javascript$safevalues$builders$url_builders_ASSUME_IMPLEMENTS_URL_API = goog.FEATURESET_YEAR >= 2020, module$contents$google3$third_party$javascript$safevalues$builders$url_builders_supportsURLAPI = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return module$contents$google3$third_party$javascript$safevalues$builders$url_builders_ASSUME_IMPLEMENTS_URL_API ? !0 : typeof URL === "function";
});
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_extractScheme(url) {
  if (!module$contents$google3$third_party$javascript$safevalues$builders$url_builders_supportsURLAPI) {
    a: {
      var aTag = document.createElement("a");
      try {
        aTag.href = url;
      } catch (e) {
        var JSCompiler_inline_result = void 0;
        break a;
      }
      var protocol = aTag.protocol;
      JSCompiler_inline_result = protocol === ":" || protocol === "" ? "https:" : protocol;
    }
    return JSCompiler_inline_result;
  }
  try {
    var parsedUrl = new URL(url);
  } catch (e) {
    return "https:";
  }
  return parsedUrl.protocol;
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.extractScheme = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_extractScheme;
var module$contents$google3$third_party$javascript$safevalues$builders$url_builders_ALLOWED_SCHEMES = ["data:", "http:", "https:", "mailto:", "ftp:"];
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.IS_NOT_JAVASCRIPT_URL_PATTERN = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_reportJavaScriptUrl(url) {
  var hasJavascriptUrlScheme = !module$exports$google3$third_party$javascript$safevalues$builders$url_builders.IS_NOT_JAVASCRIPT_URL_PATTERN.test(url);
  hasJavascriptUrlScheme && module$contents$google3$third_party$javascript$safevalues$builders$url_builders_triggerCallbacks(url);
  return hasJavascriptUrlScheme;
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.reportJavaScriptUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_reportJavaScriptUrl;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeJavaScriptUrl(url) {
  if (!module$contents$google3$third_party$javascript$safevalues$builders$url_builders_reportJavaScriptUrl(url)) {
    return url;
  }
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.sanitizeJavaScriptUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeJavaScriptUrl;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrlForMigration(url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeJavaScriptUrl(url);
  return sanitizedUrl === void 0 ? module$exports$google3$third_party$javascript$safevalues$internals$url_impl.INNOCUOUS_URL : module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(sanitizedUrl);
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.sanitizeUrlForMigration = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrlForMigration;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url) {
  return url instanceof module$exports$google3$third_party$javascript$safevalues$internals$url_impl.SafeUrl ? module$contents$google3$third_party$javascript$safevalues$internals$url_impl_unwrapUrl(url) : module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeJavaScriptUrl(url);
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.unwrapUrlOrSanitize = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_restrictivelySanitizeUrl(url) {
  var parsedScheme = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_extractScheme(url);
  return parsedScheme !== void 0 && module$contents$google3$third_party$javascript$safevalues$builders$url_builders_ALLOWED_SCHEMES.indexOf(parsedScheme.toLowerCase()) !== -1 ? url : "about:invalid#zClosurez";
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.restrictivelySanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_restrictivelySanitizeUrl;
var module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizationCallbacks = [], module$contents$google3$third_party$javascript$safevalues$builders$url_builders_triggerCallbacks = function() {
};
goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$builders$url_builders_addJavaScriptUrlSanitizationCallback(function(url) {
  console.warn("A URL with content '" + url + "' was sanitized away.");
});
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_addJavaScriptUrlSanitizationCallback(callback) {
  module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizationCallbacks.indexOf(callback) === -1 && module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizationCallbacks.push(callback);
  module$contents$google3$third_party$javascript$safevalues$builders$url_builders_triggerCallbacks = function(url) {
    module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizationCallbacks.forEach(function(callback) {
      callback(url);
    });
  };
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.addJavaScriptUrlSanitizationCallback = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_addJavaScriptUrlSanitizationCallback;
function module$contents$google3$third_party$javascript$safevalues$builders$url_builders_removeJavaScriptUrlSanitizationCallback(callback) {
  var callbackIndex = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizationCallbacks.indexOf(callback);
  callbackIndex !== -1 && module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizationCallbacks.splice(callbackIndex, 1);
}
module$exports$google3$third_party$javascript$safevalues$builders$url_builders.removeJavaScriptUrlSanitizationCallback = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_removeJavaScriptUrlSanitizationCallback;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHref(anchor, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && (anchor.href = sanitizedUrl);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHrefLite(anchor, url) {
  module$contents$google3$third_party$javascript$safevalues$builders$url_builders_reportJavaScriptUrl(url) || (anchor.href = url);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$elements$area_setAreaHref(area, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && (area.href = sanitizedUrl);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$elements$base_setBaseHref(baseEl, url) {
  baseEl.href = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$elements$button_setButtonFormaction(button, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && (button.formAction = sanitizedUrl);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$elements$embed_setEmbedSrc(embedEl, url) {
  embedEl.src = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormAction(form, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && (form.action = sanitizedUrl);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormActionLite(form, url) {
  module$contents$google3$third_party$javascript$safevalues$builders$url_builders_reportJavaScriptUrl(url) || (form.action = url);
}
;var module$exports$google3$third_party$javascript$safevalues$internals$html_impl = {SafeHtml:function(token, value) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
  this.privateDoNotAccessOrElseWrappedHtml = value;
}};
module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml.prototype.toString = function() {
  return this.privateDoNotAccessOrElseWrappedHtml + "";
};
function module$contents$google3$third_party$javascript$safevalues$internals$html_impl_createHtmlInternal(value$jscomp$0) {
  var noinlineValue = value$jscomp$0, policy = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_getPolicy(), JSCompiler_inline_result, value = policy ? policy.createHTML(noinlineValue) : noinlineValue;
  return JSCompiler_inline_result = new module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, value);
}
module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal = module$contents$google3$third_party$javascript$safevalues$internals$html_impl_createHtmlInternal;
module$exports$google3$third_party$javascript$safevalues$internals$html_impl.EMPTY_HTML = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes ? module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes.emptyHTML : "");
});
function module$contents$google3$third_party$javascript$safevalues$internals$html_impl_isHtml(value) {
  return value instanceof module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml;
}
module$exports$google3$third_party$javascript$safevalues$internals$html_impl.isHtml = module$contents$google3$third_party$javascript$safevalues$internals$html_impl_isHtml;
function module$contents$google3$third_party$javascript$safevalues$internals$html_impl_unwrapHtml(value) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$html_impl_isHtml(value)) {
    return value.privateDoNotAccessOrElseWrappedHtml;
  }
  var message = "";
  goog.DEBUG && (message = "Unexpected type when unwrapping SafeHtml");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml = module$contents$google3$third_party$javascript$safevalues$internals$html_impl_unwrapHtml;
var module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe = {};
function module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrc(iframe, v) {
  iframe.src = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(v).toString();
}
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.setIframeSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrc;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc(iframe, v) {
  iframe.srcdoc = (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(v);
}
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.setIframeSrcdoc = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc;
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent = {FORMATTED_HTML_CONTENT:0, EMBEDDED_INTERNAL_CONTENT:1, EMBEDDED_TRUSTED_EXTERNAL_CONTENT:2};
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent[module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.FORMATTED_HTML_CONTENT] = "FORMATTED_HTML_CONTENT";
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent[module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_INTERNAL_CONTENT] = "EMBEDDED_INTERNAL_CONTENT";
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent[module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT] = "EMBEDDED_TRUSTED_EXTERNAL_CONTENT";
var module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective = {ALLOW_SAME_ORIGIN:"allow-same-origin", ALLOW_SCRIPTS:"allow-scripts", ALLOW_FORMS:"allow-forms", ALLOW_POPUPS:"allow-popups", ALLOW_POPUPS_TO_ESCAPE_SANDBOX:"allow-popups-to-escape-sandbox", ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION:"allow-storage-access-by-user-activation"};
function module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(ifr, directives) {
  ifr.setAttribute("sandbox", "");
  for (var i = 0; i < directives.length; i++) {
    ifr.sandbox.supports && !ifr.sandbox.supports(directives[i]) || ifr.sandbox.add(directives[i]);
  }
}
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError = function(type, intent) {
  var $jscomp$tmp$error$494508883$1 = Error.call(this, type + " cannot be used with intent " + module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent[intent]);
  this.message = $jscomp$tmp$error$494508883$1.message;
  "stack" in $jscomp$tmp$error$494508883$1 && (this.stack = $jscomp$tmp$error$494508883$1.stack);
  this.type = type;
  this.name = "TypeCannotBeUsedWithIframeIntentError";
};
$jscomp.inherits(module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError, Error);
function module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcWithIntent(element, intent, src) {
  element.removeAttribute("srcdoc");
  switch(intent) {
    case module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.FORMATTED_HTML_CONTENT:
      if (src instanceof module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl) {
        throw new module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError("TrustedResourceUrl", module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.FORMATTED_HTML_CONTENT);
      }
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(element, []);
      var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(src);
      sanitizedUrl !== void 0 && (element.src = sanitizedUrl);
      break;
    case module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_INTERNAL_CONTENT:
      if (!(src instanceof module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl)) {
        throw new module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError(typeof src, module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_INTERNAL_CONTENT);
      }
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(element, [module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SAME_ORIGIN, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SCRIPTS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_FORMS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS, 
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION]);
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrc(element, src);
      break;
    case module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT:
      if (src instanceof module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl) {
        throw new module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError("TrustedResourceUrl", module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT);
      }
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(element, [module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SAME_ORIGIN, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SCRIPTS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_FORMS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS, 
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION]);
      var sanitizedUrl$jscomp$0 = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(src);
      sanitizedUrl$jscomp$0 !== void 0 && (element.src = sanitizedUrl$jscomp$0);
      break;
    default:
      module$contents$google3$javascript$typescript$contrib$check_checkExhaustiveAllowing(intent, void 0);
  }
}
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.setIframeSrcWithIntent = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcWithIntent;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdocWithIntent(element, intent, srcdoc) {
  element.removeAttribute("src");
  switch(intent) {
    case module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.FORMATTED_HTML_CONTENT:
      if (srcdoc instanceof module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml) {
        throw new module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError("SafeHtml", module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.FORMATTED_HTML_CONTENT);
      }
      element.csp = "default-src 'none'";
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(element, []);
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc(element, (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(srcdoc));
      break;
    case module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_INTERNAL_CONTENT:
      if (!(srcdoc instanceof module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml)) {
        throw new module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError("string", module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_INTERNAL_CONTENT);
      }
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(element, [module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SAME_ORIGIN, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SCRIPTS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_FORMS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS, 
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION]);
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc(element, srcdoc);
      break;
    case module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_TRUSTED_EXTERNAL_CONTENT:
      if (srcdoc instanceof module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml) {
        throw new module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError("SafeHtml", module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent.EMBEDDED_INTERNAL_CONTENT);
      }
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setSandboxDirectives(element, [module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_SCRIPTS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_FORMS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS, module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_POPUPS_TO_ESCAPE_SANDBOX, 
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_SandboxDirective.ALLOW_STORAGE_ACCESS_BY_USER_ACTIVATION]);
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc(element, (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(srcdoc));
      break;
    default:
      module$contents$google3$javascript$typescript$contrib$check_checkExhaustiveAllowing(intent, void 0);
  }
}
module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.setIframeSrcdocWithIntent = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdocWithIntent;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$input_setInputFormaction(input, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && (input.formAction = sanitizedUrl);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$elements$object_setObjectData(obj, v) {
  obj.data = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(v);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$window_windowOpen(win, url, target, features) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  return sanitizedUrl !== void 0 ? win.open(sanitizedUrl, target, features) : null;
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getScriptNonce(doc) {
  return module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getNonceFor("script", doc);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getStyleNonce(doc) {
  return module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getNonceFor("style", doc);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getNonceFor(elementName, doc) {
  doc = doc === void 0 ? document : doc;
  var $jscomp$optchain$tmpm1987982378$0, $jscomp$optchain$tmpm1987982378$1, el = ($jscomp$optchain$tmpm1987982378$1 = ($jscomp$optchain$tmpm1987982378$0 = doc).querySelector) == null ? void 0 : $jscomp$optchain$tmpm1987982378$1.call($jscomp$optchain$tmpm1987982378$0, elementName + "[nonce]");
  return el == null ? "" : el.nonce || el.getAttribute("nonce") || "";
}
;var module$exports$google3$third_party$javascript$safevalues$internals$script_impl = {SafeScript:function(token, value) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
  this.privateDoNotAccessOrElseWrappedScript = value;
}};
module$exports$google3$third_party$javascript$safevalues$internals$script_impl.SafeScript.prototype.toString = function() {
  return this.privateDoNotAccessOrElseWrappedScript + "";
};
function module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal(value$jscomp$0) {
  var noinlineValue = value$jscomp$0, policy = module$contents$google3$third_party$javascript$safevalues$internals$trusted_types_getPolicy(), JSCompiler_inline_result, value = policy ? policy.createScript(noinlineValue) : noinlineValue;
  return JSCompiler_inline_result = new module$exports$google3$third_party$javascript$safevalues$internals$script_impl.SafeScript(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, value);
}
module$exports$google3$third_party$javascript$safevalues$internals$script_impl.createScriptInternal = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal;
module$exports$google3$third_party$javascript$safevalues$internals$script_impl.EMPTY_SCRIPT = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new module$exports$google3$third_party$javascript$safevalues$internals$script_impl.SafeScript(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes ? module$exports$google3$third_party$javascript$safevalues$internals$trusted_types.trustedTypes.emptyScript : "");
});
function module$contents$google3$third_party$javascript$safevalues$internals$script_impl_isScript(value) {
  return value instanceof module$exports$google3$third_party$javascript$safevalues$internals$script_impl.SafeScript;
}
module$exports$google3$third_party$javascript$safevalues$internals$script_impl.isScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_isScript;
function module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript(value) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$script_impl_isScript(value)) {
    return value.privateDoNotAccessOrElseWrappedScript;
  }
  var message = "";
  goog.DEBUG && (message = "Unexpected type when unwrapping SafeScript");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$internals$script_impl.unwrapScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setNonceForScriptElement(script) {
  var nonce = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getScriptNonce(script.ownerDocument);
  nonce && script.setAttribute("nonce", nonce);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptTextContent(script, v, options) {
  script.textContent = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript(v);
  var $jscomp$optchain$tmpm314130740$0;
  (($jscomp$optchain$tmpm314130740$0 = options) == null ? 0 : $jscomp$optchain$tmpm314130740$0.omitNonce) || module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setNonceForScriptElement(script);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptSrc(script, v, options) {
  script.src = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(v);
  var $jscomp$optchain$tmpm314130740$1;
  (($jscomp$optchain$tmpm314130740$1 = options) == null ? 0 : $jscomp$optchain$tmpm314130740$1.omitNonce) || module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setNonceForScriptElement(script);
}
;var module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl = {SafeAttributePrefix:function(token, value) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
  this.privateDoNotAccessOrElseWrappedAttributePrefix = value;
}};
module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.SafeAttributePrefix.prototype.toString = function() {
  return this.privateDoNotAccessOrElseWrappedAttributePrefix;
};
function module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_createAttributePrefixInternal(value) {
  return new module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.SafeAttributePrefix(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, value);
}
module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.createAttributePrefixInternal = module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_createAttributePrefixInternal;
function module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_isAttributePrefix(value) {
  return value instanceof module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.SafeAttributePrefix;
}
module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.isAttributePrefix = module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_isAttributePrefix;
function module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_unwrapAttributePrefix(value) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_isAttributePrefix(value)) {
    return value.privateDoNotAccessOrElseWrappedAttributePrefix;
  }
  var message = "";
  goog.DEBUG && (message = "Unexpected type when unwrapping SafeAttributePrefix, got '" + value + "' of type '" + typeof value + "'");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.unwrapAttributePrefix = module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_unwrapAttributePrefix;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementInnerHtml(elOrRoot, v) {
  elOrRoot.nodeType === 1 && module$contents$google3$third_party$javascript$safevalues$dom$elements$element_throwIfScriptOrStyle(elOrRoot);
  elOrRoot.innerHTML = (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(v);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementOuterHtml(e, v) {
  var parent = e.parentElement;
  parent !== null && module$contents$google3$third_party$javascript$safevalues$dom$elements$element_throwIfScriptOrStyle(parent);
  e.outerHTML = (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(v);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_elementInsertAdjacentHtml(element, position, v) {
  var tagContext = position === "beforebegin" || position === "afterend" ? element.parentElement : element;
  tagContext !== null && module$contents$google3$third_party$javascript$safevalues$dom$elements$element_throwIfScriptOrStyle(tagContext);
  element.insertAdjacentHTML(position, (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(v));
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_buildPrefixedAttributeSetter(prefix) {
  var otherPrefixes = $jscomp.getRestArguments.apply(1, arguments), prefixes = [prefix].concat((0,$jscomp.arrayFromIterable)(otherPrefixes));
  return function(e, attr, value) {
    module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementPrefixedAttribute(prefixes, e, attr, value);
  };
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementPrefixedAttribute(attrPrefixes, e, attr, value) {
  if (attrPrefixes.length === 0) {
    var message = "";
    goog.DEBUG && (message = "No prefixes are provided");
    throw Error(message);
  }
  var prefixes = attrPrefixes.map(function(s) {
    return module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_unwrapAttributePrefix(s);
  }), attrLower = attr.toLowerCase();
  if (prefixes.every(function(p) {
    return attrLower.indexOf(p) !== 0;
  })) {
    throw Error('Attribute "' + attr + '" does not match any of the allowed prefixes.');
  }
  e.setAttribute(attr, value);
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_throwIfScriptOrStyle(element) {
  var message = "", tagName = element.tagName;
  if (/^(script|style)$/i.test(tagName)) {
    throw goog.DEBUG && (message = tagName.toLowerCase() === "script" ? "Use setScriptTextContent with a SafeScript." : "Use setStyleTextContent with a SafeStyleSheet."), Error(message);
  }
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementAttribute(el, attr, value) {
  if (el.namespaceURI !== "http://www.w3.org/1999/xhtml") {
    throw Error("Cannot set attribute '" + attr + "' on '" + el.tagName + "'.Element is not in the HTML namespace");
  }
  attr = attr.toLowerCase();
  var key = el.tagName + " " + attr;
  switch(key) {
    case "A href":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHref(el, value);
      break;
    case "AREA href":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$area_setAreaHref(el, value);
      break;
    case "BASE href":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$base_setBaseHref(el, value);
      break;
    case "BUTTON formaction":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$button_setButtonFormaction(el, value);
      break;
    case "EMBED src":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$embed_setEmbedSrc(el, value);
      break;
    case "FORM action":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormAction(el, value);
      break;
    case "IFRAME src":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrc(el, value);
      break;
    case "IFRAME srcdoc":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc(el, value);
      break;
    case "IFRAME sandbox":
      throw Error("Can't set 'sandbox' on iframe tags. Use setIframeSrcWithIntent or setIframeSrcdocWithIntent instead");
    case "INPUT formaction":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$input_setInputFormaction(el, value);
      break;
    case "LINK href":
      throw Error("Can't set 'href' attribute on link tags. Use setLinkHrefAndRel instead");
    case "LINK rel":
      throw Error("Can't set 'rel' attribute on link tags. Use setLinkHrefAndRel instead");
    case "OBJECT data":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$object_setObjectData(el, value);
      break;
    case "SCRIPT src":
      module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptSrc(el, value);
      break;
    default:
      if (/^on./.test(attr)) {
        throw Error('Attribute "' + attr + '" looks like an event handler attribute. Please use a safe alternative like addEventListener instead.');
      }
      el.setAttribute(attr, value);
  }
}
;var module$contents$google3$third_party$javascript$safevalues$dom$elements$link_SAFE_URL_REL_VALUES = "alternate author bookmark canonical cite help icon license modulepreload next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" ");
function module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkHrefAndRel(link, url, rel) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_isResourceUrl(url)) {
    module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkWithResourceUrlHrefAndRel(link, url, rel);
  } else {
    if (module$contents$google3$third_party$javascript$safevalues$dom$elements$link_SAFE_URL_REL_VALUES.indexOf(rel) === -1) {
      throw Error('TrustedResourceUrl href attribute required with rel="' + rel + '"');
    }
    var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
    sanitizedUrl !== void 0 && (link.href = sanitizedUrl, link.rel = rel);
  }
}
function module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkWithResourceUrlHrefAndRel(link, url, rel) {
  link.href = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url).toString();
  link.rel = rel;
}
;var module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl = {SafeStyleSheet:function(token, value) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
  this.privateDoNotAccessOrElseWrappedStyleSheet = value;
}};
module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.SafeStyleSheet.prototype.toString = function() {
  return this.privateDoNotAccessOrElseWrappedStyleSheet;
};
function module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(value) {
  return new module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.SafeStyleSheet(module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, value);
}
module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.createStyleSheetInternal = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal;
function module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_isStyleSheet(value) {
  return value instanceof module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.SafeStyleSheet;
}
module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.isStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_isStyleSheet;
function module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet(value) {
  if (module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_isStyleSheet(value)) {
    return value.privateDoNotAccessOrElseWrappedStyleSheet;
  }
  var message = "";
  goog.DEBUG && (message = "Unexpected type when unwrapping SafeStyleSheet, got '" + value + "' of type '" + typeof value + "'");
  throw Error(message);
}
module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.unwrapStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet;
function module$contents$google3$third_party$javascript$safevalues$dom$elements$style_setStyleTextContent(elem, safeStyleSheet) {
  elem.textContent = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet(safeStyleSheet);
}
;var module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_UNSAFE_SVG_ATTRIBUTES = ["href", "xlink:href"];
function module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_setSvgAttribute(svg, attr, value) {
  var attrLower = attr.toLowerCase();
  if (module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_UNSAFE_SVG_ATTRIBUTES.indexOf(attrLower) !== -1 || attrLower.indexOf("on") === 0) {
    var msg = "";
    goog.DEBUG && (msg = "Setting the '" + attrLower + "' attribute on SVG can cause XSS.");
    throw Error(msg);
  }
  svg.setAttribute(attr, value);
}
;goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = "";
goog.log.Level = function(name, value) {
  this.name = name;
  this.value = value;
};
goog.log.Level.prototype.toString = function() {
  return this.name;
};
goog.log.Level.OFF = new goog.log.Level("OFF", Infinity);
goog.log.Level.SHOUT = new goog.log.Level("SHOUT", 1200);
goog.log.Level.SEVERE = new goog.log.Level("SEVERE", 1E3);
goog.log.Level.WARNING = new goog.log.Level("WARNING", 900);
goog.log.Level.INFO = new goog.log.Level("INFO", 800);
goog.log.Level.CONFIG = new goog.log.Level("CONFIG", 700);
goog.log.Level.FINE = new goog.log.Level("FINE", 500);
goog.log.Level.FINER = new goog.log.Level("FINER", 400);
goog.log.Level.FINEST = new goog.log.Level("FINEST", 300);
goog.log.Level.ALL = new goog.log.Level("ALL", 0);
goog.log.Level.PREDEFINED_LEVELS = [goog.log.Level.OFF, goog.log.Level.SHOUT, goog.log.Level.SEVERE, goog.log.Level.WARNING, goog.log.Level.INFO, goog.log.Level.CONFIG, goog.log.Level.FINE, goog.log.Level.FINER, goog.log.Level.FINEST, goog.log.Level.ALL];
goog.log.Level.predefinedLevelsCache_ = null;
goog.log.Level.createPredefinedLevelsCache_ = function() {
  goog.log.Level.predefinedLevelsCache_ = {};
  for (var i = 0, level; level = goog.log.Level.PREDEFINED_LEVELS[i]; i++) {
    goog.log.Level.predefinedLevelsCache_[level.value] = level, goog.log.Level.predefinedLevelsCache_[level.name] = level;
  }
};
goog.log.Level.getPredefinedLevel = function(name) {
  goog.log.Level.predefinedLevelsCache_ || goog.log.Level.createPredefinedLevelsCache_();
  return goog.log.Level.predefinedLevelsCache_[name] || null;
};
goog.log.Level.getPredefinedLevelByValue = function(value) {
  goog.log.Level.predefinedLevelsCache_ || goog.log.Level.createPredefinedLevelsCache_();
  if (value in goog.log.Level.predefinedLevelsCache_) {
    return goog.log.Level.predefinedLevelsCache_[value];
  }
  for (var i = 0; i < goog.log.Level.PREDEFINED_LEVELS.length; ++i) {
    var level = goog.log.Level.PREDEFINED_LEVELS[i];
    if (level.value <= value) {
      return level;
    }
  }
  return null;
};
goog.log.Logger = function() {
};
goog.log.Logger.prototype.getName = function() {
};
goog.log.Logger.Level = goog.log.Level;
goog.log.LogBuffer = function(capacity) {
  this.capacity_ = typeof capacity === "number" ? capacity : goog.log.LogBuffer.CAPACITY;
  this.clear();
};
goog.log.LogBuffer.prototype.addRecord = function(level, msg, loggerName) {
  if (!this.isBufferingEnabled()) {
    return new goog.log.LogRecord(level, msg, loggerName);
  }
  var curIndex = (this.curIndex_ + 1) % this.capacity_;
  this.curIndex_ = curIndex;
  if (this.isFull_) {
    var ret = this.buffer_[curIndex];
    ret.reset(level, msg, loggerName);
    return ret;
  }
  this.isFull_ = curIndex == this.capacity_ - 1;
  return this.buffer_[curIndex] = new goog.log.LogRecord(level, msg, loggerName);
};
goog.log.LogBuffer.prototype.isBufferingEnabled = function() {
  return this.capacity_ > 0;
};
goog.log.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(this.capacity_);
  this.curIndex_ = -1;
  this.isFull_ = !1;
};
goog.log.LogBuffer.CAPACITY = 0;
goog.log.LogBuffer.getInstance = function() {
  goog.log.LogBuffer.instance_ || (goog.log.LogBuffer.instance_ = new goog.log.LogBuffer(goog.log.LogBuffer.CAPACITY));
  return goog.log.LogBuffer.instance_;
};
goog.log.LogBuffer.isBufferingEnabled = function() {
  return goog.log.LogBuffer.getInstance().isBufferingEnabled();
};
goog.log.LogRecord = function(level, msg, loggerName, time, sequenceNumber) {
  this.reset(level || goog.log.Level.OFF, msg, loggerName, time, sequenceNumber);
};
goog.log.LogRecord.prototype.reset = function(level) {
  this.level_ = level;
};
goog.log.LogRecord.prototype.getLevel = function() {
  return this.level_;
};
goog.log.LogRecord.prototype.setLevel = function(level) {
  this.level_ = level;
};
goog.log.LogRecord.nextSequenceNumber_ = 0;
goog.log.LogRegistryEntry_ = function(name, parent) {
  parent = parent === void 0 ? null : parent;
  this.level = null;
  this.handlers = [];
  this.parent = parent || null;
  this.children = [];
  this.logger = {getName:function() {
    return name;
  }};
};
goog.log.LogRegistryEntry_.prototype.getEffectiveLevel = function() {
  if (this.level) {
    return this.level;
  }
  if (this.parent) {
    return this.parent.getEffectiveLevel();
  }
  goog.asserts.fail("Root logger has no level set.");
  return goog.log.Level.OFF;
};
goog.log.LogRegistryEntry_.prototype.publish = function(logRecord) {
  for (var target = this; target;) {
    target.handlers.forEach(function(handler) {
      handler(logRecord);
    }), target = target.parent;
  }
};
goog.log.LogRegistry_ = function() {
  this.entries = {};
  var rootLogRegistryEntry = new goog.log.LogRegistryEntry_(goog.log.ROOT_LOGGER_NAME);
  rootLogRegistryEntry.level = goog.log.Level.CONFIG;
  this.entries[goog.log.ROOT_LOGGER_NAME] = rootLogRegistryEntry;
};
goog.log.LogRegistry_.prototype.getLogRegistryEntry = function(name, level) {
  var entry = this.entries[name];
  if (entry) {
    return level !== void 0 && (entry.level = level), entry;
  }
  var lastDotIndex = name.lastIndexOf("."), parentName = name.slice(0, Math.max(lastDotIndex, 0)), parentLogRegistryEntry = this.getLogRegistryEntry(parentName), logRegistryEntry = new goog.log.LogRegistryEntry_(name, parentLogRegistryEntry);
  this.entries[name] = logRegistryEntry;
  parentLogRegistryEntry.children.push(logRegistryEntry);
  level !== void 0 && (logRegistryEntry.level = level);
  return logRegistryEntry;
};
goog.log.LogRegistry_.prototype.getAllLoggers = function() {
  var $jscomp$this$17096019$34 = this;
  return Object.keys(this.entries).map(function(loggerName) {
    return $jscomp$this$17096019$34.entries[loggerName].logger;
  });
};
goog.log.LogRegistry_.getInstance = function() {
  goog.log.LogRegistry_.instance_ || (goog.log.LogRegistry_.instance_ = new goog.log.LogRegistry_());
  return goog.log.LogRegistry_.instance_;
};
goog.log.getLogger = function(name, level) {
  if (goog.log.ENABLED) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(name, level);
    return loggerEntry.logger;
  }
  return null;
};
goog.log.getRootLogger = function() {
  if (goog.log.ENABLED) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(goog.log.ROOT_LOGGER_NAME);
    return loggerEntry.logger;
  }
  return null;
};
goog.log.addHandler = function(logger, handler) {
  if (goog.log.ENABLED && logger) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    loggerEntry.handlers.push(handler);
  }
};
goog.log.removeHandler = function(logger, handler) {
  if (goog.log.ENABLED && logger) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName()), indexOfHandler = loggerEntry.handlers.indexOf(handler);
    if (indexOfHandler !== -1) {
      return loggerEntry.handlers.splice(indexOfHandler, 1), !0;
    }
  }
  return !1;
};
goog.log.setLevel = function(logger, level) {
  if (goog.log.ENABLED && logger) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    loggerEntry.level = level;
  }
};
goog.log.getLevel = function(logger) {
  if (goog.log.ENABLED && logger) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    return loggerEntry.level;
  }
  return null;
};
goog.log.getEffectiveLevel = function(logger) {
  if (goog.log.ENABLED && logger) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    return loggerEntry.getEffectiveLevel();
  }
  return goog.log.Level.OFF;
};
goog.log.isLoggable = function(logger, level) {
  return goog.log.ENABLED && logger && level ? level.value >= goog.log.getEffectiveLevel(logger).value : !1;
};
goog.log.getAllLoggers = function() {
  return goog.log.ENABLED ? goog.log.LogRegistry_.getInstance().getAllLoggers() : [];
};
goog.log.getLogRecord = function(logger, level, msg) {
  var logRecord = goog.log.LogBuffer.getInstance().addRecord(level || goog.log.Level.OFF, msg, logger.getName());
  return logRecord;
};
goog.log.publishLogRecord = function(logger, logRecord) {
  if (goog.log.ENABLED && logger && goog.log.isLoggable(logger, logRecord.getLevel())) {
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    loggerEntry.publish(logRecord);
  }
};
goog.log.log = function(logger, level, msg) {
  if (goog.log.ENABLED && logger && goog.log.isLoggable(logger, level)) {
    level = level || goog.log.Level.OFF;
    var loggerEntry = goog.log.LogRegistry_.getInstance().getLogRegistryEntry(logger.getName());
    typeof msg === "function" && (msg = msg());
    var logRecord = goog.log.LogBuffer.getInstance().addRecord(level, msg, logger.getName());
    loggerEntry.publish(logRecord);
  }
};
goog.log.error = function(logger, msg, exception) {
  goog.log.ENABLED && logger && goog.log.log(logger, goog.log.Level.SEVERE, msg, exception);
};
goog.log.warning = function(logger, msg, exception) {
  goog.log.ENABLED && logger && goog.log.log(logger, goog.log.Level.WARNING, msg, exception);
};
goog.log.info = function(logger, msg, exception) {
  goog.log.ENABLED && logger && goog.log.log(logger, goog.log.Level.INFO, msg, exception);
};
goog.log.fine = function(logger, msg, exception) {
  goog.log.ENABLED && logger && goog.log.log(logger, goog.log.Level.FINE, msg, exception);
};
function module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_use_setSvgUseHref(useEl, url) {
  var scheme = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_extractScheme(url);
  if (scheme === "javascript:" || scheme === "data:") {
    if (goog.DEBUG) {
      var msg = "A URL with content '" + url + "' was sanitized away.";
      (0,goog.log.warning)((0,goog.log.getLogger)("safevalues"), msg);
    }
  } else {
    useEl.setAttribute("href", url);
  }
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentWrite(doc, text) {
  doc.write((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(text));
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentExecCommand(doc, command, value) {
  var commandString = String(command), valueArgument = value;
  commandString.toLowerCase() === "inserthtml" && (valueArgument = (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(value));
  return doc.execCommand(commandString, !1, valueArgument);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentExecCommandInsertHtml(doc, html) {
  return doc.execCommand("insertHTML", !1, (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(html));
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseHtml(parser, html) {
  return module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseFromString(parser, html, "text/html");
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseXml(parser, xml) {
  for (var doc = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseFromString(parser, (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(xml), "text/xml"), iterator = document.createNodeIterator(doc, NodeFilter.SHOW_ELEMENT), currentNode; currentNode = iterator.nextNode();) {
    var ns = currentNode.namespaceURI;
    if (ns === "http://www.w3.org/1999/xhtml" || ns === "http://www.w3.org/2000/svg" || ns === "http://www.w3.org/1998/Math/MathML") {
      var message = "unsafe XML";
      goog.DEBUG && (message += " - attempted to parse an XML document containing an element with namespace " + ns + ". Parsing HTML, SVG or MathML content is unsafe because it may lead to XSS when the content is appended to the document.");
      throw Error(message);
    }
  }
  return doc;
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseFromString(parser, content, contentType) {
  return parser.parseFromString((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(content), contentType);
}
;var module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch = {IncorrectContentTypeError:function(url, typeName, contentType) {
  var $jscomp$tmp$error$1153895636$25 = Error.call(this, url + " was requested as a " + typeName + ', but the response Content-Type, "' + contentType + " is not appropriate for this type of content.");
  this.message = $jscomp$tmp$error$1153895636$25.message;
  "stack" in $jscomp$tmp$error$1153895636$25 && (this.stack = $jscomp$tmp$error$1153895636$25.stack);
  this.url = url;
  this.contentType = contentType;
}};
$jscomp.inherits(module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch.IncorrectContentTypeError, Error);
function module$contents$google3$third_party$javascript$safevalues$dom$globals$fetch_SafeResponse() {
}
module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch.SafeResponse = module$contents$google3$third_party$javascript$safevalues$dom$globals$fetch_SafeResponse;
function module$contents$google3$third_party$javascript$safevalues$dom$globals$fetch_fetchResourceUrl(u, init) {
  var response, $jscomp$optchain$tmp1153895636$0, $jscomp$optchain$tmp1153895636$1, $jscomp$optchain$tmp1153895636$2, mimeType;
  return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$1153895636$29) {
    if ($jscomp$generator$context$1153895636$29.nextAddress == 1) {
      return $jscomp$generator$context$1153895636$29.yield(fetch(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(u).toString(), init), 2);
    }
    response = $jscomp$generator$context$1153895636$29.yieldResult;
    mimeType = ($jscomp$optchain$tmp1153895636$0 = response.headers.get("Content-Type")) == null ? void 0 : ($jscomp$optchain$tmp1153895636$1 = $jscomp$optchain$tmp1153895636$0.split(";", 2)) == null ? void 0 : ($jscomp$optchain$tmp1153895636$2 = $jscomp$optchain$tmp1153895636$1[0]) == null ? void 0 : $jscomp$optchain$tmp1153895636$2.toLowerCase();
    return $jscomp$generator$context$1153895636$29.return({html:function() {
      var text;
      return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$1153895636$26) {
        if ($jscomp$generator$context$1153895636$26.nextAddress == 1) {
          if (mimeType !== "text/html") {
            throw new module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch.IncorrectContentTypeError(response.url, "SafeHtml", "text/html");
          }
          return $jscomp$generator$context$1153895636$26.yield(response.text(), 2);
        }
        text = $jscomp$generator$context$1153895636$26.yieldResult;
        return $jscomp$generator$context$1153895636$26.return((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(text));
      });
    }, script:function() {
      var text;
      return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$1153895636$27) {
        if ($jscomp$generator$context$1153895636$27.nextAddress == 1) {
          if (mimeType !== "text/javascript" && mimeType !== "application/javascript") {
            throw new module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch.IncorrectContentTypeError(response.url, "SafeScript", "text/javascript");
          }
          return $jscomp$generator$context$1153895636$27.yield(response.text(), 2);
        }
        text = $jscomp$generator$context$1153895636$27.yieldResult;
        return $jscomp$generator$context$1153895636$27.return(module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal(text));
      });
    }, styleSheet:function() {
      var text;
      return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$1153895636$28) {
        if ($jscomp$generator$context$1153895636$28.nextAddress == 1) {
          if (mimeType !== "text/css") {
            throw new module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch.IncorrectContentTypeError(response.url, "SafeStyleSheet", "text/css");
          }
          return $jscomp$generator$context$1153895636$28.yield(response.text(), 2);
        }
        text = $jscomp$generator$context$1153895636$28.yieldResult;
        return $jscomp$generator$context$1153895636$28.return(module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(text));
      });
    }});
  });
}
module$exports$google3$third_party$javascript$safevalues$dom$globals$fetch.fetchResourceUrl = module$contents$google3$third_party$javascript$safevalues$dom$globals$fetch_fetchResourceUrl;
function module$contents$google3$third_party$javascript$safevalues$dom$globals$global_globalEval(win, script) {
  var trustedScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript(script), result = win.eval(trustedScript);
  result === trustedScript && (result = win.eval(trustedScript.toString()));
  return result;
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$location_setLocationHref(loc, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && (loc.href = sanitizedUrl);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$location_locationReplace(loc, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && loc.replace(sanitizedUrl);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$location_locationAssign(loc, url) {
  var sanitizedUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_unwrapUrlOrSanitize(url);
  sanitizedUrl !== void 0 && loc.assign(sanitizedUrl);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$range_rangeCreateContextualFragment(range, html) {
  return range.createContextualFragment((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(html));
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$service_worker_container_serviceWorkerContainerRegister(container, scriptURL, options) {
  return container.register(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(scriptURL), options);
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$url_objectUrlFromSafeSource(source) {
  return module$contents$google3$third_party$javascript$safevalues$builders$url_builders_objectUrlFromSafeSource(source).toString();
}
;function module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_createWorker(url, options) {
  return new Worker(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url), options);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_createSharedWorker(url, options) {
  return new SharedWorker(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url), options);
}
function module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_workerGlobalScopeImportScripts(scope) {
  var urls = $jscomp.getRestArguments.apply(1, arguments);
  scope.importScripts.apply(scope, (0,$jscomp.arrayFromIterable)(urls.map(function(url) {
    return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(url);
  })));
}
;var module$exports$google3$third_party$javascript$safevalues$dom$index = {};
module$exports$google3$third_party$javascript$safevalues$dom$index.setAnchorHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHref;
module$exports$google3$third_party$javascript$safevalues$dom$index.setAnchorHrefLite = module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHrefLite;
module$exports$google3$third_party$javascript$safevalues$dom$index.setAreaHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$area_setAreaHref;
module$exports$google3$third_party$javascript$safevalues$dom$index.setBaseHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$base_setBaseHref;
module$exports$google3$third_party$javascript$safevalues$dom$index.setButtonFormaction = module$contents$google3$third_party$javascript$safevalues$dom$elements$button_setButtonFormaction;
module$exports$google3$third_party$javascript$safevalues$dom$index.buildPrefixedAttributeSetter = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_buildPrefixedAttributeSetter;
module$exports$google3$third_party$javascript$safevalues$dom$index.elementInsertAdjacentHtml = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_elementInsertAdjacentHtml;
module$exports$google3$third_party$javascript$safevalues$dom$index.setElementAttribute = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementAttribute;
module$exports$google3$third_party$javascript$safevalues$dom$index.setElementInnerHtml = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementInnerHtml;
module$exports$google3$third_party$javascript$safevalues$dom$index.setElementOuterHtml = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementOuterHtml;
module$exports$google3$third_party$javascript$safevalues$dom$index.setElementPrefixedAttribute = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementPrefixedAttribute;
module$exports$google3$third_party$javascript$safevalues$dom$index.setEmbedSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$embed_setEmbedSrc;
module$exports$google3$third_party$javascript$safevalues$dom$index.setFormAction = module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormAction;
module$exports$google3$third_party$javascript$safevalues$dom$index.setFormActionLite = module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormActionLite;
module$exports$google3$third_party$javascript$safevalues$dom$index.IframeIntent = module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent;
module$exports$google3$third_party$javascript$safevalues$dom$index.setIframeSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrc;
module$exports$google3$third_party$javascript$safevalues$dom$index.setIframeSrcdoc = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc;
module$exports$google3$third_party$javascript$safevalues$dom$index.setIframeSrcdocWithIntent = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdocWithIntent;
module$exports$google3$third_party$javascript$safevalues$dom$index.setIframeSrcWithIntent = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcWithIntent;
module$exports$google3$third_party$javascript$safevalues$dom$index.TypeCannotBeUsedWithIframeIntentError = module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError;
module$exports$google3$third_party$javascript$safevalues$dom$index.setInputFormaction = module$contents$google3$third_party$javascript$safevalues$dom$elements$input_setInputFormaction;
module$exports$google3$third_party$javascript$safevalues$dom$index.setLinkHrefAndRel = module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkHrefAndRel;
module$exports$google3$third_party$javascript$safevalues$dom$index.setLinkWithResourceUrlHrefAndRel = module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkWithResourceUrlHrefAndRel;
module$exports$google3$third_party$javascript$safevalues$dom$index.setObjectData = module$contents$google3$third_party$javascript$safevalues$dom$elements$object_setObjectData;
module$exports$google3$third_party$javascript$safevalues$dom$index.setScriptSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptSrc;
module$exports$google3$third_party$javascript$safevalues$dom$index.setScriptTextContent = module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptTextContent;
module$exports$google3$third_party$javascript$safevalues$dom$index.setStyleTextContent = module$contents$google3$third_party$javascript$safevalues$dom$elements$style_setStyleTextContent;
module$exports$google3$third_party$javascript$safevalues$dom$index.setSvgAttribute = module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_setSvgAttribute;
module$exports$google3$third_party$javascript$safevalues$dom$index.setSvgUseHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_use_setSvgUseHref;
module$exports$google3$third_party$javascript$safevalues$dom$index.documentExecCommand = module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentExecCommand;
module$exports$google3$third_party$javascript$safevalues$dom$index.documentExecCommandInsertHtml = module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentExecCommandInsertHtml;
module$exports$google3$third_party$javascript$safevalues$dom$index.documentWrite = module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentWrite;
module$exports$google3$third_party$javascript$safevalues$dom$index.domParserParseFromString = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseFromString;
module$exports$google3$third_party$javascript$safevalues$dom$index.domParserParseHtml = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseHtml;
module$exports$google3$third_party$javascript$safevalues$dom$index.domParserParseXml = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseXml;
module$exports$google3$third_party$javascript$safevalues$dom$index.fetchResourceUrl = module$contents$google3$third_party$javascript$safevalues$dom$globals$fetch_fetchResourceUrl;
module$exports$google3$third_party$javascript$safevalues$dom$index.globalEval = module$contents$google3$third_party$javascript$safevalues$dom$globals$global_globalEval;
module$exports$google3$third_party$javascript$safevalues$dom$index.locationAssign = module$contents$google3$third_party$javascript$safevalues$dom$globals$location_locationAssign;
module$exports$google3$third_party$javascript$safevalues$dom$index.locationReplace = module$contents$google3$third_party$javascript$safevalues$dom$globals$location_locationReplace;
module$exports$google3$third_party$javascript$safevalues$dom$index.setLocationHref = module$contents$google3$third_party$javascript$safevalues$dom$globals$location_setLocationHref;
module$exports$google3$third_party$javascript$safevalues$dom$index.rangeCreateContextualFragment = module$contents$google3$third_party$javascript$safevalues$dom$globals$range_rangeCreateContextualFragment;
module$exports$google3$third_party$javascript$safevalues$dom$index.serviceWorkerContainerRegister = module$contents$google3$third_party$javascript$safevalues$dom$globals$service_worker_container_serviceWorkerContainerRegister;
module$exports$google3$third_party$javascript$safevalues$dom$index.objectUrlFromSafeSource = module$contents$google3$third_party$javascript$safevalues$dom$globals$url_objectUrlFromSafeSource;
module$exports$google3$third_party$javascript$safevalues$dom$index.getScriptNonce = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getScriptNonce;
module$exports$google3$third_party$javascript$safevalues$dom$index.getStyleNonce = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getStyleNonce;
module$exports$google3$third_party$javascript$safevalues$dom$index.windowOpen = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_windowOpen;
module$exports$google3$third_party$javascript$safevalues$dom$index.createSharedWorker = module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_createSharedWorker;
module$exports$google3$third_party$javascript$safevalues$dom$index.createWorker = module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_createWorker;
module$exports$google3$third_party$javascript$safevalues$dom$index.workerGlobalScopeImportScripts = module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_workerGlobalScopeImportScripts;
function module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_assertValidJustification(justification) {
  if (typeof justification !== "string" || justification.trim() === "") {
    var errMsg = "Calls to uncheckedconversion functions must go through security review.";
    errMsg += " A justification must be provided to capture what security assumptions are being made.";
    errMsg += " See go/unchecked-conversions";
    throw Error(errMsg);
  }
}
function module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_htmlSafeByReview(html, options) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_assertValidJustification(options.justification);
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(html);
}
function module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_scriptSafeByReview(script, options) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_assertValidJustification(options.justification);
  return module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal(script);
}
function module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_resourceUrlSafeByReview(url, options) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_assertValidJustification(options.justification);
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(url);
}
function module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_styleSheetSafeByReview(stylesheet, options) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_assertValidJustification(options.justification);
  return module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(stylesheet);
}
function module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_urlSafeByReview(url, options) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_assertValidJustification(options.justification);
  return module$contents$google3$third_party$javascript$safevalues$internals$url_impl_createUrlInternal(url);
}
;goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0", ZERO_WIDTH_SPACE:"\u200b"};
goog.string.startsWith = module$contents$goog$string$internal_startsWith;
goog.string.endsWith = module$contents$goog$string$internal_endsWith;
goog.string.caseInsensitiveStartsWith = module$contents$goog$string$internal_caseInsensitiveStartsWith;
goog.string.caseInsensitiveEndsWith = module$contents$goog$string$internal_caseInsensitiveEndsWith;
goog.string.caseInsensitiveEquals = module$contents$goog$string$internal_caseInsensitiveEquals;
goog.string.subs = function(str, var_args) {
  for (var splitParts = str.split("%s"), returnString = "", subsArguments = Array.prototype.slice.call(arguments, 1); subsArguments.length && splitParts.length > 1;) {
    returnString += splitParts.shift() + subsArguments.shift();
  }
  return returnString + splitParts.join("%s");
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = module$contents$goog$string$internal_isEmptyOrWhitespace;
goog.string.isEmptyString = function(str) {
  return str.length == 0;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(str) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(str));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(str) {
  return !/[^\t\n\r ]/.test(str);
};
goog.string.isAlpha = function(str) {
  return !/[^a-zA-Z]/.test(str);
};
goog.string.isNumeric = function(str) {
  return !/[^0-9]/.test(str);
};
goog.string.isAlphaNumeric = function(str) {
  return !/[^a-zA-Z0-9]/.test(str);
};
goog.string.isSpace = function(ch) {
  return ch == " ";
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd";
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(str) {
  return str.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = module$contents$goog$string$internal_trim;
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = module$contents$goog$string$internal_caseInsensitiveCompare;
goog.string.numberAwareCompare_ = function(str1, str2, tokenizerRegExp) {
  if (str1 == str2) {
    return 0;
  }
  if (!str1) {
    return -1;
  }
  if (!str2) {
    return 1;
  }
  for (var tokens1 = str1.toLowerCase().match(tokenizerRegExp), tokens2 = str2.toLowerCase().match(tokenizerRegExp), count = Math.min(tokens1.length, tokens2.length), i = 0; i < count; i++) {
    var a = tokens1[i], b = tokens2[i];
    if (a != b) {
      var num1 = parseInt(a, 10);
      if (!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if (!isNaN(num2) && num1 - num2) {
          return num1 - num2;
        }
      }
      return a < b ? -1 : 1;
    }
  }
  return tokens1.length != tokens2.length ? tokens1.length - tokens2.length : str1 < str2 ? -1 : 1;
};
goog.string.intAwareCompare = function(str1, str2) {
  return goog.string.numberAwareCompare_(str1, str2, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(str1, str2) {
  return goog.string.numberAwareCompare_(str1, str2, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "));
};
goog.string.newLineToBr = module$contents$goog$string$internal_newLineToBr;
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  str = module$contents$goog$string$internal_htmlEscape(str, opt_isLikelyToContainHtmlChars);
  goog.string.DETECT_DOUBLE_ESCAPING && (str = str.replace(goog.string.E_RE_, "&#101;"));
  return str;
};
goog.string.E_RE_ = /e/g;
goog.string.unescapeEntities = function(str) {
  return goog.string.contains(str, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(str) : goog.string.unescapePureXmlEntities_(str) : str;
};
goog.string.unescapeEntitiesWithDocument = function(str, document) {
  return goog.string.contains(str, "&") ? goog.string.unescapeEntitiesUsingDom_(str, document) : str;
};
goog.string.unescapeEntitiesUsingDom_ = function(str, opt_document) {
  var seen = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var div = opt_document ? opt_document.createElement("div") : goog.global.document.createElement("div");
  return str.replace(goog.string.HTML_ENTITY_PATTERN_, function(s, entity) {
    var value = seen[s];
    if (value) {
      return value;
    }
    if (entity.charAt(0) == "#") {
      var n = Number("0" + entity.slice(1));
      isNaN(n) || (value = String.fromCharCode(n));
    }
    value || (module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementInnerHtml(div, module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_htmlSafeByReview(s + " ", {justification:"Single HTML entity."})), value = div.firstChild.nodeValue.slice(0, -1));
    return seen[s] = value;
  });
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if (entity.charAt(0) == "#") {
          var n = Number("0" + entity.slice(1));
          if (!isNaN(n)) {
            return String.fromCharCode(n);
          }
        }
        return s;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml);
};
goog.string.preserveSpaces = function(str) {
  return str.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(str, quoteChars) {
  for (var length = quoteChars.length, i = 0; i < length; i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if (str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1);
    }
  }
  return str;
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  str.length > chars && (str = str.substring(0, chars - 3) + "...");
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  opt_protectEscapedCharacters && (str = goog.string.unescapeEntities(str));
  if (opt_trailingChars && str.length > chars) {
    opt_trailingChars > chars && (opt_trailingChars = chars);
    var endPoint = str.length - opt_trailingChars, startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint);
  } else if (str.length > chars) {
    var half = Math.floor(chars / 2), endPos = str.length - half;
    half += chars % 2;
    str = str.substring(0, half) + "..." + str.substring(endPos);
  }
  opt_protectEscapedCharacters && (str = goog.string.htmlEscape(str));
  return str;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\v":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"\\u003C"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  for (var sb = ['"'], i = 0; i < s.length; i++) {
    var ch = s.charAt(i), cc = ch.charCodeAt(0);
    sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch));
  }
  sb.push('"');
  return sb.join("");
};
goog.string.escapeString = function(str) {
  for (var sb = [], i = 0; i < str.length; i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i));
  }
  return sb.join("");
};
goog.string.escapeChar = function(c) {
  if (c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c];
  }
  if (c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c];
  }
  var cc = c.charCodeAt(0);
  if (cc > 31 && cc < 127) {
    var rv = c;
  } else {
    if (cc < 256) {
      if (rv = "\\x", cc < 16 || cc > 256) {
        rv += "0";
      }
    } else {
      rv = "\\u", cc < 4096 && (rv += "0");
    }
    rv += cc.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[c] = rv;
};
goog.string.contains = module$contents$goog$string$internal_contains;
goog.string.caseInsensitiveContains = module$contents$goog$string$internal_caseInsensitiveContains;
goog.string.countOf = function(s, ss) {
  return s && ss ? s.split(ss).length - 1 : 0;
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  index >= 0 && index < s.length && stringLength > 0 && (resultStr = s.slice(0, index) + s.slice(index + stringLength));
  return resultStr;
};
goog.string.remove = function(str, substr) {
  return str.replace(substr, "");
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "");
};
goog.string.replaceAll = function(s, ss, replacement) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, replacement.replace(/\$/g, "$$$$"));
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = goog.FEATURESET_YEAR >= 2018 || String.prototype.repeat ? function(string, length) {
  return string.repeat(length);
} : function(string, length) {
  return Array(length + 1).join(string);
};
goog.string.padNumber = function(num, length, opt_precision) {
  if (!Number.isFinite(num)) {
    return String(num);
  }
  var s = opt_precision !== void 0 ? num.toFixed(opt_precision) : String(num), index = s.indexOf(".");
  index === -1 && (index = s.length);
  var sign = s[0] === "-" ? "-" : "";
  sign && (s = s.substring(1));
  return sign + goog.string.repeat("0", Math.max(0, length - index)) + s;
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj);
};
goog.string.getRandomString = function() {
  return Math.floor(Math.random() * 2147483648).toString(36) + Math.abs(Math.floor(Math.random() * 2147483648) ^ goog.now()).toString(36);
};
goog.string.compareVersions = module$contents$goog$string$internal_compareVersions;
goog.string.hashCode = function(str) {
  for (var result = 0, i = 0; i < str.length; ++i) {
    result = 31 * result + str.charCodeAt(i) >>> 0;
  }
  return result;
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  return num == 0 && goog.string.isEmptyOrWhitespace(str) ? NaN : num;
};
goog.string.isLowerCamelCase = function(str) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(str);
};
goog.string.isUpperCamelCase = function(str) {
  return /^([A-Z][a-z]*)+$/.test(str);
};
goog.string.toCamelCase = function(str) {
  return String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase();
  });
};
goog.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(str, opt_delimiters) {
  var delimiters = typeof opt_delimiters === "string" ? goog.string.regExpEscape(opt_delimiters) : "\\s";
  delimiters = delimiters ? "|[" + delimiters + "]+" : "";
  var regexp = new RegExp("(^" + delimiters + ")([a-z])", "g");
  return str.replace(regexp, function(all, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};
goog.string.capitalize = function(str) {
  return String(str.charAt(0)).toUpperCase() + String(str.slice(1)).toLowerCase();
};
goog.string.parseInt = function(value) {
  isFinite(value) && (value = String(value));
  return typeof value === "string" ? /^\s*-?0x/i.test(value) ? parseInt(value, 16) : parseInt(value, 10) : NaN;
};
goog.string.splitLimit = function(str, separator, limit) {
  for (var parts = str.split(separator), returnVal = []; limit > 0 && parts.length;) {
    returnVal.push(parts.shift()), limit--;
  }
  parts.length && returnVal.push(parts.join(separator));
  return returnVal;
};
goog.string.lastComponent = function(str, separators) {
  if (separators) {
    typeof separators == "string" && (separators = [separators]);
  } else {
    return str;
  }
  for (var lastSeparatorIndex = -1, i = 0; i < separators.length; i++) {
    if (separators[i] != "") {
      var currentSeparatorIndex = str.lastIndexOf(separators[i]);
      currentSeparatorIndex > lastSeparatorIndex && (lastSeparatorIndex = currentSeparatorIndex);
    }
  }
  return lastSeparatorIndex == -1 ? str : str.slice(lastSeparatorIndex + 1);
};
goog.string.editDistance = function(a, b) {
  var v0 = [], v1 = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var i = 0; i < b.length + 1; i++) {
    v0[i] = i;
  }
  for (var i$jscomp$0 = 0; i$jscomp$0 < a.length; i$jscomp$0++) {
    v1[0] = i$jscomp$0 + 1;
    for (var j = 0; j < b.length; j++) {
      var cost = Number(a[i$jscomp$0] != b[j]);
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (var j$jscomp$0 = 0; j$jscomp$0 < v0.length; j$jscomp$0++) {
      v0[j$jscomp$0] = v1[j$jscomp$0];
    }
  }
  return v1[b.length];
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.chromiumRebrands = {};
var module$contents$goog$labs$userAgent$chromiumRebrands_ChromiumRebrand = {GOOGLE_CHROME:"Google Chrome", BRAVE:"Brave", OPERA:"Opera", EDGE:"Microsoft Edge"};
goog.labs.userAgent.chromiumRebrands.ChromiumRebrand = module$contents$goog$labs$userAgent$chromiumRebrands_ChromiumRebrand;
var module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles = {TOGGLE_GoogFlags__use_toggles:!1, TOGGLE_GoogFlags__override_disable_toggles:!1, TOGGLE_GoogFlags__use_user_agent_client_hints__enable:!1, TOGGLE_GoogFlags__async_throw_on_unicode_to_byte__enable:!1, TOGGLE_GoogFlags__client_only_wiz_queue_effect_and_on_init_initial_runs__enable:!1, TOGGLE_GoogFlags__client_only_wiz_context_per_component__enable:!1, TOGGLE_GoogFlags__client_only_wiz_lazy_tsx__enable:!1, TOGGLE_GoogFlags__fixed_noopener_behavior__enable:!1, 
TOGGLE_GoogFlags__wiz_enable_native_promise__enable:!1, TOGGLE_GoogFlags__jspb_disallow_message_tojson__enable:!1, TOGGLE_GoogFlags__jspb_use_constant_default_pivot__enable:!1, TOGGLE_GoogFlags__jspb_serialize_with_dynamic_pivot_selector__enable:!1, TOGGLE_GoogFlags__disable_wiz_service_logging_map__enable:!1, TOGGLE_GoogFlags__optimize_get_ei_from_ved__enable:!1, TOGGLE_GoogFlags__testonly_disabled_flag__enable:!1, TOGGLE_GoogFlags__testonly_debug_flag__enable:!1, TOGGLE_GoogFlags__testonly_staging_flag__disable:!1, 
TOGGLE_GoogFlags__testonly_stable_flag__disable:!1};
goog.flags = {};
var module$contents$goog$flags_STAGING = goog.readFlagInternalDoNotUseOrElse(1, goog.FLAGS_STAGING_DEFAULT);
goog.flags.USE_USER_AGENT_CLIENT_HINTS = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_user_agent_client_hints__enable : goog.readFlagInternalDoNotUseOrElse(610401301, !1);
goog.flags.ASYNC_THROW_ON_UNICODE_TO_BYTE = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__async_throw_on_unicode_to_byte__enable : goog.readFlagInternalDoNotUseOrElse(899588437, !1);
goog.flags.CLIENT_ONLY_WIZ_QUEUE_EFFECT_AND_ON_INIT_INITIAL_RUNS = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__client_only_wiz_queue_effect_and_on_init_initial_runs__enable : goog.readFlagInternalDoNotUseOrElse(772657768, !1);
goog.flags.CLIENT_ONLY_WIZ_CONTEXT_PER_COMPONENT = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__client_only_wiz_context_per_component__enable : goog.readFlagInternalDoNotUseOrElse(513659523, goog.DEBUG);
goog.flags.CLIENT_ONLY_WIZ_LAZY_TSX = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__client_only_wiz_lazy_tsx__enable : goog.readFlagInternalDoNotUseOrElse(568333945, !1);
goog.flags.FIXED_NOOPENER_BEHAVIOR = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__fixed_noopener_behavior__enable : goog.readFlagInternalDoNotUseOrElse(1331761403, !1);
goog.flags.WIZ_ENABLE_NATIVE_PROMISE = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__wiz_enable_native_promise__enable : goog.readFlagInternalDoNotUseOrElse(651175828, goog.DEBUG);
goog.flags.JSPB_DISALLOW_MESSAGE_TOJSON = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__jspb_disallow_message_tojson__enable : goog.readFlagInternalDoNotUseOrElse(722764542, goog.DEBUG);
goog.flags.JSPB_USE_CONSTANT_DEFAULT_PIVOT = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__jspb_use_constant_default_pivot__enable : goog.readFlagInternalDoNotUseOrElse(748402145, goog.DEBUG);
goog.flags.JSPB_SERIALIZE_WITH_DYNAMIC_PIVOT_SELECTOR = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__jspb_serialize_with_dynamic_pivot_selector__enable : goog.readFlagInternalDoNotUseOrElse(748402146, goog.DEBUG);
goog.flags.DISABLE_WIZ_SERVICE_LOGGING_MAP = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__disable_wiz_service_logging_map__enable : goog.readFlagInternalDoNotUseOrElse(555019702, !1);
goog.flags.OPTIMIZE_GET_EI_FROM_VED = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__optimize_get_ei_from_ved__enable : goog.readFlagInternalDoNotUseOrElse(333098724, !1);
goog.flags.TESTONLY_DISABLED_FLAG = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__testonly_disabled_flag__enable : goog.readFlagInternalDoNotUseOrElse(2147483644, !1);
goog.flags.TESTONLY_DEBUG_FLAG = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.DEBUG || module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__testonly_debug_flag__enable : goog.readFlagInternalDoNotUseOrElse(2147483645, goog.DEBUG);
goog.flags.TESTONLY_STAGING_FLAG = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? goog.FLAGS_STAGING_DEFAULT && (module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__override_disable_toggles || !module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__testonly_staging_flag__disable) : goog.readFlagInternalDoNotUseOrElse(2147483646, module$contents$goog$flags_STAGING);
goog.flags.TESTONLY_STABLE_FLAG = module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__use_toggles ? module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__override_disable_toggles || !module$exports$google3$third_party$javascript$closure$flags$flags$2etoggles.TOGGLE_GoogFlags__testonly_stable_flag__disable : goog.readFlagInternalDoNotUseOrElse(2147483647, !0);
var module$contents$goog$labs$userAgent_forceClientHintsInTests = !1;
goog.labs.userAgent.setUseClientHintsForTesting = function(use) {
  module$contents$goog$labs$userAgent_forceClientHintsInTests = use;
};
goog.labs.userAgent.useClientHints = function() {
  return goog.flags.USE_USER_AGENT_CLIENT_HINTS || module$contents$goog$labs$userAgent_forceClientHintsInTests;
};
goog.labs.userAgent.util = {};
function module$contents$goog$labs$userAgent$util_getNativeUserAgentString() {
  var navigator = goog.global.navigator;
  if (navigator) {
    var userAgent = navigator.userAgent;
    if (userAgent) {
      return userAgent;
    }
  }
  return "";
}
function module$contents$goog$labs$userAgent$util_getNativeUserAgentData() {
  var navigator = goog.global.navigator;
  return navigator ? navigator.userAgentData || null : null;
}
var module$contents$goog$labs$userAgent$util_userAgentInternal = null, module$contents$goog$labs$userAgent$util_userAgentDataInternal = module$contents$goog$labs$userAgent$util_getNativeUserAgentData();
function module$contents$goog$labs$userAgent$util_setUserAgent(userAgent) {
  module$contents$goog$labs$userAgent$util_userAgentInternal = typeof userAgent === "string" ? userAgent : module$contents$goog$labs$userAgent$util_getNativeUserAgentString();
}
function module$contents$goog$labs$userAgent$util_getUserAgent() {
  return module$contents$goog$labs$userAgent$util_userAgentInternal == null ? module$contents$goog$labs$userAgent$util_getNativeUserAgentString() : module$contents$goog$labs$userAgent$util_userAgentInternal;
}
function module$contents$goog$labs$userAgent$util_setUserAgentData(userAgentData) {
  module$contents$goog$labs$userAgent$util_userAgentDataInternal = userAgentData;
}
function module$contents$goog$labs$userAgent$util_resetUserAgentData() {
  module$contents$goog$labs$userAgent$util_userAgentDataInternal = module$contents$goog$labs$userAgent$util_getNativeUserAgentData();
}
function module$contents$goog$labs$userAgent$util_getUserAgentData() {
  return module$contents$goog$labs$userAgent$util_userAgentDataInternal;
}
function module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(str) {
  if (!(0,goog.labs.userAgent.useClientHints)()) {
    return !1;
  }
  var data = module$contents$goog$labs$userAgent$util_userAgentDataInternal;
  if (!data) {
    return !1;
  }
  for (var i = 0; i < data.brands.length; i++) {
    var $jscomp$destructuring$var0 = data.brands[i], brand = $jscomp$destructuring$var0.brand;
    if (brand && module$contents$goog$string$internal_contains(brand, str)) {
      return !0;
    }
  }
  return !1;
}
function module$contents$goog$labs$userAgent$util_matchUserAgent(str) {
  var userAgent = module$contents$goog$labs$userAgent$util_getUserAgent();
  return module$contents$goog$string$internal_contains(userAgent, str);
}
function module$contents$goog$labs$userAgent$util_matchUserAgentIgnoreCase(str) {
  var userAgent = module$contents$goog$labs$userAgent$util_getUserAgent();
  return module$contents$goog$string$internal_caseInsensitiveContains(userAgent, str);
}
function module$contents$goog$labs$userAgent$util_extractVersionTuples(userAgent) {
  for (var versionRegExp = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), data = [], match; match = versionRegExp.exec(userAgent);) {
    data.push([match[1], match[2], match[3] || void 0]);
  }
  return data;
}
goog.labs.userAgent.util.ASSUME_CLIENT_HINTS_SUPPORT = !1;
goog.labs.userAgent.util.extractVersionTuples = module$contents$goog$labs$userAgent$util_extractVersionTuples;
goog.labs.userAgent.util.getNativeUserAgentString = module$contents$goog$labs$userAgent$util_getNativeUserAgentString;
goog.labs.userAgent.util.getUserAgent = module$contents$goog$labs$userAgent$util_getUserAgent;
goog.labs.userAgent.util.getUserAgentData = module$contents$goog$labs$userAgent$util_getUserAgentData;
goog.labs.userAgent.util.matchUserAgent = module$contents$goog$labs$userAgent$util_matchUserAgent;
goog.labs.userAgent.util.matchUserAgentDataBrand = module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand;
goog.labs.userAgent.util.matchUserAgentIgnoreCase = module$contents$goog$labs$userAgent$util_matchUserAgentIgnoreCase;
goog.labs.userAgent.util.resetUserAgentData = module$contents$goog$labs$userAgent$util_resetUserAgentData;
goog.labs.userAgent.util.setUserAgent = module$contents$goog$labs$userAgent$util_setUserAgent;
goog.labs.userAgent.util.setUserAgentData = module$contents$goog$labs$userAgent$util_setUserAgentData;
var module$exports$goog$labs$userAgent$highEntropy$highEntropyValue = {AsyncValue:function() {
}};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.AsyncValue.prototype.getIfLoaded = function() {
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.AsyncValue.prototype.load = function() {
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue = function(key) {
  this.key_ = key;
  this.promise_ = this.value_ = void 0;
  this.pending_ = !1;
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue.prototype.getIfLoaded = function() {
  var userAgentData = module$contents$goog$labs$userAgent$util_userAgentDataInternal;
  if (userAgentData) {
    return this.value_;
  }
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue.prototype.load = function() {
  var $jscomp$async$this$m2110036436$9 = this, userAgentData;
  return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$m2110036436$35) {
    if ($jscomp$generator$context$m2110036436$35.nextAddress == 1) {
      userAgentData = module$contents$goog$labs$userAgent$util_userAgentDataInternal;
      if (!userAgentData) {
        return $jscomp$generator$context$m2110036436$35.return(void 0);
      }
      $jscomp$async$this$m2110036436$9.promise_ || ($jscomp$async$this$m2110036436$9.pending_ = !0, $jscomp$async$this$m2110036436$9.promise_ = function() {
        var dataValues;
        return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$m2110036436$34) {
          if ($jscomp$generator$context$m2110036436$34.nextAddress == 1) {
            return $jscomp$generator$context$m2110036436$34.setFinallyBlock(2), $jscomp$generator$context$m2110036436$34.yield(userAgentData.getHighEntropyValues([$jscomp$async$this$m2110036436$9.key_]), 4);
          }
          if ($jscomp$generator$context$m2110036436$34.nextAddress != 2) {
            return dataValues = $jscomp$generator$context$m2110036436$34.yieldResult, $jscomp$async$this$m2110036436$9.value_ = dataValues[$jscomp$async$this$m2110036436$9.key_], $jscomp$generator$context$m2110036436$34.return($jscomp$async$this$m2110036436$9.value_);
          }
          $jscomp$generator$context$m2110036436$34.enterFinallyBlock();
          $jscomp$async$this$m2110036436$9.pending_ = !1;
          return $jscomp$generator$context$m2110036436$34.leaveFinallyBlock(0);
        });
      }());
      return $jscomp$generator$context$m2110036436$35.yield($jscomp$async$this$m2110036436$9.promise_, 2);
    }
    return $jscomp$generator$context$m2110036436$35.return($jscomp$generator$context$m2110036436$35.yieldResult);
  });
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue.prototype.resetForTesting = function() {
  if (this.pending_) {
    throw Error("Unsafe call to resetForTesting");
  }
  this.value_ = this.promise_ = void 0;
  this.pending_ = !1;
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version = function(versionString) {
  this.versionString_ = versionString;
};
module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version.prototype.isAtLeast = function(version) {
  return module$contents$goog$string$internal_compareVersions(this.versionString_, version) >= 0;
};
var module$exports$goog$labs$userAgent$highEntropy$highEntropyData = {};
module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList = new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue("fullVersionList");
module$exports$goog$labs$userAgent$highEntropy$highEntropyData.platformVersion = new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue("platformVersion");
goog.labs.userAgent.browser = {};
var module$contents$goog$labs$userAgent$browser_Brand = {ANDROID_BROWSER:"Android Browser", CHROMIUM:"Chromium", EDGE:"Microsoft Edge", FIREFOX:"Firefox", IE:"Internet Explorer", OPERA:"Opera", SAFARI:"Safari", SILK:"Silk"};
goog.labs.userAgent.browser.Brand = module$contents$goog$labs$userAgent$browser_Brand;
function module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(ignoreClientHintsFlag) {
  ignoreClientHintsFlag = ignoreClientHintsFlag === void 0 ? !1 : ignoreClientHintsFlag;
  if (!ignoreClientHintsFlag && !(0,goog.labs.userAgent.useClientHints)()) {
    return !1;
  }
  var userAgentData = module$contents$goog$labs$userAgent$util_userAgentDataInternal;
  return !!userAgentData && userAgentData.brands.length > 0;
}
function module$contents$goog$labs$userAgent$browser_matchOpera() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Opera");
}
function module$contents$goog$labs$userAgent$browser_matchIE() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Trident") || module$contents$goog$labs$userAgent$util_matchUserAgent("MSIE");
}
function module$contents$goog$labs$userAgent$browser_matchEdgeHtml() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Edge");
}
function module$contents$goog$labs$userAgent$browser_matchEdgeChromium() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(module$contents$goog$labs$userAgent$browser_Brand.EDGE) : module$contents$goog$labs$userAgent$util_matchUserAgent("Edg/");
}
function module$contents$goog$labs$userAgent$browser_matchOperaChromium() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(module$contents$goog$labs$userAgent$browser_Brand.OPERA) : module$contents$goog$labs$userAgent$util_matchUserAgent("OPR");
}
function module$contents$goog$labs$userAgent$browser_matchFirefox() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Firefox") || module$contents$goog$labs$userAgent$util_matchUserAgent("FxiOS");
}
function module$contents$goog$labs$userAgent$browser_matchSafari() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Safari") && !(module$contents$goog$labs$userAgent$browser_matchChrome() || module$contents$goog$labs$userAgent$browser_matchCoast() || module$contents$goog$labs$userAgent$browser_matchOpera() || module$contents$goog$labs$userAgent$browser_matchEdgeHtml() || module$contents$goog$labs$userAgent$browser_matchEdgeChromium() || module$contents$goog$labs$userAgent$browser_matchOperaChromium() || module$contents$goog$labs$userAgent$browser_matchFirefox() || 
  module$contents$goog$labs$userAgent$browser_isSilk() || module$contents$goog$labs$userAgent$util_matchUserAgent("Android"));
}
function module$contents$goog$labs$userAgent$browser_matchCoast() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Coast");
}
function module$contents$goog$labs$userAgent$browser_matchIosWebview() {
  return (module$contents$goog$labs$userAgent$util_matchUserAgent("iPad") || module$contents$goog$labs$userAgent$util_matchUserAgent("iPhone")) && !module$contents$goog$labs$userAgent$browser_matchSafari() && !module$contents$goog$labs$userAgent$browser_matchChrome() && !module$contents$goog$labs$userAgent$browser_matchCoast() && !module$contents$goog$labs$userAgent$browser_matchFirefox() && module$contents$goog$labs$userAgent$util_matchUserAgent("AppleWebKit");
}
function module$contents$goog$labs$userAgent$browser_matchChrome() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(module$contents$goog$labs$userAgent$browser_Brand.CHROMIUM) : (module$contents$goog$labs$userAgent$util_matchUserAgent("Chrome") || module$contents$goog$labs$userAgent$util_matchUserAgent("CriOS")) && !module$contents$goog$labs$userAgent$browser_matchEdgeHtml() || module$contents$goog$labs$userAgent$browser_isSilk();
}
function module$contents$goog$labs$userAgent$browser_matchAndroidBrowser() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Android") && !(module$contents$goog$labs$userAgent$browser_matchChrome() || module$contents$goog$labs$userAgent$browser_matchFirefox() || module$contents$goog$labs$userAgent$browser_matchOpera() || module$contents$goog$labs$userAgent$browser_isSilk());
}
goog.labs.userAgent.browser.isOpera = module$contents$goog$labs$userAgent$browser_matchOpera;
goog.labs.userAgent.browser.isIE = module$contents$goog$labs$userAgent$browser_matchIE;
goog.labs.userAgent.browser.isEdge = module$contents$goog$labs$userAgent$browser_matchEdgeHtml;
goog.labs.userAgent.browser.isEdgeChromium = module$contents$goog$labs$userAgent$browser_matchEdgeChromium;
goog.labs.userAgent.browser.isOperaChromium = module$contents$goog$labs$userAgent$browser_matchOperaChromium;
goog.labs.userAgent.browser.isFirefox = module$contents$goog$labs$userAgent$browser_matchFirefox;
goog.labs.userAgent.browser.isSafari = module$contents$goog$labs$userAgent$browser_matchSafari;
goog.labs.userAgent.browser.isCoast = module$contents$goog$labs$userAgent$browser_matchCoast;
goog.labs.userAgent.browser.isIosWebview = module$contents$goog$labs$userAgent$browser_matchIosWebview;
goog.labs.userAgent.browser.isChrome = module$contents$goog$labs$userAgent$browser_matchChrome;
goog.labs.userAgent.browser.isAndroidBrowser = module$contents$goog$labs$userAgent$browser_matchAndroidBrowser;
function module$contents$goog$labs$userAgent$browser_isSilk() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Silk");
}
goog.labs.userAgent.browser.isSilk = module$contents$goog$labs$userAgent$browser_isSilk;
function module$contents$goog$labs$userAgent$browser_createVersionMap(versionTuples) {
  var versionMap = {};
  versionTuples.forEach(function(tuple) {
    var key = tuple[0], value = tuple[1];
    versionMap[key] = value;
  });
  return function(keys) {
    return versionMap[keys.find(function(key) {
      return key in versionMap;
    })] || "";
  };
}
function module$contents$goog$labs$userAgent$browser_getVersion() {
  var userAgentString = module$contents$goog$labs$userAgent$util_getUserAgent();
  if (module$contents$goog$labs$userAgent$browser_matchIE()) {
    return module$contents$goog$labs$userAgent$browser_getIEVersion(userAgentString);
  }
  var versionTuples = module$contents$goog$labs$userAgent$util_extractVersionTuples(userAgentString), lookUpValueWithKeys = module$contents$goog$labs$userAgent$browser_createVersionMap(versionTuples);
  if (module$contents$goog$labs$userAgent$browser_matchOpera()) {
    return lookUpValueWithKeys(["Version", "Opera"]);
  }
  if (module$contents$goog$labs$userAgent$browser_matchEdgeHtml()) {
    return lookUpValueWithKeys(["Edge"]);
  }
  if (module$contents$goog$labs$userAgent$browser_matchEdgeChromium()) {
    return lookUpValueWithKeys(["Edg"]);
  }
  if (module$contents$goog$labs$userAgent$browser_isSilk()) {
    return lookUpValueWithKeys(["Silk"]);
  }
  if (module$contents$goog$labs$userAgent$browser_matchChrome()) {
    return lookUpValueWithKeys(["Chrome", "CriOS", "HeadlessChrome"]);
  }
  var tuple = versionTuples[2];
  return tuple && tuple[1] || "";
}
goog.labs.userAgent.browser.getVersion = module$contents$goog$labs$userAgent$browser_getVersion;
function module$contents$goog$labs$userAgent$browser_isVersionOrHigher(version) {
  return module$contents$goog$string$internal_compareVersions(module$contents$goog$labs$userAgent$browser_getVersion(), version) >= 0;
}
goog.labs.userAgent.browser.isVersionOrHigher = module$contents$goog$labs$userAgent$browser_isVersionOrHigher;
function module$contents$goog$labs$userAgent$browser_getIEVersion(userAgent) {
  var rv = /rv: *([\d\.]*)/.exec(userAgent);
  if (rv && rv[1]) {
    return rv[1];
  }
  var version = "", msie = /MSIE +([\d\.]+)/.exec(userAgent);
  if (msie && msie[1]) {
    var tridentVersion = /Trident\/(\d.\d)/.exec(userAgent);
    if (msie[1] == "7.0") {
      if (tridentVersion && tridentVersion[1]) {
        switch(tridentVersion[1]) {
          case "4.0":
            version = "8.0";
            break;
          case "5.0":
            version = "9.0";
            break;
          case "6.0":
            version = "10.0";
            break;
          case "7.0":
            version = "11.0";
        }
      } else {
        version = "7.0";
      }
    } else {
      version = msie[1];
    }
  }
  return version;
}
function module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString(browser) {
  var userAgentString = module$contents$goog$labs$userAgent$util_getUserAgent();
  if (browser === module$contents$goog$labs$userAgent$browser_Brand.IE) {
    return module$contents$goog$labs$userAgent$browser_matchIE() ? module$contents$goog$labs$userAgent$browser_getIEVersion(userAgentString) : "";
  }
  var versionTuples = module$contents$goog$labs$userAgent$util_extractVersionTuples(userAgentString), lookUpValueWithKeys = module$contents$goog$labs$userAgent$browser_createVersionMap(versionTuples);
  switch(browser) {
    case module$contents$goog$labs$userAgent$browser_Brand.OPERA:
      if (module$contents$goog$labs$userAgent$browser_matchOpera()) {
        return lookUpValueWithKeys(["Version", "Opera"]);
      }
      if (module$contents$goog$labs$userAgent$browser_matchOperaChromium()) {
        return lookUpValueWithKeys(["OPR"]);
      }
      break;
    case module$contents$goog$labs$userAgent$browser_Brand.EDGE:
      if (module$contents$goog$labs$userAgent$browser_matchEdgeHtml()) {
        return lookUpValueWithKeys(["Edge"]);
      }
      if (module$contents$goog$labs$userAgent$browser_matchEdgeChromium()) {
        return lookUpValueWithKeys(["Edg"]);
      }
      break;
    case module$contents$goog$labs$userAgent$browser_Brand.CHROMIUM:
      if (module$contents$goog$labs$userAgent$browser_matchChrome()) {
        return lookUpValueWithKeys(["Chrome", "CriOS", "HeadlessChrome"]);
      }
  }
  if (browser === module$contents$goog$labs$userAgent$browser_Brand.FIREFOX && module$contents$goog$labs$userAgent$browser_matchFirefox() || browser === module$contents$goog$labs$userAgent$browser_Brand.SAFARI && module$contents$goog$labs$userAgent$browser_matchSafari() || browser === module$contents$goog$labs$userAgent$browser_Brand.ANDROID_BROWSER && module$contents$goog$labs$userAgent$browser_matchAndroidBrowser() || browser === module$contents$goog$labs$userAgent$browser_Brand.SILK && module$contents$goog$labs$userAgent$browser_isSilk()) {
    var tuple = versionTuples[2];
    return tuple && tuple[1] || "";
  }
  return "";
}
function module$contents$goog$labs$userAgent$browser_versionOf_(browser) {
  if (module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() && browser !== module$contents$goog$labs$userAgent$browser_Brand.SILK) {
    var data = module$contents$goog$labs$userAgent$util_userAgentDataInternal, matchingBrand = data.brands.find(function($jscomp$destructuring$var1) {
      var $jscomp$destructuring$var2 = $jscomp$destructuring$var1;
      var brand = $jscomp$destructuring$var2.brand;
      return brand === browser;
    });
    if (!matchingBrand || !matchingBrand.version) {
      return NaN;
    }
    var versionParts = matchingBrand.version.split(".");
  } else {
    var fullVersion = module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString(browser);
    if (fullVersion === "") {
      return NaN;
    }
    versionParts = fullVersion.split(".");
  }
  if (versionParts.length === 0) {
    return NaN;
  }
  var majorVersion = versionParts[0];
  return Number(majorVersion);
}
function module$contents$goog$labs$userAgent$browser_isAtLeast(brand, majorVersion) {
  (0,goog.asserts.assert)(Math.floor(majorVersion) === majorVersion, "Major version must be an integer");
  return module$contents$goog$labs$userAgent$browser_versionOf_(brand) >= majorVersion;
}
goog.labs.userAgent.browser.isAtLeast = module$contents$goog$labs$userAgent$browser_isAtLeast;
function module$contents$goog$labs$userAgent$browser_isAtMost(brand, majorVersion) {
  (0,goog.asserts.assert)(Math.floor(majorVersion) === majorVersion, "Major version must be an integer");
  return module$contents$goog$labs$userAgent$browser_versionOf_(brand) <= majorVersion;
}
goog.labs.userAgent.browser.isAtMost = module$contents$goog$labs$userAgent$browser_isAtMost;
var module$contents$goog$labs$userAgent$browser_HighEntropyBrandVersion = function(brand, useUach, fallbackVersion) {
  this.brand_ = brand;
  this.version_ = new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version(fallbackVersion);
  this.useUach_ = useUach;
};
module$contents$goog$labs$userAgent$browser_HighEntropyBrandVersion.prototype.getIfLoaded = function() {
  var $jscomp$this$1683157560$99 = this;
  if (this.useUach_) {
    var loadedVersionList = module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.getIfLoaded();
    if (loadedVersionList !== void 0) {
      var matchingBrand = loadedVersionList.find(function($jscomp$destructuring$var3) {
        var $jscomp$destructuring$var4 = $jscomp$destructuring$var3;
        var brand = $jscomp$destructuring$var4.brand;
        return $jscomp$this$1683157560$99.brand_ === brand;
      });
      (0,goog.asserts.assertExists)(matchingBrand);
      return new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version(matchingBrand.version);
    }
  }
  if (module$contents$goog$labs$userAgent$browser_preUachHasLoaded) {
    return this.version_;
  }
};
module$contents$goog$labs$userAgent$browser_HighEntropyBrandVersion.prototype.load = function() {
  var $jscomp$async$this$1683157560$59 = this, loadedVersionList, matchingBrand;
  return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$1683157560$106) {
    if ($jscomp$generator$context$1683157560$106.nextAddress == 1) {
      return $jscomp$async$this$1683157560$59.useUach_ ? $jscomp$generator$context$1683157560$106.yield(module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.load(), 5) : $jscomp$generator$context$1683157560$106.yield(0, 3);
    }
    if ($jscomp$generator$context$1683157560$106.nextAddress != 3 && (loadedVersionList = $jscomp$generator$context$1683157560$106.yieldResult, loadedVersionList !== void 0)) {
      return matchingBrand = loadedVersionList.find(function($jscomp$destructuring$var5) {
        var $jscomp$destructuring$var6 = $jscomp$destructuring$var5;
        var brand = $jscomp$destructuring$var6.brand;
        return $jscomp$async$this$1683157560$59.brand_ === brand;
      }), (0,goog.asserts.assertExists)(matchingBrand), $jscomp$generator$context$1683157560$106.return(new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version(matchingBrand.version));
    }
    module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !0;
    return $jscomp$generator$context$1683157560$106.return($jscomp$async$this$1683157560$59.version_);
  });
};
var module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !1;
function module$contents$goog$labs$userAgent$browser_loadFullVersions() {
  return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$1683157560$107) {
    if ($jscomp$generator$context$1683157560$107.nextAddress == 1) {
      return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(!0) ? $jscomp$generator$context$1683157560$107.yield(module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.load(), 2) : $jscomp$generator$context$1683157560$107.jumpTo(2);
    }
    module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !0;
    $jscomp$generator$context$1683157560$107.jumpToEnd();
  });
}
goog.labs.userAgent.browser.loadFullVersions = module$contents$goog$labs$userAgent$browser_loadFullVersions;
goog.labs.userAgent.browser.resetForTesting = function() {
  module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !1;
  module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.resetForTesting();
};
function module$contents$goog$labs$userAgent$browser_fullVersionOf(browser) {
  var fallbackVersionString = "";
  module$contents$goog$labs$userAgent$browser_isAtLeast(module$contents$goog$labs$userAgent$browser_Brand.CHROMIUM, 98) || (fallbackVersionString = module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString(browser));
  var useUach = browser !== module$contents$goog$labs$userAgent$browser_Brand.SILK && module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(!0);
  if (useUach) {
    var data = module$contents$goog$labs$userAgent$util_userAgentDataInternal;
    if (!data.brands.find(function($jscomp$destructuring$var7) {
      var $jscomp$destructuring$var8 = $jscomp$destructuring$var7;
      var brand = $jscomp$destructuring$var8.brand;
      return brand === browser;
    })) {
      return;
    }
  } else if (fallbackVersionString === "") {
    return;
  }
  return new module$contents$goog$labs$userAgent$browser_HighEntropyBrandVersion(browser, useUach, fallbackVersionString);
}
goog.labs.userAgent.browser.fullVersionOf = module$contents$goog$labs$userAgent$browser_fullVersionOf;
function module$contents$goog$labs$userAgent$browser_getVersionStringForLogging(browser) {
  if (module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(!0)) {
    var fullVersionObj = module$contents$goog$labs$userAgent$browser_fullVersionOf(browser);
    if (fullVersionObj) {
      var fullVersion = fullVersionObj.getIfLoaded();
      if (fullVersion) {
        return fullVersion.versionString_;
      }
      var data = module$contents$goog$labs$userAgent$util_userAgentDataInternal, matchingBrand = data.brands.find(function($jscomp$destructuring$var9) {
        var $jscomp$destructuring$var10 = $jscomp$destructuring$var9;
        var brand = $jscomp$destructuring$var10.brand;
        return brand === browser;
      });
      (0,goog.asserts.assertExists)(matchingBrand);
      return matchingBrand.version;
    }
    return "";
  }
  return module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString(browser);
}
goog.labs.userAgent.browser.getVersionStringForLogging = module$contents$goog$labs$userAgent$browser_getVersionStringForLogging;
goog.labs.userAgent.engine = {};
function module$contents$goog$labs$userAgent$engine_isPresto() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Presto");
}
function module$contents$goog$labs$userAgent$engine_isTrident() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Trident") || module$contents$goog$labs$userAgent$util_matchUserAgent("MSIE");
}
function module$contents$goog$labs$userAgent$engine_isEdge() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Edge");
}
function module$contents$goog$labs$userAgent$engine_isWebKit() {
  return module$contents$goog$labs$userAgent$util_matchUserAgentIgnoreCase("WebKit") && !module$contents$goog$labs$userAgent$engine_isEdge();
}
function module$contents$goog$labs$userAgent$engine_isGecko() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Gecko") && !module$contents$goog$labs$userAgent$engine_isWebKit() && !module$contents$goog$labs$userAgent$engine_isTrident() && !module$contents$goog$labs$userAgent$engine_isEdge();
}
function module$contents$goog$labs$userAgent$engine_getVersion() {
  var userAgentString = module$contents$goog$labs$userAgent$util_getUserAgent();
  if (userAgentString) {
    var tuples = module$contents$goog$labs$userAgent$util_extractVersionTuples(userAgentString);
    a: {
      if (module$contents$goog$labs$userAgent$engine_isEdge()) {
        for (var i = 0; i < tuples.length; i++) {
          var tuple = tuples[i];
          if (tuple[0] == "Edge") {
            var JSCompiler_inline_result = tuple;
            break a;
          }
        }
        JSCompiler_inline_result = void 0;
      } else {
        JSCompiler_inline_result = tuples[1];
      }
    }
    var engineTuple = JSCompiler_inline_result;
    if (engineTuple) {
      return engineTuple[0] == "Gecko" ? module$contents$goog$labs$userAgent$engine_getVersionForKey(tuples, "Firefox") : engineTuple[1];
    }
    var browserTuple = tuples[0], info;
    if (browserTuple && (info = browserTuple[2])) {
      var match = /Trident\/([^\s;]+)/.exec(info);
      if (match) {
        return match[1];
      }
    }
  }
  return "";
}
function module$contents$goog$labs$userAgent$engine_isVersionOrHigher(version) {
  return module$contents$goog$string$internal_compareVersions(module$contents$goog$labs$userAgent$engine_getVersion(), version) >= 0;
}
function module$contents$goog$labs$userAgent$engine_getVersionForKey(tuples, key) {
  var pair = module$contents$goog$array_find(tuples, function(pair) {
    return key == pair[0];
  });
  return pair && pair[1] || "";
}
goog.labs.userAgent.engine.getVersion = module$contents$goog$labs$userAgent$engine_getVersion;
goog.labs.userAgent.engine.isEdge = module$contents$goog$labs$userAgent$engine_isEdge;
goog.labs.userAgent.engine.isGecko = module$contents$goog$labs$userAgent$engine_isGecko;
goog.labs.userAgent.engine.isPresto = module$contents$goog$labs$userAgent$engine_isPresto;
goog.labs.userAgent.engine.isTrident = module$contents$goog$labs$userAgent$engine_isTrident;
goog.labs.userAgent.engine.isVersionOrHigher = module$contents$goog$labs$userAgent$engine_isVersionOrHigher;
goog.labs.userAgent.engine.isWebKit = module$contents$goog$labs$userAgent$engine_isWebKit;
goog.labs.userAgent.platform = {};
function module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform(ignoreClientHintsFlag) {
  ignoreClientHintsFlag = ignoreClientHintsFlag === void 0 ? !1 : ignoreClientHintsFlag;
  if (!ignoreClientHintsFlag && !(0,goog.labs.userAgent.useClientHints)()) {
    return !1;
  }
  var userAgentData = module$contents$goog$labs$userAgent$util_userAgentDataInternal;
  return !!userAgentData && !!userAgentData.platform;
}
function module$contents$goog$labs$userAgent$platform_isAndroid() {
  return module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform() ? module$contents$goog$labs$userAgent$util_userAgentDataInternal.platform === "Android" : module$contents$goog$labs$userAgent$util_matchUserAgent("Android");
}
function module$contents$goog$labs$userAgent$platform_isIpod() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("iPod");
}
function module$contents$goog$labs$userAgent$platform_isIphone() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("iPhone") && !module$contents$goog$labs$userAgent$util_matchUserAgent("iPod") && !module$contents$goog$labs$userAgent$util_matchUserAgent("iPad");
}
function module$contents$goog$labs$userAgent$platform_isIpad() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("iPad");
}
function module$contents$goog$labs$userAgent$platform_isIos() {
  return module$contents$goog$labs$userAgent$platform_isIphone() || module$contents$goog$labs$userAgent$platform_isIpad() || module$contents$goog$labs$userAgent$platform_isIpod();
}
function module$contents$goog$labs$userAgent$platform_isMacintosh() {
  return module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform() ? module$contents$goog$labs$userAgent$util_userAgentDataInternal.platform === "macOS" : module$contents$goog$labs$userAgent$util_matchUserAgent("Macintosh");
}
function module$contents$goog$labs$userAgent$platform_isLinux() {
  return module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform() ? module$contents$goog$labs$userAgent$util_userAgentDataInternal.platform === "Linux" : module$contents$goog$labs$userAgent$util_matchUserAgent("Linux");
}
function module$contents$goog$labs$userAgent$platform_isWindows() {
  return module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform() ? module$contents$goog$labs$userAgent$util_userAgentDataInternal.platform === "Windows" : module$contents$goog$labs$userAgent$util_matchUserAgent("Windows");
}
function module$contents$goog$labs$userAgent$platform_isChromeOS() {
  return module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform() ? module$contents$goog$labs$userAgent$util_userAgentDataInternal.platform === "Chrome OS" : module$contents$goog$labs$userAgent$util_matchUserAgent("CrOS");
}
function module$contents$goog$labs$userAgent$platform_isChromecast() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("CrKey");
}
function module$contents$goog$labs$userAgent$platform_isKaiOS() {
  return module$contents$goog$labs$userAgent$util_matchUserAgentIgnoreCase("KaiOS");
}
function module$contents$goog$labs$userAgent$platform_getVersion() {
  var userAgentString = module$contents$goog$labs$userAgent$util_getUserAgent(), version = "";
  if (module$contents$goog$labs$userAgent$platform_isWindows()) {
    var re = /Windows (?:NT|Phone) ([0-9.]+)/;
    var match = re.exec(userAgentString);
    version = match ? match[1] : "0.0";
  } else if (module$contents$goog$labs$userAgent$platform_isIos()) {
    re = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/;
    var match$jscomp$0 = re.exec(userAgentString);
    version = match$jscomp$0 && match$jscomp$0[1].replace(/_/g, ".");
  } else if (module$contents$goog$labs$userAgent$platform_isMacintosh()) {
    re = /Mac OS X ([0-9_.]+)/;
    var match$jscomp$1 = re.exec(userAgentString);
    version = match$jscomp$1 ? match$jscomp$1[1].replace(/_/g, ".") : "10";
  } else if (module$contents$goog$labs$userAgent$platform_isKaiOS()) {
    re = /(?:KaiOS)\/(\S+)/i;
    var match$jscomp$2 = re.exec(userAgentString);
    version = match$jscomp$2 && match$jscomp$2[1];
  } else if (module$contents$goog$labs$userAgent$platform_isAndroid()) {
    re = /Android\s+([^\);]+)(\)|;)/;
    var match$jscomp$3 = re.exec(userAgentString);
    version = match$jscomp$3 && match$jscomp$3[1];
  } else if (module$contents$goog$labs$userAgent$platform_isChromeOS()) {
    re = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/;
    var match$jscomp$4 = re.exec(userAgentString);
    version = match$jscomp$4 && match$jscomp$4[1];
  }
  return version || "";
}
function module$contents$goog$labs$userAgent$platform_isVersionOrHigher(version) {
  return module$contents$goog$string$internal_compareVersions(module$contents$goog$labs$userAgent$platform_getVersion(), version) >= 0;
}
var module$contents$goog$labs$userAgent$platform_PlatformVersion = function() {
  this.preUachHasLoaded_ = !1;
};
module$contents$goog$labs$userAgent$platform_PlatformVersion.prototype.getIfLoaded = function() {
  if (module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform(!0)) {
    var loadedPlatformVersion = module$exports$goog$labs$userAgent$highEntropy$highEntropyData.platformVersion.getIfLoaded();
    return loadedPlatformVersion === void 0 ? void 0 : new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version(loadedPlatformVersion);
  }
  if (this.preUachHasLoaded_) {
    return new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version(module$contents$goog$labs$userAgent$platform_getVersion());
  }
};
module$contents$goog$labs$userAgent$platform_PlatformVersion.prototype.load = function() {
  var $jscomp$async$this$m1628565157$33 = this, JSCompiler_temp_const;
  return (0,$jscomp.asyncExecutePromiseGeneratorProgram)(function($jscomp$generator$context$m1628565157$37) {
    if ($jscomp$generator$context$m1628565157$37.nextAddress == 1) {
      if (!module$contents$goog$labs$userAgent$platform_useUserAgentDataPlatform(!0)) {
        return $jscomp$async$this$m1628565157$33.preUachHasLoaded_ = !0, $jscomp$generator$context$m1628565157$37.return(new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version(module$contents$goog$labs$userAgent$platform_getVersion()));
      }
      JSCompiler_temp_const = module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version;
      return $jscomp$generator$context$m1628565157$37.yield(module$exports$goog$labs$userAgent$highEntropy$highEntropyData.platformVersion.load(), 3);
    }
    return $jscomp$generator$context$m1628565157$37.return(new JSCompiler_temp_const($jscomp$generator$context$m1628565157$37.yieldResult));
  });
};
module$contents$goog$labs$userAgent$platform_PlatformVersion.prototype.resetForTesting = function() {
  module$exports$goog$labs$userAgent$highEntropy$highEntropyData.platformVersion.resetForTesting();
  this.preUachHasLoaded_ = !1;
};
var module$contents$goog$labs$userAgent$platform_version = new module$contents$goog$labs$userAgent$platform_PlatformVersion();
goog.labs.userAgent.platform.getVersion = module$contents$goog$labs$userAgent$platform_getVersion;
goog.labs.userAgent.platform.isAndroid = module$contents$goog$labs$userAgent$platform_isAndroid;
goog.labs.userAgent.platform.isChromeOS = module$contents$goog$labs$userAgent$platform_isChromeOS;
goog.labs.userAgent.platform.isChromecast = module$contents$goog$labs$userAgent$platform_isChromecast;
goog.labs.userAgent.platform.isIos = module$contents$goog$labs$userAgent$platform_isIos;
goog.labs.userAgent.platform.isIpad = module$contents$goog$labs$userAgent$platform_isIpad;
goog.labs.userAgent.platform.isIphone = module$contents$goog$labs$userAgent$platform_isIphone;
goog.labs.userAgent.platform.isIpod = module$contents$goog$labs$userAgent$platform_isIpod;
goog.labs.userAgent.platform.isKaiOS = module$contents$goog$labs$userAgent$platform_isKaiOS;
goog.labs.userAgent.platform.isLinux = module$contents$goog$labs$userAgent$platform_isLinux;
goog.labs.userAgent.platform.isMacintosh = module$contents$goog$labs$userAgent$platform_isMacintosh;
goog.labs.userAgent.platform.isVersionOrHigher = module$contents$goog$labs$userAgent$platform_isVersionOrHigher;
goog.labs.userAgent.platform.isWindows = module$contents$goog$labs$userAgent$platform_isWindows;
goog.labs.userAgent.platform.version = module$contents$goog$labs$userAgent$platform_version;
goog.reflect = {};
goog.reflect.object = function(type, object) {
  return object;
};
goog.reflect.objectProperty = function(prop) {
  return prop;
};
goog.reflect.sinkValue = function(x) {
  goog.reflect.sinkValue[" "](x);
  return x;
};
goog.reflect.sinkValue[" "] = function() {
};
goog.reflect.canAccessProperty = function(obj, prop) {
  try {
    return goog.reflect.sinkValue(obj[prop]), !0;
  } catch (e) {
  }
  return !1;
};
goog.reflect.cache = function(cacheObj, key, valueFn, opt_keyFn) {
  var storedKey = opt_keyFn ? opt_keyFn(key) : key;
  return Object.prototype.hasOwnProperty.call(cacheObj, storedKey) ? cacheObj[storedKey] : cacheObj[storedKey] = valueFn(key);
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return module$contents$goog$labs$userAgent$util_getUserAgent();
};
goog.userAgent.getNavigatorTyped = function() {
  return goog.global.navigator || null;
};
goog.userAgent.getNavigator = function() {
  return goog.userAgent.getNavigatorTyped();
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : module$contents$goog$labs$userAgent$browser_matchOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : module$contents$goog$labs$userAgent$browser_matchIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : module$contents$goog$labs$userAgent$engine_isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : module$contents$goog$labs$userAgent$engine_isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : module$contents$goog$labs$userAgent$engine_isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && module$contents$goog$labs$userAgent$util_matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var navigator = goog.userAgent.getNavigatorTyped();
  return navigator && navigator.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.ASSUME_KAIOS = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : module$contents$goog$labs$userAgent$platform_isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : module$contents$goog$labs$userAgent$platform_isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return module$contents$goog$labs$userAgent$platform_isLinux() || module$contents$goog$labs$userAgent$platform_isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : module$contents$goog$labs$userAgent$platform_isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : module$contents$goog$labs$userAgent$platform_isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : module$contents$goog$labs$userAgent$platform_isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : module$contents$goog$labs$userAgent$platform_isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : module$contents$goog$labs$userAgent$platform_isIos();
goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : module$contents$goog$labs$userAgent$platform_isKaiOS();
goog.userAgent.determineVersion_ = function() {
  var version = "", arr = goog.userAgent.getVersionRegexResult_();
  arr && (version = arr ? arr[1] : "");
  if (goog.userAgent.IE) {
    var docMode = goog.userAgent.getDocumentMode_();
    if (docMode != null && docMode > parseFloat(version)) {
      return String(docMode);
    }
  }
  return version;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var userAgent = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv:([^\);]+)(\)|;)/.exec(userAgent);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec(userAgent);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(userAgent);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(userAgent);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec(userAgent);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var doc = goog.global.document;
  return doc ? doc.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(v1, v2) {
  return module$contents$goog$string$internal_compareVersions(v1, v2);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(version) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, version, function() {
    return module$contents$goog$string$internal_compareVersions(goog.userAgent.VERSION, version) >= 0;
  });
};
goog.userAgent.isDocumentModeOrHigher = function(documentMode) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= documentMode;
};
var JSCompiler_inline_result$jscomp$114;
var doc$jscomp$inline_120 = goog.global.document;
if (doc$jscomp$inline_120 && goog.userAgent.IE) {
  var documentMode$jscomp$inline_121 = goog.userAgent.getDocumentMode_();
  if (documentMode$jscomp$inline_121) {
    JSCompiler_inline_result$jscomp$114 = documentMode$jscomp$inline_121;
  } else {
    var ieVersion$jscomp$inline_122 = parseInt(goog.userAgent.VERSION, 10);
    JSCompiler_inline_result$jscomp$114 = ieVersion$jscomp$inline_122 || void 0;
  }
} else {
  JSCompiler_inline_result$jscomp$114 = void 0;
}
goog.userAgent.DOCUMENT_MODE = JSCompiler_inline_result$jscomp$114;
var safevalues = {dom:{}};
safevalues.dom.setAnchorHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHref;
safevalues.dom.setAnchorHrefLite = module$contents$google3$third_party$javascript$safevalues$dom$elements$anchor_setAnchorHrefLite;
safevalues.dom.setAreaHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$area_setAreaHref;
safevalues.dom.setBaseHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$base_setBaseHref;
safevalues.dom.setButtonFormaction = module$contents$google3$third_party$javascript$safevalues$dom$elements$button_setButtonFormaction;
safevalues.dom.buildPrefixedAttributeSetter = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_buildPrefixedAttributeSetter;
safevalues.dom.elementInsertAdjacentHtml = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_elementInsertAdjacentHtml;
safevalues.dom.setElementAttribute = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementAttribute;
safevalues.dom.setElementInnerHtml = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementInnerHtml;
safevalues.dom.setElementOuterHtml = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementOuterHtml;
safevalues.dom.setElementPrefixedAttribute = module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementPrefixedAttribute;
safevalues.dom.setEmbedSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$embed_setEmbedSrc;
safevalues.dom.setFormAction = module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormAction;
safevalues.dom.setFormActionLite = module$contents$google3$third_party$javascript$safevalues$dom$elements$form_setFormActionLite;
safevalues.dom.IframeIntent = module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.IframeIntent;
safevalues.dom.setIframeSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrc;
safevalues.dom.setIframeSrcdoc = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdoc;
safevalues.dom.setIframeSrcdocWithIntent = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcdocWithIntent;
safevalues.dom.setIframeSrcWithIntent = module$contents$google3$third_party$javascript$safevalues$dom$elements$iframe_setIframeSrcWithIntent;
safevalues.dom.TypeCannotBeUsedWithIframeIntentError = module$exports$google3$third_party$javascript$safevalues$dom$elements$iframe.TypeCannotBeUsedWithIframeIntentError;
safevalues.dom.setInputFormaction = module$contents$google3$third_party$javascript$safevalues$dom$elements$input_setInputFormaction;
safevalues.dom.setLinkHrefAndRel = module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkHrefAndRel;
safevalues.dom.setLinkWithResourceUrlHrefAndRel = module$contents$google3$third_party$javascript$safevalues$dom$elements$link_setLinkWithResourceUrlHrefAndRel;
safevalues.dom.setObjectData = module$contents$google3$third_party$javascript$safevalues$dom$elements$object_setObjectData;
safevalues.dom.setScriptSrc = module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptSrc;
safevalues.dom.setScriptTextContent = module$contents$google3$third_party$javascript$safevalues$dom$elements$script_setScriptTextContent;
safevalues.dom.setStyleTextContent = module$contents$google3$third_party$javascript$safevalues$dom$elements$style_setStyleTextContent;
safevalues.dom.setSvgAttribute = module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_setSvgAttribute;
safevalues.dom.setSvgUseHref = module$contents$google3$third_party$javascript$safevalues$dom$elements$svg_use_setSvgUseHref;
safevalues.dom.documentExecCommand = module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentExecCommand;
safevalues.dom.documentExecCommandInsertHtml = module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentExecCommandInsertHtml;
safevalues.dom.documentWrite = module$contents$google3$third_party$javascript$safevalues$dom$globals$document_documentWrite;
safevalues.dom.domParserParseFromString = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseFromString;
safevalues.dom.domParserParseHtml = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseHtml;
safevalues.dom.domParserParseXml = module$contents$google3$third_party$javascript$safevalues$dom$globals$dom_parser_domParserParseXml;
safevalues.dom.fetchResourceUrl = module$contents$google3$third_party$javascript$safevalues$dom$globals$fetch_fetchResourceUrl;
safevalues.dom.globalEval = module$contents$google3$third_party$javascript$safevalues$dom$globals$global_globalEval;
safevalues.dom.locationAssign = module$contents$google3$third_party$javascript$safevalues$dom$globals$location_locationAssign;
safevalues.dom.locationReplace = module$contents$google3$third_party$javascript$safevalues$dom$globals$location_locationReplace;
safevalues.dom.setLocationHref = module$contents$google3$third_party$javascript$safevalues$dom$globals$location_setLocationHref;
safevalues.dom.rangeCreateContextualFragment = module$contents$google3$third_party$javascript$safevalues$dom$globals$range_rangeCreateContextualFragment;
safevalues.dom.serviceWorkerContainerRegister = module$contents$google3$third_party$javascript$safevalues$dom$globals$service_worker_container_serviceWorkerContainerRegister;
safevalues.dom.objectUrlFromSafeSource = module$contents$google3$third_party$javascript$safevalues$dom$globals$url_objectUrlFromSafeSource;
safevalues.dom.getScriptNonce = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getScriptNonce;
safevalues.dom.getStyleNonce = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_getStyleNonce;
safevalues.dom.windowOpen = module$contents$google3$third_party$javascript$safevalues$dom$globals$window_windowOpen;
safevalues.dom.createSharedWorker = module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_createSharedWorker;
safevalues.dom.createWorker = module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_createWorker;
safevalues.dom.workerGlobalScopeImportScripts = module$contents$google3$third_party$javascript$safevalues$dom$globals$worker_workerGlobalScopeImportScripts;
safevalues.dom.WorkerGlobalScopeWithImportScripts = module$exports$google3$third_party$javascript$safevalues$dom$index.WorkerGlobalScopeWithImportScripts;
var module$exports$google3$third_party$javascript$safevalues$builders$sensitive_attributes = {SECURITY_SENSITIVE_ATTRIBUTES:"src srcdoc codebase data href rel action formaction sandbox icon".split(" ")};
function module$contents$google3$third_party$javascript$safevalues$builders$attribute_builders_safeAttrPrefix(templ) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templ, 0);
  var attrPrefix = templ[0].toLowerCase();
  if (goog.DEBUG) {
    if (attrPrefix.indexOf("on") === 0 || "on".indexOf(attrPrefix) === 0) {
      throw Error("Prefix '" + templ[0] + "' does not guarantee the attribute to be safe as it is also a prefix for event handler attributesPlease use 'addEventListener' to set event handlers.");
    }
    module$exports$google3$third_party$javascript$safevalues$builders$sensitive_attributes.SECURITY_SENSITIVE_ATTRIBUTES.forEach(function(sensitiveAttr) {
      if (sensitiveAttr.indexOf(attrPrefix) === 0) {
        throw Error("Prefix '" + templ[0] + "' does not guarantee the attribute to be safe as it is also a prefix for the security sensitive attribute '" + (sensitiveAttr + "'. Please use native or safe DOM APIs to set the attribute."));
      }
    });
  }
  return module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_createAttributePrefixInternal(attrPrefix);
}
;function module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_htmlFragment(templateObj) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, 0);
  var range = document.createRange();
  return range.createContextualFragment((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(templateObj[0])));
}
function module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_svgFragment(templateObj) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, 0);
  var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg"), range = document.createRange();
  range.selectNodeContents(svgElem);
  return range.createContextualFragment((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(templateObj[0])));
}
function module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_htmlToNode(html) {
  var range = document.createRange(), fragment = range.createContextualFragment((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(html));
  return fragment.childNodes.length === 1 ? fragment.childNodes[0] : fragment;
}
;function module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_safeStyleRule(templateObj) {
  var rest = $jscomp.getRestArguments.apply(1, arguments);
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, rest.length);
  for (var stringifiedRule = templateObj[0], i = 0; i < templateObj.length - 1; i++) {
    stringifiedRule += String(rest[i]), stringifiedRule += templateObj[i + 1];
  }
  var doc = document.implementation.createHTMLDocument(""), styleEl = doc.createElement("style");
  doc.head.appendChild(styleEl);
  var styleSheet = styleEl.sheet;
  styleSheet.insertRule(stringifiedRule, 0);
  if (styleSheet.cssRules.length !== 1) {
    if (goog.DEBUG) {
      throw Error("safeStyleRule can be used to construct only 1 CSSStyleRule at a time. Use the concatStyle function to create sheet with several rules. Tried to parse: " + stringifiedRule + ("which has " + styleSheet.cssRules.length + " rules: " + styleSheet.cssRules[0].cssText + " #$% " + styleSheet.cssRules[1].cssText + "."));
    }
  } else {
    var styleSheetRule = styleSheet.cssRules[0];
    if (styleSheetRule instanceof CSSStyleRule) {
      var styleSheetValue = styleSheetRule.cssText;
      return module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(styleSheetValue.replace(/</g, "\\3C "));
    }
    if (goog.DEBUG) {
      throw Error("safeStyleRule can be used to construct a CSSStyleRule. @-rules should be constructed with the safeStyleSheet builder. Tried to parse: " + stringifiedRule);
    }
  }
}
function module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_safeStyleSheet(templateObj) {
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, 0);
  var styleSheet = templateObj[0];
  if (goog.DEBUG && /</.test(styleSheet)) {
    throw Error("'<' character is forbidden in styleSheet string: " + styleSheet);
  }
  return module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(styleSheet);
}
function module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_concatStyleSheets(sheets) {
  return module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(sheets.map(module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet).join(""));
}
;var module$exports$google3$third_party$javascript$safevalues$builders$html_builders = {};
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscape(value, options) {
  if ((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.isHtml)(value)) {
    return value;
  }
  var htmlEscapedString = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(String(value)), $jscomp$optchain$tmp1107062685$0;
  if (($jscomp$optchain$tmp1107062685$0 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$0.preserveSpaces) {
    htmlEscapedString = htmlEscapedString.replace(/(^|[\r\n\t ]) /g, "$1&#160;");
  }
  var $jscomp$optchain$tmp1107062685$1;
  if (($jscomp$optchain$tmp1107062685$1 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$1.preserveNewlines) {
    htmlEscapedString = htmlEscapedString.replace(/(\r\n|\n|\r)/g, "<br>");
  }
  var $jscomp$optchain$tmp1107062685$2;
  if (($jscomp$optchain$tmp1107062685$2 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$2.preserveTabs) {
    htmlEscapedString = htmlEscapedString.replace(/(\t+)/g, '<span style="white-space:pre">$1</span>');
  }
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(htmlEscapedString);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscape;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_scriptToHtml(script, options) {
  var unwrappedScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript(script).toString(), stringTag = "<script", $jscomp$optchain$tmp1107062685$3;
  if (($jscomp$optchain$tmp1107062685$3 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$3.id) {
    stringTag += ' id="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.id) + '"';
  }
  var $jscomp$optchain$tmp1107062685$4;
  if (($jscomp$optchain$tmp1107062685$4 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$4.nonce) {
    stringTag += ' nonce="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.nonce) + '"';
  }
  var $jscomp$optchain$tmp1107062685$5;
  if (($jscomp$optchain$tmp1107062685$5 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$5.type) {
    stringTag += ' type="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.type) + '"';
  }
  var $jscomp$optchain$tmp1107062685$6;
  if (($jscomp$optchain$tmp1107062685$6 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$6.defer) {
    stringTag += " defer";
  }
  stringTag += ">" + unwrappedScript + "\x3c/script>";
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(stringTag);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.scriptToHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_scriptToHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_scriptUrlToHtml(src, options) {
  var unwrappedSrc = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(src).toString(), stringTag = '<script src="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(unwrappedSrc) + '"', $jscomp$optchain$tmp1107062685$7;
  if (($jscomp$optchain$tmp1107062685$7 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$7.async) {
    stringTag += " async";
  }
  var $jscomp$optchain$tmp1107062685$8;
  (($jscomp$optchain$tmp1107062685$8 = options) == null ? void 0 : $jscomp$optchain$tmp1107062685$8.attributionSrc) !== void 0 && (stringTag += ' attributionsrc="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.attributionSrc) + '"');
  var $jscomp$optchain$tmp1107062685$9;
  if (($jscomp$optchain$tmp1107062685$9 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$9.customElement) {
    stringTag += ' custom-element="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.customElement) + '"';
  }
  var $jscomp$optchain$tmp1107062685$10;
  if (($jscomp$optchain$tmp1107062685$10 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$10.defer) {
    stringTag += " defer";
  }
  var $jscomp$optchain$tmp1107062685$11;
  if (($jscomp$optchain$tmp1107062685$11 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$11.id) {
    stringTag += ' id="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.id) + '"';
  }
  var $jscomp$optchain$tmp1107062685$12;
  if (($jscomp$optchain$tmp1107062685$12 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$12.nonce) {
    stringTag += ' nonce="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.nonce) + '"';
  }
  var $jscomp$optchain$tmp1107062685$13;
  if (($jscomp$optchain$tmp1107062685$13 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$13.type) {
    stringTag += ' type="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.type) + '"';
  }
  var $jscomp$optchain$tmp1107062685$14;
  if (($jscomp$optchain$tmp1107062685$14 = options) == null ? 0 : $jscomp$optchain$tmp1107062685$14.crossorigin) {
    stringTag += ' crossorigin="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(options.crossorigin) + '"';
  }
  stringTag += ">\x3c/script>";
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(stringTag);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.scriptUrlToHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_scriptUrlToHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscapeToString(text) {
  var escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return escaped;
}
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_concatHtmls(htmls) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_builders_joinHtmls("", htmls);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.concatHtmls = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_concatHtmls;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_joinHtmls(separator, htmls) {
  var separatorHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscape(separator);
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(htmls.map(function(value) {
    return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscape(value));
  }).join((0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml)(separatorHtml).toString()));
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.joinHtmls = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_joinHtmls;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_doctypeHtml() {
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)("<!DOCTYPE html>");
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.doctypeHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_doctypeHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_nodeToHtmlInternal(node, temporaryRoot) {
  temporaryRoot.appendChild(node);
  var serializedNewTree = (new XMLSerializer()).serializeToString(temporaryRoot);
  serializedNewTree = serializedNewTree.slice(serializedNewTree.indexOf(">") + 1, serializedNewTree.lastIndexOf("</"));
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(serializedNewTree);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.nodeToHtmlInternal = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_nodeToHtmlInternal;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_nodeToHtml(node) {
  var tempRoot = document.createElement("span");
  return module$contents$google3$third_party$javascript$safevalues$builders$html_builders_nodeToHtmlInternal(node, tempRoot);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.nodeToHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_nodeToHtml;
var module$contents$google3$third_party$javascript$safevalues$builders$html_builders_VALID_TAG_OR_ATTRIBUTE_NAMES = /^[a-z][a-z\d-]*$/i, module$contents$google3$third_party$javascript$safevalues$builders$html_builders_DISALLOWED_TAG_NAMES = "APPLET BASE EMBED IFRAME LINK MATH META OBJECT SCRIPT STYLE SVG TEMPLATE".split(" ");
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.VOID_TAG_NAMES = "AREA BR COL COMMAND HR IMG INPUT KEYGEN PARAM SOURCE TRACK WBR".split(" ");
var module$contents$google3$third_party$javascript$safevalues$builders$html_builders_URL_ATTRIBUTES = ["action", "formaction", "href"];
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_verifyTagName(tagName) {
  if (!module$contents$google3$third_party$javascript$safevalues$builders$html_builders_VALID_TAG_OR_ATTRIBUTE_NAMES.test(tagName)) {
    throw Error(goog.DEBUG ? "Invalid tag name <" + tagName + ">." : "");
  }
  if (module$contents$google3$third_party$javascript$safevalues$builders$html_builders_DISALLOWED_TAG_NAMES.indexOf(tagName.toUpperCase()) !== -1) {
    throw Error(goog.DEBUG ? "Tag name <" + tagName + "> is not allowed for createHtml." : "");
  }
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.verifyTagName = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_verifyTagName;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_isVoidTag(tagName) {
  return module$exports$google3$third_party$javascript$safevalues$builders$html_builders.VOID_TAG_NAMES.indexOf(tagName.toUpperCase()) !== -1;
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.isVoidTag = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_isVoidTag;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_createHtml(tagName, attributes, content) {
  module$contents$google3$third_party$javascript$safevalues$builders$html_builders_verifyTagName(tagName);
  var result = "<" + tagName;
  attributes && (result += module$contents$google3$third_party$javascript$safevalues$builders$html_builders_stringifyAttributes(tagName, attributes));
  Array.isArray(content) || (content = content === void 0 ? [] : [content]);
  if (module$contents$google3$third_party$javascript$safevalues$builders$html_builders_isVoidTag(tagName)) {
    if (goog.DEBUG && content.length > 0) {
      throw Error("Void tag <" + tagName + "> does not allow content.");
    }
    result += ">";
  } else {
    var html = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_concatHtmls(content.map(function(value) {
      return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.isHtml)(value) ? value : module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscape(String(value));
    }));
    result += ">" + html.toString() + "</" + tagName + ">";
  }
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(result);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.createHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_createHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_styleSheetToHtml(styleSheet, attributes) {
  var combinedAttributes = {};
  if (attributes) {
    for (var customAttrNames = Object.keys(attributes), i = 0; i < customAttrNames.length; i++) {
      var name = customAttrNames[i];
      if (name.toLowerCase() === "type") {
        throw Error(goog.DEBUG ? "Cannot override the 'type' attribute with value " + attributes[name] + "." : "");
      }
      combinedAttributes[name] = attributes[name];
    }
  }
  combinedAttributes.type = "text/css";
  var stringifiedAttributes = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_stringifyAttributes("style", combinedAttributes);
  Array.isArray(styleSheet) && (styleSheet = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_concatStyleSheets(styleSheet));
  var styleContent = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet(styleSheet);
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)("<style " + stringifiedAttributes + ">" + styleContent + "</style>");
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.styleSheetToHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_styleSheetToHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_builders_stringifyAttributes(tagName, attributes) {
  for (var result = "", attrNames = Object.keys(attributes), i = 0; i < attrNames.length; i++) {
    var name = attrNames[i], value = attributes[name];
    if (!module$contents$google3$third_party$javascript$safevalues$builders$html_builders_VALID_TAG_OR_ATTRIBUTE_NAMES.test(name)) {
      throw Error(goog.DEBUG ? 'Invalid attribute name "' + name + '".' : "");
    }
    if (value !== void 0 && value !== null) {
      var JSCompiler_temp_const = result, name$jscomp$0 = name, value$jscomp$0 = value;
      if (/^on./i.test(name$jscomp$0)) {
        throw Error(goog.DEBUG ? 'Attribute "' + name$jscomp$0 + " is forbidden. Inline event handlers can lead to XSS. Please use the 'addEventListener' API instead." : "");
      }
      module$contents$google3$third_party$javascript$safevalues$builders$html_builders_URL_ATTRIBUTES.indexOf(name$jscomp$0.toLowerCase()) !== -1 && (value$jscomp$0 = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl(value$jscomp$0) ? value$jscomp$0.toString() : module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeJavaScriptUrl(String(value$jscomp$0)) || "about:invalid#zClosurez");
      if (goog.DEBUG && !module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl(value$jscomp$0) && !(0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.isHtml)(value$jscomp$0) && typeof value$jscomp$0 !== "string" && typeof value$jscomp$0 !== "number") {
        throw Error("String or number value expected, got " + typeof value$jscomp$0 + " with value '" + value$jscomp$0 + "' given.");
      }
      var JSCompiler_inline_result = name$jscomp$0 + '="' + module$contents$google3$third_party$javascript$safevalues$builders$html_builders_htmlEscape(String(value$jscomp$0)) + '"';
      result = JSCompiler_temp_const + (" " + JSCompiler_inline_result);
    }
  }
  return result;
}
module$exports$google3$third_party$javascript$safevalues$builders$html_builders.stringifyAttributes = module$contents$google3$third_party$javascript$safevalues$builders$html_builders_stringifyAttributes;
var module$exports$google3$third_party$javascript$safevalues$builders$html_formatter = {HtmlFormatter:function() {
  this.replacements = new Map();
}};
module$exports$google3$third_party$javascript$safevalues$builders$html_formatter.HtmlFormatter.prototype.format = function(format) {
  var $jscomp$this$1018007701$5 = this, openedTags = [], marker = (0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape)("_safevalues_format_marker_:").toString(), html = (0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape)(format).toString().replace(new RegExp("\\{" + marker + "[\\w&#;]+\\}", "g"), function(match) {
    return $jscomp$this$1018007701$5.replaceFormattingString(openedTags, match);
  });
  if (openedTags.length !== 0) {
    if (goog.DEBUG) {
      throw Error("Expected no unclosed tags, got <" + openedTags.join(">, <") + ">.");
    }
    throw Error();
  }
  return (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(html);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_formatter.HtmlFormatter.prototype.replaceFormattingString = function(openedTags, match) {
  var replacement = this.replacements.get(match);
  if (!replacement) {
    return match;
  }
  var result = "";
  switch(replacement.type) {
    case "html":
      result = replacement.html;
      break;
    case "startTag":
      result = "<" + replacement.tagName + replacement.attributes + ">";
      goog.DEBUG && ((0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.isVoidTag)(replacement.tagName.toLowerCase()) || openedTags.push(replacement.tagName.toLowerCase()));
      break;
    case "endTag":
      result = "</" + replacement.tagName + ">";
      if (goog.DEBUG) {
        var lastTag = openedTags.pop();
        if (lastTag !== replacement.tagName.toLowerCase()) {
          throw Error("Expected </" + lastTag + ">, got </" + replacement.tagName + ">.");
        }
      }
      break;
    default:
      if (goog.DEBUG) {
        var value = replacement, msg = "type had an unknown value";
        msg = msg === void 0 ? "unexpected value " + value + "!" : msg;
        throw Error(msg);
      }
  }
  return result;
};
module$exports$google3$third_party$javascript$safevalues$builders$html_formatter.HtmlFormatter.prototype.text = function(text) {
  return this.storeReplacement({type:"html", html:(0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape)(text).toString()});
};
module$exports$google3$third_party$javascript$safevalues$builders$html_formatter.HtmlFormatter.prototype.storeReplacement = function(replacement) {
  var marker = "{_safevalues_format_marker_:" + this.replacements.size + "_" + Math.random().toString(36).slice(2) + "}";
  this.replacements.set((0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape)(marker).toString(), replacement);
  return marker;
};
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists = {};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists.CSS_PROPERTY_ALLOWLIST = new Set("accent-color align-content align-items align-self alignment-baseline all appearance aspect-ratio backdrop-filter backface-visibility background background-attachment background-blend-mode background-clip background-color background-image background-origin background-position background-position-x background-position-y background-repeat background-size block-size border border-block border-block-color border-block-end border-block-end-color border-block-end-style border-block-end-width border-block-start border-block-start-color border-block-start-style border-block-start-width border-block-style border-block-width border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-collapse border-color border-end-end-radius border-end-start-radius border-image border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-inline border-inline-color border-inline-end border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start border-inline-start-color border-inline-start-style border-inline-start-width border-inline-style border-inline-width border-left border-left-color border-left-style border-left-width border-radius border-right border-right-color border-right-style border-right-width border-spacing border-start-end-radius border-start-start-radius border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-shadow box-sizing caption-side caret-color clear clip clip-path clip-rule color color-interpolation color-interpolation-filters color-scheme column-count column-fill column-gap column-rule column-rule-color column-rule-style column-rule-width column-span column-width columns contain contain-intrinsic-block-size contain-intrinsic-height contain-intrinsic-inline-size contain-intrinsic-size contain-intrinsic-width content content-visibility counter-increment counter-reset counter-set cx cy d display dominant-baseline empty-cells field-sizing fill fill-opacity fill-rule filter flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float flood-color flood-opacity font font-family font-feature-settings font-kerning font-optical-sizing font-palette font-size font-size-adjust font-stretch font-style font-synthesis font-synthesis-small-caps font-synthesis-style font-synthesis-weight font-variant font-variant-alternates font-variant-caps font-variant-east-asian font-variant-emoji font-variant-ligatures font-variant-numeric font-variant-position font-variation-settings font-weight forced-color-adjust gap grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-gap grid-column-start grid-gap grid-row grid-row-end grid-row-gap grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows height hyphenate-character hyphenate-limit-chars hyphens image-orientation image-rendering inline-size inset inset-area inset-block inset-block-end inset-block-start inset-inline inset-inline-end inset-inline-start isolation justify-content justify-items justify-self left letter-spacing lighting-color line-break line-clamp line-gap-override line-height list-style list-style-image list-style-position list-style-type margin margin-block margin-block-end margin-block-start margin-bottom margin-inline margin-inline-end margin-inline-start margin-left margin-right margin-top marker marker-end marker-mid marker-start mask mask-clip mask-composite mask-image mask-mode mask-origin mask-position mask-repeat mask-size mask-type max-block-size max-height max-inline-size max-width min-block-size min-height min-inline-size min-width mix-blend-mode object-fit object-position object-view-box opacity order orphans outline outline-color outline-offset outline-style outline-width overflow overflow-anchor overflow-block overflow-clip-margin overflow-inline overflow-wrap overflow-x overflow-y padding padding-block padding-block-end padding-block-start padding-bottom padding-inline padding-inline-end padding-inline-start padding-left padding-right padding-top paint-order perspective perspective-origin place-content place-items place-self position quotes r resize right rotate row-gap ruby-align ruby-position rx ry scale shape-image-threshold shape-margin shape-outside shape-rendering stop-color stop-opacity stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width tab-size table-layout text-align text-align-last text-anchor text-autospace text-box-edge text-box-trim text-combine-upright text-decoration text-decoration-color text-decoration-line text-decoration-skip-ink text-decoration-style text-decoration-thickness text-emphasis text-emphasis-color text-emphasis-position text-emphasis-style text-indent text-orientation text-overflow text-rendering text-shadow text-size-adjust text-spacing text-spacing-trim text-transform text-underline-offset text-underline-position text-wrap top transform transform-box transform-origin transform-style translate unicode-bidi vector-effect vertical-align visibility white-space white-space-collapse widows width will-change word-break word-spacing word-wrap writing-mode x y z-index zoom animation animation-composition animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-range animation-range-end animation-range-start animation-timeline animation-timing-function offset offset-anchor offset-distance offset-path offset-position offset-rotate transition transition-behavior transition-delay transition-duration transition-property transition-timing-function".split(" "));
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists.CSS_FUNCTION_ALLOWLIST = new Set("alpha cubic-bezier linear-gradient matrix perspective radial-gradient rect repeating-linear-gradient repeating-radial-gradient rgb rgba rotate rotate3d rotatex rotatey rotatez scale scale3d scalex scaley scalez skew skewx skewy steps translate translate3d translatex translatey translatez url".split(" "));
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens = {CssTokenKind:{AT_KEYWORD:0, CDC:1, CDO:2, CLOSE_CURLY:3, CLOSE_PAREN:4, CLOSE_SQUARE:5, COLON:6, COMMA:7, DELIM:8, DIMENSION:9, EOF:10, FUNCTION:11, HASH:12, IDENT:13, NUMBER:14, OPEN_CURLY:15, OPEN_PAREN:16, OPEN_SQUARE:17, PERCENTAGE:18, SEMICOLON:19, STRING:20, WHITESPACE:21}};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.AT_KEYWORD] = "AT_KEYWORD";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CDC] = "CDC";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CDO] = "CDO";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_CURLY] = "CLOSE_CURLY";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_PAREN] = "CLOSE_PAREN";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_SQUARE] = "CLOSE_SQUARE";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COLON] = "COLON";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COMMA] = "COMMA";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM] = "DELIM";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DIMENSION] = "DIMENSION";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.EOF] = "EOF";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION] = "FUNCTION";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.HASH] = "HASH";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.IDENT] = "IDENT";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.NUMBER] = "NUMBER";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_CURLY] = "OPEN_CURLY";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_PAREN] = "OPEN_PAREN";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_SQUARE] = "OPEN_SQUARE";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.PERCENTAGE] = "PERCENTAGE";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.SEMICOLON] = "SEMICOLON";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.STRING] = "STRING";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.WHITESPACE] = "WHITESPACE";
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_AtKeywordToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.AtKeywordToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_AtKeywordToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CdcToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CdcToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CdcToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CdoToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CdoToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CdoToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CloseCurlyToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CloseCurlyToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CloseCurlyToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CloseParenToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CloseParenToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CloseParenToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CloseSquareToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CloseSquareToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CloseSquareToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_ColonToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.ColonToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_ColonToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CommaToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CommaToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_CommaToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_DelimToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.DelimToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_DelimToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_DimensionToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.DimensionToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_DimensionToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_EofToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.EofToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_EofToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_FunctionToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.FunctionToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_FunctionToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_HashToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.HashToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_HashToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_IdentToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.IdentToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_IdentToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_NumberToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.NumberToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_NumberToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_OpenCurlyToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.OpenCurlyToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_OpenCurlyToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_OpenParenToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.OpenParenToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_OpenParenToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_OpenSquareToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.OpenSquareToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_OpenSquareToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_PercentageToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.PercentageToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_PercentageToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_SemicolonToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.SemicolonToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_SemicolonToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_StringToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.StringToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_StringToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_WhitespaceToken() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.WhitespaceToken = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens_WhitespaceToken;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeCodePoint(c) {
  return "\\" + c.codePointAt(0).toString(16) + " ";
}
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeString(str) {
  return '"' + str.replace(/[^A-Za-z0-9_/. :,?=%;-]/g, function(c) {
    return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeCodePoint(c);
  }) + '"';
}
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(ident) {
  var firstChar = /^[^A-Za-z_]/.test(ident) ? module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeCodePoint(ident[0]) : ident[0];
  return firstChar + ident.slice(1).replace(/[^A-Za-z0-9_-]/g, function(c) {
    return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeCodePoint(c);
  });
}
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_serializeToken(token) {
  switch(token.tokenKind) {
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.AT_KEYWORD:
      return "@" + module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(token.name);
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CDC:
      return "--\x3e";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CDO:
      return "\x3c!--";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_CURLY:
      return "}";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_PAREN:
      return ")";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_SQUARE:
      return "]";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COLON:
      return ":";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COMMA:
      return ",";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM:
      return token.codePoint === "\\" ? "\\\n" : token.codePoint;
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DIMENSION:
      return token.repr + module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(token.dimension);
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.EOF:
      return "";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION:
      return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(token.lowercaseName) + "(";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.HASH:
      return "#" + module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(token.value);
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.IDENT:
      return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(token.ident);
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.NUMBER:
      return token.repr;
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_CURLY:
      return "{";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_PAREN:
      return "(";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_SQUARE:
      return "[";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.PERCENTAGE:
      return token.repr + "%";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.SEMICOLON:
      return ";";
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.STRING:
      return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeString(token.value);
    case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.WHITESPACE:
      return " ";
    default:
      var value = token, msg = void 0;
      msg = msg === void 0 ? "unexpected value " + value + "!" : msg;
      throw Error(msg);
  }
}
;var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_HEX_DIGIT_REGEX = /^[0-9a-fA-F]$/, module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer = function(css) {
  this.pos = 0;
  this.css = this.preprocess(css);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.tokenize = function() {
  for (var tokens = [], lastToken = void 0;;) {
    var token = this.consumeToken();
    if (Array.isArray(token)) {
      tokens.push.apply(tokens, (0,$jscomp.arrayFromIterable)(token));
    } else {
      var $jscomp$optchain$tmpm282935782$0 = void 0, twoConsecutiveWhitespace = token.tokenKind === module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.WHITESPACE && (($jscomp$optchain$tmpm282935782$0 = lastToken) == null ? void 0 : $jscomp$optchain$tmpm282935782$0.tokenKind) === module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.WHITESPACE;
      if (!twoConsecutiveWhitespace) {
        tokens.push(token);
        if (token.tokenKind === module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.EOF) {
          return tokens;
        }
        lastToken = token;
      }
    }
  }
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.nextInputCodePoint = function() {
  return this.css[this.pos];
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.nextTwoInputCodePoints = function() {
  return [this.css[this.pos], this.css[this.pos + 1]];
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.nextThreeInputCodePoints = function() {
  return [this.css[this.pos], this.css[this.pos + 1], this.css[this.pos + 2]];
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.currentInputCodePoint = function() {
  return this.css[this.pos - 1];
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.nextNInputCodePoints = function(n) {
  return this.css.slice(this.pos, this.pos + n);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeTheNextInputCodePoint = function() {
  this.pos++;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeNInputCodePoints = function(n) {
  this.pos += n;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.reconsumeTheCurrentInputCodePoint = function() {
  this.pos--;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.preprocess = function(css) {
  return css.replace(/[\x0d\x0c]|\x0d\x0a/g, "\n").replace(/\x00/g, "\ufffd");
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeToken = function() {
  var consumedComment = this.consumeComments();
  if (consumedComment) {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.WHITESPACE};
  }
  var codePoint = this.nextInputCodePoint();
  this.consumeTheNextInputCodePoint();
  if (codePoint === void 0) {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.EOF};
  }
  if (this.isWhitespace(codePoint)) {
    return this.consumeAsMuchWhitespaceAsPossible(), {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.WHITESPACE};
  }
  if (codePoint === "'" || codePoint === '"') {
    return this.consumeString(codePoint);
  }
  if (codePoint === "#") {
    return this.isIdentCodePoint(this.nextInputCodePoint()) || this.twoCodePointsAreValidEscape.apply(this, (0,$jscomp.arrayFromIterable)(this.nextTwoInputCodePoints())) ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.HASH, value:this.consumeIdentSequence()} : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:"#"};
  }
  if (codePoint === "(") {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_PAREN};
  }
  if (codePoint === ")") {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_PAREN};
  }
  if (codePoint === "+") {
    return this.streamStartsWithANumber() ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeNumericToken()) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:"+"};
  }
  if (codePoint === ",") {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COMMA};
  }
  if (codePoint === "-") {
    return this.streamStartsWithANumber() ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeNumericToken()) : this.nextNInputCodePoints(2) === "->" ? (this.consumeNInputCodePoints(2), {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CDC}) : this.streamStartsWithAnIdentSequence() ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeIdentLikeToken()) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, 
    codePoint:"-"};
  }
  if (codePoint === ".") {
    return this.streamStartsWithANumber() ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeNumericToken()) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:"."};
  }
  if (codePoint === ":") {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COLON};
  }
  if (codePoint === ";") {
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.SEMICOLON};
  }
  if (codePoint === "<") {
    return this.nextNInputCodePoints(3) === "!--" ? (this.consumeNInputCodePoints(3), {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CDO}) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:"<"};
  }
  if (codePoint === "@") {
    if (this.threeCodePointsWouldStartAnIdentSequence.apply(this, (0,$jscomp.arrayFromIterable)(this.nextThreeInputCodePoints()))) {
      var ident = this.consumeIdentSequence();
      return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.AT_KEYWORD, name:ident};
    }
    return {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:"@"};
  }
  return codePoint === "\\" ? this.streamStartsWithValidEscape() ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeIdentLikeToken()) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:"\\"} : codePoint === "[" ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_SQUARE} : codePoint === "]" ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_SQUARE} : 
  codePoint === "{" ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.OPEN_CURLY} : codePoint === "}" ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_CURLY} : this.isDigit(codePoint) ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeNumericToken()) : this.isIdentStartCodePoint(codePoint) ? (this.reconsumeTheCurrentInputCodePoint(), this.consumeIdentLikeToken()) : 
  {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DELIM, codePoint:codePoint};
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeComments = function() {
  for (var anyComments = !1; this.nextNInputCodePoints(2) === "/*";) {
    anyComments = !0;
    this.consumeNInputCodePoints(2);
    var endIndex = this.css.indexOf("*/", this.pos);
    if (endIndex === -1) {
      this.pos = this.css.length;
      break;
    }
    this.pos = endIndex + 2;
  }
  return anyComments;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeString = function(quote) {
  for (var stringToken = {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.STRING, value:""};;) {
    var codePoint = this.nextInputCodePoint();
    this.consumeTheNextInputCodePoint();
    if (codePoint === void 0 || codePoint === quote) {
      return stringToken;
    }
    if (this.isNewline(codePoint)) {
      return this.reconsumeTheCurrentInputCodePoint(), stringToken.value = "", stringToken;
    }
    if (codePoint === "\\") {
      if (this.nextInputCodePoint() !== void 0) {
        if (this.isNewline(this.nextInputCodePoint())) {
          this.consumeTheNextInputCodePoint();
        } else {
          var escapedCodePoint = this.consumeEscapedCodePoint();
          stringToken.value += escapedCodePoint;
        }
      }
    } else {
      stringToken.value += codePoint;
    }
  }
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeEscapedCodePoint = function() {
  var codePoint = this.nextInputCodePoint();
  this.consumeTheNextInputCodePoint();
  if (codePoint === void 0) {
    return "\ufffd";
  }
  if (this.isHexDigit(codePoint)) {
    for (var hexDigits = codePoint; this.isHexDigit(this.nextInputCodePoint()) && hexDigits.length < 6;) {
      hexDigits += this.nextInputCodePoint(), this.consumeTheNextInputCodePoint();
    }
    this.isWhitespace(this.nextInputCodePoint()) && this.consumeTheNextInputCodePoint();
    var num = parseInt(hexDigits, 16);
    return String.fromCodePoint(num);
  }
  return codePoint;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeAsMuchWhitespaceAsPossible = function() {
  for (; this.isWhitespace(this.nextInputCodePoint());) {
    this.consumeTheNextInputCodePoint();
  }
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeIdentSequence = function() {
  for (var result = "";;) {
    var codePoint = this.nextInputCodePoint();
    this.consumeTheNextInputCodePoint();
    var codePoint2 = this.nextInputCodePoint();
    if (this.isIdentCodePoint(codePoint)) {
      result += codePoint;
    } else if (this.twoCodePointsAreValidEscape(codePoint, codePoint2)) {
      result += this.consumeEscapedCodePoint();
    } else {
      return this.reconsumeTheCurrentInputCodePoint(), result;
    }
  }
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeIdentLikeToken = function() {
  var ident = this.consumeIdentSequence();
  if (/^url$/i.test(ident) && this.nextInputCodePoint() === "(") {
    for (this.consumeTheNextInputCodePoint(); this.nextTwoInputsPointsAreWhitespace();) {
      this.consumeTheNextInputCodePoint();
    }
    var nextTwo = this.nextTwoInputCodePoints();
    return this.isWhitespace(nextTwo[0]) && (nextTwo[1] === '"' || nextTwo[1] === "'") || nextTwo[0] === '"' || nextTwo[0] === "'" ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION, lowercaseName:"url"} : this.consumeUrlToken();
  }
  return this.nextInputCodePoint() === "(" ? (this.consumeTheNextInputCodePoint(), {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION, lowercaseName:ident.toLowerCase()}) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.IDENT, ident:ident};
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeUrlToken = function() {
  var url = "";
  for (this.consumeAsMuchWhitespaceAsPossible();;) {
    var codePoint = this.nextInputCodePoint();
    this.consumeTheNextInputCodePoint();
    if (codePoint === ")" || codePoint === void 0) {
      return this.createFunctionUrlToken(url);
    }
    if (this.isWhitespace(codePoint)) {
      this.consumeAsMuchWhitespaceAsPossible();
      if (this.nextInputCodePoint() === ")" || this.nextInputCodePoint() === void 0) {
        return this.consumeTheNextInputCodePoint(), this.createFunctionUrlToken(url);
      }
      this.consumeRemnantsOfBadUrl();
      return this.createFunctionUrlToken("");
    }
    if (codePoint === '"' || codePoint === "'" || codePoint === "(" || this.isNonPrintableCodePoint(codePoint)) {
      return this.consumeRemnantsOfBadUrl(), this.createFunctionUrlToken("");
    }
    if (codePoint === "\\") {
      if (this.streamStartsWithValidEscape()) {
        url += this.consumeEscapedCodePoint();
      } else {
        return this.consumeRemnantsOfBadUrl(), this.createFunctionUrlToken("");
      }
    } else {
      url += codePoint;
    }
  }
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.createFunctionUrlToken = function(url) {
  return [{tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION, lowercaseName:"url"}, {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.STRING, value:url}, {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.CLOSE_PAREN}];
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeRemnantsOfBadUrl = function() {
  for (;;) {
    var codePoint = this.nextInputCodePoint();
    this.consumeTheNextInputCodePoint();
    if (codePoint === void 0 || codePoint === ")") {
      break;
    } else {
      this.streamStartsWithValidEscape() && this.consumeEscapedCodePoint();
    }
  }
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeNumber = function() {
  var repr = "", next = this.nextInputCodePoint();
  if (next === "+" || next === "-") {
    this.consumeTheNextInputCodePoint(), repr += next;
  }
  repr += this.consumeDigits();
  var next$jscomp$0 = this.nextInputCodePoint(), next2 = this.css[this.pos + 1];
  next$jscomp$0 === "." && this.isDigit(next2) && (this.consumeTheNextInputCodePoint(), repr += "." + this.consumeDigits());
  var next$jscomp$1 = this.nextInputCodePoint(), next2$jscomp$0 = this.css[this.pos + 1], next3 = this.css[this.pos + 2];
  if (next$jscomp$1 === "e" || next$jscomp$1 === "E") {
    next2$jscomp$0 !== "+" && next2$jscomp$0 !== "-" || !this.isDigit(next3) ? this.isDigit(next2$jscomp$0) && (this.consumeTheNextInputCodePoint(), repr += next$jscomp$1 + this.consumeDigits()) : (this.consumeNInputCodePoints(2), repr += next$jscomp$1 + next2$jscomp$0 + this.consumeDigits());
  }
  return repr;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeDigits = function() {
  for (var repr = ""; this.isDigit(this.nextInputCodePoint());) {
    repr += this.nextInputCodePoint(), this.consumeTheNextInputCodePoint();
  }
  return repr;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.consumeNumericToken = function() {
  var repr = this.consumeNumber();
  return this.threeCodePointsWouldStartAnIdentSequence.apply(this, (0,$jscomp.arrayFromIterable)(this.nextThreeInputCodePoints())) ? {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.DIMENSION, repr:repr, dimension:this.consumeIdentSequence()} : this.nextInputCodePoint() === "%" ? (this.consumeTheNextInputCodePoint(), {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.PERCENTAGE, 
  repr:repr}) : {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.NUMBER, repr:repr};
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.nextTwoInputsPointsAreWhitespace = function() {
  var $jscomp$this$m282935782$26 = this;
  return this.nextTwoInputCodePoints().every(function(c) {
    return $jscomp$this$m282935782$26.isWhitespace(c);
  });
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.twoCodePointsAreValidEscape = function(codePoint1, codePoint2) {
  return codePoint1 === "\\" && codePoint2 !== "\n";
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.streamStartsWithValidEscape = function() {
  return this.twoCodePointsAreValidEscape(this.currentInputCodePoint(), this.nextInputCodePoint());
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.threeCodePointsWouldStartANumber = function(codePoint1, codePoint2, codePoint3) {
  return codePoint1 === "+" || codePoint1 === "-" ? this.isDigit(codePoint2) || codePoint2 === "." && this.isDigit(codePoint3) : codePoint1 === "." ? this.isDigit(codePoint2) : this.isDigit(codePoint1);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.streamStartsWithANumber = function() {
  return this.threeCodePointsWouldStartANumber.apply(this, [this.currentInputCodePoint()].concat((0,$jscomp.arrayFromIterable)(this.nextTwoInputCodePoints())));
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.threeCodePointsWouldStartAnIdentSequence = function(codePoint1, codePoint2, codePoint3) {
  return codePoint1 === "-" ? this.isIdentStartCodePoint(codePoint2) || codePoint2 === "-" ? !0 : this.twoCodePointsAreValidEscape(codePoint2, codePoint3) ? !0 : !1 : this.isIdentStartCodePoint(codePoint1) ? !0 : codePoint1 === "\\" ? this.twoCodePointsAreValidEscape(codePoint1, codePoint2) : !1;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.streamStartsWithAnIdentSequence = function() {
  return this.threeCodePointsWouldStartAnIdentSequence.apply(this, [this.currentInputCodePoint()].concat((0,$jscomp.arrayFromIterable)(this.nextTwoInputCodePoints())));
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isDigit = function(codePoint) {
  return codePoint !== void 0 && codePoint >= "0" && codePoint <= "9";
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isHexDigit = function(codePoint) {
  return codePoint !== void 0 && module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_HEX_DIGIT_REGEX.test(codePoint);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isNewline = function(codePoint) {
  return codePoint === "\n";
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isWhitespace = function(codePoint) {
  return codePoint === " " || codePoint === "\t" || this.isNewline(codePoint);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isIdentCodePoint = function(codePoint) {
  return codePoint === void 0 ? !1 : /^([A-Za-z0-9_-]|[^\u0000-\u007f])$/.test(codePoint);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isIdentStartCodePoint = function(codePoint) {
  return codePoint === void 0 ? !1 : /^([A-Za-z_]|[^\u0000-\u007f])$/.test(codePoint);
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer.prototype.isNonPrintableCodePoint = function(codePoint) {
  return codePoint === void 0 ? !1 : /[\x00-\x08\x0b\x0e-\x1f\x7f]/.test(codePoint);
};
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy = {ResourceUrlPolicyHintsType:{STYLE_ELEMENT:0, STYLE_ATTRIBUTE:1, HTML_ATTRIBUTE:2}};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.STYLE_ELEMENT] = "STYLE_ELEMENT";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.STYLE_ATTRIBUTE] = "STYLE_ATTRIBUTE";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.HTML_ATTRIBUTE] = "HTML_ATTRIBUTE";
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy_parseUrl(value) {
  try {
    return new URL(value, window.document.baseURI);
  } catch (e) {
    return new URL("about:invalid");
  }
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.parseUrl = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy_parseUrl;
var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer = function(propertyAllowlist, functionAllowlist, resourceUrlPolicy, allowKeyframes, propertyDiscarders) {
  this.propertyAllowlist = propertyAllowlist;
  this.functionAllowlist = functionAllowlist;
  this.resourceUrlPolicy = resourceUrlPolicy;
  this.allowKeyframes = allowKeyframes;
  this.propertyDiscarders = propertyDiscarders;
  this.inertDocument = document.implementation.createHTMLDocument();
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.getStyleSheet = function(cssText) {
  var styleEl = this.inertDocument.createElement("style"), safeStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_createStyleSheetInternal(cssText);
  module$contents$google3$third_party$javascript$safevalues$dom$elements$style_setStyleTextContent(styleEl, safeStyleSheet);
  this.inertDocument.head.appendChild(styleEl);
  var sheet = styleEl.sheet;
  styleEl.remove();
  return sheet;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.getStyleDeclaration = function(cssText) {
  var div = this.inertDocument.createElement("div");
  div.style.cssText = cssText;
  this.inertDocument.body.appendChild(div);
  var style = div.style;
  div.remove();
  return style;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.hasShadowDomEscapingTokens = function(token, nextToken) {
  return token.tokenKind !== module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.COLON ? !1 : nextToken.tokenKind === module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.IDENT && nextToken.ident.toLowerCase() === "host" || nextToken.tokenKind === module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION && (nextToken.lowercaseName === "host" || 
  nextToken.lowercaseName === "host-context") ? !0 : !1;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeSelector = function(selector) {
  for (var tokens = (new module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer(selector)).tokenize(), i = 0; i < tokens.length - 1; i++) {
    var token = tokens[i], nextToken = tokens[i + 1];
    if (this.hasShadowDomEscapingTokens(token, nextToken)) {
      return null;
    }
  }
  return tokens.map(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_serializeToken).join("");
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeValue = function(propertyName, value, calledFromStyleElement) {
  for (var tokens = (new module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokenizer_Tokenizer(value)).tokenize(), i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.tokenKind === module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.FUNCTION) {
      if (!this.functionAllowlist.has(token.lowercaseName)) {
        return null;
      }
      if (token.lowercaseName === "url") {
        var nextToken = tokens[i + 1], $jscomp$optchain$tmpm1577590584$0 = void 0;
        if ((($jscomp$optchain$tmpm1577590584$0 = nextToken) == null ? void 0 : $jscomp$optchain$tmpm1577590584$0.tokenKind) !== module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.STRING) {
          return null;
        }
        var url = nextToken.value, parsedUrl = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy_parseUrl(url);
        this.resourceUrlPolicy && (parsedUrl = this.resourceUrlPolicy(parsedUrl, {type:calledFromStyleElement ? module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.STYLE_ELEMENT : module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.STYLE_ATTRIBUTE, propertyName:propertyName}));
        if (!parsedUrl) {
          return null;
        }
        tokens[i + 1] = {tokenKind:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$tokens.CssTokenKind.STRING, value:parsedUrl.toString()};
        i++;
      }
    }
  }
  return tokens.map(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_serializeToken).join("");
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeKeyframeRule = function(rule) {
  var sanitizedProperties = this.sanitizeStyleDeclaration(rule.style, !0);
  return rule.keyText + " { " + sanitizedProperties + " }";
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeKeyframesRule = function(keyframesRule) {
  if (!this.allowKeyframes) {
    return null;
  }
  for (var keyframeRules = [], $jscomp$iter$4 = (0,$jscomp.makeIterator)(keyframesRule.cssRules), $jscomp$key$m1577590584$1$rule = $jscomp$iter$4.next(); !$jscomp$key$m1577590584$1$rule.done; $jscomp$key$m1577590584$1$rule = $jscomp$iter$4.next()) {
    var rule = $jscomp$key$m1577590584$1$rule.value;
    if (rule instanceof CSSKeyframeRule) {
      var sanitizedRule = this.sanitizeKeyframeRule(rule);
      sanitizedRule && keyframeRules.push(sanitizedRule);
    }
  }
  return "@keyframes " + module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(keyframesRule.name) + " { " + keyframeRules.join(" ") + " }";
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.isPropertyNameAllowed = function(name) {
  if (!this.propertyAllowlist.has(name)) {
    return !1;
  }
  for (var $jscomp$iter$5 = (0,$jscomp.makeIterator)(this.propertyDiscarders), $jscomp$key$m1577590584$2$discarder = $jscomp$iter$5.next(); !$jscomp$key$m1577590584$2$discarder.done; $jscomp$key$m1577590584$2$discarder = $jscomp$iter$5.next()) {
    var discarder = $jscomp$key$m1577590584$2$discarder.value;
    if (discarder(name)) {
      return !1;
    }
  }
  return !0;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeProperty = function(name, value, isImportant, calledFromStyleElement) {
  if (!this.isPropertyNameAllowed(name)) {
    return null;
  }
  var sanitizedValue = this.sanitizeValue(name, value, calledFromStyleElement);
  return sanitizedValue ? module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$serializer_escapeIdent(name) + ": " + sanitizedValue + (isImportant ? " !important" : "") : null;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeStyleDeclaration = function(style, calledFromStyleElement) {
  for (var sortedPropertyNames = [].concat((0,$jscomp.arrayFromIterable)(style)).sort(), sanitizedProperties = "", $jscomp$iter$6 = (0,$jscomp.makeIterator)(sortedPropertyNames), $jscomp$key$m1577590584$3$name = $jscomp$iter$6.next(); !$jscomp$key$m1577590584$3$name.done; $jscomp$key$m1577590584$3$name = $jscomp$iter$6.next()) {
    var name = $jscomp$key$m1577590584$3$name.value, value = style.getPropertyValue(name), isImportant = style.getPropertyPriority(name) === "important", sanitizedProperty = this.sanitizeProperty(name, value, isImportant, calledFromStyleElement);
    sanitizedProperty && (sanitizedProperties += sanitizedProperty + ";");
  }
  return sanitizedProperties;
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeStyleRule = function(rule) {
  var selector = this.sanitizeSelector(rule.selectorText);
  if (!selector) {
    return null;
  }
  var sanitizedProperties = this.sanitizeStyleDeclaration(rule.style, !0);
  return selector + " { " + sanitizedProperties + " }";
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeStyleElement = function(cssText) {
  for (var styleSheet = this.getStyleSheet(cssText), rules = styleSheet.cssRules, output = [], $jscomp$iter$7 = (0,$jscomp.makeIterator)(rules), $jscomp$key$m1577590584$4$rule = $jscomp$iter$7.next(); !$jscomp$key$m1577590584$4$rule.done; $jscomp$key$m1577590584$4$rule = $jscomp$iter$7.next()) {
    var rule = $jscomp$key$m1577590584$4$rule.value;
    if (rule instanceof CSSStyleRule) {
      var sanitizedRule = this.sanitizeStyleRule(rule);
      sanitizedRule && output.push(sanitizedRule);
    } else if (rule instanceof CSSKeyframesRule) {
      var sanitizedRule$jscomp$0 = this.sanitizeKeyframesRule(rule);
      sanitizedRule$jscomp$0 && output.push(sanitizedRule$jscomp$0);
    }
  }
  return output.join("\n");
};
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer.prototype.sanitizeStyleAttribute = function(cssText) {
  var styleDeclaration = this.getStyleDeclaration(cssText);
  return this.sanitizeStyleDeclaration(styleDeclaration, !1);
};
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$css_isolation = {CSS_ISOLATION_PROPERTIES:"display:inline-block;clip-path:inset(0);overflow:hidden;vertical-align:top;text-decoration:inherit"};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$css_isolation.CSS_ISOLATION_STYLESHEET = ":host{" + module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$css_isolation.CSS_ISOLATION_PROPERTIES + "}";
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$inert_fragment_createInertFragment(dirtyHtml, inertDocument) {
  if (goog.DEBUG && inertDocument.defaultView) {
    throw Error("createInertFragment called with non-inert document");
  }
  var range = inertDocument.createRange();
  range.selectNode(inertDocument.body);
  var temporarySafeHtml = (0,module$exports$google3$third_party$javascript$safevalues$internals$html_impl.createHtmlInternal)(dirtyHtml);
  return module$contents$google3$third_party$javascript$safevalues$dom$globals$range_rangeCreateContextualFragment(range, temporarySafeHtml);
}
;function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$no_clobber_getNodeName(node) {
  var nodeName = node.nodeName;
  return typeof nodeName === "string" ? nodeName : "FORM";
}
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$no_clobber_isElement(node) {
  var nodeType = node.nodeType;
  return nodeType === 1 || typeof nodeType !== "number";
}
;var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table = {SanitizerTable:function(allowedElements, elementPolicies, allowedGlobalAttributes, globalAttributePolicies, globallyAllowedAttributePrefixes) {
  this.allowedElements = allowedElements;
  this.elementPolicies = elementPolicies;
  this.allowedGlobalAttributes = allowedGlobalAttributes;
  this.globalAttributePolicies = globalAttributePolicies;
  this.globallyAllowedAttributePrefixes = globallyAllowedAttributePrefixes;
}};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.SanitizerTable.prototype.isAllowedElement = function(elementName) {
  return elementName !== "FORM" && (this.allowedElements.has(elementName) || this.elementPolicies.has(elementName));
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.SanitizerTable.prototype.getAttributePolicy = function(attributeName, elementName) {
  var elementPolicy = this.elementPolicies.get(elementName), $jscomp$optchain$tmp2000943940$0;
  if (($jscomp$optchain$tmp2000943940$0 = elementPolicy) == null ? 0 : $jscomp$optchain$tmp2000943940$0.has(attributeName)) {
    return elementPolicy.get(attributeName);
  }
  if (this.allowedGlobalAttributes.has(attributeName)) {
    return {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP};
  }
  var globalPolicy = this.globalAttributePolicies.get(attributeName);
  return globalPolicy ? globalPolicy : this.globallyAllowedAttributePrefixes && [].concat((0,$jscomp.arrayFromIterable)(this.globallyAllowedAttributePrefixes)).some(function(prefix) {
    return attributeName.indexOf(prefix) === 0;
  }) ? {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP} : {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.DROP};
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction = {DROP:0, KEEP:1, KEEP_AND_SANITIZE_URL:2, KEEP_AND_NORMALIZE:3, KEEP_AND_SANITIZE_STYLE:4, KEEP_AND_USE_RESOURCE_URL_POLICY:5, KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET:6};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.DROP] = "DROP";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP] = "KEEP";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_URL] = "KEEP_AND_SANITIZE_URL";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_NORMALIZE] = "KEEP_AND_NORMALIZE";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_STYLE] = "KEEP_AND_SANITIZE_STYLE";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY] = "KEEP_AND_USE_RESOURCE_URL_POLICY";
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction[module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET] = "KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET";
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table_AttributePolicy() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicy = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table_AttributePolicy;
var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table_FORBIDDEN_CUSTOM_ELEMENT_NAMES = new Set("ANNOTATION-XML COLOR-PROFILE FONT-FACE FONT-FACE-SRC FONT-FACE-URI FONT-FACE-FORMAT FONT-FACE-NAME MISSING-GLYPH".split(" "));
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table_isCustomElement(tag) {
  return !module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table_FORBIDDEN_CUSTOM_ELEMENT_NAMES.has(tag.toUpperCase()) && /^[a-z][-_.a-z0-9]*-[-_.a-z0-9]*$/i.test(tag);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.isCustomElement = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table_isCustomElement;
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table = {}, module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_ELEMENTS = "ARTICLE SECTION NAV ASIDE H1 H2 H3 H4 H5 H6 HEADER FOOTER ADDRESS P HR PRE BLOCKQUOTE OL UL LH LI DL DT DD FIGURE FIGCAPTION MAIN DIV EM STRONG SMALL S CITE Q DFN ABBR RUBY RB RT RTC RP DATA TIME CODE VAR SAMP KBD SUB SUP I B U MARK BDI BDO SPAN BR WBR NOBR INS DEL PICTURE PARAM TRACK MAP TABLE CAPTION COLGROUP COL TBODY THEAD TFOOT TR TD TH SELECT DATALIST OPTGROUP OPTION OUTPUT PROGRESS METER FIELDSET LEGEND DETAILS SUMMARY MENU DIALOG SLOT CANVAS FONT CENTER ACRONYM BASEFONT BIG DIR HGROUP STRIKE TT".split(" "), 
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ELEMENT_POLICIES = [["A", new Map([["href", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_URL}]])], ["AREA", new Map([["href", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_URL}]])], 
["LINK", new Map([["href", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY, conditions:new Map([["rel", new Set("alternate author bookmark canonical cite help icon license next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" "))]])}]])], ["SOURCE", new Map([["src", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY}], 
["srcset", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET}]])], ["IMG", new Map([["src", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY}], ["srcset", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET}]])], 
["VIDEO", new Map([["src", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY}]])], ["AUDIO", new Map([["src", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY}]])]], module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_GLOBAL_ATTRIBUTES = 
"title aria-atomic aria-autocomplete aria-busy aria-checked aria-current aria-disabled aria-dropeffect aria-expanded aria-haspopup aria-hidden aria-invalid aria-label aria-level aria-live aria-multiline aria-multiselectable aria-orientation aria-posinset aria-pressed aria-readonly aria-relevant aria-required aria-selected aria-setsize aria-sort aria-valuemax aria-valuemin aria-valuenow aria-valuetext alt align autocapitalize autocomplete autocorrect autofocus autoplay bgcolor border cellpadding cellspacing checked cite color cols colspan controls controlslist coords crossorigin datetime disabled download draggable enctype face formenctype frameborder height hreflang hidden inert ismap label lang loop max maxlength media minlength min multiple muted nonce open playsinline placeholder poster preload rel required reversed role rows rowspan selected shape size sizes slot span spellcheck start step summary translate type usemap valign value width wrap itemscope itemtype itemid itemprop itemref".split(" "), 
module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_GLOBAL_ATTRIBUTE_POLICIES = [["dir", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_NORMALIZE, conditions:module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new Map([["dir", new Set(["auto", "ltr", "rtl"])]]);
})}], ["async", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_NORMALIZE, conditions:module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new Map([["async", new Set(["async"])]]);
})}], ["loading", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_NORMALIZE, conditions:module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new Map([["loading", new Set(["eager", "lazy"])]]);
})}], ["target", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_NORMALIZE, conditions:module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new Map([["target", new Set(["_self", "_blank"])]]);
})}]];
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.DEFAULT_SANITIZER_TABLE = new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.SanitizerTable(new Set(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_ELEMENTS), new Map(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ELEMENT_POLICIES), 
new Set(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_GLOBAL_ATTRIBUTES), new Map(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_GLOBAL_ATTRIBUTE_POLICIES), void 0);
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.LENIENT_SANITIZER_TABLE = new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.SanitizerTable(new Set(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_ELEMENTS.concat(["BUTTON", "INPUT"])), new Map(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ELEMENT_POLICIES), 
new Set(module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_GLOBAL_ATTRIBUTES.concat(["class", "id", "name"]);
})), new Map(module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_GLOBAL_ATTRIBUTE_POLICIES.concat([["style", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP}]]);
})), void 0);
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.SUPER_LENIENT_SANITIZER_TABLE = new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.SanitizerTable(new Set(module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_ELEMENTS.concat("STYLE TITLE INPUT TEXTAREA BUTTON LABEL".split(" "));
})), new Map(module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ELEMENT_POLICIES), new Set(module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_ALLOWED_GLOBAL_ATTRIBUTES.concat(["class", "id", "tabindex", "contenteditable", "name"]);
})), new Map(module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table_GLOBAL_ATTRIBUTE_POLICIES.concat([["style", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP}]]);
})), new Set(["data-", "aria-"]));
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer = {};
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_HtmlSanitizer() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizer = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_HtmlSanitizer;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_CssSanitizer() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.CssSanitizer = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_CssSanitizer;
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl = function(sanitizerTable, token, styleElementSanitizer, styleAttributeSanitizer, resourceUrlPolicy, openShadow) {
  this.sanitizerTable = sanitizerTable;
  this.styleElementSanitizer = styleElementSanitizer;
  this.styleAttributeSanitizer = styleAttributeSanitizer;
  this.resourceUrlPolicy = resourceUrlPolicy;
  this.openShadow = openShadow;
  this.changes = [];
  module$contents$google3$third_party$javascript$safevalues$internals$secrets_ensureTokenIsValid(token);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitizeAssertUnchanged = function(html) {
  goog.DEBUG && (this.changes = []);
  var sanitizedHtml = this.sanitize(html);
  if (goog.DEBUG && this.changes.length !== 0) {
    throw Error('Unexpected change to HTML value as a result of sanitization. Input: "' + (html + '", sanitized output: "' + sanitizedHtml + '"\nList of changes:') + this.changes.join("\n"));
  }
  return sanitizedHtml;
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitize = function(html) {
  var inertDocument = document.implementation.createHTMLDocument("");
  return (0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.nodeToHtmlInternal)(this.sanitizeToFragmentInternal(html, inertDocument), inertDocument.body);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitizeToFragment = function(html) {
  var inertDocument = document.implementation.createHTMLDocument("");
  return this.styleElementSanitizer && this.styleAttributeSanitizer ? this.sanitizeWithCssToFragment(html, inertDocument) : this.sanitizeToFragmentInternal(html, inertDocument);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitizeWithCssToFragment = function(htmlWithCss, inertDocument) {
  var elem = document.createElement("safevalues-with-css"), mode = this.openShadow ? "open" : "closed", shadow = elem.attachShadow({mode:mode}), sanitized = this.sanitizeToFragmentInternal(htmlWithCss, inertDocument), internalStyle = document.createElement("style");
  internalStyle.textContent = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$css_isolation.CSS_ISOLATION_STYLESHEET;
  internalStyle.id = "safevalues-internal-style";
  shadow.appendChild(internalStyle);
  shadow.appendChild(sanitized);
  var fragment = inertDocument.createDocumentFragment();
  fragment.appendChild(elem);
  return fragment;
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitizeToFragmentInternal = function(html, inertDocument) {
  for (var $jscomp$this$m1085474118$13 = this, dirtyFragment = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$inert_fragment_createInertFragment(html, inertDocument), treeWalker = document.createTreeWalker(dirtyFragment, 5, function(n) {
    return $jscomp$this$m1085474118$13.nodeFilter(n);
  }), currentNode = treeWalker.nextNode(), sanitizedFragment = inertDocument.createDocumentFragment(), sanitizedParent = sanitizedFragment; currentNode !== null;) {
    var sanitizedNode = void 0;
    if (currentNode.nodeType === 3) {
      if (this.styleElementSanitizer && sanitizedParent.nodeName === "STYLE") {
        var sanitizedCss = this.styleElementSanitizer(currentNode.data);
        sanitizedNode = this.createTextNode(sanitizedCss);
      } else {
        sanitizedNode = this.sanitizeTextNode(currentNode);
      }
    } else if (module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$no_clobber_isElement(currentNode)) {
      sanitizedNode = this.sanitizeElementNode(currentNode, inertDocument);
    } else {
      var message = "";
      goog.DEBUG && (message = "Node is not of type text or element");
      throw Error(message);
    }
    sanitizedParent.appendChild(sanitizedNode);
    if (currentNode = treeWalker.firstChild()) {
      sanitizedParent = sanitizedNode;
    } else {
      for (; !(currentNode = treeWalker.nextSibling()) && (currentNode = treeWalker.parentNode());) {
        sanitizedParent = sanitizedParent.parentNode;
      }
    }
  }
  return sanitizedFragment;
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.createTextNode = function(text) {
  return document.createTextNode(text);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitizeTextNode = function(textNode) {
  return this.createTextNode(textNode.data);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.sanitizeElementNode = function(elementNode, inertDocument) {
  for (var elementName = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$no_clobber_getNodeName(elementNode), newNode = inertDocument.createElement(elementName), dirtyAttributes = elementNode.attributes, $jscomp$iter$9 = (0,$jscomp.makeIterator)(dirtyAttributes), $jscomp$key$m1085474118$34$ = $jscomp$iter$9.next(); !$jscomp$key$m1085474118$34$.done; $jscomp$key$m1085474118$34$ = $jscomp$iter$9.next()) {
    var $jscomp$destructuring$var11 = $jscomp$key$m1085474118$34$.value, $jscomp$destructuring$var12 = $jscomp$destructuring$var11, name = $jscomp$destructuring$var12.name, value = $jscomp$destructuring$var12.value, policy = this.sanitizerTable.getAttributePolicy(name, elementName);
    if (this.satisfiesAllConditions(policy.conditions, dirtyAttributes)) {
      switch(policy.policyAction) {
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP:
          module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, value);
          break;
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_URL:
          var sanitizedAttrUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_restrictivelySanitizeUrl(value);
          sanitizedAttrUrl !== value && this.recordChange("Url in attribute " + name + ' was modified during sanitization. Original url:"' + value + '" was sanitized to: "' + sanitizedAttrUrl + '"');
          module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, sanitizedAttrUrl);
          break;
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_NORMALIZE:
          module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, value.toLowerCase());
          break;
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_STYLE:
          if (this.styleAttributeSanitizer) {
            var sanitizedCss = this.styleAttributeSanitizer(value);
            module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, sanitizedCss);
          } else {
            module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, value);
          }
          break;
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY:
          if (this.resourceUrlPolicy) {
            var hints = {type:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.HTML_ATTRIBUTE, attributeName:name, elementName:elementName}, url = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy_parseUrl(value), sanitizedUrl = this.resourceUrlPolicy(url, hints);
            sanitizedUrl && module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, sanitizedUrl.toString());
          } else {
            module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, value);
          }
          break;
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_USE_RESOURCE_URL_POLICY_FOR_SRCSET:
          if (this.resourceUrlPolicy) {
            for (var hints$jscomp$0 = {type:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType.HTML_ATTRIBUTE, attributeName:name, elementName:elementName}, srcset = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_parseSrcset(value), sanitizedSrcset = {parts:[]}, $jscomp$iter$8 = (0,$jscomp.makeIterator)(srcset.parts), $jscomp$key$m1085474118$33$part = $jscomp$iter$8.next(); !$jscomp$key$m1085474118$33$part.done; $jscomp$key$m1085474118$33$part = 
            $jscomp$iter$8.next()) {
              var part = $jscomp$key$m1085474118$33$part.value, url$jscomp$0 = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy_parseUrl(part.url), sanitizedUrl$jscomp$0 = this.resourceUrlPolicy(url$jscomp$0, hints$jscomp$0);
              sanitizedUrl$jscomp$0 && sanitizedSrcset.parts.push({url:sanitizedUrl$jscomp$0.toString(), descriptor:part.descriptor});
            }
            module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_serializeSrcset(sanitizedSrcset));
          } else {
            module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(newNode, name, value);
          }
          break;
        case module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.DROP:
          this.recordChange("Attribute: " + name + " was dropped");
          break;
        default:
          if (goog.DEBUG) {
            var value$jscomp$0 = policy.policyAction, msg = "Unhandled AttributePolicyAction case";
            msg = msg === void 0 ? "unexpected value " + value$jscomp$0 + "!" : msg;
            throw Error(msg);
          }
      }
    } else {
      this.recordChange("Not all conditions satisfied for attribute: " + name + ".");
    }
  }
  return newNode;
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.nodeFilter = function(node) {
  if (node.nodeType === 3) {
    return 1;
  }
  if (!module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$no_clobber_isElement(node)) {
    return 2;
  }
  var nodeName = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$no_clobber_getNodeName(node);
  if (nodeName === null) {
    return this.recordChange("Node name was null for node: " + node), 2;
  }
  if (this.sanitizerTable.isAllowedElement(nodeName)) {
    return 1;
  }
  this.recordChange("Element: " + nodeName + " was dropped");
  return 2;
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.recordChange = function(errorMessage) {
  goog.DEBUG && this.changes.push(errorMessage);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl.prototype.satisfiesAllConditions = function(conditions, attrs) {
  if (!conditions) {
    return !0;
  }
  for (var $jscomp$iter$10 = (0,$jscomp.makeIterator)(conditions), $jscomp$key$m1085474118$35$ = $jscomp$iter$10.next(); !$jscomp$key$m1085474118$35$.done; $jscomp$key$m1085474118$35$ = $jscomp$iter$10.next()) {
    var $jscomp$destructuring$var13 = $jscomp$key$m1085474118$35$.value, $jscomp$destructuring$var14 = (0,$jscomp.makeIterator)($jscomp$destructuring$var13), attrName__tsickle_destructured_1 = $jscomp$destructuring$var14.next().value, expectedValues__tsickle_destructured_2 = $jscomp$destructuring$var14.next().value, attrName = attrName__tsickle_destructured_1, expectedValues = expectedValues__tsickle_destructured_2, $jscomp$optchain$tmpm1085474118$0 = void 0, value = ($jscomp$optchain$tmpm1085474118$0 = 
    attrs.getNamedItem(attrName)) == null ? void 0 : $jscomp$optchain$tmpm1085474118$0.value;
    if (value && !expectedValues.has(value)) {
      return !1;
    }
  }
  return !0;
};
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_setAttribute(el, name, value) {
  el.setAttribute(name, value);
}
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_Srcset() {
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.Srcset = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_Srcset;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_parseSrcset(srcset) {
  for (var parts = [], $jscomp$iter$11 = (0,$jscomp.makeIterator)(srcset.split(",")), $jscomp$key$m1085474118$36$part = $jscomp$iter$11.next(); !$jscomp$key$m1085474118$36$part.done; $jscomp$key$m1085474118$36$part = $jscomp$iter$11.next()) {
    var part = $jscomp$key$m1085474118$36$part.value, $jscomp$destructuring$var15 = (0,$jscomp.makeIterator)(part.trim().split(/\s+/, 2)), url__tsickle_destructured_3 = $jscomp$destructuring$var15.next().value, descriptor__tsickle_destructured_4 = $jscomp$destructuring$var15.next().value, url = url__tsickle_destructured_3, descriptor = descriptor__tsickle_destructured_4;
    parts.push({url:url, descriptor:descriptor});
  }
  return {parts:parts};
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.parseSrcset = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_parseSrcset;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_serializeSrcset(srcset) {
  return srcset.parts.map(function(part) {
    var $jscomp$destructuring$var16 = part, url = $jscomp$destructuring$var16.url, descriptor = $jscomp$destructuring$var16.descriptor;
    return "" + url + (descriptor ? " " + descriptor : "");
  }).join(" , ");
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.serializeSrcset = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_serializeSrcset;
var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_defaultHtmlSanitizer = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.DEFAULT_SANITIZER_TABLE, module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken);
});
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtml(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_defaultHtmlSanitizer.sanitize(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.sanitizeHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlAssertUnchanged(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_defaultHtmlSanitizer.sanitizeAssertUnchanged(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.sanitizeHtmlAssertUnchanged = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlAssertUnchanged;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlToFragment(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_defaultHtmlSanitizer.sanitizeToFragment(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.sanitizeHtmlToFragment = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlToFragment;
var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientHtmlSanitizer = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.LENIENT_SANITIZER_TABLE, module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken);
});
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientlySanitizeHtml(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientHtmlSanitizer.sanitize(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.lenientlySanitizeHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientlySanitizeHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientlySanitizeHtmlAssertUnchanged(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientHtmlSanitizer.sanitizeAssertUnchanged(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.lenientlySanitizeHtmlAssertUnchanged = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientlySanitizeHtmlAssertUnchanged;
var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientHtmlSanitizer = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.SUPER_LENIENT_SANITIZER_TABLE, module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken);
});
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientlySanitizeHtml(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientHtmlSanitizer.sanitize(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.superLenientlySanitizeHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientlySanitizeHtml;
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientlySanitizeHtmlAssertUnchanged(html) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientHtmlSanitizer.sanitizeAssertUnchanged(html);
}
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.superLenientlySanitizeHtmlAssertUnchanged = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientlySanitizeHtmlAssertUnchanged;
var module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder = {BaseSanitizerBuilder:function() {
  this.calledBuild = !1;
  this.sanitizerTable = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$default_sanitizer_table.DEFAULT_SANITIZER_TABLE;
}, HtmlSanitizerBuilder:function() {
  module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.BaseSanitizerBuilder.apply(this, arguments);
}};
$jscomp.inherits(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.HtmlSanitizerBuilder, module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.BaseSanitizerBuilder);
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.HtmlSanitizerBuilder.prototype.build = function() {
  if (this.calledBuild) {
    throw Error("this sanitizer has already called build");
  }
  this.calledBuild = !0;
  return new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl(this.sanitizerTable, module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, void 0, void 0, this.resourceUrlPolicy);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder = function() {
  module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.BaseSanitizerBuilder.apply(this, arguments);
  this.openShadow = this.transitionsAllowed = this.animationsAllowed = !1;
};
$jscomp.inherits(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder, module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.BaseSanitizerBuilder);
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder.prototype.build = function() {
  var $jscomp$this$435282654$18 = this;
  this.extendSanitizerTableForCss();
  var propertyDiscarders = [];
  this.animationsAllowed || propertyDiscarders.push(function(property) {
    return /^(animation|offset)(-|$)/.test(property);
  });
  this.transitionsAllowed || propertyDiscarders.push(function(property) {
    return /^transition(-|$)/.test(property);
  });
  var styleElementSanitizer = function(cssText$jscomp$0) {
    var JSCompiler_inline_result, cssText = cssText$jscomp$0;
    return JSCompiler_inline_result = (new module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists.CSS_PROPERTY_ALLOWLIST, module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists.CSS_FUNCTION_ALLOWLIST, $jscomp$this$435282654$18.resourceUrlPolicy, $jscomp$this$435282654$18.animationsAllowed, propertyDiscarders)).sanitizeStyleElement(cssText);
  }, styleAttributeSanitizer = function(cssText$jscomp$0) {
    var JSCompiler_inline_result, cssText = cssText$jscomp$0;
    return JSCompiler_inline_result = (new module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$sanitizer_CssSanitizer(module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists.CSS_PROPERTY_ALLOWLIST, module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$css$allowlists.CSS_FUNCTION_ALLOWLIST, $jscomp$this$435282654$18.resourceUrlPolicy, !1, propertyDiscarders)).sanitizeStyleAttribute(cssText);
  };
  return new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer.HtmlSanitizerImpl(this.sanitizerTable, module$exports$google3$third_party$javascript$safevalues$internals$secrets.secretToken, styleElementSanitizer, styleAttributeSanitizer, this.resourceUrlPolicy, this.openShadow);
};
module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder.prototype.extendSanitizerTableForCss = function() {
  var allowedElements = new Set(this.sanitizerTable.allowedElements), allowedGlobalAttributes = new Set(this.sanitizerTable.allowedGlobalAttributes), globalAttributePolicies = new Map(this.sanitizerTable.globalAttributePolicies);
  allowedElements.add("STYLE");
  globalAttributePolicies.set("style", {policyAction:module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.AttributePolicyAction.KEEP_AND_SANITIZE_STYLE});
  allowedGlobalAttributes.add("id");
  allowedGlobalAttributes.add("name");
  allowedGlobalAttributes.add("class");
  this.sanitizerTable = new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$sanitizer_table$sanitizer_table.SanitizerTable(allowedElements, this.sanitizerTable.elementPolicies, allowedGlobalAttributes, globalAttributePolicies, this.sanitizerTable.globallyAllowedAttributePrefixes);
};
var module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$default_css_sanitizer_defaultCssSanitizer = module$contents$google3$third_party$javascript$safevalues$internals$pure_pure(function() {
  return (new module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder()).build();
});
function module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$default_css_sanitizer_sanitizeHtmlWithCss(css) {
  return module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$default_css_sanitizer_defaultCssSanitizer.sanitizeToFragment(css);
}
;function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_getUrlSegments(url) {
  var parts = url.split(/[?#]/), params = /[?]/.test(url) ? "?" + parts[1] : "", fragment = /[#]/.test(url) ? "#" + (params ? parts[2] : parts[1]) : "";
  return {urlPath:parts[0], params:params, fragment:fragment};
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_trustedResourceUrl(templateObj) {
  var rest = $jscomp.getRestArguments.apply(1, arguments);
  goog.DEBUG && module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, rest.length);
  if (rest.length === 0) {
    return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(templateObj[0]);
  }
  var base = templateObj[0].toLowerCase();
  if (goog.DEBUG) {
    if (/^data:/.test(base)) {
      throw Error("Data URLs cannot have expressions in the template literal input.");
    }
    if (/^https:\/\//.test(base) || /^\/\//.test(base)) {
      var originStart = base.indexOf("//") + 2, originEnd = base.indexOf("/", originStart);
      if (originEnd <= originStart) {
        throw Error("Can't interpolate data in a url's origin, Please make sure to fully specify the origin, terminated with '/'.");
      }
      var origin = base.substring(originStart, originEnd);
      if (!/^[0-9a-z.:-]+$/i.test(origin)) {
        throw Error("The origin contains unsupported characters.");
      }
      if (!/^[^:]*(:[0-9]+)?$/i.test(origin)) {
        throw Error("Invalid port number.");
      }
      if (!/(^|\.)[a-z][^.]*$/i.test(origin)) {
        throw Error("The top-level domain must start with a letter.");
      }
      var JSCompiler_inline_result = !0;
    } else {
      JSCompiler_inline_result = !1;
    }
    var JSCompiler_temp, JSCompiler_temp$jscomp$0;
    if (JSCompiler_temp$jscomp$0 = !JSCompiler_inline_result) {
      if (/^\//.test(base)) {
        if (base === "/" || base.length > 1 && base[1] !== "/" && base[1] !== "\\") {
          var JSCompiler_inline_result$jscomp$0 = !0;
        } else {
          throw Error("The path start in the url is invalid.");
        }
      } else {
        JSCompiler_inline_result$jscomp$0 = !1;
      }
      JSCompiler_temp$jscomp$0 = !JSCompiler_inline_result$jscomp$0;
    }
    if (JSCompiler_temp = JSCompiler_temp$jscomp$0 && !RegExp("^[^:\\s\\\\/]+/").test(base)) {
      if (/^about:blank/.test(base)) {
        if (base !== "about:blank" && !/^about:blank#/.test(base)) {
          throw Error("The about url is invalid.");
        }
        var JSCompiler_inline_result$jscomp$1 = !0;
      } else {
        JSCompiler_inline_result$jscomp$1 = !1;
      }
      JSCompiler_temp = !JSCompiler_inline_result$jscomp$1;
    }
    if (JSCompiler_temp) {
      throw Error("Trying to interpolate expressions in an unsupported url format.");
    }
  }
  for (var url = templateObj[0], i = 0; i < rest.length; i++) {
    url += encodeURIComponent(rest[i]) + templateObj[i + 1];
  }
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(url);
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_replaceParams(trustedUrl, params) {
  var urlSegments = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_getUrlSegments(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(trustedUrl).toString());
  return module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendParamsInternal(urlSegments.urlPath, "", urlSegments.fragment, params);
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendParams(trustedUrl, params) {
  var urlSegments = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_getUrlSegments(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(trustedUrl).toString());
  return module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendParamsInternal(urlSegments.urlPath, urlSegments.params, urlSegments.fragment, params);
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendParamsInternal(path, params, hash, newParams) {
  function addParam(value, key) {
    value != null && (Array.isArray(value) ? value.forEach(function(v) {
      return addParam(v, key);
    }) : (params += separator + encodeURIComponent(key) + "=" + encodeURIComponent(value), separator = "&"));
  }
  var separator = params.length ? "&" : "?";
  newParams.constructor === Object && (newParams = Object.entries(newParams));
  Array.isArray(newParams) ? newParams.forEach(function(pair) {
    return addParam(pair[1], pair[0]);
  }) : newParams.forEach(addParam);
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(path + params + hash);
}
var module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_BEFORE_FRAGMENT_REGEXP = /[^#]*/;
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_replaceFragment(trustedUrl, fragment) {
  var urlString = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(trustedUrl).toString();
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_BEFORE_FRAGMENT_REGEXP.exec(urlString)[0] + (fragment.trim() ? "#" + fragment : ""));
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendPathSegment(trustedUrl, pathSegment) {
  var urlSegments = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_getUrlSegments(module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(trustedUrl).toString()), separator = urlSegments.urlPath.slice(-1) === "/" ? "" : "/", newPath = urlSegments.urlPath + separator + encodeURIComponent(pathSegment);
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(newPath + urlSegments.params + urlSegments.fragment);
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_objectUrlFromScript(safeScript) {
  var scriptContent = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript(safeScript).toString(), blob = new Blob([scriptContent], {type:"text/javascript"});
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(URL.createObjectURL(blob));
}
function module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_toAbsoluteResourceUrl(pathRelativeUrl) {
  var originalUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl(pathRelativeUrl).toString(), qualifiedUrl = new URL(originalUrl, window.document.baseURI);
  return module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_createResourceUrlInternal(qualifiedUrl.toString());
}
;function module$contents$google3$third_party$javascript$safevalues$builders$script_builders_safeScript(templateObj) {
  var emptyArgs = $jscomp.getRestArguments.apply(1, arguments);
  if (goog.DEBUG) {
    if (emptyArgs.some(function(a) {
      return a !== "";
    })) {
      throw Error("safeScript only allows empty string expressions to enable inline comments.");
    }
    module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, emptyArgs.length);
  }
  return module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal(templateObj.join(""));
}
function module$contents$google3$third_party$javascript$safevalues$builders$script_builders_concatScripts(scripts) {
  return module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal(scripts.map(module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript).join(""));
}
function module$contents$google3$third_party$javascript$safevalues$builders$script_builders_valueAsScript(value) {
  return module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal(JSON.stringify(value).replace(/</g, "\\u003C"));
}
function module$contents$google3$third_party$javascript$safevalues$builders$script_builders_safeScriptWithArgs(templateObj) {
  var emptyArgs = $jscomp.getRestArguments.apply(1, arguments);
  if (goog.DEBUG) {
    if (emptyArgs.some(function(a) {
      return a !== "";
    })) {
      throw Error("safeScriptWithArgs only allows empty string expressions to enable inline comments.");
    }
    module$contents$google3$third_party$javascript$safevalues$internals$string_literal_assertIsTemplateObject(templateObj, emptyArgs.length);
  }
  return function() {
    var argValues = $jscomp.getRestArguments.apply(0, arguments), values = argValues.map(function(v) {
      return module$contents$google3$third_party$javascript$safevalues$builders$script_builders_valueAsScript(v).toString();
    });
    return module$contents$google3$third_party$javascript$safevalues$internals$script_impl_createScriptInternal("(" + templateObj.join("") + ")(" + values.join(",") + ")");
  };
}
;var module$exports$google3$third_party$javascript$safevalues$reporting$reporting = {}, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_REPORTING_ID_PREFIX_TO_SAMPLING_RATE = {0:1, 1:1}, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_REPORTING_ID_PREFIX_TO_HEARTBEAT_RATE = {0:.1, 1:.1};
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingOptions() {
}
module$exports$google3$third_party$javascript$safevalues$reporting$reporting.ReportingOptions = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingOptions;
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportOnlyHtmlPassthrough(s$jscomp$0, options$jscomp$0) {
  if (!(options$jscomp$0 && module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isCallSampled(options$jscomp$0, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_REPORTING_ID_PREFIX_TO_SAMPLING_RATE[options$jscomp$0.reportingId[0]]) && !module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isReportingDisabled() && "DocumentFragment" in window)) {
    return s$jscomp$0;
  }
  var $jscomp$inline_107, $jscomp$inline_108;
  Math.random() < (($jscomp$inline_108 = ($jscomp$inline_107 = options$jscomp$0.heartbeatRate) != null ? $jscomp$inline_107 : module$contents$google3$third_party$javascript$safevalues$reporting$reporting_REPORTING_ID_PREFIX_TO_HEARTBEAT_RATE[options$jscomp$0.reportingId[0]]) != null ? $jscomp$inline_108 : 0) && module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options$jscomp$0, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType.HEARTBEAT);
  var changedBySanitizing = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isChangedBySanitizing(s$jscomp$0, options$jscomp$0);
  if (!changedBySanitizing) {
    var s = s$jscomp$0, options = options$jscomp$0;
    (0,module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape)(s).toString() !== s && module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType.HTML_CHANGED_BY_ESCAPING);
  }
  return s$jscomp$0;
}
module$exports$google3$third_party$javascript$safevalues$reporting$reporting.reportOnlyHtmlPassthrough = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportOnlyHtmlPassthrough;
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isCallSampled(options, defaultSamplingRate) {
  var $jscomp$nullish$tmp0, $jscomp$nullish$tmp1;
  return Math.random() < (($jscomp$nullish$tmp1 = ($jscomp$nullish$tmp0 = options.samplingRate) != null ? $jscomp$nullish$tmp0 : defaultSamplingRate) != null ? $jscomp$nullish$tmp1 : 0);
}
module$exports$google3$third_party$javascript$safevalues$reporting$reporting.isCallSampled = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isCallSampled;
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isReportingDisabled() {
  return window.SAFEVALUES_REPORTING === !1;
}
module$exports$google3$third_party$javascript$safevalues$reporting$reporting.isReportingDisabled = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isReportingDisabled;
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_isChangedBySanitizing(s, options) {
  try {
    module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_superLenientlySanitizeHtmlAssertUnchanged(s);
  } catch (e) {
    var corpRe = /([.]corp[.]google[.]com|[.]proxy[.]googleprod[.]com|[.]googlers[.]com)$/;
    goog.DEBUG && corpRe.test(window.location.hostname) && e instanceof Error ? module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType.HTML_CHANGED_BY_SUPER_LENIENT_SANITIZING, e.message) : module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType.HTML_CHANGED_BY_SUPER_LENIENT_SANITIZING);
    return !0;
  }
  try {
    module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_lenientlySanitizeHtmlAssertUnchanged(s);
  } catch ($jscomp$unused$catch$696273141$0) {
    return module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType.HTML_CHANGED_BY_RELAXED_SANITIZING), !0;
  }
  try {
    module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlAssertUnchanged(s);
  } catch ($jscomp$unused$catch$696273141$1) {
    return module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options, module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType.HTML_CHANGED_BY_SANITIZING), !0;
  }
  return !1;
}
var module$contents$google3$third_party$javascript$safevalues$reporting$reporting_ReportingType = {HEARTBEAT:"HEARTBEAT", CRASHED:"CRASHED", HTML_CHANGED_BY_ESCAPING:"H_ESCAPE", HTML_CHANGED_BY_SANITIZING:"H_SANITIZE", HTML_CHANGED_BY_RELAXED_SANITIZING:"H_RSANITIZE", HTML_CHANGED_BY_SUPER_LENIENT_SANITIZING:"H_SLSANITIZE"};
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportLegacyConversion(options, type, additionalData) {
  var sendReport = module$exports$google3$third_party$javascript$safevalues$reporting$reporting.TEST_ONLY.sendReport ? module$exports$google3$third_party$javascript$safevalues$reporting$reporting.TEST_ONLY.sendReport : typeof window !== "undefined" && window.navigator && window.navigator.sendBeacon !== void 0 ? navigator.sendBeacon.bind(navigator) : module$contents$google3$third_party$javascript$safevalues$reporting$reporting_sendBeaconPolyfill;
  var payload = {host:window.location.hostname, type:type, additionalData:additionalData};
  sendReport("https://csp.withgoogle.com/csp/lcreport/" + options.reportingId, JSON.stringify(payload));
}
function module$contents$google3$third_party$javascript$safevalues$reporting$reporting_sendBeaconPolyfill(url, body) {
  var req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(body);
}
module$exports$google3$third_party$javascript$safevalues$reporting$reporting.sendBeaconPolyfill = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_sendBeaconPolyfill;
module$exports$google3$third_party$javascript$safevalues$reporting$reporting.TEST_ONLY = {reset:function() {
  module$exports$google3$third_party$javascript$safevalues$reporting$reporting.TEST_ONLY.sendReport = void 0;
}};
var module$exports$google3$third_party$javascript$safevalues$index = {};
module$exports$google3$third_party$javascript$safevalues$index.safeAttrPrefix = module$contents$google3$third_party$javascript$safevalues$builders$attribute_builders_safeAttrPrefix;
module$exports$google3$third_party$javascript$safevalues$index.htmlFragment = module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_htmlFragment;
module$exports$google3$third_party$javascript$safevalues$index.htmlToNode = module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_htmlToNode;
module$exports$google3$third_party$javascript$safevalues$index.svgFragment = module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_svgFragment;
module$exports$google3$third_party$javascript$safevalues$index.concatHtmls = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.concatHtmls;
module$exports$google3$third_party$javascript$safevalues$index.createHtml = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.createHtml;
module$exports$google3$third_party$javascript$safevalues$index.doctypeHtml = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.doctypeHtml;
module$exports$google3$third_party$javascript$safevalues$index.htmlEscape = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.htmlEscape;
module$exports$google3$third_party$javascript$safevalues$index.joinHtmls = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.joinHtmls;
module$exports$google3$third_party$javascript$safevalues$index.nodeToHtml = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.nodeToHtml;
module$exports$google3$third_party$javascript$safevalues$index.scriptToHtml = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.scriptToHtml;
module$exports$google3$third_party$javascript$safevalues$index.scriptUrlToHtml = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.scriptUrlToHtml;
module$exports$google3$third_party$javascript$safevalues$index.styleSheetToHtml = module$exports$google3$third_party$javascript$safevalues$builders$html_builders.styleSheetToHtml;
module$exports$google3$third_party$javascript$safevalues$index.HtmlFormatter = module$exports$google3$third_party$javascript$safevalues$builders$html_formatter.HtmlFormatter;
module$exports$google3$third_party$javascript$safevalues$index.sanitizeHtmlWithCss = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$default_css_sanitizer_sanitizeHtmlWithCss;
module$exports$google3$third_party$javascript$safevalues$index.sanitizeHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtml;
module$exports$google3$third_party$javascript$safevalues$index.sanitizeHtmlAssertUnchanged = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlAssertUnchanged;
module$exports$google3$third_party$javascript$safevalues$index.sanitizeHtmlToFragment = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlToFragment;
module$exports$google3$third_party$javascript$safevalues$index.CssSanitizerBuilder = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder;
module$exports$google3$third_party$javascript$safevalues$index.HtmlSanitizerBuilder = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.HtmlSanitizerBuilder;
module$exports$google3$third_party$javascript$safevalues$index.ResourceUrlPolicyHintsType = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType;
module$exports$google3$third_party$javascript$safevalues$index.appendParams = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendParams;
module$exports$google3$third_party$javascript$safevalues$index.appendPathSegment = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendPathSegment;
module$exports$google3$third_party$javascript$safevalues$index.objectUrlFromScript = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_objectUrlFromScript;
module$exports$google3$third_party$javascript$safevalues$index.replaceFragment = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_replaceFragment;
module$exports$google3$third_party$javascript$safevalues$index.replaceParams = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_replaceParams;
module$exports$google3$third_party$javascript$safevalues$index.toAbsoluteResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_toAbsoluteResourceUrl;
module$exports$google3$third_party$javascript$safevalues$index.trustedResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_trustedResourceUrl;
module$exports$google3$third_party$javascript$safevalues$index.concatScripts = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_concatScripts;
module$exports$google3$third_party$javascript$safevalues$index.safeScript = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_safeScript;
module$exports$google3$third_party$javascript$safevalues$index.safeScriptWithArgs = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_safeScriptWithArgs;
module$exports$google3$third_party$javascript$safevalues$index.valueAsScript = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_valueAsScript;
module$exports$google3$third_party$javascript$safevalues$index.concatStyleSheets = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_concatStyleSheets;
module$exports$google3$third_party$javascript$safevalues$index.safeStyleRule = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_safeStyleRule;
module$exports$google3$third_party$javascript$safevalues$index.safeStyleSheet = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_safeStyleSheet;
module$exports$google3$third_party$javascript$safevalues$index.SanitizableUrlScheme = module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme;
module$exports$google3$third_party$javascript$safevalues$index.addJavaScriptUrlSanitizationCallback = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_addJavaScriptUrlSanitizationCallback;
module$exports$google3$third_party$javascript$safevalues$index.fromMediaSource = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromMediaSource;
module$exports$google3$third_party$javascript$safevalues$index.fromTrustedResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromTrustedResourceUrl;
module$exports$google3$third_party$javascript$safevalues$index.objectUrlFromSafeSource = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_objectUrlFromSafeSource;
module$exports$google3$third_party$javascript$safevalues$index.removeJavaScriptUrlSanitizationCallback = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_removeJavaScriptUrlSanitizationCallback;
module$exports$google3$third_party$javascript$safevalues$index.safeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_safeUrl;
module$exports$google3$third_party$javascript$safevalues$index.sanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrl;
module$exports$google3$third_party$javascript$safevalues$index.sanitizeUrlForMigration = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrlForMigration;
module$exports$google3$third_party$javascript$safevalues$index.trySanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_trySanitizeUrl;
module$exports$google3$third_party$javascript$safevalues$index.SafeAttributePrefix = module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.SafeAttributePrefix;
module$exports$google3$third_party$javascript$safevalues$index.unwrapAttributePrefix = module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_unwrapAttributePrefix;
module$exports$google3$third_party$javascript$safevalues$index.EMPTY_HTML = module$exports$google3$third_party$javascript$safevalues$internals$html_impl.EMPTY_HTML;
module$exports$google3$third_party$javascript$safevalues$index.SafeHtml = module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml;
module$exports$google3$third_party$javascript$safevalues$index.isHtml = module$exports$google3$third_party$javascript$safevalues$internals$html_impl.isHtml;
module$exports$google3$third_party$javascript$safevalues$index.unwrapHtml = module$exports$google3$third_party$javascript$safevalues$internals$html_impl.unwrapHtml;
module$exports$google3$third_party$javascript$safevalues$index.TrustedResourceUrl = module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl;
module$exports$google3$third_party$javascript$safevalues$index.isResourceUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_isResourceUrl;
module$exports$google3$third_party$javascript$safevalues$index.unwrapResourceUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl;
module$exports$google3$third_party$javascript$safevalues$index.EMPTY_SCRIPT = module$exports$google3$third_party$javascript$safevalues$internals$script_impl.EMPTY_SCRIPT;
module$exports$google3$third_party$javascript$safevalues$index.SafeScript = module$exports$google3$third_party$javascript$safevalues$internals$script_impl.SafeScript;
module$exports$google3$third_party$javascript$safevalues$index.isScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_isScript;
module$exports$google3$third_party$javascript$safevalues$index.unwrapScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript;
module$exports$google3$third_party$javascript$safevalues$index.SafeStyleSheet = module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.SafeStyleSheet;
module$exports$google3$third_party$javascript$safevalues$index.isStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_isStyleSheet;
module$exports$google3$third_party$javascript$safevalues$index.unwrapStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet;
module$exports$google3$third_party$javascript$safevalues$index.ABOUT_BLANK = module$exports$google3$third_party$javascript$safevalues$internals$url_impl.ABOUT_BLANK;
module$exports$google3$third_party$javascript$safevalues$index.INNOCUOUS_URL = module$exports$google3$third_party$javascript$safevalues$internals$url_impl.INNOCUOUS_URL;
module$exports$google3$third_party$javascript$safevalues$index.SafeUrl = module$exports$google3$third_party$javascript$safevalues$internals$url_impl.SafeUrl;
module$exports$google3$third_party$javascript$safevalues$index.isUrl = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl;
module$exports$google3$third_party$javascript$safevalues$index.unwrapUrl = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_unwrapUrl;
module$exports$google3$third_party$javascript$safevalues$index.reportOnlyHtmlPassthrough = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportOnlyHtmlPassthrough;
safevalues.safeAttrPrefix = module$contents$google3$third_party$javascript$safevalues$builders$attribute_builders_safeAttrPrefix;
safevalues.htmlFragment = module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_htmlFragment;
safevalues.htmlToNode = module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_htmlToNode;
safevalues.svgFragment = module$contents$google3$third_party$javascript$safevalues$builders$document_fragment_builders_svgFragment;
safevalues.concatHtmls = module$exports$google3$third_party$javascript$safevalues$index.concatHtmls;
safevalues.createHtml = module$exports$google3$third_party$javascript$safevalues$index.createHtml;
safevalues.doctypeHtml = module$exports$google3$third_party$javascript$safevalues$index.doctypeHtml;
safevalues.htmlEscape = module$exports$google3$third_party$javascript$safevalues$index.htmlEscape;
safevalues.joinHtmls = module$exports$google3$third_party$javascript$safevalues$index.joinHtmls;
safevalues.nodeToHtml = module$exports$google3$third_party$javascript$safevalues$index.nodeToHtml;
safevalues.scriptToHtml = module$exports$google3$third_party$javascript$safevalues$index.scriptToHtml;
safevalues.scriptUrlToHtml = module$exports$google3$third_party$javascript$safevalues$index.scriptUrlToHtml;
safevalues.styleSheetToHtml = module$exports$google3$third_party$javascript$safevalues$index.styleSheetToHtml;
safevalues.HtmlFormatter = module$exports$google3$third_party$javascript$safevalues$builders$html_formatter.HtmlFormatter;
safevalues.sanitizeHtmlWithCss = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$default_css_sanitizer_sanitizeHtmlWithCss;
safevalues.sanitizeHtml = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtml;
safevalues.sanitizeHtmlAssertUnchanged = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlAssertUnchanged;
safevalues.sanitizeHtmlToFragment = module$contents$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_sanitizeHtmlToFragment;
safevalues.CssSanitizer = module$exports$google3$third_party$javascript$safevalues$index.CssSanitizer;
safevalues.HtmlSanitizer = module$exports$google3$third_party$javascript$safevalues$index.HtmlSanitizer;
safevalues.CssSanitizerBuilder = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.CssSanitizerBuilder;
safevalues.HtmlSanitizerBuilder = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$html_sanitizer_builder.HtmlSanitizerBuilder;
safevalues.ResourceUrlPolicyHintsType = module$exports$google3$third_party$javascript$safevalues$builders$html_sanitizer$resource_url_policy.ResourceUrlPolicyHintsType;
safevalues.ResourceUrlPolicy = module$exports$google3$third_party$javascript$safevalues$index.ResourceUrlPolicy;
safevalues.ResourceUrlPolicyHints = module$exports$google3$third_party$javascript$safevalues$index.ResourceUrlPolicyHints;
safevalues.appendParams = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendParams;
safevalues.appendPathSegment = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_appendPathSegment;
safevalues.objectUrlFromScript = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_objectUrlFromScript;
safevalues.replaceFragment = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_replaceFragment;
safevalues.replaceParams = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_replaceParams;
safevalues.toAbsoluteResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_toAbsoluteResourceUrl;
safevalues.trustedResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$resource_url_builders_trustedResourceUrl;
safevalues.concatScripts = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_concatScripts;
safevalues.safeScript = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_safeScript;
safevalues.safeScriptWithArgs = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_safeScriptWithArgs;
safevalues.valueAsScript = module$contents$google3$third_party$javascript$safevalues$builders$script_builders_valueAsScript;
safevalues.concatStyleSheets = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_concatStyleSheets;
safevalues.safeStyleRule = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_safeStyleRule;
safevalues.safeStyleSheet = module$contents$google3$third_party$javascript$safevalues$builders$style_sheet_builders_safeStyleSheet;
safevalues.SanitizableUrlScheme = module$exports$google3$third_party$javascript$safevalues$builders$url_builders.SanitizableUrlScheme;
safevalues.addJavaScriptUrlSanitizationCallback = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_addJavaScriptUrlSanitizationCallback;
safevalues.fromMediaSource = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromMediaSource;
safevalues.fromTrustedResourceUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_fromTrustedResourceUrl;
safevalues.objectUrlFromSafeSource = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_objectUrlFromSafeSource;
safevalues.removeJavaScriptUrlSanitizationCallback = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_removeJavaScriptUrlSanitizationCallback;
safevalues.safeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_safeUrl;
safevalues.sanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrl;
safevalues.sanitizeUrlForMigration = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_sanitizeUrlForMigration;
safevalues.trySanitizeUrl = module$contents$google3$third_party$javascript$safevalues$builders$url_builders_trySanitizeUrl;
safevalues.Scheme = module$exports$google3$third_party$javascript$safevalues$index.Scheme;
safevalues.SafeAttributePrefix = module$exports$google3$third_party$javascript$safevalues$internals$attribute_impl.SafeAttributePrefix;
safevalues.unwrapAttributePrefix = module$contents$google3$third_party$javascript$safevalues$internals$attribute_impl_unwrapAttributePrefix;
safevalues.EMPTY_HTML = module$exports$google3$third_party$javascript$safevalues$index.EMPTY_HTML;
safevalues.SafeHtml = module$exports$google3$third_party$javascript$safevalues$internals$html_impl.SafeHtml;
safevalues.isHtml = module$exports$google3$third_party$javascript$safevalues$index.isHtml;
safevalues.unwrapHtml = module$exports$google3$third_party$javascript$safevalues$index.unwrapHtml;
safevalues.TrustedResourceUrl = module$exports$google3$third_party$javascript$safevalues$internals$resource_url_impl.TrustedResourceUrl;
safevalues.isResourceUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_isResourceUrl;
safevalues.unwrapResourceUrl = module$contents$google3$third_party$javascript$safevalues$internals$resource_url_impl_unwrapResourceUrl;
safevalues.EMPTY_SCRIPT = module$exports$google3$third_party$javascript$safevalues$internals$script_impl.EMPTY_SCRIPT;
safevalues.SafeScript = module$exports$google3$third_party$javascript$safevalues$internals$script_impl.SafeScript;
safevalues.isScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_isScript;
safevalues.unwrapScript = module$contents$google3$third_party$javascript$safevalues$internals$script_impl_unwrapScript;
safevalues.SafeStyleSheet = module$exports$google3$third_party$javascript$safevalues$internals$style_sheet_impl.SafeStyleSheet;
safevalues.isStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_isStyleSheet;
safevalues.unwrapStyleSheet = module$contents$google3$third_party$javascript$safevalues$internals$style_sheet_impl_unwrapStyleSheet;
safevalues.ABOUT_BLANK = module$exports$google3$third_party$javascript$safevalues$internals$url_impl.ABOUT_BLANK;
safevalues.INNOCUOUS_URL = module$exports$google3$third_party$javascript$safevalues$internals$url_impl.INNOCUOUS_URL;
safevalues.SafeUrl = module$exports$google3$third_party$javascript$safevalues$internals$url_impl.SafeUrl;
safevalues.isUrl = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_isUrl;
safevalues.unwrapUrl = module$contents$google3$third_party$javascript$safevalues$internals$url_impl_unwrapUrl;
safevalues.reportOnlyHtmlPassthrough = module$contents$google3$third_party$javascript$safevalues$reporting$reporting_reportOnlyHtmlPassthrough;
safevalues.restricted = {};
safevalues.restricted.reviewed = {};
safevalues.restricted.reviewed.htmlSafeByReview = module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_htmlSafeByReview;
safevalues.restricted.reviewed.scriptSafeByReview = module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_scriptSafeByReview;
safevalues.restricted.reviewed.resourceUrlSafeByReview = module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_resourceUrlSafeByReview;
safevalues.restricted.reviewed.styleSheetSafeByReview = module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_styleSheetSafeByReview;
safevalues.restricted.reviewed.urlSafeByReview = module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_urlSafeByReview;
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(opt_element) {
  return opt_element ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(opt_element)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper());
};
goog.dom.getDocument = function() {
  return document;
};
goog.dom.getElement = function(element) {
  return goog.dom.getElementHelper_(document, element);
};
goog.dom.getHTMLElement = function(id) {
  var element = goog.dom.getElement(id);
  return element ? module$contents$goog$asserts$dom_assertIsHtmlElement(element) : null;
};
goog.dom.getElementHelper_ = function(doc, element) {
  return typeof element === "string" ? doc.getElementById(element) : element;
};
goog.dom.getRequiredElement = function(id) {
  return goog.dom.getRequiredElementHelper_(document, id);
};
goog.dom.getRequiredHTMLElement = function(id) {
  return module$contents$goog$asserts$dom_assertIsHtmlElement(goog.dom.getRequiredElementHelper_(document, id));
};
goog.dom.getRequiredElementHelper_ = function(doc, id) {
  goog.asserts.assertString(id);
  var element = goog.dom.getElementHelper_(doc, id);
  return goog.asserts.assert(element, "No element found with id: " + id);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagName = function(tagName, opt_parent) {
  var parent = opt_parent || document;
  return parent.getElementsByTagName(String(tagName));
};
goog.dom.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(document, opt_tag, opt_class, opt_el);
};
goog.dom.getElementByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementByTagNameAndClass_(document, opt_tag, opt_class, opt_el);
};
goog.dom.getElementsByClass = function(className, opt_el) {
  return (opt_el || document).querySelectorAll("." + className);
};
goog.dom.getElementByClass = function(className, opt_el) {
  var parent = opt_el || document, retVal;
  return (retVal = parent.getElementsByClassName ? parent.getElementsByClassName(className)[0] : goog.dom.getElementByTagNameAndClass_(document, "*", className, opt_el)) || null;
};
goog.dom.getHTMLElementByClass = function(className, opt_parent) {
  var element = goog.dom.getElementByClass(className, opt_parent);
  return element ? module$contents$goog$asserts$dom_assertIsHtmlElement(element) : null;
};
goog.dom.getRequiredElementByClass = function(className, opt_root) {
  var retValue = goog.dom.getElementByClass(className, opt_root);
  return goog.asserts.assert(retValue, "No element found with className: " + className);
};
goog.dom.getRequiredHTMLElementByClass = function(className, opt_parent) {
  var retValue = goog.dom.getElementByClass(className, opt_parent);
  goog.asserts.assert(retValue, "No HTMLElement found with className: " + className);
  return module$contents$goog$asserts$dom_assertIsHtmlElement(retValue);
};
goog.dom.getElementsByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc, tagName = opt_tag && opt_tag != "*" ? String(opt_tag).toUpperCase() : "";
  if (tagName || opt_class) {
    var query = tagName + (opt_class ? "." + opt_class : "");
    return parent.querySelectorAll(query);
  }
  return parent.getElementsByTagName("*");
};
goog.dom.getElementByTagNameAndClass_ = function(doc, opt_tag, opt_class, opt_el) {
  var parent = opt_el || doc, tag = opt_tag && opt_tag != "*" ? String(opt_tag).toUpperCase() : "";
  if (tag || opt_class) {
    return parent.querySelector(tag + (opt_class ? "." + opt_class : ""));
  }
  var elements = goog.dom.getElementsByTagNameAndClass_(doc, opt_tag, opt_class, opt_el);
  return elements[0] || null;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(element, properties) {
  module$contents$goog$object_forEach(properties, function(val, key) {
    key == "style" ? element.style.cssText = val : key == "class" ? element.className = val : key == "for" ? element.htmlFor = val : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(key) ? element.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[key], val) : goog.string.startsWith(key, "aria-") || goog.string.startsWith(key, "data-") ? element.setAttribute(key, val) : element[key] = val;
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", nonce:"nonce", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize_(opt_window || window);
};
goog.dom.getViewportSize_ = function(win) {
  var doc = win.document, el = goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
  return new goog.math.Size(el.clientWidth, el.clientHeight);
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeightForWindow = function(win) {
  return goog.dom.getDocumentHeight_(win);
};
goog.dom.getDocumentHeight_ = function(win) {
  var doc = win.document, height = 0;
  if (doc) {
    var body = doc.body, docEl = doc.documentElement;
    if (!docEl || !body) {
      return 0;
    }
    var vh = goog.dom.getViewportSize_(win).height;
    if (goog.dom.isCss1CompatMode_(doc) && docEl.scrollHeight) {
      height = docEl.scrollHeight != vh ? docEl.scrollHeight : docEl.offsetHeight;
    } else {
      var sh = docEl.scrollHeight, oh = docEl.offsetHeight;
      docEl.clientHeight != oh && (sh = body.scrollHeight, oh = body.offsetHeight);
      height = sh > vh ? sh > oh ? sh : oh : sh < oh ? sh : oh;
    }
  }
  return height;
};
goog.dom.getPageScroll = function(opt_window) {
  var win = opt_window || goog.global || window;
  return goog.dom.getDomHelper(win.document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function(doc) {
  var el = goog.dom.getDocumentScrollElement_(doc), win = goog.dom.getWindow_(doc);
  return new goog.math.Coordinate(win.pageXOffset || el.scrollLeft, win.pageYOffset || el.scrollTop);
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function(doc) {
  return doc.scrollingElement ? doc.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(doc) ? doc.documentElement : doc.body || doc.documentElement;
};
goog.dom.getWindow = function(opt_doc) {
  return opt_doc ? goog.dom.getWindow_(opt_doc) : window;
};
goog.dom.getWindow_ = function(doc) {
  return doc.defaultView;
};
goog.dom.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function(doc, args) {
  var tagName = String(args[0]), attributes = args[1], element = goog.dom.createElement_(doc, tagName);
  attributes && (typeof attributes === "string" ? element.className = attributes : Array.isArray(attributes) ? element.className = attributes.join(" ") : goog.dom.setProperties(element, attributes));
  args.length > 2 && goog.dom.append_(doc, element, args, 2);
  return element;
};
goog.dom.append_ = function(doc, parent, args, startIndex) {
  function childHandler(child) {
    child && parent.appendChild(typeof child === "string" ? doc.createTextNode(child) : child);
  }
  for (var i = startIndex; i < args.length; i++) {
    var arg = args[i];
    goog.isArrayLike(arg) && !goog.dom.isNodeLike(arg) ? module$contents$goog$array_forEach(goog.dom.isNodeList(arg) ? module$contents$goog$array_toArray(arg) : arg, childHandler) : childHandler(arg);
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(name) {
  return goog.dom.createElement_(document, name);
};
goog.dom.createElement_ = function(doc, name) {
  name = String(name);
  doc.contentType === "application/xhtml+xml" && (name = name.toLowerCase());
  return doc.createElement(name);
};
goog.dom.createTextNode = function(content) {
  return document.createTextNode(String(content));
};
goog.dom.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(document, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.createTable_ = function(doc, rows, columns, fillWithNbsp) {
  for (var table = goog.dom.createElement_(doc, goog.dom.TagName.TABLE), tbody = table.appendChild(goog.dom.createElement_(doc, goog.dom.TagName.TBODY)), i = 0; i < rows; i++) {
    for (var tr = goog.dom.createElement_(doc, goog.dom.TagName.TR), j = 0; j < columns; j++) {
      var td = goog.dom.createElement_(doc, goog.dom.TagName.TD);
      fillWithNbsp && goog.dom.setTextContent(td, goog.string.Unicode.NBSP);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  return table;
};
goog.dom.constHtmlToNode = function(var_args) {
  var stringArray = Array.prototype.map.call(arguments, goog.string.Const.unwrap), safeHtml = module$contents$google3$third_party$javascript$safevalues$restricted$reviewed_htmlSafeByReview(stringArray.join(""), {justification:"Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."});
  return goog.dom.safeHtmlToNode(safeHtml);
};
goog.dom.safeHtmlToNode = function(html) {
  return goog.dom.safeHtmlToNode_(document, html);
};
goog.dom.safeHtmlToNode_ = function(doc, html) {
  var tempDiv = goog.dom.createElement_(doc, goog.dom.TagName.DIV);
  module$contents$google3$third_party$javascript$safevalues$dom$elements$element_setElementInnerHtml(tempDiv, html);
  return goog.dom.childrenToNode_(doc, tempDiv);
};
goog.dom.childrenToNode_ = function(doc, tempDiv) {
  if (tempDiv.childNodes.length == 1) {
    return tempDiv.removeChild(goog.asserts.assert(tempDiv.firstChild));
  }
  for (var fragment = doc.createDocumentFragment(); tempDiv.firstChild;) {
    fragment.appendChild(tempDiv.firstChild);
  }
  return fragment;
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function(doc) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : doc.compatMode == "CSS1Compat";
};
goog.dom.canHaveChildren = function(node) {
  if (node.nodeType != goog.dom.NodeType.ELEMENT) {
    return !1;
  }
  switch(node.tagName) {
    case String(goog.dom.TagName.APPLET):
    case String(goog.dom.TagName.AREA):
    case String(goog.dom.TagName.BASE):
    case String(goog.dom.TagName.BR):
    case String(goog.dom.TagName.COL):
    case String(goog.dom.TagName.COMMAND):
    case String(goog.dom.TagName.EMBED):
    case String(goog.dom.TagName.FRAME):
    case String(goog.dom.TagName.HR):
    case String(goog.dom.TagName.IMG):
    case String(goog.dom.TagName.INPUT):
    case String(goog.dom.TagName.IFRAME):
    case String(goog.dom.TagName.ISINDEX):
    case String(goog.dom.TagName.KEYGEN):
    case String(goog.dom.TagName.LINK):
    case String(goog.dom.TagName.NOFRAMES):
    case String(goog.dom.TagName.NOSCRIPT):
    case String(goog.dom.TagName.META):
    case String(goog.dom.TagName.OBJECT):
    case String(goog.dom.TagName.PARAM):
    case String(goog.dom.TagName.SCRIPT):
    case String(goog.dom.TagName.SOURCE):
    case String(goog.dom.TagName.STYLE):
    case String(goog.dom.TagName.TRACK):
    case String(goog.dom.TagName.WBR):
      return !1;
  }
  return !0;
};
goog.dom.appendChild = function(parent, child) {
  goog.asserts.assert(parent != null && child != null, "goog.dom.appendChild expects non-null arguments");
  parent.appendChild(child);
};
goog.dom.append = function(parent, var_args) {
  goog.dom.append_(goog.dom.getOwnerDocument(parent), parent, arguments, 1);
};
goog.dom.removeChildren = function(node) {
  for (var child; child = node.firstChild;) {
    node.removeChild(child);
  }
};
goog.dom.insertSiblingBefore = function(newNode, refNode) {
  goog.asserts.assert(newNode != null && refNode != null, "goog.dom.insertSiblingBefore expects non-null arguments");
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
};
goog.dom.insertSiblingAfter = function(newNode, refNode) {
  goog.asserts.assert(newNode != null && refNode != null, "goog.dom.insertSiblingAfter expects non-null arguments");
  refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
};
goog.dom.insertChildAt = function(parent, child, index) {
  goog.asserts.assert(parent != null, "goog.dom.insertChildAt expects a non-null parent");
  parent.insertBefore(child, parent.childNodes[index] || null);
};
goog.dom.removeNode = function(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};
goog.dom.replaceNode = function(newNode, oldNode) {
  goog.asserts.assert(newNode != null && oldNode != null, "goog.dom.replaceNode expects non-null arguments");
  var parent = oldNode.parentNode;
  parent && parent.replaceChild(newNode, oldNode);
};
goog.dom.copyContents = function(target, source) {
  goog.asserts.assert(target != null && source != null, "goog.dom.copyContents expects non-null arguments");
  var childNodes = source.cloneNode(!0).childNodes;
  for (goog.dom.removeChildren(target); childNodes.length;) {
    target.appendChild(childNodes[0]);
  }
};
goog.dom.flattenElement = function(element) {
  var child, parent = element.parentNode;
  if (parent && parent.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (element.removeNode) {
      return element.removeNode(!1);
    }
    for (; child = element.firstChild;) {
      parent.insertBefore(child, element);
    }
    return goog.dom.removeNode(element);
  }
};
goog.dom.getChildren = function(element) {
  return goog.FEATURESET_YEAR > 2018 || element.children != void 0 ? element.children : Array.prototype.filter.call(element.childNodes, function(node) {
    return node.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function(node) {
  return node.firstElementChild !== void 0 ? node.firstElementChild : goog.dom.getNextElementNode_(node.firstChild, !0);
};
goog.dom.getLastElementChild = function(node) {
  return node.lastElementChild !== void 0 ? node.lastElementChild : goog.dom.getNextElementNode_(node.lastChild, !1);
};
goog.dom.getNextElementSibling = function(node) {
  return goog.FEATURESET_YEAR > 2018 || node.nextElementSibling !== void 0 ? node.nextElementSibling : goog.dom.getNextElementNode_(node.nextSibling, !0);
};
goog.dom.getPreviousElementSibling = function(node) {
  return node.previousElementSibling !== void 0 ? node.previousElementSibling : goog.dom.getNextElementNode_(node.previousSibling, !1);
};
goog.dom.getNextElementNode_ = function(node, forward) {
  for (; node && node.nodeType != goog.dom.NodeType.ELEMENT;) {
    node = forward ? node.nextSibling : node.previousSibling;
  }
  return node;
};
goog.dom.getNextNode = function(node) {
  if (!node) {
    return null;
  }
  if (node.firstChild) {
    return node.firstChild;
  }
  for (; node && !node.nextSibling;) {
    node = node.parentNode;
  }
  return node ? node.nextSibling : null;
};
goog.dom.getPreviousNode = function(node) {
  if (!node) {
    return null;
  }
  if (!node.previousSibling) {
    return node.parentNode;
  }
  for (node = node.previousSibling; node && node.lastChild;) {
    node = node.lastChild;
  }
  return node;
};
goog.dom.isNodeLike = function(obj) {
  return goog.isObject(obj) && obj.nodeType > 0;
};
goog.dom.isElement = function(obj) {
  return goog.isObject(obj) && obj.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function(obj) {
  return goog.isObject(obj) && obj.window == obj;
};
goog.dom.getParentElement = function(element) {
  return element.parentElement || null;
};
goog.dom.contains = function(parent, descendant) {
  if (!parent || !descendant) {
    return !1;
  }
  if (goog.FEATURESET_YEAR > 2018 || parent.contains && descendant.nodeType == goog.dom.NodeType.ELEMENT) {
    return parent == descendant || parent.contains(descendant);
  }
  if (typeof parent.compareDocumentPosition != "undefined") {
    return parent == descendant || !!(parent.compareDocumentPosition(descendant) & 16);
  }
  for (; descendant && parent != descendant;) {
    descendant = descendant.parentNode;
  }
  return descendant == parent;
};
goog.dom.compareNodeOrder = function(node1, node2) {
  if (node1 == node2) {
    return 0;
  }
  if (node1.compareDocumentPosition) {
    return node1.compareDocumentPosition(node2) & 2 ? 1 : -1;
  }
  if ("sourceIndex" in node1 || node1.parentNode && "sourceIndex" in node1.parentNode) {
    var isElement1 = node1.nodeType == goog.dom.NodeType.ELEMENT, isElement2 = node2.nodeType == goog.dom.NodeType.ELEMENT;
    if (isElement1 && isElement2) {
      return node1.sourceIndex - node2.sourceIndex;
    }
    var parent1 = node1.parentNode, parent2 = node2.parentNode;
    return parent1 == parent2 ? goog.dom.compareSiblingOrder_(node1, node2) : !isElement1 && goog.dom.contains(parent1, node2) ? -1 * goog.dom.compareParentsDescendantNodeIe_(node1, node2) : !isElement2 && goog.dom.contains(parent2, node1) ? goog.dom.compareParentsDescendantNodeIe_(node2, node1) : (isElement1 ? node1.sourceIndex : parent1.sourceIndex) - (isElement2 ? node2.sourceIndex : parent2.sourceIndex);
  }
  var doc = goog.dom.getOwnerDocument(node1);
  var range1 = doc.createRange();
  range1.selectNode(node1);
  range1.collapse(!0);
  var range2 = doc.createRange();
  range2.selectNode(node2);
  range2.collapse(!0);
  return range1.compareBoundaryPoints(goog.global.Range.START_TO_END, range2);
};
goog.dom.compareParentsDescendantNodeIe_ = function(textNode, node) {
  var parent = textNode.parentNode;
  if (parent == node) {
    return -1;
  }
  for (var sibling = node; sibling.parentNode != parent;) {
    sibling = sibling.parentNode;
  }
  return goog.dom.compareSiblingOrder_(sibling, textNode);
};
goog.dom.compareSiblingOrder_ = function(node1, node2) {
  for (var s = node2; s = s.previousSibling;) {
    if (s == node1) {
      return -1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function(var_args) {
  var i, count = arguments.length;
  if (!count) {
    return null;
  }
  if (count == 1) {
    return arguments[0];
  }
  var paths = [], minLength = Infinity;
  for (i = 0; i < count; i++) {
    for (var ancestors = [], node = arguments[i]; node;) {
      ancestors.unshift(node), node = node.parentNode;
    }
    paths.push(ancestors);
    minLength = Math.min(minLength, ancestors.length);
  }
  var output = null;
  for (i = 0; i < minLength; i++) {
    for (var first = paths[0][i], j = 1; j < count; j++) {
      if (first != paths[j][i]) {
        return output;
      }
    }
    output = first;
  }
  return output;
};
goog.dom.isInDocument = function(node) {
  return (node.ownerDocument.compareDocumentPosition(node) & 16) == 16;
};
goog.dom.getOwnerDocument = function(node) {
  goog.asserts.assert(node, "Node cannot be null or undefined.");
  return node.nodeType == goog.dom.NodeType.DOCUMENT ? node : node.ownerDocument || node.document;
};
goog.dom.getFrameContentDocument = function(frame) {
  return frame.contentDocument || frame.contentWindow.document;
};
goog.dom.getFrameContentWindow = function(frame) {
  try {
    return frame.contentWindow || (frame.contentDocument ? goog.dom.getWindow(frame.contentDocument) : null);
  } catch (e) {
  }
  return null;
};
goog.dom.setTextContent = function(node, text) {
  goog.asserts.assert(node != null, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in node) {
    node.textContent = text;
  } else if (node.nodeType == goog.dom.NodeType.TEXT) {
    node.data = String(text);
  } else if (node.firstChild && node.firstChild.nodeType == goog.dom.NodeType.TEXT) {
    for (; node.lastChild != node.firstChild;) {
      node.removeChild(goog.asserts.assert(node.lastChild));
    }
    node.firstChild.data = String(text);
  } else {
    goog.dom.removeChildren(node);
    var doc = goog.dom.getOwnerDocument(node);
    node.appendChild(doc.createTextNode(String(text)));
  }
};
goog.dom.getOuterHtml = function(element) {
  goog.asserts.assert(element !== null, "goog.dom.getOuterHtml expects a non-null value for element");
  if ("outerHTML" in element) {
    return element.outerHTML;
  }
  var doc = goog.dom.getOwnerDocument(element), div = goog.dom.createElement_(doc, goog.dom.TagName.DIV);
  div.appendChild(element.cloneNode(!0));
  return div.innerHTML;
};
goog.dom.findNode = function(root, p) {
  var rv = [], found = goog.dom.findNodes_(root, p, rv, !0);
  return found ? rv[0] : void 0;
};
goog.dom.findNodes = function(root, p) {
  var rv = [];
  goog.dom.findNodes_(root, p, rv, !1);
  return rv;
};
goog.dom.findNodes_ = function(root, p, rv, findOne) {
  if (root != null) {
    for (var child = root.firstChild; child;) {
      if (p(child) && (rv.push(child), findOne) || goog.dom.findNodes_(child, p, rv, findOne)) {
        return !0;
      }
      child = child.nextSibling;
    }
  }
  return !1;
};
goog.dom.findElement = function(root, pred) {
  for (var stack = goog.dom.getChildrenReverse_(root); stack.length > 0;) {
    var next = stack.pop();
    if (pred(next)) {
      return next;
    }
    for (var c = next.lastElementChild; c; c = c.previousElementSibling) {
      stack.push(c);
    }
  }
  return null;
};
goog.dom.findElements = function(root, pred) {
  for (var result = [], stack = goog.dom.getChildrenReverse_(root); stack.length > 0;) {
    var next = stack.pop();
    pred(next) && result.push(next);
    for (var c = next.lastElementChild; c; c = c.previousElementSibling) {
      stack.push(c);
    }
  }
  return result;
};
goog.dom.getChildrenReverse_ = function(node) {
  if (node.nodeType == goog.dom.NodeType.DOCUMENT) {
    return [node.documentElement];
  }
  for (var children = [], c = node.lastElementChild; c; c = c.previousElementSibling) {
    children.push(c);
  }
  return children;
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(element) {
  return goog.dom.hasSpecifiedTabIndex_(element) && goog.dom.isTabIndexFocusable_(element);
};
goog.dom.setFocusableTabIndex = function(element, enable) {
  enable ? element.tabIndex = 0 : (element.tabIndex = -1, element.removeAttribute("tabIndex"));
};
goog.dom.isFocusable = function(element) {
  var focusable;
  return focusable = goog.dom.nativelySupportsFocus_(element) ? !element.disabled && (!goog.dom.hasSpecifiedTabIndex_(element) || goog.dom.isTabIndexFocusable_(element)) : goog.dom.isFocusableTabIndex(element);
};
goog.dom.hasSpecifiedTabIndex_ = function(element) {
  return element.hasAttribute("tabindex");
};
goog.dom.isTabIndexFocusable_ = function(element) {
  var index = element.tabIndex;
  return typeof index === "number" && index >= 0 && index < 32768;
};
goog.dom.nativelySupportsFocus_ = function(element) {
  return element.tagName == goog.dom.TagName.A && element.hasAttribute("href") || element.tagName == goog.dom.TagName.INPUT || element.tagName == goog.dom.TagName.TEXTAREA || element.tagName == goog.dom.TagName.SELECT || element.tagName == goog.dom.TagName.BUTTON;
};
goog.dom.hasNonZeroBoundingRect_ = function(element) {
  var rect = typeof element.getBoundingClientRect !== "function" ? {height:element.offsetHeight, width:element.offsetWidth} : element.getBoundingClientRect();
  return rect != null && rect.height > 0 && rect.width > 0;
};
goog.dom.getTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, !0);
  var textContent = buf.join("");
  textContent = textContent.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  textContent = textContent.replace(/\u200B/g, "");
  textContent = textContent.replace(/ +/g, " ");
  textContent != " " && (textContent = textContent.replace(/^\s*/, ""));
  return textContent;
};
goog.dom.getRawTextContent = function(node) {
  var buf = [];
  goog.dom.getTextContent_(node, buf, !1);
  return buf.join("");
};
goog.dom.getTextContent_ = function(node, buf, normalizeWhitespace) {
  if (!(node.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if (node.nodeType == goog.dom.NodeType.TEXT) {
      normalizeWhitespace ? buf.push(String(node.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : buf.push(node.nodeValue);
    } else if (node.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
      buf.push(goog.dom.PREDEFINED_TAG_VALUES_[node.nodeName]);
    } else {
      for (var child = node.firstChild; child;) {
        goog.dom.getTextContent_(child, buf, normalizeWhitespace), child = child.nextSibling;
      }
    }
  }
};
goog.dom.getNodeTextLength = function(node) {
  return goog.dom.getTextContent(node).length;
};
goog.dom.getNodeTextOffset = function(node, opt_offsetParent) {
  for (var root = opt_offsetParent || goog.dom.getOwnerDocument(node).body, buf = []; node && node != root;) {
    for (var cur = node; cur = cur.previousSibling;) {
      buf.unshift(goog.dom.getTextContent(cur));
    }
    node = node.parentNode;
  }
  return goog.string.trimLeft(buf.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function(parent, offset, opt_result) {
  for (var stack = [parent], pos = 0, cur = null; stack.length > 0 && pos < offset;) {
    if (cur = stack.pop(), !(cur.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if (cur.nodeType == goog.dom.NodeType.TEXT) {
        var text = cur.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
        pos += text.length;
      } else if (cur.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        pos += goog.dom.PREDEFINED_TAG_VALUES_[cur.nodeName].length;
      } else {
        for (var i = cur.childNodes.length - 1; i >= 0; i--) {
          stack.push(cur.childNodes[i]);
        }
      }
    }
  }
  goog.isObject(opt_result) && (opt_result.remainder = cur ? cur.nodeValue.length + offset - pos - 1 : 0, opt_result.node = cur);
  return cur;
};
goog.dom.isNodeList = function(val) {
  if (goog.FEATURESET_YEAR >= 2018) {
    return !!val && typeof val.length == "number" && typeof val.item == "function";
  }
  if (val && typeof val.length == "number") {
    if (goog.isObject(val)) {
      return typeof val.item == "function" || typeof val.item == "string";
    }
    if (typeof val === "function") {
      return typeof val.item == "function";
    }
  }
  return !1;
};
goog.dom.getAncestorByTagNameAndClass = function(element, opt_tag, opt_class, opt_maxSearchSteps) {
  if (!opt_tag && !opt_class) {
    return null;
  }
  var tagName = opt_tag ? String(opt_tag).toUpperCase() : null;
  return goog.dom.getAncestor(element, function(node) {
    return (!tagName || node.nodeName == tagName) && (!opt_class || typeof node.className === "string" && module$contents$goog$array_contains(node.className.split(/\s+/), opt_class));
  }, !0, opt_maxSearchSteps);
};
goog.dom.getAncestorByClass = function(element, className, opt_maxSearchSteps) {
  return goog.dom.getAncestorByTagNameAndClass(element, null, className, opt_maxSearchSteps);
};
goog.dom.getAncestor = function(element, matcher, opt_includeNode, opt_maxSearchSteps) {
  element && !opt_includeNode && (element = element.parentNode);
  for (var steps = 0; element && (opt_maxSearchSteps == null || steps <= opt_maxSearchSteps);) {
    goog.asserts.assert(element.name != "parentNode");
    if (matcher(element)) {
      return element;
    }
    element = element.parentNode;
    steps++;
  }
  return null;
};
goog.dom.getActiveElement = function(doc) {
  try {
    var activeElement = doc && doc.activeElement;
    return activeElement && activeElement.nodeName ? activeElement : null;
  } catch (e) {
    return null;
  }
};
goog.dom.getPixelRatio = function() {
  var win = goog.dom.getWindow();
  return win.devicePixelRatio !== void 0 ? win.devicePixelRatio : win.matchMedia ? goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75 : 1;
};
goog.dom.matchesPixelRatio_ = function(pixelRatio) {
  var win = goog.dom.getWindow(), query = "(min-resolution: " + pixelRatio + "dppx),(min--moz-device-pixel-ratio: " + pixelRatio + "),(min-resolution: " + pixelRatio * 96 + "dpi)";
  return win.matchMedia(query).matches ? pixelRatio : 0;
};
goog.dom.getCanvasContext2D = function(canvas) {
  return canvas.getContext("2d");
};
goog.dom.DomHelper = function(opt_document) {
  this.document_ = opt_document || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function(element) {
  return goog.dom.getElementHelper_(this.document_, element);
};
goog.dom.DomHelper.prototype.getRequiredElement = function(id) {
  return goog.dom.getRequiredElementHelper_(this.document_, id);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagName = function(tagName, opt_parent) {
  var parent = opt_parent || this.document_;
  return parent.getElementsByTagName(String(tagName));
};
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el);
};
goog.dom.DomHelper.prototype.getElementByTagNameAndClass = function(opt_tag, opt_class, opt_el) {
  return goog.dom.getElementByTagNameAndClass_(this.document_, opt_tag, opt_class, opt_el);
};
goog.dom.DomHelper.prototype.getElementsByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementsByClass(className, doc);
};
goog.dom.DomHelper.prototype.getElementByClass = function(className, opt_el) {
  var doc = opt_el || this.document_;
  return goog.dom.getElementByClass(className, doc);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(className, opt_root) {
  var root = opt_root || this.document_;
  return goog.dom.getRequiredElementByClass(className, root);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(opt_window) {
  return goog.dom.getViewportSize(opt_window || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.DomHelper.prototype.createDom = function(tagName, opt_attributes, var_args) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(name) {
  return goog.dom.createElement_(this.document_, name);
};
goog.dom.DomHelper.prototype.createTextNode = function(content) {
  return this.document_.createTextNode(String(content));
};
goog.dom.DomHelper.prototype.createTable = function(rows, columns, opt_fillWithNbsp) {
  return goog.dom.createTable_(this.document_, rows, columns, !!opt_fillWithNbsp);
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(html) {
  return goog.dom.safeHtmlToNode_(this.document_, html);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function(opt_doc) {
  return goog.dom.getActiveElement(opt_doc || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.copyContents = goog.dom.copyContents;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D;
goog.debug.entryPointRegistry = {};
goog.debug.entryPointRegistry.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(callback) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = callback;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var monitors = goog.debug.entryPointRegistry.monitors_, i = 0; i < monitors.length; i++) {
      callback(goog.bind(monitors[i].wrap, monitors[i]));
    }
  }
};
goog.debug.entryPointRegistry.unregister = function(callback) {
  var list = goog.debug.entryPointRegistry.refList_;
  list && module$contents$goog$array_remove(list, callback);
};
goog.debug.entryPointRegistry.monitorAll = function(monitor) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var transformer = goog.bind(monitor.wrap, monitor), i = 0; i < goog.debug.entryPointRegistry.refList_.length; i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  goog.debug.entryPointRegistry.monitors_.push(monitor);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(monitor) {
  var monitors = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(monitor == monitors[monitors.length - 1], "Only the most recent monitor can be unwrapped.");
  for (var transformer = goog.bind(monitor.unwrap, monitor), i = 0; i < goog.debug.entryPointRegistry.refList_.length; i++) {
    goog.debug.entryPointRegistry.refList_[i](transformer);
  }
  monitors.length--;
};
function module$contents$goog$dispose_dispose(obj) {
  obj && typeof obj.dispose == "function" && obj.dispose();
}
goog.dispose = module$contents$goog$dispose_dispose;
function module$contents$goog$disposeAll_disposeAll(var_args) {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    var disposable = arguments[i];
    goog.isArrayLike(disposable) ? module$contents$goog$disposeAll_disposeAll.apply(null, disposable) : module$contents$goog$dispose_dispose(disposable);
  }
}
goog.disposeAll = module$contents$goog$disposeAll_disposeAll;
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose = function() {
};
goog.disposable.IDisposable.prototype.isDisposed = function() {
};
goog.Disposable = function() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.instances_[goog.getUid(this)] = this);
  this.disposed_ = this.disposed_;
  this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var ret = [], id;
  for (id in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(id) && ret.push(goog.Disposable.instances_[Number(id)]);
  }
  return ret;
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_;
};
goog.Disposable.prototype.dispose = function() {
  if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var uid = goog.getUid(this);
    if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(uid)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    if (goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && this.onDisposeCallbacks_ && this.onDisposeCallbacks_.length > 0) {
      throw Error(this + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
    }
    delete goog.Disposable.instances_[uid];
  }
};
goog.Disposable.prototype[Symbol.dispose] = function() {
  this.dispose();
};
goog.Disposable.prototype.disposeInternal = function() {
  if (this.onDisposeCallbacks_) {
    for (; this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function(obj) {
  return obj && typeof obj.isDisposed == "function" ? obj.isDisposed() : !1;
};
goog.events = {};
goog.events.EventId = function(eventId) {
  this.id = eventId;
};
goog.events.EventId.prototype.toString = function() {
  return this.id;
};
goog.events.Event = function(type, opt_target) {
  this.type = type instanceof goog.events.EventId ? String(type) : type;
  this.currentTarget = this.target = opt_target;
  this.defaultPrevented = this.propagationStopped_ = !1;
};
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = !0;
};
goog.events.Event.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
};
goog.events.Event.stopPropagation = function(e) {
  e.stopPropagation();
};
goog.events.Event.preventDefault = function(e) {
  e.preventDefault();
};
goog.events.BrowserFeature = {TOUCH_ENABLED:!!(goog.global.navigator && goog.global.navigator.maxTouchPoints || goog.FEATURESET_YEAR < 2018 && ("ontouchstart" in goog.global || goog.global.document && document.documentElement && "ontouchstart" in document.documentElement || goog.global.navigator && goog.global.navigator.msMaxTouchPoints)), POINTER_EVENTS:goog.FEATURESET_YEAR >= 2019 || "PointerEvent" in goog.global, PASSIVE_EVENTS:goog.FEATURESET_YEAR > 2018 || function() {
  if (!goog.global.addEventListener || !Object.defineProperty) {
    return !1;
  }
  var passive = !1, options = Object.defineProperty({}, "passive", {get:function() {
    passive = !0;
  }});
  try {
    var nullFunction = function() {
    };
    goog.global.addEventListener("test", nullFunction, options);
    goog.global.removeEventListener("test", nullFunction, options);
  } catch (e) {
  }
  return passive;
}()};
goog.events.eventTypeHelpers = {};
function module$contents$goog$events$eventTypeHelpers_getVendorPrefixedName(eventName) {
  return goog.userAgent.WEBKIT ? "webkit" + eventName : eventName.toLowerCase();
}
function module$contents$goog$events$eventTypeHelpers_getPointerFallbackEventName(pointerEventName, fallbackEventName) {
  return goog.events.BrowserFeature.POINTER_EVENTS ? pointerEventName : fallbackEventName;
}
goog.events.eventTypeHelpers.getPointerFallbackEventName = module$contents$goog$events$eventTypeHelpers_getPointerFallbackEventName;
goog.events.eventTypeHelpers.getVendorPrefixedName = module$contents$goog$events$eventTypeHelpers_getVendorPrefixedName;
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", AUXCLICK:"auxclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", MOUSECANCEL:"mousecancel", SELECTIONCHANGE:"selectionchange", SELECTSTART:"selectstart", WHEEL:"wheel", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:"focusin", FOCUSOUT:"focusout", 
CHANGE:"change", RESET:"reset", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DEVICECHANGE:"devicechange", DEVICEMOTION:"devicemotion", DEVICEORIENTATION:"deviceorientation", 
DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", CANPLAY:"canplay", CANPLAYTHROUGH:"canplaythrough", DURATIONCHANGE:"durationchange", EMPTIED:"emptied", ENDED:"ended", LOADEDDATA:"loadeddata", LOADEDMETADATA:"loadedmetadata", PAUSE:"pause", PLAY:"play", PLAYING:"playing", PROGRESS:"progress", RATECHANGE:"ratechange", 
SEEKED:"seeked", SEEKING:"seeking", STALLED:"stalled", SUSPEND:"suspend", TIMEUPDATE:"timeupdate", VOLUMECHANGE:"volumechange", WAITING:"waiting", SOURCEOPEN:"sourceopen", SOURCEENDED:"sourceended", SOURCECLOSED:"sourceclosed", ABORT:"abort", UPDATE:"update", UPDATESTART:"updatestart", UPDATEEND:"updateend", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", 
ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", INSTALL:"install", ACTIVATE:"activate", FETCH:"fetch", FOREIGNFETCH:"foreignfetch", MESSAGEERROR:"messageerror", STATECHANGE:"statechange", UPDATEFOUND:"updatefound", CONTROLLERCHANGE:"controllerchange", ANIMATIONSTART:module$contents$goog$events$eventTypeHelpers_getVendorPrefixedName("AnimationStart"), ANIMATIONEND:module$contents$goog$events$eventTypeHelpers_getVendorPrefixedName("AnimationEnd"), ANIMATIONITERATION:module$contents$goog$events$eventTypeHelpers_getVendorPrefixedName("AnimationIteration"), 
TRANSITIONEND:module$contents$goog$events$eventTypeHelpers_getVendorPrefixedName("TransitionEnd"), POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", 
MSGESTURETAP:"MSGestureTap", MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXT:"text", TEXTINPUT:"textInput", COMPOSITIONSTART:"compositionstart", 
COMPOSITIONUPDATE:"compositionupdate", COMPOSITIONEND:"compositionend", BEFOREINPUT:"beforeinput", FULLSCREENCHANGE:"fullscreenchange", WEBKITBEGINFULLSCREEN:"webkitbeginfullscreen", WEBKITENDFULLSCREEN:"webkitendfullscreen", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", BEFOREPRINT:"beforeprint", 
AFTERPRINT:"afterprint", BEFOREINSTALLPROMPT:"beforeinstallprompt", APPINSTALLED:"appinstalled", CANCEL:"cancel", FINISH:"finish", REMOVE:"remove"};
goog.events.BrowserEvent = function(opt_e, opt_currentTarget) {
  goog.events.Event.call(this, opt_e ? opt_e.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.key = "";
  this.charCode = this.keyCode = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = "";
  this.timeStamp = 0;
  this.event_ = null;
  opt_e && this.init(opt_e, opt_currentTarget);
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY = !1;
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2, BACK:3, FORWARD:4};
goog.events.BrowserEvent.PointerType = {MOUSE:"mouse", PEN:"pen", TOUCH:"touch"};
goog.events.BrowserEvent.prototype.init = function(e, opt_currentTarget) {
  var type = this.type = e.type, relevantTouch = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
  this.target = e.target || e.srcElement;
  this.currentTarget = opt_currentTarget;
  var relatedTarget = e.relatedTarget;
  relatedTarget || (type == goog.events.EventType.MOUSEOVER ? relatedTarget = e.fromElement : type == goog.events.EventType.MOUSEOUT && (relatedTarget = e.toElement));
  this.relatedTarget = relatedTarget;
  relevantTouch ? (this.clientX = relevantTouch.clientX !== void 0 ? relevantTouch.clientX : relevantTouch.pageX, this.clientY = relevantTouch.clientY !== void 0 ? relevantTouch.clientY : relevantTouch.pageY, this.screenX = relevantTouch.screenX || 0, this.screenY = relevantTouch.screenY || 0) : (goog.events.BrowserEvent.USE_LAYER_XY_AS_OFFSET_XY ? (this.offsetX = e.layerX !== void 0 ? e.layerX : e.offsetX, this.offsetY = e.layerY !== void 0 ? e.layerY : e.offsetY) : (this.offsetX = goog.userAgent.WEBKIT || 
  e.offsetX !== void 0 ? e.offsetX : e.layerX, this.offsetY = goog.userAgent.WEBKIT || e.offsetY !== void 0 ? e.offsetY : e.layerY), this.clientX = e.clientX !== void 0 ? e.clientX : e.pageX, this.clientY = e.clientY !== void 0 ? e.clientY : e.pageY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 0);
  this.button = e.button;
  this.keyCode = e.keyCode || 0;
  this.key = e.key || "";
  this.charCode = e.charCode || (type == "keypress" ? e.keyCode : 0);
  this.ctrlKey = e.ctrlKey;
  this.altKey = e.altKey;
  this.shiftKey = e.shiftKey;
  this.metaKey = e.metaKey;
  this.pointerId = e.pointerId || 0;
  this.pointerType = goog.events.BrowserEvent.getPointerType_(e);
  this.state = e.state;
  this.timeStamp = e.timeStamp;
  this.event_ = e;
  e.defaultPrevented && goog.events.BrowserEvent.superClass_.preventDefault.call(this);
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0;
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var be = this.event_;
  be.preventDefault ? be.preventDefault() : be.returnValue = !1;
};
goog.events.BrowserEvent.getPointerType_ = function(e) {
  return e.pointerType;
};
goog.events.Listenable = function() {
};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (Math.random() * 1E6 | 0);
goog.events.Listenable.addImplementation = function(cls) {
  cls.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.events.Listenable.isImplementedBy = function(obj) {
  return !(!obj || !obj[goog.events.Listenable.IMPLEMENTED_BY_PROP]);
};
goog.events.Listenable.prototype.listen = function() {
};
goog.events.Listenable.prototype.listenOnce = function() {
};
goog.events.Listenable.prototype.unlisten = function() {
};
goog.events.Listenable.prototype.unlistenByKey = function() {
};
goog.events.Listenable.prototype.dispatchEvent = function() {
};
goog.events.Listenable.prototype.removeAllListeners = function() {
};
goog.events.Listenable.prototype.getParentEventTarget = function() {
};
goog.events.Listenable.prototype.fireListeners = function() {
};
goog.events.Listenable.prototype.getListeners = function() {
};
goog.events.Listenable.prototype.getListener = function() {
};
goog.events.Listenable.prototype.hasListener = function() {
};
goog.events.ListenableKey = function() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
  return ++goog.events.ListenableKey.counter_;
};
goog.events.Listener = function(listener, proxy, src, type, capture, opt_handler) {
  this.listener = listener;
  this.proxy = proxy;
  this.src = src;
  this.type = type;
  this.capture = !!capture;
  this.handler = opt_handler;
  this.key = goog.events.ListenableKey.reserveKey();
  this.removed = this.callOnce = !1;
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
  this.removed = !0;
  this.handler = this.src = this.proxy = this.listener = null;
};
function module$contents$goog$events$ListenerMap_ListenerMap(src) {
  this.src = src;
  this.listeners = {};
  this.typeCount_ = 0;
}
module$contents$goog$events$ListenerMap_ListenerMap.prototype.add = function(type, listener, callOnce, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString(), listenerArray = this.listeners[typeStr];
  listenerArray || (listenerArray = this.listeners[typeStr] = [], this.typeCount_++);
  var index = module$contents$goog$events$ListenerMap_ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (index > -1) {
    var listenerObj = listenerArray[index];
    callOnce || (listenerObj.callOnce = !1);
  } else {
    listenerObj = new goog.events.Listener(listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope), listenerObj.callOnce = callOnce, listenerArray.push(listenerObj);
  }
  return listenerObj;
};
module$contents$goog$events$ListenerMap_ListenerMap.prototype.remove = function(type, listener, opt_useCapture, opt_listenerScope) {
  var typeStr = type.toString();
  if (!(typeStr in this.listeners)) {
    return !1;
  }
  var listenerArray = this.listeners[typeStr], index = module$contents$goog$events$ListenerMap_ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);
  if (index > -1) {
    var listenerObj = listenerArray[index];
    listenerObj.markAsRemoved();
    module$contents$goog$array_removeAt(listenerArray, index);
    listenerArray.length == 0 && (delete this.listeners[typeStr], this.typeCount_--);
    return !0;
  }
  return !1;
};
module$contents$goog$events$ListenerMap_ListenerMap.prototype.removeByKey = function(listener) {
  var type = listener.type;
  if (!(type in this.listeners)) {
    return !1;
  }
  var removed = module$contents$goog$array_remove(this.listeners[type], listener);
  removed && (listener.markAsRemoved(), this.listeners[type].length == 0 && (delete this.listeners[type], this.typeCount_--));
  return removed;
};
module$contents$goog$events$ListenerMap_ListenerMap.prototype.removeAll = function(opt_type) {
  var typeStr = opt_type && opt_type.toString(), count = 0, type;
  for (type in this.listeners) {
    if (!typeStr || type == typeStr) {
      for (var listenerArray = this.listeners[type], i = 0; i < listenerArray.length; i++) {
        ++count, listenerArray[i].markAsRemoved();
      }
      delete this.listeners[type];
      this.typeCount_--;
    }
  }
  return count;
};
module$contents$goog$events$ListenerMap_ListenerMap.prototype.getListeners = function(type, capture) {
  var listenerArray = this.listeners[type.toString()], rv = [];
  if (listenerArray) {
    for (var i = 0; i < listenerArray.length; ++i) {
      var listenerObj = listenerArray[i];
      listenerObj.capture == capture && rv.push(listenerObj);
    }
  }
  return rv;
};
module$contents$goog$events$ListenerMap_ListenerMap.prototype.getListener = function(type, listener, capture, opt_listenerScope) {
  var listenerArray = this.listeners[type.toString()], i = -1;
  listenerArray && (i = module$contents$goog$events$ListenerMap_ListenerMap.findListenerIndex_(listenerArray, listener, capture, opt_listenerScope));
  return i > -1 ? listenerArray[i] : null;
};
module$contents$goog$events$ListenerMap_ListenerMap.prototype.hasListener = function(opt_type, opt_capture) {
  var hasType = opt_type !== void 0, typeStr = hasType ? opt_type.toString() : "", hasCapture = opt_capture !== void 0;
  return module$contents$goog$object_some(this.listeners, function(listenerArray) {
    for (var i = 0; i < listenerArray.length; ++i) {
      if (!(hasType && listenerArray[i].type != typeStr || hasCapture && listenerArray[i].capture != opt_capture)) {
        return !0;
      }
    }
    return !1;
  });
};
module$contents$goog$events$ListenerMap_ListenerMap.findListenerIndex_ = function(listenerArray, listener, opt_useCapture, opt_listenerScope) {
  for (var i = 0; i < listenerArray.length; ++i) {
    var listenerObj = listenerArray[i];
    if (!listenerObj.removed && listenerObj.listener == listener && listenerObj.capture == !!opt_useCapture && listenerObj.handler == opt_listenerScope) {
      return i;
    }
  }
  return -1;
};
goog.events.ListenerMap = module$contents$goog$events$ListenerMap_ListenerMap;
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (Math.random() * 1E6 | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {OFF_AND_FAIL:0, OFF_AND_SILENT:1, ON:2};
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(src, type, listener, opt_options, opt_handler) {
  if (opt_options && opt_options.once) {
    return goog.events.listenOnce(src, type, listener, opt_options, opt_handler);
  }
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      goog.events.listen(src, type[i], listener, opt_options, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
    return src.listen(type, listener, capture, opt_handler);
  }
  return goog.events.listen_(src, type, listener, !1, opt_options, opt_handler);
};
goog.events.listen_ = function(src, type, listener, callOnce, opt_options, opt_handler) {
  if (!type) {
    throw Error("Invalid event type");
  }
  var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options, listenerMap = goog.events.getListenerMap_(src);
  listenerMap || (src[goog.events.LISTENER_MAP_PROP_] = listenerMap = new module$contents$goog$events$ListenerMap_ListenerMap(src));
  var listenerObj = listenerMap.add(type, listener, callOnce, capture, opt_handler);
  if (listenerObj.proxy) {
    return listenerObj;
  }
  var proxy = goog.events.getProxy();
  listenerObj.proxy = proxy;
  proxy.src = src;
  proxy.listener = listenerObj;
  if (src.addEventListener) {
    goog.events.BrowserFeature.PASSIVE_EVENTS || (opt_options = capture), opt_options === void 0 && (opt_options = !1), src.addEventListener(type.toString(), proxy, opt_options);
  } else if (src.attachEvent) {
    src.attachEvent(goog.events.getOnString_(type.toString()), proxy);
  } else if (src.addListener && src.removeListener) {
    goog.asserts.assert(type === "change", "MediaQueryList only has a change event"), src.addListener(proxy);
  } else {
    throw Error("addEventListener and attachEvent are unavailable.");
  }
  goog.events.listenerCountEstimate_++;
  return listenerObj;
};
goog.events.getProxy = function() {
  var proxyCallbackFunction = goog.events.handleBrowserEvent_, f = function(eventObject) {
    return proxyCallbackFunction.call(f.src, f.listener, eventObject);
  };
  return f;
};
goog.events.listenOnce = function(src, type, listener, opt_options, opt_handler) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      goog.events.listenOnce(src, type[i], listener, opt_options, opt_handler);
    }
    return null;
  }
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
    return src.listenOnce(type, listener, capture, opt_handler);
  }
  return goog.events.listen_(src, type, listener, !0, opt_options, opt_handler);
};
goog.events.listenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.listen(src, listener, opt_capt, opt_handler);
};
goog.events.unlisten = function(src, type, listener, opt_options, opt_handler) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      goog.events.unlisten(src, type[i], listener, opt_options, opt_handler);
    }
    return null;
  }
  var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
  listener = goog.events.wrapListener(listener);
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlisten(type, listener, capture, opt_handler);
  }
  if (!src) {
    return !1;
  }
  var listenerMap = goog.events.getListenerMap_(src);
  if (listenerMap) {
    var listenerObj = listenerMap.getListener(type, listener, capture, opt_handler);
    if (listenerObj) {
      return goog.events.unlistenByKey(listenerObj);
    }
  }
  return !1;
};
goog.events.unlistenByKey = function(key) {
  if (typeof key === "number") {
    return !1;
  }
  var listener = key;
  if (!listener || listener.removed) {
    return !1;
  }
  var src = listener.src;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.unlistenByKey(listener);
  }
  var type = listener.type, proxy = listener.proxy;
  src.removeEventListener ? src.removeEventListener(type, proxy, listener.capture) : src.detachEvent ? src.detachEvent(goog.events.getOnString_(type), proxy) : src.addListener && src.removeListener && src.removeListener(proxy);
  goog.events.listenerCountEstimate_--;
  var listenerMap = goog.events.getListenerMap_(src);
  listenerMap ? (listenerMap.removeByKey(listener), listenerMap.typeCount_ == 0 && (listenerMap.src = null, src[goog.events.LISTENER_MAP_PROP_] = null)) : listener.markAsRemoved();
  return !0;
};
goog.events.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_handler) {
  wrapper.unlisten(src, listener, opt_capt, opt_handler);
};
goog.events.removeAll = function(obj, opt_type) {
  if (!obj) {
    return 0;
  }
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.removeAllListeners(opt_type);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  if (!listenerMap) {
    return 0;
  }
  var count = 0, typeStr = opt_type && opt_type.toString(), type;
  for (type in listenerMap.listeners) {
    if (!typeStr || type == typeStr) {
      for (var listeners = listenerMap.listeners[type].concat(), i = 0; i < listeners.length; ++i) {
        goog.events.unlistenByKey(listeners[i]) && ++count;
      }
    }
  }
  return count;
};
goog.events.getListeners = function(obj, type, capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.getListeners(type, capture);
  }
  if (!obj) {
    return [];
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return listenerMap ? listenerMap.getListeners(type, capture) : [];
};
goog.events.getListener = function(src, type, listener, opt_capt, opt_handler) {
  listener = goog.events.wrapListener(listener);
  var capture = !!opt_capt;
  if (goog.events.Listenable.isImplementedBy(src)) {
    return src.getListener(type, listener, capture, opt_handler);
  }
  if (!src) {
    return null;
  }
  var listenerMap = goog.events.getListenerMap_(src);
  return listenerMap ? listenerMap.getListener(type, listener, capture, opt_handler) : null;
};
goog.events.hasListener = function(obj, opt_type, opt_capture) {
  if (goog.events.Listenable.isImplementedBy(obj)) {
    return obj.hasListener(opt_type, opt_capture);
  }
  var listenerMap = goog.events.getListenerMap_(obj);
  return !!listenerMap && listenerMap.hasListener(opt_type, opt_capture);
};
goog.events.expose = function(e) {
  var str = [], key;
  for (key in e) {
    e[key] && e[key].id ? str.push(key + " = " + e[key] + " (" + e[key].id + ")") : str.push(key + " = " + e[key]);
  }
  return str.join("\n");
};
goog.events.getOnString_ = function(type) {
  return type in goog.events.onStringMap_ ? goog.events.onStringMap_[type] : goog.events.onStringMap_[type] = goog.events.onString_ + type;
};
goog.events.fireListeners = function(obj, type, capture, eventObject) {
  return goog.events.Listenable.isImplementedBy(obj) ? obj.fireListeners(type, capture, eventObject) : goog.events.fireListeners_(obj, type, capture, eventObject);
};
goog.events.fireListeners_ = function(obj, type, capture, eventObject) {
  var retval = !0, listenerMap = goog.events.getListenerMap_(obj);
  if (listenerMap) {
    var listenerArray = listenerMap.listeners[type.toString()];
    if (listenerArray) {
      listenerArray = listenerArray.concat();
      for (var i = 0; i < listenerArray.length; i++) {
        var listener = listenerArray[i];
        if (listener && listener.capture == capture && !listener.removed) {
          var result = goog.events.fireListener(listener, eventObject);
          retval = retval && result !== !1;
        }
      }
    }
  }
  return retval;
};
goog.events.fireListener = function(listener, eventObject) {
  var listenerFn = listener.listener, listenerHandler = listener.handler || listener.src;
  listener.callOnce && goog.events.unlistenByKey(listener);
  return listenerFn.call(listenerHandler, eventObject);
};
goog.events.getTotalListenerCount = function() {
  return goog.events.listenerCountEstimate_;
};
goog.events.dispatchEvent = function(src, e) {
  goog.asserts.assert(goog.events.Listenable.isImplementedBy(src), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
  return src.dispatchEvent(e);
};
goog.events.protectBrowserEventEntryPoint = function(errorHandler) {
  goog.events.handleBrowserEvent_ = errorHandler.protectEntryPoint(goog.events.handleBrowserEvent_);
};
goog.events.handleBrowserEvent_ = function(listener, opt_evt) {
  return listener.removed ? !0 : goog.events.fireListener(listener, new goog.events.BrowserEvent(opt_evt, this));
};
goog.events.markIeEvent_ = function(e) {
  var useReturnValue = !1;
  if (e.keyCode == 0) {
    try {
      e.keyCode = -1;
      return;
    } catch (ex) {
      useReturnValue = !0;
    }
  }
  if (useReturnValue || e.returnValue == void 0) {
    e.returnValue = !0;
  }
};
goog.events.isMarkedIeEvent_ = function(e) {
  return e.keyCode < 0 || e.returnValue != void 0;
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(identifier) {
  return identifier + "_" + goog.events.uniqueIdCounter_++;
};
goog.events.getListenerMap_ = function(src) {
  var listenerMap = src[goog.events.LISTENER_MAP_PROP_];
  return listenerMap instanceof module$contents$goog$events$ListenerMap_ListenerMap ? listenerMap : null;
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (Math.random() * 1E9 >>> 0);
goog.events.wrapListener = function(listener) {
  goog.asserts.assert(listener, "Listener can not be null.");
  if (typeof listener === "function") {
    return listener;
  }
  goog.asserts.assert(listener.handleEvent, "An object listener must have handleEvent method.");
  listener[goog.events.LISTENER_WRAPPER_PROP_] || (listener[goog.events.LISTENER_WRAPPER_PROP_] = function(e) {
    return listener.handleEvent(e);
  });
  return listener[goog.events.LISTENER_WRAPPER_PROP_];
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.events.handleBrowserEvent_ = transformer(goog.events.handleBrowserEvent_);
});
goog.events.EventHandler = function(opt_scope) {
  goog.Disposable.call(this);
  this.handler_ = opt_scope;
  this.keys_ = {};
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(src, type, opt_fn, opt_options) {
  var self = this;
  return self.listen_(src, type, opt_fn, opt_options);
};
goog.events.EventHandler.prototype.listen_ = function(src, type, opt_fn, opt_options, opt_scope) {
  var self = this;
  Array.isArray(type) || (type && (goog.events.EventHandler.typeArray_[0] = type.toString()), type = goog.events.EventHandler.typeArray_);
  for (var i = 0; i < type.length; i++) {
    var listenerObj = goog.events.listen(src, type[i], opt_fn || self.handleEvent, opt_options || !1, opt_scope || self.handler_ || self);
    if (!listenerObj) {
      break;
    }
    var key = listenerObj.key;
    self.keys_[key] = listenerObj;
  }
  return self;
};
goog.events.EventHandler.prototype.listenOnce = function(src, type, opt_fn, opt_options) {
  var self = this;
  return self.listenOnce_(src, type, opt_fn, opt_options);
};
goog.events.EventHandler.prototype.listenOnce_ = function(src, type, opt_fn, opt_options, opt_scope) {
  var self = this;
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      self.listenOnce_(src, type[i], opt_fn, opt_options, opt_scope);
    }
  } else {
    var listenerObj = goog.events.listenOnce(src, type, opt_fn || self.handleEvent, opt_options, opt_scope || self.handler_ || self);
    if (!listenerObj) {
      return self;
    }
    var key = listenerObj.key;
    self.keys_[key] = listenerObj;
  }
  return self;
};
goog.events.EventHandler.prototype.listenWithWrapper = function(src, wrapper, listener, opt_capt) {
  var self = this;
  return self.listenWithWrapper_(src, wrapper, listener, opt_capt);
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function(src, wrapper, listener, opt_capt, opt_scope) {
  var self = this;
  wrapper.listen(src, listener, opt_capt, opt_scope || self.handler_ || self, self);
  return self;
};
goog.events.EventHandler.prototype.unlisten = function(src, type, opt_fn, opt_options, opt_scope) {
  var self = this;
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      self.unlisten(src, type[i], opt_fn, opt_options, opt_scope);
    }
  } else {
    var capture = goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options, listener = goog.events.getListener(src, type, opt_fn || self.handleEvent, capture, opt_scope || self.handler_ || self);
    listener && (goog.events.unlistenByKey(listener), delete self.keys_[listener.key]);
  }
  return self;
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(src, wrapper, listener, opt_capt, opt_scope) {
  var self = this;
  wrapper.unlisten(src, listener, opt_capt, opt_scope || self.handler_ || self, self);
  return self;
};
goog.events.EventHandler.prototype.removeAll = function() {
  module$contents$goog$object_forEach(this.keys_, function(listenerObj, key) {
    this.keys_.hasOwnProperty(key) && goog.events.unlistenByKey(listenerObj);
  }, this);
  this.keys_ = {};
};
goog.events.EventHandler.prototype.disposeInternal = function() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll();
};
goog.events.EventHandler.prototype.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.events.EventTarget = function() {
  goog.Disposable.call(this);
  this.eventTargetListeners_ = new module$contents$goog$events$ListenerMap_ListenerMap(this);
  this.actualEventTarget_ = this;
  this.parentEventTarget_ = null;
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_;
};
goog.events.EventTarget.prototype.addEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.listen(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.removeEventListener = function(type, handler, opt_capture, opt_handlerScope) {
  goog.events.unlisten(this, type, handler, opt_capture, opt_handlerScope);
};
goog.events.EventTarget.prototype.dispatchEvent = function(e) {
  this.assertInitialized_();
  var ancestor = this.getParentEventTarget();
  if (ancestor) {
    var ancestorsTree = [];
    for (var ancestorCount = 1; ancestor; ancestor = ancestor.getParentEventTarget()) {
      ancestorsTree.push(ancestor), goog.asserts.assert(++ancestorCount < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    }
  }
  return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, e, ancestorsTree);
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  this.removeAllListeners();
  this.parentEventTarget_ = null;
};
goog.events.EventTarget.prototype.listen = function(type, listener, opt_useCapture, opt_listenerScope) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(String(type), listener, !1, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.listenOnce = function(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.add(String(type), listener, !0, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlisten = function(type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.remove(String(type), listener, opt_useCapture, opt_listenerScope);
};
goog.events.EventTarget.prototype.unlistenByKey = function(key) {
  return this.eventTargetListeners_.removeByKey(key);
};
goog.events.EventTarget.prototype.removeAllListeners = function(opt_type) {
  return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(opt_type) : 0;
};
goog.events.EventTarget.prototype.fireListeners = function(type, capture, eventObject) {
  var listenerArray = this.eventTargetListeners_.listeners[String(type)];
  if (!listenerArray) {
    return !0;
  }
  listenerArray = listenerArray.concat();
  for (var rv = !0, i = 0; i < listenerArray.length; ++i) {
    var listener = listenerArray[i];
    if (listener && !listener.removed && listener.capture == capture) {
      var listenerFn = listener.listener, listenerHandler = listener.handler || listener.src;
      listener.callOnce && this.unlistenByKey(listener);
      rv = listenerFn.call(listenerHandler, eventObject) !== !1 && rv;
    }
  }
  return rv && !eventObject.defaultPrevented;
};
goog.events.EventTarget.prototype.getListeners = function(type, capture) {
  return this.eventTargetListeners_.getListeners(String(type), capture);
};
goog.events.EventTarget.prototype.getListener = function(type, listener, capture, opt_listenerScope) {
  return this.eventTargetListeners_.getListener(String(type), listener, capture, opt_listenerScope);
};
goog.events.EventTarget.prototype.hasListener = function(opt_type, opt_capture) {
  var id = opt_type !== void 0 ? String(opt_type) : void 0;
  return this.eventTargetListeners_.hasListener(id, opt_capture);
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
  goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?");
};
goog.events.EventTarget.dispatchEventInternal_ = function(target, e, opt_ancestorsTree) {
  var type = e.type || e;
  if (typeof e === "string") {
    e = new goog.events.Event(e, target);
  } else if (e instanceof goog.events.Event) {
    e.target = e.target || target;
  } else {
    var oldEvent = e;
    e = new goog.events.Event(type, target);
    module$contents$goog$object_extend(e, oldEvent);
  }
  var rv = !0, i;
  if (opt_ancestorsTree) {
    for (i = opt_ancestorsTree.length - 1; !e.propagationStopped_ && i >= 0; i--) {
      var currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, !0, e) && rv;
    }
  }
  e.propagationStopped_ || (currentTarget = e.currentTarget = target, rv = currentTarget.fireListeners(type, !0, e) && rv, e.propagationStopped_ || (rv = currentTarget.fireListeners(type, !1, e) && rv));
  if (opt_ancestorsTree) {
    for (i = 0; !e.propagationStopped_ && i < opt_ancestorsTree.length; i++) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i], rv = currentTarget.fireListeners(type, !1, e) && rv;
    }
  }
  return rv;
};
function module$contents$goog$events$EventWrapper_EventWrapper() {
}
module$contents$goog$events$EventWrapper_EventWrapper.prototype.listen = function() {
};
module$contents$goog$events$EventWrapper_EventWrapper.prototype.unlisten = function() {
};
goog.events.EventWrapper = module$contents$goog$events$EventWrapper_EventWrapper;
var module$exports$google3$javascript$common$async$context$propagate = {};
module$exports$google3$javascript$common$async$context$propagate.propagateAsyncContext = typeof AsyncContext !== "undefined" && typeof AsyncContext.Snapshot === "function" ? function(fn) {
  return fn && AsyncContext.Snapshot.wrap(fn);
} : function(fn) {
  return fn;
};
goog.collections = {};
goog.collections.maps = {};
var module$contents$goog$collections$maps_MapLike = function() {
};
module$contents$goog$collections$maps_MapLike.prototype.set = function() {
};
module$contents$goog$collections$maps_MapLike.prototype.get = function() {
};
module$contents$goog$collections$maps_MapLike.prototype.keys = function() {
};
module$contents$goog$collections$maps_MapLike.prototype.values = function() {
};
module$contents$goog$collections$maps_MapLike.prototype.has = function() {
};
goog.collections.maps.MapLike = module$contents$goog$collections$maps_MapLike;
function module$contents$goog$collections$maps_setAll(map, entries) {
  if (entries) {
    for (var $jscomp$iter$18 = (0,$jscomp.makeIterator)(entries), $jscomp$key$1866876209$15$ = $jscomp$iter$18.next(); !$jscomp$key$1866876209$15$.done; $jscomp$key$1866876209$15$ = $jscomp$iter$18.next()) {
      var $jscomp$destructuring$var21 = $jscomp$key$1866876209$15$.value, $jscomp$destructuring$var22 = (0,$jscomp.makeIterator)($jscomp$destructuring$var21), k = $jscomp$destructuring$var22.next().value, v = $jscomp$destructuring$var22.next().value;
      map.set(k, v);
    }
  }
}
goog.collections.maps.setAll = module$contents$goog$collections$maps_setAll;
function module$contents$goog$collections$maps_hasValue(map, val, valueEqualityFn) {
  valueEqualityFn = valueEqualityFn === void 0 ? module$contents$goog$collections$maps_defaultEqualityFn : valueEqualityFn;
  for (var $jscomp$iter$19 = (0,$jscomp.makeIterator)(map.values()), $jscomp$key$1866876209$16$v = $jscomp$iter$19.next(); !$jscomp$key$1866876209$16$v.done; $jscomp$key$1866876209$16$v = $jscomp$iter$19.next()) {
    var v = $jscomp$key$1866876209$16$v.value;
    if (valueEqualityFn(v, val)) {
      return !0;
    }
  }
  return !1;
}
goog.collections.maps.hasValue = module$contents$goog$collections$maps_hasValue;
function module$contents$goog$collections$maps_getWithDefault(map, key, defaultValue) {
  return map.has(key) ? map.get(key) : defaultValue;
}
goog.collections.maps.getWithDefault = module$contents$goog$collections$maps_getWithDefault;
var module$contents$goog$collections$maps_defaultEqualityFn = function(a, b) {
  return a === b;
};
function module$contents$goog$collections$maps_equals(map, otherMap, valueEqualityFn) {
  valueEqualityFn = valueEqualityFn === void 0 ? module$contents$goog$collections$maps_defaultEqualityFn : valueEqualityFn;
  if (map === otherMap) {
    return !0;
  }
  if (map.size !== otherMap.size) {
    return !1;
  }
  for (var $jscomp$iter$20 = (0,$jscomp.makeIterator)(map.keys()), $jscomp$key$1866876209$17$key = $jscomp$iter$20.next(); !$jscomp$key$1866876209$17$key.done; $jscomp$key$1866876209$17$key = $jscomp$iter$20.next()) {
    var key = $jscomp$key$1866876209$17$key.value;
    if (!otherMap.has(key) || !valueEqualityFn(map.get(key), otherMap.get(key))) {
      return !1;
    }
  }
  return !0;
}
goog.collections.maps.equals = module$contents$goog$collections$maps_equals;
function module$contents$goog$collections$maps_transpose(map) {
  for (var transposed = new Map(), $jscomp$iter$21 = (0,$jscomp.makeIterator)(map.keys()), $jscomp$key$1866876209$18$key = $jscomp$iter$21.next(); !$jscomp$key$1866876209$18$key.done; $jscomp$key$1866876209$18$key = $jscomp$iter$21.next()) {
    var key = $jscomp$key$1866876209$18$key.value, val = map.get(key);
    transposed.set(val, key);
  }
  return transposed;
}
goog.collections.maps.transpose = module$contents$goog$collections$maps_transpose;
function module$contents$goog$collections$maps_toObject(map) {
  for (var obj = {}, $jscomp$iter$22 = (0,$jscomp.makeIterator)(map.keys()), $jscomp$key$1866876209$19$key = $jscomp$iter$22.next(); !$jscomp$key$1866876209$19$key.done; $jscomp$key$1866876209$19$key = $jscomp$iter$22.next()) {
    var key = $jscomp$key$1866876209$19$key.value;
    obj[key] = map.get(key);
  }
  return obj;
}
goog.collections.maps.toObject = module$contents$goog$collections$maps_toObject;
function module$contents$goog$collections$maps_clone(map) {
  return new map.constructor(map);
}
goog.collections.maps.clone = module$contents$goog$collections$maps_clone;
goog.json = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.isValid = function(s) {
  if (/^\s*$/.test(s)) {
    return !1;
  }
  var backslashesRe = /\\["\\\/bfnrtu]/g, simpleValuesRe = /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, openBracketsRe = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, remainderRe = /^[\],:{}\s\u2028\u2029]*$/;
  return remainderRe.test(s.replace(backslashesRe, "@").replace(simpleValuesRe, "]").replace(openBracketsRe, ""));
};
goog.json.errorLogger_ = function() {
};
goog.json.setErrorLogger = function(errorLogger) {
  goog.json.errorLogger_ = errorLogger;
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(s) {
  try {
    return goog.global.JSON.parse(s);
  } catch (ex) {
    var error = ex;
  }
  var o = String(s);
  if (goog.json.isValid(o)) {
    try {
      var result = eval("(" + o + ")");
      error && goog.json.errorLogger_("Invalid JSON: " + o, error);
      return result;
    } catch (ex) {
    }
  }
  throw Error("Invalid JSON string: " + o);
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(object, opt_replacer) {
  return (new goog.json.Serializer(opt_replacer)).serialize(object);
};
goog.json.Serializer = function(opt_replacer) {
  this.replacer_ = opt_replacer;
};
goog.json.Serializer.prototype.serialize = function(object) {
  var sb = [];
  this.serializeInternal(object, sb);
  return sb.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(object, sb) {
  if (object == null) {
    sb.push("null");
  } else {
    if (typeof object == "object") {
      if (Array.isArray(object)) {
        this.serializeArray(object, sb);
        return;
      }
      if (object instanceof String || object instanceof Number || object instanceof Boolean) {
        object = object.valueOf();
      } else {
        this.serializeObject_(object, sb);
        return;
      }
    }
    switch(typeof object) {
      case "string":
        this.serializeString_(object, sb);
        break;
      case "number":
        this.serializeNumber_(object, sb);
        break;
      case "boolean":
        sb.push(String(object));
        break;
      case "function":
        sb.push("null");
        break;
      default:
        throw Error("Unknown type: " + typeof object);
    }
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\v":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(s, sb) {
  sb.push('"', s.replace(goog.json.Serializer.charsToReplace_, function(c) {
    var rv = goog.json.Serializer.charToJsonCharCache_[c];
    rv || (rv = "\\u" + (c.charCodeAt(0) | 65536).toString(16).slice(1), goog.json.Serializer.charToJsonCharCache_[c] = rv);
    return rv;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(n, sb) {
  sb.push(isFinite(n) && !isNaN(n) ? String(n) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(arr, sb) {
  var l = arr.length;
  sb.push("[");
  for (var sep = "", i = 0; i < l; i++) {
    sb.push(sep);
    var value = arr[i];
    this.serializeInternal(this.replacer_ ? this.replacer_.call(arr, String(i), value) : value, sb);
    sep = ",";
  }
  sb.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(obj, sb) {
  sb.push("{");
  var sep = "", key;
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];
      typeof value != "function" && (sb.push(sep), this.serializeString_(key, sb), sb.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(obj, key, value) : value, sb), sep = ",");
    }
  }
  sb.push("}");
};
goog.json.hybrid = {};
goog.json.hybrid.stringify = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(obj) {
  if (goog.global.JSON) {
    try {
      return goog.global.JSON.stringify(obj);
    } catch (e) {
    }
  }
  return goog.json.serialize(obj);
};
goog.json.hybrid.parse_ = function(jsonString, fallbackParser) {
  if (goog.global.JSON) {
    try {
      var obj = goog.global.JSON.parse(jsonString);
      goog.asserts.assert(typeof obj == "object");
      return obj;
    } catch (e) {
    }
  }
  return fallbackParser(jsonString);
};
goog.json.hybrid.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(jsonString) {
  return goog.json.hybrid.parse_(jsonString, goog.json.parse);
};
goog.net = {};
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(errorCode) {
  switch(errorCode) {
    case goog.net.ErrorCode.NO_ERROR:
      return "No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return "Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return "File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return "Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return "Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return "An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return "Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return "Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return "Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return "The resource is not available offline";
    default:
      return "Unrecognized error code";
  }
};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress", DOWNLOAD_PROGRESS:"downloadprogress", UPLOAD_PROGRESS:"uploadprogress"};
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTI_STATUS:207, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, PERMANENT_REDIRECT:308, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, 
REQUEST_TIMEOUT:408, CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, UNPROCESSABLE_ENTITY:422, LOCKED:423, FAILED_DEPENDENCY:424, PRECONDITION_REQUIRED:428, TOO_MANY_REQUESTS:429, REQUEST_HEADER_FIELDS_TOO_LARGE:431, CLIENT_CLOSED_REQUEST:499, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, 
HTTP_VERSION_NOT_SUPPORTED:505, INSUFFICIENT_STORAGE:507, NETWORK_AUTHENTICATION_REQUIRED:511, QUIRK_IE_NO_CONTENT:1223};
goog.net.HttpStatus.isSuccess = function(status) {
  switch(status) {
    case goog.net.HttpStatus.OK:
    case goog.net.HttpStatus.CREATED:
    case goog.net.HttpStatus.ACCEPTED:
    case goog.net.HttpStatus.NO_CONTENT:
    case goog.net.HttpStatus.PARTIAL_CONTENT:
    case goog.net.HttpStatus.NOT_MODIFIED:
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return !0;
    default:
      return !1;
  }
};
goog.net.XhrLike = function() {
};
goog.net.XhrLike.prototype.open = function() {
};
goog.net.XhrLike.prototype.send = function() {
};
goog.net.XhrLike.prototype.abort = function() {
};
goog.net.XhrLike.prototype.setRequestHeader = function() {
};
goog.net.XhrLike.prototype.getResponseHeader = function() {
};
goog.net.XhrLike.prototype.getAllResponseHeaders = function() {
};
goog.net.XhrLike.prototype.setTrustToken = function() {
};
function module$contents$goog$net$XmlHttpFactory_XmlHttpFactory() {
}
goog.net.XmlHttpFactory = module$contents$goog$net$XmlHttpFactory_XmlHttpFactory;
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance();
};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.setGlobalFactory = function(factory) {
  goog.net.XmlHttp.factory_ = factory;
};
goog.net.DefaultXmlHttpFactory = function() {
};
goog.inherits(goog.net.DefaultXmlHttpFactory, module$contents$goog$net$XmlHttpFactory_XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  return new XMLHttpRequest();
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory());
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
  var out = "";
  opt_scheme && (out += opt_scheme + ":");
  opt_domain && (out += "//", opt_userInfo && (out += opt_userInfo + "@"), out += opt_domain, opt_port && (out += ":" + opt_port));
  opt_path && (out += opt_path);
  opt_queryData && (out += "?" + opt_queryData);
  opt_fragment && (out += "#" + opt_fragment);
  return out;
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.urlPackageSupportLoggingHandler_ = null;
goog.uri.utils.setUrlPackageSupportLoggingHandler = function(handler) {
  goog.uri.utils.urlPackageSupportLoggingHandler_ = handler;
};
goog.uri.utils.split = function(uri) {
  var result = uri.match(goog.uri.utils.splitRe_);
  goog.uri.utils.urlPackageSupportLoggingHandler_ && ["http", "https", "ws", "wss", "ftp"].indexOf(result[goog.uri.utils.ComponentIndex.SCHEME]) >= 0 && goog.uri.utils.urlPackageSupportLoggingHandler_(uri);
  return result;
};
goog.uri.utils.decodeIfPossible_ = function(uri, opt_preserveReserved) {
  return uri ? opt_preserveReserved ? decodeURI(uri) : decodeURIComponent(uri) : uri;
};
goog.uri.utils.getComponentByIndex_ = function(componentIndex, uri) {
  return goog.uri.utils.split(uri)[componentIndex] || null;
};
goog.uri.utils.getScheme = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, uri);
};
goog.uri.utils.getEffectiveScheme = function(uri) {
  var scheme = goog.uri.utils.getScheme(uri);
  if (!scheme && goog.global.self && goog.global.self.location) {
    var protocol = goog.global.self.location.protocol;
    scheme = protocol.slice(0, -1);
  }
  return scheme ? scheme.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, uri);
};
goog.uri.utils.getUserInfo = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(uri));
};
goog.uri.utils.getDomainEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, uri);
};
goog.uri.utils.getDomain = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(uri), !0);
};
goog.uri.utils.getPort = function(uri) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, uri)) || null;
};
goog.uri.utils.getPathEncoded = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, uri);
};
goog.uri.utils.getPath = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(uri), !0);
};
goog.uri.utils.getQueryData = function(uri) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, uri);
};
goog.uri.utils.getFragmentEncoded = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? null : uri.slice(hashIndex + 1);
};
goog.uri.utils.setFragmentEncoded = function(uri, fragment) {
  return goog.uri.utils.removeFragment(uri) + (fragment ? "#" + fragment : "");
};
goog.uri.utils.getFragment = function(uri) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(uri));
};
goog.uri.utils.getHost = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], pieces[goog.uri.utils.ComponentIndex.USER_INFO], pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getOrigin = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(pieces[goog.uri.utils.ComponentIndex.SCHEME], null, pieces[goog.uri.utils.ComponentIndex.DOMAIN], pieces[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function(uri) {
  var pieces = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, pieces[goog.uri.utils.ComponentIndex.PATH], pieces[goog.uri.utils.ComponentIndex.QUERY_DATA], pieces[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function(uri) {
  var hashIndex = uri.indexOf("#");
  return hashIndex < 0 ? uri : uri.slice(0, hashIndex);
};
goog.uri.utils.haveSameDomain = function(uri1, uri2) {
  var pieces1 = goog.uri.utils.split(uri1), pieces2 = goog.uri.utils.split(uri2);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.SCHEME] == pieces2[goog.uri.utils.ComponentIndex.SCHEME] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(uri) {
  goog.asserts.assert(uri.indexOf("#") < 0 && uri.indexOf("?") < 0, "goog.uri.utils: Fragment or query identifiers are not supported: [%s]", uri);
};
goog.uri.utils.parseQueryData = function(encodedQuery, callback) {
  if (encodedQuery) {
    for (var pairs = encodedQuery.split("&"), i = 0; i < pairs.length; i++) {
      var indexOfEquals = pairs[i].indexOf("="), value = null;
      if (indexOfEquals >= 0) {
        var name = pairs[i].substring(0, indexOfEquals);
        value = pairs[i].substring(indexOfEquals + 1);
      } else {
        name = pairs[i];
      }
      callback(name, value ? goog.string.urlDecode(value) : "");
    }
  }
};
goog.uri.utils.splitQueryData_ = function(uri) {
  var hashIndex = uri.indexOf("#");
  hashIndex < 0 && (hashIndex = uri.length);
  var questionIndex = uri.indexOf("?");
  if (questionIndex < 0 || questionIndex > hashIndex) {
    questionIndex = hashIndex;
    var queryData = "";
  } else {
    queryData = uri.substring(questionIndex + 1, hashIndex);
  }
  return [uri.slice(0, questionIndex), queryData, uri.slice(hashIndex)];
};
goog.uri.utils.joinQueryData_ = function(parts) {
  return parts[0] + (parts[1] ? "?" + parts[1] : "") + parts[2];
};
goog.uri.utils.appendQueryData_ = function(queryData, newData) {
  return newData ? queryData ? queryData + "&" + newData : newData : queryData;
};
goog.uri.utils.appendQueryDataToUri_ = function(uri, queryData) {
  if (!queryData) {
    return uri;
  }
  var parts = goog.uri.utils.splitQueryData_(uri);
  parts[1] = goog.uri.utils.appendQueryData_(parts[1], queryData);
  return goog.uri.utils.joinQueryData_(parts);
};
goog.uri.utils.appendKeyValuePairs_ = function(key, value, pairs) {
  goog.asserts.assertString(key);
  if (Array.isArray(value)) {
    goog.asserts.assertArray(value);
    for (var j = 0; j < value.length; j++) {
      goog.uri.utils.appendKeyValuePairs_(key, String(value[j]), pairs);
    }
  } else {
    value != null && pairs.push(key + (value === "" ? "" : "=" + goog.string.urlEncode(value)));
  }
};
goog.uri.utils.buildQueryData = function(keysAndValues, opt_startIndex) {
  goog.asserts.assert(Math.max(keysAndValues.length - (opt_startIndex || 0), 0) % 2 == 0, "goog.uri.utils: Key/value lists must be even in length.");
  for (var params = [], i = opt_startIndex || 0; i < keysAndValues.length; i += 2) {
    var key = keysAndValues[i];
    goog.uri.utils.appendKeyValuePairs_(key, keysAndValues[i + 1], params);
  }
  return params.join("&");
};
goog.uri.utils.buildQueryDataFromMap = function(map) {
  var params = [], key;
  for (key in map) {
    goog.uri.utils.appendKeyValuePairs_(key, map[key], params);
  }
  return params.join("&");
};
goog.uri.utils.appendParams = function(uri, var_args) {
  var queryData = arguments.length == 2 ? goog.uri.utils.buildQueryData(arguments[1], 0) : goog.uri.utils.buildQueryData(arguments, 1);
  return goog.uri.utils.appendQueryDataToUri_(uri, queryData);
};
goog.uri.utils.appendParamsFromMap = function(uri, map) {
  var queryData = goog.uri.utils.buildQueryDataFromMap(map);
  return goog.uri.utils.appendQueryDataToUri_(uri, queryData);
};
goog.uri.utils.appendParam = function(uri, key, opt_value) {
  var value = opt_value != null ? "=" + goog.string.urlEncode(opt_value) : "";
  return goog.uri.utils.appendQueryDataToUri_(uri, key + value);
};
goog.uri.utils.findParam_ = function(uri, startIndex, keyEncoded, hashOrEndIndex) {
  for (var index = startIndex, keyLength = keyEncoded.length; (index = uri.indexOf(keyEncoded, index)) >= 0 && index < hashOrEndIndex;) {
    var precedingChar = uri.charCodeAt(index - 1);
    if (precedingChar == goog.uri.utils.CharCode_.AMPERSAND || precedingChar == goog.uri.utils.CharCode_.QUESTION) {
      var followingChar = uri.charCodeAt(index + keyLength);
      if (!followingChar || followingChar == goog.uri.utils.CharCode_.EQUAL || followingChar == goog.uri.utils.CharCode_.AMPERSAND || followingChar == goog.uri.utils.CharCode_.HASH) {
        return index;
      }
    }
    index += keyLength + 1;
  }
  return -1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(uri, keyEncoded) {
  return goog.uri.utils.findParam_(uri, 0, keyEncoded, uri.search(goog.uri.utils.hashOrEndRe_)) >= 0;
};
goog.uri.utils.getParamValue = function(uri, keyEncoded) {
  var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), foundIndex = goog.uri.utils.findParam_(uri, 0, keyEncoded, hashOrEndIndex);
  if (foundIndex < 0) {
    return null;
  }
  var endPosition = uri.indexOf("&", foundIndex);
  if (endPosition < 0 || endPosition > hashOrEndIndex) {
    endPosition = hashOrEndIndex;
  }
  foundIndex += keyEncoded.length + 1;
  return goog.string.urlDecode(uri.slice(foundIndex, endPosition !== -1 ? endPosition : 0));
};
goog.uri.utils.getParamValues = function(uri, keyEncoded) {
  for (var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), position = 0, foundIndex, result = []; (foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0;) {
    position = uri.indexOf("&", foundIndex);
    if (position < 0 || position > hashOrEndIndex) {
      position = hashOrEndIndex;
    }
    foundIndex += keyEncoded.length + 1;
    result.push(goog.string.urlDecode(uri.slice(foundIndex, Math.max(position, 0))));
  }
  return result;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(uri, keyEncoded) {
  for (var hashOrEndIndex = uri.search(goog.uri.utils.hashOrEndRe_), position = 0, foundIndex, buffer = []; (foundIndex = goog.uri.utils.findParam_(uri, position, keyEncoded, hashOrEndIndex)) >= 0;) {
    buffer.push(uri.substring(position, foundIndex)), position = Math.min(uri.indexOf("&", foundIndex) + 1 || hashOrEndIndex, hashOrEndIndex);
  }
  buffer.push(uri.slice(position));
  return buffer.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function(uri, keyEncoded, value) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(uri, keyEncoded), keyEncoded, value);
};
goog.uri.utils.setParamsFromMap = function(uri, params) {
  var parts = goog.uri.utils.splitQueryData_(uri), queryData = parts[1], buffer = [];
  queryData && queryData.split("&").forEach(function(pair) {
    var indexOfEquals = pair.indexOf("="), name = indexOfEquals >= 0 ? pair.slice(0, indexOfEquals) : pair;
    params.hasOwnProperty(name) || buffer.push(pair);
  });
  parts[1] = goog.uri.utils.appendQueryData_(buffer.join("&"), goog.uri.utils.buildQueryDataFromMap(params));
  return goog.uri.utils.joinQueryData_(parts);
};
goog.uri.utils.appendPath = function(baseUri, path) {
  goog.uri.utils.assertNoFragmentsOrQueries_(baseUri);
  goog.string.endsWith(baseUri, "/") && (baseUri = baseUri.slice(0, -1));
  goog.string.startsWith(path, "/") && (path = path.slice(1));
  return "" + baseUri + "/" + path;
};
goog.uri.utils.setPath = function(uri, path) {
  goog.string.startsWith(path, "/") || (path = "/" + path);
  var parts = goog.uri.utils.split(uri);
  return goog.uri.utils.buildFromEncodedParts(parts[goog.uri.utils.ComponentIndex.SCHEME], parts[goog.uri.utils.ComponentIndex.USER_INFO], parts[goog.uri.utils.ComponentIndex.DOMAIN], parts[goog.uri.utils.ComponentIndex.PORT], path, parts[goog.uri.utils.ComponentIndex.QUERY_DATA], parts[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(uri) {
  return goog.uri.utils.setParam(uri, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.net.XhrIo = function(opt_xmlHttpFactory) {
  goog.events.EventTarget.call(this);
  this.headers = new Map();
  this.xmlHttpFactory_ = opt_xmlHttpFactory || null;
  this.active_ = !1;
  this.xhr_ = null;
  this.lastError_ = this.lastMethod_ = this.lastUri_ = "";
  this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
  this.timeoutInterval_ = 0;
  this.timeoutId_ = null;
  this.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
  this.progressEventsEnabled_ = this.withCredentials_ = !1;
  this.attributionReportingOptions_ = this.trustToken_ = null;
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.CONTENT_TRANSFER_ENCODING = "Content-Transfer-Encoding";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"];
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(url, opt_callback, opt_method, opt_content, opt_headers, opt_timeoutInterval, opt_withCredentials) {
  var x = new goog.net.XhrIo();
  goog.net.XhrIo.sendInstances_.push(x);
  opt_callback && x.listen(goog.net.EventType.COMPLETE, opt_callback);
  x.listenOnce(goog.net.EventType.READY, x.cleanupSend_);
  opt_timeoutInterval && x.setTimeoutInterval(opt_timeoutInterval);
  opt_withCredentials && x.setWithCredentials(opt_withCredentials);
  x.send(url, opt_method, opt_content, opt_headers);
  return x;
};
goog.net.XhrIo.cleanup = function() {
  for (var instances = goog.net.XhrIo.sendInstances_; instances.length;) {
    instances.pop().dispose();
  }
};
goog.net.XhrIo.protectEntryPoints = function(errorHandler) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = errorHandler.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
};
goog.net.XhrIo.prototype.cleanupSend_ = function() {
  this.dispose();
  module$contents$goog$array_remove(goog.net.XhrIo.sendInstances_, this);
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(ms) {
  this.timeoutInterval_ = Math.max(0, ms);
};
goog.net.XhrIo.prototype.setWithCredentials = function(withCredentials) {
  this.withCredentials_ = withCredentials;
};
goog.net.XhrIo.prototype.setTrustToken = function(trustToken) {
  this.trustToken_ = trustToken;
};
goog.net.XhrIo.prototype.setAttributionReporting = function(attributionReportingOptions) {
  this.attributionReportingOptions_ = attributionReportingOptions;
};
goog.net.XhrIo.prototype.send = function(url, opt_method, opt_content, opt_headers) {
  if (this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + url);
  }
  var method = opt_method ? opt_method.toUpperCase() : "GET";
  this.lastUri_ = url;
  this.lastError_ = "";
  this.lastMethod_ = method;
  this.errorDispatched_ = !1;
  this.active_ = !0;
  this.xhr_ = this.createXhr();
  this.xhr_.onreadystatechange = (0,module$exports$google3$javascript$common$async$context$propagate.propagateAsyncContext)(goog.bind(this.onReadyStateChange_, this));
  this.progressEventsEnabled_ && "onprogress" in this.xhr_ && (this.xhr_.onprogress = (0,module$exports$google3$javascript$common$async$context$propagate.propagateAsyncContext)(goog.bind(function(e) {
    this.onProgressHandler_(e, !0);
  }, this)), this.xhr_.upload && (this.xhr_.upload.onprogress = (0,module$exports$google3$javascript$common$async$context$propagate.propagateAsyncContext)(goog.bind(this.onProgressHandler_, this))));
  try {
    goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(method, String(url), !0), this.inOpen_ = !1;
  } catch (err) {
    goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + err.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, err);
    return;
  }
  var content = opt_content || "", headers = new Map(this.headers);
  if (opt_headers) {
    if (Object.getPrototypeOf(opt_headers) === Object.prototype) {
      for (var key in opt_headers) {
        headers.set(key, opt_headers[key]);
      }
    } else if (typeof opt_headers.keys === "function" && typeof opt_headers.get === "function") {
      for (var $jscomp$iter$23 = (0,$jscomp.makeIterator)(opt_headers.keys()), $jscomp$key$m71669834$54$key = $jscomp$iter$23.next(); !$jscomp$key$m71669834$54$key.done; $jscomp$key$m71669834$54$key = $jscomp$iter$23.next()) {
        var key$jscomp$0 = $jscomp$key$m71669834$54$key.value;
        headers.set(key$jscomp$0, opt_headers.get(key$jscomp$0));
      }
    } else {
      throw Error("Unknown input type for opt_headers: " + String(opt_headers));
    }
  }
  var contentTypeKey = Array.from(headers.keys()).find(function(header) {
    return goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, header);
  }), contentIsFormData = goog.global.FormData && content instanceof goog.global.FormData;
  !module$contents$goog$array_contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, method) || contentTypeKey || contentIsFormData || headers.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  for (var $jscomp$iter$24 = (0,$jscomp.makeIterator)(headers), $jscomp$key$m71669834$55$ = $jscomp$iter$24.next(); !$jscomp$key$m71669834$55$.done; $jscomp$key$m71669834$55$ = $jscomp$iter$24.next()) {
    var $jscomp$destructuring$var23 = $jscomp$key$m71669834$55$.value, $jscomp$destructuring$var24 = (0,$jscomp.makeIterator)($jscomp$destructuring$var23), key$jscomp$1 = $jscomp$destructuring$var24.next().value, value = $jscomp$destructuring$var24.next().value;
    this.xhr_.setRequestHeader(key$jscomp$1, value);
  }
  this.responseType_ && (this.xhr_.responseType = this.responseType_);
  "withCredentials" in this.xhr_ && this.xhr_.withCredentials !== this.withCredentials_ && (this.xhr_.withCredentials = this.withCredentials_);
  if ("setTrustToken" in this.xhr_ && this.trustToken_) {
    try {
      this.xhr_.setTrustToken(this.trustToken_);
    } catch (err) {
      goog.log.fine(this.logger_, this.formatMsg_("Error SetTrustToken: " + err.message));
    }
  }
  if ("setAttributionReporting" in this.xhr_ && this.attributionReportingOptions_) {
    try {
      this.xhr_.setAttributionReporting(this.attributionReportingOptions_);
    } catch (err) {
      goog.log.fine(this.logger_, this.formatMsg_("Error SetAttributionReporting: " + err.message));
    }
  }
  try {
    this.cleanUpTimeoutTimer_(), this.timeoutInterval_ > 0 && (goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete")), this.timeoutId_ = setTimeout(this.timeout_.bind(this), this.timeoutInterval_)), goog.log.fine(this.logger_, this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send(content), this.inSend_ = !1;
  } catch (err) {
    goog.log.fine(this.logger_, this.formatMsg_("Send error: " + err.message)), this.error_(goog.net.ErrorCode.EXCEPTION, err);
  }
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp();
};
goog.net.XhrIo.prototype.timeout_ = function() {
  typeof goog != "undefined" && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", goog.log.fine(this.logger_, this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT));
};
goog.net.XhrIo.prototype.error_ = function(errorCode, err) {
  this.active_ = !1;
  this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
  this.lastError_ = err;
  this.dispatchErrors_();
  this.cleanUpXhr_();
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR));
};
goog.net.XhrIo.prototype.abort = function() {
  this.xhr_ && this.active_ && (goog.log.fine(this.logger_, this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_());
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
  goog.net.XhrIo.superClass_.disposeInternal.call(this);
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if (!this.isDisposed()) {
    if (this.inOpen_ || this.inSend_ || this.inAbort_) {
      this.onReadyStateChangeHelper_();
    } else {
      this.onReadyStateChangeEntryPoint_();
    }
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_();
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if (this.active_ && typeof goog != "undefined") {
    if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
      setTimeout(this.onReadyStateChange_.bind(this), 0);
    } else {
      if (this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE), this.isComplete()) {
        goog.log.fine(this.logger_, this.formatMsg_("Request complete"));
        this.active_ = !1;
        try {
          this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_());
        } finally {
          this.cleanUpXhr_();
        }
      }
    }
  }
};
goog.net.XhrIo.prototype.onProgressHandler_ = function(e, opt_isDownload) {
  goog.asserts.assert(e.type === goog.net.EventType.PROGRESS, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
  this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(e, goog.net.EventType.PROGRESS));
  this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(e, opt_isDownload ? goog.net.EventType.DOWNLOAD_PROGRESS : goog.net.EventType.UPLOAD_PROGRESS));
};
goog.net.XhrIo.buildProgressEvent_ = function(e, eventType) {
  return {type:eventType, lengthComputable:e.lengthComputable, loaded:e.loaded, total:e.total};
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(opt_fromDispose) {
  if (this.xhr_) {
    this.cleanUpTimeoutTimer_();
    var xhr = this.xhr_;
    this.xhr_ = null;
    opt_fromDispose || this.dispatchEvent(goog.net.EventType.READY);
    try {
      xhr.onreadystatechange = null;
    } catch (e) {
      goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + e.message);
    }
  }
};
goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function() {
  this.timeoutId_ && (clearTimeout(this.timeoutId_), this.timeoutId_ = null);
};
goog.net.XhrIo.prototype.isActive = function() {
  return !!this.xhr_;
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE;
};
goog.net.XhrIo.prototype.isSuccess = function() {
  var status = this.getStatus();
  return goog.net.HttpStatus.isSuccess(status) || status === 0 && !this.isLastUriEffectiveSchemeHttp_();
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var scheme = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
  return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(scheme);
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED;
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1;
  } catch (e) {
    return -1;
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : "";
  } catch (e) {
    return goog.log.fine(this.logger_, "Can not get status: " + e.message), "";
  }
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : "";
  } catch (e) {
    return goog.log.fine(this.logger_, "Can not get responseText: " + e.message), "";
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(key) {
  if (this.xhr_ && this.isComplete()) {
    var value = this.xhr_.getResponseHeader(key);
    return value === null ? void 0 : value;
  }
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.getReadyState() >= goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.getAllResponseHeaders() || "" : "";
};
goog.net.XhrIo.prototype.formatMsg_ = function(msg) {
  return msg + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]";
};
goog.debug.entryPointRegistry.register(function(transformer) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = transformer(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
});
goog.structs = {};
goog.structs.getCount = function(col) {
  return col.getCount && typeof col.getCount == "function" ? col.getCount() : goog.isArrayLike(col) || typeof col === "string" ? col.length : module$contents$goog$object_getCount(col);
};
goog.structs.getValues = function(col) {
  if (col.getValues && typeof col.getValues == "function") {
    return col.getValues();
  }
  if (typeof Map !== "undefined" && col instanceof Map || typeof Set !== "undefined" && col instanceof Set) {
    return Array.from(col.values());
  }
  if (typeof col === "string") {
    return col.split("");
  }
  if (goog.isArrayLike(col)) {
    for (var rv = [], l = col.length, i = 0; i < l; i++) {
      rv.push(col[i]);
    }
    return rv;
  }
  return module$contents$goog$object_getValues(col);
};
goog.structs.getKeys = function(col) {
  if (col.getKeys && typeof col.getKeys == "function") {
    return col.getKeys();
  }
  if (!col.getValues || typeof col.getValues != "function") {
    if (typeof Map !== "undefined" && col instanceof Map) {
      return Array.from(col.keys());
    }
    if (!(typeof Set !== "undefined" && col instanceof Set)) {
      if (goog.isArrayLike(col) || typeof col === "string") {
        for (var rv = [], l = col.length, i = 0; i < l; i++) {
          rv.push(i);
        }
        return rv;
      }
      return module$contents$goog$object_getKeys(col);
    }
  }
};
goog.structs.contains = function(col, val) {
  return col.contains && typeof col.contains == "function" ? col.contains(val) : col.containsValue && typeof col.containsValue == "function" ? col.containsValue(val) : goog.isArrayLike(col) || typeof col === "string" ? module$contents$goog$array_contains(col, val) : module$contents$goog$object_containsValue(col, val);
};
goog.structs.isEmpty = function(col) {
  return col.isEmpty && typeof col.isEmpty == "function" ? col.isEmpty() : goog.isArrayLike(col) || typeof col === "string" ? col.length === 0 : module$contents$goog$object_isEmpty(col);
};
goog.structs.clear = function(col) {
  col.clear && typeof col.clear == "function" ? col.clear() : goog.isArrayLike(col) ? module$contents$goog$array_clear(col) : module$contents$goog$object_clear(col);
};
goog.structs.forEach = function(col, f, opt_obj) {
  if (col.forEach && typeof col.forEach == "function") {
    col.forEach(f, opt_obj);
  } else if (goog.isArrayLike(col) || typeof col === "string") {
    Array.prototype.forEach.call(col, f, opt_obj);
  } else {
    for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0; i < l; i++) {
      f.call(opt_obj, values[i], keys && keys[i], col);
    }
  }
};
goog.structs.filter = function(col, f, opt_obj) {
  if (typeof col.filter == "function") {
    return col.filter(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.filter.call(col, f, opt_obj);
  }
  var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if (keys) {
    var rv = {};
    for (var i = 0; i < l; i++) {
      f.call(opt_obj, values[i], keys[i], col) && (rv[keys[i]] = values[i]);
    }
  } else {
    rv = [];
    for (var i$jscomp$0 = 0; i$jscomp$0 < l; i$jscomp$0++) {
      f.call(opt_obj, values[i$jscomp$0], void 0, col) && rv.push(values[i$jscomp$0]);
    }
  }
  return rv;
};
goog.structs.map = function(col, f, opt_obj) {
  if (typeof col.map == "function") {
    return col.map(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.map.call(col, f, opt_obj);
  }
  var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length;
  if (keys) {
    var rv = {};
    for (var i = 0; i < l; i++) {
      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col);
    }
  } else {
    rv = [];
    for (var i$jscomp$0 = 0; i$jscomp$0 < l; i$jscomp$0++) {
      rv[i$jscomp$0] = f.call(opt_obj, values[i$jscomp$0], void 0, col);
    }
  }
  return rv;
};
goog.structs.some = function(col, f, opt_obj) {
  if (typeof col.some == "function") {
    return col.some(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.some.call(col, f, opt_obj);
  }
  for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0; i < l; i++) {
    if (f.call(opt_obj, values[i], keys && keys[i], col)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function(col, f, opt_obj) {
  if (typeof col.every == "function") {
    return col.every(f, opt_obj);
  }
  if (goog.isArrayLike(col) || typeof col === "string") {
    return Array.prototype.every.call(col, f, opt_obj);
  }
  for (var keys = goog.structs.getKeys(col), values = goog.structs.getValues(col), l = values.length, i = 0; i < l; i++) {
    if (!f.call(opt_obj, values[i], keys && keys[i], col)) {
      return !1;
    }
  }
  return !0;
};
goog.Uri = function(opt_uri, opt_ignoreCase) {
  this.domain_ = this.userInfo_ = this.scheme_ = "";
  this.port_ = null;
  this.fragment_ = this.path_ = "";
  this.ignoreCase_ = this.isReadOnly_ = !1;
  var m;
  opt_uri instanceof goog.Uri ? (this.ignoreCase_ = opt_ignoreCase !== void 0 ? opt_ignoreCase : opt_uri.ignoreCase_, this.setScheme(opt_uri.getScheme()), this.setUserInfo(opt_uri.getUserInfo()), this.setDomain(opt_uri.getDomain()), this.setPort(opt_uri.getPort()), this.setPath(opt_uri.getPath()), this.setQueryData(opt_uri.getQueryData().clone()), this.setFragment(opt_uri.getFragment())) : opt_uri && (m = goog.uri.utils.split(String(opt_uri))) ? (this.ignoreCase_ = !!opt_ignoreCase, this.setScheme(m[goog.uri.utils.ComponentIndex.SCHEME] || 
  "", !0), this.setUserInfo(m[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain(m[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(m[goog.uri.utils.ComponentIndex.PORT]), this.setPath(m[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(m[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(m[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!opt_ignoreCase, this.queryData_ = new goog.Uri.QueryData(null, this.ignoreCase_));
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.toString = function() {
  var out = [], scheme = this.getScheme();
  scheme && out.push(goog.Uri.encodeSpecialChars_(scheme, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
  var domain = this.getDomain();
  if (domain || scheme == "file") {
    out.push("//");
    var userInfo = this.getUserInfo();
    userInfo && out.push(goog.Uri.encodeSpecialChars_(userInfo, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@");
    out.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(domain)));
    var port = this.getPort();
    port != null && out.push(":", String(port));
  }
  var path = this.getPath();
  path && (this.hasDomain() && path.charAt(0) != "/" && out.push("/"), out.push(goog.Uri.encodeSpecialChars_(path, path.charAt(0) == "/" ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0)));
  var query = this.getEncodedQuery();
  query && out.push("?", query);
  var fragment = this.getFragment();
  fragment && out.push("#", goog.Uri.encodeSpecialChars_(fragment, goog.Uri.reDisallowedInFragment_));
  return out.join("");
};
goog.Uri.prototype.resolve = function(relativeUri) {
  var absoluteUri = this.clone(), overridden = relativeUri.hasScheme();
  overridden ? absoluteUri.setScheme(relativeUri.getScheme()) : overridden = relativeUri.hasUserInfo();
  overridden ? absoluteUri.setUserInfo(relativeUri.getUserInfo()) : overridden = relativeUri.hasDomain();
  overridden ? absoluteUri.setDomain(relativeUri.getDomain()) : overridden = relativeUri.hasPort();
  var path = relativeUri.getPath();
  if (overridden) {
    absoluteUri.setPort(relativeUri.getPort());
  } else {
    if (overridden = relativeUri.hasPath()) {
      if (path.charAt(0) != "/") {
        if (this.hasDomain() && !this.hasPath()) {
          path = "/" + path;
        } else {
          var lastSlashIndex = absoluteUri.getPath().lastIndexOf("/");
          lastSlashIndex != -1 && (path = absoluteUri.getPath().slice(0, lastSlashIndex + 1) + path);
        }
      }
      path = goog.Uri.removeDotSegments(path);
    }
  }
  overridden ? absoluteUri.setPath(path) : overridden = relativeUri.hasQuery();
  overridden ? absoluteUri.setQueryData(relativeUri.getQueryData().clone()) : overridden = relativeUri.hasFragment();
  overridden && absoluteUri.setFragment(relativeUri.getFragment());
  return absoluteUri;
};
goog.Uri.prototype.clone = function() {
  return new goog.Uri(this);
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_;
};
goog.Uri.prototype.setScheme = function(newScheme, opt_decode) {
  this.enforceReadOnly();
  if (this.scheme_ = opt_decode ? goog.Uri.decodeOrEmpty_(newScheme, !0) : newScheme) {
    this.scheme_ = this.scheme_.replace(/:$/, "");
  }
  return this;
};
goog.Uri.prototype.hasScheme = function() {
  return !!this.scheme_;
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_;
};
goog.Uri.prototype.setUserInfo = function(newUserInfo, opt_decode) {
  this.enforceReadOnly();
  this.userInfo_ = opt_decode ? goog.Uri.decodeOrEmpty_(newUserInfo) : newUserInfo;
  return this;
};
goog.Uri.prototype.hasUserInfo = function() {
  return !!this.userInfo_;
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_;
};
goog.Uri.prototype.setDomain = function(newDomain, opt_decode) {
  this.enforceReadOnly();
  this.domain_ = opt_decode ? goog.Uri.decodeOrEmpty_(newDomain, !0) : newDomain;
  return this;
};
goog.Uri.prototype.hasDomain = function() {
  return !!this.domain_;
};
goog.Uri.prototype.getPort = function() {
  return this.port_;
};
goog.Uri.prototype.setPort = function(newPort) {
  this.enforceReadOnly();
  if (newPort) {
    newPort = Number(newPort);
    if (isNaN(newPort) || newPort < 0) {
      throw Error("Bad port number " + newPort);
    }
    this.port_ = newPort;
  } else {
    this.port_ = null;
  }
  return this;
};
goog.Uri.prototype.hasPort = function() {
  return this.port_ != null;
};
goog.Uri.prototype.getPath = function() {
  return this.path_;
};
goog.Uri.prototype.setPath = function(newPath, opt_decode) {
  this.enforceReadOnly();
  this.path_ = opt_decode ? goog.Uri.decodeOrEmpty_(newPath, !0) : newPath;
  return this;
};
goog.Uri.prototype.hasPath = function() {
  return !!this.path_;
};
goog.Uri.prototype.hasQuery = function() {
  return this.queryData_.toString() !== "";
};
goog.Uri.prototype.setQueryData = function(queryData, opt_decode) {
  this.enforceReadOnly();
  queryData instanceof goog.Uri.QueryData ? (this.queryData_ = queryData, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (opt_decode || (queryData = goog.Uri.encodeSpecialChars_(queryData, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(queryData, this.ignoreCase_));
  return this;
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString();
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_;
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery();
};
goog.Uri.prototype.setParameterValue = function(key, value) {
  this.enforceReadOnly();
  this.queryData_.set(key, value);
  return this;
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_;
};
goog.Uri.prototype.setFragment = function(newFragment, opt_decode) {
  this.enforceReadOnly();
  this.fragment_ = opt_decode ? goog.Uri.decodeOrEmpty_(newFragment) : newFragment;
  return this;
};
goog.Uri.prototype.hasFragment = function() {
  return !!this.fragment_;
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this;
};
goog.Uri.prototype.removeParameter = function(key) {
  this.enforceReadOnly();
  this.queryData_.remove(key);
  return this;
};
goog.Uri.prototype.enforceReadOnly = function() {
  if (this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function(ignoreCase) {
  this.ignoreCase_ = ignoreCase;
  this.queryData_ && this.queryData_.setIgnoreCase(ignoreCase);
  return this;
};
goog.Uri.parse = function(uri, opt_ignoreCase) {
  return uri instanceof goog.Uri ? uri.clone() : new goog.Uri(uri, opt_ignoreCase);
};
goog.Uri.create = function(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_query, opt_fragment, opt_ignoreCase) {
  var uri = new goog.Uri(null, opt_ignoreCase);
  opt_scheme && uri.setScheme(opt_scheme);
  opt_userInfo && uri.setUserInfo(opt_userInfo);
  opt_domain && uri.setDomain(opt_domain);
  opt_port && uri.setPort(opt_port);
  opt_path && uri.setPath(opt_path);
  opt_query && uri.setQueryData(opt_query);
  opt_fragment && uri.setFragment(opt_fragment);
  return uri;
};
goog.Uri.resolve = function(base, rel) {
  base instanceof goog.Uri || (base = goog.Uri.parse(base));
  rel instanceof goog.Uri || (rel = goog.Uri.parse(rel));
  return base.resolve(rel);
};
goog.Uri.removeDotSegments = function(path) {
  if (path == ".." || path == ".") {
    return "";
  }
  if (goog.string.contains(path, "./") || goog.string.contains(path, "/.")) {
    for (var leadingSlash = goog.string.startsWith(path, "/"), segments = path.split("/"), out = [], pos = 0; pos < segments.length;) {
      var segment = segments[pos++];
      segment == "." ? leadingSlash && pos == segments.length && out.push("") : segment == ".." ? ((out.length > 1 || out.length == 1 && out[0] != "") && out.pop(), leadingSlash && pos == segments.length && out.push("")) : (out.push(segment), leadingSlash = !0);
    }
    return out.join("/");
  }
  return path;
};
goog.Uri.decodeOrEmpty_ = function(val, opt_preserveReserved) {
  return val ? opt_preserveReserved ? decodeURI(val.replace(/%25/g, "%2525")) : decodeURIComponent(val) : "";
};
goog.Uri.encodeSpecialChars_ = function(unescapedPart, extra, opt_removeDoubleEncoding) {
  if (typeof unescapedPart === "string") {
    var encoded = encodeURI(unescapedPart).replace(extra, goog.Uri.encodeChar_);
    opt_removeDoubleEncoding && (encoded = goog.Uri.removeDoubleEncoding_(encoded));
    return encoded;
  }
  return null;
};
goog.Uri.encodeChar_ = function(ch) {
  var n = ch.charCodeAt(0);
  return "%" + (n >> 4 & 15).toString(16) + (n & 15).toString(16);
};
goog.Uri.removeDoubleEncoding_ = function(doubleEncodedString) {
  return doubleEncodedString.replace(/%25([0-9a-fA-F]{2})/g, "%$1");
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(uri1String, uri2String) {
  var pieces1 = goog.uri.utils.split(uri1String), pieces2 = goog.uri.utils.split(uri2String);
  return pieces1[goog.uri.utils.ComponentIndex.DOMAIN] == pieces2[goog.uri.utils.ComponentIndex.DOMAIN] && pieces1[goog.uri.utils.ComponentIndex.PORT] == pieces2[goog.uri.utils.ComponentIndex.PORT];
};
goog.Uri.QueryData = function(opt_query, opt_ignoreCase) {
  this.count_ = this.keyMap_ = null;
  this.encodedQuery_ = opt_query || null;
  this.ignoreCase_ = !!opt_ignoreCase;
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if (!this.keyMap_ && (this.keyMap_ = new Map(), this.count_ = 0, this.encodedQuery_)) {
    var self = this;
    goog.uri.utils.parseQueryData(this.encodedQuery_, function(name, value) {
      self.add(goog.string.urlDecode(name), value);
    });
  }
};
goog.Uri.QueryData.createFromMap = function(map, opt_ignoreCase) {
  var keys = goog.structs.getKeys(map);
  if (typeof keys == "undefined") {
    throw Error("Keys are undefined");
  }
  for (var queryData = new goog.Uri.QueryData(null, opt_ignoreCase), values = goog.structs.getValues(map), i = 0; i < keys.length; i++) {
    var key = keys[i], value = values[i];
    Array.isArray(value) ? queryData.setValues(key, value) : queryData.add(key, value);
  }
  return queryData;
};
goog.Uri.QueryData.createFromKeysValues = function(keys, values, opt_ignoreCase) {
  if (keys.length != values.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  for (var queryData = new goog.Uri.QueryData(null, opt_ignoreCase), i = 0; i < keys.length; i++) {
    queryData.add(keys[i], values[i]);
  }
  return queryData;
};
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_;
};
goog.Uri.QueryData.prototype.add = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  var values = this.keyMap_.get(key);
  values || this.keyMap_.set(key, values = []);
  values.push(value);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.remove = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.has(key) ? (this.invalidateCache_(), this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(key).length, this.keyMap_.delete(key)) : !1;
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0;
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return this.count_ == 0;
};
goog.Uri.QueryData.prototype.containsKey = function(key) {
  this.ensureKeyMapInitialized_();
  key = this.getKeyName_(key);
  return this.keyMap_.has(key);
};
goog.Uri.QueryData.prototype.containsValue = function(value) {
  var vals = this.getValues();
  return module$contents$goog$array_contains(vals, value);
};
goog.Uri.QueryData.prototype.forEach = function(f, opt_scope) {
  this.ensureKeyMapInitialized_();
  this.keyMap_.forEach(function(values, key) {
    values.forEach(function(value) {
      f.call(opt_scope, value, key, this);
    }, this);
  }, this);
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  for (var vals = Array.from(this.keyMap_.values()), keys = Array.from(this.keyMap_.keys()), rv = [], i = 0; i < keys.length; i++) {
    for (var val = vals[i], j = 0; j < val.length; j++) {
      rv.push(keys[i]);
    }
  }
  return rv;
};
goog.Uri.QueryData.prototype.getValues = function(opt_key) {
  this.ensureKeyMapInitialized_();
  var rv = [];
  if (typeof opt_key === "string") {
    this.containsKey(opt_key) && (rv = rv.concat(this.keyMap_.get(this.getKeyName_(opt_key))));
  } else {
    for (var values = Array.from(this.keyMap_.values()), i = 0; i < values.length; i++) {
      rv = rv.concat(values[i]);
    }
  }
  return rv;
};
goog.Uri.QueryData.prototype.set = function(key, value) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  key = this.getKeyName_(key);
  this.containsKey(key) && (this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(key).length);
  this.keyMap_.set(key, [value]);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.get = function(key, opt_default) {
  if (!key) {
    return opt_default;
  }
  var values = this.getValues(key);
  return values.length > 0 ? String(values[0]) : opt_default;
};
goog.Uri.QueryData.prototype.setValues = function(key, values) {
  this.remove(key);
  values.length > 0 && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(key), module$contents$goog$array_toArray(values)), this.count_ = goog.asserts.assertNumber(this.count_) + values.length);
};
goog.Uri.QueryData.prototype.toString = function() {
  if (this.encodedQuery_) {
    return this.encodedQuery_;
  }
  if (!this.keyMap_) {
    return "";
  }
  for (var sb = [], keys = Array.from(this.keyMap_.keys()), i = 0; i < keys.length; i++) {
    for (var key = keys[i], encodedKey = goog.string.urlEncode(key), val = this.getValues(key), j = 0; j < val.length; j++) {
      var param = encodedKey;
      val[j] !== "" && (param += "=" + goog.string.urlEncode(val[j]));
      sb.push(param);
    }
  }
  return this.encodedQuery_ = sb.join("&");
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  this.encodedQuery_ = null;
};
goog.Uri.QueryData.prototype.clone = function() {
  var rv = new goog.Uri.QueryData();
  rv.encodedQuery_ = this.encodedQuery_;
  this.keyMap_ && (rv.keyMap_ = new Map(this.keyMap_), rv.count_ = this.count_);
  return rv;
};
goog.Uri.QueryData.prototype.getKeyName_ = function(arg) {
  var keyName = String(arg);
  this.ignoreCase_ && (keyName = keyName.toLowerCase());
  return keyName;
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(ignoreCase) {
  var resetKeys = ignoreCase && !this.ignoreCase_;
  resetKeys && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function(value, key) {
    var lowerCase = key.toLowerCase();
    key != lowerCase && (this.remove(key), this.setValues(lowerCase, value));
  }, this));
  this.ignoreCase_ = ignoreCase;
};
goog.Uri.QueryData.prototype.extend = function(var_args) {
  for (var i = 0; i < arguments.length; i++) {
    var data = arguments[i];
    goog.structs.forEach(data, function(value, key) {
      this.add(key, value);
    }, this);
  }
};
var google3 = {apphosting:{}};
google3.apphosting.tools = {};
google3.apphosting.tools.javascript = {};
google3.apphosting.tools.javascript.dev$2dchannel = {};
google3.apphosting.tools.javascript.dev$2dchannel.DevChannel = function(token) {
  this.token_ = token;
};
google3.apphosting.tools.javascript.dev$2dchannel.DevChannel.prototype.open = function(opt_handler) {
  opt_handler = opt_handler || new google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler();
  return new google3.apphosting.tools.javascript.dev$2dchannel.DevSocket(this.token_, opt_handler);
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket = function(token, handler) {
  this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.CONNECTING;
  this.token_ = token;
  this.applicationKey_ = token.substring(token.lastIndexOf("-") + 1);
  this.clientId_ = null;
  this.onopen = handler.onopen;
  this.onmessage = handler.onmessage;
  this.onerror = handler.onerror;
  this.onclose = handler.onclose;
  this.win_ = goog.dom.getWindow();
  this.pollingTimer_ = null;
  goog.net.XhrIo.send(this.getUrl_("connect"), goog.bind(this.connect_, this));
  goog.events.listen(this.win_, "beforeunload", goog.bind(this.beforeunload_, this));
  if (!document.body) {
    throw "document.body is not defined -- do not create socket from script in <head>.";
  }
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.getUrl_ = function(command) {
  var url = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.BASE_URL + "dev?command=" + command + "&channel=" + this.token_;
  this.clientId_ && (url += "&client=" + this.clientId_);
  return url;
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.connect_ = function(e) {
  var xhr = e.target;
  if (xhr.isSuccess()) {
    this.clientId_ = xhr.getResponseText(), this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.OPEN, this.onopen(), this.pollingTimer_ = this.win_.setTimeout(goog.bind(this.poll_, this), google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.POLLING_TIMEOUT_MS);
  } else {
    this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.CLOSING;
    var evt = {};
    evt.description = xhr.getStatusText();
    evt.code = xhr.getStatus();
    this.onerror(evt);
    this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.CLOSED;
    this.onclose();
  }
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.disconnect_ = function() {
  this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.CLOSED;
  this.onclose();
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.forwardMessage_ = function(e) {
  var xhr = e.target;
  if (xhr.isSuccess()) {
    var evt = {};
    evt.data = xhr.getResponseText();
    if (evt.data.length) {
      this.onmessage(evt);
    }
    this.readyState == google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.OPEN && (this.pollingTimer_ = this.win_.setTimeout(goog.bind(this.poll_, this), google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.POLLING_TIMEOUT_MS));
  } else {
    var evt$jscomp$0 = {};
    evt$jscomp$0.description = xhr.getStatusText();
    evt$jscomp$0.code = xhr.getStatus();
    this.onerror(evt$jscomp$0);
    this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.CLOSED;
    this.onclose();
  }
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.poll_ = function() {
  goog.net.XhrIo.send(this.getUrl_("poll"), goog.bind(this.forwardMessage_, this));
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.beforeunload_ = function() {
  var xhr = goog.net.XmlHttp();
  xhr.open("GET", this.getUrl_("disconnect"), !1);
  xhr.send();
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.forwardSendComplete_ = function(e) {
  var xhr = e.target;
  if (!xhr.isSuccess()) {
    var evt = {};
    evt.description = xhr.getStatusText();
    evt.code = xhr.getStatus();
    this.onerror(evt);
  }
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.send = function(data) {
  if (this.readyState != google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.OPEN) {
    return !1;
  }
  var url = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.BASE_URL + "receive", sendData = new goog.Uri.QueryData();
  sendData.set("key", this.applicationKey_);
  sendData.set("msg", data);
  goog.net.XhrIo.send(url, goog.bind(this.forwardSendComplete_, this), "POST", sendData.toString());
  return !0;
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.close = function() {
  this.readyState = google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState.CLOSING;
  this.pollingTimer_ && this.win_.clearTimeout(this.pollingTimer_);
  goog.net.XhrIo.send(this.getUrl_("disconnect"), goog.bind(this.disconnect_, this));
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.POLLING_TIMEOUT_MS = 500;
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.BASE_URL = "/_ah/channel/";
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState = {CONNECTING:0, OPEN:1, CLOSING:2, CLOSED:3};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler = function() {
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onopen = function() {
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onmessage = function() {
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onerror = function() {
};
google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onclose = function() {
};
goog.exportSymbol("goog.appengine.Channel", google3.apphosting.tools.javascript.dev$2dchannel.DevChannel);
goog.exportSymbol("goog.appengine.Channel.prototype.open", google3.apphosting.tools.javascript.dev$2dchannel.DevChannel.prototype.open);
goog.exportSymbol("goog.appengine.Socket.Handler", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler);
goog.exportSymbol("goog.appengine.Socket.Handler.prototype.onopen", google3.apphosting.tools.javascript.dev$2dchannel.DevChannel.prototype.onopen);
goog.exportSymbol("goog.appengine.Socket.Handler.prototype.onmessage", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onmessage);
goog.exportSymbol("goog.appengine.Socket.Handler.prototype.onerror", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onerror);
goog.exportSymbol("goog.appengine.Socket.Handler.prototype.onclose", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.Handler.prototype.onclose);
goog.exportSymbol("goog.appengine.Socket", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket);
goog.exportSymbol("goog.appengine.Socket.ReadyState", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.ReadyState);
goog.exportSymbol("goog.appengine.Socket.prototype.send", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.send);
goog.exportSymbol("goog.appengine.Socket.prototype.close", google3.apphosting.tools.javascript.dev$2dchannel.DevSocket.prototype.close);
}).call(this);
