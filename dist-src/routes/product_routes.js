"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _product_controller = require("../controllers/product_controller");

var _function = require("../common/helpers/function");

var router = _express["default"].Router();

router.get("/", _product_controller.index);
router.post("/store", (0, _function.galleryUploadFile)("../../../public/images/products", 4), _product_controller.store);
var _default = router;
exports["default"] = _default;