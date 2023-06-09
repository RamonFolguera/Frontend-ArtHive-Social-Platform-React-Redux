import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-CY3FF6ON.js";
import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/@restart/hooks/esm/useMergedRefs.js
var import_react = __toESM(require_react());
var toFnRef = function toFnRef2(ref) {
  return !ref || typeof ref === "function" ? ref : function(value) {
    ref.current = value;
  };
};
function mergeRefs(refA, refB) {
  var a = toFnRef(refA);
  var b = toFnRef(refB);
  return function(value) {
    if (a)
      a(value);
    if (b)
      b(value);
  };
}
function useMergedRefs(refA, refB) {
  return (0, import_react.useMemo)(function() {
    return mergeRefs(refA, refB);
  }, [refA, refB]);
}
var useMergedRefs_default = useMergedRefs;

// node_modules/@restart/hooks/esm/useEventCallback.js
var import_react3 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react2 = __toESM(require_react());
function useCommittedRef(value) {
  var ref = (0, import_react2.useRef)(value);
  (0, import_react2.useEffect)(function() {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn) {
  var ref = useCommittedRef_default(fn);
  return (0, import_react3.useCallback)(function() {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}

// node_modules/react-bootstrap/esm/createWithBsPrefix.js
var import_classnames = __toESM(require_classnames());

// node_modules/dom-helpers/esm/camelize.js
var rHyphen = /-(.)/g;
function camelize(string) {
  return string.replace(rHyphen, function(_, chr) {
    return chr.toUpperCase();
  });
}

// node_modules/react-bootstrap/esm/createWithBsPrefix.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);
function createWithBsPrefix(prefix, {
  displayName = pascalCase(prefix),
  Component,
  defaultProps
} = {}) {
  const BsComponent = React.forwardRef(({
    className,
    bsPrefix,
    as: Tag = Component || "div",
    ...props
  }, ref) => {
    const componentProps = {
      ...defaultProps,
      ...props
    };
    const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
    return (0, import_jsx_runtime.jsx)(Tag, {
      ref,
      className: (0, import_classnames.default)(className, resolvedPrefix),
      ...componentProps
    });
  });
  BsComponent.displayName = displayName;
  return BsComponent;
}

// node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

// node_modules/@restart/ui/esm/DataKey.js
var ATTRIBUTE_PREFIX = `data-rr-ui-`;
var PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}

// node_modules/@restart/hooks/esm/useMounted.js
var import_react4 = __toESM(require_react());
function useMounted() {
  var mounted = (0, import_react4.useRef)(true);
  var isMounted = (0, import_react4.useRef)(function() {
    return mounted.current;
  });
  (0, import_react4.useEffect)(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react5 = __toESM(require_react());
function usePrevious(value) {
  var ref = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(function() {
    ref.current = value;
  });
  return ref.current;
}

// node_modules/@restart/hooks/esm/useIsomorphicEffect.js
var import_react6 = __toESM(require_react());
var isReactNative = typeof global !== "undefined" && // @ts-ignore
global.navigator && // @ts-ignore
global.navigator.product === "ReactNative";
var isDOM = typeof document !== "undefined";
var useIsomorphicEffect_default = isDOM || isReactNative ? import_react6.useLayoutEffect : import_react6.useEffect;

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

export {
  _inheritsLoose,
  qsa,
  useMergedRefs_default,
  dataAttr,
  dataProp,
  useCommittedRef_default,
  useEventCallback,
  createWithBsPrefix,
  useMounted,
  usePrevious,
  useIsomorphicEffect_default
};
//# sourceMappingURL=chunk-4VVX4HED.js.map
