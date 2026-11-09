
console.log("DMS JavaScript is working!");

document.addEventListener("DOMContentLoaded", function () {

    // FAQ ACCORDION

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;

            if (!answer) {
                return;
            }

            const isOpen = answer.hidden === false;

            document.querySelectorAll(".faq-answer").forEach(function (item) {
                item.hidden = true;
            });

            document.querySelectorAll(".faq-question span").forEach(function (sign) {
                sign.textContent = "+";
            });

            faqQuestions.forEach(function (button) {
                button.setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                answer.hidden = false;
                question.setAttribute("aria-expanded", "true");
                question.querySelector("span").textContent = "-";
            }

        });

    });


    // PLUMBING SERVICES

    const serviceList = document.getElementById("service-list");

    if (serviceList) {

        const services = [

            {
                name: "Burst Water Pipe Repairs",
                category: "general",
                description: "We help repair damaged or burst water pipes to reduce water loss and prevent further damage."
            },

            {
                name: "Geyser Replacements",
                category: "general",
                description: "We assist with replacing old or damaged geysers to help restore your hot water supply."
            },

            {
                name: "Leak Detection",
                category: "general",
                description: "We help find hidden water leaks in pipes, walls and other areas."
            },

            {
                name: "Drain Services",
                category: "general",
                description: "We help with blocked drains and drainage problems in homes and businesses."
            },

            {
                name: "Drain Camera Inspections",
                category: "specialist",
                description: "A special camera is used to check inside pipes and help identify blockages or damage."
            },

            {
                name: "Heat Pumps",
                category: "specialist",
                description: "We provide assistance with heat pump systems used to heat water."
            },

            {
                name: "Gas Geysers",
                category: "specialist",
                description: "We provide assistance with gas geyser systems and related plumbing needs."
            },

            {
                name: "General Plumbing Maintenance",
                category: "general",
                description: "We help with everyday plumbing problems and maintenance to keep your plumbing in good condition."
            },

            {
                name: "Water Filtration",
                category: "specialist",
                description: "We provide water filtration solutions to help improve the quality of your water."
            }

        ];


        const searchInput = document.getElementById("service-search");
        const filterInput = document.getElementById("service-filter");
        const sortInput = document.getElementById("service-sort");
        const serviceCount = document.getElementById("service-count");
        const noServices = document.getElementById("no-services");


        // DISPLAY SERVICES

        function displayServices() {

            const searchText = searchInput.value.toLowerCase().trim();
            const selectedCategory = filterInput.value;
            const sortOrder = sortInput.value;

            let filteredServices = services.filter(function (service) {

                const matchesSearch =
                    service.name.toLowerCase().includes(searchText) ||
                    service.description.toLowerCase().includes(searchText);

                const matchesCategory =
                    selectedCategory === "all" ||
                    service.category === selectedCategory;

                return matchesSearch && matchesCategory;

            });


            // SORT SERVICES

            if (sortOrder === "ascending") {

                filteredServices.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });

            } else if (sortOrder === "descending") {

                filteredServices.sort(function (a, b) {
                    return b.name.localeCompare(a.name);
                });

            }


            // CLEAR OLD SERVICES

            serviceList.innerHTML = "";


            // SHOW NUMBER OF RESULTS

            serviceCount.textContent =
                filteredServices.length + " service(s) found.";


            // SHOW MESSAGE IF NO SERVICES MATCH

            if (filteredServices.length === 0) {

                noServices.hidden = false;
                return;

            } else {

                noServices.hidden = true;

            }


            // CREATE SERVICE CARDS

            filteredServices.forEach(function (service) {

                const card = document.createElement("div");
                card.className = "service-card";

                const heading = document.createElement("h3");
                heading.textContent = service.name;

                const description = document.createElement("p");
                description.textContent = service.description;

                card.appendChild(heading);
                card.appendChild(description);

                serviceList.appendChild(card);

            });

        }


        // UPDATE SERVICES WHEN CUSTOMER SEARCHES

        searchInput.addEventListener("input", displayServices);


        // UPDATE SERVICES WHEN CUSTOMER CHOOSES A CATEGORY

        filterInput.addEventListener("change", displayServices);


        // UPDATE SERVICES WHEN CUSTOMER CHANGES SORTING

        sortInput.addEventListener("change", displayServices);


        // DISPLAY ALL SERVICES WHEN PAGE LOADS

        displayServices();

    }

});

