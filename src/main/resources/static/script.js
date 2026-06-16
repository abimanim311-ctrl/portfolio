document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if(response.ok) {
            document.getElementById('formResponse').innerText = "Message sent successfully!";
            document.getElementById('formResponse').className = "text-white mt-3";
            document.getElementById('contactForm').reset();
        }
    } catch (error) {
        document.getElementById('formResponse').innerText = "Error sending message.";
        document.getElementById('formResponse').className = "text-danger mt-3";
    }
});