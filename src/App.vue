<template>
    <div class="app">
        <h1>Страница с постами</h1>
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
        <post-list :posts="sortedPosts" @remove="removePost" v-if="!isPostsLoading"/>
        <h1 v-else>Идет загрузка...</h1>
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
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const respons = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
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
        }
    },

    // watch: {
    //     selectedSort(newValue) {
    //         this.posts.sort((post1, post2) => {
    //             return post1[newValue]?.localeCompare(post2[newValue]);
    //         })
    //     }
    // }
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
</style>