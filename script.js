// script.js - Updated for safe loading
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded successfully");

    // 1. Chart initialization
    const ctx = document.getElementById('monthlyTrendChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{ 
                    label: 'Digital Access', 
                    data: [4.2, 4.8, 5.1, 5.8, 6.2, 8.7], 
                    borderColor: '#22d3ee', 
                    fill: true 
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    } else {
        console.error("Canvas element not found!");
    }
});

// 2. Chat function
function appendMessage(sender, text) {
    const screen = document.getElementById('chat-screen');
    if (screen) {
        screen.innerHTML += `<div class="p-2 rounded ${sender==='Ali'?'bg-slate-800':'bg-cyan-900'} text-slate-200"><strong>${sender}:</strong> ${text}</div>`;
        screen.scrollTop = screen.scrollHeight;
    }
}

function processUserChat() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;
    appendMessage('You', q);
    input.value = '';
    
    setTimeout(() => {
        const text = q.toLowerCase();
        let response = "";
        if (text.includes('designer') || text.includes('khairul')) {
            response = "👨‍💻 The designer is Mohd Khairul Ridhuan bin Mohd Fadzil.";
        } else {
            response = "ℹ️ I am Ali. I can help with Project Statistics or Designer info.";
        }
        appendMessage('Ali', response);
    }, 500);
}
