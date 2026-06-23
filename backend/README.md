# Workflow Parser

A Go backend service for:

* Uploading spreadsheet metadata
* Uploading workflow JSON files
* Resolving workflow payloads using spreadsheet mappings
* Searching workflow/application data
* Viewing application actions
* Deleting applications
* Error logging
* Database schema management using Tern migrations

---

## Project Structure

```text
.
├── cmd
│   └── main.go
├── internal
│   ├── config
│   ├── db
│   │   └── migrations
│   ├── handler
│   ├── middleware
│   ├── model
│   ├── repository
│   ├── router
│   ├── server
│   └── utils
├── tern.conf
├── .env
├── go.mod
└── go.sum
```

---

## Prerequisites

* Go 1.24+
* PostgreSQL
* Tern Migration Tool

Install Tern:

```bash
go install github.com/jackc/tern/v2@latest
```

Ensure the tern binary is available in your PATH.

---

## Environment Setup

Create a `.env` file using `.env.sample`.

```bash
cp .env.sample .env
```

Example:

```env
PARSER_PRIMARY.ENV="local"

PARSER_SERVER.PORT="5555"
PARSER_SERVER.READ_TIMEOUT="30"
PARSER_SERVER.WRITE_TIMEOUT="30"
PARSER_SERVER.IDLE_TIMEOUT="60"
PARSER_SERVER.CORS_ALLOWED_ORIGINS="http://localhost:5173"

PARSER_DATABASE.HOST="localhost"
PARSER_DATABASE.PORT="5432"
PARSER_DATABASE.USER="postgres"
PARSER_DATABASE.PASSWORD="password"
PARSER_DATABASE.NAME="json_parser"
PARSER_DATABASE.SSL_MODE="disable"

PARSER_DATABASE.MAX_OPEN_CONNS="25"
PARSER_DATABASE.MAX_IDLE_CONNS="25"
PARSER_DATABASE.CONN_MAX_LIFETIME="300"
PARSER_DATABASE.CONN_MAX_IDLE_TIME="300"
```

---

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE json_parser;
```

Update `.env` with the correct credentials.

---

## Migrations

Create a tern.conf file from tern.conf.sample

```bash
cp tern.conf.sample tern.conf
```

Create a migration after configuring tern.conf from tern.conf.sample:

```bash
tern new -m ./internal/db/migrations migration_name
```

Apply migrations:

```bash
tern migrate --migrations ./internal/db/migrations
```

Check migration status:

```bash
tern status --migrations ./internal/db/migrations
```

---

## Running the Server

Start the backend:

```bash
go run ./cmd
```

Expected output:

```text
config validation passed
starting server on port 5555 (local)
```

---

## API Endpoints

### Upload Spreadsheet

```http
POST /api/spreadsheet
```

Form Data:

* service_group_id
* service_name
* file (.xlsx)

---

### Upload Workflow

```http
POST /api/workflow
```

Form Data:

* file (.json)

---

### Get Workflow Events

```http
GET /api/applications/:appl_id
```

Query Parameters:

```text
service_id
root_type
```

root_type values:

```text
initiated_data
execution_data
```

---

### Get Initiated Application

```http
GET /api/applications/:appl_id/actions
```

Query Parameters:

```text
service_id
```

---

### Get Execution Action

```http
GET /api/applications/:appl_id/actions/:action_no
```

Query Parameters:

```text
service_id
```

---

### Delete Application

```http
DELETE /api/applications/:appl_id
```

Query Parameters:

```text
service_id
root_type
```

---

### Get Logs

```http
GET /api/logs
```

Returns stored application error logs.

---

## Development Workflow

1. Create or modify database schema.
2. Generate migration.

```bash
tern new -m ./internal/db/migrations migration_name
```

3. Apply migration.

```bash
tern migrate --migrations ./internal/db/migrations
```

4. Run the server.

```bash
go run ./cmd
```

5. Test endpoints using Postman or the frontend application.

---

## Notes

* Spreadsheet mappings are stored per service group.
* Workflow uploads automatically skip applications whose service group is not registered.
* Workflow payloads are stored as JSONB.
* Logs are persisted in PostgreSQL.
* All migrations are managed through Tern.
