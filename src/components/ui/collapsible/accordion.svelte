<!-- Accordion.svelte -->
<script>
  import { Accordion, AccordionItem } from 'svelte-collapsible'
  import { slide } from 'svelte/transition'

  const items = [
    {
      key: 'a',
      title: 'Vad är Klimatkollen?',
      text: `Klimatkollen är en medborgarplattform som hjälper medborgare, företag och organisationer att få koll på klimatomställningen, genom att samla in och visualisera klimatdata.\n\n Vi visar hur det går med utsläppen, jämfört med hur det borde gå, så att det blir begripligt för allmänheten, bidrar till en faktabaserad debatt och stärker opinionen för klimatåtgärder.\n\n Vår vision är att beslutsfattare i politik och näringsliv ska påverkas av en välinformerad och växande opinion till att genomföra åtgärder som sänker utsläppen i linje med Parisavtalet.\n\n Klimatkollen lanserades i mars 2022 och drivs av den ideella föreningen Klimatbyrån. Initiativtagare är Ola Spännar och Frida Berry Eklund, båda med lång erfarenhet inom kommunikation och opinionsbildning.\n\n Vi började med lokal klimatdata för Sveriges kommuner. Under 2024 presenteras klimatdata även för företag.\n\n Klimatkollen är utvecklad med öppen källkod. Det betyder att alla kan vara med och utveckla och förbättra sajten via vårt <a href="https://github.com/Klimatbyran" target="_blank">Github</a> repo.\n\n Läs mer om varför Klimatkollen behövs i <a href="https://www.aktuellhallbarhet.se/alla-nyheter/debatt/darfor-behovs-klimatkollen/" target="_blank">vår debattartikel här</a>.`,
    },

    {
      key: 'f',
      title: 'Vilka är vi?',
      subtitle: '',
      text: `Vårt team`,
    },
    {
      key: 'g',
      title: 'Vår styrelse',
      subtitle: '',
      text: `Klimatkollen drivs av den ideella föreningen, Klimatbyrån. I styrelsen sitter:`,
    },
    {
      key: 'h',
      title: 'Så finansieras vi',
      subtitle: '',
      text: `Under 2024 och 2025 får Klimatkollen finansiell uppbackning av <a href="https://impactchallenge.withgoogle.com/techforsocialgood-sv/" target="_blank">Google.org Impact Challenge: Tech for Social Good</a> som en av två svenska mottagare.

Under 2023 drevs Klimatkollen med stöd från Postkodstiftelsen. Uppstarten 2022 finansierades av Världsnaturfonden WWF, ClimateView, We Don’t Have Time och Argand Partners. 

Mycket av arbetet är ideellt, därför välkomnar vi fler samarbetspartners och ekonomiskt stöd för att kunna skala upp!

Skänk gärna en slant! Varje krona ger oss muskler att visa upp mer data. Vårt bankgiro: 5793-3178`,
    },
    {
      key: 'i',
      title: 'Tidigare projekt',
      subtitle: '',
      text: `Under 2023 fick Klimatkollen stöd av <a href="https://postkodstiftelsen.se/" target="_blank">Postkodstiftelsen</a> för att ta tempen på hur det går med klimatomställningen i kommunerna. I dag kan du se hur det går med koldioxidutsläppen. Nu visar vi även vad kommunerna gör för att minska dem. Vi utgår ifrån de största utsläppssektorerna och visar sedan hur det går med viktiga omställningar inom dessa sektorer, genom att presentera statistik om utvalda nyckeltal, ett nyckeltal per omställning.

Inför riksdagsvalet 2022 ansvarade Klimatkollen för två unika projekt för att ge medborgare bättre koll på utsläppseffekterna av partiernas klimatpolitik:

1. <strong>Klimatmål</strong>  
  En <a href="https://www.klimatkollen.se/partier" target="_blank">analys</a> av riksdagspartiernas klimatmål, tillsammans med forskarnätverket Researchers’ Desk, Världsnaturfonden WWF, Våra barns klimat och ClimateView, i samarbete med PwC och Naturskyddsföreningen. Analysen visade att sex av åtta partier missar Parisavtalets 1,5-gradersmål.

2. <strong>Utsläppsberäkning</strong>  
   <a href="https://www.klimatkollen.se/utslappsberakningar" target="_blank">Utsläppsberäkning</a> av riksdagspartiernas politik gällande tolv centrala klimatåtgärder. Bakom uträkningarna står Klimatkollen, Världsnaturfonden WWF, ClimateView, Naturskyddsföreningen och Våra barns klimat. Beräkningarna visade att den nya regeringens politik kan öka utsläppen med 25 miljoner ton redan under mandatperioden 2022–2026.`,
    },
  ]
  const team = [
    {
      src: '/team/frida.jpg',
      alt: 'Frida',
      name: 'Frida Berry Eklund, medgrundare till Klimatkollen',
      text: 'Senior kommunikationsspecialist och medgrundare av flera klimatinitiativ, inklusive den internationella plattformen Our Kids’ Climate. Författare och talare, samt EU-klimatpaktsambassadör och Al Gore-utbildad Climate Reality Leader.',
      linkedin: 'https://www.linkedin.com/in/fridaberryeklund/',
      twitter: 'https://twitter.com/klimatfrida',
    },
    {
      src: '/team/ola.jpg',
      alt: 'Ola',
      name: 'Ola Spännar, medgrundare till Klimatkollen',
      text: 'Senior specialist inom kommunikation, opinion och marknadsföring. Tidigare kommunikationschef på Centerpartiet, programansvarig på Berghs School of Communication och kundansvarig på Forsman & Bodenfors.',
      linkedin: 'https://www.linkedin.com/in/ospannar/',
      twitter: 'https://twitter.com/olaspannar',
    },
    {
      src: '/team/elvira.jpg',
      alt: 'Elvira',
      name: 'Elvira Boman, Tech Lead',
      text: 'Tech Lead på Klimatkollen och fullstackutvecklare. Omfattande erfarenhet av grön och cirkulär teknik från flera prisbelönta startups, däribland Deedster. Konsultchef på IT-bolaget Precisit.',
      linkedin: 'https://www.linkedin.com/in/elviraboman/',
    },
    {
      src: '/team/samuel.png',
      alt: 'Samuel',
      name: 'Samuel Plumppu, Frontend Lead',
      text: 'Fullstackutvecklare med passion för open source och att skapa digitala lösningar som ger värde till människor och samhälle. Har tidigare arbetat med startups och ideella organisationer i tidiga skeden, bland annat på We Don’t Have Time.',
      linkedin: 'https://www.linkedin.com/in/samuelplumppu/',
    },
    {
      src: '/team/alex.jpg',
      alt: 'Alexandra',
      name: 'Alexandra Palmqvist, Dataanalytiker',
      text: 'Hållbarhetsstrateg och expert på klimatdata, med passion för planeten och att överbrygga gapet mellan vetenskap och data över till konkreta strategier för hållbar utveckling. Har tidigare arbetat på GoClimate, Normative och Mission anew.',
      linkedin: 'https://www.linkedin.com/in/alexandra-palmquist-46969946/',
    },
    {
      src: '/team/christian.jpg',
      alt: 'Christian',
      name: 'Christian Landgren, AI Lead',
      text: 'Prisbelönt utvecklare, digital entreprenör och en av Sveriges mest inflytelserika personer inom tech. Grundare av digitala innovationsbyrån Iteam och medgrundare av Öppna skolplattformen. Talare inom AI och digital innovation och rådgivare till Sveriges innovationsminister.',
      linkedin: 'https://www.linkedin.com/in/christianlandgren/',
    },
  ]

  const board = [
    {
      src: '/team/ola.jpg',
      alt: 'Ola',
      name: 'Ola Spännar',
      text: 'Opinionsbildare, medgrundare av Klimatkollen, tidigare kommunikationschef på Centerpartiet och kundansvarig på Forsman & Bodenfors.',
    },
    {
      src: '/team/frida.jpg',
      alt: 'Frida',
      name: 'Frida Berry Eklund',
      text: 'Specialist på klimatkommunikation, föreläsare och medgrundare till Klimatkollen. Utsedd till en av Sveriges 101 hållbarhetsmäktigaste 2021. Initiativtagare till den internationella plattformen Our Kids’ Climate och författare till boken “Prata med barn om klimatet” (Natur & Kultur, 2020).',
    },
    {
      src: '/board/christian.jpg',
      alt: 'Christian',
      name: 'Christian Landgren',
      text: 'Digital entreprenör och en av Sveriges mest inflytelserika personer inom tech. VD och grundare av Iteam och medgrundare av Öppna skolplattformen.',
    },
    {
      src: '/board/anna.jpg',
      alt: 'Anna',
      name: 'Anna Loverus',
      text: 'Digital strateg och tidigare chef för sociala medier på Spotify och H&M. VD och grundare av Better Odds.',
    },
    {
      src: '/board/maria.jpg',
      alt: 'Maria',
      name: 'Maria Soxbo',
      text: 'Journalist, författare, föreläsare och grundare av Klimatklubben. Utsedd till en av Sveriges 101 hållbarhetsmäktigaste 2021.',
    },
    {
      src: '/board/carl-johan.jpg',
      alt: 'Carl-Johan',
      name: 'Carl-Johan Schultz',
      text: 'Hållbarhetsstrateg på Diamant & Schultz, tidigare planner på Forsman & Bodenfors, författare till boken ”Hållbariseringen”, Årets marknadsföringsbok 2022.',
    },
  ]

  let openIndex = null

  function toggleItem(index) {
    openIndex = openIndex === index ? null : index
  }
