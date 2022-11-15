<script>
export default {
	props: {
		contact: { type: Object, required: true },
	},
};
</script>

<template>
	<div>
		<div class="p-1">
			<strong>Tiêu đề:</strong>
			{{ contact.name }}
		</div>
		
		<div class="p-1">
			<strong>Nội dung:</strong>
			{{ contact.notes }}
		</div>
		
		<div class="p-1">
			<strong>Liên hệ yêu thích:&nbsp;</strong>
			<i v-if="contact.favorite" class="fas fa-check"></i>
			<i v-else class="fas fa-times"></i>
		</div>
	</div>
</template>
