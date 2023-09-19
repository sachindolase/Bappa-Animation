function pop(e) {
    let amount = 30;
    switch (e.target.dataset.type) {
        case 'flower':
        case 'line':
            amount = 60;
            break;
    }
    
    if (e.clientX === 0 && e.clientY === 0) {
        const bbox = e.target.getBoundingClientRect();
        const x = bbox.left + bbox.width / 2;
        const y = bbox.top + bbox.height / 2;
        for (let i = 0; i < 30; i++) {
            
            createParticle(x, y, e.target.dataset.type);
        }
    } else {
        for (let i = 0; i < amount; i++) {
            createParticle(e.clientX, e.clientY + window.scrollY, e.target.dataset.type);
        }
    }
}
function createParticle(x, y, type) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;

    switch (type) {
        case 'laddu':
            particle.style.backgroundImage = 'url(assets/laddu.png)';
            break;
        case 'barfi':
            particle.style.backgroundImage = 'url(assets/barfi.png)';
            break;
        case 'fruit':
            particle.style.backgroundImage = 'url(assets/fruit.png)';
            break;
        case 'flower':
            particle.style.backgroundImage = 'url(assets/flower.png)';
            break;
        case 'line':
            var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
            particle.style.background = 'black';
            height = 1;
            rotation += 1000;
            delay = Math.random() * 1000;
            break;
    }

    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
        {
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 1000 + 5000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}
function removeParticle(e) {
    e.srcElement.effect.target.remove();
}

if (document.body.animate) {
    document.querySelectorAll('button').forEach(button => button.addEventListener('click', pop));
}