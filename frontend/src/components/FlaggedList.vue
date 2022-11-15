<script>
export default {
	props: {
		contacts: { type: Array, default: [] },
		activeIndex: { type: Number, default: -1 },
	},
	emits: ["update:activeIndex"],
	methods: {
		updateActiveIndex(index) {
			this.$emit("update:activeIndex", index);
		},
	},
};
</script>

<template>
	<ul class="list-group list-group-horizontal">
		<li class="list-group-item rounded ">
			<router-link :to="{
				name: 'contact.add',
			}">
				<i class="btn btn-sm fa-solid fa-plus fa-center" style="font-size:150px; "></i>

			</router-link>
		</li>
		<template v-for="(contact, index) in contacts">
		<li class="list-group-item rounded" v-if="contact.favorite==true"
			:class="{ active: index === activeIndex }" :key="contact._id" @click="updateActiveIndex(index)">
			<h5 class="title"> {{ contact.name }} </h5>
			<p class="content">{{ contact.notes }}</p>
			<p>Yêu Thích: {{ contact.favorite }}</p>
			<input v-if="contact.finish" class="box-finish" type="checkbox" checked>
			<input v-else class="box-finish" type="checkbox">
			<label class="finish">Đã hoàn thành</label>
			<!-- <p>{{ contact.createAt }}</p> -->
		</li>
		</template>

	</ul>
</template>
<style>
.list-group-item {
	background-color: rgb(167, 166, 166, .5);
	height: 200px;
	width: auto;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

}

.list-group {
	margin-top: 16px;
	width: 1200px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-column-gap: 1em;
	grid-template-rows: auto;
	grid-row-gap: 2em;
	flex-wrap: wrap;
}

.title {
	margin: 0;
}

.content {
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	word-wrap: break-word;
	white-space: normal;
	overflow: hidden;
	display: -webkit-box;
}

.fa-center {
	width: 100%;
	color: rgb(57, 59, 59, .8);
	text-align: center;
	line-height: 115%;
}
</style>