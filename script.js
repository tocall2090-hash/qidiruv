/* =================================================================
   1. HARFMA-HARF YOZILIB O'CHUVCHI MATN (TYPEWRITER ANIMATSIYASI)
================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const typewriterElement = document.getElementById("typewriter-target");

    if (typewriterElement) {
        const phrasesData = typewriterElement.getAttribute("data-phrases");
        let phrases = [];

        try {
            phrases = JSON.parse(phrasesData);
        } catch (error) {
            phrases = [
                "bizning rasmiy veb-saytimizga xush kelibsiz!",
                "biznesingizni biz bilan rivojlantiring!",
                "eng zamonaviy yechimlarni taqdim etamiz!"
            ];
        }

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 40 : 85;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typewriterElement.textContent = "";
        setTimeout(typeEffect, 500);
    }

    /* =================================================================
       2. INSTAGRAM USLUBIDAGI 3 CHIZIQLI MENYU (SIDE DRAWER)
    ================================================================== */
    const openDrawerBtn = document.getElementById("open-drawer-btn");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const sideDrawer = document.getElementById("side-drawer");
    const drawerBackdrop = document.getElementById("drawer-backdrop");

    function openDrawer() {
        sideDrawer.classList.add("open");
        drawerBackdrop.classList.add("active");
        sideDrawer.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        sideDrawer.classList.remove("open");
        drawerBackdrop.classList.remove("active");
        sideDrawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (openDrawerBtn) openDrawerBtn.addEventListener("click", openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sideDrawer.classList.contains("open")) {
            closeDrawer();
        }
    });

    /* =================================================================
       3. TUNGI REJIM (DARK MODE) VA SOZLAMALARNI SAQLASH
    ================================================================== */
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", () => {
            if (darkModeToggle.checked) {
                document.body.classList.add("dark-theme");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-theme");
                localStorage.setItem("theme", "light");
            }
        });
    }

    /* =================================================================
       4. TIL TANLASH TUGMALARI (UZ / RU / EN)
    ================================================================== */
    const langButtons = document.querySelectorAll(".lang-choice-btn");

    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            langButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedLang = btn.getAttribute("data-lang");
            localStorage.setItem("selectedLang", selectedLang);
        });
    });

    /* =================================================================
       5. ALOQA FORMASI YUBORILGANDA XABAR BERISH
    ================================================================== */
    const contactForm = document.querySelector(".main-contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Rahmat! Murojaatingiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.");
            contactForm.reset();
        });
    }
});
