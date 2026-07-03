import "./Contact.css";

function Contact() {
  return (
    <section className="contact">

      <h2>Contact Us</h2>

      <div className="contact-container">

        <div className="contact-info">

          <h3>Hamathi Aqua House</h3>

          <p>📍 Sri Lanka</p>

          <p>📞 +94 78 676 7081</p>

          <p>📧 hamathiaquahouse@gmail.com</p>

          <a
            href="https://wa.me/94786767081"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            WhatsApp Us
          </a>

        </div>

        <div className="map">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Colombo,Sri%20Lanka&output=embed"
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </section>
  );
}

export default Contact;