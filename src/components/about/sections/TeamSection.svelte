<script>
  export let teamMembers = [
    {
      name: 'Frida Berry Eklund',
      role: 'Grundare',
      image: '/people/frida.jpg',
      description:
        'Klimatspecialist och medgrundare till Klimatkollen. Initiativtagare till Our Kids’ Climate och författare till boken “Prata med barn om klimatet” (Natur & Kultur). EU Climate Pact Ambassador och Climate Reality Leader.',
    },
    {
      name: 'Ola Andersson',
      role: 'Grundare',
      image: '/people/ola.jpg',
      description:
        'Opinionsbildare, medgrundare av Klimatkollen, tidigare kommunikationschef på Centerpartiet och kundansvarig på Forsman & Bodenfors.',
    },
    {
      name: 'Alexandra Palmquist',
      role: 'Miljövetare',
      image: '/people/alex.jpg',
      description:
        'Miljövetare med fokus på klimat och företagsdata. Tidigare erfarenhet från FN i Latinamerika, numera hemmastadd i Stockholms tech startup-scen för att driva klimatomställningen.',
    },
    {
      name: 'Elvira Boman',
      role: 'Utvecklare',
      image: '/people/elvira.jpg',
      description:
        'Tech lead och teknisk fysiker på Klimatkollen och Precisit. Lång erfarenhet av grön och cirkulär tech vid flera prisbelönta startups och del av ledarteamet på IT-konsultbyrån Precisit.',
    },
    {
      name: 'Christian Landgren',
      role: 'Utvecklare',
      image: '/people/christian.jpg',
      description:
        'Prisbelönt utvecklare, digital entreprenör och en av Sveriges mest inflytelserika personer inom tech. Grundare av digitala innovationsbyrån Iteam och medgrundare av Öppna skolplattformen. Talare inom AI och digital innovation och rådgivare till regeringen.',
    },
    {
      name: 'Samuel Plumppu',
      role: 'Utvecklare',
      image: '/people/samuel.png',
      description:
        'Fullstackutvecklare med passion för open source och att skapa digitala lösningar som ger värde till människor och samhälle. Har tidigare arbetat med startups och ideella organisationer i tidiga skeden, bland annat på We Don’t Have Time.',
    },
    {
      name: 'Kayla Woodbury',
      role: 'Utvecklare',
      image: '/people/placeholder-user.jpg',
      description:
        'Frontendutvecklare med passion för hållbarhet och användarvänliga digitala lösningar. Har tidigare arbetat som miljökonsult med fokus på att tolka regleringar och beräkna växthusgasutsläpp för företag.',
    },
    {
      name: 'Hugo Björk',
      role: 'Utvecklare',
      image: '/people/placeholder-user.jpg',
      description: ' ',
    },
  ]
</script>

<div class="container mx-auto py-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
  {#each teamMembers as member}
    <div class="text-center">
      <img
        src={member.image}
        alt={member.name}
        class="w-32 h-32 rounded-full mx-auto"
      />
      <h3 class="text-xl font-semibold mt-4">{member.name}</h3>
      <p class="text-base leading-6 my-[11.2px]">{member.description}</p>
    </div>
  {/each}
</div>
