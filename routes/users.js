'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require('express');
// const User = require("../models/User");
var router = _express2.default.Router();

// function findUser( userId, func ) {
// 	let usersLength = users.length;
// 	for( let i = 0 ; i < usersLength ; i ++ ) {
// 		if( users[i].userId === userId ) {
// 			func(i, users[i]);
// 		}
// 	}
// 	return null;
// }

/*
{
	userId : "",
	userNm :,
	email :
	password : '',
	etc : '',
	createdAt : ,
	modifiedAt : ,
	thumbnail : '',
}
 */

/* GET users listing. */
router.get('/', function (req, res, next) {
	_User2.default.find(function (err, user) {
		if (err) {
			res.sned(err);
		}
		res.send({
			message: "success",
			code: 200,
			user: user
		});
	});
});

router.post("/", function (req, res, next) {
	var param = req.body;
	var date = new Date();
	var newUser = new _User2.default({
		userId: param.userId,
		userNm: param.userNm,
		email: param.email,
		password: param.password,
		etc: param.etc,
		createdAt: date,
		thumbnail: ''
	});

	_User2.default.find({ userId: param.userId }, function (err, selectedUser) {
		var msg = void 0;

		var save = function save() {
			return new Promise(function (resolve, reject) {
				if (selectedUser.length > 0) {
					msg = "존재하는 ID입니다.";
					reject(msg);
				} else {
					newUser.save(function (err, savedUser) {
						if (err) {
							return res.status(500).send(err);
						}
						msg = "저장했습니다.";
						newUser = savedUser;
						resolve(msg, newUser);
					});
				}
			});
		};

		save().then(function (msg, newUser) {
			//resolve
			res.send({
				message: msg,
				code: 200,
				user: newUser
			});
		}, function () {
			//reject
			res.send(msg);
		});
	});
});

router.put("/:userId", function (req, res, next) {
	var param = req.body;
	param.updatedAt = Date();

	_User2.default.update({ userId: req.params.userId }, param, function (err, user) {
		if (err) {
			console.log(err);
			return;
		}

		var msg = void 0;
		if (user.n === 0) {
			msg = "존재하지 않는 ID입니다.";
		} else if (user.nModified === 0) {
			msg = "변경사항이 없습니다.";
		} else {
			msg = "수정완료";
		}
		res.send({
			user: user,
			msg: msg
		});
	});
});

router.delete("/:userId", function (req, res, next) {

	_User2.default.remove({ userId: req.params.userId }, function (err, user) {

		console.log(user);

		if (err) {
			return res.status(500).send(err);
		}

		var msg = "삭제되었습니다.";
		if (user.result.n === 0) {
			msg = "존재하지 않는 ID입니다.";
		}
		res.send({
			user: user,
			msg: msg
		});
	});
});

module.exports = router;