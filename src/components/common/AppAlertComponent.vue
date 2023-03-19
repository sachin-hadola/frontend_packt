<template>
	<div class="alert text-center" :class="alertClass" role="alert" v-if="show" v-html="text">
	</div>
</template>

<script>
export default {
	name: 'AppAlert',
	data: () => ({
		multiline: false,
		show: false,
		text: '',
		timeout: 3000,
		messages: null,
		alertClass: 'danger'
	}),
	created: function () {
		this.store.watch(state => state.Alert, () => {
			const {
				text,
				messages,
				alertClass,
				// timeout
			} = this.store.state.Alert
			if (undefined == alertClass) {
				this.alertClass = 'alert-danger'
			} else {
				this.alertClass = 'alert-' + alertClass;
			}
			if (this.timeout) {
				setTimeout(() => {
					this.show = false;
				}, this.timeout);
			}
			if (messages) {
				if (!text) {
					this.text = 'Something went wrong'
				}
				if (typeof messages === 'string' || messages instanceof String) {
					this.text = messages
				} else {
					this.text = '';
					Object.values(messages).forEach(element => {
						this.text += element[0] + "<br>";
					});
				}
			}
			if (this.text) {
				this.show = true
				if (this.text.includes('<br>')) this.multiline = true
			} else {
				this.show = false
			}
		})
	}
}
</script>
