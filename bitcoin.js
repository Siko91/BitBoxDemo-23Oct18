module.exports = { checkIsPaid : checkIsPaid }

function checkIsPaid(id, price, paidCallback, notPaidCallback) {

	/*

	id - string containing productName & clientIP
	price - in BCH
	paidCallback - if the product was paid - call with no params
	notPaidCallback - if the product is not paid, call with 1 param - the BCH address for that payment
	
	* - do not wait for the payment in this method.
	* - it will be called again and again, until the payment is done.

	*/


	//Bellow is implementation for debugging. Delete it when coding.

	if ((Math.random() + 0.5) > 1)
		paidCallback();
	else
		notPaidCallback("BCH_Address")

}