/* ==========================================================================
   INTERACTIVE LOGIC: AKASH ANALYTICS PORTFOLIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* === 1. Mobile Navigation Logic === */
    const mobileToggle = document.querySelector(".mobile-nav-toggle");
    const mobileClose = document.querySelector(".mobile-nav-close");
    const mobileOverlay = document.querySelector(".mobile-nav-overlay");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    const toggleMenu = (open) => {
        mobileOverlay.classList.toggle("active", open);
        document.body.style.overflow = open ? "hidden" : "";
    };

    if (mobileToggle) mobileToggle.addEventListener("click", () => toggleMenu(true));
    if (mobileClose) mobileClose.addEventListener("click", () => toggleMenu(false));
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => toggleMenu(false));
    });


    /* === 2. Tab Switching Logic === */
    const tabDash = document.getElementById("tab-dash");
    const tabClean = document.getElementById("tab-clean");
    const panelDash = document.getElementById("panel-dash");
    const panelClean = document.getElementById("panel-clean");

    const switchTab = (activeTab, activePanel, inactiveTab, inactivePanel) => {
        activeTab.classList.add("active");
        activePanel.classList.add("active");
        inactiveTab.classList.remove("active");
        inactivePanel.classList.remove("active");
    };

    if (tabDash && tabClean) {
        tabDash.addEventListener("click", () => switchTab(tabDash, panelDash, tabClean, panelClean));
        tabClean.addEventListener("click", () => switchTab(tabClean, panelClean, tabDash, panelDash));
    }


    /* === 3. Chart.js Dashboard Implementation === */
    const regionData = {
        all: {
            revenue: [45000, 52000, 49000, 63000, 58000, 71000, 85000, 78000, 92000, 99000, 110000, 124000],
            categories: [350000, 280000, 420000, 190000],
            kpiRev: "$1,240,500",
            kpiCust: "12,430",
            kpiAov: "$99.80"
        },
        north: {
            revenue: [15000, 18000, 16000, 22000, 19000, 24000, 30000, 25000, 32000, 35000, 42000, 48000],
            categories: [120000, 90000, 150000, 62000],
            kpiRev: "$422,000",
            kpiCust: "4,110",
            kpiAov: "$102.68"
        },
        south: {
            revenue: [18000, 22000, 21000, 25000, 23000, 29000, 33000, 31000, 36000, 38000, 41000, 46000],
            categories: [150000, 110000, 140000, 70000],
            kpiRev: "$470,000",
            kpiCust: "4,820",
            kpiAov: "$97.51"
        },
        west: {
            revenue: [12000, 12000, 12000, 16000, 16000, 18000, 22000, 22000, 24000, 26000, 27000, 30000],
            categories: [80000, 80000, 130000, 58000],
            kpiRev: "$348,500",
            kpiCust: "3,500",
            kpiAov: "$99.57"
        }
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const categoryLabels = ["Python Automation", "PowerBI Reports", "Advanced Excel", "Other Analytics"];

    // Chart Options Styles
    const chartStyles = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)"
                },
                ticks: {
                    color: "hsl(215, 20%, 72%)",
                    font: { family: "Inter", size: 10 }
                }
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.05)"
                },
                ticks: {
                    color: "hsl(215, 20%, 72%)",
                    font: { family: "Inter", size: 10 }
                }
            }
        }
    };

    // Revenue Chart Context
    const ctxRevenue = document.getElementById("revenueChart");
    let revenueChart;
    if (ctxRevenue) {
        revenueChart = new Chart(ctxRevenue, {
            type: "line",
            data: {
                labels: months,
                datasets: [{
                    label: "Revenue ($)",
                    data: regionData.all.revenue,
                    borderColor: "hsl(190, 95%, 50%)",
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "hsl(190, 95%, 50%)",
                    pointRadius: 4
                }]
            },
            options: chartStyles
        });
    }

    // Category Chart Context
    const ctxCategory = document.getElementById("categoryChart");
    let categoryChart;
    if (ctxCategory) {
        categoryChart = new Chart(ctxCategory, {
            type: "bar",
            data: {
                labels: categoryLabels,
                datasets: [{
                    label: "Contracts Value ($)",
                    data: regionData.all.categories,
                    backgroundColor: [
                        "rgba(99, 102, 241, 0.7)",
                        "rgba(6, 182, 212, 0.7)",
                        "rgba(16, 185, 129, 0.7)",
                        "rgba(239, 68, 68, 0.7)"
                    ],
                    borderColor: [
                        "hsl(250, 85%, 65%)",
                        "hsl(190, 95%, 50%)",
                        "hsl(145, 80%, 45%)",
                        "hsl(355, 85%, 60%)"
                    ],
                    borderWidth: 1.5,
                    borderRadius: 4
                }]
            },
            options: {
                ...chartStyles,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Handle Region Buttons click
    const regionButtons = document.querySelectorAll(".region-btn");
    const kpiRevenue = document.getElementById("kpi-revenue");
    const kpiCustomers = document.getElementById("kpi-customers");
    const kpiAov = document.getElementById("kpi-aov");

    regionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            regionButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const region = btn.dataset.region;
            const data = regionData[region];

            if (data) {
                // Update KPIs
                if (kpiRevenue) kpiRevenue.textContent = data.kpiRev;
                if (kpiCustomers) kpiCustomers.textContent = data.kpiCust;
                if (kpiAov) kpiAov.textContent = data.kpiAov;

                // Update Revenue Chart
                if (revenueChart) {
                    revenueChart.data.datasets[0].data = data.revenue;
                    revenueChart.update();
                }

                // Update Category Chart
                if (categoryChart) {
                    categoryChart.data.datasets[0].data = data.categories;
                    categoryChart.update();
                }
            }
        });
    });


    /* === 4. Interactive Data Cleaning Simulation === */
    const btnClean = document.getElementById("btn-run-cleaning");
    const cleaningOverlay = document.getElementById("cleaning-overlay");
    const consoleLogs = document.getElementById("console-logs");
    const cleanTable = document.getElementById("clean-table");

    const cleanedData = [
        { name: "Akash Analytics", code: "PY-DASH-101", amount: "$1,200.00", date: "2026-07-06", fixes: [true, false, true, false] },
        { name: "Anonymous <span class='cell-fixed'>(Imputed)</span>", code: "EXCEL-FORM", amount: "$950.50 <span class='cell-fixed'>(Float)</span>", date: "2026-06-02 <span class='cell-fixed'>(ISO)</span>", fixes: [true, false, true, true] },
        { name: "John Smith", code: "PY-DASH-101 <span class='cell-fixed'>(Upper)</span>", amount: "$450.00 <span class='cell-fixed'>(Currency)</span>", date: "2026-06-05 <span class='cell-fixed'>(ISO)</span>", fixes: [false, true, true, true] },
        { name: "Sara Connor", code: "POWER-BI-PRO", amount: "$3,100.99", date: "2026-06-04 <span class='cell-fixed'>(ISO)</span>", fixes: [false, false, false, true] },
        { name: "David Lane", code: "N/A <span class='cell-fixed'>(Imputed)</span>", amount: "$120.00", date: "2026-06-01", fixes: [false, true, false, false] }
    ];

    const logMessages = [
        "&gt; df = pd.read_csv('dirty_business_logs.csv')",
        "&gt; df.info() -> Found missing and messy entries.",
        "&gt; df['Customer Name'].str.strip().str.title()",
        "&gt; df['Customer Name'].fillna('Anonymous', inplace=True)",
        "&gt; df['Product Code'].str.upper().fillna('N/A')",
        "&gt; df['Transaction Amount'].replace('[\\$, USD]', '') -> float",
        "&gt; pd.to_datetime(df['Date Raw']).dt.strftime('%Y-%m-%d')",
        "&gt; df.to_sql('cleaned_transactions', engine)",
        "✨ Dataset successfully cleaned! Writing to dashboard view..."
    ];

    if (btnClean) {
        btnClean.addEventListener("click", () => {
            // Disable button during execution
            btnClean.disabled = true;
            btnClean.classList.add("blurred-table");
            
            // Show Overlay & Reset logs
            cleaningOverlay.classList.remove("hidden");
            consoleLogs.innerHTML = "";
            
            // Populate logs sequentially
            let currentLogIndex = 0;
            const logInterval = setInterval(() => {
                if (currentLogIndex < logMessages.length) {
                    const logParagraph = document.createElement("p");
                    logParagraph.innerHTML = logMessages[currentLogIndex];
                    consoleLogs.appendChild(logParagraph);
                    consoleLogs.scrollTop = consoleLogs.scrollHeight; // Auto-scroll
                    currentLogIndex++;
                } else {
                    clearInterval(logInterval);
                    completeCleaningSimulation();
                }
            }, 550);
        });
    }

    const completeCleaningSimulation = () => {
        // Hide overlay and unblur clean table
        cleaningOverlay.classList.add("hidden");
        cleanTable.classList.remove("blurred-table");
        cleanTable.classList.add("cleaned");

        // Insert Clean Data rows
        const tbody = cleanTable.querySelector("tbody");
        tbody.innerHTML = ""; // Clear placeholder

        cleanedData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.code}</td>
                <td>${row.amount}</td>
                <td>${row.date}</td>
            `;
            tbody.appendChild(tr);
        });

        // Trigger icon reload for new cells if needed
        lucide.createIcons();
    };


    /* === 5. Scroll Animations (Intersection Observer) === */
    const fadeElements = document.querySelectorAll(".fade-in");
    
    if (fadeElements.length > 0) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => scrollObserver.observe(el));
    }


    /* === 6. Form Submission Handling === */
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm && formFeedback) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page redirect/reload
            
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = "<span>Sending...</span>";

            const nameVal = document.getElementById("name").value;
            const phoneVal = document.getElementById("phone").value;
            const emailVal = document.getElementById("email").value;
            const messageVal = document.getElementById("message").value;

            // Submit using FormSubmit AJAX API
            fetch("https://formsubmit.co/ajax/akash.sonawan34@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: nameVal,
                    Phone: phoneVal,
                    Email: emailVal,
                    Message: messageVal,
                    _captcha: "false",
                    _subject: "New message from Akash Analytics Portfolio",
                    _template: "table"
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Form submission failed");
                }
                return response.json();
            })
            .then(data => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Show Success Message
                formFeedback.textContent = "Sent successfully!";
                formFeedback.className = "form-feedback success";
                formFeedback.classList.remove("hidden");

                setTimeout(() => {
                    formFeedback.classList.add("hidden");
                }, 6000);
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                formFeedback.textContent = "❌ Failed to send message. Please try again.";
                formFeedback.className = "form-feedback error";
                formFeedback.classList.remove("hidden");
            });
        });
    }
});
