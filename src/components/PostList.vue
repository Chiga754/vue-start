<template>
    <div>
        <h3>Список пользователей</h3>
        <post-item 
            v-for="post in posts"
            v-bind:key="post.id"
            :post="post"
        >
        </post-item>
    </div>
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