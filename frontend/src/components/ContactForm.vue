<template>
	<Form ref="contactForm" @submit="submitContact" :validation-schema="contactFormSchema">
		<div class="form-group col-3 text-center align-self-center note-title">
			<label for="name"><b>Tiêu đề</b></label>
			<Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
			<ErrorMessage name="name" class="error-feedback" />
		</div>
		
		<div class="form-group">
			<label for="address"><b>Nội dung ghi chú</b></label>
			<textarea placeholder="Nội dung ghi chú.." class="form-control note-content" id="note-content" cols=""
				form="" rows="10" v-model="contactLocal.notes">
                    </textarea>
			
		</div>
		<div class="check-box-group">
			<div class="form-group form-check">
				<input id="favorite" name="favorite" type="checkbox" class="form-check-input flag" v-model="contactLocal.favorite" />
				<label for="favorite" class="form-check-label flag-lable">
					<strong>Ghi chú yêu thích</strong>
				</label>
			</div>
	
			<div class="form-group form-check">
				<input id="finish" name="finish" type="checkbox" class="form-check-input flag" v-model="contactLocal.finish" />
				<label for="finish" class="form-check-label flag-lable">
					<strong>Hoàn thành</strong>
				</label>
			</div>
		</div>

		<div class="form-group">
			<button class="btn btn-primary">
				<i class="fas fa-save"></i> Lưu
				
			</button>
			<button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
				<i class="fas fa-trash"></i> Xóa
			</button>
		</div>
	</Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	emits: ["submit:contact", "delete:contact"],
	props: {
		contact: { type: Object, required: true },
		resetAfterSubmit: { type: Boolean, default: false },
	},
	data() {
		const contactFormSchema = yup.object().shape({
			name: yup
				.string()
				.required("Tiêu đề ghi chú không được để trống!")
				.max(50, "Tiêu đề có tối đa 50 ký tự!"),
			email: yup
				.string()
				.email("E-mail không đúng.")
				.max(50, "E-mail tối đa 50 ký tự."),
		});
		return {
			contactLocal: this.contact,
			contactFormSchema,
		};
	},
	methods: {
		submitContact() {
			this.$emit("submit:contact", this.contactLocal);
			if (this.resetAfterSubmit) {
				this.$refs.contactForm.resetForm();
				this.$router.push({path: '/'});
			}
		},
		deleteContact() {
			this.$emit("delete:contact", this.contactLocal._id);
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
