<script lang="ts">
    import { onMount } from 'svelte';
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    export let page: string;
    export let divclass: string;
    export let scrollarea: string;
    export let historydivclass: string;
  
    let generated: { timestamp: any; text: any; } | null = null;
    let history: any[] = [];
    let loadingGenerated = true;
    let loadingHistory = true;
  
    onMount(async () => {
      // Fetch generated description
      fetch(`/api/generate-description?page=${page}`)
        .then(res => res.json())
        .then(data => {
          generated = data;
        })
        .catch(err => console.error('Error generating:', err))
        .finally(() => loadingGenerated = false);
  
      // Fetch history data
      fetch(`/api/fetch-history?page=${page}`)
        .then(res => res.json())
        .then(data => {
          history = data;
        })
        .catch(err => console.error('Error fetching history:', err))
        .finally(() => loadingHistory = false);
    });
  </script>
  
  <ScrollArea class={scrollarea}>
    <div class={divclass}>
      {#if loadingGenerated}
        <p>Loading</p>
      {:else if generated}
        <div>{generated.timestamp}</div>
        {generated.text}
      {/if}
    </div>
  
    {#if !loadingHistory}
      {#each history as item}
        <div class={historydivclass}>
          {item.timestamp}
        </div>
        {item.text}
      {/each}
    {/if}
  </ScrollArea>
  