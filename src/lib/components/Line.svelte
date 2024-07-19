<script lang="ts">
  import { getContext } from 'svelte'
  import {} from 'layercake'

  type Props = {
    stroke: string
  }

  let { stroke }: Props = $props()

  const { data, xGet, yGet } = getContext('LayerCake')

  let path = $derived.by(() => {
    return (
      'M' +
      data
        .map((d) => {
          return `${xGet(d)} ${yGet(d)}`
        })
        .join('L')
    )
  })
</script>
