# MinasPhone: E-commerce Modular Monolith with NestJS, CQRS & DDD

A clean architecture implementation of an e-commerce system using **NestJS**, **CQRS**, and **Domain-Driven Design** principles.

## 🏗️ Architecture Overview

This project demonstrates a microservices-based e-commerce platform with clear separation of concerns through:

- **Clean Architecture** with distinct layers
- **CQRS (Command Query Responsibility Segregation)** for scalable read/write operations
- **Domain-Driven Design** principles for business logic organization
- **Event-driven communication** between bounded contexts
- **Saga Choreography** for distributed transaction management

<!-- ![Event Storming](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1') -->
<img width="2011" height="1988" alt="Image" src="https://github.com/user-attachments/assets/abcfdc05-1b96-4809-be7f-94d8d4f5a57b" />

## 📦 Current Modules

### Core Domains

- **User Management** - User registration, authentication, and profile management
- **Product Catalog** - Product creation, updates, and inventory management
- **Order Processing** - Order lifecycle with saga-based orchestration
- **Notifications** - Event-driven messaging system

### Planned Modules

- **Shipping** - Delivery management and tracking
- **Marketing** - Campaigns and promotions
- **Analytics** - Business intelligence and reporting

## 🎯 Key Features

- **Stock Data Integrity** - Saga choreography ensures consistent inventory management
- **Event Sourcing** - Complete audit trail of domain events (TODO)
- **Scalable Architecture** - Independent scaling of read/write operations
- **Type Safety** - Full TypeScript implementation
- **Clean Boundaries** - Clear separation between domains

## 🔄 Order Processing Flow

The order processing implements a **saga choreography pattern** that guarantees data consistency across multiple services:

1. **Order Creation** → Validates customer and initiates process
2. **Stock Reservation** → Ensures product availability
3. **Order Confirmation** → Confirms successful reservation
4. **Notification Dispatch** → Sends confirmation emails
5. **Compensation** → Automatic rollback on failures

## 💳 Payment Support

Currently supports **in-store payments** only. Online payment integration planned for future releases.

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repository-url>

# View Readme in /server for details
```

## 📖 Documentation

- [Architecture Decision Records](./docs/adr/)
- [Domain Models](./docs/domains/)
- [API Documentation](./docs/api/)

## 🤝 Contributing

This project serves as a reference implementation for clean architecture principles in NestJS. Contributions and discussions are welcome!

## 📄 License

[MIT](LICENSE)

---

_Built with ❤️ using NestJS, TypeScript, and Clean Architecture principles_
