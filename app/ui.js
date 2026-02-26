const postsGrid = document.getElementById('postsGrid');
const userSelect = document.getElementById('userSelect');
const loader = document.getElementById('loader');
const alertContainer = document.getElementById('alertContainer');
const paginationContainer = document.getElementById('pagination');

export const renderUsers = (users) => {
    userSelect.innerHTML = '<option value="">Choose a user...</option>' + 
        users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
};

export const renderPosts = (posts) => {
    if (posts.length === 0) {
        postsGrid.innerHTML = `
            <div class="col-12 text-center my-5">
                <div class="p-5 bg-white rounded shadow-sm">
                    <h3 class="text-muted">No posts found.</h3>
                    <p>Try searching for a different keyword.</p>
                </div>
            </div>`;
        return;
    }
    postsGrid.innerHTML = posts.map(post => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-capitalize text-primary mb-3">${post.title}</h5>
                    <p class="card-text text-secondary">${post.body}</p>
                </div>
                <div class="card-footer bg-transparent border-0 text-muted small">
                    Post ID: ${post.id}
                </div>
            </div>
        </div>
    `).join('');
};

export const renderPagination = (totalItems, currentPage, onPageChange) => {
    const totalPages = Math.ceil(totalItems / 6);
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    paginationContainer.innerHTML = `
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <button class="page-link" id="prevBtn">Previous</button>
                </li>
                <li class="page-item disabled">
                    <span class="page-link bg-light text-dark">Page ${currentPage} of ${totalPages}</span>
                </li>
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <button class="page-link" id="nextBtn">Next</button>
                </li>
            </ul>
        </nav>`;

    document.getElementById('prevBtn')?.addEventListener('click', () => onPageChange(currentPage - 1));
    document.getElementById('nextBtn')?.addEventListener('click', () => onPageChange(currentPage + 1));
};

export const setLoading = (isLoading) => {
    if (isLoading) {
        loader.classList.remove('d-none');
        postsGrid.innerHTML = '';
        paginationContainer.innerHTML = '';
        alertContainer.innerHTML = '';
    } else {
        loader.classList.add('d-none');
    }
};

export const showAlert = (message) => {
    alertContainer.innerHTML = `
        <div class="alert alert-danger d-flex justify-content-between align-items-center shadow-sm" role="alert">
            <span><strong>Error:</strong> ${message}</span>
            <button id="retryBtn" class="btn btn-danger btn-sm px-4">Retry</button>
        </div>`;
};