// Sample data matching the applications management
    const allApplications = [
      { id: '#2025-001', name: 'Juan Dela Cruz', grade: 'Kindergarten', date: 'Jan 15, 2025', status: 'pending' },
      { id: '#2025-002', name: 'Maria Santos', grade: 'Kindergarten', date: 'Jan 14, 2025', status: 'approve' },
      { id: '#2025-003', name: 'Pedro Garcia', grade: 'Grade 3', date: 'Jan 13, 2025', status: 'pending' },
      { id: '#2025-004', name: 'Ana Reyes', grade: 'Kindergarten', date: 'Jan 12, 2025', status: 'enrolled' },
      { id: '#2025-005', name: 'Jose Rizal', grade: 'Grade 4', date: 'Jan 11, 2025', status: 'pending' }
    ];

    // Get only 5 most recent for display
    const recentApplications = allApplications.slice(0, 5);

    // Mobile menu functions
    function toggleMobileMenu() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.querySelector('.mobile-overlay');
      
      sidebar.classList.toggle('show');
      overlay.classList.toggle('show');
    }

    function closeMobileMenu() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.querySelector('.mobile-overlay');
      
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
    }

    // Render recent applications table (only 5 most recent)
    function renderRecentApplications() {
      const tableBody = document.getElementById('recentApplicationsTable');
      tableBody.innerHTML = '';
      
      recentApplications.forEach(app => {
        const row = document.createElement('tr');
        
        // Determine status display
        let statusDisplay = app.status.toUpperCase();
        if (app.status === 'enrolled') {
          statusDisplay = 'OFFICIALLY ENROLLED';
        } else if (app.status === 'approve') {
          statusDisplay = 'approve';
        }
        
        // Create action buttons
        let actionButtons = `
          <div class="action-buttons">
            <button class="action-btn view" onclick="viewApplication('${app.id}')">VIEW</button>
            <div class="action-dropdown">
              <button class="action-dropdown-btn" onclick="toggleDropdown(this)">
                Actions <i class="ri-arrow-down-s-line"></i>
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item approve" 
                        onclick="approveApplication('${app.id}')"
                        ${app.status === 'approve' || app.status === 'enrolled' ? 'disabled' : ''}>
                  <i class="ri-check-line"></i> Approve
                </button>
                <button class="dropdown-item enroll" 
                        onclick="enrollStudent('${app.id}')"
                        ${app.status !== 'approve' ? 'disabled' : ''}>
                  <i class="ri-graduation-cap-line"></i> Officially Enroll
                </button>
              </div>
            </div>
          </div>
        `;
        
        row.innerHTML = `
          <td>${app.id}</td>
          <td>${app.name}</td>
          <td>${app.grade}</td>
          <td>${app.date}</td>
          <td><span class="status ${app.status}">${statusDisplay}</span></td>
          <td>${actionButtons}</td>
        `;
        
        tableBody.appendChild(row);
      });
    }

    // Toggle dropdown menu
    function toggleDropdown(button) {
      // Close all other dropdowns
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== button.nextElementSibling) {
          menu.classList.remove('show');
        }
      });
      
      // Toggle current dropdown
      const dropdown = button.nextElementSibling;
      dropdown.classList.toggle('show');
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function closeDropdown(e) {
        if (!button.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('show');
          document.removeEventListener('click', closeDropdown);
        }
      });
    }

    // Function to view application
    function viewApplication(id) {
      alert(`Viewing application ${id}`);
      // In real implementation, this would redirect to a detailed view
    }

    // Function to approve application
    function approveApplication(id) {
      if(confirm(`Are you sure you want to approve application ${id}?`)) {
        // Find and update the application status
        const app = allApplications.find(a => a.id === id);
        if (app) {
          app.status = 'approve';
          renderRecentApplications();
          updateStats();
          alert(`Application ${id} has been approve successfully!`);
        }
      }
    }

    // Function to enroll student
    function enrollStudent(id) {
      if(confirm(`Are you sure you want to officially enroll the student for application ${id}?`)) {
        // Find and update the application status
        const app = allApplications.find(a => a.id === id);
        if (app) {
          app.status = 'enrolled';
          renderRecentApplications();
          updateStats();
          alert(`Student from application ${id} has been officially enrolled!`);
        }
      }
    }

    // Update statistics
    function updateStats() {
      // Count applications by status (from all applications, not just recent)
      let pending = 0, approve = 0, enrolled = 0;
      
      allApplications.forEach(app => {
        if (app.status === 'pending') pending++;
        else if (app.status === 'approve') approve++;
        else if (app.status === 'enrolled') enrolled++;
      });
      
      document.getElementById('totalApplications').textContent = allApplications.length;
      document.getElementById('pendingApplications').textContent = pending;
      document.getElementById('approveApplications').textContent = approve;
      document.getElementById('enrolledApplications').textContent = enrolled;
    }

    // Function to go to applications page
    function goToApplications() {
      window.location.href = 'applications.html';
    }

    // Logout function
    function logout() {
      if(confirm('Are you sure you want to logout?')) {
        alert('Logging out...');
        // In real implementation, this would handle the logout
      }
    }

    // Initialize menu item clicks
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', function(e) {
        if (!this.getAttribute('onclick')) { // Skip if it has onclick (like logout)
          document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });

    // Initialize action cards (except process applications which has its own handler)
    document.querySelectorAll('.action-card:not(.process)').forEach(card => {
      card.addEventListener('click', function() {
        alert('Feature: ' + this.textContent.trim());
      });
    });

    // Send notification button
    document.querySelector('.send-notification').addEventListener('click', function() {
      alert('Send Notification feature clicked!');
    });

    // Close mobile menu when clicking on menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeMobileMenu();
        }
      });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });

    // Render the recent applications on page load
    renderRecentApplications();