"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseTimestamp = _interopRequireDefault(require("mongoose-timestamp"));

var productSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  category_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Category'
  },
  images: [],
  colors: [],
  price: {
    type: Number
  },
  rating: {
    type: Number
  },
  isPopular: {
    type: Boolean,
    "default": false
  },
  isFavitor: {
    type: Boolean,
    "default": false
  }
});
productSchema.plugin(_mongooseTimestamp["default"], {
  'createdAt': 'created_at',
  'updatedAt': 'updated_at'
});

var Product = _mongoose["default"].model('Product', productSchema);

var _default = Product;
exports["default"] = _default;