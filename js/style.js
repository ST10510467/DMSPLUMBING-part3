
// DMS PLUMBING WEBSITE - JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // DYNAMIC SERVICES
    const services = [
        {
            name: "Burst Water Pipe Repairs",
            description: "Assistance with damaged or burst water pipes and plumbing repairs.",
            category: "general"
        },
        {
            name: "Geyser Replacements",
            description: "Geyser replacement services for customers experiencing geyser problems.",
            category: "general"
        },
        {
            name: "Leak Detection",
            description: "Assistance with finding plumbing leaks and dealing with water problems.",
            category: "specialist"
        },
        {
            name: "Drain Services",
            description: "Drain services for blocked or slow-draining plumbing systems.",
            category: "specialist"
        },
        {
            name: "Drain Camera Inspections",
            description: "Camera inspections help identify problems inside drainage systems.",
            category: "specialist"
        },
        {
            name: "Heat Pumps",
            description: "Heat pump services for customers who require plumbing assistance.",
            category: "specialist"
        },
        {
            name: "Gas Geysers",
            description: "Gas geyser supply and installation services.",
            category: "specialist"
        },
        {
            name: "General Plumbing Maintenance",
            description: "General plumbing maintenance and repairs for homes and businesses.",
            category: "general"
        },
        {
            name: "Water Filtration",
            description: "Water filtration and purification system services.",
            category: "specialist"
        }
    ];

    const serviceList = document.getElementById("service-list");
    const searchInput = document.getElementById("service-search");
    const filterInput = document.getElementById("service-filter");
    const sortInput = document.getElementById("service-sort");
    const serviceCount = document.getElementById("service-count");
    const noServices = document.getElementById("no-services");

    function displayServices() {

        if (!serviceList) return;

        const searchValue = searchInput.value.toLowerCase();
        const filterValue = filterInput.value;
        const sortValue = sortInput.value;

        let filteredServices = services.filter(function (service) {

            const matchesSearch =
                service.name.toLowerCase().includes(searchValue) ||
                service.description.toLowerCase().includes(searchValue);

            const matchesFilter =
                filterValue === "all" ||
                service.category === filterValue;

            return matchesSearch && matchesFilter;
        });

        if (sortValue === "ascending") {
            filteredServices.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        if (sortValue === "descending") {
            filteredServices.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }

        serviceList.innerHTML = "";

        filteredServices.forEach(function (service) {

            const card = document.createElement("article");
            card.className = "service-card";

            const heading = document.createElement("h3");
            heading.textContent = service.name;

            const description = document.createElement("p");
            description.textContent = service.description;

            const link = document.createElement("a");
            link.href = "enquiry.html";
            link.className = "button";
            link.textContent = "Make an Enquiry";

            card.appendChild(heading);
            card.appendChild(description);
            card.appendChild(link);

            serviceList.appendChild(card);
        });

        serviceCount.textContent =
            filteredServices.length + " service(s) found.";

        noServices.hidden = filteredServices.length !== 0;
    }

    if (serviceList) {
        displayServices();

        searchInput.addEventListener("input", displayServices);
        filterInput.addEventListener("change", displayServices);
        sortInput.addEventListener("change", displayServices);
    }


    // FAQ ACCORDION

    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const answer = button.nextElementSibling;
            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));
            answer.hidden = isOpen;

        });
    });


    // IMAGE LIGHTBOX

    const lightboxImages = document.querySelectorAll("[data-lightbox]");

    lightboxImages.forEach(function (img) {

        img.classList.add("lightbox-image");
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", "Open larger image");

        function openImage() {

            const overlay = document.createElement("div");
            overlay.className = "lightbox-overlay";
            overlay.setAttribute("role", "dialog");
            overlay.setAttribute("aria-modal", "true");
            overlay.setAttribute("aria-label", "Enlarged image");

            const enlargedImage = document.createElement("img");
            enlargedImage.src = img.src;
            enlargedImage.alt = img.alt;

            const closeButton = document.createElement("button");
            closeButton.className = "lightbox-close";
            closeButton.textContent = "Close";
            closeButton.setAttribute("aria-label", "Close enlarged image");

            overlay.appendChild(closeButton);
            overlay.appendChild(enlargedImage);
            document.body.appendChild(overlay);

            function closeImage() {
                overlay.remove();
                img.focus();
            }

            closeButton.addEventListener("click", closeImage);

            overlay.addEventListener("click", function (event) {
                if (event.target === overlay) {
                    closeImage();
                }
            });

            overlay.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    closeImage();
                }
            });

            closeButton.focus();
        }

        img.addEventListener("click", openImage);

        img.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage();
            }
        });
    });


    // FORM VALIDATION AND EMAIL PREPARATION

    function setupForm(formId, messageId, subject) {

        const form = document.getElementById(formId);

        if (!form) return;

        const messageBox = document.getElementById(messageId);

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const formData = new FormData(form);
            const values = [];

            formData.forEach(function (value, key) {
                values.push(key + ": " + value);
            });

            const businessEmail = "REPLACE_WITH_DMS_EMAIL";

            if (businessEmail === "REPLACE_WITH_DMS_EMAIL") {
                messageBox.textContent =
                    "Your form is valid. Please contact the company directly or add its email address in script.js to prepare your message.";

                messageBox.className = "form-message warning";
                return;
            }

            const mailBody = encodeURIComponent(values.join("\n"));

            const mailLink =
                "mailto:" + businessEmail +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + mailBody;

            window.location.href = mailLink;

            messageBox.textContent =
                "Your email application should open with your message ready to send.";

            messageBox.className = "form-message success";
        });
    }

    setupForm(
        "enquiry-form",
        "enquiry-message",
        "DMS Plumbing Service Enquiry"
    );

    setupForm(
        "contact-form",
        "contact-message-status",
        "DMS Plumbing Contact Message"
    );

});
