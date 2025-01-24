# Klimatkollen Beta

This is the new version of [klimatkollen.se](https://klimatkollen.se). You'll find our legacy code [here](https://github.com/Klimatbyran/klimatkollen).
This is where we rebuild our site to be faster, better and stronger using TypeScript, React, and Tailwind. Also, this is the place where our new UX/UI is implemented.

## 🚀 Project Structure

The project follows a standard React/TypeScript structure:

```
src/
  ├── components/     # React components
  │   ├── ui/        # Base UI components
  │   ├── blocks/    # Layout block components
  │   ├── graphs/    # Data visualization components
  │   └── ...        # Feature-specific components
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utility functions and API types
  ├── pages/         # Page components
  ├── types/         # TypeScript type definitions
  └── ...
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                           |
| :--------------- | :----------------------------------------------- |
| `npm install`    | Installs dependencies                            |
| `npm run dev`    | Starts local dev server at `localhost:5173`      |
| `npm run build`  | Build your production site to `./dist/`          |
| `npm run preview`| Preview your build locally, before deploying     |
| `npm run lint`   | Run ESLint to check code quality                 |

We're using [shadcn/ui](https://ui.shadcn.com/) for our components, which provides a collection of customizable React components built with Radix UI and Tailwind CSS.

## 👩‍💻 Contributing

Do you have an idea for a feature? Jump into the code or head to our [Discord server](https://discord.gg/N5P64QPQ6v) to discuss your thoughts. You can also submit an [issue](https://github.com/Klimatbyran/beta/issues) explaining your suggestion.

### Development Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. The API types will be automatically generated from our OpenAPI spec

### How to Contribute

- **Discuss** your idea on our Discord
- **Submit an issue** if you can't find an existing one
- **Pick up an issue** from our [open issues](https://github.com/Klimatbyran/beta/issues) (and leave a comment to avoid double work)
- **Follow our code style** - we use TypeScript and ESLint to maintain code quality

## 📠 Contact

Join our [Discord server](https://discord.gg/N5P64QPQ6v) or send an email to [hej@klimatkollen.se](mailto:hej@klimatkollen.se).

## 🫶 Supporters and Partners

This work wouldn't have been possible without the support from Google.org.

We'd also like to thank our current and former partners:

Postkodstiftelsen, ClimateView, Klimatklubben.se, Researcher's Desk, Exponential Roadmap, WWF, We Don't Have Time, Våra Barns Klimat, Argand, StormGeo.

## LICENSE

MIT Copyright (c) Klimatbyrån
