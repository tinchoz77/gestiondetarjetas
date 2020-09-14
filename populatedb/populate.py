from random import randint
from pymongo import MongoClient
mongo = MongoClient('localhost', 27017)
db = mongo.gestiondetarjetas

nombres = ["Francisco", "Eduardo", "Ana", "Raquel", "Maite", "Santiago"]
apellidos = ["Fernández", "Rodríguez", "Pérez", "Márquez", "Mitre"]
dominios = ["gmail.com", "yahoo.com", "hotmail.com", "icloud.com"]
descrips = ["Compra en restaurante", "Supermercado", "Carga tarjeta Sube", "Cena con amigos", "Pasaje en avión"]

# limpiar la base de datos
db.clientes.delete_many({})
db.tarjetas.delete_many({})
db.movimientos.delete_many({})

# generar clientes
for n in nombres:
    for a in apellidos:
        email = n.lower() + "." + a[0].lower() + "@" + dominios[randint(0,3)]
        cliente = {
            "nombre": n,
            "apellido": a,
            "email": email,
            "activo": "true"
        }
        res = db.clientes.insert_one(cliente)
        cliente_id = res.inserted_id
        print("Cliente: " + n + " " + a)

        # generar tarjetas
        for i in range(randint(0, 6)):
            numtarj = ""
            for j in range(16):
                numtarj += str(randint(1,8))
            tarjeta = {
                "cliente": cliente_id,
                "numero": numtarj,
                "limite": str(randint(1, 8)*500),
                "fechaVencimiento": "2021-12-31",
                "activo": randint(1,10) > 3
            }
                
            res = db.tarjetas.insert_one(tarjeta)
            tarjeta_id = res.inserted_id
            print( "- Tarjeta: " + numtarj)

            # generar movimientos
            movimientos = []
            for k in range(randint(1,200)):
                movimiento = {
                    "cliente": cliente_id,
                    "tarjeta": tarjeta_id,
                    "fecha": "2020-" + str(randint(8,12)) + "-" + str(randint(1,25)),
                    "descripcion": descrips[randint(0, 4)],
                    "importe": randint(1, 8)*100,
                    "activo": "true"
                }
                movimientos.append(movimiento)
                print("-- Movimiento #" + str(k+1))

            db.movimientos.insert_many(movimientos)

print("Carga finalizada.")