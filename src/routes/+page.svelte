<script lang="ts">
  import type { ScaleConfig, ScaleReading } from '$lib/types'
  import { LocalStorage } from '$lib/state/local-storage.svelte'
  import { connectScale } from '$lib/utils/connect-scale'

  let scales = new LocalStorage<ScaleConfig[]>('scales', [])

  let scaleReadings: Record<string, ScaleReading> = $state({})

  $effect(() => {
    scales.value.forEach((scale) => {
      connectScale(scale.url, (reading) => {
        scaleReadings[scale.name] = reading
      })
    })
  })
</script>

<nav class="navbar">
  <div class="navbar-start">
    <span class="btn btn-ghost text-xl pointer-events-none">Truck Scale</span>
  </div>
  <div class="navbar-end">test</div>
</nav>
<div class="flex flex-col p-6 gap-2 text-6xl">
  {#each Object.entries(scaleReadings).toSorted() as [name, reading]}
    <div class="flex flex-row w-full items-center">
      <div class="flex-grow flex items-center min-w-0">
        <span class="block truncate leading-tight p-2">
          {name}
        </span>
      </div>
      <span class="font-mono">
        {new Intl.NumberFormat().format(reading.weight)}
        {reading.unit}
      </span>
    </div>
  {/each}
</div>
