<script lang="ts">
  import { onMount } from 'svelte';
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { animateTyping } from "./typewriter-effect"
  import { Button } from "$lib/components/ui/button/index.js";
  export let page: string;
  export let divclass: string;
  export let scrollarea: string;
  export let historydivclass: string;
  export let buttonclass: string;
  export let timedivclass: string;

  let history: any[] = [];
  let historyAfterFirst: any[] = [];
  let loadingGenerated = false;
  let firstGenerated = false;
  let loadingHistory = true;

  onMount(async () => {

    // Fetch history data
    await fetch(`/api/fetch-history?page=${page}`)
      .then(res => res.json())
      .then(data => {
        history = data;
      })
      .catch(err => console.error('Error fetching history:', err))
      .finally(() => loadingHistory = false);
  });

  async function generateDescription() {
      loadingGenerated = true;

      await fetch(`/api/generate-description?page=${page}`);

  await fetch(`/api/fetch-history?page=${page}`)
      .then(res => res.json())
      .then(data => {
        history = data;
        historyAfterFirst = history.slice(1)
      })
      .catch(err => console.error('Error generating:', err))
      .then(() => firstGenerated = true)
      .finally(() => loadingGenerated = false);
}
</script>

<ScrollArea class={scrollarea}>
  <div class={divclass}>
  {#if !loadingGenerated}
      <Button class={buttonclass}
              variant="link" on:click={generateDescription}>Generate</Button>
  {:else if loadingGenerated}
  <Button class={buttonclass}
  variant="link">Generating</Button>
  {/if}
  
    {#if !loadingGenerated && firstGenerated && !loadingHistory }
      <div class={historydivclass}><span use:animateTyping={[
        history[0].timestamp
      ]}></span></div> 
      <div class={timedivclass}>
      <span use:animateTyping={[
          history[0].text
      ]}></span>
      </div>
    {/if}

  {#if firstGenerated && !loadingHistory}
    {#each historyAfterFirst as item}
      <div class={historydivclass}>
        {item.timestamp}
      </div>
      <div class={timedivclass}>
        {item.text}
      </div>
    {/each}
  {:else if !loadingHistory }
      {#each history as item}
      <div class={historydivclass}>
          {item.timestamp}
      </div>
      <div class={timedivclass}>
            {item.text}
          </div>
      {/each}
  {/if}
</div>
</ScrollArea>
