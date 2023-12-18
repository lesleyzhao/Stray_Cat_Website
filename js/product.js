document.addEventListener('DOMContentLoaded', function() {
    const quantities = document.querySelectorAll('input[type="number"]');
    const subtotals = document.querySelectorAll('[id^="subtotal"]');
    const totalField = document.getElementById('total');
    const shippingSelect = document.getElementById('shippingMethod');
    const prices = [10, 100, 5, 15, 20, 50]; // Prices for each product

    // Function to calculate subtotal for a product
    function calculateSubtotal(index) {
        const quantity = quantities[index].value;
        const price = prices[index];
        return quantity * price;
    }

    // Function to update all subtotals and total
    function updateTotals() {
        let total = 0;
        subtotals.forEach((subtotal, index) => {
            const subTotalAmount = calculateSubtotal(index);
            subtotal.textContent = subTotalAmount.toFixed(2);
            total += subTotalAmount;
        });

        shippingCost = shippingSelect.value === 'shipping' ? 5 : 0;
        total += shippingCost;
        totalField.value = total.toFixed(2);
    }

    // Event listener for change in product quantities
    quantities.forEach((quantity, index) => {
        quantity.addEventListener('input', function() {
            updateTotals();
        });
    });

    // Event listener for change in shipping method
    shippingSelect.addEventListener('change', function() {
        updateTotals();
    });

    // Initialize totals on page load
    updateTotals();


    // User info form validation
    const infoForm = document.getElementById('Info');
    const userName = document.querySelector('input[name="userName"]');
    const userPhone = document.querySelector('input[name="userPhone"]');
    const userEmail = document.querySelector('input[name="userEmail"]');
    const userAddress = document.querySelector('input[name="userAddress"]');
    const zipCode = document.querySelector('input[name="zipCode"]');
    const creditCard = document.querySelector('input[name="creditCard"]');

    // Function to validate email
    function validateEmail(email) {
        const re = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return re.test(email);
    }

    // Function to validate phone number (assuming 9 digits)
    function validatePhone(phone) {
        return phone.length === 9 && !isNaN(phone);
    }

    // Function to validate ZIP code (5 digits)
    function validateZipCode(zip) {
        return zip.length === 5 && !isNaN(zip);
    }

    // Function to check all fields
    function validateFields() {
        let isValid = true;
        [userName, userPhone, userEmail, userAddress, zipCode, creditCard].forEach(input => {
            input.style.backgroundColor = "";
        });
    
        if (!userName.value) { 
            userName.style.backgroundColor = "red"; 
            userName.focus(); 
            userName.select(); 
            window.alert("Please enter a username.")
            isValid = false; 
        } else if (!userPhone.value || !validatePhone(userPhone.value)) { 
            userPhone.style.backgroundColor = "red"; 
            userPhone.focus(); 
            userPhone.select(); 
            window.alert("Please enter a 9-digit phone number.")
            isValid = false; 
        } else if (!userEmail.value || !validateEmail(userEmail.value)) { 
            userEmail.style.backgroundColor = "red"; 
            userEmail.focus(); 
            userEmail.select(); 
            window.alert("Please enter a valid email.")
            isValid = false; 
        } else if (!userAddress.value) { 
            userAddress.style.backgroundColor = "red"; 
            window.alert("Please enter an address.")
            userAddress.focus(); 
            userAddress.select(); 
            isValid = false; 
        } else if (!zipCode.value || !validateZipCode(zipCode.value)) { 
            zipCode.style.backgroundColor = "red"; 
            window.alert("Please enter a 5-digit zip code.")
            zipCode.focus(); 
            zipCode.select();
            isValid = false; 
        } else if (!creditCard.value) { 
            creditCard.style.backgroundColor = "red"; 
            creditCard.focus(); 
            creditCard.select();
            window.alert("Please enter a credit card number.")
            isValid = false; 
        }
    
        return isValid;
    }

    // Event listener for the form submission
    infoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateFields()) {
            // Add logic to process the form or submit it
            console.log('Form is valid, processing...');
            let outputDiv = document.getElementById('output');
            let receiptHtml = '<h3>Thank you for your donation!</h3><br><h3>Receipt</h3><br>';
            const shippingCost = shippingSelect.value === 'shipping' ? 5 : 0;
            let total = shippingCost;

            // Adding product information
            receiptHtml += '<h4>Products Purchased:</h4><ul>';
            for (let i = 1; i <= 6; i++) {
                let quantity = document.querySelector(`input[name=quantity${i}]`).value;
                let price = document.getElementById(`price${i}`).textContent.split('$')[1];
                let productName = document.getElementById(`product${i}`).textContent;

                if (quantity > 0) {
                    let subtotal = quantity * price;
                    total+=subtotal;
                    receiptHtml += `<li>${productName} - Quantity: ${quantity}, Subtotal: $${subtotal.toFixed(2)}</li>`;
                }
            }
            receiptHtml += `<li>Shipping Cost: ${shippingCost} </li>`;
            receiptHtml += `<li> Total: ${total} </li>`;
            receiptHtml += '</ul>';

            // Adding user information
            receiptHtml += '<h4>User Information:</h4>';
            receiptHtml += `<p>Name: ${userName.value}</p>`;
            receiptHtml += `<p>Phone: ${userPhone.value}</p>`;
            receiptHtml += `<p>Email: ${userEmail.value}</p>`;
            receiptHtml += `<p>Address: ${userAddress.value}</p>`;
            receiptHtml += `<p>Zip Code: ${zipCode.value}</p>`;
            receiptHtml += '<button id="confirmButton">Save Receipt</button>';

            // Displaying in output div
            outputDiv.innerHTML = receiptHtml;
            document.getElementById('confirmButton').addEventListener('click', function() {
                infoForm.submit(); // Submit the form to products.php
                // This will not trigger the submit event. Therefore, it does not run any event handlers attached to the submit event, including those that call event.preventDefault()
            });

            } 
            else {
                console.log('Form is invalid.');
            }
        });

});


