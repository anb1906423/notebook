<template>
	<div class="col-md-12">
		<div class="card card-container">
			<img id="profile-img" src="http://changsarn4u.com/loginnew/IMAGE/avatar.png" alt="Cannot load the image"
				class="profile-img-card" />
			<Form @submit="handleLogin" :validation-schema="loginFormSchema">
				<div class="form-group">
					<label for="username">Tên đăng nhập</label>
					<Field name="username" type="text" class="form-control" />
					<ErrorMessage name="username" class="error-feedback" />
				</div>
				<div class="form-group">
					<label for="password">Mật khẩu</label>
					<Field name="password" type="password" class="form-control" />
					<ErrorMessage name="password" class="error-feedback" />
				</div>

				<div class="form-group">
					<button class="btn btn-primary btn-block" :disabled="loading">
						<span v-show="loading" class="spinner-border spinner-border-sm"></span>
						<span>Đăng nhập</span>
					</button>
				</div>

				<p class="account not-account">Chưa có tài khoản?</p>

				<router-link :to="{ name: 'register' }" class="">
					<div class="form-group">
						<button class="btn btn-primary btn-block">
							<span>Đăng ký</span>
						</button>
					</div>

					<div class="form-group">
						<div v-if="message" class="alert alert-danger" role="alert">
							{{ message }}
						</div>
					</div>
				</router-link>
			</Form>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const loginFormSchema = yup.object().shape({
			username: yup.string().required("Tên đăng nhập không được để trống!"),
			password: yup.string().required("Mật khẩu không được để trống!"),
		});

		return {
			loading: false,
			message: "",
			loginFormSchema,
		};
	},
	methods: {
		...mapActions(useAuthStore, ["login"]),

		async handleLogin(user) {
			this.loading = true;

			try {
				await this.login(user);

				const redirectPath = this.$route.query.redirect || {
					name: "contactbook",
				};

				this.$router.push(redirectPath);
			} catch (error) {
				console.log(error);

				this.loading = false;
				alert("Thông tin tài khoản hoặc mật khẩu không chính xác!")
				// this.message = "Thông tin tài khoản hoặc mật khẩu không chính xác!.";
			}
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
