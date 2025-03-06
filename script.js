// Sample customer data
const customers = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        purchases: 12500,
        lastPurchase: '2024-03-15',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        purchases: 8750,
        lastPurchase: '2024-03-12',
    },
    {
        id: '3',
        name: 'Michael Brown',
        email: 'michael.b@example.com',
        purchases: 15200,
        lastPurchase: '2024-03-10',
    }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuButton = document.getElementById('menuButton');
const closeSidebarButton = document.getElementById('closeSidebar');
const searchInput = document.getElementById('searchInput');
const customersGrid = document.getElementById('customersGrid');

// Toggle sidebar
menuButton.addEventListener('click', () => {
    sidebar.classList.add('open');
});

closeSidebarButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// Create customer card
const createCustomerCard = (customer) => {
    const card = document.createElement('div');
    card.className = 'customer-card';
    card.innerHTML = `
        <div class="customer-card-header">
            <div class="customer-info">
                <h3>${customer.name}</h3>
                <p>${customer.email}</p>
            </div>
            <span class="status-badge">Active</span>
        </div>
        <div class="customer-stats">
            <div class="stat-item">
                <p>Total Purchases</p>
                <p>${formatCurrency(customer.purchases)}</p>
            </div>
            <div class="stat-item">
                <p>Last Purchase</p>
                <p>${customer.lastPurchase}</p>
            </div>
        </div>
    `;
    return card;
};

// Render customers
const renderCustomers = (customersToRender) => {
    customersGrid.innerHTML = '';
    customersToRender.forEach(customer => {
        customersGrid.appendChild(createCustomerCard(customer));
    });
};

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
    );
    renderCustomers(filteredCustomers);
});

// Initial render
renderCustomers(customers);

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnMenuButton = menuButton.contains(e.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuButton && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});