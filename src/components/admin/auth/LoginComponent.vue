<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body p-4 p-sm-5">
                        <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
                        <form @submit.prevent="onSubmit" @submit="login">
                            <div class="form-floating mb-3" :class="{ error: v$.form.email.$errors.length }">
                                <input type="email" class="form-control" placeholder="name@example.com"
                                    v-model="v$.form.email.$model">
                                <label for="floatingInput">Email</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                            <div class="form-floating mb-3" :class="{ error: v$.form.password.$errors.length }">
                                <input type="password" class="form-control" placeholder="Password"
                                    v-model="v$.form.password.$model">
                                <label for="floatingPassword">Password</label>
                                <div class="input-errors" v-for="(error, index) of v$.form.password.$errors"
                                    :key="index">
                                    <div class="error-msg">{{ error.$message }}</div>
                                </div>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit"
                                    :disabled="v$.form.$invalid">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },
    validations() {
        return {
            form: {
                email: {
                    required: helpers.withMessage('Please enter an email', required),
                    email: helpers.withMessage('Please enter valid email address', email)
                },
                password: {
                    required: helpers.withMessage('Please enter password', required)
                },
            },
        }
    },
    methods: {
        async login() {
            this.store.dispatch('pageLoader', { show: true })
            const formValidation = await this.v$.$validate()
            if (!formValidation) return
            var response = await this.adminApi('POST', 'login', { email: this.form.email, password: this.form.password });
            this.store.dispatch('pageLoader', { show: false })
            if (response) {
                localStorage.setItem('admin', JSON.stringify(response.data))
                this.$router.push({ name: 'admin.books' })
            }
        }
    },

}
</script>