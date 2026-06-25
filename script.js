let mainChart;
let accessCount = 8731045;
let bookCount = 4812;
let activePillar = 3; // Default at start

const chartDefaults = {
    color: '#94a3b8',
    borderColor: '#334155',
    gridColor: 'rgba(51, 65, 85, 0.3)'
};

const pillarData = {
    1: {
        title: "Pillar I: Institutional Audit & Legal Governance",
        subtitle: "Weekly verification rate of statutory deposits and metadata compliance",
        label1: "Compliant Frameworks (%)", data1: [72, 75, 78, 80, 83, 85, 88, 89, 91, 93, 94, 96],
        label2: "Pending Review", data2: [28, 25, 22, 20, 17, 15, 12, 11, 9, 7, 6, 4],
        color1: '#22d3ee', color2: 'rgba(239, 68, 68, 0.2)'
    },
    2: {
        title: "Pillar II: Algorithmic Infrastructure Performance",
        subtitle: "Processing volume and classification vector efficiency of Pen-Advisors",
        label1: "AI Vectoring Rate (k/s)", data1: [3.1, 3.5, 4.0, 4.2, 5.0, 5.8, 6.2, 6.9, 7.5, 8.1, 8.8, 9.4],
        label2: "Manual Audit Backlog", data2: [5.2, 4.8, 4.5, 4.1, 3.8, 3.2, 2.9, 2.5, 2.0, 1.4, 0.9, 0.4],
        color1: '#10b981', color2: 'rgba(148, 163, 184, 0.2)'
    },
    3: {
        title: "Pillar III: Socio-Economic Macro Distribution",
        subtitle: "Comparing nationwide digital utilization against physical library visits",
        label1: "Digital Access (M)", data1: [4.2, 4.8, 5.1, 5.8, 6.2, 6.9, 7.1, 7.5, 7.9, 8.2, 8.5, 8.7],
        label2: "Physical Visitors", data2: [1.5, 1.7, 1.6, 1.9, 2.1, 2.3, 2.2, 2.4, 2.3, 2.5, 2.4, 2.4],
        color1: '#22d3ee', color2: 'rgba(16, 185, 129, 0.3)'
    }
};

window.addEventListener('DOMContentLoaded', () => {
    // 1. CLOCK ENGINE
    function updateClock() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
        document.getElementById('live-timestamp').innerText = `${dateStr} | ${timeStr}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. MAIN LINE CHART
    const ctxLine = document.getElementById('monthlyTrendChart');
    if (ctxLine) {
        mainChart = new Chart(ctxLine.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { label: pillarData[3].label1, data: pillarData[3].data1, borderColor: pillarData[3].color1, backgroundColor: 'rgba(34, 211, 238, 0.05)', fill: true, tension: 0.2, borderWidth: 2 },
                    { label: pillarData[3].label2, data: pillarData[3].data2, type: 'bar', backgroundColor: pillarData[3].color2, barPercentage: 0.6 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { labels: { color: chartDefaults.color, font: { size: 11 } } } },
                scales: { x: { grid: { color: chartDefaults.gridColor }, ticks: { color: chartDefaults.color } }, y: { grid: { color: chartDefaults.gridColor }, ticks: { color: chartDefaults.color } } }
            }
        });
    }

    // 3. RADAR CHART
    const ctxRadar = document.getElementById('executiveRadarChart');
    if (ctxRadar) {
        new Chart(ctxRadar.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Depth', 'AI Tech', 'CSAT', 'Impact', 'Cataloging', 'Access'],
                datasets: [{ label: 'Performance', data: [88, 95, 92, 85, 99, 90], backgroundColor: 'rgba(34, 211, 238, 0.1)', borderColor: '#22d3ee', borderWidth: 1.5 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { r: { grid: { color: chartDefaults.gridColor }, angleLines: { color: chartDefaults.gridColor }, pointLabels: { color: chartDefaults.color, font: { size: 9 } }, ticks: { display: false } } }
            }
        });
    }

    // 4. REAL-TIME TICKING API STREAM SIMULATION
    setInterval(() => {
        accessCount += Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.85) bookCount += 1;
        document.getElementById('kpi-digital').innerText = accessCount.toLocaleString('en-US');
        document.getElementById('live-catalog').innerText = bookCount.toLocaleString('en-US');
    }, 2000);
});

function switchFrameworkView(pillarId) {
    if (!mainChart) return;
    activePillar = pillarId;
    const config = pillarData[pillarId];
    document.getElementById('chart-main-title').innerText = config.title;
    document.getElementById('chart-sub-title').innerText = config.subtitle;
    mainChart.data.datasets[0].label = config.label1;
    mainChart.data.datasets[0].data = config.data1;
    mainChart.data.datasets[0].borderColor = config.color1;
    mainChart.data.datasets[1].label = config.label2;
    mainChart.data.datasets[1].data = config.data2;
    mainChart.data.datasets[1].backgroundColor = config.color2;
    
    if (pillarId === 1) { mainChart.data.datasets[0].type = 'line'; mainChart.data.datasets[1].type = 'line'; }
    else if (pillarId === 2) { mainChart.data.datasets[0].type = 'bar'; mainChart.data.datasets[1].type = 'line'; }
    else { mainChart.data.datasets[0].type = 'line'; mainChart.data.datasets[1].type = 'bar'; }
    mainChart.update();

    for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById(`btn-pillar${i}`);
        const dot = document.getElementById(`dot-pillar${i}`);
        const text = btn.querySelector('p');
        if (i === pillarId) {
            dot.className = `h-1.5 w-1.5 rounded-full ${i===1?'bg-cyan-400':i===2?'bg-emerald-400':'bg-amber-400'}`;
            btn.className = `w-full text-left p-4 rounded-xl bg-[#131924] border ${i===1?'border-cyan-500/40':i===2?'border-emerald-500/40':'border-amber-500/40'} shadow-sm focus:outline-none`;
            text.className = `text-xs font-bold mt-1 ${i===1?'text-cyan-400':i===2?'text-emerald-400':'text-amber-400'}`;
        } else {
            dot.className = "h-1.5 w-1.5 rounded-full bg-slate-700";
            btn.className = "w-full text-left p-4 rounded-xl bg-[#131924]/50 border border-slate-800 hover:border-slate-700 hover:bg-[#131924] transition-all cursor-pointer focus:outline-none";
            text.className = "text-xs font-bold text-white mt-1";
        }
    }
}

