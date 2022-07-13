import axios from "axios";
export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPage: 0,
        sortOptions: [
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ],
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPage(state, totalPages) {
            state.totalPage = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
              commit("setLoading", true);
              const respons = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  params: {
                    _page: state.page,
                    _limit: state.limit,
                  },
                }
              );
              commit("setTotalPage", Math.ceil(
                respons.headers["x-total-count"] / state.limit
              ));
              commit('setPosts', respons.data);
            } catch (error) {
              console.log(error);
            } finally {
                commit("setLoading", false);
            }
          },
      
          async loadMorePosts({state, commit}) {
            try {
              commit('setPage', state.page + 1);
              const respons = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  params: {
                    _page: state.page,
                    _limit: state.limit,
                  },
                }
              );
              commit('setTotalPage' ,Math.ceil(
                respons.headers["x-total-count"] / state.limit
              ));
              commit('setPosts', [...state.posts, ...respons.data]);
            } catch (error) {
              alert("Ошибка");
            }
          },
    },
    namespaced: 'post',
}