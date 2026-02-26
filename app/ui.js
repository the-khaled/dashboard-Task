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

export const showAlert = (message) => {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
            <div>
                <strong>Error!</strong> ${message}
            </div>
            <button id="retryBtn" class="btn btn-danger btn-sm">Retry</button>
        </div>
    `;
};