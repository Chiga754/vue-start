<template>
    <div class="app">
        <post-form  @create="craetePost"/>
        <post-list :posts="posts" @remove="removePost" />
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
export default {
    components: {
        PostList, PostForm,
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'JavaScript', body:"Описание поста"},
                {id: 2, title: 'JavaScript', body:"Описание поста 2"},
                {id: 3, title: 'JavaScript', body:"Описание поста 3"},
                {id: 4, title: 'JavaScript', body:"Описание поста 4"},
            ],
        }
    },
    methods: {
        craetePost(post) {
            this.posts.push(post);
        },
        removePost(post) {
            this.posts = this.posts.filter(el => el.id !== post.id);
        }
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