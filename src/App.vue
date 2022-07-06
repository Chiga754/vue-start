<template>
    <div>
        <button @click="addLike">Like</button>
        <button @click="addDislike">Dislike</button>
    </div>
    <div>
        Количества лайков : <strong>{{likes}}</strong>
    </div>
    <div>
        Количества дизлайков : <strong>{{dislikes}}</strong> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            likes: 0,
            dislikes: 5,
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

</style>