
<template>
	<li :id="id" class="itm" @click="_selectOption()" :class="{active: selected, disabled: disabled}" >
		<slot>
			<span class="txt">{{name}}</span>
			<i class="u-icon-tickblue"></i>
		</slot>
	</li>
</template>

<script type="text/javascript">
	import Emitter from './assets/emitter';

	export default{
		name: 'sf-option',
		componentName: 'option',
		mixins: [Emitter],
		computed: {
			selected: function(){
				return this.$parent.selected.id == this.id;
			}
		},
		props: {
			id: [String, Number],
			name: String,
			disabled: {
				type: Boolean,
				default: false
			} 
		},
		data() {
			return {};
		},
		methods: {
			_selectOption() {
				if(this.disabled) return;
				this.dispatch('select', 'selectOption', this);
			}
		},
		created() {
      		
      	}
	}
</script>