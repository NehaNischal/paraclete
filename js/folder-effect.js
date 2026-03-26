document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.svc-card');
    
    // Convert base variables from the theme
    // --primary: #8B0000 -> #7a0000 (darkened)
    const folderColor = '#8B0000';
    const folderBackColor = '#630000'; // Var primary-dark
    
    cards.forEach(card => {
        const iconDiv = card.querySelector('.svc-icon');
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        const targetUrl = card.getAttribute('onclick'); 
        
        // Setup wrapper style
        card.removeAttribute('onclick');
        card.className = 'service-folder-wrapper';
        card.setAttribute('data-aos', 'fade-up');
        card.style.setProperty('--folder-color', folderColor);
        card.style.setProperty('--folder-back-color', folderBackColor);
        card.style.setProperty('--paper-1', '#e6e6e6');
        card.style.setProperty('--paper-2', '#f2f2f2');
        card.style.setProperty('--paper-3', '#ffffff');
        
        card.innerHTML = `
            <div class="folder">
                <div class="folder__back">
                    <div class="paper paper-1"></div>
                    <div class="paper paper-2"></div>
                    <div class="paper paper-3">
                        <div class="paper-content">
                            ${title.outerHTML}
                            ${desc.outerHTML}
                            ${targetUrl ? `<a href="javascript:void(0)" onclick="${targetUrl}" class="btn-read-more">Learn More <i class="fas fa-arrow-right"></i></a>` : ''}
                        </div>
                    </div>
                    <div class="folder__front">
                        <div class="folder-front-content">
                            ${iconDiv.outerHTML}
                            ${title.outerHTML}
                        </div>
                    </div>
                    <div class="folder__front right"></div>
                </div>
            </div>
        `;
        
        const folder = card.querySelector('.folder');
        folder.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            
            const isOpen = folder.classList.contains('open');
            document.querySelectorAll('.folder.open').forEach(f => f.classList.remove('open'));
            if (!isOpen) {
                folder.classList.add('open');
            }
        });
        
        // Magnet effect based on React code
        const papers = card.querySelectorAll('.paper');
        papers.forEach((paper, i) => {
            paper.addEventListener('mousemove', (e) => {
                if (!folder.classList.contains('open')) return;
                const rect = paper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const offsetX = (e.clientX - centerX) * 0.15;
                const offsetY = (e.clientY - centerY) * 0.15;
                paper.style.setProperty('--magnet-x', `${offsetX}px`);
                paper.style.setProperty('--magnet-y', `${offsetY}px`);
            });
            
            paper.addEventListener('mouseleave', () => {
                paper.style.removeProperty('--magnet-x');
                paper.style.removeProperty('--magnet-y');
            });
        });
    });
});
