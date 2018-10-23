//POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no retntal found for this customer/movie
// Return 200 for valid request
// Set the return date
// Calculate the rental fee
// Increase the stock
// Return the rental
