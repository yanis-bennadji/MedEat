// Component loader
async function loadComponent(elementId, componentPath) {
    try {
        console.log(`Loading component: ${componentPath}`);
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        console.log(`Component content loaded: ${html.length} characters`);
        
        const container = document.getElementById(elementId);
        if (container) {
            // Créer un conteneur temporaire pour parser le HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Vérifier si le contenu est vide
            if (!doc.body.firstChild) {
                console.warn(`Component ${componentPath} is empty`);
                return;
            }
            
            // Vider le conteneur
            container.innerHTML = '';
            
            // Déplacer tous les enfants du body du document parsé vers le conteneur
            while (doc.body.firstChild) {
                container.appendChild(doc.body.firstChild);
            }
            
            // Déclencher un événement personnalisé pour notifier le chargement
            const event = new CustomEvent('componentLoaded', {
                detail: { componentId: elementId }
            });
            document.dispatchEvent(event);
        } else {
            console.error(`Container ${elementId} not found`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all components when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, starting component loading');
    
    // Définir les composants à charger
    const components = [
        { id: 'header-container', path: 'components/header.html' },
        { id: 'hero-container', path: 'components/hero.html' },
        { id: 'features-container', path: 'components/features.html' },
        { id: 'footer-container', path: 'components/footer.html' }
    ];

    // Charger chaque composant
    components.forEach(component => {
        console.log(`Starting to load component: ${component.id}`);
        loadComponent(component.id, component.path);
    });
}); 