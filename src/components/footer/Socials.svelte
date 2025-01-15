<script lang="ts">
  export type SocialListItemProps = {
    link: string
    text: string
    icon: string
  }

  export let items: SocialListItemProps[] = [
    { link: "https://x.com/klimatkollen", text: "X", icon: "/icons/some/x_white.svg" },
    { link: "https://www.linkedin.com/company/klimatkollen/", text: "LinkedIn", icon: "/icons/some/linkedin_white.svg" },
    { link: "https://github.com/Klimatbyran/", text: "GitHub", icon: "/icons/some/github.svg" },
    { link: "https://discord.gg/FPX9yqYAmk", text: "Discord", icon: "/icons/some/discord.svg" },
    { link: "https://instagram.com/klimatkollen.se", text: "Instagram", icon: "/icons/some/Instagram_Glyph_Black.svg" },
    { link: "https://www.facebook.com/klimatkollen/", text: "Facebook", icon: "/icons/some/facebook.svg" }
  ]
</script>

<ul class="flex gap-2">
  {#each items as { link, text, icon }}
    <li class="flex items-center">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        class="flex h-10 w-10 items-center justify-center rounded-md bg-gray-700"
      >
        <img src={icon} alt="{text} icon" class="h-5 w-5" />
      </a>
    </li>
  {/each}
</ul>

