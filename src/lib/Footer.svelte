<script>
  import Grow from './Grow.svelte'
  import ArrowDownIcon from './icons/ArrowDownIcon.svelte'
  import ArrowLeftIcon from './icons/ArrowLeftIcon.svelte'
  import ArrowRightIcon from './icons/ArrowRightIcon.svelte'
  import ArrowUpIcon from './icons/ArrowUpIcon.svelte'

  import HelpIcon from './icons/HelpIcon.svelte'
  import Modal from './Modal.svelte'
  import Timer from './Timer.svelte'
  import Version from './Version.svelte'

  let helpOpen = false
</script>

<Modal bind:open={helpOpen}>
  <div class="modal-root">
    <h3>Help</h3>
    <div class="modal-shortcuts">
      <h5>Shortcuts</h5>
      <div class="modal-shortcuts-content">
        <kbd title="Move up" class="up"><ArrowUpIcon /></kbd>
        <kbd title="Move down" class="down"><ArrowDownIcon /></kbd>
        <kbd title="Move left" class="left"><ArrowLeftIcon /></kbd>
        <kbd title="Move right" class="right"><ArrowRightIcon /></kbd>
        <kbd title="Lock current cell" class="dot">.</kbd>
        <kbd title="Enable pen" class="num0">0</kbd>
        <kbd title="Put 1" class="num1">1</kbd>
        <kbd title="Put 2" class="num2">2</kbd>
        <kbd title="Put 3" class="num3">3</kbd>
        <kbd title="Put 4" class="num4">4</kbd>
        <kbd title="Put 5" class="num5">5</kbd>
        <kbd title="Put 6" class="num6">6</kbd>
        <kbd title="Put 7" class="num7">7</kbd>
        <kbd title="Put 8" class="num8">8</kbd>
        <kbd title="Put 9" class="num9">9</kbd>
      </div>
    </div>
  </div>
</Modal>
<footer>
  <Timer />
  <Grow />
  <Version />
  <button type="button" on:click={() => (helpOpen = true)}><HelpIcon /></button>
</footer>

<style lang="postcss">
  footer {
    grid-area: footer;
    padding: var(--size-2) var(--size-3);
    display: flex;
    align-items: center;
    gap: var(--size-2);

    button {
      font-size: var(--font-size-00);
      padding: 0;
      box-shadow: var(--shadow-2);
    }
  }

  .modal {
    &-root {
      display: flex;
      flex-direction: column;
      gap: var(--size-3);
    }

    &-shortcuts {
      display: flex;
      flex-direction: column;
      gap: var(--size-1);

      > h5 {
        grid-area: title;
      }

      &-content {
        display: grid;
        place-content: center;
        gap: var(--size-2);
        grid-template-areas:
          ' .    .     .   . num7 num8 num9'
          ' .    .     .   . num4 num5 num6'
          ' .    up    .   . num1 num2 num3'
          'left down right . num0 num0 dot';

        > kbd {
          cursor: default;
          box-shadow: var(--shadow-1);
          display: grid;
          place-items: center;

          &.up {
            grid-area: up;
          }
          &.down {
            grid-area: down;
          }
          &.left {
            grid-area: left;
          }
          &.right {
            grid-area: right;
          }
          &.dot {
            grid-area: dot;
          }
          &.num0 {
            grid-area: num0;
            place-items: flex-start;
          }
          &.num1 {
            grid-area: num1;
          }
          &.num2 {
            grid-area: num2;
          }
          &.num3 {
            grid-area: num3;
          }
          &.num4 {
            grid-area: num4;
          }
          &.num5 {
            grid-area: num5;
          }
          &.num6 {
            grid-area: num6;
          }
          &.num7 {
            grid-area: num7;
          }
          &.num8 {
            grid-area: num8;
          }
          &.num9 {
            grid-area: num9;
          }
        }
      }
    }
  }
</style>
