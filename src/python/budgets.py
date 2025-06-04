from db_conf import get_db_connection
from flask import request, jsonify
from flask import Blueprint
from utils import any_is_none

budgets_routes = Blueprint('budgets', __name__)


@budgets_routes.route('/api/budgets', methods=['POST'])
def get_earnings():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select id, nombre, montoTotal, categoria from presupuestos where idUsuario = %d;" % user_id)
    # Ugh, categoria is color
    rows = cursor.fetchall()
    column_names = ["id", "caption", "value", "color"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@budgets_routes.route('/api/previewBudgets', methods=['POST'])
def get_preview_budgets():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    user_id = data.get('userId')
    if user_id is None:
        return jsonify(message="Missing userId"), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("select nombre, montoTotal, categoria from presupuestos where idUsuario = %d;" % user_id)
    # Ugh, categoria is color
    rows = cursor.fetchall()
    column_names = ["caption", "value", "color"]

    cursor.close()
    connection.close()

    response = jsonify([dict(zip(column_names, row)) for row in rows])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@budgets_routes.route('/api/createBudget', methods=['POST'])
def create_budget():
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
    cursor.execute("insert into presupuestos (nombre, montoTotal, montoGastado, categoria, idUsuario, "
                   "fechaInicio, fechaFin) values "
                   "('%s', %s, 0, '%s', %s, %s, %s);" % (caption, value, color, user_id, date_format, date_format))

    connection.commit()
    last_insert_id = cursor.lastrowid

    cursor.close()
    connection.close()

    response = jsonify(id=last_insert_id)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200


@budgets_routes.route('/api/editBudget', methods=['POST'])
def edit_budget():
    if not request.is_json:
        return jsonify(message="Request body must be JSON"), 400

    data = request.get_json()
    budget_id = data.get('id')
    budget_property = data.get('property')
    value = data.get('value')
    user_id = data.get('userId')
    if any_is_none(budget_id, budget_property, value, user_id):
        return jsonify(message="Missing parameter"), 400

    table_property = ""
    prop_format = "'%s'"
    if budget_property == "caption":
        table_property = "nombre"
    elif budget_property == "value":
        table_property = "montoTotal"
        prop_format = "%s"
    elif budget_property == "color":
        table_property = "categoria"

    prop_format = prop_format % value

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("update presupuestos set %s = %s where id = %s and idUsuario = %s;"
                   % (table_property, prop_format, budget_id, user_id))

    connection.commit()
    cursor.close()
    connection.close()

    response = jsonify(message="Ok")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response, 200
