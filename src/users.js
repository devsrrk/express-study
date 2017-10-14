// const express = require('express');
// const User = require("../models/User");
import express from 'express';
import User from '../models/User';
const router = express.Router();

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
router.get('/', (req, res, next) => {
	User.find( (err, user) => {
		if(err) {
			res.sned(err);
		}
		res.send({
			message : "success",
			code : 200,
			user : user
		});
	});
});

router.post("/", ( req, res, next ) => {
	let param = req.body;
	let date = new Date();
	let newUser = new User({
		userId : param.userId,
		userNm : param.userNm,
		email : param.email,
		password : param.password,
		etc : param.etc,
		createdAt : date,
		thumbnail : '',		
	});

	User.find( { userId : param.userId }, (err, selectedUser) => {
		let msg;

		let save = () => {
			return new Promise( (resolve, reject) => {
				if( selectedUser.length > 0 ) {
					msg = "존재하는 ID입니다.";
					reject(msg);
				} else {
					newUser.save( (err, savedUser) => {		
						if(err) {
							return res.status(500).send(err);
						}
						msg = "저장했습니다.";
						newUser = savedUser;
						resolve(msg,newUser);
					});
				}
			});
		}

		save().then( (msg, newUser) => {
			//resolve
			res.send({
				message : msg,
				code : 200,
				user : newUser
			}); 
		}, () => {
			//reject
			res.send(msg);
		});
	});
});



router.put("/:userId", ( req, res, next ) => {
	let param = req.body;
	param.updatedAt = Date();

	User.update({userId: req.params.userId}, param, (err, user) => {
		if(err) { 
			console.log(err); 
			return;
		}
		
		let msg;
		if( user.n === 0 ) {
			msg = "존재하지 않는 ID입니다.";
		} else if( user.nModified === 0 ) {
			msg = "변경사항이 없습니다.";
		} else {
			msg = "수정완료";
		}
		res.send({
			user,
			msg
		});
	});
});

router.delete("/:userId", ( req, res, next ) => {

	User.remove({ userId: req.params.userId }, (err, user) => {

		console.log(user);

		if( err ) {
			return res.status(500).send(err);
		} 
		
		let msg = "삭제되었습니다.";
		if( user.result.n === 0 ) {
			msg = "존재하지 않는 ID입니다.";
		}
		res.send({
			user : user,
			msg : msg
		});
	  });
});


module.exports = router;
