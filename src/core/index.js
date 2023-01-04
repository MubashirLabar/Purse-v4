import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import crypto from "crypto";
import SecureLS from "secure-ls";
import config from "../config";
import axios from "axios";
import url from "url";
import md5 from "md5";
import { render } from "react-dom";
import {
	DialogBox,
	Toast
} from "../ui";
import S3 from "aws-sdk/clients/s3";
import AWS from "aws-sdk";

let s3 = null;
const AES_METHOD = 'aes-256-cbc';
const IV_LENGTH = 16;
const { debug, api, base } = config;

var _els = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','.'];

const initS3 = (bolt) => {
	var _ = me();
	var __ = decode(null == _ || "__" == _  ? bolt : _.ak).split("__");
	if(null == s3){
		AWS.config.update({
			correctClockSkew: true
		});
		s3 = new S3({
			endpoint: 's' + '3' + '.' + __[0] + '.w' + 'a' + 's' + 'a' + 'b' + 'i' + 's' + 'y' + 's' + '.' + 'c' + 'o' + 'm',
			region: __[0],
			accessKeyId: __[1],
			secretAccessKey: __[2],
			maxRetries: 3,
			sslEnabled: window.location.protocol == "https:",
			s3ForcePathStyle: false
		});
		AWS.events.on("retry", response => {
			if(response.error.name == 'RequestTimeTooSkewed'){
				//console.error('User time is not correct. Handling error!');
				//console.log('ORS systemClockOffset:', AWS.config.systemClockOffset);
				var serverTime = Date.parse(response.httpResponse.headers['date']);
				var timeNow = new Date().getTime();
				//console.log('AWS timestamp:', new Date(serverTime));
				//console.log('Browser timestamp:', new Date(timeNow));
				AWS.config.systemClockOffset = Math.abs(timeNow - serverTime);
				response.error.retryable = true;
				//console.log('Setting systemClockOffset to:', AWS.config.systemClockOffset);
				//console.log('Retrying uploading to S3 once more...');
			}
		})
	}
}

