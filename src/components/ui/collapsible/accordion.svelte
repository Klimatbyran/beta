<script>
  import ToggleSection from 'src/components/ui/collapsible/ToggleSection.svelte.svelte'
  import { items } from './data/items.js'
  import { team } from './data/team.js'
  import { board } from './data/board.js'

  function formatText(text) {
    return text.replace(/\n/g, '<br>')
  }
</script>

<div class="accordion">
  {#each items as item}
    <ToggleSection header={item.title} text={formatText(item.text)}>
      {#if item.key === 'f'}
        <div class="grid">
          {#each team as member}
            <div class="grid-item">
              <img
                src={member.src}
                alt={member.alt}
                width="200"
                height="200"
                class="grid-image"
              />
              <b>{member.name}</b>
              <span>{@html member.text}</span>
              <div class="links">
                {#if member.linkedin}
                  <a href={member.linkedin} target="_blank">LinkedIn</a>
                  {member.twitter ? ', ' : ''}
                {/if}
                {#if member.twitter}
                  <a href={member.twitter} target="_blank">Twitter</a>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}

      {#if item.key === 'g'}
        <div class="grid">
          {#each board as member}
            <div class="grid-item">
              <img
                src={member.src}
                alt={member.alt}
                width="200"
                height="200"
                class="grid-image"
              />
              <b>{member.name}</b>
              <span>{member.text}</span>
            </div>
          {/each}
        </div>
        <p class="additional-text">
          Här hittar du våra
          <a href="https://www.klimatkollen.se/stadgar.pdf" target="_blank"
            >stadgar</a
          >,
          <a
            href="https://www.klimatkollen.se/uppforandekod.pdf"
            target="_blank">uppförandekod</a
          >, och
          <a
            href="https://www.klimatkollen.se/antikorruptionspolicy.pdf"
            target="_blank">antikorruptionspolicy</a
          >.
        </p>
      {/if}
    </ToggleSection>
  {/each}
</div>

<style>
  .accordion {
    margin: 2rem 0;
  }

  .grid {
    display: grid;
    grid-gap: 32px;
    margin: 32px 0;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: start;
    line-height: 19px;
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
  }

  .grid-item a {
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    line-height: 2;
    font-weight: 400;
    color: white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: white;
  }

  .grid-image {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  @media screen and (max-width: 400px) {
    .grid-image {
      width: 130px;
      height: 130px;
    }
  }

  .additional-text a {
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    line-height: 2;
    font-weight: 400;
    color: white;
    margin-block-start: 10px;
    text-align: start;
    opacity: 1;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  .text-section a,
  .body a {
    /* For the a tags rendered inside ToggleSection */
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    color: white;
    text-decoration: underline;
    text-decoration-thickness: 3px; /* Thicker underline */
    text-decoration-color: white; /* White underline */
  }
</style>
