document.getElementById('resForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const feedback = document.getElementById('formFeedback');

    // Show success message
    feedback.innerHTML = `🎉 Thank you ${name}! Your table is booked for ${date}.`;
    feedback.classList.remove('hidden');
    feedback.classList.add('success');

    // Clear form
    this.reset();
});