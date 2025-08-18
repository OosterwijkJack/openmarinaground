

function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = data.phone.replace(/[\s\-\(\)\.]/g, '');
    if (cleanPhone.length < 10) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // If validation passes, process the form
    console.log('Form submitted with data:', data);
    alert('Reservation submitted successfully!');
    
    // Here you would typically send the data to your server
    // For now, we'll just log it and show a success message
}
