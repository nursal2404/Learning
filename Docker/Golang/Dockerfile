FROM golang:1.11.4

WORKDIR /app

COPY . .

RUN go mod init connection && go mod tidy

RUN go build -o app

CMD ["./app"]