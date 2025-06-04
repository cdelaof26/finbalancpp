from db_conf import get_db_connection
from flask import request, jsonify
from flask import Blueprint
from utils import any_is_none

deb_routes = Blueprint('debit', __name__)


@deb_routes.route('/api/deb', methods=['POST'])
def get_deb():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    deb_type = data.get('isDebt')  # deuda
    if any_is_none(user_id, deb_type):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select idAdeudo, nombre, cantidad, fecha, color, completado "
                   "from adeudo where idUsuario = %d and es_deuda = %s;" % (user_id, deb_type))
    rows = cursor.fetchall()
    column_names = ["id", "caption", "value", "date", "color", "completed"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@deb_routes.route('/api/createDeb', methods=['POST'])
def create_deb():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    caption = data.get('caption')
    value = data.get('value')
    date = data.get('date')
    color = data.get('color')
    completed = data.get('completed')
    deb_type = data.get('isDebt')  # deuda
    if any_is_none(user_id, caption, value, date, color, completed, deb_type):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    date_format = "STR_TO_DATE('" + date + "', '%Y-%m-%d')"
    cursor.execute("insert into adeudo (nombre, cantidad, fecha, color, completado, es_deuda, idUsuario) values "
                   "('%s', %s, %s, '%s', %s, %s, %s);"
                   % (caption, value, date_format, color, completed, deb_type, user_id))

    connection.commit()
    last_insert_id = cursor.lastrowid

    cursor.close()
    connection.close()

    response = jsonify(id=last_insert_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@deb_routes.route('/api/editDeb', methods=['POST'])
def edit_deb():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    deb_id = data.get('id')
    deb_property = data.get('property')
    value = data.get('value')
    user_id = data.get('userId')
    if any_is_none(deb_id, deb_property, value, user_id):
        return jsonify(message="Missing parameter"), 400

    table_property = ""
    prop_format = "%s"
    if deb_property == "caption":
        table_property = "nombre"
        prop_format = "'%s'"
    elif deb_property == "value":
        table_property = "cantidad"
    elif deb_property == "date":
        table_property = "fecha"
        prop_format = "STR_TO_DATE('" + value + "', '%Y-%m-%d')"
    elif deb_property == "color":
        table_property = "color"
        prop_format = "'%s'"
    elif deb_property == "completed":
        table_property = "completado"

    if deb_property != "date":
        prop_format = prop_format % value

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("update adeudo set %s = %s where idAdeudo = %s and idUsuario = %s;"
                   % (table_property, prop_format, deb_id, user_id))

    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@deb_routes.route('/api/deleteDeb', methods=['POST'])
def delete_deb():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    deb_id = data.get('id')
    user_id = data.get('userId')
    if any_is_none(deb_id, user_id):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("delete from adeudo where idAdeudo = %d and idUsuario = %d;" % (deb_id, user_id))
    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@deb_routes.route('/api/previewDeb', methods=['POST'])
def preview_deb():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select nombre, cantidad, color from adeudo where idUsuario = %d;" % (user_id))
    rows = cursor.fetchall()
    column_names = ["caption", "value", "color"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200