</script>

<Accordion>
  {#each items as item, index}
    <AccordionItem key={item.key}>
      <div slot="header" class="header">
        <h2>{item.title}</h2>
        <div
          class="chevron-container"
          role="button"
          tabindex="0"
          on:click={() => toggleItem(index)}
          on:keydown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              toggleItem(index)
            }
          }}
        >
          <svg
            class="chevron {openIndex === index ? 'open' : ''}"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <p slot="body" class="body">
        {@html item.text}
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
                    <a href={member.linkedin} target="_blank">LinkedIn</a
                    >{member.twitter ? ', ' : ''}
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
      </p>
    </AccordionItem>
  {/each}
</Accordion>

<style>
  .grid {
    display: grid;
    grid-gap: 32px; /* Spacing between items */
    margin: 32px 0;
  }

  @media screen and (min-width: 694px) {
    .grid {
      grid-template-columns: repeat(3, 1fr); /* 3 items per row */
    }
  }

  @media screen and (min-width: 462px) and (max-width: 694px) {
    .grid {
      grid-template-columns: repeat(2, 1fr); /* 2 items per row */
    }
  }

  @media screen and (max-width: 462px) {
    .grid {
      grid-template-columns: 1fr; /* 1 item per row */
    }
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

  .grid-image {
    border-radius: 50%;
    inline-size: 200px;
    block-size: 200px;
  }

  .grid-item b {
    margin: 8px 0;
    font-weight: 700;
  }

  /* Accordion and header styling */
  :global(.accordion) {
    inline-size: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    inline-size: 790px; /* Since width is set manually it also makes the entire accordion container static 
    and not responsive 

    Tried alternative strategies like these, but still did not work 
  
    inline-size: 100%; Allows responsiveness 
    max-inline-size: 790px;  Sets the maximum width for the header 
    */
  }

  .header h2 {
    margin: 0;
    margin-inline-end: 20px;
    font-size: 18px;
    color: white;
    font-family: 'DM Sans Variable', sans-serif;
    font-weight: 400;
  }

  /* Body text */
  .body {
    display: block;
    inline-size: 100%;
    max-inline-size: 900px !important;
    padding: 1rem 0;
    margin: 0 auto;
    color: white;
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    white-space: pre-line;
    margin-block-end: 16px;
  }
  .chevron-container {
    inline-size: 30px;
    block-size: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .chevron-container:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .chevron {
    transition: transform 0.3s ease;
    fill: black;
  }

  .chevron.open {
    transform: rotate(180deg) !important;
  }

  /* Global link styles */
  :global(.body a) {
    color: white;
    position: relative;
  }

  /* Initial underline effect using ::before */
  :global(.body a::before) {
    content: '';
    display: block;
    block-size: 2px;
    background-color: white;
    position: absolute;
    inset-inline-start: 0;
    inset-block-end: -2px;
    inline-size: 100%;
  }

  /* Hover underline effect using ::after */
  :global(.body a::after) {
    content: '';
    display: block;
    block-size: 2px;
    background-color: white;
    position: absolute;
    inset-inline-start: 0;
    inset-block-end: -2px;
    inline-size: 100%;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  :global(.body a:hover::after) {
    transform: scaleX(1);
  }

  :global(.body a:hover::before) {
    display: none;
  }

  .additional-text {
    font-family: 'DM Sans Variable', sans-serif;
    font-size: 16px;
    line-height: 1.2;
    font-weight: 400;
    color: white !important;
    margin-block-start: 10px;
    text-align: start;
    opacity: 1 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
