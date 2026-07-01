# The Bowties

Premium wedding and event band website built with Next.js App Router, Tailwind CSS, Framer Motion, React Hook Form, Zod and node-ical.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Development: [http://localhost:3022](http://localhost:3022)

## Production

```bash
npm run build
npm run start
```

Production server: `http://localhost:8022`

PM2:

```bash
pm2 start ecosystem.config.cjs
```

## Configuration

- `ICAL_FEED_URL`: public Apple Calendar `.ics` URL. Events containing “private” in their title are hidden.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: SMTP transport.
- `SMTP_FROM`: sender shown on enquiry emails.
- `CONTACT_TO`: booking inbox.

Replace the placeholder Instagram links, legal text, contact address and generated visual with the band’s final production details before launch.
