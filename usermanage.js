import './style.css'

// Mock user data
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-02-20 10:30 AM'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'reseller',
    status: 'active',
    lastLogin: '2024-02-19 03:15 PM'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-02-15 11:45 AM'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'reseller',
    status: 'pending',
    lastLogin: '2024-02-20 09:00 AM'
  }
];

// Current user being edited
let currentUserId = null;

// Filter and search functionality
function filterUsers() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const roleFilter = document.getElementById('roleFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;

  return users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });
}

// Render users table
function renderUsers() {
  const filteredUsers = filterUsers();
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';

  filteredUsers.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span class="status-badge status-${user.status}">${user.status}</span></td>
      <td>${user.lastLogin}</td>
      <td>
        <div class="action-buttons">
          <button onclick="editUser(${user.id})" class="btn btn-edit">Edit</button>
          <button onclick="deleteUser(${user.id})" class="btn btn-delete">Delete</button>
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

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  currentUserId = null;
}

// Edit user functionality
window.editUser = function(userId) {
  currentUserId = userId;
  const user = users.find(u => u.id === userId);
  
  document.getElementById('editName').value = user.name;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editRole').value = user.role;
  document.getElementById('editStatus').value = user.status;
  
  showModal('editModal');
};

// Handle edit form submission
document.getElementById('editUserForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const updatedUser = {
    id: currentUserId,
    name: document.getElementById('editName').value,
    email: document.getElementById('editEmail').value,
    role: document.getElementById('editRole').value,
    status: document.getElementById('editStatus').value,
    lastLogin: users.find(u => u.id === currentUserId).lastLogin
  };

  users = users.map(user => 
    user.id === currentUserId ? updatedUser : user
  );

  closeModal();
  renderUsers();
});

// Delete user functionality
window.deleteUser = function(userId) {
  currentUserId = userId;
  showModal('deleteModal');
};

window.confirmDelete = function() {
  users = users.filter(user => user.id !== currentUserId);
  closeModal();
  renderUsers();
};

// Search and filter event listeners
document.getElementById('searchInput').addEventListener('input', renderUsers);
document.getElementById('roleFilter').addEventListener('change', renderUsers);
document.getElementById('statusFilter').addEventListener('change', renderUsers);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    closeModal();
  }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  renderUsers();
});