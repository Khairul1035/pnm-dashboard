let mainChart;
let accessCount = 8731045;
let bookCount = 4812;

const chartDefaults = {
    color: '#94a3b8',
    borderColor: '#334155',
    gridColor: 'rgba(51, 65, 85, 0.3)'
};

const pillarData = {
    1: {
        title: "Pillar I: Institutional Audit & Legal Governance",
        subtitle: "Weekly verification rate of statutory deposits and metadata compliance",
        label1: "Compliant Frameworks (%)",
        data1: [72, 75, 78, 80, 83, 85, 88, 89, 91, 93, 94, 96],
        label2: "Pending Review",
        data2: [28, 25, 22, 20, 17, 15, 12, 11, 9, 7, 6, 4],
        color1: '#22d3ee', color2: 'rgba(239, 68, 68, 0.2)'
    },
    2: {
        title: "Pillar II: Algorithmic Infrastructure Performance",
        subtitle: "Processing volume and classification vector efficiency of Pen-Advisors",
        label1: "AI Vectoring Rate (k/s)",
        data1: [3.1, 3.5, 4.0, 4.2, 5.0, 5.8, 6.2, 6.9, 7.5, 8.1, 8.8, 9.4],
        label2: "Manual Audit Backlog",
        data2: [5.2, 4.8, 4.5, 4.1, 3.8, 3.2, 2.9, 2.5, 2.0, 1.4, 0.9, 0.4],
        color1: '#10b981', color2: 'rgba(148, 163, 184, 0.2)'
    },
    3: {
        title: "Pillar III: Socio-Economic Macro Distribution",
        subtitle: "Comparing nationwide digital utilization against physical library visits",
        label1: "Digital Access (M)",
        data1: [4.2, 4.8, 5.1, 5.8, 6.2, 6.9, 7.1, 7.5, 7.9, 8.2, 8.5, 8.7],
        label2: "Physical Visitors",
        data2: [1.5, 1.7, 1.6, 1.9, 2.1, 2.3, 2.2, 2.4, 2.3, 2.5, 2.4, 2.4],
        color1: '#22d3ee', color2: 'rgba(16, 185, 129, 0.3)'
    }
};

