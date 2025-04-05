<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Heading from '$lib/components/heading.svelte';
	let { children } = $props();
</script>

<style>
.layout {
	display: flex;
}

.sidebar-container {
	flex: 0 0 350px; /* Fix sidebar width */
}

.content-container {
	margin-left: 50px; /* Space for sidebar */
	padding: 20px;
	width: 100%;
}
</style>

<div class="layout">
<div class="sidebar-container">
<Heading/>
	<Sidebar />
</div>

<div class="content-container">
	{@render children()}
</div>
</div>
  