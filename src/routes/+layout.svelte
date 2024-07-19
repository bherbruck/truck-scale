<script lang="ts">
  let { children } = $props()
</script>

<div class="flex flex-col items-center w-full">
  <div class="flex flex-col max-w-3xl w-full">
    {@render children()}
  </div>
</div>
