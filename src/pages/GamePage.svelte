<script>
  import Keyboard from '../lib/Keyboard.svelte'
  import Sudoku from '../lib/Sudoku.svelte'
</script>

<section>
  <Sudoku />
  <Keyboard />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
  }
</style>
