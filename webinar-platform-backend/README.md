# Praneeth Webinars Backend

Spring Boot + MySQL backend for the webinar platform frontend.

## Stack

- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT authentication
- MySQL

## Run

1. Create the MySQL database and tables using:
   - `sql/schema.sql`
   - `sql/seed.sql`
2. Start the backend:

```bash
mvn spring-boot:run
```

## API Base URL

`http://localhost:8080/api`

## Demo Accounts

- Admin: `admin@praneethwebinars.io`
- User: `user@praneethwebinars.io`
- Password: `password123`
