<template>
    <div v-if="posts.length">
        <h3>Список пользователей</h3>
        <post-item 
            v-for="post in posts"
            :key="post.id"
            @remove="$emit('remove', post)"
            :post="post"
        >
        </post-item>
    </div>
    <h2 v-else style="color: red; font-size: 30px; text-align: center;">Список постов пуст</h2>
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style>
    
</style>