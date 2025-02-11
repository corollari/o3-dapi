var app = new Vue({
	el: '#app',
	data: {
		network:"",
		getStorageInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			key: "bd097b2fcf70e1fd30a5c3ef51e662feeafeba01",
			network: "TestNet",
		},
		getBalanceInput: {
			params: [{
				"address": "AScKxyXmNtEnTLTvbVhNQyTJmgytxhwSnM",
				"assets": ["GAS"]
			}],
			network: "TestNet",
		},
		invokeReadInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			operation: "balanceOf",
			args:[{"type":"ByteArray","value":"bd097b2fcf70e1fd30a5c3ef51e662feeafeba01"}],
			network: "TestNet",
		},
		invokeInput: {
			scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
			operation: "transfer",
			args: [{"type":"ByteArray","value":""},{"type":"ByteArray","value":""},{"type":"ByteArray","value":"0100000000000000"}],
			fee: "0.11",
			network: "TestNet",
			triggerContractVerification: false,
			broadcastOverride: false,
		},
		invokeMultiInput: {
			invokeArgs: [
				{
					scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
					operation: "transfer",
					args: [{"type":"ByteArray","value":""},{"type":"ByteArray","value":""},{"type":"ByteArray","value":"0100000000000000"}],
					triggerContractVerification: false,
					attachedAssets: {
						'NEO': 1,
					}
				},
				{
					scriptHash: "c36aee199dbba6c3f439983657558cfb67629599",
					operation: "transfer",
					args: [{"type":"ByteArray","value":""},{"type":"ByteArray","value":""},{"type":"ByteArray","value":"0100000000000000"}],
					triggerContractVerification: true,
					attachedAssets: {
						'NEO': 2,
					}
				}
			],
			fee: "0.11",
			network: "TestNet",
			broadcastOverride: false,
		},
		sendInput: {
			fromAddress: "ANtdacYPFN6zkarDwVt5vH55FKsJU8SapW",
			toAddress: "ANtdacYPFN6zkarDwVt5vH55FKsJU8SapW",
			asset: "GAS",
			amount: "1",
			remark: "TestRemark",
			fee: "0.011",
			network: "TestNet",
			broadcastOverride: false,
		},
		signMessageInput:{
			message: "Here is a message",
		},
		verifyMessageInput:{
			message: "Here is a message",
			data: "",
			publicKey: "",
		},
		getBlockInput:{
			blockHeight: 2619690,
			network: "TestNet",
		},
		getTransactionInput:{
			txid: "",
			network: "TestNet",
		},
		getApplicationLogInput:{
			txid: "",
			network: "TestNet",
		}
	},
	watch: {
		network:function(value){
			this.getStorageInput.network = value;
			this.getBalanceInput.network = value;
			this.invokeReadInput.network = value;
			this.invokeInput.network = value;
			this.invokeMultiInput.network = value;
			this.sendInput.network = value;
			this.getBlockInput.network = value;
			this.getTransactionInput.network = value;
			this.getApplicationLogInput.network = value;
		}
	},
	methods: {
		formatInput(json) {
			return JSON.stringify(json, null, "\t");
		}
	}
})


function getProvider(elem) {
	o3dapi.NEO.getProvider()
	.then(function(data){
		const formatted = syntaxHighlight(data);
		document.getElementById(elem).innerHTML = formatted;
	})
	.catch(function(error){
		document.getElementById(elem).innerHTML = syntaxHighlight(error);
	});
}

function getNetworks(elem) {
	o3dapi.NEO.getNetworks()
	.then(function(data){
		const formatted = syntaxHighlight(data);
		document.getElementById(elem).innerHTML = formatted;
	})
	.catch(function(error){
		document.getElementById(elem).innerHTML = syntaxHighlight(error);
	});
}

function getAccount(elem) {
	o3dapi.NEO.getAccount()
	.then(accountData => {
		const formatted = syntaxHighlight(accountData);
		document.getElementById(elem).innerHTML = formatted;
	})
	.catch(function(error){
		document.getElementById(elem).innerHTML = syntaxHighlight(error);
	});
}


function getPublicKey(elem) {
	o3dapi.NEO.getPublicKey()
	.then(function(data){
		const formatted = syntaxHighlight(data);
		document.getElementById(elem).innerHTML = formatted;
	})
	.catch(function(error){
		document.getElementById(elem).innerHTML = syntaxHighlight(error);
	});
}


function getBalance(inputElement, resultElem) {
	try {
		o3dapi.NEO.getBalance(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getStorage(inputElement, resultElem) {
	o3dapi.NEO.getStorage(JSON.parse(document.getElementById(inputElement).value))
	.then(function(data){
		const formatted = syntaxHighlight(data);
		document.getElementById(resultElem).innerHTML = formatted;
	})
	.catch(function(error){
		document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
	});
}


function invokeRead(inputElement, resultElem) {
	try {
		o3dapi.NEO.invokeRead(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function invoke(inputElement, resultElem) {
	try {
		o3dapi.NEO.invoke(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function invokeMulti(inputElement, resultElem) {
	try {
		o3dapi.NEO.invokeMulti(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}


function send(inputElement, resultElem) {
	try {
		o3dapi.NEO.send(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function signMessage(inputElement, resultElem) {
	try {
		o3dapi.NEO.signMessage(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}


function verifyMessage(inputElement, resultElem) {
	try {
		o3dapi.NEO.verifyMessage(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getBlock(inputElement, resultElem) {
	try {
		o3dapi.NEO.getBlock(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getTransaction(inputElement, resultElem) {
	try {
		o3dapi.NEO.getTransaction(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}

function getApplicationLog(inputElement, resultElem) {
	try {
		o3dapi.NEO.getApplicationLog(JSON.parse(document.getElementById(inputElement).value))
		.then(function(data){
			const formatted = syntaxHighlight(data);
			document.getElementById(resultElem).innerHTML = formatted;
		})
		.catch(function(error){
			document.getElementById(resultElem).innerHTML = syntaxHighlight(error);
		});
	} catch (err) {
		document.getElementById(resultElem).innerHTML = 'invalid JSON input';
	}
}
