// UJIAN GRAF
document.addEventListener('DOMContentLoaded', function() {
    console.log("Ali terminal loading...");
    
    const ctx = document.getElementById('monthlyTrendChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [{ label: 'Data', data: [10, 20, 30], borderColor: '#fff' }]
            }
        });
    }
});
