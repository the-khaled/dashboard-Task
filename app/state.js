export const state = {
    allPosts: [],
    filteredPosts: [],
    selectedUserId: null,
    searchText: ""
};

export const applyFilter = (posts, searchText) => {
    const q = searchText.trim().toLowerCase();
    return posts.filter(p => p.title.toLowerCase().includes(q));
};