const encode = (text) => {
    if (process.versions.openssl <= '1.0.1f') {
        throw new Error('OpenSSL Version too old, vulnerability to Heartbleed')
	}    
	let password = randit(32).toLowerCase();
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(AES_METHOD, new Buffer.from(password), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
	//return iv.toString('hex') + ':' + encrypted.toString('hex');
	return iv.toString('hex') + ':' + password + ':' +encrypted.toString('hex');
}

const decode = (text) => {
	let _textParts = text.split(':');
	let textParts = (_textParts[0] + ":" + _textParts[2]).split(":");
    let iv = new Buffer.from(textParts.shift(), 'hex');
    let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer.from(_textParts[1]), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const getKeyFromString = (str) => {
	return str.split(":")[1];
}

const ls = new SecureLS({
	encodingType: "aes",
	encryptionSecret: config.ENCRYPTION_KEY
});

const setCookie = (key, value) => {
	return ls.set(key, value);
}

const getCookie = (key) => {
	try{
		return ls.get(key) || null;
	}catch(e){
		return null;
	}
}

const removeCookie = (key) => {
	try{
		ls.remove(key);
	}catch(e){}
}

const keyCodes = {
	ENTER: 13
}

const keyupListener = (e, keyCode, callback) => {
	var key = e.which || e.keyCode;
	key === keyCode && callback();
}

const randit = (len) => {	
	var text = ""; var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";	
	for (var i = 0; i < len; i++){ 
		text += possible.charAt(Math.floor(Math.random() * possible.length)); 
	}
	return text;    
}

const randRange = (min, max) => {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateID = (len, k) => {	
	function s(k){
		var text = ""; var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";	
		for (var i = 0; i < k; i++){ text += possible.charAt(Math.floor(Math.random() * possible.length)); }
		return text;
	}
    var id = s(k); if(len > 1){ for(var n = 1; n < len; n++){ id += '-' + s(k); } } 
    return id;
}

const isValidEmail = (e) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
	return reg.test(e);
}

const focus = (id) => {
	try{
		document.querySelector(id).focus();
	}catch(e){}
}

const post = (uri, data, onSuccess, onError) => {
	const Bearer = getCookie("__ha") || encode("__zuz__" + new Date().getTime());
	if(debug){
		uri += uri.indexOf("?") > -1 ? "&__debug=true" : "?__debug=true";
	}
	axios.post(
		uri,
		data,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Bearer}`
			}
		}
	)
	.then(resp=>onSuccess(resp.data))
	.catch(err=>onError(err));
}

const getUriParams = () => {
	var search = window.location.search.substring(1);
	if(search=='') return JSON.parse('{}');
	return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
}

const Dialog = (title, content, close, action, extra) => {
	var ID = generateID(4, 6);
	var div = document.createElement('div');
	div.id = ID;
	document.body.appendChild(div);
	try{
	  var els = document.getElementsByClassName("dialogbox");
	  if(els.length > 0){
		for(var i = 0; i < els.length; i++){
		  els[i].classList.add('dialogbox-blur');
		}
	  }
	}catch(e){}
	if(!window.__modals){ window.__modals = []; }
	render(<DialogBox ref={(ref)=>(window.__modals[ID] = ref)} ID={ID} title={title} content={content} action={action} close={close} extra={extra} />, document.getElementById(ID));
	return ID;
}

const me = () => {
	var m = getCookie("__ud");
	return m == null ? "__" : JSON.parse(m);
}

const sessionExpired = () => {
	Dialog(
		"Session Expired",
		<h2>Your Session is expired. Reload your page!</h2>,
		{
			label: "Reload",
			onClose: ()=>{
				window.location = window.location.href;
			}
		}
	);
}

const diskLimitReached = () => {
	if("__dlr" in window && window.__dlr == true) return;
	window.__dlr = true;
	Dialog(
		"Disk Limit Reached",
		<h2>Your disk is full! Either clear disk space be remove un-necessary files or buy more diskspace!</h2>,
		{
			label: "Close",
			onClose: ()=>{
				window.__dlr = false;
			}
		},
		{
			label: "Buy diskspace",
			on: () => {
				window.__dlr = false;
				window.location = base + "plans?_camp=upl&trigger=hmpt";
			}
		}
	);
}

const formatTime = (millisSinceEpoch) => {
	var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
	var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
	var seconds = secondsInDay % 60;
	var minutes = ((secondsInDay / 60) | 0) % 60;
	var hours = (secondsInDay / 3600) | 0;
	if(hours<10){ hours = '0'+hours; }
	return hours + (minutes < 10 ? ":0" : ":")
		+ minutes + (seconds < 10 ? ":0" : ":")
		+ seconds;
}

const moment = (stamp) => {
	const now = new Date().getFormated();
	const dt = new Date(stamp).getFormated();
	const time = dt.hours + ":" + dt.minutes + " " + dt.ampm.toUpperCase();	
	//const dd = dt.day > 1 ? dt.day - 1 : 1;	
	if(dt.day == now.day){
		return 'Today, ' + time;
	}else if(now.year > dt.year){
		return now.year - dt.year > 1 ? (now.year-dt.year) + 'years ago' : 'Last year';
	}else{
		return dt.month + "/" + dt.day + (dt.year == now.year ? "" : "/" + dt.year) + " " + time;
	}	 
}

const copyToClipboard = (str, message) => {
	const el = document.createElement('textarea');
	let storeContentEditable = el.contentEditable;
	let storeReadOnly = el.readOnly;
	el.value = str;
	el.contentEditable = true;
	el.readOnly = false;
	el.setAttribute('readonly', false);
	el.setAttribute('contenteditable', true);
	el.style.position = 'absolute';
	el.style.left = '-999999999px';
	document.body.appendChild(el);
	const selected =
		document.getSelection().rangeCount > 0
			? document.getSelection().getRangeAt(0)
			: false;
	el.select();
	el.setSelectionRange(0, 999999);
	document.execCommand('copy');
	document.body.removeChild(el);
	if (selected) {
		document.getSelection().removeAllRanges();
		document.getSelection().addRange(selected);
	}
	el.contentEditable = storeContentEditable;
	el.readOnly = storeReadOnly;
	message && Toast.show({html: message, time: 6});
}

const formatSize = (bytes) => {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024))),
	nx = bytes / Math.pow(1024, i);
	return  nx.toFixed(2) + ' ' + sizes[i];
}

const getExtension = (str) => {
	var re = /(?:\.([^.]+))?$/;
	return re.exec(str)[1];
}

const Uploadify = function(onChange, onComplete, onError){
	let self = this;
	self.que = [];
	self.index = -1;
	self.uploading = false;
	self.speed = 0;
	self.stamp = null;
	self.cancelToken = null;
	self.saving = false;

	self.notify = () => {
		onChange && onChange(self.getFile());
	}

	self._uploadFile = () => {
		self.que[self.index].status = 1;
		self.notify();
		self.stamp = ((Date.now) ? Date.now() : (new Date()).getTime());
		var file = self.getFile(),
		formData = new FormData();
		formData.append("at", encode(getCookie("__at")));
		formData.append("ut", encode(getCookie("__ut")));
		formData.append("ID", file.ID);
		formData.append('file', file.file);
		self.cancelToken = axios.CancelToken.source();
		axios({
			method: "post",
			url: file.uri,
			data: formData,
			timeout: 1000 * 60 * 60,
			cancelToken: self.cancelToken.token,
			onUploadProgress: (progressEvent) => {
				var progress = parseInt(Math.round((progressEvent.loaded * 100 ) / progressEvent.total));
				var now = ((Date.now) ? Date.now() : (new Date()).getTime());
				self.que[self.index].progress = progress;
				self.que[self.index].speed = progress > 99 ? '0 b/s' : self.getSpeed(progressEvent.loaded);
				self.que[self.index].eta = (progressEvent.total - progressEvent.loaded)/(progressEvent.loaded / (now-self.stamp));
				self.que[self.index].bytes = progressEvent.loaded;
				self.que[self.index].status = 1;
				self.notify();
			}
		})
		.then(resp => {
			resp = resp.data;
			if("kind" in resp){
				self.que[self.index].progress = 100;
				self.que[self.index].speed = '';
				self.que[self.index].status = 2;
				self.que[self.index].fileid = resp.token;
				self.notify();
				self.uploading = false;
				self.Que();				
			}else{
				self.uploading = false;
				self.que[self.index].progress = 0;
				self.que[self.index].speed = '';
				self.que[self.index].status = -1;
				self.notify();
				self.Que();				
			}
		})
		.catch(err => {
			self.que[self.index].progress = 0;
			self.que[self.index].speed = '';
			self.que[self.index].status = axios.isCancel(err) ? -2 : -1;
			self.notify();
			self.uploading = false;
			self.Que();			
		});
	}

	self.beforeFileUpload = () => {
		initS3(null);
		s3
		.createBucket({
			Bucket: me().ID.toLowerCase(),
			ACL: 'private'
		})
		.promise()
		.then(()=>{
			//self.fetchBolt();
			self.uploadFile();
		})
		.catch(err => {
			console.log(err);
		});
	}
	
	self.fetchBolt = () => {
		var file = self.getFile();
		post(
			api + 'oggy/which_web_bolt',
			{
				at: encode(getCookie("__at")),
				ut: encode(getCookie("__ut")),
				token: encode(file.size + "@@@@@@" + file.type)
			},
			resp => {
				self.saving = false;
				if("kind" in resp){	
					onComplete && onComplete(resp.file);				
					self.uploading = false;
					self.Que();					
				}else{
					if(resp.reason == "oauth"){
						sessionExpired();
					}else{
						self.que[self.index].status = -1;
						self.uploading = false;
						self.Que();					
					}
				}
			},
			err => {
				console.log(err);
				self.saving = false;
				self.uploading = false;
				self.Que();
			}
		);
	}

	self.uploadFile = () => {
		self.que[self.index].status = 1;
		self.notify();
		self.stamp = ((Date.now) ? Date.now() : (new Date()).getTime());
		const uploadRequest = new S3.ManagedUpload({
			partSize: 10 * 1024 * 1024, queueSize: 1,
			params: { Bucket: me().ID.toLowerCase(), Key: self.getFile().fileid, Body: self.getFile().file },
			service: s3
		});
		uploadRequest.on('httpUploadProgress', function(progressEvent) {
			const progress = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
			var now = ((Date.now) ? Date.now() : (new Date()).getTime());
			self.que[self.index].progress = progress;
			self.que[self.index].speed = progress > 99 ? '0 b/s' : self.getSpeed(progressEvent.loaded);
			self.que[self.index].eta = (progressEvent.total - progressEvent.loaded)/(progressEvent.loaded / (now-self.stamp));
			self.que[self.index].bytes = progressEvent.loaded;
			self.que[self.index].status = 1;
			self.notify();
		});		
		uploadRequest.send(function(err) {
			if (err) {
				console.log('UPLOAD ERROR: ' + JSON.stringify(err, null, 2));
				self.uploading = false;
				self.que[self.index].progress = 0;
				self.que[self.index].speed = '';
				self.que[self.index].status = -1;
				self.notify();
				self.Que();
			}else{
				self.que[self.index].progress = 100;
				self.que[self.index].speed = '';
				self.que[self.index].status = 2;
				//self.que[self.index].fileid = 'xyz'; //resp.token;
				self.notify();
				self.saveUpload();
				//self.uploading = false;
				//self.Que();				
			}
		});
	}

	self.getFile = () => {
		return self.que[self.index];
	}

	self.importFile = () => {}

	self.saveUpload = () => {	
		if(self.saving)	return;
		self.saving = true;
		var file = self.getFile();
		post(
			api + 'oggy/web_push_upload',
			{
				at: encode(getCookie("__at")),
				ut: encode(getCookie("__ut")),
				token: encode(file.fileid + "@@@@@@" + file.name + "@@@@@@" + file.size + "@@@@@@" + file.type + "@@@@@@" + file.dir)
			},
			resp => {
				self.saving = false;
				if("kind" in resp){	
					onComplete && onComplete(resp.file);				
					self.uploading = false;
					self.Que();					
				}else{
					if(resp.reason == "oauth"){
						sessionExpired();
					}else{
						self.que[self.index].status = -1;
						self.uploading = false;
						self.Que();					
					}
				}
			},
			err => {
				console.log(err);
				self.saving = false;
				self.uploading = false;
				self.Que();
			}
		);
	}

	self.Que = () => {
		if(self.uploading == false && (self.que.length - 1) > self.index){
			self.uploading = true;
			self.index++;	
			self.notify();		
			self.beforeFileUpload();
			//self.que[self.index].remote == true ? self.importFile() : self.fetchServer(false);
		}
	}	
		
	self.addToQue = (file) => {
		self.que.push(file);
		self.Que();
	}

	self.getQue = () => {
		return self.que;
	}

	self.clearQue = () => {
		if(self.uploading){
			return false;
		}else{
			self.que = [];
			self.index = -1;
			self.uploading = false;
			self.speed = 0;
			self.stamp = null;
			self.cancelToken = null			
			return true;
		}
	}

	self.cancelUpload = () => {
		try{
			self.cancelToken.cancel();
		}catch(err){
			console.log(err);
		}
	}

	self.getSpeed = (loaded) => {
		var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
        nspeed = loaded / (now - self.stamp),
        speedStr;
		if(parseInt(nspeed) > 1024){  
			nspeed = nspeed / 1024;
			speedStr = nspeed.toFixed(2)+" mb/s";	
		}else{
			speedStr = nspeed.toFixed(2)+" kb/s";
		}
		return speedStr;
	}

	window.addEventListener("beforeunload", function(e){
		return self.uploading ? 'File upload is in progress. Reloading will cancel all pending uploads!' : null;
	});

}

const getIconByType = (name, type) => {
	var ico = "shredder.svg";
	let ext = getExtension(name);
	if(ext){
		ext = ext.toLowerCase();
	}
	switch(ext){
		case "zip":
				ico = "zip.svg";
			break;
		case "png":
				ico = "png.svg";
			break;
		/*case "jpg":
		case "jpeg":
		case "bmp":
		case "tiff":
				ico = "image.svg";
			break;*/
		case "jpg":
		case "jpeg":
				ico = "jpg.svg";
			break;
	}
	return ico;
}

const getDownloadUrl = (config, bolt) => {
	initS3(bolt);
	var params = {
		Bucket: config.bucket.toLowerCase(),
		Key: config.key,
		ResponseContentDisposition: `attachment; filename="${config.name}"`
	};
	var uri = s3.getSignedUrl('getObject', params);
	//console.log(uri);
	var parts =  url.parse(uri, true);
	//return "h" + "t" + "t" + "p" + "s" + ":" + "/" + "/" + "b" + "o" + "l" + "t" + "." + "f" + "i" + "l" + "e" + "o" + "g" + "g" + "y" + "." + "c" + "o" + "m" + "/" + "d" + "/" + config.bucket + "/" + encodeURIComponent(config.key) + "/" + parts.query.Expires + "/" + encodeURIComponent(parts.query.Signature) + ("AWSAccessKeyId" in parts.query ? "/" + parts.query.AWSAccessKeyId : "") + "/" + config.name;	
	return "h" + "t" + "t" + "p" + "s" + ":" + "/" + "/" + "b" + "o" + "l" + "t" + "." + "f" + "i" + "l" + "e" + "o" + "g" + "g" + "y" + "." + "c" + "o" + "m" + "/" + "d" + "/" + config.bucket.toLowerCase() + "/" + encodeURIComponent(config.key) + "?AWSAccessKeyId=" + parts.query.AWSAccessKeyId + "&Expires=" + parts.query.Expires + "&Signature=" + encodeURIComponent(parts.query.Signature) + "&response-content-disposition=" + encodeURIComponent(params.ResponseContentDisposition);
}

const useStateWithCallback = (initialState, callback) => {
	const [state, setState] = useState(initialState);  
	useEffect(() => callback(state), [state, callback]);  
	return [state, setState];
}

const addJS = (id, src, async, onload) => {
	var s = document.createElement("script");
	s.async = async || true;
	s.id = id;
	s.src = src;
	//s.setAttribute("onload", "window.__ongpLoaded()");
	var fs = window.document.getElementsByTagName('script')[0];
	fs.parentNode.insertBefore(s, fs);
}

const urlencode = (str) => { return  encodeURIComponent(str) }
const urldecode = (str) => { return  decodeURIComponent(str) }

export {
	addJS,
	copyToClipboard,
	encode,
	decode,
	Dialog,
	focus,
	formatSize,
	formatTime,
	getUriParams,
	generateID,
	getKeyFromString,
	getIconByType,
	isValidEmail,
	me,
	moment,
	randit,
    keyCodes,
	keyupListener,
	post,
	setCookie,	
	getCookie,
	removeCookie,
	randRange,
	getExtension,
	sessionExpired,
	getDownloadUrl,
	Uploadify,
	urlencode,
	urldecode,
	useStateWithCallback
}