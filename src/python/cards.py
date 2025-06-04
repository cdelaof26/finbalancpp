from db_conf import get_db_connection
from flask import request, jsonify
from flask import Blueprint
from utils import any_is_none

card_routes = Blueprint('cards', __name__)


@card_routes.route('/api/cards', methods=['POST'])
def get_cards():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select idTarjeta, nombre, numeroTarjeta, fechaVencimiento, tipo "
                   "from tarjetas where idUsuario = %d;" % user_id)
    rows = cursor.fetchall()
    column_names = ["id", "name", "cardNumber", "cardPaymentDueDate", "cardType"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@card_routes.route('/api/createCard', methods=['POST'])
def create_card():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    name = data.get("name")
    card_number = data.get("cardNumber")
    card_payment_due_date = data.get("cardPaymentDueDate")
    card_type = data.get("cardType")
    user_id = data.get("userId")
    if any_is_none(name, card_number, card_payment_due_date, card_type, user_id):
        return jsonify(message="Missing parameter"), 400

    date_format = "STR_TO_DATE('" + card_payment_due_date + "', '%Y-%m-%d')"

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("insert into tarjetas (nombre, numeroTarjeta, fechaVencimiento, tipo, idUsuario) "
                   "values ('%s', '%s', %s, '%s', %s);"
                   % (name, card_number, date_format, card_type, user_id))

    connection.commit()
    last_insert_id = cursor.lastrowid

    cursor.close()
    connection.close()

    response = jsonify(id=last_insert_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@card_routes.route('/api/editCard', methods=['POST'])
def edit_card():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    card_id = data.get('id')
    card_property = data.get('property')
    value = data.get('value')
    user_id = data.get('userId')
    if any_is_none(card_id, card_property, value, user_id):
        return jsonify(message="Missing parameter"), 400

    table_property = ""
    prop_format = "'%s'"
    if card_property == "name":
        table_property = "nombre"
    elif card_property == "cardNumber":
        table_property = "numeroTarjeta"
    elif card_property == "cardType":
        table_property = "tipo"
    elif card_property == "cardPaymentDueDate":
        table_property = "fechaVencimiento"
        prop_format = "STR_TO_DATE('" + value + "', '%Y-%m-%d')"

    if card_property != "cardPaymentDueDate":
        prop_format = prop_format % value

    connection = get_db_connection()
    cursor = connection.cursor()

    if table_property != "":
        cursor.execute("update tarjetas set %s = %s where idTarjeta = %s and idUsuario = %s;"
                       % (table_property, prop_format, card_id, user_id))

    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@card_routes.route('/api/deleteCard', methods=['POST'])
def delete_card():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    card_id = data.get('id')
    user_id = data.get('userId')
    is_credit = data.get('isCredit')
    if any_is_none(card_id, user_id, is_credit):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("delete from transacciones where tarjetaAsociada = %d and idUsuario = %d;" % (card_id, user_id))
    cursor.execute("delete from %s where idTarjeta = %d;" % ("credito" if is_credit else "debito", card_id))
    cursor.execute("delete from tarjetas where idTarjeta = %d and idUsuario = %d;" % (card_id, user_id))
    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200
