let mainChart;
let accessCount = 8731045;
let bookCount = 4812;

// MINIMALIST OVERRIDES FOR CHART.JS GLOBAL VISUALS
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
    
    // LIVE TIME ENGINE WITH MINIMALIST FORMAT
    function updateClock() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
        const clockEl = document.getElementById('live-timestamp');
        if (clockEl) clockEl.innerText = `${dateStr} | ${timeStr}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // INITIALIZE MAIN MINIMALIST CHART
    const ctxLine = document.getElementById('monthlyTrendChart');
    if (ctxLine) {
        mainChart = new Chart(ctxLine.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    { 
                        label: pillarData[3].label1, 
                        data: pillarData[3].data1, 
                        borderColor: pillarData[3].color1, 
                        backgroundColor: 'rgba(34, 211, 238, 0.05)', 
                        fill: true, 
                        tension: 0.2,
                        borderWidth: 2
                    },
                    { 
                        label: pillarData[3].label2, 
                        data: pillarData[3].data2, 
                        type: 'bar', 
                        backgroundColor: pillarData[3].color2,
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: chartDefaults.color, font: { size: 11 } } } },
                scales: {
                    x: { grid: { color: chartDefaults.gridColor }, ticks: { color: chartDefaults.color } },
                    y: { grid: { color: chartDefaults.gridColor }, ticks: { color: chartDefaults.color } }
                }
            }
        });
    }

    // RADAR COMPLIANCE CHART
    const ctxRadar = document.getElementById('executiveRadarChart');
    if (ctxRadar) {
        new Chart(ctxRadar.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Depth', 'AI Tech', 'CSAT', 'Impact', 'Cataloging', 'Access'],
                datasets: [
                    { label: 'Performance', data: [88, 95, 92, 85, 99, 90], backgroundColor: 'rgba(34, 211, 238, 0.1)', borderColor: '#22d3ee', borderWidth: 1.5 },
                    { label: 'IFLA Target', data: [85, 80, 85, 80, 90, 85], borderColor: 'rgba(148, 163, 184, 0.4)', borderDash: [4, 4], borderWidth: 1 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        grid: { color: chartDefaults.gridColor },
                        angleLines: { color: chartDefaults.gridColor },
                        pointLabels: { color: chartDefaults.color, font: { size: 10 } },
                        ticks: { display: false }
                    }
                }
            }
        });
    }

    // COUNTER TICKER SIMULATION
    setInterval(() => {
        accessCount += Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.85) bookCount += 1;
        const digEl = document.getElementById('kpi-digital');
        const catEl = document.getElementById('live-catalog');
        if (digEl) digEl.innerText = accessCount.toLocaleString('en-US');
        if (catEl) catEl.innerText = bookCount.toLocaleString('en-US');
    }, 2500);
});

// FRAMEWORK CONTROLLER FOR MINIMALIST BUTTONS
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
    
    if (pillarId === 1) {
        mainChart.data.datasets[0].type = 'line';
        mainChart.data.datasets[1].type = 'line';
    } else if (pillarId === 2) {
        mainChart.data.datasets[0].type = 'bar';
        mainChart.data.datasets[1].type = 'line';
    } else {
        mainChart.data.datasets[0].type = 'line';
        mainChart.data.datasets[1].type = 'bar';
    }
    
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
