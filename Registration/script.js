$(document).ready(function () {
    // Form validation and submission
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return false;
        }

        // Get form data
        const formData = new FormData(this);

        // Submit via AJAX
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // Parse JSON response
                const data = JSON.parse(response);

                if (data.success) {
                    displaySuccess(data.formData);
                } else {
                    alert('Error: ' + data.message);
                }
            },
            error: function () {
                alert('An error occurred while submitting the form. Please try again.');
            }
        });
    });

    // Custom validation function
    function validateForm() {
        let isValid = true;
        const form = document.getElementById('registrationForm');

        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim() && field.type !== 'checkbox') {
                isValid = false;
                field.style.borderColor = '#ef4444';
            } else if (field.type === 'checkbox' && !field.checked) {
                isValid = false;
            } else {
                field.style.borderColor = '#10b981';
            }
        });

        // Validate email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailPattern.test(email.value)) {
            isValid = false;
            email.style.borderColor = '#ef4444';
            alert('Please enter a valid email address');
            return false;
        }

        // Validate phone number
        const phone = document.getElementById('phone');
        const phonePattern = /^[0-9]{10}$/;
        if (phone.value && !phonePattern.test(phone.value)) {
            isValid = false;
            phone.style.borderColor = '#ef4444';
            alert('Please enter a valid 10-digit phone number');
            return false;
        }

        // Validate pincode
        const pincode = document.getElementById('pincode');
        const pincodePattern = /^[0-9]{6}$/;
        if (pincode.value && !pincodePattern.test(pincode.value)) {
            isValid = false;
            pincode.style.borderColor = '#ef4444';
            alert('Please enter a valid 6-digit pincode');
            return false;
        }

        if (!isValid) {
            alert('Please fill in all required fields correctly');
        }

        return isValid;
    }

    // Display success message with formatted data
    function displaySuccess(formData) {
        // Hide form container
        $('#formContainer').fadeOut(400, function () {
            // Build the display HTML
            let displayHTML = '';

            // Personal Information Section
            displayHTML += '<div class="data-section">';
            displayHTML += '<h3>Personal Information</h3>';
            displayHTML += createDataRow('Full Name', formData.fullName);
            displayHTML += createDataRow('Email Address', formData.email);
            displayHTML += createDataRow('Phone Number', formData.phone);
            displayHTML += createDataRow('Date of Birth', formatDate(formData.dob));
            displayHTML += createDataRow('Gender', formData.gender);
            displayHTML += createDataRow('Address', formData.address);
            displayHTML += createDataRow('City', formData.city);
            displayHTML += createDataRow('State', formData.state);
            displayHTML += createDataRow('Pincode', formData.pincode);
            displayHTML += '</div>';

            // Educational Information Section
            displayHTML += '<div class="data-section">';
            displayHTML += '<h3>Educational Information</h3>';
            displayHTML += createDataRow('Highest Qualification', formData.qualification);
            displayHTML += createDataRow('Institution Name', formData.institution);
            displayHTML += createDataRow('Year of Passing', formData.yearOfPassing);
            displayHTML += createDataRow('Percentage/CGPA', formData.percentage);
            displayHTML += '</div>';

            // Course Selection Section
            displayHTML += '<div class="data-section">';
            displayHTML += '<h3>Course Selection</h3>';
            displayHTML += createDataRow('Selected Course', formData.course);
            displayHTML += createDataRow('Preferred Batch', formData.batch);
            displayHTML += '</div>';

            // Additional Information Section
            displayHTML += '<div class="dataSection">';
            displayHTML += '<h3>Additional Information</h3>';

            if (formData.interests && formData.interests.length > 0) {
                displayHTML += '<div class="data-row">';
                displayHTML += '<span class="data-label">Interested Areas:</span>';
                displayHTML += '<span class="data-value list">';
                formData.interests.forEach(interest => {
                    displayHTML += `<span class="tag">${interest}</span>`;
                });
                displayHTML += '</span>';
                displayHTML += '</div>';
            }

            if (formData.comments) {
                displayHTML += createDataRow('Additional Comments', formData.comments);
            }

            displayHTML += createDataRow('Terms Accepted', formData.terms ? 'Yes' : 'No');
            displayHTML += '</div>';

            // Insert the HTML
            $('#displayData').html(displayHTML);

            // Show success container
            $('#successContainer').fadeIn(400);

            // Scroll to top
            $('html, body').animate({ scrollTop: 0 }, 400);
        });
    }

    // Helper function to create data row
    function createDataRow(label, value) {
        return `
            <div class="data-row">
                <span class="data-label">${label}:</span>
                <span class="data-value">${escapeHtml(value)}</span>
            </div>
        `;
    }

    // Helper function to format date
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.toString().replace(/[&<>"']/g, m => map[m]);
    }

    // Real-time validation feedback
    $('input, select, textarea').on('blur', function () {
        if ($(this).attr('required')) {
            if ($(this).val().trim() === '') {
                $(this).css('border-color', '#ef4444');
            } else {
                $(this).css('border-color', '#10b981');
            }
        }
    });

    // Reset validation styling on input
    $('input, select, textarea').on('input', function () {
        if ($(this).css('border-color') === 'rgb(239, 68, 68)') {
            $(this).css('border-color', '#e2e8f0');
        }
    });

    // Phone number formatting (only allow digits)
    $('#phone').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    });

    // Pincode formatting (only allow digits)
    $('#pincode').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
        }
    });

    // Smooth scroll to first error
    function scrollToError() {
        const firstError = $('input:invalid, select:invalid, textarea:invalid').first();
        if (firstError.length) {
            $('html, body').animate({
                scrollTop: firstError.offset().top - 100
            }, 400);
            firstError.focus();
        }
    }

    // Form reset confirmation
    $('button[type="reset"]').on('click', function (e) {
        if (!confirm('Are you sure you want to reset all fields?')) {
            e.preventDefault();
        } else {
            // Reset border colors
            setTimeout(() => {
                $('input, select, textarea').css('border-color', '#e2e8f0');
            }, 10);
        }
    });
});
