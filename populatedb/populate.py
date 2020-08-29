from random import randint
from pymongo import MongoClient
mongo = MongoClient('localhost', 27017)
db = mongo.gestiondetarjetas

# generar clientes
nombres = ["José", "Estéban", "Ana", "Raquel"]
apellidos = ["Fernández", "Rodríguez", "Pérez", "Márquez"]

db.clientes.delete_many({})
clientes = []
for n in nombres:
    for a in apellidos:
        email = n + "_" + a + "@yahoo.com.ar"
        cliente = {
            "nombre": n,
            "apellido": a,
            "email": email,
            "activo": "true"
        }
        res = db.clientes.insert_one(cliente)
        clientes.append(res.inserted_id)
        print("creado " + n + " " + a)

# generar tarjetas
tarjetas = []

db.tarjetas.delete_many({})
for c in clientes:
    for i in range(1, randint(1, 6)):
        numtarj = ""
        for j in range(0,16):
            numtarj += str(randint(1,8))
        tarjeta = {
            "cliente": c,
            "numero": numtarj,
            "limite": str(randint(1, 8)*500),
            "fechaVencimiento": "2021-12-31"
        }
        res = db.tarjetas.insert_one(tarjeta)
        tarjetas.append(res.inserted_id)
        print( "creada " + numtarj)

# generar movimientos
descrips = ["Compra en restaurante", "Supermercado", "Carga tarjeta Sube", "Cena con amigos", "Pasaje en avión"]

db.movimientos.delete_many({})


