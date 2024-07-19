<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    isOpen?: boolean
    shouldShowCloseButton?: boolean
    children?: Snippet
    actions?: Snippet
  }

  let {
    isOpen = $bindable(false),
    shouldShowCloseButton: showCloseButton = true,
    children,
    actions,
  }: Props = $props()

  let dialog: HTMLDialogElement

  export const close = () => (isOpen = false)
  export const open = () => (isOpen = true)

  $effect(() => {
    isOpen ? dialog.showModal() : dialog.close()
  })
</script>

<dialog bind:this={dialog} class="modal">
  <div class="modal-box">
    {#if showCloseButton}
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={close}>
        ✕
      </button>
    {/if}

    {#if children}
      {@render children()}
    {/if}

    {#if actions}
      <div class="modal-action">
        {@render actions()}
      </div>
    {/if}
  </div>
</dialog>
