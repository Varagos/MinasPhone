# MinasPhone Backend - AI Coding Agent Instructions

This is a **Domain-Driven Design (DDD) e-commerce backend** built with NestJS, PostgreSQL, and CQRS patterns. Understanding the architectural patterns is crucial for effective contributions.

## Architecture Overview

### Core DDD Structure

- **Bounded Contexts**: Independent business domains in `src/modules/` (product-catalog, orders, user-management, shipping, marketing, analytics, notifications)
- **Domain Layer**: Pure business logic in `domain/` subdirectories (entities, value objects, domain events)
- **Application Layer**: Use cases via Commands/Queries in `application/` subdirectories
- **Infrastructure Layer**: Database repositories and external services in `infra/` subdirectories
- **API Layer**: HTTP controllers in `src/api/controllers/` delegate to CQRS commands/queries

### Key Base Classes (src/libs/ddd/)

- `AggregateRoot`: Domain entities that emit events and coordinate business operations
- `Entity`: Domain objects with identity, extend this for main business entities
- `ValueObject`: Immutable objects representing descriptive aspects
- `DomainEvent`: Business events published by aggregates
- `Command/Query`: Application layer patterns for write/read operations

## Development Patterns

### Request Flow Pattern

```
HTTP Controller → Command/Query → Handler → Domain Entity → Repository → Database
```

Example: Creating products follows `products.http.controller.ts` → `CreateProductCommand` → `CreateProductHandler` → `Product` entity → `ProductRepository`

### Database & Migrations

- **Slonik SQL**: Raw SQL queries, not an ORM. Repository pattern in `infra/database/`
- **Migration Commands**:
  - `yarn migration:create --name feature_name`
  - `NODE_ENV=development yarn migration:up`
  - Always create corresponding down migrations in `database/migrations/down/`
- **Database Config**: Environment-based connection strings in `src/configs/database.config.ts`

### API Conventions

- **Routing**: Centralized in `src/configs/app.routes.ts` - always update when adding endpoints
- **Versioning**: All routes prefixed with `/v1/`
- **DTOs**: Request/response types follow `.request.dto.ts` / `.response.dto.ts` naming
- **Error Handling**: Domain exceptions in `*.errors.ts`, HTTP exceptions in controllers
- **Validation**: Use `class-validator` decorators on DTOs

### Testing Strategy

- **E2E Tests**: BDD-style using jest-cucumber in `tests/e2e/`
- **Test Structure**: Feature files (`.feature`) + step definitions (`.e2e.spec.ts`)
- **ApiClient Pattern**: Shared test client in `tests/test-utils/ApiClient.ts`
- **Database Cleanup**: Truncate tables in `afterEach()` hooks using Slonik
- **Test Commands**: `yarn test tests/e2e --runInBand` (sequential execution required)

## Module Development Workflow

### Adding New Features

1. **Domain First**: Create entities, value objects, domain events in `domain/`
2. **Application Layer**: Add command/query handlers in `application/`
3. **Infrastructure**: Implement repositories with raw SQL in `infra/`
4. **API**: Create HTTP controller in `src/api/controllers/`
5. **Routes**: Update `src/configs/app.routes.ts`
6. **Tests**: Add BDD scenarios in `tests/e2e/`

### Working with Existing Modules

- **Product Catalog**: Core domain with categories, products, attributes, and product types
- **Orders**: Cart and order management with checkout workflows
- **User Management**: Authentication and user profiles
- **Cross-Module**: Use domain events for communication between bounded contexts

## Environment & Commands

### Setup Requirements

```bash
# Environment files needed
touch .env.development .env.prod .env.test

# Database setup
NODE_ENV=development yarn migration:up
NODE_ENV=development yarn seed:up
```

### Development Commands

- `yarn start:dev` - Development with hot reload
- `yarn migration:create --name feature_name` - New migration
- `yarn test tests/e2e --runInBand` - E2E tests
- `docker compose up -d` from `docker/dev/` - Local services

### Key File Patterns

- Controllers: `*.http.controller.ts` in `src/api/controllers/`
- Commands: `*.command.ts` with handlers `*.handler.ts`
- Entities: `*.entity.ts` in domain directories
- Repositories: `*.repository.ts` in infra directories
- Tests: `*.e2e.spec.ts` with corresponding `.feature` files

Always follow the established DDD patterns and maintain separation of concerns between domain, application, and infrastructure layers.
