# Running Golang App with Docker

This guide explains how to build and run a Docker container for your Golang application.

## Prerequisites

- Docker is installed and accessible from your terminal.
- You have a valid `Dockerfile` in your project directory.
- Your Go application listens on port `8080`.

---
## Folder Structure Example

Make sure your project is structured like this:

```
/your-golang-project
│
├── main.go
└── Dockerfile
```

## Step-by-Step Guide

### 1. Build the Docker Image

From the project directory (where your `Dockerfile` is located), run:

```bash
docker build -t learning-golang:1.0 .
```

- This builds a Docker image with the tag `learning-golang:1.0`.
- The `.` indicates that the Dockerfile is in the current directory.

### 2. Create the Docker Container

Once the image is built, create a container named `test-server` and map the container’s port `8080` to your host's port `8080`:

```bash
docker container create --name test-server -p 8080:8080 learning-golang:1.0
```

> 📌 This only **creates** the container but does not start it yet.

### 3. Start the Container

Start the container using:

```bash
docker container start test-server
```

### 4. Stop the Container

Stop the container using:

```bash
docker container stop test-server
```

If your Go application is running correctly, it will now be accessible from your browser or API client at:

```
http://localhost:8080
```
