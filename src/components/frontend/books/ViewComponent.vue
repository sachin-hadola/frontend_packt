<template>
    <div class="container">
        <div class="card border-0 shadow rounded-3 my-3">
            <div class="card-body p-4 p-sm-5">
                <h5 class="card-title mb-2 fw-light fs-5">Book Details <router-link class="btn btn-link"
                        :to="{ name: 'books' }">Back</router-link></h5>
                <div class="row">
                    <div class="col-md-12">
                        <div class="">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="images p-3">
                                        <div class="text-center p-4"> <img id="main-image" :src="book.image"
                                                width="250" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="product p-4">
                                        <div class="mt-4 mb-3"> <small class="text-muted brand">#{{
                                            book.id
                                        }}</small>
                                            <h3 class="text-uppercase fw-bold">{{ book.title }}</h3>
                                            <div class="price d-flex flex-row align-items-center">
                                                <div class="ml-2">
                                                    <small class="dis-price">Published on:
                                                        <i> {{ book.published_on }} </i>
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="price d-flex flex-row align-items-center">
                                                <div class="ml-2">
                                                    <small class="dis-price">Published By:
                                                        <i> {{ book.publisher }} </i>
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="price d-flex flex-row align-items-center">
                                                <div class="ml-2">
                                                    <small class="dis-price">Author:
                                                        <i>{{ book.author }}</i>
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="price d-flex flex-row align-items-center">
                                                <div class="ml-2">
                                                    <small class="dis-price">ISBN:
                                                        <i>{{ book.isbn }}</i>
                                                    </small>
                                                </div>
                                            </div>
                                            <div class="price d-flex flex-row align-items-center">
                                                <div class="ml-2">
                                                    <small class="dis-price">Genre:
                                                        <i>{{ book.genre }}</i>
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="about">{{ book.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { toRaw } from 'vue';
export default {
    mounted() {
        this.getBook(this.$route.params.id)
    },
    data() {
        return {
            book: {},
        }
    },
    methods: {
        async getBook(id) {
            this.store.dispatch('pageLoader', { show: true })
            var response = await this.frontendApi('GET', 'books/' + id)
            if (response) {
                this.book = toRaw(response.data);
                this.store.dispatch('pageLoader', { show: false })
            }
        }
    },
}
</script>