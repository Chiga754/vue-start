<template>
    <form>
        <h4>Создание поста</h4>
        <input type="text" placeholder="Название">
        <input type="text" placeholder="Описание">
    </form>
    <div class="posts" v-for="post in posts" v-bind:key="post.id">
        <div class="post">
            <strong>Название</strong> : {{post.title}}
            <strong>Описание</strong> : {{post.body}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [
                {id: 1, title: 'JavaScript', body:"Описание поста"},
                {id: 2, title: 'JavaScript', body:"Описание поста 2"},
                {id: 3, title: 'JavaScript', body:"Описание поста 3"},
                {id: 4, title: 'JavaScript', body:"Описание поста 4"},
            ]
        }
    },
    methods: {
        addLike() {
            this.likes += 1;
        },
        addDislike() {
            this.dislikes -= 1;
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
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-top: 15px;
    }
</style>