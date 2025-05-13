# 🐳 Running MongoDB with Docker

This guide explains how to run a MongoDB container using Docker with manual volume mounting to avoid automatically created anonymous volumes.

---

## 📥 Step 1 — Pull the MongoDB Docker Image

Download the official MongoDB image from Docker Hub:

```bash
docker pull mongo
```

---

## 💾 Step 2 — Create Named Volumes

To persist MongoDB data and configuration, create two named volumes:

```bash
docker volume create learn_mongo       # For MongoDB database data (/data/db)
docker volume create learn_mongodb     # For MongoDB config (/data/configdb)
```

> Creating volumes manually ensures that no unnamed "dummy" volumes are automatically generated.

---

## 🐳 Step 3 — Create MongoDB Container

Now run a MongoDB container and mount the volumes created earlier:

```bash
docker run --name mongo_container \
  --mount type=volume,source=learn_mongo,target=/data/db \
  --mount type=volume,source=learn_mongodb,target=/data/configdb \
  -p 27017:27017 \
  -d mongo:latest
```

### Breakdown:
- `--name mongo_container`: Name of the container
- `--mount`: Explicit volume mounts
- `-p 27017:27017`: Maps host port 27017 to container port 27017
- `-d`: Run container in detached mode
- `mongo:latest`: Use the latest MongoDB image

---

## 🖥️ Step 4 — Access MongoDB Shell

To open the MongoDB shell inside the container, run:

```bash
docker exec -it mongo_container mongosh
```

You’ll be connected to the Mongo shell, where you can start interacting with your MongoDB server.

---

## 🔍 Step 5 — Check MongoDB Versions

### Check MongoDB Shell Version:

```bash
docker exec -it mongo_container mongosh --version
```

### Check MongoDB Server (mongod) Version:

```bash
docker exec -it mongo_container mongod --version
```

---

## 🧹 Optional: Clean Up

To stop and remove the container:

```bash
docker stop mongo_container
docker rm mongo_container
```

To remove the volumes:

```bash
docker volume rm learn_mongo learn_mongodb
```

---

## ✅ Summary

You now have a working MongoDB setup using Docker with:
- Persistent volumes for `/data/db` and `/data/configdb`
- No auto-created anonymous volumes
- Full shell access for database management

---

Happy developing with MongoDB + Docker! 🐳📦📊
