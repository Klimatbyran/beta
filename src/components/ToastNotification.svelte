<script>
  export let message = '';
  export let show = false;

  let isVisible = false;

  // Watch for changes in the `show` prop
  $: if (show) {
    isVisible = true;
    setTimeout(() => {
      isVisible = false;
    }, 3000); // Auto-hide after 3 seconds
  }
</script>

{#if isVisible}
  <div class="toast">
    {message}
  </div>
{/if}

<style>
  .toast {
  width: 75%; /* Dynamically set width */
  position: fixed;
  top: 3rem; /* Distance from the top of the page */
  left: 50%; /* Position it at the horizontal center */
  transform: translateX(-50%); /* Center the element */
  background: #ff4d4d; /* Background color */
  color: white; /* Text color */
  padding: 1rem 2rem; /* Padding for spacing */
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  z-index: 1000; /* Ensure it appears above other elements */
  text-align: center; /* Center-align the text */
}
</style>