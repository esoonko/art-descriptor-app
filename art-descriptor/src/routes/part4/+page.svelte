<script lang="ts">
  import { onMount } from 'svelte';
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  let data: { timestamp: any; text: any; } | null = null; // To store the response data

  onMount(async () => {
    try {
      const res = await fetch('/api/generate-description?page=4');
      if (res.ok) {
        data = await res.json();
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  });
</script>

{#if data}
<ScrollArea class="font-sans text-[rgb(27,18,18)] text-justify mt-[100px] ml-[-80px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]">
  <div class="font-sans text-[rgb(27,18,18)] text-justify mt-[100px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]">
    {data.timestamp}
  </div>
  {data.text}
</ScrollArea>
{:else}
<ScrollArea class="font-sans text-[rgb(27,18,18)] text-justify mt-[100px] ml-[-80px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]">
  <div class="font-sans text-[rgb(27,18,18)] text-justify mt-[100px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]">
    Loading
  </div>
</ScrollArea>
{/if}
