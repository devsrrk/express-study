var express = require('express');
var router = express.Router();

var users = [];

function findUser( userId, func ) {
	var usersLength = users.length;
	for( var i = 0 ; i < usersLength ; i ++ ) {
		if( users[i].userId === userId ) {
			func(i, users[i]);
		}
	}
	return null;
}

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
router.get('/', function(req, res, next) {
	res.send(users);
});

router.post("/", function( req, res, next ) {
	var param = req.body;
	var date = new Date();
	users.push({
		userId : param.userId,
		userNm : param.userNm,
		email : param.email,
		password : param.password,
		etc : param.etc,
		createdAt : date,
		thumbnail : '',
	});

   findUser( param.userId, function(i, user){
		res.send({
			message : "success",
			code : 200,
			users : user
		});
	} );


});

router.put("/", function( req, res, next ) {
	var param = req.body;

	findUser( param.userId, function(i, user) {
		var msg = "";
		if( user != null ) {
			var date = new Date();
			user.userId = param.userId;
			user.userNm = param.userNm;
			user.email = param.email;
			user.password = param.password;
			user.etc = param.etc;
			user.modifiedAt = date;
			user.thumbnail = param.thumbnail;
			msg = "수정했습니다.";
		} else {
			msg = "존재하지 않는 아이디입니다.";
		}

		res.send({
			message : msg,
			code : 200,
			users : user
		});
	});
});

router.delete("/", function( req, res, next ) {
	findUser( req.body.userId, function(i, user) {
		var msg = "";
		if ( user != null ) {
			users.splice( i, 1 );
			msg = "삭제 완료";
		} else {
			msg = "존재하지 않는 아이디입니다.";
		}

		res.send({
			message : msg,
			code : 200
		});
	});
});


module.exports = router;
