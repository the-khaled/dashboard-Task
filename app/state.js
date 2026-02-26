export const state = {
    allPosts: [],
    filteredPosts: [],
    currentPage: 1,
    postsPerPage: 6,
    selectedUserId: null
};

export const applyFilter = (posts, searchText) => {
    const q = searchText.trim().toLowerCase();
    return posts.filter(p => p.title.toLowerCase().includes(q));
};