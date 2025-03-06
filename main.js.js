import './style.css'

// Mock service data
let services = [
  {
    id: 1,
    name: 'VPS-Server-01',
    type: 'vps',
    user: 'john@example.com',
    config: {
      cpu: '4 cores',
      ram: '8GB',
      storage: '100GB SSD',
      os: 'Ubuntu 22.04'
    },
    status: 'running'
  },
  {
    id: 2,
    name: 'Proxy-US-East',
    type: 'proxy',
    user: 'jane@example.com',
    config: {
      location: 'US East',
      protocol: 'SOCKS5',
      bandwidth: '1Gbps',
      ip_pool: '1000'
    },
    status: 'running'
  },
  {
    id: 3,
    name: 'VPS-Server-02',
    type: 'vps',
    user: 'bob@example.com',
    config: {
      cpu: '2 cores',
      ram: '4GB',
      storage: '50GB SSD',
      os: 'CentOS 8'
    },
    status: 'stopped'
  },
  {
    id: 4,
    name: 'Proxy-EU-West',
    type: 'proxy',
    user: 'alice@example.com',
    config: {
      location: 'EU West',
      protocol: 'HTTP/HTTPS',
      bandwidth: '500Mbps',
      ip_pool: '500'
    },
    status: 'error'
  }
];

// Current service being edited
let currentServiceId = null;

// Filter and search functionality
function filterServices() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const typeFilter = document.getElementById('typeFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;

  return services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm) ||
                         service.user.toLowerCase().includes(searchTerm);
    const matchesType = typeFilter === 'all' || service.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });
}

// Render services table
function renderServices() {
  const filteredServices = filterServices();
  const tbody = document.getElementById('servicesTableBody');
  tbody.innerHTML = '';

  filteredServices.forEach(service => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${service.name}</td>
      <td><span class="service-type type-${service.type}">${service.type}</span></td>
      <td>${service.user}</td>
      <td><div class="config-preview">${JSON.stringify(service.config, null, 2)}</div></td>
      <td><span class="status-badge status-${service.status}">${service.status}</span></td>
      <td>
        <div class="action-buttons">
          <button onclick="editService(${service.id})" class="btn btn-edit">Edit</button>
          <button onclick="toggleStatus(${service.id})" class="btn btn-status">
            ${service.status === 'running' ? 'Stop' : 'Start'}
          </button>
          <button onclick="deleteService(${service.id})" class="btn btn-delete">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Modal functionality
function showModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

// Expose closeModal to window object
window.closeModal = function() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  currentServiceId = null;
};

// Add new service
window.showAddServiceModal = function() {
  currentServiceId = null;
  document.getElementById('modalTitle').textContent = 'Add New Service';
  document.getElementById('serviceForm').reset();
  showModal('serviceModal');
};

// Edit service functionality
window.editService = function(serviceId) {
  currentServiceId = serviceId;
  const service = services.find(s => s.id === serviceId);
  
  document.getElementById('modalTitle').textContent = 'Edit Service';
  document.getElementById('serviceName').value = service.name;
  document.getElementById('serviceType').value = service.type;
  document.getElementById('serviceUser').value = service.user;
  document.getElementById('serviceConfig').value = JSON.stringify(service.config, null, 2);
  document.getElementById('serviceStatus').value = service.status;
  
  showModal('serviceModal');
};

// Toggle service status
window.toggleStatus = function(serviceId) {
  const service = services.find(s => s.id === serviceId);
  service.status = service.status === 'running' ? 'stopped' : 'running';
  renderServices();
};

// Validate JSON configuration
function validateConfig(configStr) {
  try {
    const config = JSON.parse(configStr);
    if (typeof config !== 'object' || config === null) {
      throw new Error('Configuration must be a JSON object');
    }
    return { valid: true, config };
  } catch (error) {
    return { 
      valid: false, 
      error: 'Invalid JSON configuration. Please check your format.' 
    };
  }
}

// Handle service form submission
document.getElementById('serviceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const configStr = document.getElementById('serviceConfig').value;
  const configValidation = validateConfig(configStr);
  
  if (!configValidation.valid) {
    alert(configValidation.error);
    return;
  }

  const serviceData = {
    name: document.getElementById('serviceName').value,
    type: document.getElementById('serviceType').value,
    user: document.getElementById('serviceUser').value,
    config: configValidation.config,
    status: document.getElementById('serviceStatus').value
  };

  if (currentServiceId) {
    // Update existing service
    services = services.map(service => 
      service.id === currentServiceId ? { ...service, ...serviceData } : service
    );
  } else {
    // Add new service
    services.push({
      id: services.length + 1,
      ...serviceData
    });
  }

  window.closeModal();
  renderServices();
});

// Delete service functionality
window.deleteService = function(serviceId) {
  currentServiceId = serviceId;
  showModal('deleteModal');
};

window.confirmDelete = function() {
  services = services.filter(service => service.id !== currentServiceId);
  window.closeModal();
  renderServices();
};

// Search and filter event listeners
document.getElementById('searchInput').addEventListener('input', renderServices);
document.getElementById('typeFilter').addEventListener('change', renderServices);
document.getElementById('statusFilter').addEventListener('change', renderServices);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    window.closeModal();
  }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  renderServices();
});