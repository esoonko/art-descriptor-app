<script lang="ts">
  import GenerateText from '../../lib/components/generate-text.svelte';

  const page = '3';  // This can be dynamic based on your page logic
  const scrollarea = "font-sans text-[rgb(27,18,18)] text-justify mt-[80px] ml-[-80px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
  const divclass = "font-sans text-[rgb(27,18,18)] text-justify mt-[80px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
  const historydivclass = "font-sans text-[rgb(27,18,18)] text-justify mt-[60px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
</script>

<GenerateText {page} {divclass} {scrollarea} {historydivclass}/>
