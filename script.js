document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       LANGUAGE
    ================================ */
    function setLanguage(lang) {
        document.querySelectorAll("[data-en]").forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        document.documentElement.lang = lang;
    }
    setLanguage("en");

    /* ===============================
       THUMBNAIL QTY
    ================================ */
    function toggleThumbnailQuantity() {
        const type = document.getElementById("type").value;
        const quantityDiv = document.getElementById("thumbnailQuantityDiv");
        const quantityInput = document.getElementById("quantity");

        if (type === "Thumbnail") {
            quantityDiv.style.display = "block";
            quantityInput.value = quantityInput.value || 1;
        } else {
            quantityDiv.style.display = "none";
            quantityInput.value = "";
        }

        updatePrice();
    }
    window.toggleThumbnailQuantity = toggleThumbnailQuantity;

    /* ===============================
       PRICE
    ================================ */
    function updatePrice() {
        const type = document.getElementById("type").value;
        const quantity = parseInt(document.getElementById("quantity").value) || 1;
        const priceDisplay = document.getElementById("priceDisplay");

        let price = 0;
        if (type === "Thumbnail") price = quantity * 1;
        if (type === "Banner or Header") price = 5;
        if (type === "Banner/Header + 3 Thumbnails") price = 6;

        if (!type) {
            priceDisplay.textContent = "";
            return;
        }

        priceDisplay.textContent =
            document.documentElement.lang === "es"
                ? `Precio total: $${price} USD`
                : `Total price: $${price} USD`;
    }

    /* ===============================
       FORM SUBMIT
    ================================ */
    const form = document.getElementById("orderForm");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const channel = document.getElementById("channel").value;
        const type = document.getElementById("type").value;
        const quantity = document.getElementById("quantity").value;
        const details = document.getElementById("details").value;

        let message = `NEW ORDER

Name: ${name}
Email: ${email}
Channel: ${channel}
Type: ${type}${quantity ? `\nQuantity: ${quantity}` : ""}

Details:
${details}`;

        navigator.clipboard.writeText(message).then(() => {
            alert("Order copied. You will be redirected to Instagram.");
            window.open("https://www.instagram.com/pablo.69design/", "_blank");
        });
    });

    /* ===============================
       FADE UP
    ================================ */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
});
