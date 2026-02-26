import { getUsers, getPostsByUser } from './api.js';
import { state, applyFilter } from './state.js';
import * as ui from './ui.js';

const searchInput = document.getElementById('searchInput');
const userSelect = document.getElementById('userSelect');
const alertContainer = document.getElementById('alertContainer');
const reloadBtn = document.getElementById('reloadBtn');
let debounceTimer;

function updateView() {
    const start = (state.currentPage - 1) * state.postsPerPage;
    const end = start + state.postsPerPage;
    const pagedPosts = state.filteredPosts.slice(start, end);
    
    ui.renderPosts(pagedPosts);
    ui.renderPagination(state.filteredPosts.length, state.currentPage, (newPage) => {
        state.currentPage = newPage;
        updateView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function loadPosts(userId) {
    if (!userId) return;
    ui.setLoading(true);
    getPostsByUser(userId)
        .then(data => {
            state.allPosts = data;
            state.filteredPosts = data;
            state.currentPage = 1;
            updateView();
        })
        .catch(err => ui.showAlert(err.message))
        .finally(() => ui.setLoading(false));
}

// Global Event Listeners
userSelect.addEventListener('change', (e) => {
    state.selectedUserId = e.target.value;
    loadPosts(state.selectedUserId);
});

searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        state.filteredPosts = applyFilter(state.allPosts, e.target.value);
        state.currentPage = 1;
        updateView();
    }, 300);
});

alertContainer.addEventListener('click', (e) => {
    if (e.target.id === 'retryBtn') {
        loadPosts(state.selectedUserId || null);
    }
});

reloadBtn.addEventListener('click', () => {
    if (state.selectedUserId) {
        loadPosts(state.selectedUserId);
    } else {
        init();
    }
});

function init() {
    ui.setLoading(true);
    getUsers()
        .then(users => ui.renderUsers(users))
        .catch(err => ui.showAlert(err.message))
        .finally(() => ui.setLoading(false));
}

init();