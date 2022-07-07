<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button @click="showDialog">Создать поста</my-button>
        <my-dialog v-model:show="dialogVisible"> 
            <post-form  @create="craetePost"/>
        </my-dialog>
        <post-list :posts="posts" @remove="removePost" />
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
import MyButton from './components/UI/MyButton.vue';
export default {
    components: {
    PostList,
    PostForm,
    MyButton
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
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
                const respons = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                this.posts = respons.data;
            } catch (error) {
                alert('Ошибка')
            }
        },
    },

    mounted(){
            this.fetchPosts();
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
</style>