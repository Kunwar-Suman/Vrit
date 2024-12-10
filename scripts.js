
const cards = document.querySelectorAll('.card');
let draggedCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', function(e) {
        draggedCard = this;
        setTimeout(() => {
            this.style.display = 'none'; 
        }, 0);
    });

    card.addEventListener('dragend', function(e) {
        setTimeout(() => {
            draggedCard.style.display = 'block'; 
            draggedCard = null;
        }, 0);
    });

    card.addEventListener('dragover', function(e) {
        e.preventDefault(); 
    });

    card.addEventListener('dragenter', function(e) {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    card.addEventListener('dragleave', function(e) {
        this.style.background = '';
    });

    card.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.background = '';
        if (draggedCard !== this) {
            
        }
    });
});
