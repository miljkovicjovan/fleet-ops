# FleetOps

FleetOps is a full-stack fleet intelligence and vessel monitoring platform built to simulate how a modern maritime operations dashboard could be designed and implemented.

The project focuses on real-world full-stack development concepts including authentication, protected APIs, database design, geospatial data, interactive maps, historical vessel tracking, alerting, and scalable application architecture.

> **Note:** FleetOps currently uses simulated vessel data and is intended as a portfolio and engineering project rather than a production maritime tracking system.

---

## Overview

FleetOps provides a centralized dashboard for monitoring a fleet of vessels and understanding their current and historical activity.

The platform allows users to:

* Monitor fleet-wide statistics
* View vessels on an interactive map
* Search and filter vessels
* View detailed vessel information
* Inspect historical vessel routes
* Monitor vessel speed and location
* Detect operational alerts

The goal is to build the project incrementally while keeping the architecture suitable for future expansion into a more distributed fleet-monitoring system.

---

## Features

### Dashboard

The main dashboard provides an overview of the fleet, including:

* Total vessels
* Active vessels
* Vessels currently in transit
* Alerts
* Fleet activity
* Recent vessel activity

The dashboard is designed around the kind of information an operator would need at a glance.

### Interactive Fleet Map

FleetOps uses Mapbox to visualize vessel positions geographically.

The map supports:

* Real-time-style vessel positions
* Vessel markers
* Vessel selection
* Geographic visualization of the fleet
* Navigation to vessel details

The current positions are generated from simulated data.

### Vessel Management

Users can browse the fleet and search for individual vessels.

Each vessel contains information such as:

* Vessel name
* IMO number
* Vessel type
* Current position
* Speed
* Heading
* Status
* Last update
* Historical route data

### Historical Routes

Each vessel can have historical position data that can be visualized as a route.

This provides a foundation for future features such as:

* Route analysis
* Voyage history
* Port visits
* Distance travelled
* Speed analysis
* Playback of vessel movements

### Alerts

FleetOps includes the foundation for monitoring operational conditions such as:

* Entering a defined geographic area
* Exceeding a speed threshold
* Other configurable vessel conditions

The alerting system can be expanded as additional monitoring rules are introduced.

### Authentication

FleetOps uses authenticated sessions to protect the application and its API routes.

Protected resources require an authenticated user before they can be accessed.

Authentication is implemented using:

* NextAuth
* Credentials authentication
* Password hashing
* Database-backed users
* Protected server-side/API access

---

## Tech Stack

### Frontend

* [Next.js](https://nextjs.org/)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Mapbox

### Backend

* Next.js API routes
* NextAuth
* Prisma
* PostgreSQL
* Neon

### Development

* pnpm
* ESLint
* TypeScript
* Prisma migrations/database tooling

---

## Architecture

FleetOps follows a full-stack Next.js architecture.

```text
┌──────────────────────────────┐
│          Browser             │
│                              │
│ Dashboard / Map / Vessels    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Next.js              │
│                              │
│ Server Components            │
│ API Routes                   │
│ Authentication               │
│ Business Logic               │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Prisma              │
│                              │
│ Database Access              │
│ Type-safe Queries            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       PostgreSQL / Neon      │
│                              │
│ Users                        │
│ Vessels                      │
│ Positions                    │
│ Alerts                       │
└──────────────────────────────┘
```

The application is intentionally structured so that additional services can be introduced later without requiring the entire application to be rewritten.

---

## Data Model

The database is designed around the core entities required for fleet monitoring.

A simplified representation is:

```text
User
 │
 └── Authentication

Vessel
 │
 ├── Current Position
 │
 ├── Historical Positions
 │
 └── Alerts
```

Historical position records provide the foundation for route visualization and future analytics.

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* pnpm
* PostgreSQL database

FleetOps currently uses Neon for PostgreSQL during development.

### Clone the repository

```bash
git clone https://github.com/miljkovicjovan/fleet-ops.git

cd fleet-ops
```

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env` file and configure the required environment variables.

Example:

```env
DATABASE_URL="your-database-url"
AUTH_SECRET="your-auth-secret"
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
```

Depending on the current authentication and application configuration, additional environment variables may be required.

### Database setup

Generate the Prisma client and apply the database configuration:

```bash
pnpm prisma generate
```

Then seed the development database:
(This is under development)
```bash
pnpm exec tsx prisma/seed.ts
```

### Start the development server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Development Goals

FleetOps is being developed as a portfolio project with an emphasis on practical engineering rather than simply building a UI.

Some of the main areas explored through the project include:

* Full-stack application architecture
* Authentication and authorization
* API security
* Relational database design
* Type-safe database access
* Geospatial data
* Interactive maps
* Data visualization
* Server-side rendering
* Client/server boundaries in Next.js
* Scalable backend architecture
* Application performance
* Clean component architecture

---

### Future Ideas

Potential future improvements include:

* [ ] Real-time vessel updates
* [ ] WebSocket-based updates
* [ ] Advanced geofencing
* [ ] More detailed alert rules
* [ ] Voyage tracking
* [ ] Port detection
* [ ] Vessel telemetry
* [ ] Advanced fleet analytics
* [ ] Elasticsearch for large-scale vessel data
* [ ] Kafka for event streaming
* [ ] Redis/caching
* [ ] Background workers
* [ ] Distributed services
* [ ] Role-based access control
* [ ] Audit logging

The long-term goal is to explore how the application could evolve from a single full-stack application into a more distributed fleet-monitoring architecture.

---

## Why I Built FleetOps

FleetOps was built as a practical way to explore full-stack engineering through a realistic domain rather than another generic CRUD application.

A fleet monitoring system provides interesting technical problems across the entire stack:

**Frontend**

Interactive maps, dashboards, filtering, data visualization, and responsive interfaces.

**Backend**

Authentication, APIs, business logic, validation, and protected resources.

**Database**

Relational data, historical records, relationships, and potentially large volumes of time-series-like position data.

**Infrastructure**

Caching, event processing, background jobs, real-time updates, and eventually distributed services.

This makes FleetOps a useful environment for experimenting with technologies and architectural decisions that appear in real production systems.

---

## License

FleetOps is source-available for viewing and educational purposes.

The source code is **not licensed for unrestricted commercial or personal reuse** unless explicitly permitted by the project owner.

---

## Author

**Jovan Miljkovic**

Full-Stack Developer

GitHub: [@miljkovicjovan](https://github.com/miljkovicjovan)

---

## Status

FleetOps is an actively developed portfolio project.

The architecture and feature set are expected to evolve as new functionality and engineering concepts are introduced.
