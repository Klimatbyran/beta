<script>
  export let boardMembers = [
    {
      name: 'Frida Berry Eklund',
      image: '/people/frida.jpg',
      description:
        'Klimatspecialist och medgrundare till Klimatkollen. Initiativtagare till Our Kids’ Climate och författare till boken “Prata med barn om klimatet” (Natur & Kultur). EU Climate Pact Ambassador och Climate Reality Leader.',
    },
    {
      name: 'Ola Andersson',
      image: '/people/ola.jpg',
      description:
        'Opinionsbildare, medgrundare av Klimatkollen, tidigare kommunikationschef på Centerpartiet och kundansvarig på Forsman & Bodenfors.',
    },
    {
      name: 'Anna Loverus',
      image: '/people/anna.jpg',
      description:
        'Digital strateg och tidigare chef för sociala medier på Spotify och H&M. VD och grundare av Better Odds.',
    },
    {
      name: 'Maria Soxbo',
      image: '/people/maria.jpg',
      description:
        'Journalist, författare, föreläsare och grundare av Klimatklubben. Utsedd till en av Sveriges 101 hållbarhetsmäktigaste 2021.',
    },
    {
      name: 'Christian Landgren',
      image: '/people/christian.jpg',
      description:
        'Digital entreprenör och en av Sveriges mest inflytelserika personer inom tech. VD och grundare av Iteam och Öppna skolplattformen.',
    },
    {
      name: 'Carl-Johan Schultz',
      role: 'Utvecklare',
      image: '/people/carl-johan.jpg',
      description:
        'Hållbarhetsstrateg på Doings, tidigare planner på Forsman & Bodenfors, författare till boken ”Hållbariseringen”, Årets marknadsföringsbok 2022.',
    },
  ]
</script>

<div class="container mx-auto py-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
  <p>
    Klimatkollen drivs av den ideella föreningen, Klimatbyrån. I styrelsen
    sitter:
  </p>
  {#each boardMembers as member}
    <div class="text-center">
      <img
        src={member.image}
        alt={member.name}
        class="w-32 h-32 rounded-full mx-auto"
      />
      <h3 class="text-xl font-semibold mt-4">{member.name}</h3>
      <p class="text-gray-600">{member.description}</p>
    </div>
  {/each}
</div>
