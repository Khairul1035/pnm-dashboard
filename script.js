let mainChart;
let accessCount = 8731045;

window.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ label: 'Digital Access', data: [4.2, 4.8, 5.1, 5.8, 6.2, 8.7], borderColor: '#22d3ee', fill: true }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
});

function appendMessage(sender, text) {
    const screen = document.getElementById('chat-screen');
    screen.innerHTML += `<div class="p-2 rounded ${sender==='Ali'?'bg-slate-800':'bg-cyan-900'} text-slate-200"><strong>${sender}:</strong> ${text}</div>`;
    screen.scrollTop = screen.scrollHeight;
}

function processUserChat() {
    const input = document.getElementById('chat-input');
    const q = input.value.trim();
    if (!q) return;
    appendMessage('You', q);
    input.value = '';
    
    setTimeout(() => {
        const text = q.toLowerCase();
        let response = "";
        
        // Parameter Filtering
        const forbidden = ['masak', 'cook', 'politik', 'bola', 'weather'];
        if (forbidden.some(f => text.includes(f))) {
            response = "⚠️ I am Ali, focused strictly on the PNM Governance Project. I cannot discuss that topic.";
        } else if (text.includes('designer') || text.includes('khairul')) {
            response = "👨‍💻 The designer of this system is Mohd Khairul Ridhuan bin Mohd Fadzil.";
        } else if (text.includes('stat') || text.includes('data')) {
            response = `📈 Current u-Pustaka access is ${accessCount.toLocaleString()}.`;
        } else {
            response = "ℹ️ I am Ali. I can help with Project Statistics, Designer info, or Pillar definitions.";
        }
        appendMessage('Ali', response);
    }, 500);
}