window.addEventListener('DOMContentLoaded', () => {
    // 1. LIVE TIME ENGINE
    function updateClock() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
        const clockEl = document.getElementById('live-timestamp');
        if (clockEl) clockEl.innerText = `${dateStr} | ${timeStr}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. INITIALIZE CHART
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

    // 3. RADAR COMPLIANCE CHART
    const ctxRadar = document.getElementById('executiveRadarChart');
    if (ctxRadar) {
        new Chart(ctxRadar.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Depth', 'AI Tech', 'CSAT', 'Impact', 'Cataloging', 'Access'],
                datasets: [
                    { label: 'Performance', data: [88, 95, 92, 85, 99, 90], backgroundColor: 'rgba(34, 211, 238, 0.1)', borderColor: '#22d3ee', borderWidth: 1.5 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { r: { grid: { color: chartDefaults.gridColor }, angleLines: { color: chartDefaults.gridColor }, pointLabels: { color: chartDefaults.color, font: { size: 9 } }, ticks: { display: false } } }
            }
        });
    }
});

function switchFrameworkView(pillarId) {
    if (!mainChart) return;
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

// ==========================================
// AI CO-RESEARCHER ENGINE (STRICT SCOPE LOGIC)
// ==========================================
function handleChatKey(e) { if (e.key === 'Enter') processUserChat(); }
function sendQuickQuery(text) { document.getElementById('chat-input').value = text; processUserChat(); }

function processUserChat() {
    const inputEl = document.getElementById('chat-input');
    const query = inputEl.value.trim();
    if (!query) return;

    appendMessage('You', query, 'bg-cyan-950/40 border border-cyan-900/60 text-slate-200');
    inputEl.value = '';

    // Simulate Network/Processing latency for real-time vibe
    setTimeout(() => {
        const response = generateStrictAIResponse(query);
        appendMessage('AI Researcher', response, 'bg-slate-850 border border-slate-800 text-slate-300');
    }, 600);
}

function appendMessage(sender, text, styleClass) {
    const screen = document.getElementById('chat-screen');
    const msgHtml = `<div class="p-2.5 rounded-lg ${styleClass}"><strong>${sender}:</strong> ${text}</div>`;
    screen.innerHTML += msgHtml;
    screen.scrollTop = screen.scrollHeight;
}

// STRICT CONTEXT LOGIC (PARAMETER FILTER)
function generateStrictAIResponse(input) {
    const text = input.toLowerCase();
    
    // Strict Parameter Boundaries Check (Apa yang AI TIDAK BOLEH bantu)
    const outOfBoundsKeywords = ['masak', 'makan', 'resepi', 'cuaca', 'lagu', 'movie', 'politik', 'bitcoin', 'kripto', 'sukan', 'bola'];
    for (let word of outOfBoundsKeywords) {
        if (text.includes(word)) {
            return `⚠️ <strong>Ralat Skop:</strong> Maaf, sebagai AI Co-Researcher Khairul, saya telah dikunci secara parameter hanya untuk membincangkan projek <em>Perpustakaan Negara Malaysia Governance Terminal</em> ini sahaja. Saya tidak dibenarkan berbual tentang perkara luar atau merapu berkaitan "${word}". Sila tanyakan soalan berkenaan data tatatanda pilar kami.`;
        }
    }

    // Context Evaluation (Apa yang AI BOLEH bantu)
    if (text.includes('pillar 1') || text.includes('governance') || text.includes('audit')) {
        return `📊 <strong>Pillar I (Tata Kelola):</strong> Berfokuskan pengauditan automasi standard. Sistem memantau deposit statutori digital Malaysia bagi memastikan pematuhan dokumen nasional mencecah unjuran penanda aras IFLA. Data semasa menunjukkan trend pematuhan meningkat dari 72% ke 96% dalam kitaran tahunan.`;
    }
    if (text.includes('pillar 2') || text.includes('infrastructure') || text.includes('pen-advisor') || text.includes('ai')) {
        return `🤖 <strong>Pillar II (Infrastruktur AI):</strong> Ini melibatkan integrasi model <em>Algorithmic Pen-Advisors</em> yang menggerakkan klasifikasi vektor secara autonomi. Ia mampu menapis, memproses, dan mengkatalog indeks data pada kadar purata 3.1k/s sehingga 9.4k/s, sekaligus mengurangkan baki tugasan semakan manual institusi.`;
    }
    if (text.includes('pillar 3') || text.includes('socio') || text.includes('demokrat') || text.includes('pustaka')) {
        return `🌍 <strong>Pillar III (Sosio-Ekonomi):</strong> Berfokuskan Pendemokrasian Ilmu menerusi gerbang digital u-Pustaka. Grafik makro membuktikan anjakan besar di mana akses digital nasional melonjak tinggi (mencecah 8.7 juta capaian penstriman data aktif) berbanding had kemasukan pelawat secara fizikal.`;
    }
    if (text.includes('siapa buat') || text.includes('developer') || text.includes('architect') || text.includes('khairul')) {
        return `👨‍💻 Projek dashboard terminal pintar ini direka bentuk, dibangunkan, dan diselia sepenuhnya oleh <strong>Mohd Khairul Ridhuan bin Mohd Fadzil</strong> sebagai bukti kepakaran dalam pengurusan tadbir urus institusi, visualisasi data makro, dan seni bina sistem data.`;
    }
    if (text.includes('compliance') || text.includes('ifla') || text.includes('radar')) {
        return `🎯 <strong>Analisis Radar IFLA:</strong> Carta radar memaparkan indeks pematuhan PNM terhadap piawaian antarabangsa dalam 6 dimensi utama (Kedalaman Koleksi, Infrastruktur AI, CSAT Awam, Impak Komuniti, Kecekapan Katalog, dan Akses Inklusif). Sasaran penuh (100% compliance) ditetapkan menjelang Q3 2028.`;
    }

    // Default Fallback inside context
    return `ℹ️ <strong>Konteks Ditemui:</strong> Saya memahami pertanyaan anda mengenai sistem PNM. Sila spesifikasikan soalan anda sama ada bertanyakan tentang: 
    <br/>• <strong>Pillar I</strong> (Sistem Audit & Tadbir Urus)
    <br/>• <strong>Pillar II</strong> (Model Pen-Advisors & Enjin Vektor AI)
    <br/>• <strong>Pillar III</strong> (Metrik Data u-Pustaka Nasional)
    <br/>• <strong>Piawaian IFLA</strong> (Unjuran Radar Compliance Q3 2028).`;
}
