from db_conf import get_db_connection
from flask import request, jsonify
from flask import Blueprint
from utils import any_is_none

earnings_routes = Blueprint('earnings', __name__)


@earnings_routes.route('/api/earnings', methods=['POST'])
def get_earnings():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select idIngreso, montoIngreso, fecha, categoriaIngreso, color "
                   "from ingreso where idUsuario = %d;" % user_id)
    rows = cursor.fetchall()
    column_names = ["id", "value", "date", "caption", "color"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@earnings_routes.route('/api/createEarning', methods=['POST'])
def create_earning():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    value = data.get('value')
    caption = data.get('caption')
    user_id = data.get('userId')
    color = data.get('color')
    if any_is_none(value, caption, user_id, color):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    date_format = "STR_TO_DATE('2025-01-01', '%Y-%m-%d')"
    cursor.execute("insert into ingreso (montoIngreso, fecha, categoriaIngreso, idUsuario, color) values "
                   "(%s, %s, '%s', %s, '%s');" % (value, date_format, caption, user_id, color))

    connection.commit()
    last_insert_id = cursor.lastrowid

    cursor.close()
    connection.close()

    response = jsonify(id=last_insert_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@earnings_routes.route('/api/editEarning', methods=['POST'])
def edit_earning():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    earning_id = data.get('id')
    earning_property = data.get('property')
    value = data.get('value')
    user_id = data.get('userId')
    if any_is_none(earning_id, earning_property, value, user_id):
        return jsonify(message="Missing parameter"), 400

    table_property = ""
    prop_format = "'%s'"
    if earning_property == "value":
        table_property = "montoIngreso"
        prop_format = "%s"
    elif earning_property == "caption":
        table_property = "categoriaIngreso"
    elif earning_property == "color":
        table_property = "color"

    prop_format = prop_format % value

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("update ingreso set %s = %s where idIngreso = %s and idUsuario = %s;"
                   % (table_property, prop_format, earning_id, user_id))

    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@earnings_routes.route('/api/deleteEarning', methods=['POST'])
def delete_earning():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    earning_id = data.get('id')
    user_id = data.get('userId')
    if any_is_none(earning_id, user_id):
        return jsonify(message="Missing parameter"), 400

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("delete from ingreso where idIngreso = %d and idUsuario = %d;" % (earning_id, user_id))
    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200
