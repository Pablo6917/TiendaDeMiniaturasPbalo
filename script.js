/* ===============================
   LANGUAGE SYSTEM
================================ */

function setLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    document.documentElement.lang = lang;
    updateImagesLanguage(lang);
    updatePrice();
}

// Default language
setLanguage("en");

function updateImagesLanguage(lang) {
    document.querySelectorAll("img[data-en-src]").forEach(img => {
        img.src = img.getAttribute(`data-${lang}-src`);
    });
}

/* ===============================
   ORDER TYPE SELECTION
================================ */

function selectType(type) {
    const typeSelect = document.getElementById("type");
    typeSelect.value = type;
    toggleThumbnailQuantity();
    updatePrice();

    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

/* ===============================
   THUMBNAIL QUANTITY
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
}

/* ===============================
   PRICE CALCULATION
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
   FORM SUBMISSION (INSTAGRAM)
================================ */

document.getElementById("orderForm").addEventListener("submit", e => {
    e.preventDefault();

    const lang = document.documentElement.lang;

    const name = nameInput.value = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const channel = document.getElementById("channel").value;
    const type = document.getElementById("type").value;
    const quantity = document.getElementById("quantity").value;
    const details = document.getElementById("details").value;

    let message =
lang === "es"
? `NUEVO PEDIDO

Nombre: ${name}
Email: ${email}
Canal: ${channel}
Tipo: ${type}${type === "Thumbnail" ? `\nCantidad: ${quantity}` : ""}

Detalles:
${details}`
: `NEW ORDER

Name: ${name}
Email: ${email}
Channel: ${channel}
Type: ${type}${type === "Thumbnail" ? `\nQuantity: ${quantity}` : ""}

Details:
${details}`;

    navigator.clipboard.writeText(message).then(() => {
        alert(
            lang === "es"
                ? "Pedido copiado. Serás redirigido a Instagram."
                : "Order copied. You will be redirected to Instagram."
        );

        window.open("https://www.instagram.com/pablo.69design/", "_blank");
    });
});

/* ===============================
   FADE-UP ANIMATION (ONLY ONE)
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
});
