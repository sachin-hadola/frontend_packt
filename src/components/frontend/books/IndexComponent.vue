<template>
    <div class="container">
        <div class="card border-0 shadow rounded-3 my-3">
            <div class="card-body p-4 p-sm-5">
                <h5 class="card-title mb-2 fw-light fs-5">Search</h5>
                <div class="row">
                    <div class="col-sm-4 mt-2">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="" v-model="title">
                            <label for="floatingInput">Title</label>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-2">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="" v-model="author">
                            <label for="floatingInput">Author</label>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-2">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="" v-model="isbn">
                            <label for="floatingInput">ISBN</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4 mt-2">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="" v-model="genre">
                            <label for="floatingInput">Genre</label>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-2">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control" placeholder="" v-model="published_on"
                                :max="maxPublishedDate">
                            <label for="floatingInput">Published On</label>
                        </div>
                    </div>
                    <div class="col-sm-4 mt-2">
                        <div class="mb-3">
                            <button class="btn btn-primary btn-lg mt-1" @click="applyFilter()">Submit</button>&nbsp;
                            <button class="btn btn-info btn-lg mt-1" @click="clearFilter()">Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card border-0 shadow rounded-3 my-3">
            <div class="card-body p-4 p-sm-5">
                <div class="row">
                    <div class="col-md-12 mt-2">
                        <h5 class="card-title mb-2 fw-light fs-5">Book List</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-2">
                        <EasyDataTable :headers="headers" :items="items" v-model:server-options="serverOptions"
                            :server-items-length="serverItemsLength" :loading="loading" buttons-pagination>
                            <template #item-title="item">
                                <router-link class="btn btn-link"
                                    :to="{ name: 'books.view', params: { id: item.id } }">{{ item.title }}</router-link>
                            </template>
                        </EasyDataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        const headers = [
            { text: "ID", value: "id", sortable: true },
            { text: "Title", value: "title", sortable: true },
            { text: "Author", value: "author", sortable: true },
            { text: "Genre", value: "genre", sortable: true },
            { text: "Isbn", value: "isbn", sortable: true },
            { text: "Published On", value: "published_on", sortable: true },
        ];

        return {
            headers,
            items: []
        }
    },
    data() {
        return {
            serverOptions: {
                page: 1,
                rowsPerPage: 10,
                sortBy: 'id',
                sortType: 'desc',
            },
            loading: false,
            serverItemsLength: null,
            payload: [],
            maxPublishedDate: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
        }
    },
    mounted() {
        this.getBooks()
    },
    watch: {
        serverOptions: {
            handler() {
                this.getBooks()
            },
            deep: true,
        }
    },
    methods: {
        async getBooks() {
            this.loading = true;
            this.payload = { ...this.serverOptions };
            this.payload.search = {
                title: this.title,
                author: this.author,
                isbn: this.isbn,
                genre: this.genre,
                published_on: this.published_on
            }
            var response = await this.frontendApi('POST', 'books/list', this.payload)
            if (response) {
                this.items = response.data.records;
                this.serverItemsLength = response.data.recordsTotal;
                this.loading = false;
            }
        },
        applyFilter() {
            this.getBooks()
        },
        clearFilter() {
            this.title = '';
            this.author = '';
            this.isbn = '';
            this.genre = '';
            this.published_on = '';
            this.getBooks()
        },
        async deleteBook(id) {
            if (confirm('Are you sure?')) {
                this.store.dispatch('pageLoader', { show: true })
                var response = await this.frontendApi('DELETE', 'books/' + id)
                if (response) {
                    this.store.dispatch('pageLoader', { show: false })
                    this.store.dispatch('alert', {
                        messages: response.message,
                        alertClass: 'success'
                    })
                }
                this.getBooks()
            }
        }
    },
}
</script>