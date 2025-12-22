// Global Currency Configuration
const currencies = {
    'USD': { symbol: '$', name: 'Dólar (USD)' },
    'PEN': { symbol: 'S/', name: 'Sol (Perú)' },
    'MXN': { symbol: '$', name: 'Peso (México)' },
    'ARS': { symbol: '$', name: 'Peso (Argentina)' },
    'COP': { symbol: '$', name: 'Peso (Colombia)' },
    'CLP': { symbol: '$', name: 'Peso (Chile)' },
    'EUR': { symbol: '€', name: 'Euro (España)' },
    'DOP': { symbol: 'RD$', name: 'Peso (R. Dominicana)' },
    'CRC': { symbol: '₡', name: 'Colón (Costa Rica)' },
    'GTQ': { symbol: 'Q', name: 'Quetzal (Guatemala)' },
    'HNL': { symbol: 'L', name: 'Lempira (Honduras)' },
    'NIO': { symbol: 'C$', name: 'Córdoba (Nicaragua)' },
    'PAB': { symbol: 'B/.', name: 'Balboa (Panamá)' },
    'PYG': { symbol: '₲', name: 'Guaraní (Paraguay)' },
    'UYU': { symbol: '$U', name: 'Peso (Uruguay)' },
    'BOB': { symbol: 'Bs', name: 'Boliviano (Bolivia)' },
    'VES': { symbol: 'Bs.S', name: 'Bolívar (Venezuela)' },
    'SVC': { symbol: '₡', name: 'Colón (El Salvador)' }
};

let currentCurrency = localStorage.getItem('selectedCurrency') || 'USD';

function updateCurrencyDisplay() {
    const symbol = currencies[currentCurrency].symbol;
    document.querySelectorAll('.currency-symbol').forEach(el => {
        el.innerText = symbol;
    });

    // Update calculators if on tools page
    if (typeof runLoan === 'function') runLoan();
    if (typeof runCompound === 'function') runCompound();
    if (typeof runRetirement === 'function') runRetirement();
}

document.addEventListener('DOMContentLoaded', () => {
    // Inject Currency Selectors into all Navs
    const navMenus = document.querySelectorAll('.nav-menu');
    navMenus.forEach(nav => {
        const li = document.createElement('li');
        const select = document.createElement('select');
        select.className = 'currency-selector';

        // Sort currencies by name for better UX
        const sortedCodes = Object.keys(currencies).sort((a, b) => currencies[a].name.localeCompare(currencies[b].name));

        sortedCodes.forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.innerText = currencies[code].name;
            if (code === currentCurrency) opt.selected = true;
            select.appendChild(opt);
        });

        select.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            localStorage.setItem('selectedCurrency', currentCurrency);
            updateCurrencyDisplay();
        });

        li.appendChild(select);
        nav.appendChild(li);
    });

    updateCurrencyDisplay();
});
