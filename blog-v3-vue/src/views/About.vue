<template>
    <div class="article">
        <article class="about active" data-page="about">
            <header>
                <h2 class="h2 article-title">About me</h2>
            </header>

            <section class="about-text">
                <p>
                    I'm Creative Director and UI/UX Designer from Sydney, Australia,
                    working in web development and print media. I enjoy turning complex
                    problems into simple, beautiful and intuitive designs.
                </p>
                <p>
                    My job is to build your website so that it is functional and
                    user-friendly but at the same time attractive. Moreover, I add
                    personal touch to your product and make sure that is eye-catching and
                    easy to use. My aim is to bring across your message and identity in
                    the most creative way. I created web design for many famous brand
                    companies.
                </p>
            </section>

            <!-- services -->
            <section class="service">
                <h3 class="h3 service-title">What I'm doing</h3>

                <ul class="service-list">
                    <li class="service-item">
                        <div class="service-icon-box">
                            <img src="https://i.postimg.cc/4389jZkP/icon-design.png" alt="icon" width="40" />
                        </div>
                        <div class="service-content-box">
                            <h4 class="h4 service-item-title">Web Design</h4>
                            <p class="service-item-text">
                                The most modern and high-quality design made at a professional
                                level.
                            </p>
                        </div>
                    </li>

                    <li class="service-item">
                        <div class="service-icon-box">
                            <img src="https://i.postimg.cc/ZqgqrqzG/icon-dev.png" alt="icon" width="40" />
                        </div>
                        <div class="service-content-box">
                            <h4 class="h4 service-item-title">Web development</h4>
                            <p class="service-item-text">
                                High-quality development of sites at the professional level.
                            </p>
                        </div>
                    </li>

                    <li class="service-item">
                        <div class="service-icon-box">
                            <img src="https://i.postimg.cc/xjLdzYxZ/icon-app.png" alt="icon" width="40" />
                        </div>
                        <div class="service-content-box">
                            <h4 class="h4 service-item-title">Mobile apps</h4>
                            <p class="service-item-text">
                                Professional development of applications for iOS and Android.
                            </p>
                        </div>
                    </li>

                    <li class="service-item">
                        <div class="service-icon-box">
                            <img src="https://i.postimg.cc/0NL8zHpx/icon-photo.png" alt="icon" width="40" />
                        </div>
                        <div class="service-content-box">
                            <h4 class="h4 service-item-title">Photography</h4>
                            <p class="service-item-text">
                                I make high-quality photos of any category at a professional
                                level.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>

            <!-- testimonials -->
            <section class="testimonials">
                <h3 class="h3 testimonials-title">Testimonials</h3>

                <ul class="testimonials-list has-scrollbar">
                    <li class="testimonials-item" v-for="(item, index) in testimonials" :key="index"
                        @click="openModal(item)">
                        <div class="content-card" data-testimonials-item>
                            <figure class="testimonials-avatar-box">
                                <!-- 修正为动态 alt 绑定 -->
                                <img :src="item.avatar" :alt="item.name" data-testimonials-avatar width="60" />
                            </figure>

                            <h4 class="h4 testimonials-item-title" data-testimonials-title>
                                {{ item.name }}
                            </h4>

                            <div class="testimonials-text" data-testimonials-text>
                                <p>{{ item.text }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>

            <!-- modal
           关键点：当 activeItem 存在时渲染 modal，并使用和原项目一致的 `active` 类名，
           这样你全局 CSS 里依赖 `.modal-container.active` / `.overlay.active` 的规则会生效 -->
            <transition name="modal-fade">
                <div v-if="activeItem" class="modal-container active" data-modal-container>
                    <div class="overlay active" data-overlay @click="closeModal"></div>

                    <section class="testimonials-modal">
                        <button class="modal-close-btn" @click="closeModal">
                            <ion-icon name="close-outline">×</ion-icon>
                        </button>

                        <div class="modal-img-wrapper">
                            <figure class="modal-avatar-box">
                                <img :src="activeItem.avatar" :alt="activeItem.name" width="80" />
                            </figure>

                            <img src="https://i.postimg.cc/mZ00RwX7/icon-quote.png" alt="quote icon" />
                        </div>

                        <div class="modal-content">
                            <h4 class="h3 modal-title">{{ activeItem.name }}</h4>
                            <time datetime="2023-06-14">14 June, 2023</time>

                            <div class="modal-text">
                                <p>{{ activeItem.text }}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </transition>

            <!-- clients -->
            <section class="clients">
                <h3 class="h3 clients-title">Clients</h3>

                <ul class="clients-list has-scrollbar">
                    <li class="clients-item">
                        <a href="#"><img src="https://i.postimg.cc/YqfKyG66/logo-1-color.png" alt="logo" /></a>
                    </li>
                    <li class="clients-item">
                        <a href="#"><img src="https://i.postimg.cc/fWm6JtgG/logo-2-color.png" alt="logo" /></a>
                    </li>
                    <li class="clients-item">
                        <a href="#"><img src="https://i.postimg.cc/Bb07xpwd/logo-3-color.png" alt="logo" /></a>
                    </li>
                    <li class="clients-item">
                        <a href="#"><img src="https://i.postimg.cc/hv1yMmkh/logo-4-color.png" alt="logo" /></a>
                    </li>
                    <li class="clients-item">
                        <a href="#"><img src="https://i.postimg.cc/ry1P86Dc/logo-5-color.png" alt="logo" /></a>
                    </li>
                    <li class="clients-item">
                        <a href="#"><img src="https://i.postimg.cc/SsWDN8NV/logo-6-color.png" alt="logo" /></a>
                    </li>
                </ul>
            </section>
        </article>
    </div>
</template>

<script setup>
import { ref } from "vue";

const testimonials = ref([
    {
        name: "Daniel Lewis",
        avatar: "https://i.postimg.cc/zGDHfn3G/avatar-1.png",
        text: `Richard was hired to create a corporate identity. 
           It's modern, clean and with a beautiful design that got a lot of praises...`,
    },
    {
        name: "Jessica Miller",
        avatar: "https://i.postimg.cc/DwY0yHtx/avatar-2.png",
        text: "Working with Richard has been an absolute pleasure. I was impressed with his attention to detail.",
    },
    {
        name: "Emily Evans",
        avatar: "https://i.postimg.cc/fRFWhX9F/avatar-3.png",
        text: "I couldn't be happier with the website that Richard created for us. His attention to detail and creativity is unmatched.",
    },
    {
        name: "Henry Williams",
        avatar: "https://i.postimg.cc/zXv1Xv81/avatar-4.png",
        text: "The site is not only visually appealing but also optimized for conversions. I've seen a 50% increase in traffic since the launch!",
    }
]);

const activeItem = ref(null);

function openModal(item) {
    // 记得这里我们传入的是 item 对象，直接设置为 activeItem
    activeItem.value = item;
}

function closeModal() {
    activeItem.value = null;
}
</script>

<style scoped>
/* 进入和离开过渡动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
