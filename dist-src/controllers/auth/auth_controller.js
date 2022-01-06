"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = _interopRequireDefault(require("../../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Register User
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/
exports.registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _user, _token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _user = new _models["default"].User();
            _user.email = req.body.email;
            _user.password = _user.hashPassword(req.body.password);

            _user.save();

            _token = _jsonwebtoken["default"].sign({
              id: _user._id,
              email: _user.email
            }, "sldfsd0fas9df809as8f", {
              expiresIn: "1h"
            });
            return _context.abrupt("return", res.status(200).json({
              'success': "_user successfully registered.",
              'token': _token
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json("ERROR: ".concat(_context.t0.message)));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _user, _token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models["default"].User.findOne({
              'email': req.body.email
            });

          case 3:
            _user = _context2.sent;

            if (_user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              msg: "Login credentials is wrong.",
              "success": false
            }));

          case 6:
            if (!_bcrypt["default"].compareSync(req.body.password, _user.password)) {
              _context2.next = 11;
              break;
            }

            _token = _jsonwebtoken["default"].sign({
              id: _user._id,
              email: _user.email
            }, "sldfsd0fas9df809as8f", {
              expiresIn: "1h"
            });
            return _context2.abrupt("return", res.status(200).json({
              "data": {
                msg: "Logged in successfully",
                "_token": _token,
                "success": true
              }
            }));

          case 11:
            return _context2.abrupt("return", res.status(422).json({
              msg: "Login credentials is wrong.",
              "success": false
            }));

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json("ERROR: ".concat(_context2.t0.message)));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models["default"].User.findById(req.payload.id);

          case 2:
            _user = _context3.sent;
            return _context3.abrupt("return", res.json({
              "user": _user
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
/*
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
Store user profile
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
*/


exports.store_profile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _user;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models["default"].User.findById(req.query.uid);

          case 3:
            _user = _context4.sent;
            _user.fname = req.body.fname;
            _user.lname = req.body.lname;
            _user.phone_number = req.body.phone;
            _user.address = req.body.address;

            _user.save();

            return _context4.abrupt("return", res.status(200).json({
              "_message": "User profile successfully created.",
              "_error": false
            }));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500).json({
              "message": _context4.t0.message,
              "_error": true
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();