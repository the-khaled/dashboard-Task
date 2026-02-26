import { getUsers, getPostsByUser } from './api.js';
import { state, applyFilter } from './state.js';
import { renderUsers, renderPosts, setLoading, showAlert } from './ui.js';

const userSelect = document.getElementById('userSelect');
const searchInput = document.getElementById('searchInput');
const reloadBtn = document.getElementById('reloadBtn');

// 1. Initial Load: Get Users
function init() {
    setLoading(true);
    getUsers()
        .then(users => renderUsers(users))
        .catch(err => showAlert(err.message))
        .finally(() => setLoading(false));
}

// 2. Event: Change User
userSelect.addEventListener('change', (e) => {
    const userId = e.target.value;
    if (!userId) return;

    state.selectedUserId = userId;
    setLoading(true);
    
    getPostsByUser(userId)
        .then(data => {
            state.allPosts = data;
            state.filteredPosts = data;
            renderPosts(state.filteredPosts);
        })
        .catch(err => showAlert(err.message))
        .finally(() => setLoading(false));
});

// 3. Event: Search (Filter)
searchInput.addEventListener('input', (e) => {
    state.searchText = e.target.value;
    state.filteredPosts = applyFilter(state.allPosts, state.searchText);
    renderPosts(state.filteredPosts);
});

// 4. Event: Reload
reloadBtn.addEventListener('click', () => {
    if (state.selectedUserId) {
        userSelect.dispatchEvent(new Event('change'));
    } else {
        init();
    }
});
document.getElementById('alertContainer').addEventListener('click', (e) => {
    if (e.target.id === 'retryBtn') {
        const userId = document.getElementById('userSelect').value;
        if (userId) {
            document.getElementById('userSelect').dispatchEvent(new Event('change'));
        } else {
            init(); 
        }
    }
});
init();