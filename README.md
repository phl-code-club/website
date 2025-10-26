PHL Code Club Website
Welcome to the official repository for the PHL Code Club website!

This project powers our community’s official website — a space for coding enthusiasts, beginners, and mentors to learn, collaborate, and share resources built using the Astro framework.

🌐 About PHL Code Club
PHL Code Club is a programming community driven by curiosity, inclusivity, and collaboration.
We organize coding workshops, local events, and hands‑on open‑source projects to encourage developers of all experience levels.

Our website shares:

Club news and event updates

Educational blog posts and tutorials

Team information and coding resources

Event schedules and community announcements

Learn more at phlcodeclub.org.

🧩 About the Website
This site is built using Astro — a modern static site builder that combines performance, simplicity, and developer flexibility.
The site uses the Astro Starter Kit: Blog as its base, customized for the club’s brand and needs.

Key Features
1.Clean, minimal theme

2.Fast‑loading static site (100/100 Lighthouse score)

3.SEO optimization with OpenGraph & sitemap support

4.Supports Markdown & MDX posts for easy content creation

5.Deployed easily to GitHub Pages / Netlify

📁 Project Structure
text
├── public/                # Static assets (images, icons)
├── src/
│   ├── components/        # Reusable Astro/JS components
│   ├── content/           # Blog or article markdown files
│   ├── layouts/           # Page structures and templates
│   └── pages/             # Static pages (Home, About, Events, etc.)
├── astro.config.mjs       # Astro project configuration
├── package.json           # Dependency definitions
├── tsconfig.json          # TypeScript configuration
└── README.md              # You're reading this 

🧞 Commands
All commands are run from your terminal at the project root.

Command	Description
pnpm install	Install dependencies
pnpm dev	Start local dev server at http://localhost:4321
pnpm build	Build for production (output → ./dist/)
pnpm preview	Preview locally before deployment
pnpm astro ...	Run Astro CLI tools
pnpm astro -- --help	View CLI help options

🛠️ Setup Instructions
1.Clone the repository
git clone https://github.com/phl-code-club/website.git
cd website

2.Install dependencies
pnpm install

3.Start development server
pnpm dev

4.Build for production
pnpm build

Your optimized files will be inside dist/.

🤝 Contributing
We love community contributions!
You can help improve content, fix bugs, or design new sections.

Workflow:

1.Fork this repository

2.Create a new branch (e.g., update-readme)

3.Make your changes

4.Commit → push → open a Pull Request referencing #3


Example commit:
git commit -m "Added custom README explaining organization and site"