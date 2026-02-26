const postsGrid = document.getElementById('postsGrid');
const userSelect = document.getElementById('userSelect');
const loader = document.getElementById('loader');
const alertContainer = document.getElementById('alertContainer');

export const renderUsers = (users) => {
    userSelect.innerHTML = '<option value="">Choose a user...</option>' + 
        users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
};

export const renderPosts = (posts) => {
    if (posts.length === 0) {
        postsGrid.innerHTML = '<div class="col-12 text-center text-muted"><h3>No posts found.</h3></div>';
        return;
    }
    
    postsGrid.innerHTML = posts.map(post => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-capitalize text-primary">${post.title}</h5>
                    <p class="card-text text-secondary">${post.body}</p>
                </div>
            </div>
        </div>
    `).join('');
};

export const setLoading = (isLoading) => {
    isLoading ? loader.classList.remove('d-none') : loader.classList.add('d-none');
    if (isLoading) postsGrid.innerHTML = '';
};

export const showAlert = (message, type = 'danger') => {
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
};