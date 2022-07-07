<template>
    <div v-if="posts.length">
        <h3>Список пользователей</h3>
        <transition-group name="post-list">
            <post-item 
                v-for="post in posts"
                :key="post.id"
                @remove="$emit('remove', post)"
                :post="post"
            >
            </post-item>
        </transition-group>
        
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

.post-list-item {
    display: inline-block;
    margin-right: 10px;
}   
.post-list-enter-active,
.post-list-leave-active {
    transition: all .4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}  
.post-list-move {
  transition: transform 0.8s ease;
}
</style>