<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">{{ appName }}</a>
                <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li class="nav-item text-right">
                            <a class="nav-link active" href="javascript:void(0);" @click="logout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
export default {
    props: ['appName'],
    methods: {
        async logout() {
            this.store.dispatch('pageLoader', { show: true })
            var response = await this.adminApi('GET', 'logout');
            this.store.dispatch('pageLoader', { show: false })
            if (response) {
                localStorage.removeItem('admin')
                setTimeout(() => {
                    this.$router.push({ name: 'admin.login' });
                }, 1000);
            }
        }
    },
}
</script>