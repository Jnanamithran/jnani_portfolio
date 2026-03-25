// EmailJS implementation for sending contact messages
import emailjs from '@emailjs/browser';

export async function sendContactMessage({ name, email, subject, message }) {
  try {
    // Initialize EmailJS with your public key
    if (typeof window !== 'undefined') {
      emailjs.init('5GnRz-aVY8TTCR3JM');
    }

    // Get current timestamp
    const currentTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Prepare form data
    const formData = {
      name: name,
      user_email: email,
      subject: subject,
      message: message,
      time: currentTime,
      to_name: 'Jnanamithran',
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      'service_2e87ui3',  // Your EmailJS service ID
      'template_o2lgsdp', // Your EmailJS template ID
      formData,
      '5GnRz-aVY8TTCR3JM' // Your EmailJS public key
    );

    return { ok: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send message. Please try again.');
  }
}
