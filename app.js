// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none'
    
    // Show loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000)

    e.preventDefault()
});  

// Calculate results
function calculateResults(){
    console.log('calculating...')
    // UI vars
    const amount = document.querySelector('#amount')
    const interest = document.querySelector('#interest')
    const years = document.querySelector('#years')
    const monthlyPayment = document.querySelector('#monthly-payment')
    const totalPayment = document.querySelector('#total-payment')
    const totalInterest = document.querySelector('#total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //  compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(monthly) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2)

        document.getElementById('results').style.display = 'block'

        document.getElementById('loading').style.display = 'none'
    } else {
        showError('please check your numbers')
    }
}

// show error
function showError(error){
    // Hide results
    document.getElementById('results').style.display = 'none'
    
    // Show loader
    document.getElementById('loading').style.display = 'none'


    // creat a div 
    const errorDiv = document.createElement('div')

    // Get elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    // Add class
    errorDiv.className = 'alert alert-danger'

    // Creat text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    // Insert error above heading
    card.insertBefore(errorDiv, heading)

    // clear error after 3 seconds
    setTimeout(clearError, 3000)
}

// clear error
function clearError(){
    document.querySelector('.alert').remove();
}