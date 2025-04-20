<script lang="ts">
    import GenerateText from '../../lib/components/generate-dev.svelte';
  
    const page = '1';  // This can be dynamic based on your page logic
    const scrollarea = "font-sans text-[rgb(27,18,18)] text-justify mt-[70px] ml-[-60px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
    const divclass = "font-sans text-[rgb(27,18,18)] text-justify mt-[10px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
    const historydivclass = "font-sans text-[rgb(27,18,18)] text-justify mt-[20px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
    const timedivclass = "font-sans text-[rgb(27,18,18)] text-justify mb-[40px] ml-[-5px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
    const buttonclass = "font-sans text-[rgb(27,18,18)] text-justify mt-[00px] ml-[-420px] tracking-wide leading-custom font-normal px-[5px] w-[calc(100%-100px)] text-[11px]"
  </script>
  
  <GenerateText {page} {divclass} {scrollarea} {historydivclass} {buttonclass} {timedivclass} />
  