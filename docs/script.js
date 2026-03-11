function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Complete popup form and generic script functions
document.addEventListener('DOMContentLoaded', () => {

    // Inject Popup HTML into the page seamlessly
    const popupHTML = `
        <div class="popup-overlay" id="quotePopup">
            <div class="popup-form">
                <i class="fa-solid fa-xmark close-popup" onclick="closePopup()"></i>
                <h2>Get a <span>Quote</span></h2>
                <form id="quoteForm" name="submit-to-google-sheet">
                    <input type="text" id="name" name="name" placeholder="Your Name" required>
                    <input type="email" id="email" name="email" placeholder="Your Email" required>
                    <textarea id="message" name="message" rows="4" placeholder="Your Project Details or Inquiry" required></textarea>
                    <button type="submit" class="btn" style="width: 100%;">Submit Request</button>
                    <p id="formStatus" style="color: #b74b4b; margin-top: 1rem; font-size: 1.4rem; display: none;"></p>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Show popup after 60 seconds of inactivity
    setTimeout(() => {
        if(!sessionStorage.getItem('popupShown')) {
            openPopup();
            sessionStorage.setItem('popupShown', 'true');
        }
    }, 60000);

    // Handle Google Apps Script form submission
    const form = document.getElementById('quoteForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const status = document.getElementById('formStatus');
        status.style.display = 'block';
        status.style.color = 'white';
        status.innerText = 'Submitting...';

        const formData = new FormData(this);
        
        // REPLACE this with your Google App Script deployed Web App URL
        const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

        // Fake response logic to demonstrate aesthetic feedback if no script hook exists
        if(scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            setTimeout(() => {
                status.style.color = '#25D366';
                status.innerText = 'Success! Your quote request has been recorded.';
                this.reset();
                setTimeout(closePopup, 3000);
            }, 1000);
            return;
        }

        // Actual fetch to the script
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if(response.ok) {
                    status.style.color = '#25D366';
                    status.innerText = 'Success! Your quote request has been recorded.';
                    this.reset();
                    setTimeout(closePopup, 3000);
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                status.style.color = '#b74b4b';
                status.innerText = 'Error! Something went wrong.';
                console.error('Error!', error.message);
            });
    });

    // Handle Mobile nav collapse when clicking nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
             const nav = document.querySelector('nav');
             if(nav.classList.contains('active')){
                nav.classList.remove('active');
             }
        });
    });
});

function openPopup() {
    document.getElementById('quotePopup').classList.add('active');
}

function closePopup() {
    document.getElementById('quotePopup').classList.remove('active');
}
