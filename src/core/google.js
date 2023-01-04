class GooglePay{
    
    constructor(config){
        this.gpclient = null;
        this.environment = config.mode || "TEST";
        this.ready = false;
        this.transaction = config.trx || {};
        this.merchant = config.merchant || {};
    }

    baseRequest(){
        return {
            apiVersion: 2,
            apiVersionMinor: 0
        }
    }

    allowedCardAuthMethods(){
        return ["PAN_ONLY", "CRYPTOGRAM_3DS"]
    }

    allowedCardNetworks(){
        return ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
    }

    baseCardPaymentMethod(){
        return {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: this.allowedCardAuthMethods(),
                allowedCardNetworks: this.allowedCardNetworks()
            }
        }
    }

    tokenizationSpecification(){
        return {
            type: 'DIRECT', //'PAYMENT_GATEWAY',
            parameters: {
                "protocolVersion": "ECv2",
                "publicKey": "BHAqJQxJev+Wf1u+8coMxHQNyV2bPdqgSEmwyWecAuGnMCwu4Y3IfMjJL0NDZlWTAgVhun53D/vffCt4riBnqaM="
                //'gateway': 'example',
                //'gatewayMerchantId': 'exampleGatewayMerchantId'
            }
        }
    }

    cardPaymentMethod(){
        return Object.assign(
            {},
            this.baseCardPaymentMethod(),
            {
                tokenizationSpecification: this.tokenizationSpecification()
            }
        )
    }

    getClient(){
        if(null == this.gpClient){
            this.gpClient = new window.google.payments.api.PaymentsClient({ environment: this.environment });
        }
        return this.gpClient;
    }
    
    getReadyRequest(){
        return Object.assign(
            {},
            this.baseRequest(),
            {
              allowedPaymentMethods: [this.baseCardPaymentMethod()]
            }
        );
    }

    init(){
        var self = this;
        this.getClient()
            .isReadyToPay(this.getReadyRequest())
            .then(resp => {
                self.ready = resp.result;
            })
            .catch(err => {
                console.error(err);
            });
    }

    isReady(){
        return this.ready;
    }

    setTransaction(trx){
        this.trx = trx;
    }

    getTransaction(){
        return this.trx;
    }

    setMerchant(merchant){
        this.merchant = merchant;
    }

    getMerchant(){
        return this.merchant;
    }

    getPaymentRequest(){
        const request = Object.assign({}, this.baseRequest());
        request.allowedPaymentMethods = [this.cardPaymentMethod()];
        request.transactionInfo = this.getTransaction();
        request.merchantInfo = this.getMerchant(); 
        return request;
    }

    send(onError){
        const pay = this.getPaymentRequest();
        this.getClient()
            .loadPaymentData(pay)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
                onError && onError();
            });
    }


}

export default GooglePay;