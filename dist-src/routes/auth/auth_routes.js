"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth_controller = require("../../controllers/auth/auth_controller");

var _auth_middleware = require("../../middlewares/auth_middleware");

var router = _express["default"].Router();

router.post("/register", _auth_controller.registerUser);
router.post("/login", _auth_controller.loginUser);
router.get("/user_details", _auth_middleware.auth, _auth_controller.userDetails);
router.post("/create/profile", _auth_middleware.auth, _auth_controller.store_profile);
var _default = router;
exports["default"] = _default;