<script setup lang="ts">
import { ref } from 'vue'

const stars = ref(1000)
const distance = ref(800)
</script>

<template>
    <div class="star-bg">
        <div
            v-for="i in stars"
            :key="i"
            class="star-bg-star"
            :style="{
                transformOrigin:
                    '0 0 ' + (distance + Math.random() * 1360) + 'px',
                transform:
                    'translate3d(0,0,-' +
                    (distance + Math.random() * 300) +
                    'px) rotateY(' +
                    Math.random() * 360 +
                    'deg) rotateX(' +
                    Math.random() * -50 +
                    'deg) scale(' +
                    (0.2 + Math.random()) +
                    ',' +
                    (0.2 + Math.random()) +
                    ')',
            }"
        ></div>
    </div>
</template>
<style scoped>
@keyframes rotate {
    0% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
            rotateY(-360deg);
    }
}
.star-bg {
    background-color: transparent;
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
}
.star-bg-star {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: #f8f8ee;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0 -300px;
    transform: translate3d(0, 0, -300px);
    backface-visibility: hidden;
}
</style>
