#!/bin/bash

# Ejecuta los comandos y captura la salida en la variable "respuesta"
respuesta=$(openssl x509 -pubkey -noout -in cert.pem |
    openssl pkey -pubin -outform der |
    openssl dgst -sha256 -binary |
    base64)

# Imprime la respuesta
echo "La respuesta es: $respuesta"