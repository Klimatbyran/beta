<script>
  import { items } from 'src/copy/items.js'
  import { team } from 'src/copy/team.js'
  import { board } from 'src/copy/board.js'

  import * as Accordion from '@/components/ui/accordion/index.ts'
</script>

<Accordion.Root class="accordion-about-us">
  {#each items as item}
    <Accordion.Item value={item.title}>
      <Accordion.Trigger class="header">
        <h2>{item.title}</h2>
      </Accordion.Trigger>
      <Accordion.Content>
        <div class="body">
          {#if item.text}
            {@html item.text}
          {/if}

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
                      <a
                        href={member.linkedin}
                        target="_blank"
                        class="social-link"
                      >
                        <img
                          alt="LinkedIn logo"
                          src="/icons/some/linkedin_white.svg"
                          class="social-icon"
                        />
                      </a>
                    {/if}
                    {#if member.twitter}
                      <a
                        href={member.twitter}
                        target="_blank"
                        class="social-link"
                      >
                        <img
                          alt="X logo"
                          src="/icons/some/x_white.svg"
                          class="social-icon"
                        />
                      </a>
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
        </div></Accordion.Content
      >
    </Accordion.Item>
  {/each}
</Accordion.Root>

<style>
  .social-link {
    margin-inline-end: 4px;
    display: inline-flex;
    align-items: center;
  }

  .social-icon {
    inline-size: 24px;
    block-size: 24px;
    color: transparent;
    object-fit: contain;
    margin-block-start: 5px;
  }

  .social-link:hover .social-icon {
    opacity: 0.8;
  }

  /* Global stylings for the accordion to override Svelte's default designs.
   However, to prevent the styles affecting other components that may use .accordion class, 
   changed the class name to accordion-about-us */

  :global(.accordion-about-us) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  :global(.accordion-about-us .header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    inline-size: 100%;
    max-inline-size: 790px;
    text-decoration: none;
    border: none;
  }

  /* Global reset for border within the accordion component
  to override Svelte's default border-color settings */

  :global(.accordion-about-us *) {
    border-color: transparent;
  }
  :global(.accordion-about-us .header h2) {
    margin: 0;
    font-size: 18px;
    color: white;
    font-family: 'DM Sans Variable', sans-serif;
    font-weight: 400;
  }

  :global(.accordion-about-us .body) {
    display: block;
    inline-size: 100%;
    max-inline-size: 900px;
    padding: 1rem 0;
    margin: 0 auto;
    color: white;
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    white-space: pre-line;
  }

  :global(.accordion-about-us .body a) {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    color: white;
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
  }

  .grid-image {
    border-radius: 50%;
    inline-size: 200px;
    block-size: 200px;
    object-fit: cover;
  }

  @media screen and (max-inline-size: 400px) {
    .grid-image {
      inline-size: 130px;
      block-size: 130px;
    }
  }
  .additional-text {
    display: flex;
    flex-wrap: wrap;
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: white;
    line-height: 2;
  }

  .additional-text a {
    white-space: nowrap;
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    margin-inline-end: 4px;
    margin-inline-start: 4px;
  }

  .additional-text a:not(:last-child)::after {
    margin-inline-start: 4px;
    margin-inline-end: 4px;
  }
</style>
