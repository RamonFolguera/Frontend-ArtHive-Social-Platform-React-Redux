import {
  require_react
} from "./chunk-ST3U5LCA.js";
import {
  __toESM
} from "./chunk-DFKQJ226.js";

// node_modules/react-jwt/dist/index.modern.js
var import_react = __toESM(require_react());
function decodeToken(token) {
  try {
    if (token.split(".").length !== 3 || typeof token !== "string") {
      return null;
    }
    var payload = token.split(".")[1];
    var padding = "=".repeat((4 - payload.length % 4) % 4);
    var base64 = payload.replace("-", "+").replace("_", "/") + padding;
    var jsonPayload = decodeURIComponent(window.atob(base64).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    var decoded = JSON.parse(jsonPayload);
    return decoded;
  } catch (error) {
    return null;
  }
}
function isTokenExpired(token) {
  var decodedToken = decodeToken(token);
  var result = true;
  if (decodedToken && decodedToken.exp) {
    var expirationDate = /* @__PURE__ */ new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    result = expirationDate.valueOf() < (/* @__PURE__ */ new Date()).valueOf();
  }
  return result;
}
function useJwt(userJwt) {
  var _useState = (0, import_react.useState)(false), isExpired = _useState[0], setIsExpired = _useState[1];
  var _useState2 = (0, import_react.useState)(null), decodedToken = _useState2[0], setDecodedToken = _useState2[1];
  (0, import_react.useEffect)(function() {
    evaluateToken(userJwt);
  }, [userJwt]);
  var evaluateToken = function evaluateToken2(token) {
    setDecodedToken(decodeToken(token));
    setIsExpired(isTokenExpired(token));
  };
  return {
    isExpired,
    decodedToken,
    reEvaluateToken: evaluateToken
  };
}
export {
  decodeToken,
  isTokenExpired as isExpired,
  useJwt
};
//# sourceMappingURL=react-jwt.js.map
