<script>
  let name = ''
</script>

<main>
  <h1>Hello {name || 'GeoGuessr Player'}!</h1>
  <input placeholder="Enter name" bind:value={name} />
</main>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }
</style>
