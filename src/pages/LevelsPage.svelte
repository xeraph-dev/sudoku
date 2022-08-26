<section>
  <ul>
    <li><button type="button">Easy</button></li>
    <li><button type="button">Medium</button></li>
    <li><button type="button">Hard</button></li>
    <li><button type="button">Extreme</button></li>
  </ul>
</section>

<style lang="postcss">
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    gap: var(--size-3);
    padding: 0;
  }

  button {
    width: 100%;
    box-shadow: var(--inner-shadow-3);
    background-color: transparent;

    &:hover {
      background-color: var(--_border);
      box-shadow: var(--shadow-2);
    }
  }
</style>