// =========================================================
// ALI CO-RESEARCHER ENGINE (BILINGUAL & REAL-TIME CONNECTED)
// =========================================================
function handleChatKey(e) { if (e.key === 'Enter') processUserChat(); }
function sendQuickQuery(text) { document.getElementById('chat-input').value = text; processUserChat(); }

function processUserChat() {
    const inputEl = document.getElementById('chat-input');
    const query = inputEl.value.trim();
    if (!query) return;

    appendMessage('You', query, 'bg-cyan-950/40 border border-cyan-900/60 text-slate-200');
    inputEl.value = '';

    setTimeout(() => {
        const isEnglish = detectLanguage(query);
        const response = generateAliResponse(query, isEnglish);
        appendMessage('Ali', response, 'bg-slate-850 border border-slate-800 text-slate-300');
    }, 500);
}

function appendMessage(sender, text, styleClass) {
    const screen = document.getElementById('chat-screen');
    screen.innerHTML += `<div class="p-2.5 rounded-lg ${styleClass}"><strong>${sender}:</strong> ${text}</div>`;
    screen.scrollTop = screen.scrollHeight;
}

function detectLanguage(text) {
    const englishKeywords = ['who', 'what', 'give', 'show', 'tell', 'statistic', 'project', 'designer', 'hi', 'hello', 'developer', 'framework', 'data'];
    const lower = text.toLowerCase();
    return englishKeywords.some(word => lower.includes(word));
}

