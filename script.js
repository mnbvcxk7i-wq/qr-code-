// =========================================================
// QR STUDIO — MAIN JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------------------
    // ELEMENTS
    // -----------------------------------------------------

    const qrInput = document.getElementById("qrInput");
    const qrColor = document.getElementById("qrColor");
    const bgColor = document.getElementById("bgColor");

    const qrColorValue = document.getElementById("qrColorValue");
    const bgColorValue = document.getElementById("bgColorValue");

    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    const qrContainer = document.getElementById("qrcode");
    const qrPlaceholder = document.getElementById("qrPlaceholder");

    const heroQRCode = document.getElementById("heroQRCode");

    const typeTabs = document.querySelectorAll(".type-tab");

    let currentType = "url";
    let currentQR = null;


    // -----------------------------------------------------
    // DEFAULT CONTENT
    // -----------------------------------------------------

    const defaultURL = "https://example.com";

    qrInput.value = defaultURL;


    // -----------------------------------------------------
    // QR GENERATOR
    // -----------------------------------------------------

    function createQRCode(container, text, colorDark, colorLight) {

        if (!container) {
            return null;
        }

        container.innerHTML = "";

        if (typeof QRCode === "undefined") {
            console.error("QR Code library has not loaded.");
            return null;
        }

        return new QRCode(container, {
            text: text,
            width: 250,
            height: 250,

            colorDark: colorDark,
            colorLight: colorLight,

            correctLevel: QRCode.CorrectLevel.H
        });
    }


    // -----------------------------------------------------
    // GET QR CONTENT
    // -----------------------------------------------------

    function getQRContent() {

        const value = qrInput.value.trim();

        if (!value) {
            return "";
        }

        switch (currentType) {

            case "url":

                return value;

            case "text":

                return value;

            case "phone":

                return `tel:${value}`;

            case "wifi":

                return `WIFI:T:WPA;S:${value};P:;H:false;;`;

            default:

                return value;
        }
    }


    // -----------------------------------------------------
    // GENERATE QR
    // -----------------------------------------------------

    function generateQR() {

        const content = getQRContent();

        if (!content) {

            qrPlaceholder.style.display = "flex";

            qrContainer.innerHTML = "";

            downloadBtn.disabled = true;

            return;
        }

        qrPlaceholder.style.display = "none";

        currentQR = createQRCode(
            qrContainer,
            content,
            qrColor.value,
            bgColor.value
        );

        if (currentQR) {
            downloadBtn.disabled = false;
        }

        // Button feedback

        const originalText = generateBtn.querySelector("span");

        if (originalText) {

            const oldText = originalText.textContent;

            originalText.textContent = "QR Code Ready ✓";

            setTimeout(() => {
                originalText.textContent = oldText;
            }, 1300);
        }

        // Small visual animation

        const resultBox =
            document.querySelector(".qr-result-box");

        if (resultBox) {

            resultBox.animate(
                [
                    {
                        transform: "scale(0.97)",
                        opacity: "0.65"
                    },
                    {
                        transform: "scale(1)",
                        opacity: "1"
                    }
                ],
                {
                    duration: 450,
                    easing: "cubic-bezier(.2,.8,.2,1)"
                }
            );
        }
    }


    // -----------------------------------------------------
    // HERO QR
    // -----------------------------------------------------

    function generateHeroQR() {

        if (!heroQRCode) {
            return;
        }

        createQRCode(
            heroQRCode,
            defaultURL,
            "#111111",
            "#ffffff"
        );
    }


    // -----------------------------------------------------
    // INPUT EVENTS
    // -----------------------------------------------------

    qrInput.addEventListener("input", () => {

        // Live preview

        generateQR();

    });


    // -----------------------------------------------------
    // GENERATE BUTTON
    // -----------------------------------------------------

    generateBtn.addEventListener("click", () => {

        generateQR();

    });


    // -----------------------------------------------------
    // COLOR CONTROLS
    // -----------------------------------------------------

    qrColor.addEventListener("input", () => {

        qrColorValue.textContent =
            qrColor.value.toUpperCase();

        generateQR();

    });


    bgColor.addEventListener("input", () => {

        bgColorValue.textContent =
            bgColor.value.toUpperCase();

        generateQR();

    });


    // -----------------------------------------------------
    // TYPE TABS
    // -----------------------------------------------------

    typeTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            typeTabs.forEach((item) => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            currentType =
                tab.dataset.type;

            updateInputForType();

            generateQR();

        });

    });


    // -----------------------------------------------------
    // INPUT PLACEHOLDERS
    // -----------------------------------------------------

    function updateInputForType() {

        const label =
            document.querySelector(".input-area label");

        if (!label) {
            return;
        }


        switch (currentType) {

            case "url":

                label.textContent =
                    "Website URL";

                qrInput.type = "url";

                qrInput.placeholder =
                    "https://example.com";

                qrInput.value =
                    "https://example.com";

                break;


            case "text":

                label.textContent =
                    "Your Text";

                qrInput.type = "text";

                qrInput.placeholder =
                    "Enter any text...";

                qrInput.value =
                    "Hello from QR Studio";

                break;


            case "wifi":

                label.textContent =
                    "WiFi Network";

                qrInput.type = "text";

                qrInput.placeholder =
                    "Enter WiFi network name...";

                qrInput.value =
                    "My WiFi";

                break;


            case "phone":

                label.textContent =
                    "Phone Number";

                qrInput.type = "tel";

                qrInput.placeholder =
                    "+1 234 567 890";

                qrInput.value =
                    "+1234567890";

                break;

        }

    }


    // -----------------------------------------------------
    // DOWNLOAD PNG
    // -----------------------------------------------------

    downloadBtn.addEventListener("click", () => {

        if (!currentQR) {
            return;
        }

        const canvas =
            qrContainer.querySelector("canvas");

        const image =
            qrContainer.querySelector("img");


        let dataURL = null;


        if (canvas) {

            dataURL =
                canvas.toDataURL("image/png");

        } else if (image) {

            dataURL =
                image.src;

        }


        if (!dataURL) {
            return;
        }


        const link =
            document.createElement("a");

        link.href = dataURL;

        link.download =
            "qr-code.png";

        document.body.appendChild(link);

        link.click();

        link.remove();


        // Download feedback

        const original =
            downloadBtn.innerHTML;

        downloadBtn.innerHTML =
            "✓ Downloaded";

        setTimeout(() => {

            downloadBtn.innerHTML =
                original;

        }, 1600);

    });


    // -----------------------------------------------------
    // FAQ ACCORDION
    // -----------------------------------------------------

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("open");


            // Close all others

            faqItems.forEach((other) => {

                if (other !== item) {

                    other.classList.remove("open");

                    const otherAnswer =
                        other.querySelector(".faq-answer");

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight =
                            null;
                    }
                }

            });


            if (isOpen) {

                item.classList.remove("open");

                answer.style.maxHeight =
                    null;

            } else {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    // -----------------------------------------------------
    // SMOOTH NAVIGATION
    // -----------------------------------------------------

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetID =
                    link.getAttribute("href");

                if (!targetID || targetID === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    // -----------------------------------------------------
    // SCROLL REVEAL
    // -----------------------------------------------------

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .step, .faq-item, .generator-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "translateY(25px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 650,
                                easing:
                                    "cubic-bezier(.2,.8,.2,1)",
                                fill: "forwards"
                            }
                        );

                        obs.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    }


    // -----------------------------------------------------
    // MOUSE PARALLAX — DESKTOP ONLY
    // -----------------------------------------------------

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const hero =
            document.querySelector(".hero");

        const showcase =
            document.querySelector(".qr-showcase");


        if (hero && showcase) {

            hero.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        hero.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;


                    const rotateX =
                        ((centerY - y) /
                            centerY) *
                        3;


                    showcase.style.transform =
                        `perspective(1000px)
                         rotateY(${rotateY}deg)
                         rotateX(${rotateX}deg)`;

                }
            );


            hero.addEventListener(
                "mouseleave",
                () => {

                    showcase.style.transform =
                        "perspective(1000px) rotateY(-4deg) rotateX(2deg)";

                }
            );

        }

    }


    // -----------------------------------------------------
    // INITIALIZE
    // -----------------------------------------------------

    qrColorValue.textContent =
        qrColor.value.toUpperCase();

    bgColorValue.textContent =
        bgColor.value.toUpperCase();


    generateHeroQR();

    generateQR();

});
