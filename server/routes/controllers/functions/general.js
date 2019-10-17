const express = require('express');
const Users = require('../../../db/models/users/userSchema');
const Tokens = require('../../../db/models/tokens/tokensSchema');
const _ = require("lodash")

module.exports = { 

	async checkingToken(token){
		var dataCallBack = []
		var tokenData =  await Tokens.findOne({"token":token})
		if (tokenData) { dataCallBack.push(tokenData['user_id']) }
		else { dataCallBack.push("") }
		return dataCallBack;
	},
	
	async checkingUser(userid){
		var dataCallBack = []
		var userData = await Users.findOne({"id_number":Number(userid)})
		
		if (userData) { dataCallBack.push(userData) } 
		else { dataCallBack.push("") }
		return dataCallBack;
	},

	async checkToken2019(token){
		var tokenData =  await Tokens.findOne({"token":token})
		if(_.isEmpty(tokenData)){ return 0 }
		return tokenData.userCode
	},

	async checkingUser2019(userCode){ 
		return userData = await Users.findOne({"code": userCode }) 
	},

	async checkToken(token){
		if(!token || token === null) return {successes: false, reason: "Condition no valid. Token is empty"};
		
		var testToken = await this.checkToken2019(token)
		if(testToken == 0) return {successes: false, reason: "Token no valid"}
		
		let testUser = await this.checkingUser2019(testToken)
		if(_.isEmpty(testUser)) return {successes: false, reason: "User no valid"}
		
		return {"successes":true, data: testUser}
	}
 };