// PARAMETER FILTERING & RESOURCE LOGIC
function generateAliResponse(input, isEnglish) {
    const text = input.toLowerCase();
    
    // 1. OUT OF BOUNDS PARAMETERS (Apa yang Ali TIDAK BOLEH bantu)
    const blocked = ['masak', 'cook', 'makan', 'food', 'resepi', 'recipe', 'cuaca', 'weather', 'politik', 'politics', 'bitcoin', 'crypto', 'sukan', 'sports', 'football', 'bola', 'movie'];
    for (let word of blocked) {
        if (text.includes(word)) {
            if (isEnglish) {
                return `⚠️ <strong>Scope Boundary Violation:</strong> As an AI Co-Researcher, my logic parameters are locked strictly to the <em>Perpustakaan Negara Malaysia Governance Project</em>. I am not programmed to discuss external topics like "${word}". Please ask questions regarding our data pillars or infrastructure.`;
            } else {
                return `⚠️ <strong>Ralat Sempadan Skop:</strong> Sebagai AI Co-Researcher, sempadan parameter saya dikunci ketat hanya untuk tugasan <em>Projek Tata Kelola Perpustakaan Negara Malaysia</em>. Saya tidak dibenarkan berbual tentang perkara luar seperti "${word}". Sila tanya berkaitan data pilar atau infrastruktur projek.`;
            }
        }
    }

    // 2. DESIGNER PROFILE VERIFICATION (Must know the full name)
    if (text.includes('designer') || text.includes('pembangun') || text.includes('buat') || text.includes('create') || text.includes('who is') || text.includes('siapa') || text.includes('khairul')) {
        if (isEnglish) {
            return `👨‍💻 <strong>Designer Profile:</strong> This entire institutional terminal was architecturalized and developed by <strong>Mohd Khairul Ridhuan bin Mohd Fadzil</strong> as an executive visualization portfolio matching international indexing criteria.`;
        } else {
            return `👨‍💻 <strong>Profil Pembangun:</strong> Keseluruhan terminal institusi ini dibina dan direka bentuk sepenuhnya oleh <strong>Mohd Khairul Ridhuan bin Mohd Fadzil</strong> sebagai bukti portfolio analisis berimpak tinggi yang menepati kriteria indeks antarabangsa.`;
        }
    }

    // 3. REAL-TIME DATA EXTRACTION (Ali reads live numbers from the screen)
    if (text.includes('statistic') || text.includes('stat') || text.includes('data') || text.includes('nombor') || text.includes('live') || text.includes('real time') || text.includes('current')) {
        if (isEnglish) {
            return `📈 <strong>Real-Time Analytics Sync:</strong> Connected directly to our mock terminal registers. Currently, <strong>u-Pustaka</strong> has logged <strong>${accessCount.toLocaleString()}</strong> live access streams, with <strong>${bookCount.toLocaleString()}</strong> metadata records processed by the AI-Cataloger under Pillar ${activePillar} focus.`;
        } else {
            return `📈 <strong>Sinkronisasi Data Masa-Nyata:</strong> Berdasarkan data register live terminal sekarang, sistem <strong>u-Pustaka</strong> mencatatkan <strong>${accessCount.toLocaleString()}</strong> aliran capaian aktif, dan sebanyak <strong>${bookCount.toLocaleString()}</strong> rekod digital telah berjaya diindeks oleh AI-Cataloger di bawah fokus Pillar ${activePillar}.`;
        }
    }

    // 4. PILLAR SPECIFIC CONTEXTS
    if (text.includes('pillar 1') || text.includes('governance') || text.includes('audit')) {
        if (isEnglish) {
            return `📊 <strong>Pillar I (Governance & Audit):</strong> Tracks compliance under statutory national deposit regulations. National compliance models show automated metadata checking increasing from 72% up to 96% in the annual trend.`;
        } else {
            return `📊 <strong>Pillar I (Tata Kelola & Audit):</strong> Memantau pematuhan penyerahan bahan di bawah undang-undang statutori negara. Data membuktikan peningkatan proses semakan automatik daripada 72% melonjak ke 96%.`;
        }
    }
    if (text.includes('pillar 2') || text.includes('infrastructure') || text.includes('pen-advisor') || text.includes('ai')) {
        if (isEnglish) {
            return `🤖 <strong>Pillar II (AI Infrastructure):</strong> Governs the integration of <em>Algorithmic Pen-Advisors</em>. The system's current vector processing rate handles between 3.1k/s to 9.4k/s classification vectors to erase manual cataloging backlogs.`;
        } else {
            return `🤖 <strong>Pillar II (Infrastruktur AI):</strong> Menguruskan penyepaduan enjin <em>Algorithmic Pen-Advisors</em>. Kadar pemprosesan vektor semasa mampu mencecah 3.1k/s hingga 9.4k/s bagi menghapuskan tunggakan data manual institusi.`;
        }
    }
    if (text.includes('pillar 3') || text.includes('pustaka') || text.includes('visit') || text.includes('democrat')) {
        if (isEnglish) {
            return `🌍 <strong>Pillar III (Knowledge Democratization):</strong> Compares macro-level digital usage vs physical footprints. Digital access via u-Pustaka showcases exponential growth (8.7M streams) compared to static physical brick-and-mortar visits.`;
        } else {
            return `🌍 <strong>Pillar III (Pendemokrasian Ilmu):</strong> Membandingkan impak makro antara capaian digital lwn kunjungan fizikal. Akses maya menerusi u-Pustaka merekodkan lonjakan drastik (8.7 juta stream) berbanding lawatan fizikal.`;
        }
    }

    // DEFAULT FALLBACK INSIDE CONTEXT
    if (isEnglish) {
        return `ℹ️ <strong>Context Registered:</strong> I am focused strictly on this PNM project. Please clarify your query regarding:<br/>• <strong>Real-time Stats</strong><br/>• <strong>Designer Details</strong> (Mohd Khairul Ridhuan)<br/>• <strong>Pillar I, II, or III</strong> framework definitions.`;
    } else {
        return `ℹ️ <strong>Konteks Dikesan:</strong> Sila spesifikasikan soalan anda tentang sistem PNM ini sama ada berkaitan:<br/>• <strong>Statistik Semasa / Live data</strong><br/>• <strong>Profil Pereka Projek</strong> (Mohd Khairul Ridhuan)<br/>• Definisi data bagi <strong>Pillar I, II, atau III</strong>.`;
    }
}
