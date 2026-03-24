// script.js
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const feedback = document.getElementById('formFeedback');

    // Simulate sending data to the Backend (as per your flowchart)
    feedback.innerHTML = `Success! Thank you ${name}. We have reserved a spot for you on ${date}.`;
    feedback.classList.remove('hidden');
    feedback.classList.add('success');

    // Clear form
    this.reset();
});