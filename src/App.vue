<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="showDialog">Создать поста</my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible"> 
            <post-form  @create="craetePost"/>
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/>
        <h1 v-else>Идет загрузка...</h1>
        <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPage" 
                :key="pageNumber" 
                class="page"
                :class="{'current-page': page === pageNumber}"
                @click="changePage(pageNumber)"
                >{{ pageNumber }}
            </div>
        </div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
import MyButton from './components/UI/MyButton.vue';
import MySelect from './components/UI/MySelect.vue';
export default {
    components: {
    PostList,
    PostForm,
    MyButton,
    MySelect
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: "По названию"},
                {value: 'body', name: "По описанию"},
            ],
        }
    },
    methods: {
        craetePost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(el => el.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        changePage(pageNumber) {
            this.page = pageNumber;
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const respons = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(respons.headers['x-total-count'] / this.limit);
                this.posts = respons.data;
            } catch (error) {
                alert('Ошибка')
            }finally{
                this.isPostsLoading = false;
            }
        },
    },

    mounted(){
            this.fetchPosts();
    },

    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },

    watch: {
        page() {
            this.fetchPosts();
        }
        // selectedSort(newValue) {
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue]);
        //     })
        // }
    }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .app{
        padding: 20px;
    }
    .app__btns{
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper{
        display: flex;
        margin-top: 15px;
    }
    .page{
        border: 1px solid black;
        padding:  10px;
        cursor: pointer;
    }
    .current-page{
        border: 2px solid teal;
    }
</style>